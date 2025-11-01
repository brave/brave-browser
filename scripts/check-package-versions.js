#!/usr/bin/env node

/**
 * Script to check that all packages in package.json files use specific versions
 * instead of range specifiers (^, ~, >=, <=, >, <, *, x, X, etc.)
 */

const fs = require('fs');
const path = require('path');

// Range specifier patterns that should not be allowed
const RANGE_PATTERNS = [
  /^\^/,           // ^1.2.3
  /^~/,            // ~1.2.3
  /^>=/,           // >=1.2.3
  /^<=/,           // <=1.2.3
  /^>/,            // >1.2.3
  /^</,            // <1.2.3
  /^\*/,           // * or 1.*.*
  /^x$/i,          // x or X
  /^latest$/i,     // latest
  /^\./,           // .* or ..*
  /^[\dxX*]+$/,    // 1.x.x or 1.*.*
  /\.\*/,          // 1.2.*
  /[\s-]/,         // Contains spaces or ranges like "1.2.3 - 2.0.0"
  /^\|\|/,         // OR operator like "1.2.3 || 2.0.0"
];

// Valid version pattern: should be exactly x.y.z (with optional pre-release/build)
const VALID_VERSION_PATTERN = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/;

function isRangeSpecifier(version) {
  if (!version || typeof version !== 'string') {
    return false;
  }

  // Check if it matches a valid specific version pattern
  if (VALID_VERSION_PATTERN.test(version)) {
    return false;
  }

  // Check if it matches any range pattern
  return RANGE_PATTERNS.some(pattern => pattern.test(version));
}

function checkPackageJson(filePath) {
  const errors = [];
  const warnings = [];

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const packageJson = JSON.parse(content);

    const depTypes = [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
    ];

    depTypes.forEach(depType => {
      if (packageJson[depType]) {
        Object.entries(packageJson[depType]).forEach(([packageName, version]) => {
          if (isRangeSpecifier(version)) {
            errors.push({
              file: filePath,
              depType,
              package: packageName,
              version,
            });
          }
        });
      }
    });

    // Check engines field - these can have ranges but warn about them
    if (packageJson.engines) {
      Object.entries(packageJson.engines).forEach(([engine, version]) => {
        if (isRangeSpecifier(version)) {
          warnings.push({
            file: filePath,
            field: 'engines',
            engine,
            version,
            note: 'engines field allows ranges but consider being specific',
          });
        }
      });
    }

    return { errors, warnings };
  } catch (error) {
    return {
      errors: [{
        file: filePath,
        error: `Failed to parse package.json: ${error.message}`,
      }],
      warnings: [],
    };
  }
}

function findPackageJsonFiles(rootDir) {
  const packageJsonFiles = [];
  const gitDir = path.join(rootDir, '.git');

  function walkDir(dir) {
    // Skip .git directory
    if (dir === gitDir || dir.startsWith(gitDir + path.sep)) {
      return;
    }

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Skip common directories that shouldn't be checked
        if (entry.isDirectory()) {
          // Skip node_modules, .git, and other build/dependency directories
          if (!['node_modules', '.git', 'dist', 'build', '.next', '.cache'].includes(entry.name)) {
            walkDir(fullPath);
          }
        } else if (entry.name === 'package.json') {
          packageJsonFiles.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore permission errors
      if (error.code !== 'EACCES' && error.code !== 'ENOENT') {
        console.warn(`Warning: Could not read directory ${dir}: ${error.message}`);
      }
    }
  }

  walkDir(rootDir);
  return packageJsonFiles;
}

function main() {
  const rootDir = process.cwd();
  const packageJsonFiles = findPackageJsonFiles(rootDir);

  if (packageJsonFiles.length === 0) {
    console.log('No package.json files found.');
    process.exit(0);
  }

  console.log(`Found ${packageJsonFiles.length} package.json file(s)\n`);

  const allErrors = [];
  const allWarnings = [];

  packageJsonFiles.forEach(file => {
    const { errors, warnings } = checkPackageJson(file);
    allErrors.push(...errors);
    allWarnings.push(...warnings);
  });

  // Print warnings first (non-blocking)
  if (allWarnings.length > 0) {
    console.log('⚠️  Warnings:\n');
    allWarnings.forEach(warning => {
      if (warning.error) {
        console.log(`  ❌ ${warning.file}: ${warning.error}`);
      } else {
        console.log(`  ⚠️  ${warning.file}`);
        console.log(`     ${warning.field}.${warning.engine}: ${warning.version}`);
        console.log(`     ${warning.note}\n`);
      }
    });
    console.log('');
  }

  // Print errors
  if (allErrors.length > 0) {
    console.log('❌ Errors found:\n');
    allErrors.forEach(error => {
      if (error.error) {
        console.log(`  ❌ ${error.file}: ${error.error}`);
      } else {
        console.log(`  ❌ ${error.file}`);
        console.log(`     ${error.depType}.${error.package}: ${error.version}`);
        console.log(`     → Should use a specific version (e.g., "1.2.3" instead of "${error.version}")\n`);
      }
    });
    console.log('');
    console.log(`Found ${allErrors.length} package(s) with range specifiers.`);
    console.log('Please update package.json files to use specific versions.\n');
    process.exit(1);
  }

  console.log('✅ All package.json files use specific versions.\n');
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = { checkPackageJson, isRangeSpecifier, findPackageJsonFiles };

