import { useEffect, useState } from "react";
import WorkspaceCard from "../components/WorkspaceCard";
import {
  getWorkspaces,
  createWorkspace,
  deleteWorkspace,
} from "../api/workspace";

interface Workspace {
  id: number;
  title: string;
  description: string;
}

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadWorkspaces = async () => {
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load workspaces");
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Please enter a workspace title.");
      return;
    }

    try {
      await createWorkspace(title, description);

      setTitle("");
      setDescription("");

      loadWorkspaces();
    } catch (err) {
      console.error(err);
      alert("Unable to create workspace");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this workspace?")) return;

    try {
      await deleteWorkspace(id);
      loadWorkspaces();
    } catch (err) {
      console.error(err);
      alert("Unable to delete workspace");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          background: "#2563eb",
          color: "white",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <h2>🤖 AI Workspace</h2>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "30px auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            color: "#1f2937",
            marginBottom: "25px",
          }}
        >
          Dashboard
        </h1>

        {/* Create Workspace */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            marginBottom: "35px",
          }}
        >
          <h2>Create Workspace</h2>

          <input
            type="text"
            placeholder="Workspace Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          />

          <textarea
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <button
            onClick={handleCreate}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Create Workspace
          </button>
        </div>

        <h2 style={{ marginBottom: "20px" }}>📁 My Workspaces</h2>

        {workspaces.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            No workspaces found.
          </div>
        ) : (
          workspaces.map((workspace) => (
            <div
              key={workspace.id}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "25px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              }}
            >
              <WorkspaceCard workspace={workspace} />

              <button
                onClick={() => handleDelete(workspace.id)}
                style={{
                  marginTop: "15px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🗑 Delete Workspace
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}