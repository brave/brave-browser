# Secretariat Browser

![Secretariat Browser](./docs/source/_static/Secretariat.svg)

## Overview

**Secretariat** is a privacy-focused web browser with a revolutionary **Discovery Engine** search system that breaks free from traditional SEO-dominated search results. Built on the Brave Browser open-source codebase (which itself is built on Chromium), Secretariat introduces a new paradigm for web discovery and exploration.

### What Makes Secretariat Different?

- **Discovery Engine**: Customizable search that lets YOU control what types of sources you see
- **Serendipity-First**: Rediscover the joy of finding unexpected gems on the web
- **Privacy-Focused**: No tracking, no profiling, no ads
- **Search Archives**: Never lose an interesting discovery again
- **Source Diversity**: Break the SEO monopoly and surface small blogs, hobbyist content, and hidden gems

## The Discovery Engine

Unlike traditional search engines (Google, Bing, DuckDuckGo) that use SEO-based ranking, Secretariat's **Discovery Engine** allows you to customize your search results by defining a "Discovery Profile":

### Discovery Profiles

Set custom percentages for different source types:
- **Official Sources** (20%): Government sites, official documentation, major organizations
- **Popular Media** (15%): Mainstream news, major publications
- **Hobbyist Blogs** (30%): Personal blogs, small websites, authentic voices
- **Academic Papers** (10%): Research, scholarly articles, scientific papers
- **Community Forums** (10%): Reddit, HackerNews, discussion boards
- **Video Content** (5%): YouTube, Vimeo, educational videos
- **Unexpected/Random** (10%): Wildcard discoveries from any source

### Discovery Modes

Switch between different search modes based on your intent:

1. **Balanced Discovery** (Default) - Mix of everything weighted by your profile
2. **Deep Dive Mode** - Academic and long-form content for serious research
3. **Serendipity Mode** - Maximize randomness, discover the unexpected
4. **Focused Mode** - Traditional SEO-style when you need "the answer"
5. **Community Mode** - Prioritize discussions, forums, and social media

### Search Archives

Save your searches and build a personal knowledge library:
- Full search snapshots with all results
- Track which results you visited
- Add personal notes and annotations
- Compare searches over time
- Export to Markdown, CSV, JSON, or HTML

## Technical Architecture

Secretariat is built on three core projects:

1. **Chromium** - The base browser engine
2. **Brave-Core** - Brave's privacy-focused browser implementation
3. **Secretariat Discovery Engine** - Our custom search and discovery system

### Repository Structure

```
secretariat-browser/ (this repo - build orchestration)
├── src/brave/                      # brave-core (cloned during init)
│   ├── components/
│   │   ├── discovery_search/       # Discovery Engine backend (TO BE CREATED)
│   │   ├── search_engines/         # Search engine integration
│   │   └── ...
│   ├── browser/
│   │   ├── ui/webui/
│   │   │   └── discovery_search_ui/ # Discovery Engine UI (TO BE CREATED)
│   │   └── ...
│   ├── app/
│   │   ├── brave_strings.grd       # User-visible text (REBRANDED)
│   │   └── resources/              # Icons and assets (REBRANDED)
│   └── ...
└── package.json                    # Main build configuration (REBRANDED)
```

## Development Roadmap

### Phase 1: Foundation & Rebranding (Current)
- ✅ Fork Brave Browser codebase
- ✅ Create Discovery Engine design document
- 🔄 Rebrand Brave → Secretariat
- 🔄 Set up build environment
- ⏳ Create Discovery Engine component structure

### Phase 2: Discovery Engine MVP (v0.1.0)
- ⏳ Implement Discovery Profile system
- ⏳ Create multi-backend search (DuckDuckGo + custom index)
- ⏳ Build result mixing and ranking algorithm
- ⏳ Design search UI with card-based gallery
- ⏳ Integrate with browser address bar
- ⏳ Implement 3 basic Discovery Modes (Balanced, Academic, Serendipity)

### Phase 3: Enhanced Discovery (v0.5.0)
- ⏳ Add RSS index for hobbyist blogs
- ⏳ Implement saved searches and search archives
- ⏳ Add source blocking and favorites
- ⏳ Create settings UI for Discovery Profiles
- ⏳ Implement all 5 Discovery Modes
- ⏳ Community curation system

### Phase 4: Full Discovery Engine (v1.0.0)
- ⏳ Advanced search archives (compare over time)
- ⏳ Shared profiles and collections
- ⏳ Contextual auto-switching
- ⏳ Time travel search
- ⏳ Multi-search functionality
- ⏳ Collaborative filtering

### Phase 5: Polish & Distribution
- ⏳ Performance optimization
- ⏳ Security audit
- ⏳ User documentation
- ⏳ Installer packages (Windows, macOS, Linux)
- ⏳ Public release

## Building Secretariat

### Prerequisites

Follow the instructions for your platform:
- [macOS](https://github.com/brave/brave-browser/wiki/macOS-Development-Environment)
- [Windows](https://github.com/brave/brave-browser/wiki/Windows-Development-Environment)
- [Linux](https://github.com/brave/brave-browser/wiki/Linux-Development-Environment)

Requirements:
- Node.js: v24.0.0 - v24.x
- npm: v11.0.0+
- Python 3
- Platform-specific build tools (Xcode, MSVC, GCC)

### Clone and Build

```bash
# Clone the repository
git clone <your-repo-url> secretariat-browser
cd secretariat-browser

# Install dependencies
npm install

# Initialize (downloads Chromium - this takes a while!)
npm run init

# Build Secretariat (Release build)
npm run build Release

# Run Secretariat
npm start Release
```

### Development Build

For faster iteration during development:

```bash
# Component build (faster, larger binary)
npm run build

# Debug build (with debugging symbols)
npm run build Debug

# Start the browser
npm start
```

### Build Configurations

- **Release**: Optimized build for distribution (`npm run build Release`)
- **Component**: Faster build, uses shared libraries (`npm run build`)
- **Debug**: Debug symbols enabled (`npm run build Debug`)
- **Static**: Statically linked binary (`npm run build Static`)

## Project Philosophy

### 1. Privacy First
- No user tracking or profiling
- No search history sent to servers
- Local-only search profiles and archives
- No ads, no monetization through data

### 2. Discovery Over Optimization
- Break the SEO monopoly
- Surface authentic voices and small creators
- Prioritize serendipity and unexpected finds
- User control over content mix

### 3. Transparency
- Open source (MPL-2.0 license)
- Clear about how search results are mixed
- No hidden ranking algorithms
- User-defined discovery rules

### 4. Simplicity & Beauty
- Clean, calm interface
- Thoughtful design choices
- No clutter or unnecessary features
- Focus on core browsing and discovery

## Contributing

We welcome contributions! Whether you're:
- A developer wanting to help build the Discovery Engine
- A designer with UI/UX ideas
- A blogger wanting to help with the hobbyist index
- A user with feedback and suggestions

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Key Areas for Contribution

1. **Discovery Engine Backend**
   - Search result mixing algorithms
   - Source classification system
   - RSS feed aggregation
   - Community curation tools

2. **UI/UX**
   - Search interface design
   - Discovery Profile configuration
   - Search archives visualization
   - Settings and preferences

3. **Content & Indexing**
   - Hobbyist blog discovery
   - Source classification
   - Quality scoring
   - Spam detection

4. **Documentation**
   - User guides
   - Developer documentation
   - Translation (i18n)

## Comparison to Other Browsers

| Feature | Chrome | Firefox | Brave | Secretariat |
|---------|--------|---------|-------|-------------|
| Privacy | ❌ Poor | ✅ Good | ✅ Excellent | ✅ Excellent |
| Customizable Search | ❌ No | ❌ No | ❌ No | ✅ **Discovery Engine** |
| SEO-Free Results | ❌ No | ❌ No | ❌ No | ✅ **Yes** |
| Search Archives | ❌ No | ❌ No | ❌ No | ✅ **Yes** |
| Source Diversity | ❌ Low | ❌ Low | ❌ Low | ✅ **High** |
| Serendipity | ❌ None | ❌ None | ❌ None | ✅ **Built-in** |
| Ad Blocking | ❌ No | ⚠️ Extensions | ✅ Built-in | ✅ Built-in |
| Open Source | ⚠️ Chromium | ✅ Yes | ✅ Yes | ✅ Yes |

## License

Secretariat is licensed under the **Mozilla Public License 2.0 (MPL-2.0)**, same as Brave Browser.

This means:
- ✅ Free to use, modify, and distribute
- ✅ Can be used commercially
- ✅ Source code must remain open
- ✅ Modifications must use MPL-2.0

See [LICENSE](./LICENSE) for full details.

## Credits

Secretariat is built upon:
- **Chromium** - Google's open-source browser project
- **Brave Browser** - Privacy-focused browser by Brave Software
- **DuckDuckGo** - Privacy-focused search engine (backend integration)
- **SearXNG** - Privacy-respecting metasearch engine

Special thanks to the Brave team for creating an excellent privacy-focused browser foundation.

## Community

- **Design Document**: See [Secretariat Search - Discovery Engine Design Document.md](./Secretariat%20Search%20-%20_Discovery%20Engine_%20Design%20Document.md) for the complete vision
- **Issues**: Report bugs and suggest features via GitHub Issues
- **Discussions**: Join our community discussions (coming soon)

## Vision

**"Search like a playlist, discover like an explorer."**

We believe the web should be diverse, surprising, and full of serendipitous discoveries. Secretariat aims to:

1. **Break the SEO monopoly** - Give small blogs and authentic voices a chance
2. **Restore serendipity** - Make "I found this amazing site" moments common again
3. **Empower users** - Put control in your hands, not algorithms'
4. **Preserve discoveries** - Never lose an interesting find again
5. **Champion privacy** - No tracking, no profiling, no compromise

**Join us in building the browser for curious people who miss the old web.**

---

**Status**: Early Development (Pre-Alpha)
**Current Version**: 0.0.1 (based on Brave 1.86.34 / Chromium 142.0.7444.60)
**License**: MPL-2.0
**Built with**: ❤️ and curiosity
