# Mata Atlântica em Alerta — Documentação Técnica

**Portal Educacional de Monitoramento de Queimadas**  
Projeto de Extensão — Inovação, Ciência e Transformação Digital  
Curso: Análise e Desenvolvimento de Sistemas  
Autor: Douglas Daniel Lopes Cardoso da Silva  
Data da documentação: 09/09/2026

---

## Sumário
1. Visão geral do projeto
2. Objetivos e público-alvo
3. Cronologia das ações realizadas
4. Arquitetura e estrutura de arquivos
5. Documentação — index.html
6. Documentação — css/style.css
7. Documentação — js/data.js
8. Documentação — js/main.js
9. Documentação — scripts/process_data.py
10. Integrações externas
11. Publicação — GitHub Pages
12. Metodologia dos dados
13. Bibliografia
14. Limitações e melhorias futuras

---

## 1. Visão geral do projeto

O **Mata Atlântica em Alerta** é um portal web educacional desenvolvido como parte do Projeto de Extensão — Inovação, Ciência e Transformação Digital, do curso de **Análise e Desenvolvimento de Sistemas**. O portal apresenta dados reais e verificados sobre queimadas na Mata Atlântica, explica como o monitoramento por satélite funciona e incentiva a população a adotar práticas preventivas e sustentáveis.

Todos os dados quantitativos são provenientes de fontes oficiais (INPE/Programa Queimadas, SOS Mata Atlântica, SEMIL-SP, ISA/IPAM, MapBiomas), sem nenhum número inventado. As referências estão detalhadas na bibliografia (seção 13) e no arquivo `DATA_SOURCES.md`.

## 2. Objetivos e público-alvo

**Objetivo geral:** conscientizar a comunidade sobre a importância da Mata Atlântica e o impacto das queimadas, utilizando dados públicos do INPE como base educacional.

**Objetivos específicos:**
- Apresentar dados oficiais de focos de queimada do bioma, do estado de São Paulo e contextualização nacional.
- Explicar o funcionamento do programa de monitoramento por satélite do INPE (satélite de referência AQUA Tarde / MODIS).
- Estimular a participação em uma pesquisa de percepção ambiental via Google Forms, com contador público de participações.
- Divulgar práticas preventivas de queimadas.
- Focar a atenção na região do Vale do Paraíba e São José dos Campos, além do estado de São Paulo e do bioma nacional.

**Público-alvo:** comunidade acadêmica e população em geral da região do Vale do Paraíba (SP), com linguagem acessível, leitura estimada de ~5 minutos, layout mobile-first e recursos de acessibilidade.

## 3. Cronologia das ações realizadas

| # | Ação | Descrição |
|---|------|-----------|
| 1 | Análise do ambiente | Verificação do diretório de trabalho (vazio) e definição de escopo: HTML5, CSS3 e JavaScript puro. |
| 2 | Pesquisa de dados oficiais | Consulta ao SOS Mata Atlântica e ao INPE/Programa Queimadas (InfoQueima, TerraBrasilis, dados abertos). |
| 3 | Validação de fontes complementares | SIGAM/SEMIL-SP, Operação SP Sem Fogo, Folha/G1, ISA/IPAM, MapBiomas, OECO. |
| 4 | Criação da estrutura de pastas | Diretórios: css/, js/, assets/, data/, scripts/. |
| 5 | Desenvolvimento da página (index.html) | Single-page com seções e âncoras de navegação. |
| 6 | Desenvolvimento dos estilos (style.css) | Design system com variáveis CSS, mobile-first, acessibilidade. |
| 7 | Desenvolvimento da lógica (data.js + main.js) | Base de dados verificada, 6 gráficos com Chart.js, QR Code, menu móvel. |
| 8 | Documentação de fontes (DATA_SOURCES.md) | Metodologia, URLs, filtros e período de cada dado. |
| 9 | Integração do Google Forms | Substituição do placeholder pelo link real no botão e no QR Code. |
| 10 | Correção de conteúdo | Ícone do card "Denuncie" e texto do card "Apoie a restauração". |
| 11 | Contador de participações | Integração com API Google Apps Script via JSONP, exibindo apenas `responses`. |
| 12 | Diagnóstico de falha na API | Correção do URL (erro de digitação no ID do deployment). |
| 13 | Publicação no GitHub Pages | Commit inicial e push para github.com/douglaslcsilva/projetoExtens-o. |
| 14 | Criação do .gitignore | Exclusão de arquivo local temporário. |
| 15 | Documentação técnica e bibliografia | Arquivos Markdown, HTML e PDF. |

## 4. Arquitetura e estrutura de arquivos

```
projetoExtens-o/
├── index.html                 → Página principal (single-page)
├── css/style.css              → Estilos, responsividade e acessibilidade
├── js/data.js                 → Objeto global FIRE_DATA (dados verificados)
├── js/main.js                 → Lógica, gráficos, contador, navegação
├── assets/images/             → Imagens estáticas
├── assets/terrabrasilis/      → Capturas de referência
├── data/fires_processed.json  → Saída do processamento (gerado por scripts/)
├── scripts/process_data.py    → Download e processamento de CSVs do INPE
├── DATA_SOURCES.md            → Fontes e metodologia
├── DOCUMENTACAO_TECNICA.md    → Esta documentação
├── DOCUMENTACAO_TECNICA.html  → Versão para PDF
├── README.md                  → Guia geral
└── .gitignore                 → Arquivos excluídos do versionamento
```

**Tecnologias:** HTML5, CSS3, JavaScript Vanilla, Chart.js 4.4.7 (CDN), qrcodejs (CDN), Google Apps Script, Google Forms, Git/GitHub Pages.

## 5. Documentação — index.html

- **head:** charset UTF-8, viewport, meta description/keywords, título e folha de estilo.
- **skip-link:** link de acessibilidade "Pular para o conteúdo principal".
- **header:** logotipo, título e menu de navegação com botão hambúrguer no mobile.
- **main id="inicio":** 10 seções (hero + 9 âncoras).
- **footer:** créditos e identificação do autor/curso.

**Seções (id → conteúdo):**

| Section | Título | Conteúdo |
|---------|--------|----------|
| inicio (.hero) | Nossa Floresta está em Alerta | Três estatísticas preenchidas via JS (hero-*). |
| mata-atlantica | Por que a Mata Atlântica importa? | 4 cards: biodiversidade, população, água, débito histórico. |
| monitoramento | Como o monitoramento funciona? | 4 etapas (Detectar, Processar, Informar, Entender). |
| dados | Dados de Queimadas na Mata Atlântica | Gráfico histórico, 3 cards de estatísticas, gráfico do Atlas. |
| comparativo | Comparativo: 2026 vs Média Histórica | Gráfico mensal Brasil e por bioma (jun/2026). |
| regiao | Foco Regional: São Paulo e Vale do Paraíba | Gráficos de SP e justificativa regional. |
| prevencao | Como prevenir queimadas | 4 cards de dicas. |
| participar | Participe da pesquisa | Botão CTA, QR Code e créditos. |
| impacto | Impacto desta ação | Número de participações (API). |
| fontes | Fontes e Metodologia | Fontes oficiais com links. |

**Navegação:** âncoras `#id`, `scroll-behavior: smooth`, `scroll-padding-top` para compensar o header fixo; no mobile, painel lateral com overlay.

## 6. Documentação — css/style.css

Design system com variáveis em `:root` (cores `--c-*`, tipografia `--fs-*`, espaçamentos `--space-*`, raios `--radius-*`, sombras `--shadow-*`).

**Responsividade:** mobile-first; `@media (min-width: 640px)` para grids; `@media (min-width: 1024px)` para 4 colunas; `@media (max-width: 1023px)` transforma o menu em painel lateral; `@media (max-width: 480px)` ajusta o contador.

**Acessibilidade:** skip-link, `:focus-visible`, `prefers-reduced-motion: reduce`, estilos de impressão, `.sr-only`.

## 7. Documentação — js/data.js

Define a constante global `FIRE_DATA`, carregada antes de `main.js`.

**Campos do objeto:**

- `metadata`: escopo, satélite de referência (AQUA Tarde/MODIS), última atualização, período, fonte e nota metodológica.
- `mataAtlantica`: área original (131.007.456 ha), % remanescente (24%), % florestas maduras (12,4%), nº estados (17), % população (72%), % PIB (80%).
- `historical`: série anual de focos com `year`, `count` (ou `null`) e `note`; `partial: true` para ano parcial.
- `juneData2026`: jun/2026 do bioma (428 focos; média 711).
- `saoPaulo`: records (ano, contagem, fonte) + `june2026` (58 focos; média 241).
- `monthlyComparison`: `avg`, `y2026`, `diff2026` por mês (Brasil).
- `biomaComparison`: focos jun/2026 vs média por bioma.
- `finding2024`: 993.117 ha queimados (jan–out/2024), +636% vs 2023.
- `atlasDeforestation`: desflorestamento 2017–2025 em hectares.

Valores `null` significam "sem valor oficial verificado na pesquisa"; o gráfico exibe "Sem dados verificados".

## 8. Documentação — js/main.js

Todo o código está em uma IIFE com `"use strict"`. Configurações no topo: `GOOGLE_FORMS_URL` e `COUNTER_API`.

**Funções:**

- `init()` — orquestra as renderizações após `DOMContentLoaded`.
- `renderHeroStats()` — preenche os números de destaque inicial.
- `renderMonitoramentoSource()` — insere a nota metodológica do INPE.
- `renderDados()` — cartões de estatísticas e gráficos histórico + Atlas.
- `renderHistoricalChart()` / `renderAtlasChart()` — gráficos de barras.
- `renderComparativo()` — gráficos mensal e por bioma (jun/2026).
- `renderMonthlyChart()` / `renderBiomaChart()` — Chart.js com cores dinâmicas.
- `renderRegiao()` — textos regionais e gráficos de SP.
- `renderSPChart()` / `renderSPJuneChart()` — gráficos de SP.
- `renderPrevencao()` — conteúdo estático (consistência do fluxo).
- `renderParticipar()` — aplica URL do Forms e gera o QR Code.
- `setupImpacto()` — consulta a API de participações ao carregar.
- `jsonpRequest(url)` — requisição JSONP com timeout de 10s.
- `window.__counterCallback(data)` — atualiza o contador de respostas.
- `animateCounter(id, valor)` — anima o número (easing cúbico, 1,2 s).
- `setupMobileNav()` — menu hambúrguer + overlay + ESC.
- `setupActiveNav()` — destaque de seção via IntersectionObserver.
- `setSafe(id, texto)` — helper que não quebra se o elemento não existir.
- `formatNumber(n)` / `formatPercent(p)` — formatação pt-BR.

**Contador:** chama `COUNTER_API + "?action=stats&callback=__counterCallback"`. Resposta `{visits, responses, updatedAt}`; exibe somente `responses`. Se a API falhar, o elemento mantém "--" — o site nunca quebra.

**Gráficos Chart.js:** 6 gráficos de barras (histórico, Atlas, mensal, por bioma, SP anual, SP junho), com tooltips em pt-BR e cores por faixa de valor.

## 9. Documentação — scripts/process_data.py

Script em Python (stdlib) que baixa `focos_mensal_br_YYYYMM.csv` do INPE (2010 a 8/2026), filtra o bioma "Mata Atlântica" e o estado de São Paulo, agrega por ano/mês e gera `data/fires_processed.json`.

> Observação: os CSVs incluem todos os satélites; os valores podem diferir dos exibidos no portal, que usa somente o satélite de referência (AQUA Tarde).

## 10. Integrações externas

**Google Forms:** botão e QR Code apontam para o formulário real de pesquisa de percepção ambiental.

**Google Apps Script (contador):** endpoint `?action=stats` retorna apenas dados agregados (nenhum dado pessoal). O portal usa somente o campo `responses`.

**QR Code:** qrcodejs (CDN) gera o código na cor verde do tema apontando para o formulário.

**Chart.js:** via CDN (cdn.jsdelivr.net), versão 4.4.7.

## 11. Publicação — GitHub Pages

```bash
git init
git add .
git commit -m "Mata Atlântica em Alerta - primeiro commit"
git remote add origin https://github.com/douglaslcsilva/projetoExtens-o.git
git branch -M main
git push -u origin main
```

No GitHub: **Settings → Pages → Deploy from a branch → main / (root) → Save**.  
URL pública: `https://douglaslcsilva.github.io/projetoExtens-o/`.  
Atualizações: `git add .` → `git commit` → `git push` (deploy automático).

## 12. Metodologia dos dados

- Satélite de referência: AQUA Tarde (MODIS, ~1 km).
- "Foco de queimada": detecção de fogo ativo em um pixel — não representa incêndio individual nem área queimada.
- Escopo: bioma Mata Atlântica (17 estados da Lei 11.428/2006), com recorte para SP.
- Período: 2010 a 2026 (parcial até 11/08/2026).
- Comparações usam períodos equivalentes (jun/2026 vs jun/histórico).
- Nenhum número inventado; todas as fontes em DATA_SOURCES.md.

## 13. Bibliografia

### Fontes primárias
1. INPE — Programa Queimadas. *Dados Abertos*. https://data.inpe.br/queimadas/dados-abertos/
2. INPE — Programa Queimadas. *TerraBrasilis — Estatísticas por estado*. https://terrabrasilis.dpi.inpe.br/queimadas/situacao-atual/estatisticas/estatisticas_estados/
3. INPE — Programa Queimadas. *Boletim InfoQueima, Vol. 11, Nº 06 (jun/2026)*. https://dataserver-coids.inpe.br/queimadas/queimadas/Infoqueima/2026/2026_06_infoqueima.pdf
4. SOS MATA ATLÂNTICA. *Mata Atlântica — Causas*. https://www.sosma.org.br/causas/mata-atlantica
5. SOS MATA ATLÂNTICA; INPE; et al. *Atlas da Mata Atlântica 2024-2025*. http://mtc-m21d.sid.inpe.br/col/sid.inpe.br/mtc-m21d/2026/05.19.14.25/doc/Atlas_Mata_Atlantica_2024-2025.pdf
6. SEMIL/SP. *Incêndios florestais em SP (jan–jul 2024)*. https://sigam.ambiente.sp.gov.br/sigam3/Repositorio/472/Documentos/IncendiosFlorestais01Jan31Jul2024.pdf
7. SEMIL/SP — CFB. *Balanço Operação SP Sem Fogo 2023*. https://smastr16.blob.core.windows.net/2001/2023/12/Operacao-SP-Sem-Fogo-2023_Balanco_2023_Site.pdf
8. G1/SETOR3. *Recorde de focos em SP (2024)*. https://g1.globo.com/sp/sao-paulo/noticia/2024/09/30/agosto-e-setembro-de-2024-sao-meses-com-mais-registros-de-focos-de-incendio-em-sp-desde-1998.ghtml
9. ISA — Instituto Socioambiental. *Dinâmica do fogo na Mata Atlântica 1985-2023 e o caso de 2024*. https://www.socioambiental.org
10. IPAM; ISA; SOS MA. *Análise citando Monitor do Fogo/MapBiomas*. https://mapbiomas.org
11. MAPBIOMAS FIRES. *Fact Sheet Coleção 3*. https://mapbiomas.org/produtos
12. OECO. *Focos de queimadas na Mata Atlântica superam em 13% índices do ano passado*. https://oeco.org.br
13. FOLHA DE S.PAULO. *Recorde de focos em SP (2010/2024)* — dados INPE/BDQueimadas.
14. Dissertação UFV (BDQueimadas) — série 2016 da Mata Atlântica.

### Referências técnicas
1. CHART.JS. *Documentação oficial v4*. https://www.chartjs.org/docs/latest/
2. QRCODEJS. *QR Code generator JavaScript*. https://github.com/davidshimjs/qrcodejs
3. GOOGLE APPS SCRIPT. *Web apps — doGet, ContentService, JSONP*. https://developers.google.com/apps-script
4. GITHUB PAGES. *Documentação*. https://docs.github.com/pages
5. MDN — MOZILLA DEVELOPER NETWORK. *HTML, CSS, JavaScript*. https://developer.mozilla.org
6. W3C. *WCAG 2.1*. https://www.w3.org/TR/WCAG21/

## 14. Limitações e melhorias futuras

**Limitações:** série anual completa do bioma com lacunas em data.js; dados estaduais de SP incluem todos os biomas; sem granularidade municipal validada; contador mostra apenas total agregado (sem dados pessoais).

**Melhorias futuras:** rodar process_data.py para completar a série histórica; mapa interativo do Vale do Paraíba; automatizar atualização com GitHub Actions; rastrear origem do QR Code; relatório de acessos anônimo se desejado.

---

*Documento gerado em 09/09/2026 — Mata Atlântica em Alerta · Projeto de Extensão · Análise e Desenvolvimento de Sistemas*
