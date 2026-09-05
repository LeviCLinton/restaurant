import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppStoreProvider } from "@/context/AppStoreContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { MarketingLayout } from "@/layouts/MarketingLayout";
import { HomePage } from "@/pages/marketing/HomePage";
import { FeaturesPage } from "@/pages/marketing/FeaturesPage";
import { SolutionsPage } from "@/pages/marketing/SolutionsPage";
import { PricingPage } from "@/pages/marketing/PricingPage";
import { DemoPage } from "@/pages/marketing/DemoPage";
import { CustomerOrderLayout } from "@/layouts/CustomerOrderLayout";
import { MenuPage } from "@/pages/demo/MenuPage";
import { CheckoutPage } from "@/pages/demo/CheckoutPage";
import { OrderTrackingPage } from "@/pages/demo/OrderTrackingPage";
import { StyleGuidePage } from "@/pages/StyleGuidePage";
import { PhasePlaceholder } from "@/pages/PhasePlaceholder";

// Dashboard, kitchen, analytics, and auth are code-split: a customer placing
// an order from a QR code should never download dashboard/chart bundles.
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout").then((m) => ({ default: m.DashboardLayout })));
const OverviewPage = lazy(() => import("@/pages/dashboard/OverviewPage").then((m) => ({ default: m.OverviewPage })));
const OrdersPage = lazy(() => import("@/pages/dashboard/OrdersPage").then((m) => ({ default: m.OrdersPage })));
const TablesPage = lazy(() => import("@/pages/dashboard/TablesPage").then((m) => ({ default: m.TablesPage })));
const ReservationsPage = lazy(() => import("@/pages/dashboard/ReservationsPage").then((m) => ({ default: m.ReservationsPage })));
const MenuManagementPage = lazy(() => import("@/pages/dashboard/MenuManagementPage").then((m) => ({ default: m.MenuManagementPage })));
const CustomersPage = lazy(() => import("@/pages/dashboard/CustomersPage").then((m) => ({ default: m.CustomersPage })));
const LoyaltyPage = lazy(() => import("@/pages/dashboard/LoyaltyPage").then((m) => ({ default: m.LoyaltyPage })));
const AnalyticsPage = lazy(() => import("@/pages/dashboard/AnalyticsPage").then((m) => ({ default: m.AnalyticsPage })));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage").then((m) => ({ default: m.SettingsPage })));
const KitchenPage = lazy(() => import("@/pages/kitchen/KitchenPage").then((m) => ({ default: m.KitchenPage })));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage").then((m) => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage").then((m) => ({ default: m.SignupPage })));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-50">
      <div
        className="size-8 animate-spin rounded-full border-2 border-paper-300 border-t-brass-500"
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}

export default function App() {
  return (
    <AppStoreProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter basename="/restaurant">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* Marketing */}
                <Route element={<MarketingLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/solutions" element={<SolutionsPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/demo" element={<DemoPage />} />
                </Route>

                {/* Customer ordering experience */}
                <Route element={<CustomerOrderLayout />}>
                  <Route path="/demo/order" element={<MenuPage />} />
                  <Route path="/demo/order/checkout" element={<CheckoutPage />} />
                  <Route path="/demo/order/track/:orderId" element={<OrderTrackingPage />} />
                </Route>

                {/* Restaurant dashboard */}
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<OverviewPage />} />
                  <Route path="/dashboard/orders" element={<OrdersPage />} />
                  <Route path="/dashboard/tables" element={<TablesPage />} />
                  <Route path="/dashboard/reservations" element={<ReservationsPage />} />
                  <Route path="/dashboard/menu" element={<MenuManagementPage />} />
                  <Route path="/dashboard/customers" element={<CustomersPage />} />
                  <Route path="/dashboard/loyalty" element={<LoyaltyPage />} />
                  <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
                  <Route path="/dashboard/settings" element={<SettingsPage />} />
                </Route>

                {/* Kitchen display */}
                <Route path="/kitchen" element={<KitchenPage />} />

                {/* Auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Internal: design system QA, not part of the product sitemap */}
                <Route path="/styleguide" element={<StyleGuidePage />} />

                <Route path="*" element={<PhasePlaceholder phase="404" title="Page not found" />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AppStoreProvider>
  );
}
