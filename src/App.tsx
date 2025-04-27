import "./assets/css/App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword";
import { TenantProfile } from "./pages/TenantProfile";
import { LandlordProfile } from "./pages/LandlordProfile";
import { News } from "./pages/News";
import Blog from "./pages/Blog";
import { BlogPage } from "./pages/BlogPage";
import { Details } from "./pages/Details";
import { ChatWidget } from "./components/ChatWidget/ChatWidget";
import ScrollToTop from "./components/ScrolltoTop";
import ProtectedRoute from "./components/ProtectedRoute";
import LandlordProtectedRoute from "./components/LandlordProtectedRoute";
import KYCRequest from "./pages/KYCRequest";
import CreateListing from "./pages/CreateListing";
import { Toaster } from "sonner";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/blog/create" element={<CreateBlog />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/kyc-request"
          element={
            <ProtectedRoute>
              <KYCRequest />
            </ProtectedRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/profile/tenant"
          element={
            <ProtectedRoute>
              <TenantProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/landlord"
          element={
            <ProtectedRoute>
              <LandlordProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-listing"
          element={
            <LandlordProtectedRoute>
              <CreateListing />
            </LandlordProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-gray-600 mb-4">
                Trang bạn tìm kiếm không tồn tại
              </p>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-[#D9D9D9] text-black hover:bg-[#c4c4c4] rounded"
              >
                Quay lại
              </button>
            </div>
          }
        />
      </Routes>

      {/* Chat Widget will appear on all pages */}
      <ChatWidget />
    </>
  );
}

export default App;
