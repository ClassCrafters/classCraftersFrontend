import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "@/pages/index";
import UsersPage from "../pages/users";
import RolesPage from "../pages/roles";
import StudentPage from "../pages/students";
import AttendancePage from "../pages/students/attendance";
import ManageAttendancePage from "../pages/students/attendance/mannageAttendance";
import ClassroomPage from "../pages/classroom/index";
import PaymentPage from "../pages/payment";
import PaymentListPage from "../pages/payment/paymentList/paymentList";
import ManageClassroom from "../pages/classroom/manageClassroom/manageClassroom";
import PaymentListByInstitutionPage from "../pages/payment/paymentList/paymentListByInstitution";
import ProfilePage from "@/pages/settings/profile";
import LoginPage from "@/pages/login";
import LobbyPage from "../components/videoStream/lobby";
import RoomPage from "../components/videoStream/room";
import LeaveManagement from "@/pages/leave";
import EnquiryPage from "../pages/frontOffice/enquiry";
import VisitorBook from "../pages/frontOffice/visitorBook";
import Dispatch from "../pages/frontOffice/dispatch";
import PostalReceive from "../pages/frontOffice/receive";
import ComplainPage from "../pages/frontOffice/complain";
import MessengerPage from "../pages/messanger";
import Admission from "../pages/students/admission";
import StudentDetails from "../pages/students/studentDetails";
import Subjects from "../pages/academics/subjects";
import TeacherTimeTable from "../pages/academics/teacherTimeTable";
import StudentTimeTable from "../pages/academics/studentTimeTable";
import AssignFees from "../pages/payment/assignFees";
import ManageAssign from "../pages/payment/assignFees/manageAssign";
import CollectFees from "../pages/payment/collectFees";
import ManageCollect from "../pages/payment/collectFees/manageCollect";
import SearchDueFees from "../pages/payment/searchDueFees";
import Alumni from "../pages/alumni";
import Library from "../pages/library";
import BookList from "../pages/library/bookList";
import IssueReturn from "../pages/library/issue-return";
import ManageIssueReturn from "../pages/library/issue-return/manageIssueReturn";
import Inventory from "../pages/inventory";

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
        <Route
          element={
            <ProtectedRoute allowedRoles={["Admin", "Teacher", "Student"]} />
          }
        >
          <Route element={<HorizontalLayout />}>
            {/* Dashboard (all roles) */}
            <Route path="/" element={<IndexPage />} />

            {/* ADMIN ONLY */}
            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/roles" element={<RolesPage />} />
            </Route>

            {/* TEACHER + ADMIN */}
            <Route
              element={<ProtectedRoute allowedRoles={["Teacher", "Admin"]} />}
            >
              <Route path="/students/list" element={<StudentPage />} />
              <Route path="/classrooms/list" element={<ClassroomPage />} />
              <Route
                path="/manage-classrooms/:id"
                element={<ManageClassroom />}
              />
              <Route path="/payment/payments" element={<PaymentListPage />} />
              <Route
                path="/payment/payments/:institution_id"
                element={<PaymentListByInstitutionPage />}
              />

              <Route path="/payment/assign-fees" element={<AssignFees />} />
              <Route path="/payment/assign-fees/:id" element={<ManageAssign />} />
              <Route path="/payment/collect-fees" element={<CollectFees />} />
              <Route path="/payment/collect-fees/:id" element={<ManageCollect />} />
              <Route path="/payment/search-due-fees" element={<SearchDueFees />} />

            </Route>

            {/* STUDENT + TEACHER + ADMIN */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["Student", "Teacher", "Admin"]}
                />
              }
            > {/* Academics + Leave Management */}
              <Route path="academics/leave-management" element={<LeaveManagement />} />
              <Route path="/payment/fee-structure" element={<PaymentPage />} />
              <Route path="/settings/profile" element={<ProfilePage />} />
              <Route path="/students/attendance" element={<AttendancePage />} />
              <Route
                path="/students/attendance/manage"
                element={<ManageAttendancePage />}
              />
              <Route path="/students/attendance/manage" element={<ManageAttendancePage />} />
              <Route path="/students/admission" element={<Admission />} />
              <Route path="/students/details/:studentId" element={<StudentDetails />} />
              <Route path="/video-stream/lobby" element={<LobbyPage />} />
              <Route path="/video-stream/room/:roomId" element={<RoomPage />} />
              <Route path="/front-office/enquiries" element={<EnquiryPage />} />
              <Route path="/front-office/visitor-book" element={<VisitorBook />} />
              <Route path="/front-office/dispatch" element={<Dispatch />} />
              <Route path="/front-office/receive" element={<PostalReceive />} />
              <Route path="/front-office/complain" element={<ComplainPage />} />
              <Route path="/teacher/timetable" element={<TeacherTimeTable />} />
              <Route path="/student/timetable" element={<StudentTimeTable />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/library" element={<Library />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/library/booklist" element={<BookList />} />
              <Route path="/library/issue-return" element={<IssueReturn />} />
              <Route path="/library/issue-return/manage/:studentId" element={<ManageIssueReturn />} />

            </Route>
            <Route path="/students/attendance" element={<AttendancePage />} />
            <Route path="/messenger/list" element={<MessengerPage />} />
          </Route>

          {/* Academics + Leave Management */}
          <Route path="academics/leave-management" element={<LeaveManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
