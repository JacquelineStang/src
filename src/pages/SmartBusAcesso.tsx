import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SmartBusAcesso() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#0D3B4C",
        border: "4px solid #114d66",
        borderRadius: "10px",
        color: "white"
      }}
    >
      <div
        style={{
          backgroundColor: "#FFCC00",
          color: "black",
          textAlign: "center",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px"
        }}
      >
        <h1>🚌 SmartBus</h1>
        <h2>Mobilidade Inteligente</h2>
      </div>

      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "95%",
          padding: "12px",
          borderRadius: "5px",
          border: "none",
          marginBottom: "15px"
        }}
      />

      <input
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{
          width: "95%",
          padding: "12px",
          borderRadius: "5px",
          border: "none",
          marginBottom: "15px"
        }}
      />

      <button
        onClick={entrar}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#FFCC00",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        ENTRAR
      </button>

      <br />
      <br />

      <button
        onClick={() => navigate("/cadastro")}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#1C6688",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        CADASTRE-SE
      </button>
    </div>
  );
}