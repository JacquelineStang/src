import { useNavigate } from "react-router-dom";
 
export default function SmartBusHome() {
  const navigate = useNavigate();
 
  const dadosLogado = localStorage.getItem("smartbus_usuario_logado");
  const usuarioLogado = dadosLogado ? JSON.parse(dadosLogado) : null;
 
  const estiloBotao = {
    width: "100%",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#1C6688",
    color: "white",
    border: "none",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer",
  };
 
  function handleSair() {
    localStorage.removeItem("smartbus_usuario_logado");
    navigate("/");
  }
 
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b2239",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#0D3B4C",
          border: "4px solid #114d66",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFCC00",
            color: "black",
            textAlign: "center",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: "0 0 6px 0", fontSize: "1.6rem" }}>🚌 SmartBus</h1>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "normal" }}>
            Mobilidade Inteligente
          </h2>
        </div>
 
        <p
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "5px",
            fontSize: "1.1rem",
          }}
        >
          {usuarioLogado?.nome ? `Bem-vindos, ${usuarioLogado.nome}` : "Bem-vindos"}
        </p>
 
        <p
          style={{
            color: "#FFCC00",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Sistema de Mobilidade Inteligente de Curitiba
        </p>
 
        <button style={estiloBotao} onClick={() => navigate("/linhas")}>
          🚌 LINHAS
        </button>
 
        <button style={estiloBotao} onClick={() => navigate("/mapa")}>
          📍 MAPA
        </button>
 
        <button style={estiloBotao} onClick={() => navigate("/favoritos")}>
          ⭐ FAVORITOS
        </button>
 
        <button style={estiloBotao} onClick={() => navigate("/ocorrencias")}>
          ⚠️ OCORRÊNCIAS
        </button>
 
        <button style={estiloBotao} onClick={() => navigate("/assistencia")}>
          🤝 ASSISTÊNCIA SOCIAL
        </button>
 
        <button style={estiloBotao} onClick={handleSair}>
          🚪 SAIR
        </button>
 
        <div
          style={{
            textAlign: "right",
            color: "white",
            marginTop: "10px",
          }}
        >
          Versão 1.0
        </div>
      </div>
    </div>
  );
}