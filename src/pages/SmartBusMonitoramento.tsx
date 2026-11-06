import { useNavigate } from "react-router-dom";

export default function SmartBusMonitoramento() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#0D3B4C",
        color: "white",
        borderRadius: "10px"
      }}
    >
      <h1>🚌 Monitoramento</h1>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        <strong>Linha 203 Santa Cândida</strong>
        <br />
        Próximo ônibus: 4 minutos
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        <strong>Linha 505 Boqueirão</strong>
        <br />
        Próximo ônibus: 7 minutos
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        <strong>Linha Interbairros</strong>
        <br />
        Próximo ônibus: 12 minutos
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