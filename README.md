<<<<<<< HEAD
# [Advania UK]Product Developer(Fresh) — Screening Assessment

This assessment evaluates your ability to deliver a modern intranet solution using **SPFx**, **SharePoint OOTB APIs**, **Azure Functions**, and **AI‑driven content moderation**, with optional **DevOps** and **Infrastructure‑as‑Code** enhancements.

> 💡 **AI usage:** You are encouraged to use AI tools (for ideation, boilerplate, tests, refactors). However, you must **fully understand** the delivered solution. In the next stage, we will **review and discuss** your approach in depth (architecture, trade‑offs, implementation details).

> 🔀 **Delivery note:** Ideally, submit your work as a **commit on a feature branch** and/or a **Pull Request (PR)** so we can review diffs, comments, and your delivery workflow.

> 🧭 **Flexibility note:** You may change of fix anything in this repo—folder structure, framework versions, solution/project/webpart names, and tooling—if it helps you deliver a clean, maintainable solution. Please document what you changed and why in your PR or another *.md files.

***

## 1) 📰 Build the “News Tiles” SPFx Web Part

Create an SPFx web part that displays news posts using **Out‑of‑the‑Box SharePoint APIs** (e.g., SharePoint REST or Microsoft Graph).

**Requirements**

*   **Search**
*   **Filtering** (at least one metadata field)
*   **Paging** (page numbers, next/prev, load‑more, or infinite scroll)
*   **Property Pane Config**:
    *   **Default page size**
    *   **Selectable page sizes**
*   **Performance notes** (brief doc/section):
    *   **Caching strategy** (e.g., in‑memory/local/session, ETag, invalidation)
    *   **Graph 429 throttling** handling (Retry‑After, backoff, capped retries, graceful fallback)

**Testing**

*   **Unit tests (Jest)** for the **data provider layer** (query building, search/filter/paging logic, error/throttling handling).

***

## 2) 🛡️ Build the “News Content Moderation” Function App

Create an Azure Function App responsible for validating and moderating **SharePoint Site Pages**.

**Requirements**

*   Fetch Site Pages content (text; images optional).
*   **Use AI** (e.g., Azure AI Content Safety) to classify content as **Apt** or **Not Apt**.
*   If **Not Apt**, **unpublish** the page automatically.
*   Consider **heavy‑load scenarios** (bursts, large sites) and describe how your design scales (queueing, fan‑out/fan‑in, retries, idempotency).

**Testing**

*   **Unit tests** for moderation logic, page evaluation, error handling, and mocked AI calls.

***

## 3) ⭐ Extra Points (Optional)

*   **Bicep/ARM** templates for Azure resource deployment.
*   **Azure DevOps Pipeline** (or GitHub Actions) to build, test, and deploy.
*   **PnP Template** including:
    *   Home page with the **News Tiles** web part
    *   New **custom fields**
    *   New **News content type** with these fields
    *   Example **Client‑Side Pages** using that content type
*   Any **additional Azure resources** you deem valuable.
*   **Security considerations**: least privilege, secret management, secure endpoints, network restrictions, safe logging/PII handling.

***

## 4) 📋 Submission & Review

*   Keep repository instructions concise and include how to **run** and **test** your solution.
*   We will **review** your architecture, reasoning, and trade‑offs in a follow‑up discussion.
*   Aim for **clean, maintainable, secure, and production‑minded** code.
*   **Preferred submission:** via a **branch** and **PR** to demonstrate your workflow.
=======
# new_task
new_task
>>>>>>> b4c104b055f36f7dd9b49ee43989350ab63c3288
