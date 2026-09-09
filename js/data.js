const FIRE_DATA = {
  metadata: {
    scope: "Bioma Mata Atlântica — Brasil",
    scopeNote: "Recorte: bioma Mata Atlântica nos 17 estados da Lei da Mata Atlântica (Lei 11.428/2006)",
    satellite: "AQUA Tarde (MODIS) — satélite de referência do Programa Queimadas/INPE",
    lastUpdate: "11/08/2026",
    period: "Janeiro a agosto de 2026 (parcial)",
    source: "Programa Queimadas / Instituto Nacional de Pesquisas Espaciais (INPE)",
    sourceUrl: "https://terrabrasilis.dpi.inpe.br/queimadas/situacao-atual/estatisticas/estatisticas_estados/",
    dataSourceUrl: "https://data.inpe.br/queimadas/dados-abertos/",
    consultationDate: "09/09/2026",
    methodologyNote: "Dados do satélite de referência AQUA Tarde (sensor MODIS, pixel ~1km). Focos representam detecções de fogo ativo e NÃO correspondem diretamente a incêndios individuais ou áreas queimadas."
  },
  mataAtlantica: {
    areaOriginal: 131007456,
    areaRestante: 24,
    areaMadura: 12.4,
    estados: 17,
    populacaoPercentual: 72,
    pibPercentual: 80,
    areaOriginalLabel: "131 milhões de hectares",
    fonte: "Fundação SOS Mata Atlântica",
    fonteUrl: "https://www.sosma.org.br/causas/mata-atlantica"
  },
  historical: [
    { year: 2010, count: 20610, note: "Maior valor da série até 2019" },
    { year: 2011, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2012, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2013, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2014, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2015, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2016, count: 15283, note: "Fonte: dissertação UFV-verificada via BDQueimadas" },
    { year: 2017, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2018, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2019, count: 18177, note: "Fonte: OECO/Observatório Justiça e Conservação, citando INPE" },
    { year: 2020, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2021, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2022, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2023, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2024, count: null, note: "Ano com maior área queimada desde 1985 (993.117 ha, fonte: MapBiomas/ISA)" },
    { year: 2025, count: null, note: "Dados não disponíveis na pesquisa realizada" },
    { year: 2026, count: null, partial: true, note: "Ano parcial — dados até 11/08/2026" }
  ],
  juneData2026: {
    fires2026: 428,
    historicalAverage: 711,
    diffPercent: -39.88,
    fires2025: 360,
    diff2025Percent: 18.89,
    interpretation: "Moderadamente abaixo da média",
    source: "Boletim InfoQueima, Vol. 11, Nº 06, junho/2026, INPE"
  },
  saoPaulo: {
    scope: "Estado de São Paulo",
    note: "Dados do satélite de referência AQUA M-T (MODIS). Recorte estadual, não filtrado por bioma.",
    records: [
      { year: 2010, count: 7291, note: "Recorde histórico até 2023", source: "INPE/BDQueimadas via Folha de S.Paulo" },
      { year: 2020, count: 5993, source: "Operação SP Sem Fogo 2023, SEMIL/CFB" },
      { year: 2021, count: 5387, source: "Operação SP Sem Fogo 2023, SEMIL/CFB" },
      { year: 2022, count: 1599, source: "SIGAM/SEMIL-SP, Jul/2024" },
      { year: 2023, count: 1666, source: "SIGAM/SEMIL-SP, Jul/2024" },
      { year: 2024, count: 7873, note: "Jan-Set 2024 — novo recorde na série desde 1998", source: "Folha de S.Paulo/Setor3, 30/09/2024, citando INPE" }
    ],
    june2026: {
      fires2026: 58,
      historicalAverage: 241,
      diffPercent: -76.01,
      interpretation: "Moderadamente abaixo da média",
      source: "Boletim InfoQueima, Vol. 11, Nº 06, junho/2026, INPE"
    }
  },
  monthlyComparison: {
    scope: "Brasil — todos os biomas (satélite de referência AQUA Tarde)",
    note: "Dados nacionais para contextualização. O portal foca na Mata Atlântica.",
    data: [
      { month: "Janeiro", avg: 404, y2026: 456, diff2026: 10.40 },
      { month: "Fevereiro", avg: 2204, y2026: 1860, diff2026: -15.63 },
      { month: "Março", avg: 2795, y2026: 1967, diff2026: -29.63 },
      { month: "Abril", avg: 2373, y2026: 2035, diff2026: -14.27 },
      { month: "Maio", avg: 3902, y2026: 3831, diff2026: -1.83 },
      { month: "Junho", avg: 7126, y2026: 5209, diff2026: -26.91 }
    ],
    source: "Boletim InfoQueima, Vol. 11, Nº 06, junho/2026, INPE"
  },
  biomaComparison: [
    { name: "Amazônia", fires2026: 1366, avg: 1969, fires2025: 1650 },
    { name: "Cerrado", fires2026: 3011, avg: 3875, fires2025: 3681 },
    { name: "Mata Atlântica", fires2026: 428, avg: 711, fires2025: 360 },
    { name: "Caatinga", fires2026: 351, avg: 202, fires2025: 337 },
    { name: "Pantanal", fires2026: 46, avg: 297, fires2025: 16 },
    { name: "Pampa", fires2026: 7, avg: 69, fires2025: 16 }
  ],
  finding2024: {
    areaQueimada: 993117,
    areaUnit: "hectares",
    period: "Janeiro a outubro de 2024",
    increaseVs2023: 636,
    mainState: "São Paulo",
    mainCause: "Áreas privadas e agrícolas (cana-de-açúcar e pastagens)",
    source: "ISA/IPAM/SOS Mata Atlântica, jan/2025, citando Monitor do Fogo/MapBiomas",
    note: "Maior volume registrado desde 2019"
  },
  atlasDeforestation: [
    { period: "2017-2018", hectares: 11399 },
    { period: "2018-2019", hectares: 14375 },
    { period: "2019-2020", hectares: 13053 },
    { period: "2020-2021", hectares: 21642 },
    { period: "2021-2022", hectares: 20075 },
    { period: "2022-2023", hectares: 14697 },
    { period: "2023-2024", hectares: 14366 },
    { period: "2024-2025", hectares: 8658, note: "Menor valor da série histórica (1985-2024)" }
  ]
};
