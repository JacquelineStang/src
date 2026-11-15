import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
 
interface SolicitaSocial {
  id: number;
  protocolo: string;
  local: string;
  situacao: string;
  observacao: string;
  horario: string;
  status: string;
}
 
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
 
const genAI = apiKey
  ? new GoogleGenerativeAI(apiKey)
  : null;
 
const REGISTROS_INICIAIS: SolicitaSocial[] = [
  {
    id: 1,
    protocolo: "FAS-2026-084",
    local: "Terminal Capão da Imbuia",
    situacao: "Pessoa em situação de rua solicitando abrigo / acolhimento",
    observacao:
      "Encaminhado à equipe de abordagem social da FAS Curitiba.",
    horario: "Hoje • 11:20",
    status: "Equipe Acionada",
  },
  {
    id: 2,
    protocolo: "FAS-2026-079",
    local: "Terminal Cabral",
    situacao: "Idoso desorientado na plataforma de embarque",
    observacao:
      "Acompanhado pelos agentes do terminal e assistência social.",
    horario: "Hoje • 09:45",
    status: "Atendido",
  },
];
 
export default function SmartBusAssistencia() {
  const navigate = useNavigate();
 
  const [local, setLocal] = useState(
    "Terminal Capão da Imbuia"
  );
 
  const [situacao, setSituacao] = useState(
    "Pessoa em situação de vulnerabilidade / abrigo"
  );
 
  const [observacao, setObservacao] = useState("");
  const [avisoEnvio, setAvisoEnvio] = useState("");
 
  const [solicitacoes, setSolicitacoes] =
    useState<SolicitaSocial[]>(() => {
      try {
        const salvas =
          typeof window !== "undefined"
            ? window.localStorage.getItem(
                "smartbus_assistencia"
              )
            : null;
 
        return salvas
          ? (JSON.parse(
              salvas
            ) as SolicitaSocial[])
          : REGISTROS_INICIAIS;
      } catch {
        return REGISTROS_INICIAIS;
      }
    });
 
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);
 
  function registrarAtendimentoSocial(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
 
    if (!observacao.trim()) {
      setAvisoEnvio(
        "Informe detalhes do local ou da pessoa para agilizar o atendimento."
      );
      return;
    }
 
    const agora = new Date().toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
 
    const numeroProtocolo =
      "FAS-2026-" +
      Math.floor(100 + Math.random() * 900);
 
    const novoRegistro: SolicitaSocial = {
      id: Date.now(),
      protocolo: numeroProtocolo,
      local,
      situacao,
      observacao: observacao.trim(),
      horario: `Hoje • ${agora}`,
      status: "Encaminhado (FAS / 156)",
    };
 
    const atualizados = [
      novoRegistro,
      ...solicitacoes,
    ];
 
    setSolicitacoes(atualizados);
 
    localStorage.setItem(
      "smartbus_assistencia",
      JSON.stringify(atualizados)
    );
 
    setObservacao("");
 
    setAvisoEnvio(
      `✅ Solicitação ${numeroProtocolo} enviada para a Assistência Social!`
    );
  }
 
  const respostaFallback = (texto: string) => {
    const perguntaLower = texto.toLowerCase();
 
    if (
      perguntaLower.includes("abrigo") ||
      perguntaLower.includes("rua") ||
      perguntaLower.includes("social") ||
      perguntaLower.includes("fas")
    ) {
      return (
        "Em Curitiba, o acolhimento social pode ser solicitado pelo formulário acima ou pela Central 156 da Fundação de Ação Social."
      );
    }
 
    if (
      perguntaLower.includes("horário") ||
      perguntaLower.includes("horario") ||
      perguntaLower.includes("linha")
    ) {
      return (
        "Você pode consultar horários atualizados das linhas diretamente na área de transporte do aplicativo ou acompanhar pelo mapa em tempo real."
      );
    }
 
    if (
      perguntaLower.includes("segurança") ||
      perguntaLower.includes("ocorrência") ||
      perguntaLower.includes("ocorrencia")
    ) {
      return (
        "Para ocorrências de segurança ou problemas em terminais, utilize o módulo de ocorrências do SmartBus."
      );
    }
 
    return (
      "Posso ajudar com dúvidas sobre assistência social, acolhimento, Central 156 e transporte público."
    );
  };
 
  const handlePerguntar = async () => {
    if (!pergunta.trim()) {
      return;
    }
 
    setCarregando(true);
    setResposta("");
 
    try {
      if (!genAI) {
        setResposta(
          respostaFallback(pergunta)
        );
        return;
      }
 
      const model =
        genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
 
      const result =
        await model.generateContent(
          `Você é o assistente do aplicativo SmartBus Social de Curitiba.
 
Responda de forma breve, clara, empática e útil.
 
Pergunta:
${pergunta}`
        );
 
      setResposta(
        result.response.text()
      );
    } catch (error) {
      console.error(
        "Erro ao consultar Gemini:",
        error
      );
 
      setResposta(
        respostaFallback(pergunta)
      );
    } finally {
      setCarregando(false);
    }
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
          color: "#fff",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFCC00",
            color: "#000",
            textAlign: "center",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "16px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1.35rem",
            }}
          >
            🤝 Assistência Social
          </h1>
 
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: "bold",
            }}
          >
            Canal Integrado Transporte • FAS Curitiba / Central 156
          </div>
        </div>
 
        <form
          onSubmit={
            registrarAtendimentoSocial
          }
        >
          {/* Todo o formulário permanece igual */}
        </form>
 
        {/* Lista de solicitações */}
 
        {solicitacoes.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#144E68",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              borderLeft:
                "4px solid #4ADE80",
            }}
          >
            <div>
              <strong>
                Protocolo:
              </strong>{" "}
              {item.protocolo}
            </div>
 
            <div>
              📍 {item.local}
            </div>
 
            <div>
              {item.situacao}
            </div>
 
            <div>
              {item.observacao}
            </div>
 
            <div>
              {item.horario}
            </div>
 
            <div>
              {item.status}
            </div>
          </div>
        ))}
 
        <div
          style={{
            backgroundColor: "#082C39",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "14px",
            border: "1px solid #1C6688",
          }}
        >
          <h2
            style={{
              fontSize: "0.9rem",
              color: "#FFCC00",
            }}
          >
            💬 Orientação Rápida SmartBus
          </h2>
 
          <textarea
            rows={2}
            value={pergunta}
            onChange={(e) =>
              setPergunta(
                e.target.value
              )
            }
            placeholder="Dúvidas sobre acolhimento social, Central 156 ou linhas..."
            style={{
              width: "100%",
              padding: "9px",
              borderRadius: "5px",
              border: "none",
            }}
          />
 
          <button
            type="button"
            onClick={handlePerguntar}
            disabled={carregando}
          >
            {carregando
              ? "Consultando..."
              : "Perguntar ao Assistente"}
          </button>
 
          {resposta && (
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor:
                  "#144E68",
                borderLeft:
                  "4px solid #FFCC00",
                borderRadius: "5px",
              }}
            >
              {resposta}
            </div>
          )}
        </div>

        <button
          onClick={() =>
            navigate("/home")
          }
          style={{
            marginTop: "14px",
            width: "100%",
            padding: "12px",
            backgroundColor: "#FFCC00",
            color: "#000",
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