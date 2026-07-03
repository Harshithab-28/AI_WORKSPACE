import { useEffect, useState } from "react";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../api/document";
import { askAI } from "../api/chat";

interface Workspace {
  id: number;
  title: string;
  description: string;
}

interface Document {
  id: number;
  filename: string;
  filepath: string;
  workspace_id: number;
}

interface Props {
  workspace: Workspace;
}

export default function WorkspaceCard({ workspace }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const loadDocuments = async () => {
    try {
      const data = await getDocuments(workspace.id);
      setDocuments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a PDF file.");
      return;
    }

    try {
      await uploadDocument(workspace.id, file);

      alert("PDF uploaded successfully.");

      setFile(null);

      loadDocuments();
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  const handleDeleteDocument = async (id: number) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      await deleteDocument(id);

      loadDocuments();
    } catch (err) {
      console.error(err);
      alert("Unable to delete document.");
    }
  };

  const handleAskAI = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      setLoading(true);

      const response = await askAI(workspace.id, question);

      setAnswer(response.answer);
    } catch (err) {
      console.error(err);
      alert("AI could not answer your question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #dcdcdc",
        borderRadius: "12px",
        padding: "25px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "5px", color: "#2563eb" }}>
        📁 {workspace.title}
      </h2>

      <p
        style={{
          color: "#555",
          marginBottom: "20px",
        }}
      >
        {workspace.description}
      </p>

      <hr />

      <h3>📄 Upload PDF</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button
        onClick={handleUpload}
        style={{
          marginLeft: "10px",
          padding: "8px 16px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>

      <hr style={{ margin: "25px 0" }} />

      <h3>📑 Uploaded Documents</h3>

      {documents.length === 0 ? (
        <p>No documents uploaded.</p>
      ) : (
        documents.map((doc) => (
          <div
            key={doc.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f8f9fa",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          >
            <span>📄 {doc.filename}</span>

            <button
              onClick={() => handleDeleteDocument(doc.id)}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      <hr style={{ margin: "25px 0" }} />

      <h3>🤖 Ask AI</h3>

      <textarea
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: Summarize this resume or list the candidate's skills..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={handleAskAI}
        style={{
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <>
          <hr style={{ margin: "25px 0" }} />

          <h3>💡 AI Response</h3>

          <div
            style={{
              background: "#eef6ff",
              padding: "15px",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
            }}
          >
            {answer}
          </div>
        </>
      )}
    </div>
  );
}