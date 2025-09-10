/**
 * Test suite for Leo AI Suggested Questions Responsive Layout Fix
 * 
 * These tests would be added to the existing test suite in:
 * components/ai_chat/resources/page/components/suggested_question/index.test.tsx
 */

import { render, screen } from '@testing-library/react'
import { SuggestedQuestion } from './index'

describe('SuggestedQuestion Responsive Layout', () => {
  const longQuestion = 'This is a very long suggested question that might overflow on smaller screens and needs proper text wrapping to ensure good user experience across all device sizes'
  
  beforeEach(() => {
    // Mock the conversation context
    jest.mock('../../state/conversation_context', () => ({
      useConversation: () => ({
        conversationHandler: {
          submitSuggestion: jest.fn()
        }
      })
    }))
  })

  it('should render suggested question with proper text handling', () => {
    render(<SuggestedQuestion question={longQuestion} />)
    
    const questionButton = screen.getByRole('button')
    expect(questionButton).toBeInTheDocument()
    expect(questionButton).toHaveTextContent(longQuestion)
  })

  it('should have proper accessibility attributes', () => {
    render(<SuggestedQuestion question="Test question" />)
    
    const questionButton = screen.getByRole('button')
    expect(questionButton).toHaveClass('questionButton')
    expect(questionButton).not.toBeDisabled()
  })

  it('should handle click events properly', () => {
    const mockSubmit = jest.fn()
    jest.mock('../../state/conversation_context', () => ({
      useConversation: () => ({
        conversationHandler: {
          submitSuggestion: mockSubmit
        }
      })
    }))

    render(<SuggestedQuestion question="Test question" />)
    
    const questionButton = screen.getByRole('button')
    questionButton.click()
    
    expect(mockSubmit).toHaveBeenCalledWith('Test question')
  })

  it('should have responsive text styling', () => {
    render(<SuggestedQuestion question={longQuestion} />)
    
    const questionText = screen.getByText(longQuestion)
    const computedStyle = getComputedStyle(questionText)
    
    // Verify text wrapping properties are applied
    expect(computedStyle.wordWrap).toBe('break-word')
    expect(computedStyle.overflowWrap).toBe('break-word')
    expect(computedStyle.webkitLineClamp).toBe('3')
    expect(computedStyle.overflow).toBe('hidden')
  })
})

// Cypress E2E tests for responsive behavior
describe('Suggested Questions E2E Responsive Tests', () => {
  beforeEach(() => {
    cy.visit('/leo-ai-chat')
    cy.get('[data-testid="suggested-questions"]').should('be.visible')
  })

  it('should display questions in column layout on mobile', () => {
    cy.viewport(375, 667) // iPhone SE
    
    cy.get('.questionsList')
      .should('have.css', 'flex-direction', 'column')
    
    cy.get('.questionButton')
      .should('be.visible')
      .each(($button) => {
        cy.wrap($button)
          .should('have.css', 'width')
          .and('not.equal', '0px')
      })
  })

  it('should display questions in row layout on desktop', () => {
    cy.viewport(1024, 768)
    
    cy.get('.questionsList')
      .should('have.css', 'flex-direction', 'row')
    
    cy.get('.questionButton')
      .should('be.visible')
      .should('have.length.greaterThan', 1)
  })

  it('should handle long question text properly', () => {
    cy.get('.questionButtonText')
      .should('be.visible')
      .each(($text) => {
        cy.wrap($text)
          .should('have.css', 'overflow', 'hidden')
          .should('have.css', 'text-overflow', 'ellipsis')
      })
  })

  it('should maintain accessibility on all screen sizes', () => {
    const viewports = [
      [320, 568], // iPhone 5
      [375, 667], // iPhone SE
      [768, 1024], // iPad
      [1024, 768], // Desktop
    ]

    viewports.forEach(([width, height]) => {
      cy.viewport(width, height)
      
      cy.get('.questionButton')
        .should('be.visible')
        .each(($button) => {
          // Minimum touch target size
          cy.wrap($button)
            .should('have.css', 'min-height', '44px')
            .should('be.focusable')
        })
    })
  })

  it('should handle focus and keyboard navigation', () => {
    cy.get('.questionButton').first().focus()
    cy.focused().should('have.class', 'questionButton')
    
    // Test tab navigation
    cy.focused().tab()
    cy.focused().should('have.class', 'questionButton')
    
    // Test enter key activation
    cy.focused().type('{enter}')
    // Should trigger question submission
  })
})