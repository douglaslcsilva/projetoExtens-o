#!/usr/bin/env python3
"""
Script para download e processamento de dados de focos de queimadas do INPE.
Fonte: Programa Queimadas / Instituto Nacional de Pesquisas Espaciais (INPE)
URL: https://data.inpe.br/queimadas/dados-abertos/

Este script baixa arquivos CSV mensais e filtra focos por:
- Bioma Mata Atlântica
- Estado de São Paulo (dentro do bioma Mata Atlântica)

Saída: data/fires_processed.json
"""

import csv
import io
import json
import os
import sys
import urllib.request
import urllib.error
from collections import defaultdict

BASE_URL = "https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/mensal/Brasil/"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "fires_processed.json")

YEARS = range(2010, 2027)
MONTHS = range(1, 13)


def download_csv(year, month):
    """Download a monthly CSV file from INPE."""
    filename = f"focos_mensal_br_{year}{month:02d}.csv"
    url = BASE_URL + filename
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as response:
            return response.read().decode("utf-8", errors="replace")
    except (urllib.error.URLError, urllib.error.HTTPError, Exception) as e:
        print(f"  [AVISO] Erro ao baixar {filename}: {e}")
        return None


def count_fires(csv_text, year, month):
    """Count fire spots for Mata Atlântica and São Paulo."""
    if not csv_text:
        return 0, 0

    ma_count = 0
    sp_ma_count = 0

    reader = csv.DictReader(io.StringIO(csv_text))

    for row in reader:
        bioma = row.get("bioma", "").strip()
        estado = row.get("estado", "").strip()

        if "Mata Atlântica" in bioma or "MATA ATLANTICA" in bioma.upper():
            ma_count += 1
            if "São Paulo" in estado or "SAO PAULO" in estado.upper():
                sp_ma_count += 1

    return ma_count, sp_ma_count


def main():
    print("=" * 60)
    print("Processamento de dados de focos de queimadas - INPE")
    print("Fonte: Programa Queimadas / INPE")
    print("=" * 60)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    annual_ma = defaultdict(int)
    annual_sp = defaultdict(int)
    monthly_ma = defaultdict(lambda: defaultdict(int))
    monthly_sp = defaultdict(lambda: defaultdict(int))
    processed_months = []

    for year in YEARS:
        for month in MONTHS:
            if year == 2026 and month > 8:
                continue

            print(f"Baixando {year}/{month:02d}...", end=" ", flush=True)
            csv_text = download_csv(year, month)

            if csv_text:
                ma, sp = count_fires(csv_text, year, month)
                annual_ma[year] += ma
                annual_sp[year] += sp
                monthly_ma[year][month] = ma
                monthly_sp[year][month] = sp
                processed_months.append(f"{year}-{month:02d}")
                print(f"MA: {ma:,} | SP-MA: {sp:,}")
            else:
                print("FALHOU")

    result = {
        "metadata": {
            "source": "Programa Queimadas / Instituto Nacional de Pesquisas Espaciais (INPE)",
            "sourceUrl": "https://data.inpe.br/queimadas/dados-abertos/",
            "satellite": "Todos os satélites (ARQUIVO CSV COMPLETO)",
            "note": "Este processamento utiliza TODOS os satélites, não apenas o satélite de referência AQUA. Os números podem diferir dos exibidos no portal que utiliza apenas AQUA.",
            "processedMonths": len(processed_months),
            "lastProcessed": processed_months[-1] if processed_months else None,
            "consultationDate": "09/09/2026"
        },
        "annual": {
            "mataAtlantica": {str(y): annual_ma[y] for y in sorted(annual_ma.keys())},
            "saoPauloNaMA": {str(y): annual_sp[y] for y in sorted(annual_sp.keys())}
        },
        "monthly": {
            "mataAtlantica": {str(y): {str(m): monthly_ma[y][m] for m in sorted(monthly_ma[y].keys())} for y in sorted(monthly_ma.keys())},
            "saoPauloNaMA": {str(y): {str(m): monthly_sp[y][m] for m in sorted(monthly_sp[y].keys())} for y in sorted(monthly_sp.keys())}
        }
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 60)
    print(f"Processamento concluído!")
    print(f"Arquivo gerado: {OUTPUT_FILE}")
    print(f"Meses processados: {len(processed_months)}")
    print("\nResumo anual - Mata Atlântica:")
    for year in sorted(annual_ma.keys()):
        print(f"  {year}: {annual_ma[year]:,} focos")
    print("\nResumo anual - São Paulo (na MA):")
    for year in sorted(annual_sp.keys()):
        print(f"  {year}: {annual_sp[year]:,} focos")
    print("=" * 60)


if __name__ == "__main__":
    main()
