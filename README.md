# 🚌 SmartBus Curitiba — Mobilidade Inteligente

Aplicação web **mobile-first** desenvolvida em **React** e **TypeScript** para monitoramento inteligente do transporte público de Curitiba (Rede Integrada de Transporte — RIT). O SmartBus permite a passageiros e cidadãos consultar itinerários de linhas, acompanhar horários e previsões de chegada, verificar alertas e ocorrências de trânsito em tempo real, explorar terminais integrados com mapa e sinalização temática, além de solicitar benefícios sociais e embarque assistido para Pessoas com Deficiência (PCD).

---

## 📱 Funcionalidades Principais

- 🚌 **Linhas de Ônibus**: Catálogo atualizado das linhas da RIT (Expressas, Estruturais, Alimentadoras e Madrugueiras) com pesquisa instantânea por nome ou número da linha.
- 📍 **Mapa de Terminais & Sinalização**: Mapa esquemático e interativo de Curitiba com os eixos canaleta (Norte, Sul, Boqueirão, CIC/Oeste e Central). Inclui **ícones de sinalização temáticos** (🚏, 🛑, 🚩, 🚦, 📍, ⭐) para cada terminal, tempo médio de espera e link direto para rota no Google Maps.
- ⏱️ **Monitoramento em Tempo Real**: Estimativas de espera e previsão de chegada dos próximos ônibus por linha.
- ⭐ **Linhas Favoritas**: Marcação e acesso rápido às linhas mais utilizadas pelo passageiro.
- ⚠️ **Central de Ocorrências**: Informes sobre desvios programados, retenção semafórica, obras e manutenção nas vias exclusivas.
- 🤝 **Assistência Social & Inclusão**: Informações detalhadas sobre Passe Livre PCD, Embarque Assistido com rampa, Tarifa Social Cidadã (CadÚnico) e Passe Estudantil.
- 🔐 **Acesso & Cadastro**: Interface de login e cadastro pensada para telas móveis.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Bundler**: [Vite](https://vite.dev/)
- **Roteamento SPA**: [React Router DOM v6](https://reactrouter.com/)
- **Mapas & Geolocalização**: [@vis.gl/react-google-maps](https://github.com/visgl/react-google-maps) (Google Maps Platform)
- **Metodologia Arquitetural**: Spec-Driven Development (SDD) com camadas desacopladas

---

## 📂 Estrutura de Diretórios (Arquitetura SDD)

O projeto adota uma arquitetura em camadas limpas, isolando infraestrutura na raiz e código-fonte na pasta `src/`:

```
smartbus-curitiba/
├── index.html                  # Ponto de entrada HTML (#root)
├── package.json                # Dependências e scripts npm
├── tsconfig.json               # Configurações do compilador TypeScript
├── vite.config.ts              # Configuração do Vite (porta 3000, host 0.0.0.0)
├── metadata.json               # Metadados de integração com o AI Studio
│
└── src/                        # Código-fonte da aplicação
    ├── App.tsx                 # Roteador central e layout da aplicação
    ├── main.tsx                # Entry-point do React (createRoot)
    ├── index.css               # Estilos globais e tokens visuais
    ├── vite-env.d.ts           # Definições de tipos do Vite
    │
    ├── components/             # Componentes visuais reutilizáveis
    │   ├── Header.tsx          # Barra superior com branding SmartBus
    │   └── NavButton.tsx       # Botões de navegação mobile com área tátil
    │
    ├── context/                # Gerenciamento de estado global
    │   └── SmartBusContext.tsx # Context e Provider de autenticação e preferências
    │
    ├── data/                   # Datasets e modelos estáticos
    │   └── smartBusData.ts     # Dados estruturados de linhas, paradas e programas
    │
    ├── pages/                  # Telas mapeadas nas rotas do sistema
    │   ├── SmartBusAcesso.tsx      # Rota "/" (Login)
    │   ├── SmartBusCadastro.tsx    # Rota "/cadastro"
    │   ├── SmartBusHome.tsx        # Rota "/home" (Dashboard Principal)
    │   ├── SmartBusLinhas.tsx      # Rota "/linhas" (Catálogo e busca de linhas)
    │   ├── SmartBusMapa.tsx        # Rota "/mapa" (Mapa com sinalização de terminais)
    │   ├── SmartBusFavoritos.tsx   # Rota "/favoritos"
    │   ├── SmartBusOcorrencias.tsx # Rota "/ocorrencias" (Alertas de tráfego)
    │   ├── SmartBusAssistencia.tsx # Rota "/assistencia" (Programas sociais e PCD)
    │   ├── SmartBusMonitoramento.tsx # Rota "/monitoramento" (Previsão de chegada)
    │   └── SmartBusSobre.tsx       # Rota "/sobre" (Informações da versão)
    │
    └── services/               # Camada de comunicação com APIs externas
        ├── mapsService.ts      # Dados dos terminais de Curitiba e helpers de geolocalização
        └── smartBusApi.ts      # Cliente de consumo e consulta de linhas
```

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior recomendada; compatível com Node 20 e 22)
- Gerenciador de pacotes **npm**

Verifique as versões com:
```bash
node -v
npm -v
```

### 2. Instalação das Dependências

Clone o repositório ou navegue até o diretório raiz do projeto e instale as dependências:
```bash
npm install
```

### 3. Configuração de Variáveis de Ambiente (Opcional)

Para habilitar a renderização interativa do Google Maps via SDK oficial, crie um arquivo `.env` na raiz do projeto:

```bash
VITE_GOOGLE_MAPS_API_KEY="SUA_CHAVE_DO_GOOGLE_MAPS_AQUI"
```

> **Nota:** Caso nenhuma chave seja informada, a aplicação utiliza automaticamente o mapa vetorial esquemático integrado dos eixos de transporte de Curitiba, com botões para navegação externa.

### 4. Executando em Modo de Desenvolvimento

Inicie o servidor de desenvolvimento do Vite:
```bash
npm run dev
```

A aplicação estará disponível em:
```
http://localhost:3000
```
*(ou no IP de rede local exibido no terminal, permitindo testes em smartphones na mesma rede).*

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento com hot-reload na porta `3000`. |
| `npm run build` | Valida tipagens com TypeScript (`tsc`) e gera os arquivos otimizados em `dist/`. |
| `npm run preview` | Executa localmente o bundle compilado em produção para validação. |
| `npm run lint` | Executa a checagem de tipos estática sem gerar arquivos (`tsc --noEmit`). |

---

## ♿ Acessibilidade e Inclusão

O SmartBus Curitiba foi planejado seguindo diretrizes de acessibilidade:
- Contraste visual elevado entre o Amarelo Transporte (`#FFCC00`) e o Azul Noturno (`#0D3B4C`).
- Botões e alvos de toque com altura mínima de 44px recomendada para uso em smartphones.
- Informações claras sobre rampa de acesso, assentos reservados e canaletas com piso baixo para passageiros PCD.

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de demonstração de mobilidade urbana inteligente.
