// Copyright (c) 2025 The Secretariat Browser Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

#include "brave/components/discovery_search/discovery_search_service.h"

#include "base/logging.h"
#include "brave/components/discovery_search/discovery_profile/profile_manager.h"
#include "brave/components/discovery_search/result_mixer/result_mixer.h"

namespace discovery_search {

DiscoverySearchService::DiscoverySearchService() {
  // Initialize ProfileManager
  profile_manager_ = std::make_unique<ProfileManager>();

  // Initialize ResultMixer
  result_mixer_ = std::make_unique<ResultMixer>();

  // Set default active profile (Balanced Discovery)
  active_profile_id_ = "balanced_discovery";

  VLOG(1) << "DiscoverySearchService initialized";
}

DiscoverySearchService::~DiscoverySearchService() {
  VLOG(1) << "DiscoverySearchService destroyed";
}

void DiscoverySearchService::PerformSearch(const std::string& query,
                                          SearchCallback callback) {
  const DiscoveryProfile* profile = GetActiveProfile();
  if (!profile) {
    LOG(ERROR) << "No active profile set";
    std::move(callback).Run({});
    return;
  }

  ExecuteSearch(query, *profile, std::move(callback));
}

void DiscoverySearchService::PerformSearchWithProfile(
    const std::string& query,
    const std::string& profile_id,
    SearchCallback callback) {
  const DiscoveryProfile* profile =
      profile_manager_->GetProfile(profile_id);
  if (!profile) {
    LOG(ERROR) << "Profile not found: " << profile_id;
    std::move(callback).Run({});
    return;
  }

  ExecuteSearch(query, *profile, std::move(callback));
}

void DiscoverySearchService::SetActiveProfile(const std::string& profile_id) {
  const DiscoveryProfile* profile =
      profile_manager_->GetProfile(profile_id);
  if (profile) {
    active_profile_id_ = profile_id;
    VLOG(1) << "Active profile set to: " << profile_id;
  } else {
    LOG(WARNING) << "Attempted to set invalid profile: " << profile_id;
  }
}

std::string DiscoverySearchService::GetActiveProfileId() const {
  return active_profile_id_;
}

const DiscoveryProfile* DiscoverySearchService::GetActiveProfile() const {
  return profile_manager_->GetProfile(active_profile_id_);
}

void DiscoverySearchService::ExecuteSearch(const std::string& query,
                                          const DiscoveryProfile& profile,
                                          SearchCallback callback) {
  VLOG(1) << "Executing search: " << query
          << " with profile: " << profile.name();

  // TODO: Implement actual search logic
  // 1. Query multiple backends (DuckDuckGo, SearXNG, custom index)
  // 2. Classify results by source type
  // 3. Mix results according to profile weights
  // 4. Add serendipity picks
  // 5. Deduplicate and rank
  // 6. Save to archive if configured

  // For now, return empty results
  std::vector<SearchResult> results;
  std::move(callback).Run(std::move(results));
}

void DiscoverySearchService::OnSearchResultsReceived(
    const std::string& backend_name,
    std::vector<SearchResult> results) {
  VLOG(1) << "Received " << results.size() << " results from " << backend_name;

  // TODO: Implement result aggregation
  // Store results temporarily until all backends respond
  // Then call result_mixer_ to mix them according to active profile
}

void DiscoverySearchService::Shutdown() {
  VLOG(1) << "DiscoverySearchService shutting down";
  profile_manager_.reset();
  result_mixer_.reset();
}

}  // namespace discovery_search
