export interface BusStop {
  id: string;
  nome: string;
  referencia: string;
  etaMin: number;
  acessivel: boolean;
  abrigoCoberto: boolean;
  painelDigital: boolean;
  x: number; // SVG map coordinate (0-1000)
  y: number; // SVG map coordinate (0-600)
}

export interface BusVehicle {
  prefixo: string;
  placa: string;
  progressoParadaIndex: number;
  velocidadeKmH: number;
  ocupacaoPct: number;
  acessivelPcd: boolean;
  arCondicionado: boolean;
}

export interface BusLine {
  id: string;
  codigo: string;
  nome: string;
  origem: string;
  destino: string;
  categoria: 'Expressa' | 'Estrutural' | 'Alimentadora' | 'Noturna';
  status: 'Operação Normal' | 'Lentidão Moderada' | 'Desvio Ativo';
  tarifa: string;
  intervaloMin: number;
  proximaChegadaMin: number;
  lotacao: 'Baixa' | 'Moderada' | 'Alta';
  veiculosAtivos: number;
  extensaoKm: number;
  tempoViagemMin: number;
  corHex: string;
  acessibilidade: string[];
  horariosProximos: string[];
  paradas: BusStop[];
  veiculos: BusVehicle[];
}

export interface OccurrenceItem {
  id: string;
  protocolo: string;
  linhaCodigo: string;
  tipo: 'Atraso na Linha' | 'Acessibilidade / Elevador' | 'Desvio de Tráfego' | 'Superlotação' | 'Manutenção na Via';
  severidade: 'Normal' | 'Atenção' | 'Crítico';
  titulo: string;
  descricao: string;
  local: string;
  horario: string;
  confirmacoes: number;
  status: 'Em Análise' | 'Equipes no Local' | 'Normalizado';
  confirmadoPeloUsuario?: boolean;
}

export interface SocialProgram {
  id: string;
  nome: string;
  publicoAlvo: string;
  beneficio: string;
  requisitos: string[];
  documentos: string[];
  prazoEmissao: string;
  statusInscricao: 'Inscrições Abertas' | 'Atendimento Contínuo';
}

export interface AssistedBoardingRequest {
  id: string;
  protocolo: string;
  passageiro: string;
  linhaCodigo: string;
  paradaEmbarque: string;
  horarioPrevisto: string;
  tipoApoio: string;
  status: 'Motorista Notificado' | 'Agendado' | 'Concluído';
}

export const INITIAL_BUS_LINES: BusLine[] = [
  {
    id: '809u-10',
    codigo: '809U-10',
    nome: 'Cidade Universitária ↔ Metrô Barra Funda',
    origem: 'Terminal USP / Butantã',
    destino: 'Terminal Barra Funda (Plataforma B)',
    categoria: 'Expressa',
    status: 'Operação Normal',
    tarifa: 'R$ 4,40',
    intervaloMin: 6,
    proximaChegadaMin: 3,
    lotacao: 'Moderada',
    veiculosAtivos: 14,
    extensaoKm: 13.8,
    tempoViagemMin: 38,
    corHex: '#0284C7',
    acessibilidade: ['Piso Baixo Integral', 'Rampa Automática PCD', 'Aviso Sonoro de Paradas', 'Espaço Cão-Guia'],
    horariosProximos: ['15:44', '15:50', '15:56', '16:02', '16:08', '16:15'],
    paradas: [
      { id: 'p-809-1', nome: 'Portaria 1 — Cidade Universitária', referencia: 'Av. Afrânio Peixoto, 140', etaMin: 1, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 140, y: 420 },
      { id: 'p-809-2', nome: 'Estação Instituto Butantan', referencia: 'Av. Vital Brasil, 980', etaMin: 3, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 260, y: 370 },
      { id: 'p-809-3', nome: 'Largo de Pinheiros / Faria Lima', referencia: 'Rua Teodoro Sampaio, 2410', etaMin: 9, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 420, y: 310 },
      { id: 'p-809-4', nome: 'Praça Benedito Calixto', referencia: 'Av. Henrique Schaumann, 520', etaMin: 15, acessivel: true, abrigoCoberto: false, painelDigital: false, x: 560, y: 260 },
      { id: 'p-809-5', nome: 'Hospital das Clínicas / Pacaembu', referencia: 'Av. Pacaembu, 1120', etaMin: 22, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 710, y: 200 },
      { id: 'p-809-6', nome: 'Terminal Intermodal Barra Funda', referencia: 'Rua Bento Teobaldo Ferraz, s/n', etaMin: 29, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 850, y: 140 }
    ],
    veiculos: [
      { prefixo: 'EL-4012', placa: 'SBP-4A12', progressoParadaIndex: 1, velocidadeKmH: 34, ocupacaoPct: 52, acessivelPcd: true, arCondicionado: true },
      { prefixo: 'EL-4019', placa: 'SBP-9C81', progressoParadaIndex: 3, velocidadeKmH: 29, ocupacaoPct: 64, acessivelPcd: true, arCondicionado: true },
      { prefixo: 'EL-4025', placa: 'SBP-2E44', progressoParadaIndex: 4, velocidadeKmH: 38, ocupacaoPct: 41, acessivelPcd: true, arCondicionado: true }
    ]
  },
  {
    id: '5119-10',
    codigo: '5119-10',
    nome: 'Terminal Capelinha ↔ Largo São Francisco',
    origem: 'Terminal Capelinha',
    destino: 'Praça Ouvidor Pacheco e Silva (Centro)',
    categoria: 'Expressa',
    status: 'Operação Normal',
    tarifa: 'R$ 4,40',
    intervaloMin: 4,
    proximaChegadaMin: 2,
    lotacao: 'Baixa',
    veiculosAtivos: 22,
    extensaoKm: 19.4,
    tempoViagemMin: 44,
    corHex: '#0D9488',
    acessibilidade: ['Biarticulado Piso Baixo', 'Embarque em Nível', '2 Box Cadeirante', ' Painel em Braille'],
    horariosProximos: ['15:42', '15:46', '15:50', '15:54', '15:58', '16:02'],
    paradas: [
      { id: 'p-5119-1', nome: 'Terminal Capelinha — Plat. A', referencia: 'Estr. de Itapecerica, 3220', etaMin: 2, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 180, y: 510 },
      { id: 'p-5119-2', nome: 'Parada João Dias / Ponte Nova', referencia: 'Av. João Dias, 1890', etaMin: 8, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 340, y: 450 },
      { id: 'p-5119-3', nome: 'Parada Brooklin / Roque Petroni', referencia: 'Av. Santo Amaro, 4400', etaMin: 14, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 490, y: 380 },
      { id: 'p-5119-4', nome: 'Parada Moema / Ibirapuera', referencia: 'Av. Brig. Luís Antônio, 3100', etaMin: 21, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 630, y: 310 },
      { id: 'p-5119-5', nome: 'Av. Paulista / Brigadeiro', referencia: 'Av. Brig. Luís Antônio, 2050', etaMin: 27, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 750, y: 245 },
      { id: 'p-5119-6', nome: 'Largo São Francisco — Centro', referencia: 'Praça São Francisco, 110', etaMin: 34, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 870, y: 195 }
    ],
    veiculos: [
      { prefixo: 'BRT-1104', placa: 'SMB-1F04', progressoParadaIndex: 0, velocidadeKmH: 42, ocupacaoPct: 36, acessivelPcd: true, arCondicionado: true },
      { prefixo: 'BRT-1108', placa: 'SMB-8G22', progressoParadaIndex: 2, velocidadeKmH: 39, ocupacaoPct: 48, acessivelPcd: true, arCondicionado: true },
      { prefixo: 'BRT-1115', placa: 'SMB-5H90', progressoParadaIndex: 4, velocidadeKmH: 35, ocupacaoPct: 44, acessivelPcd: true, arCondicionado: true }
    ]
  },
  {
    id: '175t-10',
    codigo: '175T-10',
    nome: 'Metrô Santana ↔ Metrô Jabaquara',
    origem: 'Terminal Metrô Santana',
    destino: 'Terminal Metrô Jabaquara',
    categoria: 'Estrutural',
    status: 'Lentidão Moderada',
    tarifa: 'R$ 4,40',
    intervaloMin: 7,
    proximaChegadaMin: 5,
    lotacao: 'Alta',
    veiculosAtivos: 18,
    extensaoKm: 21.6,
    tempoViagemMin: 62,
    corHex: '#D97706',
    acessibilidade: ['Elevador Hidráulico', 'Assentos Preferenciais Demarcados', 'Sinalização Visual LED'],
    horariosProximos: ['15:45', '15:52', '15:59', '16:06', '16:13'],
    paradas: [
      { id: 'p-175-1', nome: 'Terminal Santana — Box 4', referencia: 'Rua Gabriel Prestes, 45', etaMin: 5, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 520, y: 80 },
      { id: 'p-175-2', nome: 'Estação Armênia / Tiradentes', referencia: 'Av. Tiradentes, 1280', etaMin: 13, acessivel: true, abrigoCoberto: true, painelDigital: false, x: 535, y: 180 },
      { id: 'p-175-3', nome: 'Corredor 23 de Maio / Paraíso', referencia: 'Viaduto Santa Generosa, s/n', etaMin: 24, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 550, y: 290 },
      { id: 'p-175-4', nome: 'Vila Mariana / Domingos de Morais', referencia: 'Av. Domingos de Morais, 1840', etaMin: 33, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 575, y: 390 },
      { id: 'p-175-5', nome: 'Praça da Árvore / Saúde', referencia: 'Av. Jabaquara, 1120', etaMin: 44, acessivel: true, abrigoCoberto: true, painelDigital: false, x: 600, y: 470 },
      { id: 'p-175-6', nome: 'Terminal Metrô Jabaquara', referencia: 'Rua dos Jequitibás, 120', etaMin: 53, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 620, y: 545 }
    ],
    veiculos: [
      { prefixo: 'EST-3091', placa: 'SBN-3J91', progressoParadaIndex: 1, velocidadeKmH: 19, ocupacaoPct: 81, acessivelPcd: true, arCondicionado: true },
      { prefixo: 'EST-3098', placa: 'SBN-7K14', progressoParadaIndex: 3, velocidadeKmH: 22, ocupacaoPct: 76, acessivelPcd: true, arCondicionado: true }
    ]
  },
  {
    id: '477p-10',
    codigo: '477P-10',
    nome: 'Ipiranga ↔ Rio Pequeno',
    origem: 'Museu do Ipiranga / Nazaré',
    destino: 'Terminal Rio Pequeno',
    categoria: 'Estrutural',
    status: 'Operação Normal',
    tarifa: 'R$ 4,40',
    intervaloMin: 9,
    proximaChegadaMin: 7,
    lotacao: 'Moderada',
    veiculosAtivos: 12,
    extensaoKm: 18.2,
    tempoViagemMin: 52,
    corHex: '#4F46E5',
    acessibilidade: ['Piso Baixo', 'Elevador PCD', 'Carregador USB nos Balaústres'],
    horariosProximos: ['15:47', '15:56', '16:05', '16:14', '16:23'],
    paradas: [
      { id: 'p-477-1', nome: 'Parque da Independência — Ipiranga', referencia: 'Av. Nazaré, 610', etaMin: 7, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 840, y: 440 },
      { id: 'p-477-2', nome: 'Estação Chácara Klabin', referencia: 'Rua Vergueiro, 3900', etaMin: 16, acessivel: true, abrigoCoberto: true, painelDigital: false, x: 690, y: 390 },
      { id: 'p-477-3', nome: 'Itaim Bibi / Juscelino Kubitschek', referencia: 'Av. Pres. Juscelino Kubitschek, 900', etaMin: 26, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 480, y: 350 },
      { id: 'p-477-4', nome: 'Ponte Cidade Jardim / Butantã', referencia: 'Av. Vital Brasil, 310', etaMin: 36, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 310, y: 320 },
      { id: 'p-477-5', nome: 'Terminal Rio Pequeno', referencia: 'Av. Eng. Heitor Antônio Eiras Garcia, 4200', etaMin: 47, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 130, y: 270 }
    ],
    veiculos: [
      { prefixo: 'RAD-2204', placa: 'SBR-2M04', progressoParadaIndex: 0, velocidadeKmH: 31, ocupacaoPct: 58, acessivelPcd: true, arCondicionado: true },
      { prefixo: 'RAD-2211', placa: 'SBR-8P11', progressoParadaIndex: 2, velocidadeKmH: 28, ocupacaoPct: 49, acessivelPcd: true, arCondicionado: true }
    ]
  },
  {
    id: '702u-10',
    codigo: '702U-10',
    nome: 'Circular Butantã ↔ Terminal Pinheiros',
    origem: 'Metrô Butantã',
    destino: 'Terminal Pinheiros (Integração CPTM)',
    categoria: 'Alimentadora',
    status: 'Operação Normal',
    tarifa: 'Gratuito (Integração)',
    intervaloMin: 8,
    proximaChegadaMin: 4,
    lotacao: 'Baixa',
    veiculosAtivos: 9,
    extensaoKm: 6.4,
    tempoViagemMin: 19,
    corHex: '#16A34A',
    acessibilidade: ['Micro-ônibus Piso Baixo', 'Rampa Manual Assistida', 'Aviso Sonoro'],
    horariosProximos: ['15:44', '15:52', '16:00', '16:08', '16:16'],
    paradas: [
      { id: 'p-702-1', nome: 'Terminal Metrô Butantã', referencia: 'Av. Vital Brasil, 400', etaMin: 4, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 250, y: 340 },
      { id: 'p-702-2', nome: 'Ponte Bernardo Goldfarb', referencia: 'Rua Butantã, 190', etaMin: 10, acessivel: true, abrigoCoberto: false, painelDigital: false, x: 330, y: 290 },
      { id: 'p-702-3', nome: 'Terminal Pinheiros — Plataforma C', referencia: 'Rua Gilberto Sabino, 130', etaMin: 16, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 410, y: 250 }
    ],
    veiculos: [
      { prefixo: 'ALI-0912', placa: 'SBA-9L12', progressoParadaIndex: 1, velocidadeKmH: 30, ocupacaoPct: 29, acessivelPcd: true, arCondicionado: true }
    ]
  },
  {
    id: 'n304-11',
    codigo: 'N304-11',
    nome: 'Term. Parque Dom Pedro II ↔ Vila Prudente',
    origem: 'Terminal Parque Dom Pedro II',
    destino: 'Terminal Vila Prudente (Expresso)',
    categoria: 'Noturna',
    status: 'Desvio Ativo',
    tarifa: 'R$ 4,40',
    intervaloMin: 15,
    proximaChegadaMin: 11,
    lotacao: 'Baixa',
    veiculosAtivos: 6,
    extensaoKm: 11.5,
    tempoViagemMin: 28,
    corHex: '#DC2626',
    acessibilidade: ['Desembarque Fora do Ponto (22h–05h)', 'Piso Baixo', 'Monitoramento Câmera CCON'],
    horariosProximos: ['23:45', '00:00', '00:15', '00:30', '00:45'],
    paradas: [
      { id: 'p-n304-1', nome: 'Terminal Parque Dom Pedro II', referencia: 'Av. do Estado, 3300', etaMin: 11, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 680, y: 170 },
      { id: 'p-n304-2', nome: 'Largo do Cambuci / Independência', referencia: 'Av. Dom Pedro I, 240', etaMin: 18, acessivel: true, abrigoCoberto: true, painelDigital: false, x: 775, y: 255 },
      { id: 'p-n304-3', nome: 'Terminal Metrô Vila Prudente', referencia: 'Av. Prof. Luiz Ignácio Anhaia Mello, 1350', etaMin: 26, acessivel: true, abrigoCoberto: true, painelDigital: true, x: 890, y: 335 }
    ],
    veiculos: [
      { prefixo: 'NOT-7702', placa: 'SBN-7V02', progressoParadaIndex: 1, velocidadeKmH: 36, ocupacaoPct: 22, acessivelPcd: true, arCondicionado: true }
    ]
  }
];

export const INITIAL_OCCURRENCES: OccurrenceItem[] = [
  {
    id: 'occ-1',
    protocolo: 'SB-2026-8841',
    linhaCodigo: '175T-10',
    tipo: 'Atraso na Linha',
    severidade: 'Atenção',
    titulo: 'Retenção semafórica no eixo Av. Tiradentes / Armênia',
    descricao: 'Obras emergenciais de drenagem na faixa exclusiva sentido Jabaquara aumentaram o intervalo médio de 5 para 9 minutos.',
    local: 'Av. Tiradentes, altura do nº 1280 — Sentido Sul',
    horario: 'Há 14 min · 15:26',
    confirmacoes: 19,
    status: 'Equipes no Local'
  },
  {
    id: 'occ-2',
    protocolo: 'SB-2026-8837',
    linhaCodigo: 'N304-11',
    tipo: 'Desvio de Tráfego',
    severidade: 'Crítico',
    titulo: 'Desvio programado na Av. do Estado (Viaduto 25 de Março)',
    descricao: 'Parada provisória transferida 120 metros à frente, na Praça Cívica Ulisses Guimarães, com orientadores de tráfego no local.',
    local: 'Saída Plataforma 3 — Parque Dom Pedro II',
    horario: 'Há 38 min · 15:02',
    confirmacoes: 31,
    status: 'Equipes no Local'
  },
  {
    id: 'occ-3',
    protocolo: 'SB-2026-8829',
    linhaCodigo: '809U-10',
    tipo: 'Acessibilidade / Elevador',
    severidade: 'Normal',
    titulo: 'Substituição preventiva de veículo com rampa automática',
    descricao: 'Veículo prefixo EL-4009 substituído por carro reserva 100% piso baixo no Terminal Barra Funda sem impacto no horário.',
    local: 'Terminal Barra Funda — Plataforma B',
    horario: 'Há 1h 10min · 14:30',
    confirmacoes: 8,
    status: 'Normalizado'
  },
  {
    id: 'occ-4',
    protocolo: 'SB-2026-8815',
    linhaCodigo: '5119-10',
    tipo: 'Manutenção na Via',
    severidade: 'Normal',
    titulo: 'Reparo concluído no painel digital da Parada Moema',
    descricao: 'Painel de previsão de chegada em tempo real e aviso sonoro para deficientes visuais restabelecidos.',
    local: 'Av. Brig. Luís Antônio, 3100 — Parada Moema',
    horario: 'Há 2h 05min · 13:35',
    confirmacoes: 12,
    status: 'Normalizado'
  }
];

export const SOCIAL_PROGRAMS: SocialProgram[] = [
  {
    id: 'tarifa-social',
    nome: 'Tarifa Social Cidadã (50% de Desconto)',
    publicoAlvo: 'Famílias inscritas no CadÚnico com renda per capita até ½ salário mínimo',
    beneficio: 'Redução automática da tarifa para R$ 2,20 em todas as linhas municipais e integração gratuita em até 3 ônibus no período de 3 horas.',
    requisitos: [
      'NIS ativo e atualizado no Cadastro Único (CadÚnico) há menos de 24 meses',
      'Residência comprovada no município ou região metropolitana integrada',
      'Cartão SmartBus Cidadão nominal com biometria facial validada'
    ],
    documentos: ['Documento oficial com foto (RG ou CIN)', 'CPF', 'Folha Resumo do CadÚnico (V7) ou comprovante CRAS'],
    prazoEmissao: 'Ativação imediata após validação do NIS',
    statusInscricao: 'Atendimento Contínuo'
  },
  {
    id: 'passe-livre-pcd',
    nome: 'Passe Livre PCD & Embarque Assistido',
    publicoAlvo: 'Pessoas com deficiência física, visual, auditiva, intelectual ou mobilidade reduzida',
    beneficio: 'Gratuidade integral (100%) extensiva a 1 acompanhante cadastrado + acionamento de alerta ao motorista para embarque em rampa.',
    requisitos: [
      'Laudo médico eletrônico ou impresso com CID emitido pela rede pública ou conveniada',
      'Avaliação biopsicossocial simplificada nos postos SmartBus ou UBS de referência'
    ],
    documentos: ['RG/CIN do titular e do acompanhante', 'Laudo médico atualizado', 'Comprovante de endereço'],
    prazoEmissao: 'Até 5 dias úteis (cartão provisório liberado na hora)',
    statusInscricao: 'Atendimento Contínuo'
  },
  {
    id: 'passe-estudantil',
    nome: 'Passe Livre & Meia-Tarifa Estudantil',
    publicoAlvo: 'Estudantes do ensino fundamental, médio, técnico, EJA e universitários (ProUni / FIES / Cotas)',
    beneficio: 'Até 48 viagens mensais gratuitas para rede pública/baixa renda ou 50% de desconto na recarga estudantil.',
    requisitos: [
      'Matrícula ativa enviada pela instituição de ensino ao sistema SmartBus Escolar',
      'Distância mínima de 1 km entre a residência e a unidade de ensino'
    ],
    documentos: ['Declaração de matrícula vigente', 'CPF e RG do estudante', 'Comprovante de residência'],
    prazoEmissao: 'Liberação digital em 48 horas',
    statusInscricao: 'Inscrições Abertas'
  },
  {
    id: 'bilhete-senior',
    nome: 'Cartão Sênior 60+ Gratuidade Integral',
    publicoAlvo: 'Cidadãos a partir de 60 anos completos',
    beneficio: 'Gratuidade ilimitada em todas as linhas e acesso pelas portas dianteira ou central com validação rápida.',
    requisitos: [
      'Idade igual ou superior a 60 anos completos na data da solicitação'
    ],
    documentos: ['Documento oficial com foto e CPF', 'Comprovante de residência recente'],
    prazoEmissao: 'Emissão na hora nos terminais integrados',
    statusInscricao: 'Atendimento Contínuo'
  }
];

export const INITIAL_ASSISTED_REQUESTS: AssistedBoardingRequest[] = [
  {
    id: 'req-1',
    protocolo: 'ATD-9042',
    passageiro: 'Helena Vasconcelos (Cartão PCD #4821-9)',
    linhaCodigo: '809U-10',
    paradaEmbarque: 'Estação Instituto Butantan',
    horarioPrevisto: '15:50',
    tipoApoio: 'Cadeira de Rodas — Acionamento de Rampa Automática',
    status: 'Motorista Notificado'
  },
  {
    id: 'req-2',
    protocolo: 'ATD-9038',
    passageiro: 'Marcos Roberto Silva (Deficiência Visual)',
    linhaCodigo: '5119-10',
    paradaEmbarque: 'Parada Moema / Ibirapuera',
    horarioPrevisto: '15:54',
    tipoApoio: 'Aviso Sonoro Externo + Embarque com Cão-Guia',
    status: 'Agendado'
  }
];
