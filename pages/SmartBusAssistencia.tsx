import { useNavigate } from "react-router-dom";

export default function SmartBusAssistencia() {
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
      <h1>🤝 Assistência Social</h1>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        Passe Escolar
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        Passe Livre
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        Benefícios Sociais
      </div>

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