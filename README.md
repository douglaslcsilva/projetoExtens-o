# Mata Atlântica em Alerta

Portal web educacional — Projeto de Extensão Universitária

## Sobre

Portal web educacional que apresenta dados reais do INPE sobre queimadas na Mata Atlântica, explica o monitoramento por satélite e incentiva atitudes sustentáveis.

Desenvolvido como parte do **Projeto de Extensão — Inovação, Ciência e Transformação Digital**, do curso de **Análise e Desenvolvimento de Sistemas**.

**Aluno**: Douglas Daniel Lopes Cardoso da Silva

## Estrutura

```
projeto-mata-atlantica/
├── index.html              # Página principal (single page)
├── css/
│   └── style.css           # Estilos e responsividade
├── js/
│   ├── data.js             # Dados verificados de fontes oficiais
│   └── main.js             # Gráficos, interações, QR Code
├── assets/
│   ├── images/             # Imagens do projeto
│   └── terrabrasilis/      # Screenshots do TerraBrasilis
├── data/
│   └── fires_processed.json # Dados processados (opcional)
├── scripts/
│   └── process_data.py     # Script para processar CSVs do INPE
├── DATA_SOURCES.md         # Documentação de fontes e metodologia
└── README.md               # Este arquivo
```

## Como executar localmente

### Opção 1: Servidor HTTP simples (recomendado)

```bash
# Python 3
cd projeto-mata-atlantica/
python -m http.server 8000

# Abrir no navegador:
# http://localhost:8000
```

### Opção 2: Abrir diretamente (limitações)

O arquivo `index.html` pode ser aberto diretamente no navegador, mas algumas funcionalidades que dependem de `fetch()` podem não funcionar no protocolo `file://`. Use a Opção 1 para melhor experiência.

## Processamento de dados

Para reprocessar os dados oficiais do INPE:

```bash
cd scripts/
python process_data.py
```

Isso irá baixar os CSVs mensais do INPE e gerar o arquivo `data/fires_processed.json`.

## Publicação

O site é estático (HTML/CSS/JavaScript puro) e pode ser publicado em qualquer hospedagem estática:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

Basta copiar os arquivos para a hospedagem escolhida.

## Tecnologias

- HTML5
- CSS3 (variáveis, Flexbox, Grid, media queries)
- JavaScript Vanilla (sem frameworks)
- Chart.js (via CDN, para gráficos)
- QR Code Generator (via CDN)

## Fontes de dados

- **INPE / Programa Queimadas**: https://data.inpe.br/queimadas/dados-abertos/
- **SOS Mata Atlântica**: https://www.sosma.org.br/causas/mata-atlantica

Consulte `DATA_SOURCES.md` para detalhes completos sobre fontes e metodologia.

## Licença

Este é um projeto acadêmico sem vínculo institucional oficial com o INPE ou SOS Mata Atlântica. As organizações são utilizadas como fontes de informação.

## Contato

Douglas Daniel Lopes Cardoso da Silva
Curso: Análise e Desenvolvimento de Sistemas
Projeto de Extensão — Inovação, Ciência e Transformação Digital
