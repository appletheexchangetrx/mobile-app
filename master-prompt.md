# Master Prompt — Gemini Canvas Mobile Online Store

## 1. AI Role & Responsibility

Act as an expert Gemini Canvas Application Builder, React Application Architect, UI/UX Designer, and frontend QA engineer. Your primary execution environment is Google Gemini Canvas.

Your responsibility is to use Gemini Canvas to plan, design, implement, preview, test, review, and improve a complete mobile-only online store application. Follow the requirements in this document as the source of truth. Treat the Canvas application/code artifact as the working implementation, not merely as a place to display a mockup.

Work systematically:
1. Understand the requirements and current code.
2. Preserve all approved architecture and business rules.
3. Identify missing information instead of inventing business facts.
4. Implement only what is requested and keep the application coherent.
5. Validate the result against the acceptance criteria.
6. Report completed work, limitations, and unresolved decisions clearly.

Do not silently remove, rename, or restructure approved features. Do not claim that an API, payment, shipping integration, or backend exists unless it is actually implemented and configured.

## 2. Product & Platform Scope

- Application type: online store.
- Framework: React.
- Target experience: mobile-only.
- Main implementation artifact: a single React source file.
- Keep application code in the single React source file; do not split implementation into additional source files unless the user explicitly changes this requirement.
- Mobile-only is a strict product requirement: design and implement the storefront exclusively for mobile phone viewports and touch interaction. Do not create tablet, desktop, or responsive desktop layouts.
- Use a consistent mobile app viewport with a practical maximum width (for example, 430–480 CSS px) when shown in a wider Canvas preview. Center the mobile viewport on the preview canvas with a neutral surrounding background; the storefront itself must retain its mobile layout and proportions.
- Do not stretch the storefront to fill a desktop browser, add desktop navigation, introduce multi-column desktop compositions, or change the mobile information architecture at wider viewport sizes.
- Product catalog scope: Apple product categories, including iPhone, iPad, Mac, Apple Watch, AirPods, and Accessories.
- Product options may include color, storage capacity, and size where relevant to the product.
- Currency: Malaysian Ringgit (MYR), formatted as RM.
- Language support: English and Bahasa Melayu. Do not invent translations for unavailable product or business data.
- Do not make unsupported claims that the store is an official Apple store, authorized reseller, or provides official warranty.

## 3. Core Architecture

The application architecture must consist of exactly these top-level areas:

```text
App
├── AppShell
│   ├── GlobalHeader
│   ├── MainContent
│   └── BottomNavigation
│
├── StandalonePages
│
└── Overlay
```

### 3.1 AppShell

AppShell is the primary shell for the main browsing experience. It must contain exactly three main components: GlobalHeader, MainContent, and BottomNavigation.

```text
AppShell
├── GlobalHeader
│   ├── Logo
│   ├── Notification
│   ├── Cart
│   └── Profile
│
├── MainContent
│   ├── Home
│   ├── Products
│   └── Profile
│
└── BottomNavigation
    ├── Home
    ├── Products
    └── LiveChat
```

Rules:
- GlobalHeader is displayed on AppShell pages.
- MainContent switches between Home, Products, and Profile.
- BottomNavigation navigates to Home, Products, and LiveChat.
- Notification and Cart icons in GlobalHeader open their corresponding StandalonePages.
- Profile in GlobalHeader opens Profile inside MainContent.
- LiveChat in BottomNavigation opens the standalone LiveChatPage.
- Do not render duplicate headers or bottom navigation bars.

### 3.2 StandalonePages

StandalonePages render independently and must not inherit GlobalHeader or BottomNavigation from AppShell.

```text
StandalonePages
├── NotificationPage
├── CartPage
├── LiveChatPage
├── ProductDetailPage
├── CheckoutPage
├── OrderSuccessPage
├── OrdersPage
└── OrderDetailPage
```

Page responsibilities:

- NotificationPage: display notifications and their read/unread state.
- CartPage: display cart items, selected variants, quantities, stock limits, subtotal, and checkout action.
- LiveChatPage: provide the standalone customer chat interface. If no chat service exists, clearly treat it as a local/demo interface.
- ProductDetailPage: show complete information for the selected product, product images, price, description, available variants, stock, quantity, and purchase actions.
- CheckoutPage: collect customer/contact and shipping details, show an order summary and fixed shipping fee, validate the order, and submit it.
- OrderSuccessPage: confirm successful local order creation and show its order reference and next actions.
- OrdersPage: list saved orders and their current statuses.
- OrderDetailPage: show the complete saved snapshot for one selected order.

### 3.3 Overlay

Overlay is a shared interaction layer that can be opened above AppShell or StandalonePages. It is not a navigation page and must not replace the active page.

```text
Overlay
├── Modal
│   ├── QuickViewModal
│   └── ConfirmationModal
│
├── Drawer
│   ├── CartDrawer
│   └── FilterDrawer
│
├── BottomSheet
│   ├── SortBottomSheet
│   ├── FilterBottomSheet
│   ├── VariantBottomSheet
│   ├── QuantityBottomSheet
│   └── ShareBottomSheet
│
├── Dialog
│   ├── AlertDialog
│   └── ConfirmDialog
│
├── Popover
│
└── Toast
    ├── SuccessToast
    ├── ErrorToast
    └── InfoToast
```

Overlay rules:
- Every overlay must have explicit open and close behavior.
- Modal is for focused, centered content or interactions.
- Drawer is a side panel.
- BottomSheet is a distinct component, not a child of Modal or Drawer.
- Dialog is for important information or confirmation.
- Popover is for small contextual menus or information.
- Toast is for temporary feedback.
- Manage stacking order so overlays appear above page content.
- When a blocking overlay is open, prevent unintended interaction with the background.
- Provide accessible labels and sensible close behavior.

BottomSheet rules:
- Mobile-first and uses the available mobile viewport width.
- Supports content-driven/dynamic height with a sensible maximum height.
- Shows a drag handle.
- Supports swipe-down-to-close where practical.
- Has a backdrop.
- Long content scrolls inside the sheet.
- Background page interaction is disabled while the sheet is active.
- Avoid accidental dismissal while the user is interacting with controls or scrolling.

## 4. Navigation & User Journeys

Required navigation:
- Home, Products, and Profile are destinations inside MainContent.
- GlobalHeader Notification opens NotificationPage.
- GlobalHeader Cart opens CartPage.
- GlobalHeader Profile opens Profile inside MainContent.
- BottomNavigation LiveChat opens LiveChatPage.
- Selecting a product opens ProductDetailPage.
- ProductDetailPage can add a selected product/variant to Cart and provide a route to CartPage.
- CartPage proceeds to CheckoutPage.
- Successful order submission proceeds to OrderSuccessPage.
- OrderSuccessPage provides a route to OrdersPage.
- Selecting an order in OrdersPage opens OrderDetailPage.
- Preserve relevant selected product, cart, and order identifiers during navigation.
- Provide a predictable back action on StandalonePages.
- Do not show AppShell navigation on StandalonePages.

Primary purchase flow:

```text
Products
   ↓
ProductDetailPage
   ↓
CartPage
   ↓
CheckoutPage
   ↓
OrderSuccessPage
   ↓
OrdersPage
   ↓
OrderDetailPage
```

## 5. Application Internal Structure

Keep the single-file implementation organized in clearly labeled sections. Use this logical order:

```text
Application Source
├── 1. App Configuration
├── 2. Constants & Environment
├── 3. Theme & Design System
├── 4. Global Styles
├── 5. Utilities & Formatters
├── 6. Product Data & Mock Data
├── 7. Storage Helpers
├── 8. Context & State Management
├── 9. Shared UI Components
├── 10. AppShell
│   ├── GlobalHeader
│   ├── MainContent
│   └── BottomNavigation
├── 11. StandalonePages
│   ├── NotificationPage
│   ├── CartPage
│   ├── LiveChatPage
│   ├── ProductDetailPage
│   ├── CheckoutPage
│   ├── OrderSuccessPage
│   ├── OrdersPage
│   └── OrderDetailPage
├── 12. Overlay System
├── 13. Navigation Controller
├── 14. Application Logic
└── 15. Root App Component
```

This is an organizational guide inside one file, not a requirement to create separate files.

## 6. Global Application Layout

Use a full-height vertical flex layout as the foundation of the application.

Required layout behavior:
- The application root must occupy 100% of the available viewport height. Use `height: 100%` with the required parent-height setup, and use `100dvh` where appropriate to account for mobile browser viewport changes.
- The root must use `display: flex` and `flex-direction: column`.
- The primary content area (`MainContent` in AppShell, or the equivalent page content area in a StandalonePage) must use `flex: 1` so it fills the remaining vertical space.
- The primary content area must be independently vertically scrollable using `overflow-y: auto`.
- Set `min-height: 0` on the flex child that scrolls so its content can overflow within the available height instead of expanding the root.
- Header and bottom navigation remain outside the scrolling content area and must not shrink unexpectedly. They should stay visible while the main content scrolls, without requiring fixed positioning.
- Apply the same root-and-scroll-area principle to StandalonePages, adapting the non-scrolling top and bottom regions to each page.
- Prevent horizontal overflow and ensure safe-area insets are respected.
- Do not make the entire document/page scroll when the intended behavior is for the main content region to scroll.

Conceptual structure:

```text
ApplicationRoot (height: 100%; display: flex; flex-direction: column)
├── Header / PageHeader (flex: 0 0 auto)
├── MainContent (flex: 1; min-height: 0; overflow-y: auto)
└── BottomNavigation / PageBottomActions (flex: 0 0 auto)
```

## 7. Storefront Mobile UI Design System

The visual system must be a purpose-built mobile storefront UI, not a generic website template or desktop ecommerce layout.

### 7.1 Visual Direction

- Create a modern, premium, clean, product-focused mobile shopping experience suitable for an Apple-product catalog.
- Use restrained visual styling: clear surfaces, generous but efficient spacing, strong product imagery, readable typography, subtle borders/shadows, and deliberate accent colors.
- Prioritize product discovery, product comparison, price visibility, variant selection, and a low-friction purchase journey.
- Use a consistent visual language across Home, Products, ProductDetailPage, CartPage, CheckoutPage, OrdersPage, and all overlays.
- Do not copy Apple's official website or imply affiliation. Use an original storefront identity and the approved store branding/assets when provided.
- Avoid excessive gradients, oversized decorative elements, crowded cards, inconsistent corner radii, and unnecessary animation.

### 7.2 Design Tokens

Define reusable tokens for:
- Color: app background, primary surface, secondary surface, primary text, secondary text, muted text, border/divider, primary action, accent, success, warning, and error.
- Typography: font family, display/title/body/label/caption sizes, weights, line heights, and letter spacing.
- Spacing: a consistent spacing scale for page gutters, section gaps, card padding, and control spacing.
- Shape: shared radii for cards, buttons, inputs, chips, sheets, and image containers.
- Elevation: restrained shadow levels and border treatments.
- Motion: short, purposeful transitions for pressed, selected, expanded, and overlay states.
- Sizing: minimum touch target dimensions, icon sizes, control heights, and mobile page gutters.

Use tokens consistently. Do not scatter unrelated hardcoded values across individual pages when a shared token is appropriate.

### 7.3 Storefront Components & Patterns

- GlobalHeader: compact mobile header with store identity and clear notification, cart, and profile actions.
- Search: prominent, easy-to-reach product search field with clear focus and empty-result states.
- Category navigation: horizontally scrollable category chips or compact category tiles.
- Promotional content: restrained campaign/featured-product banners with clear hierarchy and actionable CTAs.
- Product listing: mobile-first product grid, normally two columns on phone widths, with consistent image ratio, title, price, optional comparison/availability information, and clear tap behavior.
- ProductCard: consistent image area, concise product name, readable RM price, optional variant/stock indicator, and predictable spacing.
- ProductDetail: strong product image/gallery, concise product information, variant controls, stock/quantity selection, price, and a clear purchase action.
- Cart and Checkout: compact, scannable order summaries with clearly separated subtotal, fixed shipping fee, and total.
- BottomNavigation: compact mobile navigation with clear active state, icon, and label.
- Empty, loading, error, and success states: designed as intentional storefront states rather than browser-default messages.

### 7.4 Mobile Layout Rules

- Use mobile-first sizing and a consistent horizontal page gutter.
- Respect safe-area insets, especially at the top and bottom of the viewport.
- Keep important actions reachable and controls comfortable for touch.
- Avoid horizontal page overflow; horizontal scrolling is allowed only for intentional components such as category chips or image galleries.
- Use responsive image sizing with stable aspect ratios and `object-fit: contain` for product photography unless the image content requires another treatment.
- Maintain readable content density: avoid both cramped layouts and excessive empty space.
- Keep sticky/fixed actions from covering content; reserve the required bottom inset/padding.
- Do not introduce desktop-specific breakpoints or alter the storefront composition for wide screens.

### 7.5 Interaction & Component States

- Define consistent default, hover (where applicable), pressed, focused, selected, disabled, loading, success, and error states.
- Provide visible focus indicators and accessible contrast.
- Use clear selected states for category chips, filters, sort options, and product variants.
- Ensure overlays and bottom sheets match the same token system.
- Motion must communicate state changes and must not delay or obstruct essential actions.


## 8. Product Catalog & Product Detail

Product data must be structured consistently and be the source of truth for product displays and cart calculations.

A product may contain:
- Stable product ID.
- Product name and category.
- Description and highlights.
- Price in MYR.
- Main image and additional images.
- Available variants such as color, storage capacity, or size.
- Stock quantity per applicable variant.
- Product status/availability.

ProductDetailPage requirements:
- Resolve the selected product by stable product ID.
- Display product images, name, price, description, and relevant specifications.
- Allow users to select required variants before adding to cart.
- Clearly indicate unavailable or out-of-stock variants.
- Enforce available stock when selecting quantity.
- Provide Add to Cart and, where appropriate, Buy Now actions.
- Give clear success/error feedback.
- Do not invent product specifications, prices, stock, or warranty claims. Clearly label sample catalog data as demo/mock data until real data is connected.

## 9. Cart & State Management

- Use a centralized cart state/context so CartPage, GlobalHeader cart count, ProductDetailPage, and checkout remain synchronized.
- A cart line must identify the product and selected variant.
- Quantity must be a positive integer and cannot exceed available stock.
- Recalculate line totals and subtotal from trusted product/variant prices; do not trust stale UI totals.
- Validate cart data when loading from storage.
- Handle missing products, invalid variants, malformed values, and changed stock safely.
- Prevent duplicate cart lines for the same product and variant; update quantity instead.
- Update the cart badge immediately when cart state changes.
- Persist cart state locally and recover safely after reload.
- Do not clear the cart until order creation has been saved successfully.

## 10. Checkout Requirements

Business rules already decided:
- Shipping is handled manually.
- Shipping fee is a fixed hardcoded amount of RM 52.
- Define a single constant such as `SHIPPING_FEE = 52`; do not duplicate the amount throughout the UI or calculation logic.
- Payment method is undecided. Do not invent a payment provider, payment method, payment screen, or payment integration.
- Until a payment decision is supplied, do not represent an order as paid. Initial payment status is `pending`.

CheckoutPage must:
- Require the customer/contact and shipping information needed to fulfill an order.
- Display the selected cart items, quantities, variants, item prices, subtotal, shipping fee, and final total.
- Calculate total as subtotal + RM 52.
- Validate required fields, cart contents, product/variant validity, quantity, and stock before submission.
- Recalculate all prices and totals from current application data at submission time.
- Prevent repeated submissions while an order is being saved.
- Show validation and save errors clearly.
- Create an order snapshot containing customer/shipping details, item names, product IDs, variants, quantities, unit prices, subtotal, shipping fee, total, timestamps, and statuses.
- Save the order successfully before clearing the cart.
- If saving fails, preserve the cart and entered checkout data so the user can retry.
- Do not claim that a shipping carrier, tracking integration, or payment processing is connected.

Initial order statuses:
- Order status: `pending`.
- Payment status: `pending`.
- Shipping/fulfillment status: `pending`.

## 11. Order Success, Orders & Order Detail

OrderSuccessPage:
- Appears only after an order has been successfully saved.
- Displays the saved order reference, order total, and confirmation message.
- Provides actions to view the order or return to shopping.
- Must not display success when order persistence fails.

OrdersPage:
- Reads saved orders from local storage.
- Shows useful order information such as order reference, date, total, and order/payment/shipping statuses.
- Supports an empty state when no orders exist.
- Selecting an order opens OrderDetailPage using its stable order ID.

OrderDetailPage:
- Loads the selected order by stable order ID.
- Displays the order snapshot, customer/shipping details, purchased items, variants, quantities, price breakdown, total, and statuses.
- Must use the saved order snapshot rather than recalculating historical order prices from a potentially changed product catalog.
- Handles unknown or missing order IDs with a clear not-found state and a route back to OrdersPage.

## 12. Local Persistence & Data Integrity

- Use browser LocalStorage for cart and order persistence in this React web application.
- Use centralized, named storage keys and safe JSON parsing/stringifying helpers.
- Validate data read from LocalStorage; treat stored data as untrusted.
- Handle unavailable storage, malformed JSON, and storage write errors gracefully.
- Persist orders as immutable purchase snapshots.
- Generate stable unique order IDs/references.
- Do not store secrets, credentials, or payment-card data in LocalStorage.
- Clearly distinguish local/demo persistence from a production backend. Do not claim that local orders are synchronized across devices or visible to store staff.
- Keep storage operations behind helper functions so persistence can be replaced by a backend later without rewriting page components.

## 13. Shared Components & Interaction Quality

Create reusable components where appropriate, including:
- PageHeader for standalone page titles and back navigation.
- ProductCard and ProductImageGallery.
- PriceDisplay and StockStatus.
- QuantitySelector and VariantSelector.
- PrimaryButton and SecondaryButton.
- FormField and validation message.
- OrderStatusBadge.
- EmptyState, LoadingState, and ErrorState.
- Toast, Dialog, Modal, Drawer, and BottomSheet primitives.

Interaction requirements:
- Every visible interactive control must perform its stated action.
- Provide immediate feedback for add-to-cart, validation, saving, and navigation.
- Disable actions when required data is invalid or an operation is in progress.
- Avoid dead buttons, placeholder links, and controls that appear functional but do nothing.
- Preserve user input when validation or persistence fails.

## 14. Accessibility, Performance & Reliability

- Use semantic elements and accessible names for controls.
- Ensure text and controls have sufficient contrast.
- Support keyboard focus where applicable without compromising touch-first behavior.
- Use meaningful image alternative text.
- Avoid unnecessary rerenders and duplicated derived state.
- Keep calculations deterministic and centralized.
- Guard against missing data and runtime errors.
- Do not use array indices as persistent product, variant, cart-line, or order identifiers.
- Ensure fixed/sticky elements do not cover scrollable content.
- Include empty, loading, error, and success states where relevant.

## 15. Error Handling & Validation

Handle at minimum:
- Product not found.
- Missing required variant.
- Out-of-stock product or variant.
- Quantity above stock or invalid quantity.
- Empty cart at checkout.
- Missing/invalid checkout fields.
- Cart data corrupted in LocalStorage.
- Order data corrupted in LocalStorage.
- Order save failure.
- Unknown order ID.
- Repeated order submission.

Errors must be understandable to the user and must not silently discard cart or checkout data.

## 16. Implementation & Change Control

- Treat this master prompt and explicit user decisions as the requirements source of truth.
- Before changing existing code, inspect the current implementation and preserve working behavior.
- Do not modify unrelated files or repository configuration.
- Keep the implementation in the single React source file unless the user explicitly authorizes a different structure.
- Do not add unapproved pages to AppShell or StandalonePages.
- Do not add unapproved business rules, payment methods, shipping services, or external integrations.
- When a requirement is genuinely undecided, mark it as undecided and isolate it behind a clear configuration point.
- After implementation, perform a focused audit and report issues honestly.

## 17. Acceptance Criteria

The application is acceptable when all of the following are true:

1. It renders as a mobile-only online store experience with a 100%-height flex-column root and a flex-1, vertically scrollable main content area.
2. The implementation is contained in one React source file.
3. AppShell contains GlobalHeader, MainContent, and BottomNavigation.
4. MainContent contains Home, Products, and Profile.
5. BottomNavigation contains Home, Products, and LiveChat.
6. Notification, Cart, LiveChat, ProductDetailPage, CheckoutPage, OrderSuccessPage, OrdersPage, and OrderDetailPage render as standalone pages without AppShell navigation.
7. Overlay primitives work above both AppShell and StandalonePages.
8. The UI follows the dedicated Storefront Mobile UI Design System and does not transform into a desktop/tablet layout at wider preview sizes.
8. BottomSheet supports the specified mobile interaction behavior.
9. Product selection, variants, stock, cart quantities, and cart badge remain synchronized.
10. Checkout validates required information and calculates subtotal + RM 52 correctly.
11. Payment is not falsely marked as paid and no unapproved payment integration is introduced.
12. An order is saved with pending statuses and a complete immutable snapshot.
13. The cart is cleared only after successful order persistence.
14. OrdersPage and OrderDetailPage read the saved local order data correctly.
15. Empty, loading, error, and success states are handled.
16. No visible control is inert and no unsupported business claim is presented.

## 18. Decisions Still Open

The following items must remain undecided until the user provides requirements:
- Payment method and payment provider.
- Production backend/API for products, inventory, customers, and orders.
- Real shipping carrier, delivery tracking, and shipping workflow.
- Final production catalog, product prices, product images, and inventory.
- Final brand assets and exact visual identity.
- Default application language if a single default is required.

Never fill these gaps with invented facts. Use clearly labeled demo data only where needed to build and test the interface.


## 19. Gemini Canvas Operating Instructions

These instructions adapt the project workflow specifically for Google Gemini Canvas. All requirements in Sections 1–17 remain in force. This section changes the execution workflow only; it does not change the approved product scope, architecture, or business rules.

### 18.1 Canvas as the Primary Workspace

- Build and maintain the application directly in Gemini Canvas.
- Create or update a runnable React application artifact in Canvas, not just a written plan, screenshot, static mockup, or design description.
- Use the Canvas preview to inspect the actual rendered application after implementation and after meaningful changes.
- Keep the implementation in one React source file as required by this project. If the Canvas runtime requires supporting configuration or generated files, keep them to the minimum necessary and do not move application components or business logic out of the primary source file.
- Do not assume that Canvas automatically provides a backend, database, authentication, payment gateway, shipping API, or persistent server storage.
- If a Canvas limitation prevents an exact requirement from being implemented, explain the limitation and provide the closest compliant implementation without silently changing the requirement.

### 18.2 Start-of-Task Procedure

At the beginning of a new task:
1. Read this entire master prompt and treat Sections 1–17 as approved requirements.
2. Inspect the current Canvas code and preview before editing.
3. Identify which page, component, state flow, or behavior the requested change affects.
4. Preserve existing working functionality and the single-file React architecture.
5. If the request conflicts with a locked requirement, explain the conflict and ask for a decision instead of choosing silently.
6. If a required business decision is still open, keep it undecided. Do not block unrelated implementation work.

Do not regenerate the entire application for a small targeted change. Prefer the smallest safe modification.

### 18.3 Implementation Workflow

For each implementation task:
1. State the specific scope of the change briefly.
2. Modify the Canvas React code directly.
3. Keep the code organized according to the application source section order in Section 5.
4. Reuse existing state, utilities, design tokens, and shared components where appropriate.
5. Keep navigation, cart, product, checkout, and order state consistent across pages.
6. Avoid adding dependencies unless they are necessary and supported by the Canvas environment.
7. Do not introduce external services, credentials, API endpoints, or integrations that the user has not approved.
8. Ensure all visible controls have working behavior; do not leave decorative controls that appear interactive.
9. Preserve responsive behavior as a centered mobile-width experience when Canvas is viewed on desktop.

### 18.4 Preview & Validation Loop

After every meaningful implementation:
- Run or refresh the Canvas preview.
- Check for compilation, rendering, and runtime errors.
- Inspect the mobile layout, spacing, typography, safe areas, scrolling, and fixed navigation.
- Exercise the relevant user journey rather than checking appearance alone.
- Verify interactive controls, page navigation, overlays, bottom sheets, and back behavior.
- Verify cart badge synchronization, variant selection, stock limits, and quantity calculations when affected.
- Verify checkout validation, RM 52 shipping calculation, order persistence, pending statuses, and cart clearing behavior when affected.
- Check empty, loading, error, and success states relevant to the change.
- Fix errors introduced by the change before declaring the task complete.

Do not claim that the application was tested if the Canvas preview or relevant interaction could not actually be run.

### 18.5 Data, Storage & Runtime Boundaries

- Use the browser LocalStorage requirements in Section 11 for this React web application, subject to the actual Canvas preview runtime's supported browser capabilities.
- Do not describe Canvas preview storage as a production database or cross-device persistence.
- Use clearly labeled mock/demo catalog data until real product data is supplied or connected through an explicitly approved integration.
- Never fabricate successful payment, shipment, tracking, staff notification, or backend synchronization.
- Keep secrets and private credentials out of source code and LocalStorage.
- If preview sandbox restrictions prevent a browser capability, report the limitation and isolate the affected behavior safely.

### 18.6 Change Safety & Regression Checks

- Before editing, identify the existing behavior that must remain unchanged.
- Make targeted edits and avoid unnecessary rewrites.
- After editing, re-check the changed feature and at least the directly connected flows.
- Do not remove pages, components, data, or user-facing controls unless explicitly requested.
- Do not change approved labels, navigation destinations, fixed shipping fee, order statuses, or storage behavior without authorization.
- If a requested change requires a new page, component, dependency, or file, explain the impact before expanding the architecture.

### 18.7 Completion Report

At the end of each task, provide a concise report containing:
- What was implemented or changed.
- Which parts of the application were affected.
- What was checked in the Canvas preview.
- Any remaining bugs, limitations, or unverified behavior.
- Any requirement or business decision that remains open.

Distinguish clearly between implemented, preview-tested, and not-yet-verified behavior. Do not claim deployment or production readiness merely because the Canvas preview works.

### 18.8 User Instruction Priority

- The user's latest explicit instruction determines the task scope, provided it does not silently override other approved requirements.
- Existing locked requirements remain unchanged unless the user explicitly approves a revision.
- When the user asks to discuss or plan, do not modify the Canvas code yet.
- When the user explicitly asks to implement, make the change in Canvas and validate it.
- When the user asks for an audit, inspect the current code and preview, report findings, and do not modify code unless asked to fix issues.
