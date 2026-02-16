/**
 * Tests for changelog-validator.js
 *
 * Run with: npx jest scripts/__tests__/changelog-validator.test.js
 *        or: node --experimental-vm-modules node_modules/.bin/jest ...
 */

'use strict';

const {
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
} = require('../changelog-validator');

// ---------------------------------------------------------------------------
// SemVer
// ---------------------------------------------------------------------------

describe('SemVer', () => {
  test('parses valid version string', () => {
    const v = new SemVer('1.87.186');
    expect(v.major).toBe(1);
    expect(v.minor).toBe(87);
    expect(v.patch).toBe(186);
  });

  test('throws on invalid version string', () => {
    expect(() => new SemVer('not-a-version')).toThrow(RangeError);
    expect(() => new SemVer('1.2')).toThrow(RangeError);
    expect(() => new SemVer('')).toThrow(RangeError);
  });

  test('compare returns correct ordering', () => {
    const a = new SemVer('1.87.186');
    const b = new SemVer('1.87.188');
    const c = new SemVer('1.88.0');
    const d = new SemVer('2.0.0');

    expect(a.compare(b)).toBeLessThan(0);
    expect(b.compare(a)).toBeGreaterThan(0);
    expect(a.compare(a)).toBe(0);
    expect(a.compare(c)).toBeLessThan(0);
    expect(a.compare(d)).toBeLessThan(0);
    expect(d.compare(c)).toBeGreaterThan(0);
  });

  test('toString returns raw string', () => {
    expect(new SemVer('1.87.186').toString()).toBe('1.87.186');
  });
});

// ---------------------------------------------------------------------------
// Diagnostic
// ---------------------------------------------------------------------------

describe('Diagnostic', () => {
  test('toString formats with file and line', () => {
    const d = new Diagnostic(Severity.ERROR, 'bad thing', 42, 'CHANGELOG.md');
    expect(d.toString()).toBe('[ERROR] CHANGELOG.md:42: bad thing');
  });

  test('toString formats without file', () => {
    const d = new Diagnostic(Severity.WARNING, 'meh', 10);
    expect(d.toString()).toBe('[WARNING] line 10: meh');
  });
});

// ---------------------------------------------------------------------------
// ChangelogEntry
// ---------------------------------------------------------------------------

describe('ChangelogEntry', () => {
  test('extracts issue numbers', () => {
    const entry = new ChangelogEntry(
      ' - Fixed crash. ([#12345](https://github.com/brave/brave-browser/issues/12345)) & ([#67890](https://github.com/brave/brave-browser/issues/67890))',
      1
    );
    expect(entry.issueNumbers).toEqual([12345, 67890]);
  });

  test('hasValidPrefix with valid prefix', () => {
    const entry = new ChangelogEntry(' - Fixed something bad.', 1);
    expect(entry.hasValidPrefix()).toBe(true);
  });

  test('hasValidPrefix with invalid prefix', () => {
    const entry = new ChangelogEntry(' - Did something weird.', 1);
    expect(entry.hasValidPrefix()).toBe(false);
  });

  test('hasProperIssueLinks with full links', () => {
    const entry = new ChangelogEntry(
      ' - Fixed bug. ([#123](https://github.com/brave/brave-browser/issues/123))',
      1
    );
    expect(entry.hasProperIssueLinks()).toBe(true);
  });

  test('hasProperPunctuation', () => {
    expect(
      new ChangelogEntry(' - Fixed something.', 1).hasProperPunctuation()
    ).toBe(true);
    expect(
      new ChangelogEntry(' - Fixed something)', 1).hasProperPunctuation()
    ).toBe(true);
    expect(
      new ChangelogEntry(' - Fixed something', 1).hasProperPunctuation()
    ).toBe(false);
  });

  test('no issue numbers when none present', () => {
    const entry = new ChangelogEntry(' - General improvements.', 1);
    expect(entry.issueNumbers).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// ChangelogSection
// ---------------------------------------------------------------------------

describe('ChangelogSection', () => {
  test('isKnownSection returns true for valid sections', () => {
    for (const name of VALID_SECTIONS) {
      expect(new ChangelogSection(name, 1).isKnownSection()).toBe(true);
    }
  });

  test('isKnownSection returns false for unknown section', () => {
    expect(new ChangelogSection('FooBar', 1).isKnownSection()).toBe(false);
  });

  test('addEntry adds entries', () => {
    const section = new ChangelogSection('General', 1);
    section.addEntry(new ChangelogEntry(' - Fixed bug.', 2));
    section.addEntry(new ChangelogEntry(' - Added feature.', 3));
    expect(section.entries).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// ChangelogVersion
// ---------------------------------------------------------------------------

describe('ChangelogVersion', () => {
  test('entryCount sums across sections', () => {
    const ver = new ChangelogVersion(new SemVer('1.0.0'), 1);
    const s1 = new ChangelogSection('General', 2);
    s1.addEntry(new ChangelogEntry(' - A.', 3));
    s1.addEntry(new ChangelogEntry(' - B.', 4));
    const s2 = new ChangelogSection('Web3', 5);
    s2.addEntry(new ChangelogEntry(' - C.', 6));
    ver.addSection(s1);
    ver.addSection(s2);
    expect(ver.entryCount).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// ChangelogParser
// ---------------------------------------------------------------------------

describe('ChangelogParser', () => {
  const SAMPLE = `# Changelog

## [1.88.0](https://github.com/brave/brave-browser/releases/tag/v1.88.0)

### General

 - Added new feature. ([#100](https://github.com/brave/brave-browser/issues/100))
 - Fixed bug. ([#101](https://github.com/brave/brave-browser/issues/101))

### Web3

 - Updated wallet. ([#102](https://github.com/brave/brave-browser/issues/102))

## [1.87.186](https://github.com/brave/brave-browser/releases/tag/v1.87.186)

### General

 - Removed old code. ([#50](https://github.com/brave/brave-browser/issues/50))
`;

  test('parses versions correctly', () => {
    const { versions, diagnostics } = ChangelogParser.parse(SAMPLE);
    expect(diagnostics).toHaveLength(0);
    expect(versions).toHaveLength(2);
    expect(versions[0].version.toString()).toBe('1.88.0');
    expect(versions[1].version.toString()).toBe('1.87.186');
  });

  test('parses sections correctly', () => {
    const { versions } = ChangelogParser.parse(SAMPLE);
    expect(versions[0].sections).toHaveLength(2);
    expect(versions[0].sections[0].name).toBe('General');
    expect(versions[0].sections[1].name).toBe('Web3');
  });

  test('parses entries correctly', () => {
    const { versions } = ChangelogParser.parse(SAMPLE);
    expect(versions[0].sections[0].entries).toHaveLength(2);
    expect(versions[0].sections[1].entries).toHaveLength(1);
    expect(versions[1].sections[0].entries).toHaveLength(1);
  });

  test('handles entries outside sections', () => {
    const content = `# Changelog

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

 - Fixed something. ([#1](https://github.com/brave/brave-browser/issues/1))
`;
    const { versions } = ChangelogParser.parse(content);
    expect(versions[0].sections).toHaveLength(1);
    expect(versions[0].sections[0].name).toBe('General');
  });

  test('handles empty content', () => {
    const { versions, diagnostics } = ChangelogParser.parse('');
    expect(versions).toHaveLength(0);
    expect(diagnostics).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// ChangelogValidator
// ---------------------------------------------------------------------------

describe('ChangelogValidator', () => {
  test('reports missing file header', () => {
    const validator = new ChangelogValidator();
    const diags = validator.validate('## Not a changelog', 'test.md');
    expect(diags.some((d) => d.message.includes('# Changelog'))).toBe(true);
  });

  test('reports version ordering errors', () => {
    const content = `# Changelog

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

 - Added thing. ([#1](https://github.com/brave/brave-browser/issues/1))

## [1.1.0](https://github.com/brave/brave-browser/releases/tag/v1.1.0)

 - Added thing. ([#2](https://github.com/brave/brave-browser/issues/2))
`;
    const validator = new ChangelogValidator();
    const diags = validator.validate(content, 'test.md');
    expect(
      diags.some(
        (d) =>
          d.severity === Severity.ERROR && d.message.includes('descending order')
      )
    ).toBe(true);
  });

  test('reports duplicate sections', () => {
    const content = `# Changelog

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

### General

 - Added thing. ([#1](https://github.com/brave/brave-browser/issues/1))

### General

 - Fixed thing. ([#2](https://github.com/brave/brave-browser/issues/2))
`;
    const validator = new ChangelogValidator();
    const diags = validator.validate(content, 'test.md');
    expect(
      diags.some(
        (d) =>
          d.severity === Severity.ERROR && d.message.includes('Duplicate section')
      )
    ).toBe(true);
  });

  test('reports unknown sections as warnings', () => {
    const content = `# Changelog

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

### UnknownSection

 - Added thing. ([#1](https://github.com/brave/brave-browser/issues/1))
`;
    const validator = new ChangelogValidator();
    const diags = validator.validate(content, 'test.md');
    expect(
      diags.some(
        (d) =>
          d.severity === Severity.WARNING &&
          d.message.includes('Unknown section')
      )
    ).toBe(true);
  });

  test('reports invalid entry prefixes', () => {
    const content = `# Changelog

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

### General

 - Blurped something. ([#1](https://github.com/brave/brave-browser/issues/1))
`;
    const validator = new ChangelogValidator();
    const diags = validator.validate(content, 'test.md');
    expect(
      diags.some((d) => d.message.includes('action verb'))
    ).toBe(true);
  });

  test('reports duplicate issue references', () => {
    const content = `# Changelog

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

### General

 - Fixed bug A. ([#100](https://github.com/brave/brave-browser/issues/100))
 - Fixed bug B. ([#100](https://github.com/brave/brave-browser/issues/100))
`;
    const validator = new ChangelogValidator();
    const diags = validator.validate(content, 'test.md');
    expect(
      diags.some((d) => d.message.includes('#100') && d.message.includes('multiple'))
    ).toBe(true);
  });

  test('strict mode treats warnings as errors', () => {
    const content = `# Changelog

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

### WeirdSection

 - Blurped. ([#1](https://github.com/brave/brave-browser/issues/1))
`;
    const strict = new ChangelogValidator({ strict: true });
    strict.validate(content, 'test.md');
    expect(strict.hasErrors()).toBe(true);

    const normal = new ChangelogValidator({ strict: false });
    normal.validate(content, 'test.md');
    // Only warnings, not errors
    expect(
      normal.diagnostics.every(
        (d) => d.severity !== Severity.ERROR
      )
    ).toBe(true);
  });

  test('clean changelog produces no errors', () => {
    const content = `# Changelog

## [1.1.0](https://github.com/brave/brave-browser/releases/tag/v1.1.0)

### General

 - Added new feature. ([#200](https://github.com/brave/brave-browser/issues/200))
 - Fixed crash on startup. ([#201](https://github.com/brave/brave-browser/issues/201))

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

### General

 - Added initial release. ([#100](https://github.com/brave/brave-browser/issues/100))
`;
    const validator = new ChangelogValidator();
    const diags = validator.validate(content, 'test.md');
    const errors = diags.filter((d) => d.severity === Severity.ERROR);
    expect(errors).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// ChangelogStatistics
// ---------------------------------------------------------------------------

describe('ChangelogStatistics', () => {
  test('summarizes parsed versions', () => {
    const content = `# Changelog

## [1.1.0](https://github.com/brave/brave-browser/releases/tag/v1.1.0)

### General

 - Added A. ([#1](https://github.com/brave/brave-browser/issues/1))
 - Fixed B. ([#2](https://github.com/brave/brave-browser/issues/2))

### Web3

 - Updated C. ([#3](https://github.com/brave/brave-browser/issues/3))

## [1.0.0](https://github.com/brave/brave-browser/releases/tag/v1.0.0)

### General

 - Added D. ([#4](https://github.com/brave/brave-browser/issues/4))
`;
    const { versions } = ChangelogParser.parse(content);
    const stats = ChangelogStatistics.summarize(versions);

    expect(stats.totalVersions).toBe(2);
    expect(stats.totalEntries).toBe(4);
    expect(stats.uniqueIssuesReferenced).toBe(4);
    expect(stats.latestVersion).toBe('1.1.0');
    expect(stats.oldestVersion).toBe('1.0.0');
    expect(stats.entriesPerSection).toEqual({ General: 3, Web3: 1 });
  });

  test('handles empty versions array', () => {
    const stats = ChangelogStatistics.summarize([]);
    expect(stats.totalVersions).toBe(0);
    expect(stats.totalEntries).toBe(0);
    expect(stats.latestVersion).toBeNull();
  });
});
