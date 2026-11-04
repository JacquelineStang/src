import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SmartBusLinhas() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");

  const linhas = [
    "203 Santa Cândida",
    "505 Boqueirão",
    "550 Pinheirinho",
    "607 Colombo",
    "666 Interbairros"
  ];

  const linhasFiltradas = linhas.filter((linha) =>
    linha.toLowerCase().includes(busca.toLowerCase())
  );

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
      <h1>🚌 Linhas de Ônibus</h1>

      <input
        type="text"
        placeholder="Pesquisar linha..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: "95%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "none"
        }}
      />

      {linhasFiltradas.map((linha, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#1C6688",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px"
          }}
        >
          {linha}
        </div>
      ))}

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