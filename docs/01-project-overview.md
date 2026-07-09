# Restaurant Digital Menu

## Project Overview

Restaurant Digital Menu is a modern web application that allows restaurant customers to browse the restaurant's menu by scanning a QR code.

The application is designed to replace traditional printed menus with a fast, elegant, responsive digital experience.

This project is currently being developed in phases.

Only the functionality defined for the current phase should be implemented.

---

# Phase 1 Scope

Phase 1 focuses on delivering a beautiful, production-ready digital menu.

Included features:

- QR accessible menu
- Responsive design
- English and Armenian languages
- Dynamic menu loaded from JSON
- Sticky category navigation
- Smooth scrolling
- Active category highlighting
- Live search
- Restaurant information loaded from configuration
- Mobile-first UI
- SEO ready
- Accessibility support

---

# Not Included in Phase 1

The following features must NOT be implemented during Phase 1:

- Authentication
- User accounts
- Admin dashboard
- Backend
- Database
- API
- Online ordering
- Shopping cart
- Checkout
- Payments
- Waiter call
- Table management
- Reservations
- Reviews
- Favorites
- Analytics
- Notifications
- POS integration

If any of these features appear necessary, they should be noted as future improvements but must not be implemented.

---

# Technologies

Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

Data

- Local JSON files

Deployment

- Vercel (preferred)

---

# Project Goals

The application should be:

- Fast
- Mobile-first
- Easy to maintain
- Easy to extend
- Accessible
- SEO friendly
- Visually elegant
- Production ready

---

# Current Data Source

During Phase 1 all application data is stored locally.

Example files:

src/data/menu.json

src/data/restaurant.json

No backend should be introduced.

---

# Architecture Goals

The application should follow these principles:

- Component-based architecture
- Reusable UI components
- Separation of presentation and business logic
- Strong TypeScript typing
- Clean folder organization
- Minimal dependencies
- Simple and maintainable code

---

# Future Phases

Future versions may introduce:

- Admin dashboard
- Database
- REST API
- Authentication
- Online ordering
- Shopping cart
- Table QR codes
- Reservations
- Loyalty system
- Multiple restaurants
- POS integration

These features should not influence the Phase 1 implementation.

---

# Success Criteria

Phase 1 is considered complete when:

- The application is fully responsive.
- The menu is loaded dynamically from JSON.
- English and Armenian languages work correctly.
- Search works correctly.
- Category navigation is interactive.
- The UI is polished and consistent.
- Lighthouse performance is high.
- No TypeScript errors exist.
- No ESLint errors exist.
- The application is ready for production deployment.

---

# Development Philosophy

This project prioritizes:

1. Simplicity
2. Maintainability
3. Readability
4. Reusability
5. Performance

Avoid unnecessary complexity.

Always prefer clean architecture over quick solutions.
