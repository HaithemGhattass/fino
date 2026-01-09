import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageCanvas from "../components/PageCanvas";
import { getAuthToken } from "../lib/auth";

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);

  useEffect(() => {
    getAuthToken().then((token) => {
 fetch(`http://localhost:4000/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setProject);
 fetch(`http://localhost:4000/annotations?projectId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setAnnotations);
    });
   
   
  }, [id]);

  const addAnnotation = async (x: number, y: number) => {
    const res = await fetch("http://localhost:4000/annotations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        projectId: id,
        x,
        y,
        content: "New annotation",
      }),
    });

    const created = await res.json();
    setAnnotations((prev) => [...prev, created]);
  };

  if (!project) return null;

  return (
    <div className="project-page">
      <h2>{project.name}</h2>

      {/* 🔥 CORE HUDDLEKIT FEATURE */}
      <PageCanvas
        url={project.url}
        annotations={annotations}
        onAddAnnotation={addAnnotation}
      />
    </div>
  );
}
