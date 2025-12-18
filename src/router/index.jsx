import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "@/pages/index";
import UsersPage from "../pages/users";
import RolesPage from "../pages/roles";
import StudentPage from "../pages/students";
import AttendancePage from "../pages/students/attendance";
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

        {/* =============================
            PROTECTED ROUTES
        ============================== */}
        <Route element={<ProtectedRoute allowedRoles={["Admin","Teacher","Student"]} />}>
          <Route element={<HorizontalLayout />}>

            {/* Dashboard (all roles) */}
            <Route path="/" element={<IndexPage />} />

            {/* ADMIN ONLY */}
            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/roles" element={<RolesPage />} />
            </Route>

            {/* TEACHER + ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={["Teacher", "Admin"]} />}>
              <Route path="/students/list" element={<StudentPage />} />
              <Route path="/classrooms/list" element={<ClassroomPage />} />
              <Route path="/manage-classrooms/:id" element={<ManageClassroom />} />
              <Route path="/payment/payments" element={<PaymentListPage />} />
              <Route path="/payment/payments/:institution_id" element={<PaymentListByInstitutionPage />} />
            </Route>

            {/* STUDENT + TEACHER + ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={["Student", "Teacher", "Admin"]} />}>
              <Route path="/payment/fee-structure" element={<PaymentPage />} />
              <Route path="/settings/profile" element={<ProfilePage />} />
              <Route path="/students/attendance" element={<AttendancePage />} />
            </Route>

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
