# Fontes de Dados e Metodologia

Este documento registra todas as fontes de dados utilizadas no portal web educacional "Mata Atlântica em Alerta".

---

## 1. Instituto Nacional de Pesquisas Espaciais — INPE / Programa Queimadas

### Fonte primária para dados quantitativos de queimadas

| Campo | Detalhe |
|-------|---------|
| **Organização** | Instituto Nacional de Pesquisas Espaciais (INPE) |
| **Programa** | Programa Queimadas |
| **URL principal** | https://terrabrasilis.dpi.inpe.br/queimadas/situacao-atual/estatisticas/estatisticas_estados/ |
| **URL dados abertos** | https://data.inpe.br/queimadas/dados-abertos/ |
| **URL situação atual** | https://terrabrasilis.dpi.inpe.br/queimadas/situacao-atual/ |
| **Data de consulta** | 09/09/2026 |
| **Satélite de referência** | AQUA Tarde (sensor MODIS, pixel ~1km) |
| **Filtros utilizados** | Bioma: Mata Atlântica; Estado: São Paulo |
| **Período analisado** | 2010 até 11/08/2026 (parcial) |

### Dados utilizados

#### Boletim InfoQueima — Junho/2026
- **Arquivo**: `2026_06_infoqueima.pdf`
- **URL**: https://dataserver-coids.inpe.br/queimadas/queimadas/Infoqueima/2026/2026_06_infoqueima.pdf
- **Dados extraídos**:
  - Focos mensais por bioma (janeiro a junho de 2026)
  - Focos mensais nacionais (janeiro a junho de 2026)
  - Média histórica por bioma (2010-2024)
  - Comparativo junho/2026 vs junho/2025
- **Dados específicos Mata Atlântica (junho/2026)**: 428 focos (média histórica: 711)
- **Dados específicos São Paulo (junho/2026)**: 58 focos (média histórica: 241)

#### Boletim InfoQueima — Julho/2026
- **Arquivo**: `2026_07_infoqueima.pdf`
- **URL**: https://dataserver-coids.inpe.br/queimadas/queimadas/Infoqueima/2026/2026_07_infoqueima.pdf
- **Status**: Consultado para complementação

### Observações metodológicas
- O satélite de referência é o AQUA Tarde, que opera o sensor MODIS com resolução espacial de aproximadamente 1km.
- Um "foco de queimada" é uma detecção de fogo ativo dentro de um pixel observado pelo sensor.
- Um foco NÃO representa necessariamente um incêndio individual ou uma área específica queimada.
- Os focos são indicadores de ocorrência e tendências, não medições absolutas de área queimada.
- Os dados do boletim InfoQueima utilizam o satélite de referência (AQUA), que gera números menores que a contagem de todos os satélites combinados.
- Os dados de situação atual referem-se ao período de 01/01/2026 até 11/08/2026.

### CSVs disponíveis para processamento
- **URL base**: https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/mensal/Brasil/
- **Formato**: Arquivos CSV mensais (`focos_mensal_br_YYYYMM.csv`)
- **Observação**: Estes arquivos contêm TODOS os satélites, não apenas o de referência. Os númerosresultantes podem diferir dos apresentados no portal que utiliza apenas AQUA.
- **Script de processamento**: `/scripts/process_data.py`

---

## 2. Fundação SOS Mata Atlântica

### Fonte primária para informações sobre o bioma

| Campo | Detalhe |
|-------|---------|
| **Organização** | Fundação SOS Mata Atlântica |
| **URL principal** | https://www.sosma.org.br/causas/mata-atlantica |
| **Data de consulta** | 09/09/2026 |

### Dados utilizados

#### Caracterização do bioma
- **Área de aplicação da Lei da Mata Atlântica**: 130.973.638 hectares
- **Percentual remanescente**: ~24% da cobertura original
- **Florestas maduras (monitoradas pelo Atlas)**: ~12,4% da área original
- **Número de estados**: 17 estados brasileiros
- **População que vive no bioma**: 72% dos brasileiros
- **PIB nacional concentrado**: 80%
- **Fonte**: https://www.sosma.org.br/causas/mata-atlantica

#### Atlas dos Remanescentes Florestais
- **Edição mais recente**: Atlas da Mata Atlântica 2024-2025 (maio/2026)
- **URL**: http://mtc-m21d.sid.inpe.br/col/sid.inpe.br/mtc-m21d/2026/05.19.14.25/doc/Atlas_Mata_Atlantica_2024-2025.pdf
- **Dados utilizados**: Histórico de desflorestamento (tabela 1 do Atlas)
- **Período**: 1985-2025
- **Resultado 2024-2025**: 8.658 hectares desmatados (menor valor da série histórica)
- **Redução vs ano anterior**: 40%

---

## 3. Fontes complementares verificadas

### Operação São Paulo Sem Fogo — SEMIL/CFB
| Campo | Detalhe |
|-------|---------|
| **Organização** | Secretaria de Meio Ambiente, Infraestrutura e Logística (SEMIL/SP) |
| **Documento** | Balanço Operação SP Sem Fogo 2023 |
| **URL** | https://smastr16.blob.core.windows.net/2001/2023/12/Operacao-SP-Sem-Fogo-2023_Balanco_2023_Site.pdf |
| **Dados**: Focos de calor AQUA M-T no estado de São Paulo (2010-2023) |

### SIGAM/SEMIL-SP — Incêndios Florestais
| Campo | Detalhe |
|-------|---------|
| **Documento** | Incêndios Florestais no Estado de São Paulo (Jan-Jul 2024) |
| **URL** | https://sigam.ambiente.sp.gov.br/sigam3/Repositorio/472/Documentos/IncendiosFlorestais01Jan31Jul2024.pdf |
| **Dados**: Focos AQUA M-T em SP (2022: 1.599; 2023: 1.666; Jan-Jul 2024: 1.798) |

### Folha de S.Paulo / Setor3
| Campo | Detalhe |
|-------|---------|
| **Artigo** | "Agosto e setembro de 2024 são meses com mais registros de focos de incêndio em SP desde 1998" |
| **URL** | https://g1.globo.com/sp/sao-paulo/noticia/2024/09/30/agosto-e-setembro-de-2024-sao-meses-com-mais-registros-de-focos-de-incendio-em-sp-desde-1998.ghtml |
| **Dados**: SP Jan-Set 2024: 7.873 focos (novo recorde) |

### ISA / IPAM / SOS Mata Atlântica
| Campo | Detalhe |
|-------|---------|
| **Estudo** | "Dinâmica do fogo na Mata Atlântica entre 1985 e 2023 e o caso de 2024" |
| **Dados**: Em 2024, 993.117 hectares queimados na Mata Atlântica (jan-out), aumento de 636% vs 2023 |
| **Publicação**: janeiro de 2025 |

### MapBiomas Fogo
| Campo | Detalhe |
|-------|---------|
| **Relatório** | Fact Sheet Coleção 3 (junho/2024) |
| **Dados**: Área queimada por bioma (1985-2023) |
| **Mata Atlântica**: 7.489.733 hectares queimados em 39 anos |

### Observatório Justiça e Conservação (OECO)
| Campo | Detalhe |
|-------|---------|
| **Artigo** | "Focos de queimadas na Mata Atlântica superam em 13% índices do ano passado" (2020) |
| **URL** | https://oeco.org.br/reportagens/focos-de-queimadas-na-mata-atlantica-superam-em-13-indices-do-ano-passado/ |
| **Dados**: MA 2010: 20.610 focos; MA 2019: 18.177 focos (satélite de referência) |

---

## 4. Metodologia de análise

### Regra de comparação equivalente (2024 × 2025 × 2026)
Como 2026 ainda não terminou, a comparação direta com anos completos seria inadequada. A metodologia adotada é:

1. **Determinar a última data disponível**: 11/08/2026
2. **Comparar apenas o período equivalente**: janeiro a agosto de cada ano
3. **Não comparar**: 8 meses de 2026 com 12 meses de 2024 ou 2025

### Definição de "foco de queimada"
Conforme documentação oficial do Programa Queimadas/INPE:
- Um foco é a detecção de fogo ativo dentro de um pixel observado pelo sensor de satélite.
- NÃO representa necessariamente um incêndio individual.
- NÃO representa necessariamente uma área queimada de tamanho específico.
- Uma grande ocorrência pode gerar vários focos.
- Várias pequenas ocorrências dentro da resolução do sensor podem aparecer como um foco.
- **Foco detectado ≠ tamanho da área queimada**
- Os dados são especialmente úteis para observar tendências ao longo do tempo.

### Satélite de referência
O satélite de referência do Programa Queimadas é o **AQUA Tarde** (sensor MODIS). Quando o portal apresenta dados desse satélite, os números são menores do que a contagem de todos os satélites combinados. Isso é intencional, pois o satélite de referência oferece maior consistência na série temporal.

### Fontes dos dados de São Paulo
Os dados de São Paulo apresentados no portal são do satélite AQUA M-T (MODIS) e incluem todos os biomas do estado, não apenas a Mata Atlântica. Isso é indicado claramente no portal.

---

## 5. Script de processamento

Para reprocessar os dados com os CSVs oficiais do INPE:

```bash
cd scripts/
python process_data.py
```

O script irá:
1. Baixar os CSVs mensais do servidor do INPE (2010-2026)
2. Filtrar por bioma "Mata Atlântica"
3. Filtrar por estado "São Paulo"
4. Gerar o arquivo `data/fires_processed.json`

**Atenção**: Os CSVs do INPE são arquivos grandes (5-350MB por mês). O download pode levar vários minutos dependendo da velocidade da conexão.

---

## 6. Limitações

1. Os dados anuais completos para o bioma Mata Atlântica (série 2010-2026) não puderam ser obtidos integralmente através da pesquisa web realizada. Apenas pontos específicos foram verificados em fontes oficiais.
2. O script de processamento (`process_data.py`) pode ser utilizado para obter a série completa, mas requer conexão com a internet e tempo de processamento.
3. Os dados de São Paulo apresentados incluem todos os biomas do estado, não apenas a Mata Atlântica.
4. Não foi possível obter dados de nível municipal (São José dos Campos) com granularidade suficiente para análise confiável.
5. A região do Vale do Paraíba não possui dados consolidados disponíveis publicamente que permitam uma análise regional metodologicamente correta.

---

*Documento atualizado em: 09/09/2026*
