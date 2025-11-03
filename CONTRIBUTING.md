# Contributing to Secretariat Browser

Thank you for your interest in contributing to Secretariat! We welcome contributions of all kinds - whether you're fixing bugs, adding features, improving documentation, or helping with the Discovery Engine.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can You Contribute?](#how-can-you-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Discovery Engine Development](#discovery-engine-development)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can You Contribute?

### 🐛 Report Bugs

- Check if the bug has already been reported in [Issues](https://github.com/jpugh7/Secretariat-from-Brave-browser-/issues)
- If not, create a new issue with:
  - Clear title and description
  - Steps to reproduce
  - Expected vs actual behavior
  - Secretariat version and OS (focus: Linux)
  - Screenshots if applicable

### 💡 Suggest Features

- Check existing feature requests first
- Open a new issue tagged `enhancement`
- Describe the feature and its use case
- Consider how it fits with Secretariat's philosophy (privacy, discovery, serendipity)

### 📝 Improve Documentation

We need help with:
- Setup instructions (especially Linux-specific)
- Discovery Engine usage guides
- API documentation
- Code comments
- Translations (future)

### 🔧 Write Code

Help us build the Discovery Engine and improve the browser:
- Fix bugs from the issue tracker
- Implement new Discovery Engine features
- Improve performance
- Add tests
- Work on UI/UX

### 🎨 Design & UX

- Help refine the Discovery Engine UI
- Create mockups for new features
- Improve the color scheme implementation
- Design icons and assets

### 🧪 Test & QA

- Test builds on different Linux distributions
- Test Discovery Engine with various search profiles
- Report edge cases and bugs
- Verify fixes

## Getting Started

### Prerequisites

Secretariat is **Linux-first**. Development currently focuses on Linux (Ubuntu, Debian, Fedora, Arch).

See **[SETUP.md](./SETUP.md)** for complete setup instructions.

**Quick checklist:**
- ✅ Linux OS (Ubuntu 20.04+ recommended)
- ✅ Node.js v24.x
- ✅ npm v11.0.0+
- ✅ Python 3
- ✅ Build tools (`build-essential`, `ninja-build`, etc.)
- ✅ 100+ GB free disk space
- ✅ 16+ GB RAM recommended

### Clone and Build

```bash
# Clone the repository
git clone https://github.com/jpugh7/Secretariat-from-Brave-browser-.git
cd Secretariat-from-Brave-browser-

# Install dependencies
npm install

# Initialize (downloads Chromium - takes time!)
npm run init

# Build Secretariat
npm run build

# Run the browser
npm start
```

## Development Workflow

### Repository Structure

```
Secretariat-from-Brave-browser-/
├── src/brave/              # brave-core (base code)
│   ├── components/         # Browser components
│   │   └── discovery_search/  # Discovery Engine (TO CREATE)
│   ├── browser/            # Browser-level code
│   └── ...
├── scripts/                # Build scripts
├── lib/                    # Build utilities
└── docs/                   # Documentation
```

**Two Repositories:**
- **Root** (`Secretariat-from-Brave-browser-`): Build orchestration
- **brave-core** (`src/brave/`): Actual browser code

### Branching Strategy

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/issue-number-description

# For Discovery Engine work
git checkout -b discovery/feature-name
```

### Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/add-serendipity-mode
   ```

2. **Make Your Changes**
   - Edit files in `src/brave/` for browser code
   - Edit root files for build system changes
   - Follow coding standards (see below)

3. **Test Your Changes**
   ```bash
   npm run build
   npm start
   npm run test
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add serendipity mode to Discovery Engine

   - Implement serendipity profile
   - Add randomization algorithm
   - Update UI to show mode selector

   Closes #123"
   ```

### Commit Message Format

Use clear, descriptive commit messages:

```
Short summary (50 chars or less)

More detailed explanation if needed (wrap at 72 characters).
Explain what and why, not how.

- Bullet points are okay
- Use present tense ("Add feature" not "Added feature")
- Reference issues and PRs

Closes #123
Fixes #456
```

## Pull Request Process

### Before Submitting

- [ ] Code builds successfully (`npm run build`)
- [ ] All tests pass (`npm run test`)
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Code follows style guidelines
- [ ] No merge conflicts with main branch

### PR Template

When you create a PR, include:

**Title**: Clear, descriptive (used in release notes)

**Description**:
- **Summary**: What does this PR do?
- **Motivation**: Why is this change needed?
- **Related Issues**: Closes #123, Fixes #456
- **Test Plan**: How to test the changes
- **Screenshots**: For UI changes
- **Breaking Changes**: List any breaking changes

**Example:**
```markdown
## Summary
Add Serendipity Mode to Discovery Engine

## Motivation
Users want to maximize randomness and discover unexpected content.
This implements the mode described in the Discovery Engine spec.

## Related Issues
Closes #123

## Test Plan
1. Open Secretariat
2. Navigate to Discovery Engine settings
3. Select "Serendipity Mode"
4. Perform a search
5. Verify results are highly randomized

## Screenshots
[Include screenshots of the mode selector]
```

### Review Process

1. **Automated Checks**: CI/CD runs tests
2. **Code Review**: Maintainer reviews code
3. **Discussion**: Address feedback
4. **Approval**: Maintainer approves
5. **Merge**: We'll merge when ready

**Response Time**: We aim to review PRs within 7 days.

## Discovery Engine Development

The Discovery Engine is Secretariat's killer feature. Here's how to contribute:

### Architecture

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for complete details.

**Key components:**
- `components/discovery_search/` - Backend logic
- `browser/ui/webui/discovery_search_ui/` - Frontend UI
- `components/search_engines/` - Search engine integration

### Discovery Engine Checklist

When working on Discovery Engine features:

- [ ] Update Discovery Profile data structures if needed
- [ ] Implement backend logic in C++
- [ ] Create/update WebUI interface
- [ ] Add unit tests
- [ ] Add browser tests
- [ ] Update documentation
- [ ] Consider privacy implications
- [ ] Test with different profiles (Balanced, Serendipity, etc.)

### Priority Areas

**High Priority:**
1. Result mixing algorithm
2. Source classification system
3. Search archive implementation
4. RSS blog index

**Medium Priority:**
1. Profile sharing
2. Multi-search functionality
3. Time travel search

**Future:**
1. Machine learning for intent detection
2. Advanced collaborative filtering

## Coding Standards

### C++ (Browser Code)

Follow [Chromium C++ Style Guide](https://chromium.googlesource.com/chromium/src/+/master/styleguide/c++/c++.md):

```cpp
// Use Chromium naming conventions
class DiscoverySearchService {
 public:
  DiscoverySearchService();
  ~DiscoverySearchService();

  // Methods use CamelCase
  void PerformSearch(const std::string& query);

 private:
  // Members use underscore_suffix_
  std::unique_ptr<ResultMixer> result_mixer_;
};
```

**Tools:**
- Use `clang-format` for automatic formatting
- Run `npm run lint` before committing

### JavaScript (UI Code)

Follow [StandardJS](https://standardjs.com/) style:

```javascript
// Use camelCase for variables
const searchQuery = 'rust programming'

// Use const/let, not var
const profile = getActiveProfile()

// Arrow functions for callbacks
results.map(result => {
  return formatResult(result)
})
```

**Tools:**
- ESLint with StandardJS config
- Prettier for formatting

### Python (Build Scripts)

Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/):

```python
# snake_case for functions and variables
def process_search_results(query, results):
    filtered_results = []
    for result in results:
        if is_valid(result):
            filtered_results.append(result)
    return filtered_results
```

## Testing

### Running Tests

```bash
# All tests
npm run test

# Unit tests
npm run test brave_unit_tests

# Browser tests
npm run test brave_browser_tests

# Discovery Engine tests (once implemented)
npm run test discovery_search_tests
```

### Writing Tests

**Unit Tests (C++):**
```cpp
// discovery_profile_unittest.cc
TEST_F(DiscoveryProfileTest, CreatesDefaultProfile) {
  DiscoveryProfile profile = DiscoveryProfile::CreateDefault();
  EXPECT_EQ(profile.name(), "Balanced Discovery");
  EXPECT_EQ(profile.official_percent(), 20);
}
```

**Browser Tests (C++):**
```cpp
// discovery_search_browsertest.cc
IN_PROC_BROWSER_TEST_F(DiscoverySearchTest, PerformsSearch) {
  NavigateToURL("secretariat://discovery");
  // Test search functionality
}
```

**JavaScript Tests:**
```javascript
// discovery_search_test.js
describe('DiscoverySearch', () => {
  it('loads search results', async () => {
    const results = await performSearch('test query')
    expect(results.length).toBeGreaterThan(0)
  })
})
```

### Test Coverage

We aim for:
- **Unit tests**: 80%+ coverage
- **Browser tests**: Critical user flows
- **Integration tests**: Discovery Engine end-to-end

## Documentation

### Code Comments

```cpp
// Good: Explains why, not what
// Use result caching to avoid redundant DuckDuckGo queries.
// This significantly improves performance for popular searches.
cache->Set(query, results);

// Bad: Explains what (obvious from code)
// Set the cache
cache->Set(query, results);
```

### API Documentation

Use Doxygen-style comments for C++:

```cpp
/**
 * Performs a discovery search with the given profile.
 *
 * @param query The search query string
 * @param profile The discovery profile to use for mixing
 * @return Vector of SearchResult objects, ordered by relevance
 *
 * This method queries multiple backends in parallel, classifies
 * results by source type, and mixes them according to the profile.
 */
std::vector<SearchResult> PerformSearch(
    const std::string& query,
    const DiscoveryProfile& profile);
```

### Updating Documentation

When you change functionality, update:
- **README.md**: If setup process changes
- **ARCHITECTURE.md**: If architecture changes
- **Discovery Engine docs**: If search behavior changes
- **Code comments**: Always

## Linux-First Development

Secretariat is **Linux-first**. When developing:

### ✅ Do This
- Test primarily on Linux (Ubuntu/Debian)
- Use Linux-specific optimizations
- Document Linux setup steps
- Use Linux-native tools

### ⏸️ Later (Deprioritized)
- macOS support (Phase 2+)
- Windows support (Phase 2+)
- Android/iOS (Phase 3+)

### Platform-Specific Code

When you must write platform code:

```cpp
#if defined(OS_LINUX)
  // Linux-specific implementation
  LinuxSpecificFunction();
#else
  // Generic fallback (not currently supported)
  LOG(WARNING) << "Platform not fully supported";
#endif
```

## Getting Help

### Resources

- **[SETUP.md](./SETUP.md)**: Setup and build instructions
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Technical architecture
- **[SECRETARIAT_ROADMAP.md](./SECRETARIAT_ROADMAP.md)**: Development roadmap
- **[Discovery Engine Design Doc](./Secretariat%20Search%20-%20_Discovery%20Engine_%20Design%20Document.md)**: Complete feature spec

### Ask Questions

- **GitHub Issues**: For bugs and features
- **GitHub Discussions**: For questions and ideas (coming soon)
- **Pull Request Comments**: For code-specific questions

### Response Time

We're a small team. Please be patient:
- **Issues**: Acknowledged within 7 days
- **PRs**: Reviewed within 14 days
- **Questions**: Answered as time permits

## Recognition

Contributors will be recognized in:
- **CONTRIBUTORS.md**: List of all contributors
- **Release notes**: For significant contributions
- **About page**: In the browser itself

## License

By contributing to Secretariat, you agree that your contributions will be licensed under the [MPL-2.0 License](./LICENSE).

---

## Quick Links

- 📋 [Issues](https://github.com/jpugh7/Secretariat-from-Brave-browser-/issues)
- 🔀 [Pull Requests](https://github.com/jpugh7/Secretariat-from-Brave-browser-/pulls)
- 📖 [Wiki](https://github.com/jpugh7/Secretariat-from-Brave-browser-/wiki) (coming soon)
- 💬 [Discussions](https://github.com/jpugh7/Secretariat-from-Brave-browser-/discussions) (coming soon)

---

**Thank you for contributing to Secretariat!** Together, we're building a browser that brings serendipity back to the web. 🌟
