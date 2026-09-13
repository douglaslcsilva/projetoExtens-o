# Fontes de Dados e Metodologia

Este documento registra as fontes de dados utilizadas no portal web educacional "Mata Atlântica em Alerta".

**Política de fontes:**
- Os **dados e gráficos** do portal têm fonte única: o **TerraBrasilis** (INPE).
- O **conteúdo educativo** usa apenas: **SOS Mata Atlântica**, **BDQueimadas** (INPE) e **Atlas da Mata Atlântica** (INPE/SOS Mata Atlântica).
- Nenhum dado de organizações com fins lucrativos ou de empresas privadas é utilizado.

---

## 1. TerraBrasilis — Focos de Queimada (INPE)

**Fonte exclusiva para os dados e gráficos do portal.**

| Campo | Detalhe |
|-------|---------|
| **Organização** | Instituto Nacional de Pesquisas Espaciais (INPE) — Programa Queimadas |
| **Painel** | Queimadas × Desmatamento — Focos por Bioma (agregado) |
| **URL** | https://terrabrasilis.dpi.inpe.br/app/dashboard/fires/biomes/aggregated/ |
| **Fonte de dados (JSON)** | https://terrabrasilis.dpi.inpe.br/file-delivery/download/dashboard-fires/fof_prodes |
| **Data de extração** | 09/09/2026 |
| **Satélite de referência** | AQUA Tarde (sensor MODIS, pixel ~1 km) |
| **Filtro utilizado** | Bioma: Mata Atlântica |
| **Período** | Janeiro de 2018 a setembro de 2026 |

### Série anual — Mata Atlântica (focos de queimada)

| Ano | Focos | Observação |
|-----|-------|------------|
| 2018 | 6.961 | Ano completo |
| 2019 | 18.267 | Ano completo |
| 2020 | 18.771 | Ano completo |
| 2021 | 19.773 | Ano completo |
| 2022 | 10.870 | Ano completo |
| 2023 | 11.630 | Ano completo |
| 2024 | 23.115 | Maior total da série |
| 2025 | 12.367 | Ano completo |
| 2026 | 5.027 | Parcial — janeiro a setembro |

### Mensal 2026 vs média 2019-2025 (jan–set)

| Mês | 2026 | Média 2019-2025 |
|-----|------|-----------------|
| Janeiro | 536 | 409 |
| Fevereiro | 354 | 423 |
| Março | 502 | 578 |
| Abril | 530 | 488 |
| Maio | 261 | 678 |
| Junho | 425 | 768 |
| Julho | 868 | 1.716 |
| Agosto | 1.273 | 4.157 |
| Setembro* | 278 | 4.038 |

\* Setembro/2026 em curso (dados até 09/09/2026).

### Focos por estado (2018-2026)

| Estado | Focos |
|--------|-------|
| Minas Gerais | 29.285 |
| São Paulo | 24.608 |
| Paraná | 19.934 |
| Santa Catarina | 14.118 |
| Bahia | 11.848 |
| Rio Grande do Sul | 10.121 |
| Rio de Janeiro | 5.137 |
| Espírito Santo | 4.135 |
| Mato Grosso do Sul | 2.744 |
| Pernambuco | 1.696 |

### Observações metodológicas
- Um "foco de queimada" é a detecção de fogo ativo dentro de um pixel observado pelo sensor (≈1 km).
- Um foco **não** representa necessariamente um incêndio individual nem uma área queimada específica.
- Os dados são somados nas classes do painel: Vegetação Nativa, Desmatamento Recente, Desmatamento Consolidado e Outros.
- No dashboard do TerraBrasilis, o intervalo de download é restrito a um mesmo ano (01 de janeiro a 31 de dezembro).

---

## 2. BDQueimadas — Dados Abertos (INPE)

| Campo | Detalhe |
|-------|---------|
| **Organização** | INPE — Programa Queimadas |
| **URL** | https://data.inpe.br/queimadas/dados-abertos/ |
| **Uso no portal** | Conteúdo educativo e referência metodológica sobre focos de calor |

---

## 3. SOS Mata Atlântica

| Campo | Detalhe |
|-------|---------|
| **Organização** | Fundação SOS Mata Atlântica |
| **URL** | https://www.sosma.org.br/causas/mata-atlantica |
| **Uso no portal** | Conteúdo educativo sobre o bioma: biodiversidade, população (72%), PIB (80%), rios |

---

## 4. Atlas da Mata Atlântica 2024-2025 (INPE / SOS Mata Atlântica)

| Campo | Detalhe |
|-------|---------|
| **Responsáveis** | INPE em parceria com a Fundação SOS Mata Atlântica |
| **URL** | http://mtc-m21d.sid.inpe.br/col/sid.inpe.br/mtc-m21d/2026/05.19.14.25/doc/Atlas_Mata_Atlantica_2024-2025.pdf |
| **Período** | 2024-2025 (20ª edição) |
| **Dado usado** | 12,4% da cobertura original em florestas maduras monitoradas pelo Atlas |
| **Área de aplicação da Lei da Mata Atlântica** | 130.973.638 hectares (17 estados) |

---

## Definição de "foco de queimada"

Conforme documentação oficial do Programa Queimadas/INPE:
- Foco é a detecção de fogo ativo dentro de um pixel observado pelo sensor de satélite.
- Não representa necessariamente um incêndio individual.
- Não representa necessariamente uma área queimada específica.
- Os dados são especialmente úteis para observar tendências ao longo do tempo.

---

*Documento atualizado em: 09/09/2026*