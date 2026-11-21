# Master Prompt — Mobile Online Store

## 1. AI Role & Responsibility

Act as an expert AI Prompt Engineer, React Application Architect, and Gemini Canvas Application Builder.

Your responsibility is to plan, design, implement, review, and improve a complete mobile-only online store application. Follow the requirements in this document as the source of truth.

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
- Main implementation artifact: a single `App.jsx` file.
- Keep application code in `App.jsx`; do not split implementation into additional source files unless the user explicitly changes this requirement.
- Design for a mobile viewport and touch interaction. Do not create tablet or desktop layouts.
- If displayed in a desktop preview, keep the application rendered as a centered mobile-width experience; do not convert it into a desktop website.
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

## 5. App.jsx Internal Structure

Keep the single-file implementation organized in clearly labeled sections. Use this logical order:

```text
App.jsx
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

## 6. Theme & Design System

Create a consistent mobile commerce design system:
- Define reusable color, typography, spacing, radius, shadow, border, and elevation tokens.
- Use a clear visual hierarchy and readable typography.
- Use consistent button, input, card, badge, icon, product tile, and navigation styles.
- Provide clear states for default, pressed, selected, disabled, loading, success, and error.
- Use touch-friendly controls and adequate spacing.
- Respect device safe areas and avoid content being obscured by system areas or fixed navigation.
- Keep product imagery proportional and avoid distortion.
- Maintain visual consistency across AppShell, StandalonePages, and Overlay.
- Do not introduce arbitrary styles separately for each page when a shared token/component is appropriate.

## 7. Product Catalog & Product Detail

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

## 8. Cart & State Management

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

## 9. Checkout Requirements

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

## 10. Order Success, Orders & Order Detail

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

## 11. Local Persistence & Data Integrity

- Use browser LocalStorage for cart and order persistence in this React web application.
- Use centralized, named storage keys and safe JSON parsing/stringifying helpers.
- Validate data read from LocalStorage; treat stored data as untrusted.
- Handle unavailable storage, malformed JSON, and storage write errors gracefully.
- Persist orders as immutable purchase snapshots.
- Generate stable unique order IDs/references.
- Do not store secrets, credentials, or payment-card data in LocalStorage.
- Clearly distinguish local/demo persistence from a production backend. Do not claim that local orders are synchronized across devices or visible to store staff.
- Keep storage operations behind helper functions so persistence can be replaced by a backend later without rewriting page components.

## 12. Shared Components & Interaction Quality

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

## 13. Accessibility, Performance & Reliability

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

## 14. Error Handling & Validation

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

## 15. Implementation & Change Control

- Treat this master prompt and explicit user decisions as the requirements source of truth.
- Before changing existing code, inspect the current implementation and preserve working behavior.
- Do not modify unrelated files or repository configuration.
- Keep the implementation in App.jsx unless the user explicitly authorizes a different structure.
- Do not add unapproved pages to AppShell or StandalonePages.
- Do not add unapproved business rules, payment methods, shipping services, or external integrations.
- When a requirement is genuinely undecided, mark it as undecided and isolate it behind a clear configuration point.
- After implementation, perform a focused audit and report issues honestly.

## 16. Acceptance Criteria

The application is acceptable when all of the following are true:

1. It renders as a mobile-only online store experience.
2. The implementation is contained in one App.jsx file.
3. AppShell contains GlobalHeader, MainContent, and BottomNavigation.
4. MainContent contains Home, Products, and Profile.
5. BottomNavigation contains Home, Products, and LiveChat.
6. Notification, Cart, LiveChat, ProductDetailPage, CheckoutPage, OrderSuccessPage, OrdersPage, and OrderDetailPage render as standalone pages without AppShell navigation.
7. Overlay primitives work above both AppShell and StandalonePages.
8. BottomSheet supports the specified mobile interaction behavior.
9. Product selection, variants, stock, cart quantities, and cart badge remain synchronized.
10. Checkout validates required information and calculates subtotal + RM 52 correctly.
11. Payment is not falsely marked as paid and no unapproved payment integration is introduced.
12. An order is saved with pending statuses and a complete immutable snapshot.
13. The cart is cleared only after successful order persistence.
14. OrdersPage and OrderDetailPage read the saved local order data correctly.
15. Empty, loading, error, and success states are handled.
16. No visible control is inert and no unsupported business claim is presented.

## 17. Decisions Still Open

The following items must remain undecided until the user provides requirements:
- Payment method and payment provider.
- Production backend/API for products, inventory, customers, and orders.
- Real shipping carrier, delivery tracking, and shipping workflow.
- Final production catalog, product prices, product images, and inventory.
- Final brand assets and exact visual identity.
- Default application language if a single default is required.

Never fill these gaps with invented facts. Use clearly labeled demo data only where needed to build and test the interface.
