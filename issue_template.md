# Leo AI Chat: Suggested Questions Don't Fit Screen

## Description

In Leo AI chat interface, the suggested questions (conversation starters) don't properly fit on smaller screens or when there are multiple suggestions. This causes layout issues where:

1. Suggested questions overflow horizontally off the screen
2. Text gets cut off on mobile devices
3. No proper responsive wrapping or scrolling is implemented
4. Questions may overlap with other UI elements

This affects user experience particularly on:
- Mobile devices with smaller screens
- Browser windows that are resized to smaller widths
- When Leo displays multiple suggested questions at once

## Expected Behavior

Suggested questions should:
- Wrap properly to multiple lines when screen width is limited
- Be fully visible and readable on all screen sizes
- Provide horizontal scrolling if needed for long suggestions
- Maintain proper spacing and alignment
- Not overflow or get cut off

## Impact

- Poor mobile user experience
- Inaccessible suggested questions on smaller screens
- Inconsistent UI behavior across different screen sizes
- Potential loss of functionality for users who can't see suggestions

## Platforms Affected

- Mobile (iOS/Android) 
- Desktop when browser window is resized
- Both sidebar and full-page Leo AI interfaces

## Priority

P2 - This impacts user experience and accessibility across multiple platforms