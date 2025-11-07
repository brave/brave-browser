# UX Improvement for New Tab Page URL Settings

## Problem
Users currently need to go through multiple steps to set a custom URL for the new tab page:
1. Enable "Show home button" setting
2. Set the URL there
3. Optionally disable the setting again
4. Set "New tab page shows" setting to "Homepage"

This is confusing and indirect.

## Solution
Add a direct option in the new tab page settings to set a custom URL without involving the home button functionality.

## Implementation Plan

### 1. New Preference
Add a new preference for the custom new tab URL:
- `brave.new_tab_page.custom_url` (string) - stores the custom URL when user selects "Custom URL" for new tab page

### 2. Settings UI Changes
In the new tab page settings section:
- Add "Custom URL" option to the "New tab page shows" dropdown
- When "Custom URL" is selected, show a text input field for the URL
- Validate and save the URL to the new preference

### 3. New Tab Page Logic
Update the new tab page logic to check for the custom URL preference when determining what to display.

## Files that need modification (in brave-core repository):

### Settings UI:
- `src/brave/components/settings/appearance_brave_page/*` - For appearance settings UI
- `src/brave/components/new_tab_page/*` - For new tab page implementation
- `src/brave/browser/brave_browser_main_extra_parts.cc` - For preference registration

### Preference Registration:
- Register a new string preference for the custom new tab URL

### Backward Compatibility:
- Ensure that existing users' settings continue to work
- The new setting would only apply when users explicitly choose "Custom URL" option

## Sample Code Changes:

### Preference Registration (conceptual):
```cpp
// In browser_prefs.cc or similar
prefs->RegisterStringPref(prefs::kNewTabCustomURL, "",
    user_prefs::PrefRegistrySyncable::SYNCABLE_PREF);
```

### Settings UI (conceptual):
```javascript
// In the settings component, add new option:
const newTabPageOptions = [
  // ... existing options
  {value: 'custom_url', name: loadTimeData.getString('settings.customUrlOption')},
];

// Show URL input when custom_url is selected:
{this.selectedNewTabPageOption === 'custom_url' && 
  <url-input-field 
    value={this.customNewTabUrl}
    on-change={this.handleCustomUrlChange}>
  </url-input-field>
}
```

This would provide a much more intuitive UX for users who want to set a custom URL for their new tab page without having to understand the relationship between home button and new tab page settings.