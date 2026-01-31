import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/auth/auth-slice";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/store/ui/ui-slice";

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
    <nav className="bg-white border-b border-gray-200">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-lg font-bold text-orange-500">
          BugBounty
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link to="/" className="link">
            Bugs
          </Link>

          {isAuthenticated && (
            <Link to="/create-bug" className="link">
              Create Bug
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <span className="muted">{user?.name}</span>
              <button onClick={handleLogout} className="btn-primary">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
