import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    alert("Logged out successfully.");

    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#2563eb",
       