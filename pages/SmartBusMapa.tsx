import { useNavigate } from "react-router-dom";

export default function SmartBusMapa() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#0D3B4C",
        color: "white",
        borderRadius: "10px"
      }}
    >
      <h1>📍 MAPA</h1>

      <p>📍 Terminal Cabral</p>
      <p>📍 Terminal Boqueirão</p>
      <p>📍 Terminal Pinheirinho</p>
      <p>📍 Terminal CIC</p>

      <p style={{ marginTop: "20px" }}>
        Google Maps será integrado na próxima versão.
      </p>

      <button
        onClick={() => navigate("/home")}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          backgroundColor: "#FFCC00",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold"
        }}
      >
        VOLTAR
      </button>
    </div>
  );
}