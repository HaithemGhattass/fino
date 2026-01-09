import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { fetchProjects, createProject } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const addProject = async () => {
    const project = await createProject(name, url);
    setProjects((prev) => [...prev, project]);
    setName("");
    setUrl("");
  };
const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Projects</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={addProject}>Add Project</button>
      </div>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <a href={p.url} target="_blank">{p.name}</a>
            <button onClick={() => navigate(`/projects/${p.id}`)}>
  Open
</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
