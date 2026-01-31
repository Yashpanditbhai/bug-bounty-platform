import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchLoggedInUserDetail } from "@/store/user/get-loggedin-user-slice";
import type { RootState, AppDispatch } from "@/store";

const RootLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  // ✅ auto-fetch user if token exists
  useEffect(() => {
    if (token) {
      dispatch(fetchLoggedInUserDetail());
    }
  }, [token, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
