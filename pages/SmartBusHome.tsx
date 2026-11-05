import { useNavigate } from "react-router-dom";

export default function SmartBusHome() {
  const navigate = useNavigate();

  const estiloBotao = {
    width: "100%",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#1C6688",
    color: "white",
    border: "none",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#0D3B4C",
        border: "4px solid #114d66",
        borderRadius: "10px"
      }}
    >
      <div
        style={{
          backgroundColor: "#FFCC00",
          textAlign: "center",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px"
        }}
      >
        <h1>🚌 SmartBus</h1>
        <h2>Mobilidade Inteligente</h2>
      </div>

      <p
        style={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "5px"
        }}
      >
        Bem-vinda Jacqueline
      </p>

      <p
        style={{
          color: "#FFCC00",
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        Sistema de Mobilidade Inteligente de Curitiba
      </p>

      <button
        style={estiloBotao}
        onClick={() => navigate("/linhas")}
      >
        🚌 LINHAS
      </button>

      <button
        style={estiloBotao}
        onClick={() => navigate("/mapa")}
      >
        📍 MAPA
      </button>

      <button
        style={estiloBotao}
        onClick={() => navigate("/favoritos")}
      >
        ⭐ FAVORITOS
      </button>

      <button
        style={estiloBotao}
        onClick={() => navigate("/ocorrencias")}
      >
        ⚠️ OCORRÊNCIAS
      </button>

      <button
        style={estiloBotao}
        onClick={() => navigate("/assistencia")}
      >
        🤝 ASSISTÊNCIA SOCIAL
      </button>

      <button
        style={estiloBotao}
        onClick={() => navigate("/")}
      >
        🚪 SAIR
      </button>

      <div
        style={{
          textAlign: "right",
          color: "white",
          marginTop: "10px"
        }}
      >
        Versão 1.0
      </div>
    </div>
  );
}