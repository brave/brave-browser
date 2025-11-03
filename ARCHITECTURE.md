# Secretariat Browser - Technical Architecture

## System Overview

Secretariat Browser is built on a three-layer architecture:

```
┌─────────────────────────────────────────────────┐
│         Secretariat Discovery Engine            │
│  (Custom search, profile management, archives)  │
├─────────────────────────────────────────────────┤
│              Brave Browser Core                 │
│    (Privacy features, ad-blocking, wallet)      │
├─────────────────────────────────────────────────┤
│            Chromium Browser Engine              │
│  (Rendering, networking, V8 JavaScript engine)  │
└─────────────────────────────────────────────────┘
```

## Directory Structure

```
secretariat-browser/
├── package.json                    # Build orchestration config
├── scripts/
│   └── init.js                     # Initialization script
├── lib/                            # Build utilities
├── docs/                           # Documentation
└── src/                            # Source code (created by npm init)
    ├── brave/                      # Brave-core (cloned from GitHub)
    │   ├── components/             # Browser components
    │   │   ├── discovery_search/   # 🆕 Discovery Engine (TO CREATE)
    │   │   ├── search_engines/     # Search integration
    │   │   ├── brave_search/       # Brave Search integration
    │   │   └── ...
    │   ├── browser/                # Browser-level code
    │   │   ├── ui/                 # User interface
    │   │   │   └── webui/          # WebUI pages
    │   │   │       └── discovery_search_ui/  # 🆕 Discovery UI (TO CREATE)
    │   │   ├── prefs/              # Preferences
    │   │   └── ...
    │   ├── app/                    # Application entry point
    │   │   ├── brave_strings.grd   # User-visible strings
    │   │   └── resources/          # Assets (icons, images)
    │   ├── common/                 # Shared code
    │   │   ├── pref_names.h/cc     # Preference definitions
    │   │   └── ...
    │   ├── renderer/               # Renderer process
    │   ├── chromium/patches/       # Patches to Chromium
    │   ├── BUILD.gn                # Build configuration
    │   └── DEPS                    # Dependencies
    └── chromium/                   # Chromium source (downloaded)
        └── src/
            ├── chrome/             # Chrome browser code
            ├── content/            # Content layer
            ├── net/                # Networking
            ├── v8/                 # JavaScript engine
            └── ...
```

## Discovery Engine Architecture

### Component Structure

```
src/brave/components/discovery_search/
├── BUILD.gn                        # Build configuration
├── README.md                       # Component documentation
├── discovery_search_service.h      # Main service interface
├── discovery_search_service.cc     # Main service implementation
├── discovery_profile/              # Profile management
│   ├── discovery_profile.h         # Profile data structure
│   ├── discovery_profile.cc        # Profile implementation
│   ├── profile_manager.h           # Profile CRUD operations
│   ├── profile_manager.cc          # Profile manager implementation
│   └── default_profiles.cc         # Preset profiles
├── search_backend/                 # Search backend integrations
│   ├── backend_interface.h         # Abstract backend interface
│   ├── duckduckgo_backend.h        # DuckDuckGo integration
│   ├── duckduckgo_backend.cc       # DDG implementation
│   ├── searxng_backend.h           # SearXNG integration
│   ├── searxng_backend.cc          # SearXNG implementation
│   └── custom_index_backend.h      # Custom blog index
├── result_mixer/                   # Result mixing logic
│   ├── result_mixer.h              # Mixer interface
│   ├── result_mixer.cc             # Mixing algorithm
│   ├── source_classifier.h         # Source classification
│   ├── source_classifier.cc        # Classification logic
│   └── diversity_ranker.h          # Diversity optimization
├── search_archive/                 # Search archive system
│   ├── search_archive.h            # Archive data structure
│   ├── search_archive.cc           # Archive implementation
│   ├── archive_manager.h           # Archive CRUD
│   ├── archive_manager.cc          # Archive management
│   └── archive_storage.h           # Storage backend (SQLite)
├── rss_index/                      # RSS blog indexing
│   ├── rss_aggregator.h            # RSS feed aggregation
│   ├── rss_aggregator.cc           # RSS implementation
│   ├── blog_index.h                # Blog index structure
│   ├── blog_index.cc               # Index management
│   └── quality_scorer.h            # Blog quality scoring
└── test/                           # Unit tests
    ├── discovery_profile_unittest.cc
    ├── result_mixer_unittest.cc
    └── ...
```

### UI Component Structure

```
src/brave/browser/ui/webui/discovery_search_ui/
├── discovery_search_ui.h           # WebUI page definition
├── discovery_search_ui.cc          # WebUI implementation
├── discovery_search_page_handler.h # Message handler
├── discovery_search_page_handler.cc
├── resources/                      # Frontend resources
│   ├── discovery_search.html       # Main page template
│   ├── discovery_search.css        # Styles
│   ├── discovery_search.js         # Frontend logic
│   ├── components/                 # UI components
│   │   ├── search_input.js         # Search input component
│   │   ├── result_card.js          # Result card component
│   │   ├── profile_selector.js     # Profile selector
│   │   └── mode_switcher.js        # Mode switcher
│   └── images/                     # UI images
│       ├── icon-official.svg
│       ├── icon-hobbyist.svg
│       └── ...
└── BUILD.gn                        # Build configuration
```

## Data Flow

### Search Request Flow

```
1. User Input
   │
   ├─→ Address Bar (OmniBox)
   │   └─→ AutocompleteController
   │       └─→ DiscoverySearchProvider
   │
   └─→ Search UI (WebUI)
       └─→ DiscoverySearchPageHandler
           │
           ▼
2. Discovery Engine Service
   │
   ├─→ Load Active Profile
   │   └─→ DiscoveryProfileManager
   │
   ├─→ Query Multiple Backends (Parallel)
   │   ├─→ DuckDuckGoBackend
   │   ├─→ SearXNGBackend
   │   └─→ CustomIndexBackend (Blogs)
   │
   ├─→ Classify Results
   │   └─→ SourceClassifier
   │       ├─→ Official sites
   │       ├─→ Popular media
   │       ├─→ Hobbyist blogs
   │       ├─→ Academic papers
   │       └─→ Community forums
   │
   ├─→ Mix Results
   │   └─→ ResultMixer
   │       ├─→ Apply profile weights
   │       ├─→ Sample from each category
   │       ├─→ Add serendipity picks
   │       └─→ Deduplicate
   │
   └─→ Save to Archive
       └─→ SearchArchiveManager
           │
           ▼
3. Return Results
   │
   ├─→ WebUI Display
   │   └─→ Render as card gallery
   │
   └─→ OmniBox Suggestions
       └─→ Show top results
```

### Profile Management Flow

```
User Interacts with Settings
   │
   ▼
Settings WebUI
   │
   ├─→ Create Profile
   │   └─→ DiscoveryProfileManager::CreateProfile()
   │
   ├─→ Edit Profile
   │   └─→ DiscoveryProfileManager::UpdateProfile()
   │
   ├─→ Delete Profile
   │   └─→ DiscoveryProfileManager::DeleteProfile()
   │
   └─→ Import/Export
       ├─→ ExportProfile() → JSON file
       └─→ ImportProfile() ← JSON file
           │
           ▼
Persist to Disk
   └─→ File: ~/.config/secretariat/discovery_profiles.json
```

## Key Data Structures

### DiscoveryProfile

```cpp
struct DiscoveryProfile {
  std::string id;                    // Unique identifier
  std::string name;                  // User-visible name
  std::string description;           // Profile description

  // Source mix percentages (must sum to 100)
  int official_percent;              // Official sources
  int popular_percent;               // Popular media
  int hobbyist_percent;              // Hobbyist blogs
  int academic_percent;              // Academic papers
  int community_percent;             // Forums/discussions
  int video_percent;                 // Video content
  int social_percent;                // Social media
  int unexpected_percent;            // Random/wildcard

  // Preferences
  FreshnessPreference freshness;     // Latest/Mixed/Timeless
  bool include_international;        // Geographic diversity
  std::vector<std::string> languages; // Language filters

  // Blocked and favorite sites
  std::vector<std::string> blocked_sites;
  std::map<std::string, float> favorite_sites; // domain → boost weight

  // Metadata
  base::Time created_at;
  base::Time modified_at;
  bool is_default;                   // Is this a preset?
};
```

### SearchResult

```cpp
struct SearchResult {
  std::string url;                   // Result URL
  std::string title;                 // Page title
  std::string snippet;               // Text excerpt

  // Classification
  SourceType source_type;            // Official/Hobbyist/etc.
  float authority_score;             // 0.0 - 1.0
  float authenticity_score;          // 0.0 - 1.0

  // Metadata
  std::string domain;                // example.com
  std::string geographic_region;     // US, UK, etc.
  std::string language;              // en, es, etc.
  base::Time published_date;         // Publication date
  int word_count;                    // Article length

  // Engagement
  bool has_comments;
  int comment_count;

  // Internal tracking
  std::string backend_source;        // Which backend returned this
  float relevance_score;             // Original backend score
  float final_rank;                  // After mixing
};
```

### SearchArchive

```cpp
struct SearchArchive {
  std::string id;                    // Unique archive ID
  std::string query;                 // Search query
  base::Time timestamp;              // When search was performed

  // Profile snapshot
  DiscoveryProfile profile_snapshot; // Profile used for search
  DiscoveryMode mode;                // Mode used

  // Results
  std::vector<SearchResult> results; // All results

  // User interactions
  std::set<std::string> visited_urls;      // Visited results
  std::set<std::string> bookmarked_urls;   // Bookmarked results
  std::map<std::string, std::string> notes; // url → note
  std::set<std::string> tags;              // User tags

  // Statistics
  base::TimeDelta time_spent;        // Total time viewing results
};
```

## Browser Integration Points

### 1. Address Bar (OmniBox)

**Location**: `src/brave/components/omnibox/browser/`

**Integration**:
- Create `DiscoverySearchProvider` extending `AutocompleteProvider`
- Register provider in `AutocompleteController`
- Handle search queries and return suggestions
- Show active Discovery Mode in suggestions

### 2. New Tab Page

**Location**: `src/brave/browser/ui/webui/new_tab_page/`

**Integration**:
- Add Discovery Engine search box to NTP
- Show recent searches
- Display quick profile switcher
- Show Discovery Engine tips/tutorials

### 3. Settings Page

**Location**: `src/brave/browser/ui/webui/settings/`

**Integration**:
- Create "Discovery Engine" settings section
- Profile management UI
- Blocked sites configuration
- Archive management

### 4. Context Menu

**Location**: `src/brave/browser/renderer_context_menu/`

**Integration**:
- Add "Discover with Secretariat" option
- Right-click selected text → search
- Automatically save to archives

## Build System

### GN Build Configuration

**File**: `src/brave/components/discovery_search/BUILD.gn`

```python
import("//build/config/features.gni")
import("//brave/components/common/brave_component.gni")

brave_component("discovery_search") {
  sources = [
    "discovery_search_service.cc",
    "discovery_search_service.h",
    "discovery_profile/discovery_profile.cc",
    "discovery_profile/discovery_profile.h",
    # ... more sources
  ]

  deps = [
    "//base",
    "//components/prefs",
    "//net",
    "//services/network/public/cpp",
    "//url",
  ]

  public_deps = [
    "//components/keyed_service/core",
  ]
}

source_set("unit_tests") {
  testonly = true

  sources = [
    "test/discovery_profile_unittest.cc",
    "test/result_mixer_unittest.cc",
    # ... more tests
  ]

  deps = [
    ":discovery_search",
    "//base/test:test_support",
    "//testing/gtest",
  ]
}
```

## Privacy & Security

### Privacy Guarantees

1. **No Search Tracking**
   - Searches never logged to remote servers
   - No unique user identifiers sent with queries
   - Backend queries anonymized through SearXNG

2. **Local-Only Profiles**
   - Profiles stored locally on disk
   - Never synced to cloud (unless user explicitly enables)
   - Encrypted at rest

3. **Local-Only Archives**
   - Search archives stored locally
   - SQLite database with encryption
   - User controls retention policy

### Security Considerations

1. **Input Validation**
   - Sanitize all search queries
   - Validate profile JSON on import
   - Prevent SQL injection in archive queries

2. **Network Security**
   - HTTPS for all backend requests
   - Certificate pinning for known backends
   - Timeout and retry limits

3. **Sandboxing**
   - Discovery Engine runs in browser process
   - WebUI runs in renderer process (sandboxed)
   - No direct filesystem access from UI

## Performance Considerations

### Optimization Strategies

1. **Parallel Backend Queries**
   - Query all backends simultaneously
   - Use async/await or promises
   - Timeout after 5 seconds per backend

2. **Result Caching**
   - Cache popular queries (1-hour TTL)
   - Cache source classifications
   - Cache RSS index (update weekly)

3. **Progressive Loading**
   - Show results as they arrive
   - Don't wait for all backends
   - Prioritize fast backends

4. **Lazy Loading**
   - Load archives on-demand
   - Paginate search results
   - Virtual scrolling for large result sets

## Testing Strategy

### Unit Tests
- Discovery Profile CRUD operations
- Result mixing algorithm correctness
- Source classification accuracy
- Archive storage and retrieval

### Integration Tests
- Backend API integration
- WebUI message passing
- Settings persistence
- OmniBox integration

### Browser Tests
- End-to-end search flow
- Profile switching
- Archive viewing
- Cross-platform compatibility

### Performance Tests
- Search latency benchmarks
- Memory usage profiling
- Result mixing performance
- Archive query performance

## Deployment

### Build Artifacts

- **Linux**: `.deb`, `.rpm`, AppImage
- **macOS**: `.dmg` with signed app bundle
- **Windows**: `.exe` installer (NSIS)

### Update Mechanism

- Use Chromium's auto-update system
- Host update manifests
- Incremental updates where possible
- Rollback on failure

## Future Extensions

### Phase 2+ Features

1. **Mobile Support**
   - Android build target
   - iOS build target
   - Touch-optimized Discovery UI

2. **Advanced ML Features**
   - Intent detection with ML
   - Better source classification
   - Personalized result ranking

3. **Decentralized Features**
   - P2P profile sharing (IPFS?)
   - Distributed blog index
   - Web3 integration (optional)

4. **API for Extensions**
   - Public Discovery Engine API
   - Custom backend plugins
   - Result mixer plugins

---

**Document Version**: 0.1.0
**Last Updated**: November 3, 2025
**Status**: Living Document
