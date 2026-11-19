import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface RegistroUnificado {
  id: number;
  origem: "Segurança / Ocorrência" | "Assistência Social (FAS)";
  protocolo: string;
  local: string;
  titulo: string;
  detalhes: string;
  horario: string;
  status: string;
}

export default function SmartBusPainel() {
  const navigate = useNavigate();
  const [registros, setRegistros] = useState<RegistroUnificado[]>([]);
  const [filtro, setFiltro] = useState<"TODOS" | "OCORRENCIAS" | "SOCIAL">("TODOS");

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarDados() {
    const listaUnificada: RegistroUnificado[] = [];

    const dadosSocial = localStorage.getItem("smartbus_assistencia");
    if (dadosSocial) {
      try {
        const parsedSocial = JSON.parse(dadosSocial);
        parsedSocial.forEach((item: any, idx: number) => {
          listaUnificada.push({
            id: item.id || Date.now() + idx,
            origem: "Assistência Social (FAS)",
            protocolo: item.protocolo || `FAS-2026-0${idx + 1}`,
            local: item.local || "Não informado",
            titulo: item.situacao || "Atendimento Social",
            detalhes: item.observacao || "",
            horario: item.horario || "Hoje",
            status: item.status || "Encaminhado",
          });
        });
      } catch (e) {
        console.error("Erro ao ler assistência:", e);
      }
    }

    const dadosOcorrencias =
      localStorage.getItem("smartbus_ocorrencias") ||
      localStorage.getItem("ocorrencias");

    if (dadosOcorrencias) {
      try {
        const parsedOc = JSON.parse(dadosOcorrencias);
        parsedOc.forEach((item: any, idx: number) => {
          listaUnificada.push({
            id: item.id || Date.now() + 1000 + idx,
            origem: "Segurança / Ocorrência",
            protocolo: item.protocolo || `OCO-2026-0${idx + 1}`,
            local: item.local || item.linha || "Rede Integrada Curitiba",
            titulo: item.tipo || item.categoria || "Ocorrência Registrada",
            detalhes: item.descricao || item.relato || item.observacao || "",
            horario: item.horario || item.data || "Hoje",
            status: item.status || "Em Análise",
          });
        });
      } catch (e) {
        console.error("Erro ao ler ocorrências:", e);
      }
    }
    setRegistros(listaUnificada);
  }

  function marcarComoConcluido(id: number, origem: string) {
    const atualizados = registros.map((reg) =>
      reg.id === id ? { ...reg, status: "Resolvido / Concluído" } : reg
    );
    setRegistros(atualizados);

    if (origem === "Assistência Social (FAS)") {
      const dadosSocial = localStorage.getItem("smartbus_assistencia");
      if (dadosSocial) {
        const parsed = JSON.parse(dadosSocial).map((item: any) =>
          item.id === id ? { ...item, status: "Resolvido / Concluído" } : item
        );
        localStorage.setItem("smartbus_assistencia", JSON.stringify(parsed));
      }
    } else {
      const chaveOc = localStorage.getItem("smartbus_ocorrencias")
        ? "smartbus_ocorrencias"
        : "ocorrencias";
      const dadosOc = localStorage.getItem(chaveOc);
      if (dadosOc) {
        const parsed = JSON.parse(dadosOc).map((item: any) =>
          item.id === id ? { ...item, status: "Resolvido / Concluído" } : item
        );
        localStorage.setItem(chaveOc, JSON.stringify(parsed));
      }
    }
  }

  function exportarRelatorioCSV() {
    if (registros.length === 0) {
      alert("Não há registros para exportar no momento.");
      return;
    }

    const cabecalho = "Protocolo;Modulo;Local/Linha;Situacao/Tipo;Detalhes;Horario;Status\n";
    const linhas = registros
      .map(
        (r) =>
          `"${r.protocolo}";"${r.origem}";"${r.local}";"${r.titulo}";"${r.detalhes.replace(/"/g, "'")}";"${r.horario}";"${r.status}"`
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + cabecalho + linhas], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Relatorio_Gestao_SmartBus.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const registrosFiltrados = registros.filter((r) => {
    if (filtro === "SOCIAL") return r.origem === "Assistência Social (FAS)";
    if (filtro === "OCORRENCIAS") return r.origem === "Segurança / Ocorrência";
    return true;
  });

  const totalSocial = registros.filter((r) => r.origem === "Assistência Social (FAS)").length;
  const totalOcorrencias = registros.filter((r) => r.origem === "Segurança / Ocorrência").length;

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
          maxWidth: "480px",
          padding: "16px",
          backgroundColor: "#0D3B4C",
          border: "4px solid #114d66",
          color: "white",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFCC00",
            color: "black",
            textAlign: "center",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "14px",
          }}
        >
          <h1 style={{ margin: "0 0 4px 0", fontSize: "1.3rem" }}>📊 Painel Central SmartBus</h1>
          <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
            Monitoramento Integrado • URBS & FAS Curitiba
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
          <div
            style={{
              flex: 1,
              backgroundColor: "#082C39",
              padding: "10px",
              borderRadius: "6px",
              textAlign: "center",
              border: "1px solid #1C6688",
            }}
          >
            <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#FFCC00" }}>
              {registros.length}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>Total Geral</div>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "#082C39",
              padding: "10px",
              borderRadius: "6px",
              textAlign: "center",
              border: "1px solid #1C6688",
            }}
          >
            <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#4ADE80" }}>
              {totalSocial}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>Ação Social</div>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "#082C39",
              padding: "10px",
              borderRadius: "6px",
              textAlign: "center",
              border: "1px solid #1C6688",
            }}
          >
            <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#F87171" }}>
              {totalOcorrencias}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>Ocorrências</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
          <button
            onClick={() => setFiltro("TODOS")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              fontSize: "0.78rem",
              cursor: "pointer",
              backgroundColor: filtro === "TODOS" ? "#FFCC00" : "#144E68",
              color: filtro === "TODOS" ? "black" : "white",
            }}
          >
            Todos ({registros.length})
          </button>
          <button
            onClick={() => setFiltro("SOCIAL")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              fontSize: "0.78rem",
              cursor: "pointer",
              backgroundColor: filtro === "SOCIAL" ? "#FFCC00" : "#144E68",
              color: filtro === "SOCIAL" ? "black" : "white",
            }}
          >
            Social ({totalSocial})
          </button>
          <button
            onClick={() => setFiltro("OCORRENCIAS")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              fontSize: "0.78rem",
              cursor: "pointer",
              backgroundColor: filtro === "OCORRENCIAS" ? "#FFCC00" : "#144E68",
              color: filtro === "OCORRENCIAS" ? "black" : "white",
            }}
          >
            Segurança ({totalOcorrencias})
          </button>
        </div>

        <button
          onClick={exportarRelatorioCSV}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#16A34A",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "0.85rem",
            cursor: "pointer",
            marginBottom: "14px",
          }}
        >
          📥 BAIXAR RELATÓRIO EM EXCEL (.CSV)
        </button>

        {registrosFiltrados.length === 0 ? (
          <div
            style={{
              backgroundColor: "#082C39",
              padding: "16px",
              borderRadius: "6px",
              textAlign: "center",
              fontSize: "0.85rem",
              color: "#cbd5e1",
              marginBottom: "14px",
            }}
          >
            Nenhum registro encontrado neste filtro.
          </div>
        ) : (
          registrosFiltrados.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#144E68",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                borderLeft:
                  item.origem === "Assistência Social (FAS)"
                    ? "4px solid #4ADE80"
                    : "4px solid #F87171",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.72rem",
                  fontWeight: "bold",
                  color: "#cbd5e1",
                  marginBottom: "4px",
                }}
              >
                <span>
                  {item.protocolo} • {item.origem}
                </span>
                <span
                  style={{
                    color: item.status.includes("Resolvido") ? "#4ADE80" : "#FFCC00",
                  }}
                >
                  {item.status}
                </span>
              </div>

              <div style={{ fontWeight: "bold", fontSize: "0.88rem" }}>📍 {item.local}</div>

              <div style={{ fontSize: "0.82rem", color: "#FFCC00", margin: "2px 0" }}>
                {item.titulo}
              </div>

              <div style={{ fontSize: "0.78rem", color: "#e2e8f0" }}>{item.detalhes}</div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <span style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>{item.horario}</span>

                {!item.status.includes("Resolvido") && (
                  <button
                    onClick={() => marcarComoConcluido(item.id, item.origem)}
                    style={{
                      padding: "4px 8px",
                      fontSize: "0.72rem",
                      backgroundColor: "#082C39",
                      color: "#4ADE80",
                      border: "1px solid #4ADE80",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    ✓ Marcar Concluído
                  </button>
                )}
              </div>
            </div>
          ))
        )}

        <button
          onClick={() => navigate("/home")}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "transparent",
            color: "#FFCC00",
            border: "1px solid #FFCC00",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "6px",
          }}
        >
          VOLTAR AO MENU PRINCIPAL
        </button>
      </div>
    </div>
  );
}