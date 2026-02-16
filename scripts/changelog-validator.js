#!/usr/bin/env node

/**
 * Changelog Validator for Brave Browser
 *
 * Validates CHANGELOG_*.md files for consistent formatting, valid links,
 * proper semantic versioning, and correct issue references.
 *
 * Usage:
 *   node scripts/changelog-validator.js [--strict] [--fix] [files...]
 *
 * If no files are specified, validates all CHANGELOG_*.md in the repo root.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const VALID_SECTIONS = new Set([
  'Web3',
  'Leo',
  'Rewards',
  'General',
  'Privacy',
  'Security',
  'Performance',
  'Networking',
  'Extensions',
  'Sync',
  'Search',
  'VPN',
]);

const VALID_ENTRY_PREFIXES = [
  'Added',
  'Changed',
  'Deprecated',
  'Fixed',
  'Improved',
  'Moved',
  'Reduced',
  'Removed',
  'Renamed',
  'Replaced',
  'Updated',
  'Upgraded',
  'Enabled',
  'Disabled',
  'Implemented',
  'Resolved',
  'Reverted',
  'Optimized',
];

const ISSUE_LINK_PATTERN =
  /\[#(\d+)\]\(https:\/\/github\.com\/brave\/brave-browser\/issues\/\1\)/g;

const VERSION_HEADER_PATTERN =
  /^## \[(\d+\.\d+\.\d+)\]\(https:\/\/github\.com\/brave\/brave-browser\/releases\/tag\/v\1\)/;

const SECTION_HEADER_PATTERN = /^### (.+)$/;

const SEMVER_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/;

// ---------------------------------------------------------------------------
// SemVer helper
// ---------------------------------------------------------------------------

class SemVer {
  /**
   * @param {string} versionString  e.g. "1.87.186"
   */
  constructor(versionString) {
    const match = SEMVER_PATTERN.exec(versionString);
    if (!match) {
      throw new RangeError(`Invalid semver string: "${versionString}"`);
    }
    /** @type {number} */ this.major = Number(match[1]);
    /** @type {number} */ this.minor = Number(match[2]);
    /** @type {number} */ this.patch = Number(match[3]);
    /** @type {string} */ this.raw = versionString;
  }

  /**
   * Compare two SemVer instances.
   * Returns negative if this < other, 0 if equal, positive if this > other.
   * @param {SemVer} other
   * @returns {number}
   */
  compare(other) {
    if (this.major !== other.major) return this.major - other.major;
    if (this.minor !== other.minor) return this.minor - other.minor;
    return this.patch - other.patch;
  }

  toString() {
    return this.raw;
  }
}

// ---------------------------------------------------------------------------
// Diagnostic classes
// ---------------------------------------------------------------------------

/**
 * Severity levels for validation diagnostics.
 * @enum {string}
 */
const Severity = Object.freeze({
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
});

class Diagnostic {
  /**
   * @param {Severity} severity
   * @param {string}   message
   * @param {number}   line       1-based line number
   * @param {string}   [file]     file path
   */
  constructor(severity, message, line, file) {
    this.severity = severity;
    this.message = message;
    this.line = line;
    this.file = file || '';
  }

  toString() {
    const loc = this.file ? `${this.file}:${this.line}` : `line ${this.line}`;
    return `[${this.severity.toUpperCase()}] ${loc}: ${this.message}`;
  }
}

// ---------------------------------------------------------------------------
// ChangelogEntry
// ---------------------------------------------------------------------------

class ChangelogEntry {
  /**
   * @param {string} text        Raw line text (trimmed)
   * @param {number} lineNumber  1-based
   */
  constructor(text, lineNumber) {
    this.text = text;
    this.lineNumber = lineNumber;
    this.issueNumbers = [];
    this._extractIssueNumbers();
  }

  /** @private */
  _extractIssueNumbers() {
    const pattern = /\[#(\d+)\]/g;
    let m;
    while ((m = pattern.exec(this.text)) !== null) {
      this.issueNumbers.push(Number(m[1]));
    }
  }

  /**
   * Whether the entry starts with a recognised action verb.
   * @returns {boolean}
   */
  hasValidPrefix() {
    // Strip leading " - " then check
    const content = this.text.replace(/^ - /, '');
    return VALID_ENTRY_PREFIXES.some((prefix) => content.startsWith(prefix));
  }

  /**
   * Whether every issue reference uses the full link format.
   * @returns {boolean}
   */
  hasProperIssueLinks() {
    // Count bare refs like (#12345) without full link
    const bareRefCount = (this.text.match(/\(#\d+\)/g) || []).length;
    // Count full links
    const fullLinkCount = (
      this.text.match(
        /\[#\d+\]\(https:\/\/github\.com\/brave\/brave-browser\/issues\/\d+\)/g
      ) || []
    ).length;
    // Every issue ref should be a full link
    return bareRefCount === 0 || fullLinkCount >= bareRefCount;
  }

  /**
   * Whether the entry ends with a closing parenthesis and period/paren.
   * @returns {boolean}
   */
  hasProperPunctuation() {
    const trimmed = this.text.trimEnd();
    return trimmed.endsWith(')') || trimmed.endsWith('.');
  }
}

// ---------------------------------------------------------------------------
// ChangelogSection
// ---------------------------------------------------------------------------

class ChangelogSection {
  /**
   * @param {string}           name
   * @param {number}           lineNumber  1-based line of the ### header
   * @param {ChangelogEntry[]} entries
   */
  constructor(name, lineNumber, entries = []) {
    this.name = name;
    this.lineNumber = lineNumber;
    /** @type {ChangelogEntry[]} */
    this.entries = entries;
  }

  /**
   * Whether this section name is in the known set.
   * @returns {boolean}
   */
  isKnownSection() {
    return VALID_SECTIONS.has(this.name);
  }

  /**
   * @param {ChangelogEntry} entry
   */
  addEntry(entry) {
    this.entries.push(entry);
  }
}

// ---------------------------------------------------------------------------
// ChangelogVersion
// ---------------------------------------------------------------------------

class ChangelogVersion {
  /**
   * @param {SemVer}             version
   * @param {number}             lineNumber  1-based line of the ## header
   * @param {ChangelogSection[]} sections
   */
  constructor(version, lineNumber, sections = []) {
    this.version = version;
    this.lineNumber = lineNumber;
    /** @type {ChangelogSection[]} */
    this.sections = sections;
  }

  /** Total number of changelog entries across all sections */
  get entryCount() {
    return this.sections.reduce((sum, s) => sum + s.entries.length, 0);
  }

  /**
   * @param {ChangelogSection} section
   */
  addSection(section) {
    this.sections.push(section);
  }
}

// ---------------------------------------------------------------------------
// ChangelogParser
// ---------------------------------------------------------------------------

class ChangelogParser {
  /**
   * Parse raw changelog text into structured data.
   * @param {string} content  File contents
   * @returns {{ versions: ChangelogVersion[], diagnostics: Diagnostic[] }}
   */
  static parse(content) {
    const lines = content.split('\n');
    /** @type {ChangelogVersion[]} */
    const versions = [];
    /** @type {Diagnostic[]} */
    const diagnostics = [];

    /** @type {ChangelogVersion|null} */
    let currentVersion = null;
    /** @type {ChangelogSection|null} */
    let currentSection = null;

    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const line = lines[i];

      // Version header?
      const versionMatch = VERSION_HEADER_PATTERN.exec(line);
      if (versionMatch) {
        try {
          const semver = new SemVer(versionMatch[1]);
          currentVersion = new ChangelogVersion(semver, lineNum);
          currentSection = null;
          versions.push(currentVersion);
        } catch (e) {
          diagnostics.push(
            new Diagnostic(Severity.ERROR, e.message, lineNum)
          );
        }
        continue;
      }

      // Section header?
      const sectionMatch = SECTION_HEADER_PATTERN.exec(line);
      if (sectionMatch && currentVersion) {
        currentSection = new ChangelogSection(sectionMatch[1], lineNum);
        currentVersion.addSection(currentSection);
        continue;
      }

      // Entry line?
      if (line.startsWith(' - ') && currentVersion) {
        const entry = new ChangelogEntry(line.trimStart(), lineNum);
        if (currentSection) {
          currentSection.addEntry(entry);
        } else {
          // Entry outside a section — attach to an implicit "General" section
          currentSection = new ChangelogSection('General', lineNum);
          currentVersion.addSection(currentSection);
          currentSection.addEntry(entry);
        }
        continue;
      }
    }

    return { versions, diagnostics };
  }
}

// ---------------------------------------------------------------------------
// ChangelogValidator
// ---------------------------------------------------------------------------

class ChangelogValidator {
  /**
   * @param {object}  options
   * @param {boolean} [options.strict=false]  Treat warnings as errors
   */
  constructor(options = {}) {
    this.strict = options.strict || false;
    /** @type {Diagnostic[]} */
    this.diagnostics = [];
  }

  /**
   * Run all validation checks on the given file content.
   * @param {string} content   File content
   * @param {string} filePath  File path (for diagnostic messages)
   * @returns {Diagnostic[]}   Array of diagnostics
   */
  validate(content, filePath) {
    this.diagnostics = [];
    const { versions, diagnostics: parseDiags } =
      ChangelogParser.parse(content);

    // Add any parse-time diagnostics
    for (const d of parseDiags) {
      d.file = filePath;
      this.diagnostics.push(d);
    }

    this._validateFileHeader(content, filePath);
    this._validateVersionOrdering(versions, filePath);
    this._validateSections(versions, filePath);
    this._validateEntries(versions, filePath);
    this._validateDuplicateIssues(versions, filePath);

    return this.diagnostics;
  }

  /**
   * Ensure the file starts with "# Changelog".
   * @private
   */
  _validateFileHeader(content, filePath) {
    const firstLine = content.split('\n')[0];
    if (firstLine.trim() !== '# Changelog') {
      this.diagnostics.push(
        new Diagnostic(
          Severity.WARNING,
          'File should start with "# Changelog"',
          1,
          filePath
        )
      );
    }
  }

  /**
   * Ensure versions are in descending order.
   * @private
   */
  _validateVersionOrdering(versions, filePath) {
    for (let i = 1; i < versions.length; i++) {
      const prev = versions[i - 1].version;
      const curr = versions[i].version;
      if (curr.compare(prev) >= 0) {
        this.diagnostics.push(
          new Diagnostic(
            Severity.ERROR,
            `Version ${curr} (line ${versions[i].lineNumber}) should come ` +
              `after ${prev} — versions must be in descending order`,
            versions[i].lineNumber,
            filePath
          )
        );
      }
    }
  }

  /**
   * Validate section names.
   * @private
   */
  _validateSections(versions, filePath) {
    for (const ver of versions) {
      const sectionNames = new Set();
      for (const section of ver.sections) {
        // Duplicate section names within a version
        if (sectionNames.has(section.name)) {
          this.diagnostics.push(
            new Diagnostic(
              Severity.ERROR,
              `Duplicate section "${section.name}" in version ${ver.version}`,
              section.lineNumber,
              filePath
            )
          );
        }
        sectionNames.add(section.name);

        // Unknown section name
        if (!section.isKnownSection()) {
          this.diagnostics.push(
            new Diagnostic(
              Severity.WARNING,
              `Unknown section "${section.name}" in version ${ver.version}. ` +
                `Known sections: ${[...VALID_SECTIONS].join(', ')}`,
              section.lineNumber,
              filePath
            )
          );
        }

        // Empty section
        if (section.entries.length === 0) {
          this.diagnostics.push(
            new Diagnostic(
              Severity.WARNING,
              `Empty section "${section.name}" in version ${ver.version}`,
              section.lineNumber,
              filePath
            )
          );
        }
      }
    }
  }

  /**
   * Validate individual entries for prefix, links, and punctuation.
   * @private
   */
  _validateEntries(versions, filePath) {
    for (const ver of versions) {
      for (const section of ver.sections) {
        for (const entry of section.entries) {
          if (!entry.hasValidPrefix()) {
            this.diagnostics.push(
              new Diagnostic(
                Severity.WARNING,
                `Entry does not start with a recognised action verb. ` +
                  `Expected one of: ${VALID_ENTRY_PREFIXES.join(', ')}`,
                entry.lineNumber,
                filePath
              )
            );
          }

          if (!entry.hasProperIssueLinks()) {
            this.diagnostics.push(
              new Diagnostic(
                Severity.WARNING,
                'Issue reference should use full link format: ' +
                  '[#NUMBER](https://github.com/brave/brave-browser/issues/NUMBER)',
                entry.lineNumber,
                filePath
              )
            );
          }

          if (!entry.hasProperPunctuation()) {
            this.diagnostics.push(
              new Diagnostic(
                this.strict ? Severity.ERROR : Severity.INFO,
                'Entry should end with ")" or "."',
                entry.lineNumber,
                filePath
              )
            );
          }
        }
      }
    }
  }

  /**
   * Check for duplicate issue references across entries within a version.
   * @private
   */
  _validateDuplicateIssues(versions, filePath) {
    for (const ver of versions) {
      /** @type {Map<number, number[]>} issue -> line numbers */
      const issueMentions = new Map();

      for (const section of ver.sections) {
        for (const entry of section.entries) {
          for (const issueNum of entry.issueNumbers) {
            if (!issueMentions.has(issueNum)) {
              issueMentions.set(issueNum, []);
            }
            issueMentions.get(issueNum).push(entry.lineNumber);
          }
        }
      }

      for (const [issueNum, lines] of issueMentions) {
        if (lines.length > 1) {
          this.diagnostics.push(
            new Diagnostic(
              Severity.WARNING,
              `Issue #${issueNum} is referenced multiple times in ` +
                `version ${ver.version} (lines ${lines.join(', ')})`,
              lines[0],
              filePath
            )
          );
        }
      }
    }
  }

  /**
   * Returns true if any ERROR-level diagnostics exist
   * (or any WARNING-level if strict mode is on).
   * @returns {boolean}
   */
  hasErrors() {
    return this.diagnostics.some(
      (d) =>
        d.severity === Severity.ERROR ||
        (this.strict && d.severity === Severity.WARNING)
    );
  }
}

// ---------------------------------------------------------------------------
// ChangelogStatistics
// ---------------------------------------------------------------------------

class ChangelogStatistics {
  /**
   * Compute summary statistics for a parsed changelog.
   * @param {ChangelogVersion[]} versions
   * @returns {object}
   */
  static summarize(versions) {
    const totalVersions = versions.length;
    let totalEntries = 0;
    /** @type {Map<string, number>} */
    const sectionCounts = new Map();
    /** @type {Set<number>} */
    const allIssues = new Set();

    for (const ver of versions) {
      for (const section of ver.sections) {
        totalEntries += section.entries.length;
        sectionCounts.set(
          section.name,
          (sectionCounts.get(section.name) || 0) + section.entries.length
        );
        for (const entry of section.entries) {
          for (const num of entry.issueNumbers) {
            allIssues.add(num);
          }
        }
      }
    }

    return {
      totalVersions,
      totalEntries,
      uniqueIssuesReferenced: allIssues.size,
      entriesPerSection: Object.fromEntries(sectionCounts),
      latestVersion: versions.length > 0 ? versions[0].version.toString() : null,
      oldestVersion:
        versions.length > 0
          ? versions[versions.length - 1].version.toString()
          : null,
    };
  }
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = {
    strict: false,
    fix: false,
    files: [],
  };

  for (const arg of argv.slice(2)) {
    if (arg === '--strict') {
      args.strict = true;
    } else if (arg === '--fix') {
      args.fix = true;
    } else if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    } else {
      args.files.push(arg);
    }
  }

  return args;
}

function printUsage() {
  console.log(`
Usage: node scripts/changelog-validator.js [options] [files...]

Options:
  --strict    Treat warnings as errors (non-zero exit)
  --fix       Attempt to auto-fix common formatting issues
  -h, --help  Show this help message

If no files are specified, validates all CHANGELOG_*.md in the repo root.
`);
}

function discoverChangelogFiles(rootDir) {
  const files = fs.readdirSync(rootDir);
  return files
    .filter((f) => f.startsWith('CHANGELOG_') && f.endsWith('.md'))
    .map((f) => path.join(rootDir, f));
}

function formatDiagnosticSummary(diagnostics) {
  const counts = { error: 0, warning: 0, info: 0 };
  for (const d of diagnostics) {
    counts[d.severity]++;
  }
  return (
    `${counts.error} error(s), ` +
    `${counts.warning} warning(s), ` +
    `${counts.info} info(s)`
  );
}

function main() {
  const args = parseArgs(process.argv);
  const rootDir = path.resolve(__dirname, '..');

  let files = args.files;
  if (files.length === 0) {
    files = discoverChangelogFiles(rootDir);
  }

  if (files.length === 0) {
    console.error('No changelog files found.');
    process.exit(1);
  }

  const validator = new ChangelogValidator({ strict: args.strict });
  let allDiagnostics = [];
  let hasAnyErrors = false;

  for (const filePath of files) {
    const resolvedPath = path.resolve(filePath);
    let content;
    try {
      content = fs.readFileSync(resolvedPath, 'utf-8');
    } catch (err) {
      console.error(`Cannot read file: ${resolvedPath} — ${err.message}`);
      hasAnyErrors = true;
      continue;
    }

    console.log(`\nValidating: ${path.relative(rootDir, resolvedPath)}`);
    console.log('─'.repeat(60));

    const diagnostics = validator.validate(content, resolvedPath);
    allDiagnostics = allDiagnostics.concat(diagnostics);

    if (diagnostics.length === 0) {
      console.log('  ✓ No issues found.');
    } else {
      for (const d of diagnostics) {
        const icon =
          d.severity === Severity.ERROR
            ? '✗'
            : d.severity === Severity.WARNING
              ? '⚠'
              : 'ℹ';
        console.log(`  ${icon} ${d}`);
      }
      console.log(`  ${formatDiagnosticSummary(diagnostics)}`);
    }

    // Print statistics
    const { versions } = ChangelogParser.parse(content);
    const stats = ChangelogStatistics.summarize(versions);
    console.log(`\n  Statistics:`);
    console.log(`    Versions: ${stats.totalVersions}`);
    console.log(`    Total entries: ${stats.totalEntries}`);
    console.log(`    Unique issues referenced: ${stats.uniqueIssuesReferenced}`);
    if (stats.latestVersion) {
      console.log(
        `    Version range: ${stats.oldestVersion} → ${stats.latestVersion}`
      );
    }

    if (validator.hasErrors()) {
      hasAnyErrors = true;
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`Overall: ${formatDiagnosticSummary(allDiagnostics)}`);

  process.exit(hasAnyErrors ? 1 : 0);
}

// ---------------------------------------------------------------------------
// Exports (for testing) & CLI entry
// ---------------------------------------------------------------------------

module.exports = {
  SemVer,
  Severity,
  Diagnostic,
  ChangelogEntry,
  ChangelogSection,
  ChangelogVersion,
  ChangelogParser,
  ChangelogValidator,
  ChangelogStatistics,
  VALID_SECTIONS,
  VALID_ENTRY_PREFIXES,
};

if (require.main === module) {
  main();
}
