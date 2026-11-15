import { useNavigate } from "react-router-dom";
import { useState } from "react";
 
interface RegistroOcorrencia {
  id: number;
  tipo: string;
  local: string;
  descricao: string;
  horario: string;
  status: string;
}
 
const ALERTAS_INICIAIS: RegistroOcorrencia[] = [
  {
    id: 1,
    tipo: "🚦 Trânsito / Atraso",
    local: "Terminal Capão da Imbuia — Linha 023 Inter 2",
    descricao: "Fluxo intenso na Av. Presidente Affonso Camargo; intervalo +4 min.",
    horario: "Hoje • Ativo",
    status: "Monitorado",
  },
  {
    id: 2,
    tipo: "🚧 Alteração de Via",
    local: "Corredor Centenário / Campo Comprido — Linha 303",
    descricao: "Obras de manutenção próximas à Estação Tubo Cristo Rei.",
    horario: "Hoje • Ativo",
    status: "Em andamento",
  },
  {
    id: 3,
    tipo: "🛡️ Segurança",
    local: "Terminal Boqueirão",
    descricao: "Ronda preventiva da Guarda Municipal reforçada na plataforma central.",
    horario: "Hoje • Ativo",
    status: "Verificado",
  },
  {
    id: 4,
    tipo: "🚌 Operação Normal",
    local: "Linhas 020 e 021 — Interbairros II",
    descricao: "Circulação regular nos sentidos Horário e Anti-Horário.",
    horario: "Hoje • Ativo",
    status: "Normal",
  },
];
 
export default function SmartBusOcorrencias() {
  const navigate = useNavigate();
 
  const [tipo, setTipo] = useState("🛡️ Segurança");
  const [local, setLocal] = useState("Terminal Capão da Imbuia");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");
 
  const [ocorrencias, setOcorrencias] = useState<RegistroOcorrencia[]>(() => {
    const salvas = localStorage.getItem("smartbus_ocorrencias");
    return salvas ? JSON.parse(salvas) : ALERTAS_INICIAIS;
  });
 
  function registrarOcorrencia(e: React.FormEvent) {
    e.preventDefault();
    if (!descricao.trim()) {
      setMensagem("Descreva brevemente a ocorrência antes de enviar.");
      return;
    }
 
    const agora = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
 
    const nova: RegistroOcorrencia = {
      id: Date.now(),
      tipo,
      local,
      descricao: descricao.trim(),
      horario: `Registrado às ${agora}`,
      status: "Encaminhado à Gestão",
    };
 
    const atualizadas = [nova, ...ocorrencias];
    setOcorrencias(atualizadas);
    localStorage.setItem("smartbus_ocorrencias", JSON.stringify(atualizadas));
    setDescricao("");
    setMensagem("✅ Ocorrência registrada e encaminhada com sucesso!");
  }
 
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
            marginBottom: "16px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.4rem" }}>⚠️ Segurança e Ocorrências</h1>
        </div>
 
        {/* Formulário de Registro de Ocorrência */}
        <form
          onSubmit={registrarOcorrencia}
          style={{
            backgroundColor: "#082C39",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #1C6688",
          }}
        >
          <h2 style={{ fontSize: "0.95rem", color: "#FFCC00", margin: "0 0 10px 0" }}>
            📝 Registrar Nova Ocorrência
          </h2>
 
          <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "4px" }}>
            Categoria:
          </label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{
              width: "100%",
              padding: "9px",
              borderRadius: "5px",
              border: "none",
              marginBottom: "8px",
              boxSizing: "border-box",
            }}
          >
            <option value="🛡️ Segurança">🛡️ Segurança no Ônibus / Terminal</option>
            <option value="🚦 Atraso / Superlotação">🚦 Atraso ou Superlotação</option>
            <option value="🚧 Problema na Via / Ponto">🚧 Problema na Via ou Estação-Tubo</option>
          </select>
 
          <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "4px" }}>
            Localização / Linha:
          </label>
          <select
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            style={{
              width: "100%",
              padding: "9px",
              borderRadius: "5px",
              border: "none",
              marginBottom: "8px",
              boxSizing: "border-box",
            }}
          >
            <option value="Terminal Capão da Imbuia">Terminal Capão da Imbuia</option>
            <option value="Terminal Cabral">Terminal Cabral</option>
            <option value="Terminal Boqueirão">Terminal Boqueirão</option>
            <option value="Terminal Pinheirinho">Terminal Pinheirinho</option>
            <option value="Terminal CIC">Terminal CIC</option>
            <option value="Linha 303 — Centenário / Campo Comprido">
              Linha 303 — Centenário / Campo Comprido
            </option>
            <option value="Linha 022 / 023 — Inter 2">Linha 022 / 023 — Inter 2</option>
            <option value="Linha 020 / 021 — Interbairros II">
              Linha 020 / 021 — Interbairros II
            </option>
          </select>
 
          <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "4px" }}>
            Relato da situação:
          </label>
          <textarea
            rows={2}
            placeholder="Descreva o ocorrido no ônibus ou terminal..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{
              width: "100%",
              padding: "9px",
              borderRadius: "5px",
              border: "none",
              marginBottom: "8px",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
 
          {mensagem && (
            <div
              style={{
                fontSize: "0.8rem",
                color: "#4ADE80",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              {mensagem}
            </div>
          )}
 
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#1C6688",
              color: "white",
              border: "1px solid #FFCC00",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ENVIAR OCORRÊNCIA
          </button>
        </form>
 
        {/* Histórico e Alertas Inteligentes */}
        <h2 style={{ fontSize: "0.95rem", color: "#FFCC00", margin: "0 0 10px 0" }}>
          📋 Alertas Ativos e Histórico de Registros
        </h2>
 
        {ocorrencias.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#144E68",
              padding: "11px",
              marginBottom: "10px",
              borderRadius: "6px",
              borderLeft: "4px solid #FFCC00",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.78rem",
                color: "#FFCC00",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              <span>{item.tipo}</span>
              <span>{item.status}</span>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "0.9rem", marginBottom: "3px" }}>
              📍 {item.local}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#e2e8f0", marginBottom: "4px" }}>
              {item.descricao}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>{item.horario}</div>
          </div>
        ))}
 
        <button
          onClick={() => navigate("/home")}
          style={{
            marginTop: "12px",
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
          VOLTAR
        </button>
      </div>
    </div>
  );
}