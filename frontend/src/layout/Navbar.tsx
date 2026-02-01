import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/auth/auth-slice";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.getLoggedInUser.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-[#EDEFF1]">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-[#FF4500]">
          BugBounty
        </Link>

        {/* NAV */}
        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="font-medium text-[#1A1A1B] hover:text-[#FF4500] transition">
            Bugs
          </Link>

          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm">
           🏆
              <span className="text-gray-600 font-medium">Rewards</span>
              <span className="font-semibold text-green-700">₹{user.totalEarnings.toLocaleString()}</span>
            </div>
          )}

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              {/* TRIGGER */}
              <button
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-2 text-[#1A1A1B] font-medium hover:text-[#FF4500]"
              >
                <span>{user?.name}</span>
                <div className="h-8 w-8 rounded-full bg-[#FF4500] text-white flex items-center justify-center font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-sm border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-lg font-medium text-white bg-[#FF4500] hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
