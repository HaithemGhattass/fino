import { Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import "../styles/layout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h1>Fino</h1>
        <LogoutButton />
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
