import { BrowserRouter, Routes, Route } from "react-router-dom";

import SmartBusAcesso from "./pages/SmartBusAcesso";
import SmartBusCadastro from "./pages/SmartBusCadastro";
import SmartBusHome from "./pages/SmartBusHome";
import SmartBusLinhas from "./pages/SmartBusLinhas";
import SmartBusMapa from "./pages/SmartBusMapa";
import SmartBusFavoritos from "./pages/SmartBusFavoritos";
import SmartBusOcorrencias from "./pages/SmartBusOcorrencias";
import SmartBusAssistencia from "./pages/SmartBusAssistencia";
import SmartBusMonitoramento from "./pages/SmartBusMonitoramento";
import SmartBusSobre from "./pages/SmartBusSobre";

import { useState, useEffect } from "react";

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  return (
    <BrowserRouter>
      {quotaExceeded && (
        <div style={{ backgroundColor: "#FEF3C7", borderBottom: "1px solid #FDE68A", color: "#78350F", padding: "8px 12px", fontSize: "13px", textAlign: "center", position: "sticky", top: 0, zIndex: 50 }}>
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold", textDecoration: "underline", color: "#451A03" }}
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}
      <Routes>
        <Route path="/" element={<SmartBusAcesso />} />
        <Route path="/cadastro" element={<SmartBusCadastro />} />
        <Route path="/home" element={<SmartBusHome />} />
        <Route path="/linhas" element={<SmartBusLinhas />} />
        <Route path="/mapa" element={<SmartBusMapa />} />
        <Route path="/favoritos" element={<SmartBusFavoritos />} />
        <Route path="/ocorrencias" element={<SmartBusOcorrencias />} />
        <Route path="/assistencia" element={<SmartBusAssistencia />} />
        <Route path="/monitoramento" element={<SmartBusMonitoramento />} />
        <Route path="/sobre" element={<SmartBusSobre />} />
      </Routes>
    </BrowserRouter>
  );
}