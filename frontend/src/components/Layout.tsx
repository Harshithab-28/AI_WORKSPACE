import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        🤖 AI Workspace
      </h1>

      {children}
    </div>
  );
}