import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

/* ================= PUBLIC LAYOUT ================= */
import MainLayout from "./components/MainLayout";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/Home";
import Principal from "./pages/administration/Principal";
import VicePrincipal from "./pages/administration/VicePrincipal";
import FormerPrincipals from "./pages/administration/FormerPrincipals";
import AcademicCouncil from "./pages/administration/AcademicCouncil";
import TeachersCouncil from "./pages/administration/TeachersCouncil";
import History from "./pages/about/History";
import AtAGlance from "./pages/about/AtAGlance";
import CitizenCharter from "./pages/about/CitizenCharter";
import HSC from "./pages/academic/HSC";
import Degree from "./pages/academic/Degree";
import Honours from "./pages/academic/Honours";
import Masters from "./pages/academic/Masters";
import DepartmentPage from "./pages/departments/DepartmentPage";
import NoticePage from "./pages/notices/NoticePage";
import WritersCorner from "./pages/writers/WritersCorner";
import ContactUs from "./pages/contact/ContactUs";
import FacultyGroupPage from "./pages/departments/FacultyGroupPage";

/* ================= ADMIN CORE ================= */
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";

/* ================= ADMIN PAGES ================= */

/* Notices */
import NoticeList from "./admin/pages/notices/NoticeList";
import NoticeForm from "./admin/pages/notices/NoticeForm";

/* News */
import NewsList from "./admin/pages/news/NewsList";
import NewsForm from "./admin/pages/news/NewsForm";

/* Administration */
import PrincipalForm from "./admin/pages/administration/PrincipalForm";
import VicePrincipalForm from "./admin/pages/administration/VicePrincipalForm";
import FormerPrincipalsAdmin from "./admin/pages/administration/FormerPrincipals";
import AcademicCouncilAdmin from "./admin/pages/administration/AcademicCouncil";
import TeachersCouncilAdmin from "./admin/pages/administration/TeachersCouncil";

/* Departments */
import DepartmentList from "./admin/pages/departments/DepartmentList";
import DepartmentForm from "./admin/pages/departments/DepartmentForm";

/* Academic */
import FacultyGroupList from "./admin/pages/faculty-groups/FacultyGroupList";
import FacultyGroupForm from "./admin/pages/faculty-groups/FacultyGroupForm";
import TeacherDetails from "./pages/departments/TeacherDetails";
import FacultyList from "./admin/pages/faculty/FacultyList";
import FacultyForm from "./admin/pages/faculty/FacultyForm";
import FacultyDetails from "./admin/pages/faculty/FacultyDetails";

/* Writers */
import WriterList from "./admin/pages/writers/WriterList";
import WriterForm from "./admin/pages/writers/WriterForm";

/* About */
import HistoryForm from "./admin/pages/about/HistoryForm";
import AtAGlanceForm from "./admin/pages/about/AtAGlanceForm";
import CitizenCharterForm from "./admin/pages/about/CitizenCharterForm";



/* Contact */
import ContactMessages from "./admin/pages/contact/ContactMessages";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC WEBSITE ================= */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          {/* Administration */}
          <Route path="/administration/principal" element={<Principal />} />
          <Route path="/administration/vice-principal" element={<VicePrincipal />} />
          <Route path="/administration/former-principals" element={<FormerPrincipals />} />
          <Route path="/administration/academic-council" element={<AcademicCouncil />} />
          <Route path="/administration/teachers-council" element={<TeachersCouncil />} />

          {/* About */}
          <Route path="/about/history" element={<History />} />
          <Route path="/about/at-a-glance" element={<AtAGlance />} />
          <Route path="/about/citizen-charter" element={<CitizenCharter />} />

          {/* Academic */}
          <Route path="/academic/hsc" element={<HSC />} />
          <Route path="/academic/degree" element={<Degree />} />
          <Route path="/academic/honours" element={<Honours />} />
          <Route path="/academic/masters" element={<Masters />} />

{/* Teacher Profile */}
<Route path="/teacher/:id" element={<TeacherDetails />} />

{/* Departments */}
<Route path="/departments/:group/:department" element={<DepartmentPage />} />
<Route path="/departments/:groupSlug" element={<FacultyGroupPage />} />

{/* Notices */}
<Route path="/notices/:category" element={<NoticePage />} />

          {/* Writers */}
          <Route path="/writers-corner" element={<WritersCorner />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/departments/:groupSlug" element={<FacultyGroupPage />} />

        </Route>

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/cms/login" element={<Login />} />

        {/* ================= PROTECTED ADMIN PANEL ================= */}
  <Route
  path="/cms"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
          <Route path="dashboard" element={<Dashboard />} />

          {/* Notices */}
          <Route path="notices" element={<NoticeList />} />
          <Route path="notices/create" element={<NoticeForm />} />

          {/* News */}
          <Route path="news" element={<NewsList />} />
          <Route path="news/create" element={<NewsForm />} />

{/* Administration */}

<Route path="principal" element={<PrincipalForm />} />
<Route path="vice-principal" element={<VicePrincipalForm />} />
<Route path="former-principals" element={<FormerPrincipalsAdmin />} />
<Route path="academic-council" element={<AcademicCouncilAdmin />} />
<Route path="teachers-council" element={<TeachersCouncilAdmin />} />
          

          {/* Departments */}
<Route path="departments" element={<DepartmentList />} />
<Route path="departments/create" element={<DepartmentForm />} />
<Route path="departments/edit/:id" element={<DepartmentForm />} />

{/* Academic */}

/* Faculty Groups */
<Route path="faculty-groups" element={<FacultyGroupList />} />
<Route path="faculty-groups/create" element={<FacultyGroupForm />} />
<Route path="faculty-groups/edit/:id" element={<FacultyGroupForm />} />

{/* /* Faculty */}
<Route path="faculty" element={<FacultyList />} />
<Route path="faculty/create" element={<FacultyForm />} />
<Route path="faculty/edit/:id" element={<FacultyForm />} />
<Route path="faculty/:id" element={<FacultyDetails />} />

          {/* Writers */}
          <Route path="writers" element={<WriterList />} />
          <Route path="writers/create" element={<WriterForm />} />

          {/* About */}
<Route path="history" element={<HistoryForm />} />
<Route path="at-a-glance" element={<AtAGlanceForm />} />
<Route path="citizen-charter" element={<CitizenCharterForm />} />

          {/* Contact */}
          <Route path="contact-messages" element={<ContactMessages />} />

        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);