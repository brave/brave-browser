# Discovery Engine Templates

This directory contains template files for the Secretariat Discovery Engine component.

## Installation

After running `npm run init`, these files should be copied to their appropriate locations in `src/brave/`:

```bash
# After npm run init completes:
cd Secretariat-from-Brave-browser-

# Copy Discovery Engine component
cp -r discovery_engine_templates/components/discovery_search src/brave/components/

# Copy WebUI components
cp -r discovery_engine_templates/browser/ui/webui/discovery_search_ui src/brave/browser/ui/webui/

# Copy test files
cp -r discovery_engine_templates/test src/brave/components/discovery_search/
```

## Directory Structure

```
discovery_engine_templates/
├── components/
│   └── discovery_search/              # Main Discovery Engine component
│       ├── BUILD.gn                    # Build configuration
│       ├── README.md                   # Component documentation
│       ├── discovery_search_service.h  # Main service interface
│       ├── discovery_search_service.cc # Main service implementation
│       ├── discovery_profile/          # Profile management
│       ├── search_backend/             # Backend integrations
│       ├── result_mixer/               # Result mixing logic
│       ├── search_archive/             # Search archives
│       └── test/                       # Unit tests
└── browser/
    └── ui/
        └── webui/
            └── discovery_search_ui/    # WebUI interface
                ├── discovery_search_ui.h
                ├── discovery_search_ui.cc
                └── resources/          # Frontend assets
```

## Build Integration

Once copied, you'll need to:

1. Add to parent BUILD.gn:
   ```gn
   # In src/brave/components/BUILD.gn
   group("components") {
     deps = [
       # ...existing deps...
       "//brave/components/discovery_search",
     ]
   }
   ```

2. Register WebUI page:
   ```cpp
   // In src/brave/browser/ui/brave_browser_content_browser_client.cc
   #include "brave/browser/ui/webui/discovery_search_ui/discovery_search_ui.h"

   // Register the WebUI
   if (url.host() == "discovery") {
     return &NewWebUI<DiscoverySearchUI>;
   }
   ```

3. Build and test:
   ```bash
   npm run build
   npm run test discovery_search_tests
   ```

## Next Steps

1. **Copy templates** to src/brave/ after init
2. **Implement core logic** in each component
3. **Add unit tests** for all components
4. **Build and iterate** on functionality
5. **Integrate with browser** UI and address bar

See [ARCHITECTURE.md](../ARCHITECTURE.md) for complete technical details.
