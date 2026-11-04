import { useNavigate } from "react-router-dom";

export default function SmartBusSobre() {
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
      <h1>ℹ️ Sobre o SmartBus</h1>

      <p>
        O SmartBus é uma plataforma de mobilidade inteligente
        desenvolvida para auxiliar usuários do transporte público.
      </p>

      <p>
        Recursos implementados:
      </p>

      <ul>
        <li>Login de usuários</li>
        <li>Cadastro de usuários</li>
        <li>Pesquisa de linhas</li>
        <li>Favoritos</li>
        <li>Ocorrências</li>
        <li>Assistência Social</li>
      </ul>

      <button
        onClick={() => navigate("/home")}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
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