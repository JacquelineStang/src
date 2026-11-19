import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
 
export default function SmartBusHome() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("Passageiro");
 
  useEffect(() => {
    const dadosLogado = localStorage.getItem("smartbus_usuario_logado");
    if (dadosLogado) {
      try {
        const usuario = JSON.parse(dadosLogado);
        if (usuario.nome) {
          setNomeUsuario(usuario.nome.split(" ")[0]);
        }
      } catch {
        setNomeUsuario("Passageiro");
      }
    }
  }, []);
 
  function handleSair() {
    localStorage.removeItem("smartbus_usuario_logado");
    navigate("/login");
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
          maxWidth: "420px",
          padding: "20px",
          backgroundColor: "#0D3B4C",
          border: "4px solid #114d66",
          borderRadius: "10px",
          color: "white",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFCC00",
            color: "black",
            textAlign: "center",
            padding: "14px",
            borderRadius: "6px",
            marginBottom: "18px",
          }}
        >
          <h1 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>🚌 SmartBus Curitiba</h1>
          <div style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
            Olá, {nomeUsuario}! Escolha um módulo:
          </div>
        </div>
 
        <button
          onClick={() => navigate("/mapa")}
          style={{
            width: "100%",
            padding: "13px",
            backgroundColor: "#144E68",
            color: "white",
            border: "1px solid #1C6688",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "10px",
            textAlign: "left",
          }}
        >
          🗺️ Mapa em Tempo Real (GPS)
        </button>
 
        <button
          onClick={() => navigate("/linhas")}
          style={{
            width: "100%",
            padding: "13px",
            backgroundColor: "#144E68",
            color: "white",
            border: "1px solid #1C6688",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "10px",
            textAlign: "left",
          }}
        >
          🚏 Linhas e Horários de Curitiba
        </button>
 
        <button
          onClick={() => navigate("/favoritos")}
          style={{
            width: "100%",
            padding: "13px",
            backgroundColor: "#144E68",
            color: "white",
            border: "1px solid #1C6688",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "10px",
            textAlign: "left",
          }}
        >
          ⭐ Minhas Linhas Favoritas
        </button>
 
        <button
          onClick={() => navigate("/ocorrencias")}
          style={{
            width: "100%",
            padding: "13px",
            backgroundColor: "#144E68",
            color: "white",
            border: "1px solid #1C6688",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "10px",
            textAlign: "left",
          }}
        >
          🚨 Segurança e Ocorrências
        </button>
 
        <button
          onClick={() => navigate("/assistencia")}
          style={{
            width: "100%",
            padding: "13px",
            backgroundColor: "#144E68",
            color: "white",
            border: "1px solid #1C6688",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "10px",
            textAlign: "left",
          }}
        >
          🤝 Assistência Social (FAS / 156)
        </button>
 
        <button
          onClick={() => navigate("/painel")}
          style={{
            width: "100%",
            padding: "13px",
            backgroundColor: "#082C39",
            color: "#FFCC00",
            border: "2px solid #FFCC00",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "16px",
            textAlign: "left",
          }}
        >
          📊 Painel Central / Relatórios
        </button>
 
        <button
          onClick={handleSair}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#FFCC00",
            color: "black",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          SAIR DA CONTA
        </button>
      </div>
    </div>
  );
}