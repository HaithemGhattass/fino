import { logout } from "../lib/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      // Redirect user to login page
      window.location.href = "/login";
    }
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
}
