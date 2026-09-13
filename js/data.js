const FIRE_DATA = {
  metadata: {
    scope: "Bioma Mata Atlântica — Brasil",
    scopeNote: "Recorte: bioma Mata Atlântica nos 17 estados da Lei da Mata Atlântica (Lei 11.428/2006)",
    satellite: "Os satélites do INPE observam o Brasil do espaço e detectam os focos de calor.",
    lastUpdate: "09/09/2026",
    period: "Janeiro de 2018 a setembro de 2026",
    source: "TerraBrasilis / Programa Queimadas — Instituto Nacional de Pesquisas Espaciais (INPE)",
    sourceUrl: "https://terrabrasilis.dpi.inpe.br/app/dashboard/fires/biomes/aggregated/",
    dataSourceUrl: "https://terrabrasilis.dpi.inpe.br/app/dashboard/fires/biomes/aggregated/",
    consultationDate: "09/09/2026",
    methodologyNote: "Para gerar esses dados, os satélites do INPE detectam os focos de calor e um programa de computador organiza as informações. Depois, o portal TerraBrasilis apresenta tudo de forma clara. Um 'foco de queimada' é uma marca de calor vista do espaço — ele NÃO representa um incêndio inteiro nem a área exata queimada."
  },
  mataAtlantica: {
    areaOriginal: 131007456,
    areaOriginalLabel: "131 milhões de hectares",
    florestasMaduras: 12.4,
    estados: 17,
    populacaoPercentual: 72,
    pibPercentual: 80,
    fonteSOS: "Fundação SOS Mata Atlântica",
    fonteSOSUrl: "https://www.sosma.org.br/causas/mata-atlantica",
    fonteAtlas: "Atlas da Mata Atlântica 2024-2025 (INPE / SOS Mata Atlântica)",
    fonteAtlasUrl: "http://mtc-m21d.sid.inpe.br/col/sid.inpe.br/mtc-m21d/2026/05.19.14.25/doc/Atlas_Mata_Atlantica_2024-2025.pdf",
    remanescenteNote: "12,4% correspondem às florestas maduras monitoradas pelo Atlas — fragmentos acima de 3 hectares, sem sinais aparentes de degradação, mapeados pelo INPE em parceria com a SOS Mata Atlântica."
  },
  annual: [
    { year: 2018, count: 6961 },
    { year: 2019, count: 18267 },
    { year: 2020, count: 18771 },
    { year: 2021, count: 19773 },
    { year: 2022, count: 10870 },
    { year: 2023, count: 11630 },
    { year: 2024, count: 23115, note: "Maior total da série TerraBrasilis 2018-2026" },
    { year: 2025, count: 12367 },
    { year: 2026, count: 5027, partial: true, note: "Ano em curso — dados de janeiro a setembro de 2026" }
  ],
  peak2024: 23115,
  ytd2026: {
    count: 5027,
    months: "janeiro a setembro de 2026 (parcial)",
    note: "Setembro/2026 ainda está em curso (dados até 09/09/2026)."
  },
  monthly2026: [
    { month: "Janeiro", value: 536, avg: 409 },
    { month: "Fevereiro", value: 354, avg: 423 },
    { month: "Março", value: 502, avg: 578 },
    { month: "Abril", value: 530, avg: 488 },
    { month: "Maio", value: 261, avg: 678 },
    { month: "Junho", value: 425, avg: 768 },
    { month: "Julho", value: 868, avg: 1716 },
    { month: "Agosto", value: 1273, avg: 4157 },
    { month: "Setembro", value: 278, avg: 4038, partial: true }
  ],
  avgPeriod: "Média 2019-2025 (mesmos meses)",
  ufTotal: [
    { uf: "Minas Gerais", count: 29285 },
    { uf: "São Paulo", count: 24608, highlight: true },
    { uf: "Paraná", count: 19934 },
    { uf: "Santa Catarina", count: 14118 },
    { uf: "Bahia", count: 11848 },
    { uf: "Rio Grande do Sul", count: 10121 },
    { uf: "Rio de Janeiro", count: 5137 },
    { uf: "Espírito Santo", count: 4135 },
    { uf: "Mato Grosso do Sul", count: 2744 },
    { uf: "Pernambuco", count: 1696 }
  ],
  sp2024: 7099,
  spNote: "Em 2024, São Paulo foi o estado com mais focos registrados no bioma (7.099), maior número do estado em toda a série 2018-2026.",
  periodNote: "Os totais somam as áreas observadas pelos satélites do INPE no bioma Mata Atlântica, conforme o portal TerraBrasilis."
};