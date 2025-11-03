# Discovery Engine Implementation Guide

This guide explains how to implement the Secretariat Discovery Engine once the brave-core codebase is initialized.

## Phase 1: Copy Templates (After npm init)

Once `npm run init` completes and `src/brave/` exists:

```bash
# Copy Discovery Engine component
mkdir -p src/brave/components/discovery_search
cp -r discovery_engine_templates/components/discovery_search/* \
      src/brave/components/discovery_search/

# Create subdirectories
cd src/brave/components/discovery_search
mkdir -p discovery_profile search_backend result_mixer search_archive test
```

## Phase 2: Implement Core Data Structures

### 2.1 Discovery Profile (discovery_profile/)

**Files to create:**
- `discovery_profile.cc` - Implementation of DiscoveryProfile methods
- `profile_manager.h` - ProfileManager class declaration
- `profile_manager.cc` - Profile CRUD operations
- `default_profiles.h` - Factory functions for preset profiles
- `default_profiles.cc` - Implementation of presets

**Key implementations:**
```cpp
// discovery_profile.cc
DiscoveryProfile DiscoveryProfile::CreateBalanced() {
  DiscoveryProfile profile;
  profile.id = "balanced_discovery";
  profile.name = "Balanced Discovery";
  profile.mode = DiscoveryMode::kBalanced;
  profile.official_percent = 20;
  profile.popular_percent = 15;
  profile.hobbyist_percent = 30;
  profile.academic_percent = 10;
  profile.community_percent = 10;
  profile.video_percent = 5;
  profile.social_percent = 5;
  profile.unexpected_percent = 5;
  // ... set other fields
  return profile;
}
```

### 2.2 Search Backend (search_backend/)

**Files to create:**
- `backend_interface.h` - Abstract base class for all backends
- `duckduckgo_backend.h/.cc` - DuckDuckGo API integration
- `searxng_backend.h/.cc` - SearXNG integration
- `custom_index_backend.h/.cc` - Custom blog index

**Key interface:**
```cpp
// backend_interface.h
class SearchBackend {
 public:
  virtual ~SearchBackend() = default;

  // Perform a search query
  virtual void Search(const std::string& query,
                     SearchCallback callback) = 0;

  // Get backend name
  virtual std::string GetName() const = 0;

  // Check if backend is available
  virtual bool IsAvailable() const = 0;
};
```

### 2.3 Result Mixer (result_mixer/)

**Files to create:**
- `result_mixer.h/.cc` - Main mixing algorithm
- `source_classifier.h/.cc` - Classify results by source type
- `diversity_ranker.h/.cc` - Ensure diverse results

**Key algorithm:**
```cpp
// result_mixer.cc
std::vector<SearchResult> ResultMixer::MixResults(
    const std::vector<SearchResult>& all_results,
    const DiscoveryProfile& profile) {
  // 1. Classify all results by source type
  auto classified = source_classifier_->Classify(all_results);

  // 2. Sample from each category based on profile weights
  std::vector<SearchResult> mixed;
  mixed.reserve(50);  // Target 50 results

  // Sample official sources (profile.official_percent)
  int official_count = (profile.official_percent * 50) / 100;
  SampleResults(classified[SourceType::kOfficial], official_count, &mixed);

  // ... repeat for each source type

  // 3. Add serendipity picks (random from any category)
  if (profile.unexpected_percent > 0) {
    int random_count = (profile.unexpected_percent * 50) / 100;
    AddRandomPicks(all_results, random_count, &mixed);
  }

  // 4. Shuffle within categories for randomization
  ShuffleWithinCategories(&mixed);

  // 5. Deduplicate by URL
  Deduplicate(&mixed);

  // 6. Final ranking
  RankResults(&mixed);

  return mixed;
}
```

### 2.4 Search Archive (search_archive/)

**Files to create:**
- `search_archive.h/.cc` - SearchArchive data structure
- `archive_manager.h/.cc` - Archive CRUD and storage
- `archive_storage.h/.cc` - SQLite database backend

**Database schema:**
```sql
CREATE TABLE search_archives (
  id TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  profile_snapshot TEXT,  -- JSON
  mode TEXT,
  created_at INTEGER
);

CREATE TABLE archive_results (
  archive_id TEXT,
  url TEXT,
  title TEXT,
  snippet TEXT,
  source_type TEXT,
  rank INTEGER,
  visited BOOLEAN DEFAULT 0,
  bookmarked BOOLEAN DEFAULT 0,
  FOREIGN KEY (archive_id) REFERENCES search_archives(id)
);

CREATE TABLE archive_notes (
  archive_id TEXT,
  url TEXT,
  note TEXT,
  created_at INTEGER,
  FOREIGN KEY (archive_id) REFERENCES search_archives(id)
);
```

## Phase 3: Implement Search Backends

### 3.1 DuckDuckGo Backend

```cpp
// duckduckgo_backend.cc
void DuckDuckGoBackend::Search(const std::string& query,
                               SearchCallback callback) {
  // Build API URL
  GURL api_url = BuildDuckDuckGoURL(query);

  // Make network request
  auto request = std::make_unique<network::ResourceRequest>();
  request->url = api_url;
  request->method = "GET";

  url_loader_->Load(std::move(request),
                   base::BindOnce(&DuckDuckGoBackend::OnResponse,
                                 weak_factory_.GetWeakPtr(),
                                 std::move(callback)));
}

void DuckDuckGoBackend::OnResponse(SearchCallback callback,
                                   const std::string& response_body) {
  // Parse JSON response
  auto parsed = ParseDuckDuckGoJSON(response_body);

  // Convert to SearchResult objects
  std::vector<SearchResult> results;
  for (const auto& item : parsed) {
    SearchResult result;
    result.url = item["url"].asString();
    result.title = item["title"].asString();
    result.snippet = item["snippet"].asString();
    result.backend_source = "duckduckgo";
    results.push_back(result);
  }

  std::move(callback).Run(std::move(results));
}
```

### 3.2 Custom Blog Index

```cpp
// custom_index_backend.cc
void CustomIndexBackend::Search(const std::string& query,
                                SearchCallback callback) {
  // Query local SQLite index of hobbyist blogs
  sql::Statement s(db_->GetUniqueStatement(
      "SELECT url, title, snippet, domain, published_date "
      "FROM blog_index "
      "WHERE content MATCH ? "
      "ORDER BY rank DESC LIMIT 50"));
  s.BindString(0, query);

  std::vector<SearchResult> results;
  while (s.Step()) {
    SearchResult result;
    result.url = s.ColumnString(0);
    result.title = s.ColumnString(1);
    result.snippet = s.ColumnString(2);
    result.domain = s.ColumnString(3);
    result.published_date = base::Time::FromTimeT(s.ColumnInt64(4));
    result.source_type = SourceType::kHobbyist;
    result.backend_source = "custom_index";
    results.push_back(result);
  }

  std::move(callback).Run(std::move(results));
}
```

## Phase 4: Browser Integration

### 4.1 Register as KeyedService

```cpp
// In src/brave/browser/brave_browser_context_keyed_service_factories.cc
#include "brave/browser/discovery_search/discovery_search_service_factory.h"

void EnsureBrowserContextKeyedServiceFactoriesBuilt() {
  // ... existing services
  discovery_search::DiscoverySearchServiceFactory::GetInstance();
}
```

### 4.2 Create WebUI Page

```cpp
// src/brave/browser/ui/webui/discovery_search_ui/discovery_search_ui.h
class DiscoverySearchUI : public content::WebUIController {
 public:
  explicit DiscoverySearchUI(content::WebUI* web_ui);
  ~DiscoverySearchUI() override;
};

// discovery_search_ui.cc
DiscoverySearchUI::DiscoverySearchUI(content::WebUI* web_ui)
    : content::WebUIController(web_ui) {
  content::WebUIDataSource* source =
      content::WebUIDataSource::Create("discovery");

  // Add resources
  source->AddResourcePath("discovery_search.js", IDR_DISCOVERY_SEARCH_JS);
  source->AddResourcePath("discovery_search.css", IDR_DISCOVERY_SEARCH_CSS);
  source->SetDefaultResource(IDR_DISCOVERY_SEARCH_HTML);

  content::WebUIDataSource::Add(Profile::FromWebUI(web_ui), source);

  // Add message handler
  web_ui->AddMessageHandler(
      std::make_unique<DiscoverySearchPageHandler>());
}
```

### 4.3 Register WebUI

```cpp
// In src/brave/browser/ui/brave_browser_content_browser_client.cc
#include "brave/browser/ui/webui/discovery_search_ui/discovery_search_ui.h"

content::WebUIControllerFactory*
BraveBrowserContentBrowserClient::GetWebUIControllerFactory() {
  return &BraveWebUIControllerFactory::GetInstance();
}

// In BraveWebUIControllerFactory::CreateWebUIControllerForURL()
if (url.host() == "discovery") {
  return &NewWebUI<DiscoverySearchUI>;
}
```

## Phase 5: Address Bar Integration

### 5.1 Create AutocompleteProvider

```cpp
// src/brave/components/omnibox/browser/discovery_search_provider.h
class DiscoverySearchProvider : public AutocompleteProvider {
 public:
  void Start(const AutocompleteInput& input, bool minimal_changes) override;

 private:
  void OnSearchResults(std::vector<SearchResult> results);
  DiscoverySearchService* service_;
};
```

### 5.2 Register Provider

```cpp
// In ChromeAutocompleteProviderClient
providers->push_back(new DiscoverySearchProvider(this));
```

## Phase 6: Testing

### 6.1 Unit Tests

```bash
# Run Discovery Engine unit tests
npm run test brave_unit_tests -- --gtest_filter="DiscoverySearch*"
```

### 6.2 Browser Tests

```bash
# Run Discovery Engine browser tests
npm run test brave_browser_tests -- --gtest_filter="DiscoverySearch*"
```

### 6.3 Manual Testing

```bash
# Build and run
npm run build
npm start

# Navigate to:
secretariat://discovery

# Or search from address bar
```

## Phase 7: Iteration

1. **Profile alpha testers**
2. **Collect feedback** on result quality
3. **Tune mixing algorithm**
4. **Improve source classification**
5. **Expand backend coverage**

## Key Milestones

- [ ] Basic search works (any results)
- [ ] Profile system functional
- [ ] Result mixing working
- [ ] Source classification accurate
- [ ] Archive saving/loading works
- [ ] WebUI displays results nicely
- [ ] Address bar integration works
- [ ] Performance is acceptable (<2s per search)

## Performance Targets

- **Search latency**: <1 second for cached, <2 seconds cold
- **Result mixing**: <100ms for 100 results
- **Memory usage**: <50MB for Discovery Engine
- **Storage**: <100MB for search archives

## Privacy Checklist

- [ ] No user identifiers in search requests
- [ ] Profiles stored locally only
- [ ] Archives encrypted at rest
- [ ] No telemetry without consent
- [ ] Clear data deletion path

## Next Steps

1. **Now**: Copy templates after `npm run init`
2. **Week 1**: Implement Discovery Profile and ProfileManager
3. **Week 2**: Implement DuckDuckGo backend
4. **Week 3**: Implement result mixer
5. **Week 4**: Create basic WebUI
6. **Week 5**: Test and iterate

See [SECRETARIAT_ROADMAP.md](../../SECRETARIAT_ROADMAP.md) for complete timeline.

---

**Happy coding!** You're building the future of web discovery. 🚀
