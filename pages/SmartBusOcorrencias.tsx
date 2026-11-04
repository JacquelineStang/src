import { useNavigate } from "react-router-dom";

export default function SmartBusOcorrencias() {
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
      <h1>⚠️ Ocorrências</h1>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        🚧 Obras na Avenida Marechal Floriano.
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        🚦 Trânsito intenso próximo ao Terminal Boqueirão.
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        🚌 Linha 505 operando com atraso de 8 minutos.
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        🚌 Linha Interbairros operando normalmente.
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
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        VOLTAR
      </button>
    </div>
  );
}