import { HashRouter, Routes, Route } from "react-router-dom";
import SmartBusAcesso from "./pages/SmartBusAcesso";
import SmartBusCadastro from "./pages/SmartBusCadastro";
import SmartBusHome from "./pages/SmartBusHome";
import SmartBusLinhas from "./pages/SmartBusLinhas";
import SmartBusMapa from "./pages/SmartBusMapa";
import SmartBusFavoritos from "./pages/SmartBusFavoritos";
import SmartBusOcorrencias from "./pages/SmartBusOcorrencias";
import SmartBusAssistencia from "./pages/SmartBusAssistencia";
 
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SmartBusAcesso />} />
        <Route path="/login" element={<SmartBusAcesso />} />
        <Route path="/acesso" element={<SmartBusAcesso />} />
        <Route path="/cadastro" element={<SmartBusCadastro />} />
        <Route path="/home" element={<SmartBusHome />} />
        <Route path="/linhas" element={<SmartBusLinhas />} />
        <Route path="/mapa" element={<SmartBusMapa />} />
        <Route path="/favoritos" element={<SmartBusFavoritos />} />
        <Route path="/ocorrencias" element={<SmartBusOcorrencias />} />
        <Route path="/assistencia" element={<SmartBusAssistencia />} />
        <Route path="*" element={<SmartBusAcesso />} />
      </Routes>
    </HashRouter>
  );
}