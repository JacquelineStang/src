import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SmartBusCadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("jacquelinekoas@yahoo.com.br");
  const [senha, setSenha] = useState("");

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
        <h1>Cadastro SmartBus</h1>
      </div>

      <input
        type="text"
        placeholder="Nome Completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{
          width: "95%",
          padding: "12px",
          marginBottom: "15px"
        }}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "95%",
          padding: "12px",
          marginBottom: "15px"
        }}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{
          width: "95%",
          padding: "12px",
          marginBottom: "15px"
        }}
      />

      <button
        onClick={() => navigate("/")}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#FFCC00",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold"
        }}
      >
        SALVAR CADASTRO
      </button>
    </div>
  );
}