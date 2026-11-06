import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { buscarLinhas, LinhaResumo } from "../services/smartBusApi";

export default function SmartBusLinhas() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [linhas, setLinhas] = useState<LinhaResumo[]>([
    { codigo: "203", nome: "Santa Cândida", categoria: "Expressa" },
    { codigo: "505", nome: "Boqueirão", categoria: "Expressa" },
    { codigo: "550", nome: "Pinheirinho", categoria: "Estrutural" },
    { codigo: "607", nome: "Colombo", categoria: "Metropolitana" },
    { codigo: "666", nome: "Interbairros", categoria: "Interbairros" },
  ]);

  useEffect(() => {
    buscarLinhas().then((dados) => {
      if (dados && dados.length > 0) {
        setLinhas(dados);
      }
    });
  }, []);

  const linhasFiltradas = linhas.filter((linha) =>
    `${linha.codigo} ${linha.nome}`.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#0D3B4C",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFCC00",
          color: "black",
          padding: "12px",
          borderRadius: "5px",
          marginBottom: "16px",
          textAlign: "center"
        }}
      >
        <h1 style={{ margin: "0 0 4px 0", fontSize: "22px" }}>🚌 Linhas de Ônibus</h1>
        <p style={{ margin: 0, fontSize: "12px", fontWeight: "bold" }}>
          Rede Integrada de Transporte (RIT)
        </p>
      </div>

      <input
        type="text"
        placeholder="Pesquisar linha por nome ou código..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: "94%",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "5px",
          border: "none",
          fontSize: "14px",
          outline: "none"
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {linhasFiltradas.map((linha) => (
          <div
            key={linha.codigo}
            style={{
              backgroundColor: "#1C6688",
              padding: "12px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <span style={{ fontWeight: "bold", color: "#FFCC00" }}>{linha.codigo}</span> — {linha.nome}
            </div>
            {linha.categoria && (
              <span
                style={{
                  fontSize: "11px",
                  backgroundColor: "#0D3B4C",
                  padding: "3px 8px",
                  borderRadius: "4px"
                }}
              >
                {linha.categoria}
              </span>
            )}
          </div>
        ))}
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
          cursor: "pointer",
        }}
      >
        VOLTAR
      </button>
    </div>
  );
}