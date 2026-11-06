export interface CuritibaTerminal {
  id: string;
  codigo: string;
  nome: string;
  endereco: string;
  lat: number;
  lng: number;
  linhasIntegradas: string[];
  acessibilidade: boolean;
  horarioFuncionamento: string;
  iconeSinalizacao: string; // Ex: 🚏, 🛑, 🚩, 🚦, 📍
  corSinalizacao: string; // Hex da cor temática da linha/canaleta
  tipoTerminal: string;
  plataformas: number;
  statusOperacao: 'Operação Normal' | 'Trânsito Intenso' | 'Embarque Rápido';
  tempoMedioEsperaMin: number;
}

export const TERMINAIS_CURITIBA: CuritibaTerminal[] = [
  {
    id: "term-cabral",
    codigo: "TCAB",
    nome: "Terminal Cabral",
    endereco: "Av. Pref. Erasto Gaertner / Av. Paraná — Cabral",
    lat: -25.4056,
    lng: -49.2528,
    linhasIntegradas: ["203 Santa Cândida", "607 Colombo", "020 Interbairros II", "205 Barreirinha"],
    acessibilidade: true,
    horarioFuncionamento: "05:00 - 00:30",
    iconeSinalizacao: "🚏",
    corSinalizacao: "#DC2626", // Vermelho Expresso Canaleta Norte
    tipoTerminal: "Terminal Integrado Norte",
    plataformas: 6,
    statusOperacao: "Operação Normal",
    tempoMedioEsperaMin: 4
  },
  {
    id: "term-boqueirao",
    codigo: "TBOQ",
    nome: "Terminal Boqueirão",
    endereco: "Av. Marechal Floriano Peixoto, 10200 — Boqueirão",
    lat: -25.5028,
    lng: -49.2394,
    linhasIntegradas: ["505 Boqueirão", "550 Pinheirinho/Boqueirão", "502 Circular Sul", "507 Sítio Cercado"],
    acessibilidade: true,
    horarioFuncionamento: "04:50 - 01:00",
    iconeSinalizacao: "🛑",
    corSinalizacao: "#E11D48", // Rosa/Vermelho Expresso Sul
    tipoTerminal: "Terminal Integrado Sul/Leste",
    plataformas: 8,
    statusOperacao: "Operação Normal",
    tempoMedioEsperaMin: 3
  },
  {
    id: "term-pinheirinho",
    codigo: "TPIN",
    nome: "Terminal Pinheirinho",
    endereco: "Av. Winston Churchill, s/n — Pinheirinho",
    lat: -25.5126,
    lng: -49.2952,
    linhasIntegradas: ["550 Pinheirinho", "602 Circular Sul", "666 Interbairros", "603 Santa Cândida/Capão Raso"],
    acessibilidade: true,
    horarioFuncionamento: "05:00 - 00:45",
    iconeSinalizacao: "🚩",
    corSinalizacao: "#2563EB", // Azul Ligeirinho Conexão Sul
    tipoTerminal: "Terminal Intermodal Sul",
    plataformas: 10,
    statusOperacao: "Embarque Rápido",
    tempoMedioEsperaMin: 5
  },
  {
    id: "term-cic",
    codigo: "TCIC",
    nome: "Terminal CIC",
    endereco: "Rua Pedro Gusso, s/n — Cidade Industrial",
    lat: -25.5042,
    lng: -49.3331,
    linhasIntegradas: ["607 Colombo/CIC", "040 Inter 2", "Interbairros IV", "619 Santa Rita/CIC"],
    acessibilidade: true,
    horarioFuncionamento: "05:10 - 00:30",
    iconeSinalizacao: "🚦",
    corSinalizacao: "#16A34A", // Verde Alimentador / Interbairros
    tipoTerminal: "Terminal Integrado Oeste Industrial",
    plataformas: 6,
    statusOperacao: "Operação Normal",
    tempoMedioEsperaMin: 6
  },
  {
    id: "term-santa-candida",
    codigo: "TSCA",
    nome: "Terminal Santa Cândida",
    endereco: "Av. Paraná, 4800 — Santa Cândida",
    lat: -25.3785,
    lng: -49.2274,
    linhasIntegradas: ["203 Santa Cândida", "200 Ligeirão Norte/Sul", "Colombo / Maracanã"],
    acessibilidade: true,
    horarioFuncionamento: "05:00 - 00:30",
    iconeSinalizacao: "📍",
    corSinalizacao: "#9333EA", // Roxo Metropolitano
    tipoTerminal: "Terminal Extremo Norte",
    plataformas: 6,
    statusOperacao: "Operação Normal",
    tempoMedioEsperaMin: 5
  },
  {
    id: "term-portao",
    codigo: "TPOR",
    nome: "Terminal Portão",
    endereco: "Av. República Argentina, 2900 — Portão",
    lat: -25.4746,
    lng: -49.2942,
    linhasIntegradas: ["203 Santa Cândida / Capão Raso", "021 Interbairros II", "611 Fazendinha"],
    acessibilidade: true,
    horarioFuncionamento: "05:00 - 00:30",
    iconeSinalizacao: "🚏",
    corSinalizacao: "#D97706", // Âmbar Eixo Sudoeste
    tipoTerminal: "Terminal Eixo Sudoeste",
    plataformas: 7,
    statusOperacao: "Embarque Rápido",
    tempoMedioEsperaMin: 4
  },
  {
    id: "term-centro-rui-barbosa",
    codigo: "PRUI",
    nome: "Praça Rui Barbosa (Centro Central)",
    endereco: "Praça Rui Barbosa, s/n — Centro de Curitiba",
    lat: -25.4358,
    lng: -49.2736,
    linhasIntegradas: ["Linha Turismo", "Centro Cívico", "Alimentadores Centrais", "Tubos Biarticulados"],
    acessibilidade: true,
    horarioFuncionamento: "24 Horas",
    iconeSinalizacao: "⭐",
    corSinalizacao: "#FFCC00", // Amarelo Transporte
    tipoTerminal: "Hub Central Metropolitano",
    plataformas: 12,
    statusOperacao: "Operação Normal",
    tempoMedioEsperaMin: 2
  }
];

export interface MapCoordinates {
  lat: number;
  lng: number;
}

export const CENTRO_CURITIBA: MapCoordinates = {
  lat: -25.4358,
  lng: -49.2736
};

export function getGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function getTerminalRouteUrl(origem: MapCoordinates, destino: MapCoordinates): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${origem.lat},${origem.lng}&destination=${destino.lat},${destino.lng}&travelmode=transit`;
}
