import { useNavigate } from "react-router-dom";

export default function SmartBusMapa() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#0D3B4C",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <h1>📍 SmartBus Mapa</h1>

      <p
        style={{
          color: "#FFCC00",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Monitoramento dos principais terminais de Curitiba
      </p>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        📍 Terminal Cabral
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        📍 Terminal Boqueirão
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        📍 Terminal Pinheirinho
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        📍 Terminal CIC
      </div>

      <div
        style={{
          backgroundColor: "#082C39",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <strong>Status do Sistema:</strong>
        <br />
        Integração com Google Maps preparada para a próxima versão do SmartBus.
      </div>

      <button
        onClick={() => navigate("/home")}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#FFCC00",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        VOLTAR
      </button>
    </div>
  );
}