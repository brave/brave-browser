# Secretariat Browser Development Roadmap

## Project Vision

Create a privacy-focused browser with a revolutionary Discovery Engine that breaks free from SEO-dominated search results and restores serendipity to web browsing.

## Development Phases

---

## Phase 0: Foundation & Setup ✅

**Timeline**: Weeks 1-2
**Status**: In Progress

### Goals
- Fork and analyze Brave Browser codebase
- Create project documentation
- Set up development environment
- Plan technical architecture

### Tasks
- [x] Fork Brave Browser repository
- [x] Analyze codebase structure
- [x] Read and understand Discovery Engine design document
- [x] Create Secretariat README
- [x] Create development roadmap
- [ ] Set up development environment
- [ ] Successfully build Brave Browser
- [ ] Test build on target platforms (Linux, macOS, Windows)

### Deliverables
- ✅ Project documentation (README, ROADMAP)
- ✅ Codebase analysis
- ⏳ Working build environment
- ⏳ Initial git branch structure

---

## Phase 1: Core Rebranding

**Timeline**: Weeks 3-4
**Status**: Pending

### Goals
- Rebrand all "Brave" references to "Secretariat"
- Update visual assets (logos, icons)
- Rename internal identifiers
- Create Secretariat branding

### Tasks

#### 1.1 Package & Configuration Files
- [ ] Update `package.json` (name, version, description)
- [ ] Update `README.md` to point to Secretariat resources
- [ ] Update `CONTRIBUTING.md` with Secretariat guidelines
- [ ] Create `.nvmrc` or document Node.js version requirements

#### 1.2 String Resources (src/brave/app/)
- [ ] Update `brave_strings.grd` → `secretariat_strings.grd`
- [ ] Replace all "Brave" → "Secretariat" in string file
- [ ] Update product descriptions
- [ ] Update About page text
- [ ] Create string extraction script for validation

#### 1.3 Preference Names (src/brave/common/)
- [ ] Update `pref_names.h` with Secretariat prefixes
- [ ] Update `pref_names.cc` implementation
- [ ] Update default preference values
- [ ] Document breaking changes from Brave

#### 1.4 Visual Assets
- [ ] Design Secretariat logo (SVG)
- [ ] Create browser icon set (16x16 to 512x512)
- [ ] Update splash screen
- [ ] Create About page branding
- [ ] Update theme colors
- [ ] Replace Brave assets in `app/resources/`

#### 1.5 Build System
- [ ] Update build identifiers
- [ ] Update package metadata
- [ ] Create Secretariat installer names
- [ ] Update version numbering scheme (0.1.0)

### Deliverables
- ⏳ Fully rebranded browser binary
- ⏳ Secretariat visual identity
- ⏳ Updated documentation
- ⏳ Rebranding validation script

### Success Criteria
- No "Brave" references in user-visible UI
- All logos and icons show Secretariat branding
- Browser launches with Secretariat name
- About page shows Secretariat information

---

## Phase 2: Discovery Engine Foundation

**Timeline**: Weeks 5-8
**Status**: Pending

### Goals
- Create Discovery Engine component architecture
- Implement basic Discovery Profile system
- Build search backend integration
- Create simple search UI

### Tasks

#### 2.1 Component Structure
- [ ] Create `src/brave/components/discovery_search/` directory
- [ ] Set up BUILD.gn build configuration
- [ ] Create component header files
- [ ] Implement basic service architecture
- [ ] Set up unit test framework

#### 2.2 Discovery Profile System
```
Files to create:
- components/discovery_search/discovery_profile.h
- components/discovery_search/discovery_profile.cc
- components/discovery_search/discovery_profile_manager.h
- components/discovery_search/discovery_profile_manager.cc
```

- [ ] Define DiscoveryProfile data structure
- [ ] Implement profile serialization (JSON)
- [ ] Create profile storage (local file system)
- [ ] Implement profile CRUD operations
- [ ] Create 3 default profiles:
  - Balanced Discovery
  - Academic Research
  - Maximum Serendipity

#### 2.3 Search Backend Integration
```
Files to create:
- components/discovery_search/search_backend_interface.h
- components/discovery_search/duckduckgo_backend.h
- components/discovery_search/duckduckgo_backend.cc
```

- [ ] Create search backend interface
- [ ] Implement DuckDuckGo API integration
- [ ] Create search result data structures
- [ ] Implement result parsing
- [ ] Add error handling and retry logic
- [ ] Create unit tests for backend

#### 2.4 Result Mixing Algorithm
```
Files to create:
- components/discovery_search/result_mixer.h
- components/discovery_search/result_mixer.cc
- components/discovery_search/source_classifier.h
- components/discovery_search/source_classifier.cc
```

- [ ] Implement source classification logic
- [ ] Create result mixing algorithm
- [ ] Implement weighted sampling
- [ ] Add serendipity/randomness injection
- [ ] Create deduplication logic
- [ ] Add result ranking within categories

#### 2.5 Basic Search UI
```
Files to create:
- browser/ui/webui/discovery_search_ui/discovery_search_ui.h
- browser/ui/webui/discovery_search_ui/discovery_search_ui.cc
- browser/ui/webui/discovery_search_ui/resources/discovery_search.html
- browser/ui/webui/discovery_search_ui/resources/discovery_search.css
- browser/ui/webui/discovery_search_ui/resources/discovery_search.js
```

- [ ] Create WebUI page for search interface
- [ ] Design card-based result layout
- [ ] Implement search input handling
- [ ] Display categorized results
- [ ] Add source type indicators
- [ ] Create loading states

### Deliverables
- ⏳ Discovery Engine component (C++)
- ⏳ Discovery Profile system
- ⏳ DuckDuckGo backend integration
- ⏳ Result mixing algorithm
- ⏳ Basic search UI
- ⏳ Unit tests (>80% coverage)

### Success Criteria
- Can create and save Discovery Profiles
- Can query DuckDuckGo API successfully
- Results are mixed according to profile weights
- Search UI displays categorized results
- Different source types are visually distinguished

---

## Phase 3: Address Bar Integration

**Timeline**: Weeks 9-10
**Status**: Pending

### Goals
- Integrate Discovery Engine with browser address bar
- Implement search suggestions
- Create mode switching UI

### Tasks

#### 3.1 OmniBox Integration
- [ ] Study Chromium's OmniBox architecture
- [ ] Create patches for Discovery Engine integration
- [ ] Implement search query detection
- [ ] Route searches to Discovery Engine
- [ ] Handle special search operators

#### 3.2 Search Suggestions
- [ ] Implement suggestion provider
- [ ] Add Discovery Mode indicators
- [ ] Show recent searches
- [ ] Display active profile name
- [ ] Create quick mode switcher

#### 3.3 Settings Integration
```
Files to create:
- browser/ui/webui/settings/discovery_search_handler.h
- browser/ui/webui/settings/discovery_search_handler.cc
- browser/ui/webui/settings/discovery_search_page/
```

- [ ] Create Discovery Engine settings page
- [ ] Add profile editor UI
- [ ] Implement profile weight sliders
- [ ] Add blocked sites management
- [ ] Create favorites/boost management

### Deliverables
- ⏳ Functional address bar search
- ⏳ Search suggestions
- ⏳ Settings UI
- ⏳ Profile management interface

### Success Criteria
- Typing in address bar triggers Discovery Engine
- Can switch Discovery Modes from address bar
- Settings page allows full profile customization
- Changes persist across browser restarts

---

## Phase 4: Enhanced Discovery Features

**Timeline**: Weeks 11-14
**Status**: Pending

### Goals
- Implement all 5 Discovery Modes
- Add saved searches and archives
- Build RSS index for hobbyist blogs
- Implement source blocking and favorites

### Tasks

#### 4.1 All Discovery Modes
- [ ] Implement Balanced Discovery mode
- [ ] Implement Deep Dive mode (academic focus)
- [ ] Implement Serendipity mode (maximum random)
- [ ] Implement Focused mode (traditional SEO)
- [ ] Implement Community mode (forums/social)
- [ ] Add mode auto-detection based on query
- [ ] Create mode switching UI

#### 4.2 Search Archives
```
Files to create:
- components/discovery_search/search_archive.h
- components/discovery_search/search_archive.cc
- components/discovery_search/search_archive_manager.h
- browser/ui/webui/search_archives_ui/
```

- [ ] Design search archive data structure
- [ ] Implement search snapshot saving
- [ ] Create archive storage (SQLite?)
- [ ] Build search history UI
- [ ] Add visited/bookmarked tracking
- [ ] Implement notes and annotations
- [ ] Add export functionality (Markdown, CSV, JSON, HTML)
- [ ] Create search comparison feature

#### 4.3 RSS Blog Index
```
Files to create:
- components/discovery_search/rss_aggregator.h
- components/discovery_search/rss_aggregator.cc
- components/discovery_search/blog_index.h
- components/discovery_search/blog_index.cc
```

- [ ] Implement RSS feed parser
- [ ] Create blog discovery crawler
- [ ] Build local blog index
- [ ] Implement quality scoring
- [ ] Add freshness tracking
- [ ] Create index update scheduler
- [ ] Integrate blog results into mixer

#### 4.4 Source Management
- [ ] Implement blocked sites list
- [ ] Create site blocking UI
- [ ] Add favorite sites with boost weights
- [ ] Implement domain pattern matching
- [ ] Create import/export for lists

### Deliverables
- ⏳ All 5 Discovery Modes functional
- ⏳ Search archive system
- ⏳ RSS blog index
- ⏳ Source blocking and favorites
- ⏳ Archive viewer UI

### Success Criteria
- All Discovery Modes produce distinct result sets
- Can save and revisit searches from weeks ago
- Hobbyist blog results appear in searches
- Can block spam sites permanently
- Favorite sites appear more frequently

---

## Phase 5: Community & Sharing Features

**Timeline**: Weeks 15-17
**Status**: Pending

### Goals
- Enable profile sharing
- Create collection system
- Implement community curation
- Add collaborative filtering

### Tasks

#### 5.1 Shared Profiles
- [ ] Design profile export format
- [ ] Implement profile import/export
- [ ] Create profile sharing UI
- [ ] Add profile remixing (clone + modify)
- [ ] Build profile gallery/marketplace

#### 5.2 Search Collections
- [ ] Design collection data structure
- [ ] Implement collection creation from searches
- [ ] Add manual result additions
- [ ] Create collection sharing
- [ ] Build collection viewer UI

#### 5.3 Community Curation
- [ ] Design site submission system
- [ ] Create submission review UI
- [ ] Implement community voting
- [ ] Add spam reporting
- [ ] Create moderation tools

#### 5.4 Collaborative Filtering
- [ ] Design anonymous similarity matching
- [ ] Implement "similar users found" feature
- [ ] Add privacy-preserving recommendations
- [ ] Create opt-in/opt-out controls

### Deliverables
- ⏳ Profile sharing system
- ⏳ Search collections
- ⏳ Community curation platform
- ⏳ Collaborative filtering (privacy-preserving)

### Success Criteria
- Users can share Discovery Profiles
- Collections can be subscribed to
- Community can suggest quality sites
- Recommendations are useful but private

---

## Phase 6: Advanced Search Features

**Timeline**: Weeks 18-20
**Status**: Pending

### Goals
- Implement time travel search
- Add multi-search functionality
- Create contextual auto-switching
- Implement advanced filters

### Tasks

#### 6.1 Time Travel Search
- [ ] Add temporal indexing
- [ ] Create time range UI
- [ ] Implement historical result retrieval
- [ ] Build result comparison over time
- [ ] Add "search snapshot" feature

#### 6.2 Multi-Search
- [ ] Design multi-query interface
- [ ] Implement intersection search (AND)
- [ ] Implement union search (OR)
- [ ] Create Venn diagram visualization
- [ ] Add query builder UI

#### 6.3 Contextual Auto-Switching
- [ ] Implement query intent detection
- [ ] Create auto-mode-switching logic
- [ ] Add notification for mode changes
- [ ] Create override controls
- [ ] Build intent classifier (ML?)

#### 6.4 Advanced Filters
- [ ] Add geographic filtering
- [ ] Implement language filters
- [ ] Create content type filters (video, PDF, etc.)
- [ ] Add word count filters
- [ ] Implement date range filters

### Deliverables
- ⏳ Time travel search
- ⏳ Multi-search functionality
- ⏳ Contextual mode switching
- ⏳ Advanced filter system

### Success Criteria
- Can search "JavaScript frameworks" from 2010-2015
- Multi-search finds intersection results
- Browser auto-switches to Focused for error searches
- Filters work across all Discovery Modes

---

## Phase 7: Polish & Optimization

**Timeline**: Weeks 21-24
**Status**: Pending

### Goals
- Performance optimization
- UI/UX refinement
- Security hardening
- Bug fixing

### Tasks

#### 7.1 Performance
- [ ] Profile search query performance
- [ ] Optimize result mixing algorithm
- [ ] Add result caching
- [ ] Implement progressive loading
- [ ] Reduce memory usage
- [ ] Benchmark against Chrome, Firefox

#### 7.2 UI/UX Polish
- [ ] Conduct user testing
- [ ] Refine visual design
- [ ] Improve animations and transitions
- [ ] Add keyboard shortcuts
- [ ] Create onboarding flow
- [ ] Design help system

#### 7.3 Security
- [ ] Security audit of Discovery Engine
- [ ] Audit third-party dependencies
- [ ] Implement CSP for WebUI
- [ ] Test against common vulnerabilities
- [ ] Create security documentation

#### 7.4 Quality Assurance
- [ ] Fix critical bugs
- [ ] Address performance issues
- [ ] Test on all platforms (Windows, macOS, Linux)
- [ ] Verify privacy guarantees
- [ ] Test edge cases

### Deliverables
- ⏳ Optimized performance
- ⏳ Polished UI/UX
- ⏳ Security audit report
- ⏳ Bug-free release candidate

### Success Criteria
- Search results appear in <1 second
- UI is smooth and responsive
- No critical security vulnerabilities
- Stable on all platforms

---

## Phase 8: Documentation & Release

**Timeline**: Weeks 25-26
**Status**: Pending

### Goals
- Complete user documentation
- Create developer guides
- Build installer packages
- Launch public release

### Tasks

#### 8.1 Documentation
- [ ] Write user guide
- [ ] Create Discovery Engine tutorial
- [ ] Document all Discovery Modes
- [ ] Write FAQ
- [ ] Create video tutorials
- [ ] Translate to major languages

#### 8.2 Developer Documentation
- [ ] Write architecture overview
- [ ] Document Discovery Engine API
- [ ] Create contribution guide
- [ ] Write build instructions for all platforms
- [ ] Document testing procedures

#### 8.3 Packaging
- [ ] Create Windows installer (MSI/EXE)
- [ ] Create macOS disk image (DMG)
- [ ] Create Linux packages (DEB, RPM, AppImage)
- [ ] Set up update mechanism
- [ ] Create release automation

#### 8.4 Marketing & Launch
- [ ] Create website
- [ ] Write launch blog post
- [ ] Create demo videos
- [ ] Prepare social media content
- [ ] Reach out to tech press
- [ ] Submit to privacy communities (r/privacy, HackerNews)

### Deliverables
- ⏳ Complete documentation
- ⏳ Installer packages for all platforms
- ⏳ Marketing materials
- ⏳ Public v1.0.0 release

### Success Criteria
- Users can download and install easily
- Documentation answers common questions
- Positive reception in privacy communities
- 1000+ downloads in first week

---

## Post-Launch: Iteration & Growth

**Timeline**: Ongoing
**Status**: Future

### Goals
- Gather user feedback
- Fix bugs and issues
- Add community-requested features
- Grow user base

### Ongoing Tasks
- Monitor bug reports
- Respond to feature requests
- Update documentation
- Release regular updates
- Engage with community
- Improve Discovery Engine algorithm

### Future Feature Ideas
- Mobile version (Android/iOS)
- Browser extensions marketplace
- P2P profile/collection sharing
- Decentralized search index
- AI-powered source classification
- Advanced privacy features
- Bookmark sync across devices
- Reading mode improvements

---

## Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Project Setup | Week 2 | 🔄 In Progress |
| First Build | Week 2 | ⏳ Pending |
| Complete Rebranding | Week 4 | ⏳ Pending |
| Discovery Engine MVP | Week 8 | ⏳ Pending |
| Address Bar Integration | Week 10 | ⏳ Pending |
| Search Archives | Week 14 | ⏳ Pending |
| Feature Complete | Week 20 | ⏳ Pending |
| Beta Release | Week 24 | ⏳ Pending |
| Public v1.0 Release | Week 26 | ⏳ Pending |

---

## Resource Requirements

### Team
- **Lead Developer**: Discovery Engine backend, architecture
- **UI/UX Designer**: Search interface, visual design
- **Frontend Developer**: WebUI, settings pages
- **QA Tester**: Testing, bug reporting
- **Documentation Writer**: User guides, developer docs

### Infrastructure
- **Development**: Personal computers (Linux/macOS/Windows)
- **CI/CD**: GitHub Actions (free for open source)
- **Website**: GitHub Pages or Netlify (free)
- **Distribution**: GitHub Releases (free)
- **Community**: GitHub Discussions (free)

### Budget
- **$0/month** for open source infrastructure
- Optional: Domain name (~$12/year)
- Optional: CDN for downloads (free tier)

---

## Risk Management

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Chromium updates break patches | High | High | Maintain patch documentation, test regularly |
| Search backend rate limiting | Medium | Medium | Implement caching, multiple backends |
| Poor result quality | Medium | High | Iterative algorithm improvement, user feedback |
| Performance issues | Medium | Medium | Regular profiling, optimization |

### Non-Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low user adoption | Medium | High | Strong marketing, unique value proposition |
| Competition from Kagi/others | Low | Medium | Stay free, focus on unique features |
| Legal issues with Brave fork | Low | High | Follow MPL-2.0 strictly, give credit |
| Maintainer burnout | Medium | High | Find co-maintainers, build community |

---

## Success Metrics

### Phase 2 (MVP)
- [ ] 100+ test users try Discovery Engine
- [ ] 10+ saved custom profiles
- [ ] Average search time <2 seconds

### Phase 4 (Enhanced)
- [ ] 500+ active users
- [ ] 50+ saved searches per user
- [ ] 1000+ hobbyist blogs indexed

### Phase 8 (Launch)
- [ ] 5,000+ downloads
- [ ] Featured on HackerNews front page
- [ ] 100+ GitHub stars
- [ ] 50+ community-submitted sites

### 6 Months Post-Launch
- [ ] 25,000+ active users
- [ ] 100+ shared Discovery Profiles
- [ ] Mentioned in "Google alternatives" articles
- [ ] Active community contributions

---

## Version History

- **v0.0.1** (Current): Project setup and planning
- **v0.1.0** (Target: Week 4): Rebranded browser, no Discovery Engine
- **v0.2.0** (Target: Week 8): Discovery Engine MVP
- **v0.5.0** (Target: Week 14): Feature-rich Discovery Engine
- **v0.9.0** (Target: Week 20): Feature complete
- **v1.0.0** (Target: Week 26): Public release

---

**Last Updated**: November 3, 2025
**Document Owner**: Secretariat Development Team
**Status**: Living Document (updated as project progresses)
