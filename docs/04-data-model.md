# Data Model

## Purpose

This document defines the structure of application data.

During Phase 1 all data is stored locally in JSON files.

These structures should remain stable to simplify future backend integration.

---

# Files

Current data files:

src/data/menu.json

src/data/restaurant.json

---

# restaurant.json

Contains restaurant information.

Example structure:

{
"name": "",
"subtitle": {
"en": "",
"hy": ""
},
"logo": "",
"phone": "",
"email": "",
"address": {
"en": "",
"hy": ""
},
"workingHours": {
"en": "",
"hy": ""
},
"socials": {
"facebook": "",
"instagram": ""
}
}

---

# menu.json

Contains all menu data.

Structure:

categories[]

Each category contains:

- id
- name
- items

---

# Category

Example:

{
"id": "pizza",
"name": {
"en": "Pizza",
"hy": "Պիցցա"
},
"items": []
}

---

# Menu Item

Each menu item contains:

id

name

description

price

image

labels

---

Example

{
"id": "margherita",
"name": {
"en": "Margherita",
"hy": "Մարգարիտա"
},
"description": {
"en": "",
"hy": ""
},
"price": 12,
"image": null,
"labels": [
"vegetarian"
]
}

---

# Supported Labels

Current labels:

- vegetarian
- vegan
- spicy
- gluten_free
- new

Future labels may be added.

---

# Language Model

Every user-facing text should support:

English

Armenian

Example:

{
"en": "...",
"hy": "..."
}

Avoid hardcoded strings inside React components.

---

# Images

Images are optional.

Missing images should not break the UI.

---

# Future Compatibility

The model should remain compatible with:

REST API

Database

CMS

Admin Dashboard

No breaking structural changes should be required.