const program = require('commander');
const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

program
  .version(process.env.npm_package_version)
  .parse(process.argv)

config.update(program)

let diff = util.run('git', ['diff'], { cwd: config.projects.chrome.dir })
fs.writeFileSync(path.join(config.projects.patches.dir, 'patches', 'master_patch.patch'), diff.stdout)
diff = util.run('git', ['diff'], { cwd: path.join(config.projects.chrome.dir, 'v8') })
fs.writeFileSync(path.join(config.projects.patches.dir, 'patches', 'v8', 'filter.patch'), diff.stdout)
