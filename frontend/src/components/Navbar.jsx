import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, ReceiptIcon, Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const { toggleTheme, isDarkMode } = useThemeStore();
  const { user, logout, isAdmin } = useAuthStore();
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          SwiftCart
        </Link>
      </div>
      <div className="flex-none gap-2">
        <button 
          className="btn btn-ghost btn-circle transition-all duration-300 ease-in-out"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 hover:rotate-45 transition-transform duration-300" />
          ) : (
            <Moon className="w-5 h-5 hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>
        {user && !isAdmin() && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-2">
              <Link to="/payment-history" className="btn btn-ghost btn-circle">
                <ReceiptIcon className="size-5" />
              </Link>
              <Link to="/cart" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <ShoppingCartIcon className="size-5" />
                  {cartItems.length > 0 && (
                    <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        )}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span className="text-xl">{user.username?.[0]?.toUpperCase()}</span>
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>{isAdmin() ? "Admin" : "Customer"}</span>
              </li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;