// Copyright (c) 2025 The Secretariat Browser Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

#ifndef BRAVE_COMPONENTS_DISCOVERY_SEARCH_DISCOVERY_PROFILE_DISCOVERY_PROFILE_H_
#define BRAVE_COMPONENTS_DISCOVERY_SEARCH_DISCOVERY_PROFILE_DISCOVERY_PROFILE_H_

#include <map>
#include <string>
#include <vector>

#include "base/time/time.h"

namespace discovery_search {

// Source type for search results
enum class SourceType {
  kOfficial,    // Government sites, official docs, major organizations
  kPopular,     // Mainstream news, major publications
  kHobbyist,    // Personal blogs, small websites
  kAcademic,    // Research papers, scholarly articles
  kCommunity,   // Forums, Reddit, discussion boards
  kVideo,       // YouTube, Vimeo, educational videos
  kSocial,      // Twitter, Mastodon, social media
  kUnexpected,  // Wildcard/serendipity picks
};

// Freshness preference for search results
enum class FreshnessPreference {
  kLatest,     // Past week/month
  kMixed,      // Mix of old and new
  kTimeless,   // Any age, quality over recency
};

// Discovery mode
enum class DiscoveryMode {
  kBalanced,    // Default mix
  kDeepDive,    // Academic and long-form
  kSerendipity, // Maximum randomness
  kFocused,     // Traditional SEO-style
  kCommunity,   // Forums and discussions
};

// Discovery Profile - defines how search results are mixed
struct DiscoveryProfile {
  // Identity
  std::string id;                    // Unique identifier
  std::string name;                  // User-visible name
  std::string description;           // Profile description

  // Source mix percentages (must sum to 100)
  int official_percent = 0;         // Official sources (0-100)
  int popular_percent = 0;          // Popular media (0-100)
  int hobbyist_percent = 0;         // Hobbyist blogs (0-100)
  int academic_percent = 0;         // Academic papers (0-100)
  int community_percent = 0;        // Forums/discussions (0-100)
  int video_percent = 0;            // Video content (0-100)
  int social_percent = 0;           // Social media (0-100)
  int unexpected_percent = 0;       // Random/wildcard (0-100)

  // Preferences
  FreshnessPreference freshness = FreshnessPreference::kMixed;
  bool include_international = true;  // Geographic diversity
  std::vector<std::string> languages; // Language filters (e.g., "en", "es")

  // Blocked and favorite sites
  std::vector<std::string> blocked_sites;           // Domains to exclude
  std::map<std::string, float> favorite_sites;      // domain → boost weight

  // Metadata
  base::Time created_at;
  base::Time modified_at;
  bool is_default = false;          // Is this a preset profile?
  DiscoveryMode mode = DiscoveryMode::kBalanced;

  // Validation
  bool IsValid() const {
    int total = official_percent + popular_percent + hobbyist_percent +
                academic_percent + community_percent + video_percent +
                social_percent + unexpected_percent;
    return total == 100 && !name.empty() && !id.empty();
  }

  // Serialization
  std::string ToJSON() const;
  static DiscoveryProfile FromJSON(const std::string& json);

  // Factory methods
  static DiscoveryProfile CreateBalanced();
  static DiscoveryProfile CreateDeepDive();
  static DiscoveryProfile CreateSerendipity();
  static DiscoveryProfile CreateFocused();
  static DiscoveryProfile CreateCommunity();
};

// Search Result from a backend
struct SearchResult {
  // Basic info
  std::string url;                  // Result URL
  std::string title;                // Page title
  std::string snippet;              // Text excerpt

  // Classification
  SourceType source_type = SourceType::kOfficial;
  float authority_score = 0.0f;    // 0.0 - 1.0
  float authenticity_score = 0.0f; // 0.0 - 1.0

  // Metadata
  std::string domain;               // example.com
  std::string geographic_region;    // US, UK, etc.
  std::string language;             // en, es, etc.
  base::Time published_date;        // Publication date
  int word_count = 0;               // Article length

  // Engagement
  bool has_comments = false;
  int comment_count = 0;

  // Internal tracking
  std::string backend_source;       // Which backend returned this
  float relevance_score = 0.0f;     // Original backend score
  float final_rank = 0.0f;          // After mixing

  // Serialization
  std::string ToJSON() const;
  static SearchResult FromJSON(const std::string& json);
};

}  // namespace discovery_search

#endif  // BRAVE_COMPONENTS_DISCOVERY_SEARCH_DISCOVERY_PROFILE_DISCOVERY_PROFILE_H_
