import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  InfoWindow
} from "@vis.gl/react-google-maps";
import {
  TERMINAIS_CURITIBA,
  CENTRO_CURITIBA,
  CuritibaTerminal,
  getGoogleMapsUrl
} from "../services/mapsService";

export default function SmartBusMapa() {
  const navigate = useNavigate();

  const [selectedTerminal, setSelectedTerminal] = useState<CuritibaTerminal | null>(
    TERMINAIS_CURITIBA[0]
  );
  const [filtroTexto, setFiltroTexto] = useState("");
  const [mapCenter, setMapCenter] = useState(CENTRO_CURITIBA);
  const [mapZoom, setMapZoom] = useState(12);

  const googleMapsApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || "";

  const terminaisFiltrados = TERMINAIS_CURITIBA.filter((t) =>
    `${t.nome} ${t.codigo} ${t.linhasIntegradas.join(" ")}`
      .toLowerCase()
      .includes(filtroTexto.toLowerCase())
  );

  const handleSelectTerminal = (term: CuritibaTerminal) => {
    setSelectedTerminal(term);
    setMapCenter({ lat: term.lat, lng: term.lng });
    setMapZoom(14);
  };

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "16px auto",
        padding: "16px",
        backgroundColor: "#0D3B4C",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          backgroundColor: "#FFCC00",
          color: "#0F172A",
          padding: "14px",
          borderRadius: "8px",
          marginBottom: "16px",
          textAlign: "center"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span style={{ fontSize: "28px" }}>📍</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "800" }}>
              Mapa de Curitiba — RIT
            </h1>
            <p style={{ margin: 0, fontSize: "12px", fontWeight: "600" }}>
              Monitoramento & Sinalização Oficial de Terminais
            </p>
          </div>
        </div>
      </div>

      {/* Seletor de Busca Rápida */}
      <div style={{ marginBottom: "14px" }}>
        <input
          type="text"
          placeholder="Filtrar terminal ou linha (ex: Cabral, 203, Boqueirão)..."
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          style={{
            width: "95%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #1C6688",
            backgroundColor: "#082C39",
            color: "white",
            fontSize: "13px",
            outline: "none"
          }}
        />
      </div>

      {/* Visualização do Mapa */}
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "2px solid #1C6688",
          backgroundColor: "#082C39",
          marginBottom: "16px",
          position: "relative"
        }}
      >
        {googleMapsApiKey ? (
          <div style={{ height: "320px", width: "100%", position: "relative" }}>
            <APIProvider apiKey={googleMapsApiKey} libraries={["marker"]}>
              <GoogleMap
                mapId="DEMO_MAP_ID"
                center={mapCenter}
                zoom={mapZoom}
                gestureHandling="greedy"
                disableDefaultUI={false}
                style={{ width: "100%", height: "100%" }}
                internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
              >
                {TERMINAIS_CURITIBA.map((terminal) => (
                  <AdvancedMarker
                    key={terminal.id}
                    position={{ lat: terminal.lat, lng: terminal.lng }}
                    title={terminal.nome}
                    onClick={() => setSelectedTerminal(terminal)}
                  >
                    <div
                      style={{
                        backgroundColor: terminal.corSinalizacao,
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "16px",
                        border: "2px solid white",
                        fontSize: "12px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                        cursor: "pointer",
                        transform:
                          selectedTerminal?.id === terminal.id ? "scale(1.15)" : "scale(1)",
                        transition: "transform 0.2s ease"
                      }}
                    >
                      <span>{terminal.iconeSinalizacao}</span>
                      <span>{terminal.codigo}</span>
                    </div>
                  </AdvancedMarker>
                ))}

                {selectedTerminal && (
                  <InfoWindow
                    position={{ lat: selectedTerminal.lat, lng: selectedTerminal.lng }}
                    onCloseClick={() => setSelectedTerminal(null)}
                  >
                    <div style={{ color: "#0F172A", padding: "4px", maxWidth: "220px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "18px" }}>
                          {selectedTerminal.iconeSinalizacao}
                        </span>
                        <strong style={{ fontSize: "14px" }}>{selectedTerminal.nome}</strong>
                      </div>
                      <p style={{ margin: "4px 0", fontSize: "11px", color: "#475569" }}>
                        {selectedTerminal.endereco}
                      </p>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: selectedTerminal.corSinalizacao,
                          marginBottom: "4px"
                        }}
                      >
                        ⏱️ Espera média: ~{selectedTerminal.tempoMedioEsperaMin} min
                      </div>
                      <a
                        href={getGoogleMapsUrl(selectedTerminal.lat, selectedTerminal.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "4px",
                          fontSize: "11px",
                          backgroundColor: "#0D3B4C",
                          color: "#FFCC00",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          textDecoration: "none",
                          fontWeight: "bold"
                        }}
                      >
                        🗺️ Traçar Rota Externa
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </APIProvider>
          </div>
        ) : (
          /* Visualizador Interativo SVG dos Eixos e Terminais de Curitiba */
          <div style={{ padding: "12px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px"
              }}
            >
              <span style={{ fontSize: "12px", color: "#FFCC00", fontWeight: "bold" }}>
                🗺️ Mapa Esquema dos Eixos Estruturais de Curitiba
              </span>
              <button
                onClick={() => {
                  setMapCenter(CENTRO_CURITIBA);
                  setSelectedTerminal(TERMINAIS_CURITIBA[0]);
                }}
                style={{
                  backgroundColor: "#1C6688",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  cursor: "pointer"
                }}
              >
                Resetar Foco
              </button>
            </div>

            <svg
              viewBox="0 0 400 320"
              style={{
                width: "100%",
                height: "260px",
                backgroundColor: "#061F28",
                borderRadius: "8px"
              }}
            >
              {/* Malha de coordenadas e limites urbanos */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0D3B4C" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="320" fill="url(#grid)" />

              {/* Canaletas Estruturais (Norte-Sul, Leste-Oeste, Boqueirão, Circular) */}
              {/* Eixo Norte (Santa Cândida -> Cabral -> Centro) */}
              <line x1="200" y1="30" x2="200" y2="150" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
              {/* Eixo Sul (Centro -> Portão -> Pinheirinho) */}
              <line x1="200" y1="150" x2="160" y2="280" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
              {/* Eixo Sudeste (Centro -> Boqueirão) */}
              <line x1="200" y1="150" x2="290" y2="270" stroke="#E11D48" strokeWidth="6" strokeLinecap="round" />
              {/* Eixo Oeste (Centro -> CIC) */}
              <line x1="200" y1="150" x2="70" y2="260" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
              {/* Anel Interbairros / Conexões */}
              <ellipse cx="200" cy="165" rx="140" ry="110" fill="none" stroke="#FFCC00" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

              {/* Centro de Curitiba (Praça Rui Barbosa) */}
              <circle cx="200" cy="150" r="14" fill="#FFCC00" stroke="#0F172A" strokeWidth="3" />
              <text x="200" y="154" fontSize="11" textAnchor="middle" fill="#000" fontWeight="bold">⭐</text>
              <text x="200" y="174" fontSize="10" textAnchor="middle" fill="#FFCC00" fontWeight="bold">Centro (Rui Barbosa)</text>

              {/* Terminais e Ícones de Sinalização Plotados */}
              {/* Terminal Santa Cândida */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedTerminal(TERMINAIS_CURITIBA[4])}
              >
                <circle cx="200" cy="40" r="12" fill="#9333EA" stroke="white" strokeWidth="2" />
                <text x="200" y="44" fontSize="10" textAnchor="middle">📍</text>
                <text x="218" y="44" fontSize="10" fill="white" fontWeight="bold">T. Sta Cândida</text>
              </g>

              {/* Terminal Cabral */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedTerminal(TERMINAIS_CURITIBA[0])}
              >
                <circle cx="200" cy="90" r="12" fill="#DC2626" stroke="white" strokeWidth="2" />
                <text x="200" y="94" fontSize="10" textAnchor="middle">🚏</text>
                <text x="218" y="94" fontSize="10" fill="#FFCC00" fontWeight="bold">T. Cabral</text>
              </g>

              {/* Terminal Portão */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedTerminal(TERMINAIS_CURITIBA[5])}
              >
                <circle cx="175" cy="220" r="12" fill="#D97706" stroke="white" strokeWidth="2" />
                <text x="175" y="224" fontSize="10" textAnchor="middle">🚏</text>
                <text x="120" y="224" fontSize="10" fill="white" fontWeight="bold">T. Portão</text>
              </g>

              {/* Terminal Pinheirinho */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedTerminal(TERMINAIS_CURITIBA[2])}
              >
                <circle cx="160" cy="280" r="12" fill="#2563EB" stroke="white" strokeWidth="2" />
                <text x="160" y="284" fontSize="10" textAnchor="middle">🚩</text>
                <text x="160" y="302" fontSize="10" textAnchor="middle" fill="#93C5FD" fontWeight="bold">T. Pinheirinho</text>
              </g>

              {/* Terminal Boqueirão */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedTerminal(TERMINAIS_CURITIBA[1])}
              >
                <circle cx="290" cy="270" r="12" fill="#E11D48" stroke="white" strokeWidth="2" />
                <text x="290" y="274" fontSize="10" textAnchor="middle">🛑</text>
                <text x="290" y="292" fontSize="10" textAnchor="middle" fill="#FDA4AF" fontWeight="bold">T. Boqueirão</text>
              </g>

              {/* Terminal CIC */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedTerminal(TERMINAIS_CURITIBA[3])}
              >
                <circle cx="70" cy="260" r="12" fill="#16A34A" stroke="white" strokeWidth="2" />
                <text x="70" y="264" fontSize="10" textAnchor="middle">🚦</text>
                <text x="70" y="280" fontSize="10" textAnchor="middle" fill="#86EFAC" fontWeight="bold">T. CIC</text>
              </g>

              {/* Indicador de Seleção Ativa no Mapa */}
              {selectedTerminal && (
                <text x="200" y="18" fontSize="11" textAnchor="middle" fill="#A7F3D0" fontWeight="bold">
                  Sinalização ativa: {selectedTerminal.iconeSinalizacao} {selectedTerminal.nome}
                </text>
              )}
            </svg>
          </div>
        )}
      </div>

      {/* Terminal em Destaque / Sinalização Selecionada */}
      {selectedTerminal && (
        <div
          style={{
            backgroundColor: "#1C6688",
            border: `2px solid ${selectedTerminal.corSinalizacao}`,
            borderRadius: "8px",
            padding: "14px",
            marginBottom: "16px",
            position: "relative"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "24px",
                  backgroundColor: "#0D3B4C",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  border: `1px solid ${selectedTerminal.corSinalizacao}`
                }}
              >
                {selectedTerminal.iconeSinalizacao}
              </span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      backgroundColor: selectedTerminal.corSinalizacao,
                      color: "white",
                      fontSize: "10px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontWeight: "bold"
                    }}
                  >
                    {selectedTerminal.codigo}
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {selectedTerminal.nome}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#E0F2FE", marginTop: "2px" }}>
                  {selectedTerminal.endereco}
                </div>
              </div>
            </div>

            {selectedTerminal.acessibilidade && (
              <span
                style={{
                  backgroundColor: "#16A34A",
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "12px",
                  fontWeight: "bold"
                }}
              >
                ♿ 100% PCD
              </span>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              marginTop: "12px",
              paddingTop: "10px",
              borderTop: "1px solid rgba(255,255,255,0.15)"
            }}
          >
            <div style={{ fontSize: "12px" }}>
              <span style={{ color: "#94A3B8" }}>Status: </span>
              <strong style={{ color: "#86EFAC" }}>{selectedTerminal.statusOperacao}</strong>
            </div>
            <div style={{ fontSize: "12px" }}>
              <span style={{ color: "#94A3B8" }}>Espera média: </span>
              <strong style={{ color: "#FFCC00" }}>
                ~{selectedTerminal.tempoMedioEsperaMin} min
              </strong>
            </div>
            <div style={{ fontSize: "12px" }}>
              <span style={{ color: "#94A3B8" }}>Plataformas: </span>
              <strong>{selectedTerminal.plataformas} tubos/baías</strong>
            </div>
            <div style={{ fontSize: "12px" }}>
              <span style={{ color: "#94A3B8" }}>Horário: </span>
              <strong>{selectedTerminal.horarioFuncionamento}</strong>
            </div>
          </div>

          <div style={{ marginTop: "10px", fontSize: "12px" }}>
            <span style={{ color: "#94A3B8" }}>Linhas Integradas: </span>
            <span style={{ color: "#F1F5F9" }}>
              {selectedTerminal.linhasIntegradas.join(" · ")}
            </span>
          </div>

          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            <a
              href={getGoogleMapsUrl(selectedTerminal.lat, selectedTerminal.lng)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px",
                backgroundColor: "#FFCC00",
                color: "#0F172A",
                borderRadius: "5px",
                fontSize: "12px",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              🗺️ Ver no Google Maps Oficial
            </a>
          </div>
        </div>
      )}

      {/* Referência e Sinalização dos Terminais */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}
        >
          <h2 style={{ fontSize: "15px", margin: 0, color: "#FFCC00" }}>
            🚩 Referência de Sinalização dos Terminais
          </h2>
          <span style={{ fontSize: "11px", color: "#94A3B8" }}>
            {terminaisFiltrados.length} terminais ativos
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {terminaisFiltrados.map((terminal) => {
            const isSelected = selectedTerminal?.id === terminal.id;
            return (
              <div
                key={terminal.id}
                onClick={() => handleSelectTerminal(terminal)}
                style={{
                  backgroundColor: isSelected ? "#154D66" : "#1C6688",
                  border: isSelected
                    ? `2px solid #FFCC00`
                    : `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: "6px",
                  padding: "10px 12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "background-color 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Ícone de sinalização com cor de canaleta */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "18px",
                      backgroundColor: terminal.corSinalizacao,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                    }}
                  >
                    {terminal.iconeSinalizacao}
                  </div>

                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {terminal.nome}
                    </div>
                    <div style={{ fontSize: "11px", color: "#CBD5E1" }}>
                      {terminal.tipoTerminal} · {terminal.linhasIntegradas.length} linhas
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "#0D3B4C",
                      padding: "3px 6px",
                      borderRadius: "4px",
                      color: "#FFCC00",
                      fontWeight: "bold"
                    }}
                  >
                    {terminal.codigo}
                  </span>
                  <div style={{ fontSize: "11px", color: "#86EFAC", marginTop: "3px" }}>
                    ~{terminal.tempoMedioEsperaMin} min
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botão de Retorno */}
      <button
        onClick={() => navigate("/home")}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#FFCC00",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          fontSize: "15px",
          cursor: "pointer",
          color: "#0F172A"
        }}
      >
        VOLTAR AO MENU PRINCIPAL
      </button>
    </div>
  );
}