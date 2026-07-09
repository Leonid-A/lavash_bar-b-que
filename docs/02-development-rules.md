# Development Rules

## Purpose

This document defines the mandatory development rules for this project.

Every AI assistant (Claude Code, Cursor, GitHub Copilot, Windsurf, etc.) must read and follow these rules before making any code changes.

These rules take precedence over assumptions made by the AI.

---

# General Principles

Always prefer:

- Simplicity
- Readability
- Maintainability
- Reusability
- Consistency

Never introduce unnecessary complexity.

Every change should improve the project.

---

# Before Writing Code

Before implementing anything:

- Understand the existing architecture.
- Reuse existing components whenever possible.
- Avoid creating duplicate functionality.
- Keep the project structure consistent.

Do not rewrite working code without a good reason.

---

# Architecture

The application should follow a component-based architecture.

Business logic should remain separate from presentation.

Components should have a single responsibility.

Avoid tightly coupled components.

Keep components reusable.

Prefer composition over duplication.

---

# React Guidelines

Use:

- Functional Components
- React Hooks
- TypeScript
- App Router

Avoid:

- Class components
- Deep prop drilling
- Large monolithic components
- Unnecessary state

Prefer derived values over duplicated state.

Keep state as local as possible.

---

# Component Guidelines

Each component should have one responsibility.

Avoid components that exceed approximately 200–250 lines unless there is a valid reason.

If a component becomes difficult to understand, split it into smaller components.

Components should be easy to reuse.

---

# TypeScript

Strict typing is required.

Rules:

- Avoid any
- Prefer interfaces for object structures
- Use descriptive names
- Reuse existing types
- Avoid duplicated interfaces

If a type already exists, reuse it.

---

# Styling

Use Tailwind CSS.

Maintain consistent:

- spacing
- typography
- border radius
- shadows
- colors

Avoid inline styles unless absolutely necessary.

Do not duplicate long Tailwind class lists if they can be extracted.

---

# Responsive Design

The application is mobile-first.

Every new feature must work correctly on:

- Mobile
- Tablet
- Desktop

Avoid horizontal scrolling unless intentionally designed.

---

# Accessibility

Use semantic HTML.

Buttons should be actual `<button>` elements.

Links should use `<a>` or Next.js `<Link>`.

Images require meaningful alt text.

Interactive elements should be keyboard accessible.

Maintain visible focus states.

---

# Performance

Prefer simple solutions.

Optimize only when necessary.

Avoid unnecessary re-renders.

Use memoization only where it provides measurable benefit.

Do not optimize prematurely.

---

# Data

During Phase 1:

All data comes from local JSON files.

Do not hardcode menu data.

Do not hardcode restaurant information.

React components should receive data rather than define it.

---

# Folder Organization

Application code belongs inside:

src/

Documentation belongs inside:

docs/

Do not mix documentation with application code.

---

# Naming

Use descriptive names.

Good:

MenuCard

CategoryNavigation

RestaurantHeader

LanguageSwitcher

Avoid:

Card1

Temp

Helper

Data2

---

# Comments

Prefer self-explanatory code.

Add comments only when explaining business logic or non-obvious decisions.

Do not comment obvious code.

---

# Dependencies

Before installing a package ask:

Is this really necessary?

Prefer native React or Next.js functionality whenever possible.

Avoid dependency bloat.

---

# Error Handling

Never assume data always exists.

Use defensive programming.

Handle:

- null
- undefined
- empty arrays
- missing images

Gracefully.

---

# Refactoring

If improving existing code:

Preserve behavior.

Reduce complexity.

Remove duplication.

Improve readability.

Avoid unnecessary rewrites.

---

# Git Philosophy

Every implementation should represent a logical commit.

Each feature should be independently understandable.

Avoid mixing unrelated changes.

---

# AI Instructions

The AI should:

Read existing code before making changes.

Respect existing architecture.

Do not regenerate entire files unnecessarily.

Modify only what is required.

Explain architectural decisions when introducing significant changes.

Avoid making assumptions about future features unless explicitly instructed.

---

# Out of Scope

Do not implement:

- Authentication
- Backend
- Database
- Admin Dashboard
- Ordering
- Shopping Cart
- Payment
- Notifications
- Reservations

unless explicitly requested.

---

# Code Review Checklist

Before considering any task complete, verify:

- No TypeScript errors
- No ESLint errors
- Responsive layout works
- Accessibility maintained
- No duplicated logic
- No dead code
- No unused imports
- Consistent naming
- Components remain reusable
- Project still builds successfully

Only after all checks pass should the task be considered complete.