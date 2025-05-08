import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Navibar from "./Components/Common/Navibar";
import PageNotFound from "./Pages/PageNotFound";
import ForgotPassword from "./Pages/ForgotPassword";
import OpenRoute from "./Components/RoutesProtector/OpenRoute";
import UpdatePassword from "./Pages/UpdatePassword";
import Verify_Email from "./Pages/Verify_Email";
import ProtectRouteverifyEmail from "./Components/RoutesProtector/ProtectRouteverifyEmail";
import AboutPage from "./Pages/AboutPage";
import ContactUsPage from "./Pages/ContactUsPage";
import Dashboard from "./Pages/Dashboard";
import ClosedRoute from './Components/RoutesProtector/ClosedRoute';
import MyProfile from "./Pages/MyProfile";
import SettingsPage from "./Pages/SettingsPage";
import EnrolledCourses from "./Pages/EnrolledCourses";
import Cart from "./Components/Core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utlis/constants";
import { useSelector } from "react-redux";
import MyCoursePage from "./Components/Core/Dashboard/MyCourses";
import AddCourse from "./Components/Core/Dashboard/AddCourse";
import CatalogPage from "./Pages/CatalogPage";
import CoursePage from "./Pages/CoursePage";
import ViewCourse from "./Pages/ViewCourse";
import VideoPlayer from "./Components/Common/VideoPlayer";




function App() {
  const { user } = useSelector(state => state.Profile);
  // console.log('home user', user);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navibar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={
          <OpenRoute>
            <LoginPage />
          </OpenRoute>
        } />

        <Route path="/signup" element={
          <OpenRoute>
            <SignUpPage />
          </OpenRoute>
        } />

        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />

        <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={

            <ProtectRouteverifyEmail>
              <Verify_Email />
            </ProtectRouteverifyEmail>


          }
        />

        <Route
          path="/about"
          element={
            <AboutPage />
          }
        />

        <Route
          path="/contact"
          element={
            <ContactUsPage />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ClosedRoute>
              <Dashboard />
            </ClosedRoute>
          }
        >

          <Route
            path="my-profile"
            element={<MyProfile />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />

          {/* //Students Dash Route  */}
          {
            (user?.accountType === ACCOUNT_TYPE.STUDENT) && (
              <>
                <Route
                  path="enrolled-courses"
                  element={<EnrolledCourses />}
                />
                <Route
                  path="cart"
                  element={<Cart />}
                />
              </>)
          }

          {/* INSTRUCTORS ROUTE  */}
          {
            (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) && (
              <>
                <Route
                  path="my-courses"
                  element={<MyCoursePage />}
                />
                <Route
                  path="add-course"
                  element={<AddCourse />}
                />
              </>)
          }
        </Route>

        <Route
          path="/catalog/:catalogName"
          element={
            <CatalogPage />
          }
        />

        <Route
          path="/course/:courseId"
          element={
            <CoursePage />
          }
        />

        {
          (user) && (user?.accountType === ACCOUNT_TYPE.STUDENT) && 
          <Route
            path="/view-course/:courseId"
            element={<ClosedRoute>
              <ViewCourse />
            </ClosedRoute>}
          >

            <Route
              path="section/:sectionId/sub-section/:subSectionId"
              element={<VideoPlayer />}
            />

          </Route>
        }


        <Route path="*" element={<PageNotFound />} />

      </Routes>

    </div>
  );
}

export default App;
