/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var fs = require('fs-extra');
var path = require('path');
var events = require('cordova-common').events;
var CordovaError = require('cordova-common').CordovaError;

var handlers = {
    'source-file': {
        install: function (obj, plugin, project, options) {
            if (!obj.src) throw new CordovaError(generateAttributeError('src', 'source-file', plugin.id));
            if (!obj.targetDir) throw new CordovaError(generateAttributeError('target-dir', 'source-file', plugin.id));

            var dest = getInstallDestination(obj);

            if (options && options.force) {
                copyFile(plugin.dir, obj.src, project.projectDir, dest, !!(options && options.link));
            } else {
                copyNewFile(plugin.dir, obj.src, project.projectDir, dest, !!(options && options.link));
            }
        },
        uninstall: function (obj, plugin, project, options) {
            var dest = getInstallDestination(obj);

            // TODO: Add Koltin extension to uninstall, since they are handled like Java files
            if (obj.src.endsWith('java')) {
                deleteJava(project.projectDir, dest);
            } else {
                // Just remove the file, not the whole parent directory
                removeFile(path.resolve(project.projectDir, dest));
            }
        }
    },
    'lib-file': {
        install: function (obj, plugin, project, options) {
            var dest = path.join('app/libs', path.basename(obj.src));
            copyFile(plugin.dir, obj.src, project.projectDir, dest, !!(options && options.link));
        },
        uninstall: function (obj, plugin, project, options) {
            var dest = path.join('app/libs', path.basename(obj.src));
            removeFile(path.resolve(project.projectDir, dest));
        }
    },
    'resource-file': {
        install: function (obj, plugin, project, options) {
            var dest = path.join('app', 'src', 'main', obj.target);
            copyFile(plugin.dir, obj.src, project.projectDir, dest, !!(options && options.link));
        },
        uninstall: function (obj, plugin, project, options) {
            var dest = path.join('app', 'src', 'main', obj.target);
            removeFile(path.resolve(project.projectDir, dest));
        }
    },
    framework: {
        install: function (obj, plugin, project, options) {
            var src = obj.src;
            if (!src) throw new CordovaError(generateAttributeError('src', 'framework', plugin.id));

            events.emit('verbose', 'Installing Android library: ' + src);
            var parentDir = obj.parent ? path.resolve(project.projectDir, obj.parent) : project.projectDir;
            var subDir;

            if (obj.custom) {
                var subRelativeDir = project.getCustomSubprojectRelativeDir(plugin.id, src);
                copyNewFile(plugin.dir, src, project.projectDir, subRelativeDir, !!(options && options.link));
                subDir = path.resolve(project.projectDir, subRelativeDir);
            } else {
                obj.type = 'sys';
                subDir = src;
            }

            if (obj.type === 'gradleReference') {
                project.addGradleReference(parentDir, subDir);
            } else if (obj.type === 'sys') {
                project.addSystemLibrary(parentDir, subDir);
            } else {
                project.addSubProject(parentDir, subDir);
            }
        },
        uninstall: function (obj, plugin, project, options) {
            var src = obj.src;
            if (!src) throw new CordovaError(generateAttributeError('src', 'framework', plugin.id));

            events.emit('verbose', 'Uninstalling Android library: ' + src);
            var parentDir = obj.parent ? path.resolve(project.projectDir, obj.parent) : project.projectDir;
            var subDir;

            if (obj.custom) {
                var subRelativeDir = project.getCustomSubprojectRelativeDir(plugin.id, src);
                removeFile(path.resolve(project.projectDir, subRelativeDir));
                subDir = path.resolve(project.projectDir, subRelativeDir);
                // If it's the last framework in the plugin, remove the parent directory.
                var parDir = path.dirname(subDir);
                if (fs.existsSync(parDir) && fs.readdirSync(parDir).length === 0) {
                    fs.rmdirSync(parDir);
                }
            } else {
                obj.type = 'sys';
                subDir = src;
            }

            if (obj.type === 'gradleReference') {
                project.removeGradleReference(parentDir, subDir);
            } else if (obj.type === 'sys') {
                project.removeSystemLibrary(parentDir, subDir);
            } else {
                project.removeSubProject(parentDir, subDir);
            }
        }
    },
    asset: {
        install: function (obj, plugin, project, options) {
            if (!obj.src) {
                throw new CordovaError(generateAttributeError('src', 'asset', plugin.id));
            }
            if (!obj.target) {
                throw new CordovaError(generateAttributeError('target', 'asset', plugin.id));
            }

            copyFile(plugin.dir, obj.src, project.www, obj.target);
            if (options && options.usePlatformWww) {
                // CB-11022 copy file to both directories if usePlatformWww is specified
                copyFile(plugin.dir, obj.src, project.platformWww, obj.target);
            }
        },
        uninstall: function (obj, plugin, project, options) {
            var target = obj.target || obj.src;

            if (!target) throw new CordovaError(generateAttributeError('target', 'asset', plugin.id));

            removeFile(path.resolve(project.www, target));
            removeFile(path.resolve(project.www, 'plugins', plugin.id));
            if (options && options.usePlatformWww) {
                // CB-11022 remove file from both directories if usePlatformWww is specified
                removeFile(path.resolve(project.platformWww, target));
                removeFile(path.resolve(project.platformWww, 'plugins', plugin.id));
            }
        }
    },
    'js-module': {
        install: function (obj, plugin, project, options) {
            // Copy the plugin's files into the www directory.
            var moduleSource = path.resolve(plugin.dir, obj.src);
            var moduleName = plugin.id + '.' + (obj.name || path.basename(obj.src, path.extname(obj.src)));

            // Read in the file, prepend the cordova.define, and write it back out.
            var scriptContent = fs.readFileSync(moduleSource, 'utf-8').replace(/^\ufeff/, ''); // Window BOM
            if (moduleSource.match(/.*\.json$/)) {
                scriptContent = 'module.exports = ' + scriptContent;
            }
            scriptContent = 'cordova.define("' + moduleName + '", function(require, exports, module) {\n' + scriptContent + '\n});\n';

            var wwwDest = path.resolve(project.www, 'plugins', plugin.id, obj.src);
            fs.ensureDirSync(path.dirname(wwwDest));
            fs.writeFileSync(wwwDest, scriptContent, 'utf-8');

            if (options && options.usePlatformWww) {
                // CB-11022 copy file to both directories if usePlatformWww is specified
                var platformWwwDest = path.resolve(project.platformWww, 'plugins', plugin.id, obj.src);
                fs.ensureDirSync(path.dirname(platformWwwDest));
                fs.writeFileSync(platformWwwDest, scriptContent, 'utf-8');
            }
        },
        uninstall: function (obj, plugin, project, options) {
            var pluginRelativePath = path.join('plugins', plugin.id, obj.src);
            removeFileAndParents(project.www, pluginRelativePath);
            if (options && options.usePlatformWww) {
                // CB-11022 remove file from both directories if usePlatformWww is specified
                removeFileAndParents(project.platformWww, pluginRelativePath);
            }
        }
    }
};

module.exports.getInstaller = function (type) {
    if (handlers[type] && handlers[type].install) {
        return handlers[type].install;
    }

    events.emit('verbose', '<' + type + '> is not supported for android plugins');
};

module.exports.getUninstaller = function (type) {
    if (handlers[type] && handlers[type].uninstall) {
        return handlers[type].uninstall;
    }

    events.emit('verbose', '<' + type + '> is not supported for android plugins');
};

function copyFile (plugin_dir, src, project_dir, dest, link) {
    src = path.resolve(plugin_dir, src);
    if (!fs.existsSync(src)) throw new CordovaError('"' + src + '" not found!');

    // check that src path is inside plugin directory
    var real_path = fs.realpathSync(src);
    var real_plugin_path = fs.realpathSync(plugin_dir);
    if (real_path.indexOf(real_plugin_path) !== 0) { throw new CordovaError('File "' + src + '" is located outside the plugin directory "' + plugin_dir + '"'); }

    dest = path.resolve(project_dir, dest);

    // check that dest path is located in project directory
    if (dest.indexOf(project_dir) !== 0) { throw new CordovaError('Destination "' + dest + '" for source file "' + src + '" is located outside the project'); }

    fs.ensureDirSync(path.dirname(dest));
    if (link) {
        symlinkFileOrDirTree(src, dest);
    } else {
        fs.copySync(src, dest);
    }
}

// Same as copy file but throws error if target exists
function copyNewFile (plugin_dir, src, project_dir, dest, link) {
    var target_path = path.resolve(project_dir, dest);
    if (fs.existsSync(target_path)) { throw new CordovaError('"' + target_path + '" already exists!'); }

    copyFile(plugin_dir, src, project_dir, dest, !!link);
}

function symlinkFileOrDirTree (src, dest) {
    if (fs.existsSync(dest)) {
        fs.removeSync(dest);
    }

    if (fs.statSync(src).isDirectory()) {
        fs.ensureDirSync(path.dirname(dest));
        fs.readdirSync(src).forEach(function (entry) {
            symlinkFileOrDirTree(path.join(src, entry), path.join(dest, entry));
        });
    } else {
        fs.symlinkSync(path.relative(fs.realpathSync(path.dirname(dest)), src), dest);
    }
}

function removeFile (file) {
    fs.removeSync(file);
}

// Sometimes we want to remove some java, and prune any unnecessary empty directories
function deleteJava (project_dir, destFile) {
    removeFileAndParents(project_dir, destFile, 'src');
}

function removeFileAndParents (baseDir, destFile, stopper) {
    stopper = stopper || '.';
    var file = path.resolve(baseDir, destFile);
    if (!fs.existsSync(file)) return;

    removeFile(file);

    // check if directory is empty
    var curDir = path.dirname(file);

    while (curDir !== path.resolve(baseDir, stopper)) {
        if (fs.existsSync(curDir) && fs.readdirSync(curDir).length === 0) {
            fs.rmdirSync(curDir);
            curDir = path.resolve(curDir, '..');
        } else {
            // directory not empty...do nothing
            break;
        }
    }
}

function generateAttributeError (attribute, element, id) {
    return 'Required attribute "' + attribute + '" not specified in <' + element + '> element from plugin: ' + id;
}

function getInstallDestination (obj) {
    var APP_MAIN_PREFIX = 'app/src/main';
    var PATH_SEPARATOR = '/';

    var PATH_SEP_MATCH = '\\' + PATH_SEPARATOR;
    var PATH_SEP_OR_EOL_MATCH = '(\\' + PATH_SEPARATOR + '|$)';

    var appReg = new RegExp('^app' + PATH_SEP_OR_EOL_MATCH);
    var libsReg = new RegExp('^libs' + PATH_SEP_OR_EOL_MATCH);
    var srcReg = new RegExp('^src' + PATH_SEP_OR_EOL_MATCH);
    var srcMainReg = new RegExp('^src' + PATH_SEP_MATCH + 'main' + PATH_SEP_OR_EOL_MATCH);

    if (appReg.test(obj.targetDir)) {
        // If any source file is using the new app directory structure,
        // don't penalize it
        return path.join(obj.targetDir, path.basename(obj.src));
    } else {
        // Plugin using deprecated target directory structure (GH-580)
        if (obj.src.endsWith('.java')) {
            return path.join(APP_MAIN_PREFIX, 'java', obj.targetDir.replace(srcReg, ''),
                path.basename(obj.src));
        } else if (obj.src.endsWith('.aidl')) {
            return path.join(APP_MAIN_PREFIX, 'aidl', obj.targetDir.replace(srcReg, ''),
                path.basename(obj.src));
        } else if (libsReg.test(obj.targetDir)) {
            if (obj.src.endsWith('.so')) {
                return path.join(APP_MAIN_PREFIX, 'jniLibs', obj.targetDir.replace(libsReg, ''),
                    path.basename(obj.src));
            } else {
                return path.join('app', obj.targetDir, path.basename(obj.src));
            }
        } else if (srcMainReg.test(obj.targetDir)) {
            return path.join('app', obj.targetDir, path.basename(obj.src));
        }

        // For all other source files not using the new app directory structure,
        // add 'app/src/main' to the targetDir
        return path.join(APP_MAIN_PREFIX, obj.targetDir, path.basename(obj.src));
    }
}
