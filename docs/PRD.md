
# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Project: The Aseer Group Corporate Web Ecosystem

**Project:** The Aseer Group
**Primary Domain:** https://theaseergroup.com
**Development Approach:** Monorepo Architecture
**Frontend Framework:** Next.js
**Backend:** Node.js
**Database:** Supabase PostgreSQL
**Deployment:** Vercel
**Domain & DNS Management:** Hostinger

---

# 1. PROJECT OVERVIEW

The Aseer Group is a diversified Pakistani business group operating through four subsidiaries across different business sectors.

The organization requires a unified web ecosystem consisting of:

1. The main corporate website.
2. Aseer Transport Services website.
3. Aseer Travel & Tours website.
4. The Rise website.
5. A centralized administration portal.
6. A shared backend API.

The Leap Pakistan already has an independently developed and deployed website. It does not need to be developed again.

Existing website:
https://theleappakistan.com/

The parent website must provide an introduction to The Leap Pakistan and link visitors to its existing website.

The main corporate website has already been developed using Lovable. Its codebase has been downloaded and placed inside the current project directory.

**The existing Lovable codebase is the starting point of this project and must be preserved.**

The objective of this task is to establish a clean, maintainable project architecture that accommodates the existing website, future subsidiary websites, the centralized admin portal, and the shared backend.

---

# 2. PRIMARY PROJECT OBJECTIVES

The project must achieve the following objectives:

- Establish one organized GitHub repository containing the complete ecosystem.
- Preserve and integrate the existing Lovable-generated parent website.
- Establish separate frontend applications for the remaining websites.
- Create a centralized administration portal.
- Establish one shared Node.js backend.
- Use one centralized Supabase PostgreSQL database.
- Maintain independent content and functionality for each subsidiary.
- Establish a clear communication structure between all frontend applications and the backend.
- Prepare the project for independent deployment through Vercel.
- Ensure that future development can take place without unnecessary architectural changes.

---

# 3. FINAL BUSINESS STRUCTURE

The Aseer Group operates through four subsidiaries.

## 3.1 Aseer Transport Services

A transportation business offering passenger transportation, corporate mobility, vehicle rentals, logistics, and related services.

## 3.2 Aseer Travel & Tours

A travel and tourism business offering domestic and international travel, ticketing, tour packages, Hajj and Umrah services, and related travel management services.

## 3.3 The Leap Pakistan

An existing subsidiary with an independently developed website.

Website:
https://theleappakistan.com/

Do not recreate or duplicate this website.

The parent website should link to its existing production URL.

## 3.4 The Rise

The fourth subsidiary of The Aseer Group.

Its detailed business description and services will be provided later.

Do not invent its business activities.

Prepare the architecture to accommodate its website and content once the relevant information becomes available.

---

# 4. REQUIRED APPLICATIONS

The complete ecosystem will contain six applications.

## Frontend Applications

1. Parent Website: The Aseer Group.
2. Aseer Transport Services.
3. Aseer Travel & Tours.
4. The Rise.
5. Centralized Admin Portal.

## Backend Application

6. Shared Node.js Backend API.

The Leap Pakistan is excluded from these applications because its existing website will remain independently hosted.

---

# 5. REQUIRED PROJECT DIRECTORY STRUCTURE

Establish the following monorepo structure.

```text
aseer-group/
│
├── frontend/
│   │
│   ├── parent/
│   │   └── Existing Lovable website codebase
│   │
│   ├── transport/
│   │   └── Aseer Transport Services website
│   │
│   ├── travel/
│   │   └── Aseer Travel & Tours website
│   │
│   ├── rise/
│   │   └── The Rise website
│   │
│   └── admin/
│       └── Centralized administration portal
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── app.js
│   │
│   └── package.json
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
│
├── docs/
│
├── .gitignore
├── README.md
└── package.json
```

This structure represents the intended organization. Adjust minor configuration files where necessary to accommodate the existing Lovable project and selected tooling.

## Important Instructions Regarding the Existing Codebase

The existing Lovable-generated website is already present in the project directory.

Before making any changes:

1. Inspect the complete existing project structure.
2. Identify the existing frontend application and its framework.
3. Identify its dependencies, build configuration, routes, assets, and environment variables.
4. Determine which files belong to the actual website.
5. Preserve all existing functionality and assets.
6. Relocate or integrate the existing application into `frontend/parent/`.

Do not recreate the parent website from scratch.

Do not discard, overwrite, or unnecessarily modify existing components.

If the existing project already contains useful configurations or dependencies, retain them wherever appropriate.

---

# 6. FRONTEND ARCHITECTURE

The `frontend/` directory will contain five independent Next.js applications.

Each application must have its own:

- Application entry point.
- Routing structure.
- Components.
- Assets.
- Dependencies where necessary.
- Configuration.
- Environment variables.
- Build process.

The parent website must use the existing Lovable-generated application.

The other applications will be developed independently as their requirements and content become available.

The admin portal will also be a separate frontend application.

All applications must be capable of communicating with the same backend API.

The applications must remain independently deployable.

---

# 7. BACKEND ARCHITECTURE

Create one centralized Node.js backend application.

Its primary responsibility is to provide shared business logic, API endpoints, authentication-related operations, data access, and administrative functionality for the complete ecosystem.

The backend will serve:

- The Aseer Group parent website.
- Aseer Transport Services.
- Aseer Travel & Tours.
- The Rise.
- The centralized admin portal.

The backend must be organized into appropriate modules.

Expected responsibilities include:

- Authentication and authorization.
- User and administrator management.
- Subsidiary management.
- Content management.
- Website-specific data management.
- Contact enquiries.
- Business and service information.
- Media management.
- SEO metadata management.
- Administrative operations.

The backend should expose a consistent, versioned API.

Suggested API base URL:

https://api.theaseergroup.com/api/v1

The backend must support appropriate validation, error handling, authorization, and security controls.

Do not place privileged credentials or administrative operations in frontend code.

---

# 8. CENTRALIZED ADMIN PORTAL

The administration portal will be accessible through:

https://admin.theaseergroup.com

It will serve as the central management interface for the entire group.

There must be one administration portal rather than separate admin panels for individual subsidiaries.

The portal will eventually allow authorized administrators to:

- Manage the parent website's content.
- Manage subsidiary-specific content.
- Manage services and business information.
- Manage website pages.
- Manage contact enquiries.
- Upload and manage media.
- Manage SEO metadata.
- Manage administrative users.
- Control access to individual subsidiaries.

The administration system must support two primary roles:

### Super Admin

Has access to the entire ecosystem, including all subsidiaries and the parent website.

### Subsidiary Admin

Has access only to the subsidiary or subsidiaries assigned to their account.

All permissions must be enforced on the backend.

The administration portal should be prepared for future expansion without introducing unnecessary functionality at this initial stage.

---

# 9. DATABASE ARCHITECTURE

Use Supabase PostgreSQL as the centralized database.

There will be one primary Supabase production project shared by all applications.

The database must support the following general entities:

- Subsidiaries.
- Users.
- User roles.
- User permissions.
- Website pages.
- Website content.
- Services.
- Business information.
- Contact enquiries.
- Media references.
- SEO metadata.

All subsidiary-specific records must be associated with the appropriate subsidiary identifier.

This is important for ensuring that information belonging to one subsidiary does not appear on another subsidiary's website.

The database must support:

- Clear relationships between tables.
- Appropriate primary and foreign keys.
- Data validation.
- Database migrations.
- Row Level Security where applicable.
- Secure access from the backend.

Use Supabase Auth for administrator authentication where appropriate.

Use Supabase Storage for images and other uploaded files.

Never expose Supabase service-role or secret keys to public frontend applications.

All database schema changes must be version-controlled through the `supabase/migrations/` directory.

---

# 10. SUBSIDIARY IDENTIFICATION AND DATA SEPARATION

Every subsidiary must have a unique identifier.

The initial subsidiary records should represent:

1. Aseer Transport Services.
2. Aseer Travel & Tours.
3. The Leap Pakistan.
4. The Rise.

The parent organization should also be represented appropriately within the system.

All subsidiary-specific records must maintain their association with the correct subsidiary.

For example:

A tour package created for Aseer Travel & Tours must not appear on Aseer Transport Services.

A service created for The Rise must not appear on another subsidiary's website.

The backend must enforce this separation.

---

# 11. DOMAIN AND DEPLOYMENT ARCHITECTURE

The project will use Vercel for application hosting and Hostinger for domain and DNS management.

The following deployment structure is required.

| Application | Domain |
|---|---|
| Parent Website | theaseergroup.com |
| Transport | transport.theaseergroup.com |
| Travel | travel.theaseergroup.com |
| The Rise | rise.theaseergroup.com |
| Admin Portal | admin.theaseergroup.com |
| Backend API | api.theaseergroup.com |

The Leap Pakistan will continue operating through:

https://theleappakistan.com/

Each frontend application and the backend must be independently deployable through Vercel.

The GitHub repository should serve as the common source code repository.

Each Vercel project must use the appropriate application directory as its root directory.

Configure deployment settings so that each application can build independently.

Do not assume that every application must be redeployed whenever an unrelated application changes. Support independent deployment and appropriate build filtering.

All custom domains must be connected through their respective Vercel projects.

Hostinger will remain responsible for domain registration and DNS management.

Do not modify existing DNS records unnecessarily.

SSL must be enabled for all production domains and subdomains.

---

# 12. ENVIRONMENT CONFIGURATION

Prepare appropriate environment configuration for each application.

The project must distinguish between development and production environments.

The backend will contain its own environment configuration.

Frontend applications will contain only the public configuration and API addresses they require.

Sensitive credentials must remain server-side.

Create appropriate `.env.example` files documenting the required variables without including actual credentials.

Do not create or commit real production secrets.

---

# 13. APPLICATION COMMUNICATION

All five frontend applications must communicate with the shared backend API where backend functionality is required.

The admin portal will use the same backend for all administrative operations.

The backend will communicate with Supabase.

The intended communication structure is:

Frontend Applications
        |
        v
Shared Node.js Backend API
        |
        v
Supabase PostgreSQL

The Leap Pakistan remains an independent website and does not need to be integrated into the shared backend at this stage.

The parent website can link to The Leap Pakistan directly.

---

# 14. SECURITY AND ACCESS CONTROL

The initial architecture must account for:

- Secure administrator authentication.
- Backend authorization.
- Role-based permissions.
- Subsidiary-level access restrictions.
- Secure database access.
- Input validation.
- CORS configuration.
- Protection against unauthorized administrative operations.
- Safe handling of uploaded files.
- Secure environment variables.
- Appropriate database access policies.

Do not rely exclusively on frontend restrictions for security.

---

# 15. DEVELOPMENT AND MAINTENANCE REQUIREMENTS

The project must be easy to maintain and extend.

Requirements:

- One GitHub repository.
- Clear separation between frontend and backend.
- Independent frontend applications.
- Shared backend services.
- Centralized database management.
- Version-controlled database migrations.
- Consistent package management.
- Clear development documentation.
- Separate development and production configuration.
- Independent deployment capability.

Use a suitable monorepo package manager and workspace configuration.

Avoid unnecessary dependencies and duplicated configuration.

Do not introduce complex architectural patterns without a clear requirement.

---

# 16. SCOPE OF THE CURRENT TASK

The immediate objective is to establish the project foundation.

The agent must:

1. Inspect the existing Lovable codebase.
2. Understand its current architecture and dependencies.
3. Preserve the existing website.
4. Establish the monorepo directory structure.
5. Place the existing website under `frontend/parent/`.
6. Establish the remaining frontend application directories.
7. Establish the centralized admin frontend directory.
8. Initialize the shared Node.js backend.
9. Prepare the Supabase configuration and migration structure.
10. Configure the monorepo package management.
11. Establish appropriate environment variable templates.
12. Prepare independent application build configurations.
13. Document the project architecture and setup instructions.
14. Verify that the existing parent website still builds and runs successfully.

The remaining websites and the complete admin functionality do not need to be fully developed as part of this initial scaffolding task.

Create the necessary foundations so that subsequent development can proceed application by application.

Do not invent missing business information or implement speculative features.

---

# 17. OUT OF SCOPE FOR THE INITIAL TASK

The following should not be implemented unless explicitly requested in a later development phase:

- Rebuilding The Leap Pakistan.
- Developing all subsidiary websites from scratch.
- Completing the entire admin portal.
- Implementing every database table and business operation.
- Implementing payment gateways.
- Booking or reservation systems.
- Customer authentication.
- Complex analytics dashboards.
- Unrequested third-party integrations.
- Production DNS changes.
- Production deployment without approval.

The current task is architectural setup and preparation.

---

# 18. EXPECTED DELIVERABLES

At the end of this task, the project should contain:

1. A properly organized monorepo.
2. The existing Lovable parent website preserved inside `frontend/parent/`.
3. Separate directories for Transport, Travel, Rise, and Admin.
4. A centralized Node.js backend scaffold.
5. Supabase configuration and migration directories.
6. Workspace and package management configuration.
7. Environment variable example files.
8. Independent application configuration.
9. A clear README containing setup instructions.
10. Documentation explaining the application structure and deployment arrangement.

The parent website must continue to function after restructuring.

The backend must have a working initial server setup and health-check endpoint.

All newly initialized applications should have valid project scaffolding and documented startup commands.

Do not claim that an application is deployment-ready unless its build has actually been verified.

---

# 19. FINAL INSTRUCTIONS TO THE AGENT

Before executing any changes, carefully inspect the existing project and understand its current structure.

Work incrementally.

Preserve the existing Lovable website and its functionality.

Avoid unnecessary modifications to the existing application.

Follow the architecture described in this document.

If a technical conflict arises between the existing codebase and the proposed structure, resolve it with the least disruptive approach and document the decision.

Do not delete existing project files without a clear reason.

Do not invent credentials, production URLs, or missing company information.

Do not make production DNS changes or deploy applications without explicit authorization.

At the end, provide a concise implementation report containing:

- Final directory structure.
- Existing files moved or retained.
- Applications initialized.
- Backend setup details.
- Supabase preparation status.
- Environment variables required.
- Commands for running each application locally.
- Build verification results.
- Any outstanding configuration or decisions.

**The primary goal is to establish a clean, scalable, and maintainable foundation for The Aseer Group's complete web ecosystem while preserving the already-developed parent website.**