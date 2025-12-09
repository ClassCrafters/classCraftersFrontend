import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "@/pages/index";
import UsersPage from "../pages/users";
import RolesPage from "../pages/roles";
import StudentPage from "../pages/students";
import ClassroomPage from "../pages/classroom/index";
import PaymentPage from "../pages/payment";
import PaymentListPage from "../pages/payment/paymentList/paymentList";
import ManageClassroom from "../pages/classroom/manageClassroom/manageClassroom";
import PaymentListByInstitutionPage from "../pages/payment/paymentList/paymentListByInstitution";
import ProfilePage from "@/pages/settings/profile";
import LoginPage from "@/pages/login";

import HorizontalLayout from "@/layouts/horizontal";

import ProtectedRoute from "../router/protectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC PAGE */}
        <Route path="/login/auth" element={<LoginPage />} />

        {/* PROTECTED LAYOUT */}
        <Route element={<HorizontalLayout />}>
          
          {/* DASHBOARD - allowed for all roles */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Teacher", "Student"]}>
                <IndexPage />
              </ProtectedRoute>
            }
          />

          {/* Admin ONLY */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* Admin ONLY */}
          <Route
            path="/roles"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <RolesPage />
              </ProtectedRoute>
            }
          />

          {/* Teacher + Admin */}
          <Route
            path="/Students/list"
            element={
              <ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
                <StudentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/classrooms/list"
            element={
              <ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
                <ClassroomPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage-classrooms/:id"
            element={
              <ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
                <ManageClassroom />
              </ProtectedRoute>
            }
          />

          {/* Student + Teacher + Admin */}
          <Route
            path="/payment/fee-structure"
            element={
              <ProtectedRoute allowedRoles={["Student", "Teacher", "Admin"]}>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment/payments"
            element={
              <ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
                <PaymentListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment/payments/:institution_id"
            element={
              <ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
                <PaymentListByInstitutionPage />
              </ProtectedRoute>
            }
          />

          {/* ALL ROLES */}
          <Route
            path="/settings/profile"
            element={
              <ProtectedRoute allowedRoles={["Student", "Teacher", "Admin"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
