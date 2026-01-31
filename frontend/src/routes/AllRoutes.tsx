import RootLayout from "@/layout/RootLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import CreateBugPage from "@/pages/CreateBugPage";
import BugDetailsPage from "@/pages/BugDetailsPage";
// import SubmitBugPage from "@/pages/SubmitBugPage";
// import ReviewSubmissionsPage from "@/pages/ReviewSubmissionsPage";
import ProtectedRoute from "@/routes/PrivateRoute";
import SubmitSolutionPage from "@/pages/SubmitSolutionPage";

const routes = [
  // ---------- PUBLIC ROUTES ----------
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: "bugs/:bugCode",
        element: <BugDetailsPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "create-bug",
            element: <CreateBugPage />,
          },
          {
            path: "bugs/:bugCode/submit",
            element: <SubmitSolutionPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
