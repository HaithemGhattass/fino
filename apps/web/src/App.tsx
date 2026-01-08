import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import "./styles/globals.css";
import "./styles/layout.css";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Login />;

  return (
    <div className="app-layout">
      <aside className="sidebar">Huddlekit</aside>
      <main className="main">Dashboard</main>
    </div>
  );
}
