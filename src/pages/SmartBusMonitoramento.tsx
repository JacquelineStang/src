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

      <div>
        Linha 203 Santa Cândida
        <br />
        Próximo ônibus: 4 minutos
      </div>

      <br />

      <div>
        Linha 505 Boqueirão
        <br />
        Próximo ônibus: 7 minutos
      </div>

      <br />

      <div>
        Linha Interbairros
        <br />
        Próximo ônibus: 12 minutos
      </div>

      <br />

      <button
        onClick={() => navigate("/home")}
      >
        VOLTAR
      </button>
    </div>
  );
}