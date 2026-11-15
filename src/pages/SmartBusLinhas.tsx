import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LinhaInfo {
  codigo: string;
  nome: string;
  categoria: string;
  corBadge: string;
  corTexto: string;
  trajeto: string;
  intervalo: string;
}

const LINHAS_CURITIBA: LinhaInfo[] = [
  {
    codigo: "303",
    nome: "Centenário / Campo Comprido",
    categoria: "Expresso",
    corBadge: "#DC2626",
    corTexto: "#FFFFFF",
    trajeto:
      "Terminal Centenário ↔ Praça Rui Barbosa ↔ Campina do Siqueira ↔ Campo Comprido",
    intervalo: "A cada 4 min",
  },
  {
    codigo: "022",
    nome: "Inter 2 — Sentido Hauer",
    categoria: "Linha Direta",
    corBadge: "#CBD5E1",
    corTexto: "#0F172A",
    trajeto:
      "Terminal Cabral → Campina do Siqueira → Santa Quitéria → Terminal Hauer",
    intervalo: "A cada 5 min",
  },
  {
    codigo: "023",
    nome: "Inter 2 — Sentido Capão da Imbuia",
    categoria: "Linha Direta",
    corBadge: "#CBD5E1",
    corTexto: "#0F172A",
    trajeto:
      "Terminal Hauer → Salgado Filho → Terminal Capão da Imbuia → Terminal Cabral",
    intervalo: "A cada 5 min",
  },
  {
    codigo: "020",
    nome: "Interbairros II (Sentido Horário)",
    categoria: "Interbairros",
    corBadge: "#16A34A",
    corTexto: "#FFFFFF",
    trajeto:
      "Cabral → Capão da Imbuia → Hauer → Portão → Campina do Siqueira",
    intervalo: "A cada 7 min",
  },
  {
    codigo: "021",
    nome: "Interbairros II (Sentido Anti-Horário)",
    categoria: "Interbairros",
    corBadge: "#16A34A",
    corTexto: "#FFFFFF",
    trajeto:
      "Cabral → Campina do Siqueira → Portão → Hauer → Capão da Imbuia",
    intervalo: "A cada 7 min",
  },
];

export default function SmartBusLinhas() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");

  const [favoritos, setFavoritos] = useState<string[]>(() => {
    try {
      const salvos = localStorage.getItem("smartbus_favoritos");
      return salvos ? JSON.parse(salvos) : [];
    } catch {
      return [];
    }
  });

  const linhasFiltradas = LINHAS_CURITIBA.filter(
    (linha) =>
      linha.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      linha.nome.toLowerCase().includes(busca.toLowerCase()) ||
      linha.trajeto.toLowerCase().includes(busca.toLowerCase())
  );

  const alternarFavorito = (descricaoLinha: string) => {
    const atualizados = favoritos.includes(descricaoLinha)
      ? favoritos.filter((item) => item !== descricaoLinha)
      : [...favoritos, descricaoLinha];

    setFavoritos(atualizados);
    localStorage.setItem(
      "smartbus_favoritos",
      JSON.stringify(atualizados)
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b2239",
        display: "flex",
        justifyContent: "center",
        padding: "12px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "16px",
          backgroundColor: "#0D3B4C",
          border: "4px solid #114d66",
          color: "#FFFFFF",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFCC00",
            color: "#000000",
            textAlign: "center",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "16px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.4rem" }}>
            🚌 Linhas de Ônibus
          </h1>
        </div>

        <input
          type="text"
          placeholder="Pesquisar por código, linha ou terminal..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "none",
            boxSizing: "border-box",
          }}
        />

        {linhasFiltradas.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#CBD5E1",
            }}
          >
            Nenhuma linha encontrada para "{busca}".
          </p>
        ) : (
          linhasFiltradas.map((linha) => {
            const tituloCompleto = `${linha.codigo} - ${linha.nome}`;
            const ehFavorito = favoritos.includes(tituloCompleto);

            return (
              <div
                key={linha.codigo}
                style={{
                  backgroundColor: "#1C6688",
                  borderLeft: `6px solid ${linha.corBadge}`,
                  padding: "12px",
                  marginBottom: "12px",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: linha.corBadge,
                      color: linha.corTexto,
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    {linha.codigo} • {linha.categoria}
                  </span>

                  <button
                    onClick={() => alternarFavorito(tituloCompleto)}
                    title="Favoritar linha"
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: "1.3rem",
                      cursor: "pointer",
                    }}
                  >
                    {ehFavorito ? "⭐" : "☆"}
                  </button>
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginBottom: "4px",
                  }}
                >
                  {linha.nome}
                </div>

                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#E2E8F0",
                    marginBottom: "8px",
                  }}
                >
                  {linha.trajeto}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.78rem",
                    color: "#FFCC00",
                  }}
                >
                  <span>🕒 {linha.intervalo}</span>

                  <button
                    onClick={() => navigate("/mapa")}
                    style={{
                      backgroundColor: "#082C39",
                      color: "#FFCC00",
                      border: "1px solid #FFCC00",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    📍 Ver no Mapa
                  </button>
                </div>
              </div>
            );
          })
        )}

        <button
          onClick={() => navigate("/home")}
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "12px",
            backgroundColor: "#FFCC00",
            color: "#000000",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          VOLTAR
        </button>
      </div>
    </div>
  );
}