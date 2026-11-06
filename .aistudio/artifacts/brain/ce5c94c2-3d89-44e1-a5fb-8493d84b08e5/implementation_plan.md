# SmartBus Curitiba — Especificação Arquitetural SDD & Plano de Migração

Especificação técnica baseada em Spec-Driven Development (SDD) para reestruturação mobile-first da aplicação SmartBus Curitiba em React + TypeScript, estabelecendo separação rígida de responsabilidades, isolamento de camada de rede e infraestrutura de build desacoplada.

---

## Decisões Confirmadas & Resumo Executivo

> [!IMPORTANT]
> **Decisões alinhadas na Fase de Clarificação:**
> 1. **Padrão de Pastas em `src/`**: Arquitetura em camadas desacopladas (`components/`, `context/`, `data/`, `pages/`, `services/`).
> 2. **Camada Google Maps**: Módulo dedicado em `src/services/mapsService.ts` com tipagem forte e helpers utilitários.
> 3. **Escopo de Execução**: Apresentação da especificação SDD formal com aprovação prévia, seguida da execução física da refatoração nos arquivos.

---

## 1. Visão Geral & Conceito do Produto

O **SmartBus Curitiba** é uma aplicação web mobile-first desenhada para passageiros do transporte público da Região Metropolitana de Curitiba. A aplicação fornece consulta em tempo real de linhas alimentadoras, expressas e biarticulados, visualização de terminais em mapa interativo (Google Maps), alertas de tráfego/obras, cadastro cidadão e solicitações de assistência social e acessibilidade PCD.

### Persona e Contexto de Uso
- **Cidadão em Trânsito**: Acessa via smartphone em pontos de ônibus ou terminais (Cabral, Boqueirão, Pinheirinho, CIC) demandando baixo consumo de dados, renderização rápida e navegação fluida em telas estreitas (360px a 430px).
- **Passageiro com Necessidades Especiais (PCD)**: Demanda contraste elevado, fontes legíveis, avisos de rampa e solicitação rápida de embarque assistido.

---

## 2. Experiência do Usuário & Design Mobile-First

### Diretrizes de Interface
- **Contêiner Mobile Nativo**: Centralizado na viewport desktop com largura máxima estrita (`max-w-[420px]`), simulando shell nativo mobile com bordas suaves e sombras de profundidade.
- **Paleta Oficial SmartBus**:
  - `Header / Accents`: Amarelo Transporte `#FFCC00` (alto contraste para botões de ação e títulos de destaque).
  - `Superfícies Principais`: Azul Petróleo Profundo `#0D3B4C` (fundo dos cartões e contêiner principal).
  - `Cards Interativos`: Azul Médio `#1C6688` (cartões de rotas, alertas e pontos de parada).
  - `Status & Alertas`: `#DC2626` (crítico), `#D97706` (atenção), `#16A34A` (operação normal).
- **Régua Tipográfica**: Hierarquia clara com Arial/Inter, pesos `600`/`700` para títulos e identificadores de linha (`203 Santa Cândida`), corpo `14px-16px` com espaçamento de toque mínimo de `44px` para botões.

---

## 3. Decisões Arquiteturais & Trade-Offs (SDD)

### Decisão 1: Raiz do Projeto vs. Diretório `src/`
- **Abordagem Adotada**: Arquivos de build e toolchain (`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`) residem na raiz absoluta (`/`). Todo o código da aplicação reside estritamente sob `src/`.
- **Justificativa**: Compatibilidade nativa com o padrão Vite/ESBuild, resolução de módulos simplificada e eliminação de pastas aninhadas não padronizadas (`Projeto Android Main/`).

### Decisão 2: Isolamento da Camada de Serviços (`src/services/`)
- **Abordagem Adotada**: Extração de `smartBusApi.ts` e criação de `mapsService.ts` dentro de `src/services/`.
- **Justificativa**: Evita dependências circulares entre páginas e centraliza tratamento de erros de rede, cabeçalhos e inicialização segura de SDKs externos (ex: Google Maps Loader).

### Decisão 3: Tratamento de Arquivos de Backup e Tipagem Perdida
- **Abordagem Adotada**: O arquivo `SmartBusPrototipo.bkp.tsx` será removido do código de produção para evitar confusão de manutenção. O arquivo `vite-env.d.ts` é reposicionado em `src/vite-env.d.ts`.

---

## 4. Arquitetura Técnica & Especificação Detalhada

### 4.1 Especificação da Árvore de Diretórios (SDD Spec)

```
/ (Raiz do Projeto)
│
├── index.html                  # Ponto de entrada HTML e montagem do DOM (#root)
├── package.json                # Manifesto de dependências e scripts npm
├── tsconfig.json               # Configurações do compilador TypeScript
├── vite.config.ts              # Configuração do Vite (porta 3000, host 0.0.0.0, plugin React)
├── metadata.json               # Metadados de integração do ambiente AI Studio
├── .gitignore                  # Arquivos e diretórios ignorados pelo Git
│
└── src/                        # Código-fonte compilável da aplicação
    │
    ├── main.tsx                # Entry-point do React (createRoot, StrictMode)
    ├── App.tsx                 # Roteador central (BrowserRouter, Routes e layout mobile)
    ├── index.css               # Folha de estilo base (reset, tipografia, tokens de cor)
    ├── vite-env.d.ts           # Declaração global de tipos do cliente Vite
    │
    ├── components/             # Componentes de UI reutilizáveis (mobile-first)
    │   ├── Header.tsx          # Barra de topo com branding SmartBus e indicador de status
    │   ├── MobileCard.tsx      # Cartão padrão com sombra e borda arredondada
    │   └── NavButton.tsx       # Botão de navegação tátil (toque mínimo 44px)
    │
    ├── context/                # Gerenciamento de estado global da aplicação
    │   └── SmartBusContext.tsx # Context e Provider para autenticação e linhas favoritas
    │
    ├── data/                   # Mock datasets estruturados para Curitiba e transporte
    │   └── smartBusData.ts     # Definições completas de linhas, terminais, paradas e ocorrências
    │
    ├── pages/                  # Componentes de visualização acoplados a rotas
    │   ├── SmartBusAcesso.tsx      # Tela de login e autenticação
    │   ├── SmartBusCadastro.tsx    # Formulário de novo usuário
    │   ├── SmartBusHome.tsx        # Dashboard e menu central de navegação
    │   ├── SmartBusLinhas.tsx      # Listagem e busca de linhas de ônibus
    │   ├── SmartBusMapa.tsx        # Mapa interativo com terminais integrados
    │   ├── SmartBusFavoritos.tsx   # Linhas salvas pelo usuário
    │   ├── SmartBusOcorrencias.tsx # Feed de incidentes, atrasos e desvios
    │   ├── SmartBusAssistencia.tsx # Programas sociais (CadÚnico, Passe Livre PCD)
    │   ├── SmartBusMonitoramento.tsx # ETA e tempos de espera por linha
    │   └── SmartBusSobre.tsx       # Informações e versão do sistema
    │
    └── services/               # Camada de comunicação com APIs externas e I/O
        ├── smartBusApi.ts      # Cliente HTTP para consulta de linhas e horários
        └── mapsService.ts      # Utilitários e tipagem para integração do Google Maps
```

#### Responsabilidade de Cada Diretório:
1. **`Raiz (/)`**: Exclusivamente governança do projeto, configurações de build, dependências de runtime e assets estáticos globais.
2. **`src/`**: Raiz do código executável da aplicação frontend.
3. **`src/components/`**: Componentes puros de apresentação, sem acoplamento a rotas específicas.
4. **`src/context/`**: Estado compartilhado entre múltiplas páginas (usuário autenticado, favoritos em memória).
5. **`src/data/`**: Tipagens de domínio e coleções de dados estruturadas offline para testes e fallback.
6. **`src/pages/`**: Páginas autônomas orquestradas pelo `react-router-dom`.
7. **`src/services/`**: Camada isolada para comunicação de rede (REST APIs, WebSockets, SDKs terceiros como Google Maps).

---

### 4.2 Diagrama Arquitetural de Fluxo

```
┌────────────────────────────────────────────────────────┐
│                      index.html                        │
│                 └── <div id="root">                    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                     src/main.tsx                       │
│        (Importa index.css, inicializa App)             │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                      src/App.tsx                       │
│        (Configura BrowserRouter e Routes)              │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
               ▼                          ▼
   ┌───────────────────────┐  ┌───────────────────────┐
   │  src/context/         │  │  src/pages/           │
   │  SmartBusContext      │◄─┼─ SmartBusHome.tsx     │
   │  (Estado, Favoritos)  │  │  SmartBusLinhas.tsx   │
   └───────────────────────┘  │  SmartBusMapa.tsx     │
                              │  SmartBusAcesso.tsx   │
                              │  ...                  │
                              └───────────┬───────────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │  src/services/        │
                              │  ├── smartBusApi.ts   │
                              │  └── mapsService.ts   │
                              └───────────────────────┘
```

---

### 4.3 Plano de Migração (Comandos de Terminal)

Para equipes executando a migração em ambientes locais ou pipelines CI/CD, os comandos exatos de terminal são:

#### Opção A: Shell Bash (Linux / macOS / WSL)
```bash
# 1. Garantir que estamos na raiz do projeto
cd /caminho/do/projeto

# 2. Criar a estrutura correta dentro de src/
mkdir -p src/components src/context src/data src/pages src/services

# 3. Mover arquivos fonte da raiz para src/
[ -f App.tsx ] && mv App.tsx src/
[ -f main.tsx ] && mv main.tsx src/
[ -f index.css ] && mv index.css src/
[ -f vite-env.d.ts ] && mv vite-env.d.ts src/

# 4. Mover pastas context e data se estiverem na raiz
[ -d context ] && mv context/* src/context/ && rm -rf context
[ -d data ] && mv data/* src/data/ && rm -rf data

# 5. Mover páginas para src/pages/ se estiverem na raiz
[ -d pages ] && mv pages/*.tsx src/pages/

# 6. Extrair services e api de dentro de pages para src/services/
[ -f pages/smartBusApi.ts ] && mv pages/smartBusApi.ts src/services/
[ -f src/pages/smartBusApi.ts ] && mv src/pages/smartBusApi.ts src/services/
rm -rf pages/services src/pages/services

# 7. Limpeza: Remover arquivo de backup e pasta corrompida
rm -f pages/SmartBusPrototipo.bkp.tsx src/pages/SmartBusPrototipo.bkp.tsx
rm -rf "Projeto Android Main"

# 8. Limpar diretório pages antigo caso vazio
[ -d pages ] && rm -rf pages
```

#### Opção B: PowerShell (Windows)
```powershell
# 1. Criar estrutura de diretórios em src/
New-Item -ItemType Directory -Force -Path src/components, src/context, src/data, src/pages, src/services

# 2. Mover arquivos base da raiz para src/
If (Test-Path App.tsx) { Move-Item -Path App.tsx -Destination src/ }
If (Test-Path main.tsx) { Move-Item -Path main.tsx -Destination src/ }
If (Test-Path index.css) { Move-Item -Path index.css -Destination src/ }
If (Test-Path vite-env.d.ts) { Move-Item -Path vite-env.d.ts -Destination src/ }

# 3. Mover pastas context e data
If (Test-Path context) { Move-Item -Path context/* -Destination src/context/ -Force; Remove-Item context -Recurse }
If (Test-Path data) { Move-Item -Path data/* -Destination src/data/ -Force; Remove-Item data -Recurse }

# 4. Mover páginas e isolar services
If (Test-Path pages) {
    Move-Item -Path pages/*.tsx -Destination src/pages/ -Force
    If (Test-Path pages/smartBusApi.ts) { Move-Item -Path pages/smartBusApi.ts -Destination src/services/ -Force }
    Remove-Item pages -Recurse -Force
}
If (Test-Path src/pages/smartBusApi.ts) {
    Move-Item -Path src/pages/smartBusApi.ts -Destination src/services/ -Force
}

# 5. Limpeza de backups e diretórios legados
If (Test-Path src/pages/SmartBusPrototipo.bkp.tsx) { Remove-Item src/pages/SmartBusPrototipo.bkp.tsx -Force }
If (Test-Path "Projeto Android Main") { Remove-Item "Projeto Android Main" -Recurse -Force }
```

---

### 4.4 Matriz de Refatoração de Imports

| Arquivo Afetado | Localização Nova | Importação Anterior | Importação Refatorada | Motivo da Mudança |
| :--- | :--- | :--- | :--- | :--- |
| `index.html` | `/index.html` | `<script src="/main.tsx">` | `<script src="/src/main.tsx">` | `main.tsx` agora reside em `src/` |
| `src/main.tsx` | `/src/main.tsx` | `import App from './App'` | `import App from './App'` | Ambos residem em `src/` (inalterado) |
| `src/main.tsx` | `/src/main.tsx` | `import './index.css'` | `import './index.css'` | Ambos residem em `src/` (inalterado) |
| `src/App.tsx` | `/src/App.tsx` | `from "./pages/SmartBusHome"` | `from "./pages/SmartBusHome"` | Mantém relação relativa direta `src/pages` |
| `src/pages/*.tsx` | `/src/pages/*.tsx` | `from "../context/SmartBusContext"` | `from "../context/SmartBusContext"` | Referência para subpasta irmã `src/context/` |
| `src/pages/*.tsx` | `/src/pages/*.tsx` | `from "./smartBusApi"` | `from "../services/smartBusApi"` | **Crítico**: API movida de `pages/` para `services/` |
| `src/pages/SmartBusMapa.tsx` | `/src/pages/SmartBusMapa.tsx` | N/A (Novo) | `from "../services/mapsService"` | Integração tipada do serviço Google Maps |
| `tsconfig.json` | `/tsconfig.json` | `"include": ["**/*.ts"]` | `"include": ["src/**/*"]` | Escopo restrito ao código-fonte em `src/` |

---

## 5. Próximos Passos Pós-Aprovação

Ao confirmar com **"Proceed"**, serão realizadas as seguintes ações automaticamente:
1. Criação do diretório `src/` e subpastas `components/`, `context/`, `data/`, `pages/`, `services/`.
2. Movimentação física de todos os arquivos de código para `src/`.
3. Extração e tipagem de `smartBusApi.ts` e criação de `mapsService.ts` em `src/services/`.
4. Atualização de `index.html` e `tsconfig.json` para refletir `/src/main.tsx`.
5. Validação com `compile_applet` e `lint_applet` garantindo 0 erros de compilação.
