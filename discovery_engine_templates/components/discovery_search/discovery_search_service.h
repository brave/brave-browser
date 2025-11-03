//  Copyright (c) 2025 The Secretariat Browser Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

#ifndef BRAVE_COMPONENTS_DISCOVERY_SEARCH_DISCOVERY_SEARCH_SERVICE_H_
#define BRAVE_COMPONENTS_DISCOVERY_SEARCH_DISCOVERY_SEARCH_SERVICE_H_

#include <memory>
#include <string>
#include <vector>

#include "base/callback.h"
#include "base/memory/weak_ptr.h"
#include "components/keyed_service/core/keyed_service.h"

namespace discovery_search {

class DiscoveryProfile;
class ProfileManager;
class ResultMixer;
struct SearchResult;

// Main service for Secretariat Discovery Engine
// Coordinates search backends, result mixing, and profile management
class DiscoverySearchService : public KeyedService {
 public:
  using SearchCallback =
      base::OnceCallback<void(std::vector<SearchResult> results)>;

  DiscoverySearchService();
  ~DiscoverySearchService() override;

  DiscoverySearchService(const DiscoverySearchService&) = delete;
  DiscoverySearchService& operator=(const DiscoverySearchService&) = delete;

  // Performs a discovery search with the active profile
  void PerformSearch(const std::string& query, SearchCallback callback);

  // Performs a discovery search with a specific profile
  void PerformSearchWithProfile(const std::string& query,
                                const std::string& profile_id,
                                SearchCallback callback);

  // Get the ProfileManager for managing discovery profiles
  ProfileManager* GetProfileManager() { return profile_manager_.get(); }

  // Get/Set the active discovery profile
  void SetActiveProfile(const std::string& profile_id);
  std::string GetActiveProfileId() const;
  const DiscoveryProfile* GetActiveProfile() const;

  // KeyedService overrides
  void Shutdown() override;

 private:
  // Internal search implementation
  void ExecuteSearch(const std::string& query,
                    const DiscoveryProfile& profile,
                    SearchCallback callback);

  // Callback handlers for backend queries
  void OnSearchResultsReceived(const std::string& backend_name,
                              std::vector<SearchResult> results);

  // Profile management
  std::unique_ptr<ProfileManager> profile_manager_;
  std::string active_profile_id_;

  // Result mixing
  std::unique_ptr<ResultMixer> result_mixer_;

  // For async operations
  base::WeakPtrFactory<DiscoverySearchService> weak_factory_{this};
};

}  // namespace discovery_search

#endif  // BRAVE_COMPONENTS_DISCOVERY_SEARCH_DISCOVERY_SEARCH_SERVICE_H_
