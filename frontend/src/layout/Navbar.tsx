import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/auth/auth-slice";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.getLoggedInUser.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-[#EDEFF1]">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-[#FF4500]">
          BugBounty
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="font-medium text-[#1A1A1B] hover:text-[#FF4500] transition"
          >
            Bugs
          </Link>

          {isAuthenticated && (
            <Link
              to="/create-bug"
              className="font-medium text-[#1A1A1B] hover:text-[#FF4500] transition"
            >
              Create Bug
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <span className="text-[#7C7C7C]">{user?.name}</span>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg font-medium text-white bg-[#FF4500] hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
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

