# Leo AI Chat: Suggested Questions Screen Fitting Fix

## Issue Description

The suggested questions (conversation starters) in Leo AI chat interface don't properly fit on smaller screens, causing layout issues where:

1. **Suggested questions overflow horizontally** off the screen
2. **Text gets cut off** on mobile devices and narrow browser windows
3. **No proper responsive wrapping** or scrolling is implemented
4. **Questions may overlap** with other UI elements
5. **Poor accessibility** on mobile and tablet devices

## Affected Platforms

- **Mobile** (iOS/Android) - Primary impact
- **Desktop** when browser window is resized to smaller widths
- **Tablet** devices in portrait mode
- Both **sidebar** and **full-page** Leo AI interfaces

## Root Cause Analysis

### Current Implementation Issues

Located in `brave-core/components/ai_chat/resources/page/components/`:

1. **main/style.module.scss**: `.questionsList` uses simple flex column layout:
   ```scss
   .questionsList {
     display: flex;
     flex-direction: column;
     align-items: start;
     gap: var(--leo-spacing-m);
   }
   ```

2. **suggested_question/style.module.scss**: No responsive handling for button text:
   ```scss
   .questionButtonText {
     font: var(--leo-font-default-regular);
     color: var(--leo-color-text-secondary);
     // No text wrapping or overflow handling
   }
   ```

3. **No container queries** or responsive breakpoints for suggested questions
4. **No text overflow protection** for long question text
5. **Fixed layout** doesn't adapt to available screen width

## Solution Implementation

### 1. Responsive Container Layout

```scss
.suggestionsContainer {
  /* Container query support for responsive behavior */
  container-type: inline-size;
  width: 100%;
}

.questionsList {
  /* Mobile-first responsive approach */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  /* Large screen optimization */
  @container (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    
    & > * {
      flex: 1 1 calc(50% - var(--leo-spacing-m) / 2);
      min-width: 200px;
      max-width: 400px;
    }
  }
}
```

### 2. Enhanced Text Handling

```scss
.questionButtonText,
.generateButtonText {
  /* Responsive text handling */
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  /* Prevent text overflow */
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines max */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 3. Accessibility Improvements

- **Minimum touch target size**: 44px for mobile usability
- **Focus management**: Proper outline and focus states
- **Screen reader support**: Role attributes and proper labeling
- **High contrast mode**: Enhanced border and text contrast
- **Reduced motion**: Respects user preferences

### 4. Fallback Scrolling

```scss
.questionsList:has(.questionButton:hover) {
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--leo-color-neutral-20) transparent;
}
```

## Files Modified

### Primary Files to Update

1. **`components/ai_chat/resources/page/components/main/style.module.scss`**
   - Update `.suggestionsContainer` and `.questionsList` styles
   - Add responsive container queries
   - Implement mobile-first layout

2. **`components/ai_chat/resources/page/components/suggested_question/style.module.scss`**
   - Enhance `.questionButton`, `.questionButtonText`, and `.generateButtonText`
   - Add text overflow handling
   - Implement responsive text scaling

### Files That May Need Updates

1. **`components/ai_chat/resources/page/components/main/index.tsx`**
   - May need className updates if additional responsive classes are needed
   - Consider adding data attributes for responsive behavior

2. **`components/ai_chat/resources/page/components/suggested_question/index.tsx`**
   - May need accessibility attributes (aria-label, role)
   - Consider adding responsive behavior hooks

## Testing Strategy

### Manual Testing

1. **Responsive Testing**:
   - Test on mobile devices (iPhone, Android)
   - Test on tablets in both orientations
   - Test browser window resizing on desktop
   - Test with different numbers of suggested questions (1-5)

2. **Text Overflow Testing**:
   - Test with very long question text
   - Test with different languages (RTL, Asian languages)
   - Test with various font sizes

3. **Accessibility Testing**:
   - Test with screen readers
   - Test keyboard navigation
   - Test high contrast mode
   - Test with reduced motion preferences

### Automated Testing

```javascript
// Example test for responsive behavior
describe('Suggested Questions Responsive Layout', () => {
  it('should wrap questions on mobile screens', () => {
    cy.viewport(375, 667) // iPhone SE
    cy.get('[data-testid="questions-list"]')
      .should('have.css', 'flex-direction', 'column')
    
    cy.get('.questionButton')
      .should('be.visible')
      .and('not.have.css', 'overflow', 'hidden')
  })
  
  it('should show horizontal layout on large screens', () => {
    cy.viewport(1024, 768)
    cy.get('[data-testid="questions-list"]')
      .should('have.css', 'flex-direction', 'row')
  })
})
```

## Performance Impact

- **Minimal CSS additions**: ~4KB of additional CSS
- **No JavaScript changes**: Pure CSS solution
- **Container queries**: Modern browsers only, graceful degradation
- **No layout thrashing**: Uses efficient flexbox properties

## Browser Compatibility

- **Container Queries**: Chrome 105+, Firefox 110+, Safari 16+
- **Fallback**: Standard flexbox layout for older browsers
- **CSS Grid**: IE11+ support for advanced layouts
- **Accessibility**: Full support across all modern browsers

## Metrics to Monitor

1. **User Experience**:
   - Mobile bounce rate from Leo AI interface
   - Time spent interacting with suggested questions
   - Click-through rate on suggested questions

2. **Technical**:
   - Page load performance impact
   - CSS bundle size increase
   - Responsive layout rendering time

## Future Improvements

1. **Dynamic Question Sizing**: Adjust question button size based on text length
2. **Smart Truncation**: Intelligent text truncation at word boundaries
3. **Gesture Support**: Swipe navigation for mobile question carousel
4. **Personalization**: Adaptive layout based on user interaction patterns

## Rollback Plan

If issues arise:
1. Revert CSS changes to original `.questionsList` styles
2. Remove container query support
3. Restore original text handling
4. Monitor for improved mobile experience metrics