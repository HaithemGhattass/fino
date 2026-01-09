import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./styles/globals.css";
import "./styles/layout.css";
import LogoutButton from "./components/LogoutButton";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Login />;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h1>Fino</h1>
      <LogoutButton />
      </aside>
      <main className="main">
        <Dashboard />
      </main>
    </div>
  );
}
