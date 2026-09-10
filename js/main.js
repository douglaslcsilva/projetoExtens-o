/* ==========================================================================
   Mata Atlântica em Alerta — JavaScript Principal
   Gráficos, interações e funcionalidades
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Google Forms placeholder ---------- */
  var GOOGLE_FORMS_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdZTCjDHHZe6QuzB6OsygMpYzsfBPFZ-gQeCYMoouUuKqiG5Q/viewform?usp=sharing&ouid=115903134200025727500";

  /* ---------- Counter API ---------- */
  var COUNTER_API = "https://script.google.com/macros/s/AKfycbzAYitvMzctgxXXgfMbyGWJb3ZhQTx4DVrVhuru246rD3j4DXF7nZ8wYKFagNZFwd7wWQ/exec";

  /* ---------- Fontes dos gráficos ---------- */
  var URL_INFOQUEIMA = "https://dataserver-coids.inpe.br/queimadas/queimadas/Infoqueima/2026/2026_06_infoqueima.pdf";
  var URL_BDQUEIMADAS = "https://terrabrasilis.dpi.inpe.br/app/dashboard/fires/biomes/aggregated/";

  /* ---------- Wait for DOM ---------- */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    renderHeroStats();
    renderMonitoramentoSource();
    renderDados();
    renderComparativo();
    renderRegiao();
    renderPrevencao();
    renderParticipar();
    setupImpacto();
    setupMobileNav();
    setupActiveNav();
    initSiglaTooltips();
    setupVideoFacade();
  }

  /* ==========================================================================
     1. Hero Stats
     ========================================================================== */

  function renderHeroStats() {
    var d = FIRE_DATA;
    setSafe("hero-ma-remaining", d.mataAtlantica.areaRestante + "%");
    setSafe("hero-people", d.mataAtlantica.populacaoPercentual + "%");
    setSafe("hero-2024-area", formatNumber(d.finding2024.areaQueimada));
    setSafe("hero-source", "Fonte: " + d.finding2024.source);
  }

  /* ==========================================================================
     2. Monitoramento
     ========================================================================== */

  function renderMonitoramentoSource() {
    setSafe("monitoramento-source", FIRE_DATA.metadata.methodologyNote);
  }

  /* ==========================================================================
     3. Dados
     ========================================================================== */

  function renderDados() {
    var d = FIRE_DATA;
    setSafe("dados-intro", "Dados do satélite de referência AQUA Tarde (MODIS) — " +
      d.metadata.scopeNote + ". Última atualização: " + d.metadata.lastUpdate + ".");

    var jd = d.juneData2026;
    setSafe("stat-june-ma", formatNumber(jd.fires2026));
    setSafe("stat-june-ma-detail", "Média histórica (jun): " + formatNumber(jd.historicalAverage) +
      " → " + jd.interpretation + " (" + formatPercent(jd.diffPercent) + ")");

    var spj = d.saoPaulo.june2026;
    setSafe("stat-june-sp", formatNumber(spj.fires2026));
    setSafe("stat-june-sp-detail", "Média histórica (jun): " + formatNumber(spj.historicalAverage) +
      " → " + spj.interpretation + " (" + formatPercent(spj.diffPercent) + ")");

    setSafe("stat-2024-area", formatNumber(d.finding2024.areaQueimada) + " ha");
    setSafe("stat-2024-detail", d.finding2024.period + " — +" + d.finding2024.increaseVs2023 + "% vs 2023 (" +
      d.finding2024.note + ")");

    renderHistoricalChart();
    renderAtlasChart();
  }

  /* ---------- Historical Chart ---------- */

  function renderHistoricalChart() {
    var h = FIRE_DATA.historical;
    var labels = h.map(function (item) { return item.year; });
    var values = h.map(function (item) { return item.count; });
    var bgColors = h.map(function (item) {
      if (item.count === null) return "rgba(148,163,184,0.25)";
      if (item.partial) return "rgba(245,158,11,0.7)";
      if (item.count >= 20000) return "rgba(220,38,38,0.7)";
      if (item.count >= 15000) return "rgba(245,158,11,0.7)";
      return "rgba(16,185,129,0.7)";
    });

    var ctx = document.getElementById("chart-historical");
    if (!ctx) return;

    setupSourceLink("chart-historical", FIRE_DATA.metadata.sourceUrl);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "top" })],
      data: {
        labels: labels,
        datasets: [{
          label: "Focos de Queimada (Mata Atlântica)",
          data: values,
          backgroundColor: bgColors,
          borderColor: bgColors.map(function (c) { return c.replace("0.7", "1").replace("0.25", "0.5"); }),
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: makeTooltipHandler(function (i) {
              var item = h[i];
              return {
                title: String(item.year) + (item.partial ? " (ano parcial)" : ""),
                body: (item.count === null || item.count === undefined) ? "Sem dados verificados" : formatNumber(item.count) + " focos",
                note: item.note,
                url: item.sourceUrl,
                linkText: "Acessar fonte"
              };
            })
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grace: "10%",
            title: { display: true, text: "Número de Focos", font: { size: 12 } },
            grid: { color: "rgba(0,0,0,0.05)" }
          },
          x: {
            title: { display: true, text: "Ano", font: { size: 12 } },
            grid: { display: false }
          }
        }
      }
    });
  }

  /* ---------- Atlas Chart ---------- */

  function renderAtlasChart() {
    var a = FIRE_DATA.atlasDeforestation;
    var labels = a.map(function (item) { return item.period; });
    var values = a.map(function (item) { return item.hectares; });
    var bgColors = a.map(function (item) {
      if (item.hectares <= 10000) return "rgba(16,185,129,0.7)";
      if (item.hectares <= 15000) return "rgba(245,158,11,0.7)";
      return "rgba(220,38,38,0.7)";
    });

    var ctx = document.getElementById("chart-atlas");
    if (!ctx) return;

    setupSourceLink("chart-atlas", FIRE_DATA.atlasSourceUrl);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "top" })],
      data: {
        labels: labels,
        datasets: [{
          label: "Área Desmatada (hectares)",
          data: values,
          backgroundColor: bgColors,
          borderColor: bgColors.map(function (c) { return c.replace("0.7", "1"); }),
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: makeTooltipHandler(function (i) {
              var item = a[i];
              return {
                title: "Período " + item.period,
                body: formatNumber(item.hectares) + " hectares desmatados",
                note: item.note,
                url: FIRE_DATA.atlasSourceUrl,
                linkText: "Ver Atlas da Mata Atlântica"
              };
            })
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grace: "10%",
            title: { display: true, text: "Hectares", font: { size: 12 } },
            grid: { color: "rgba(0,0,0,0.05)" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  /* ==========================================================================
     4. Comparativo
     ========================================================================== */

  function renderComparativo() {
    var d = FIRE_DATA;
    setSafe("comp-intro", d.metadata.scopeNote + ". Dados do satélite de referência AQUA Tarde (MODIS).");

    renderMonthlyChart();
    renderBiomaChart();
  }

  /* ---------- Monthly Chart ---------- */

  function renderMonthlyChart() {
    var mc = FIRE_DATA.monthlyComparison;
    var labels = mc.data.map(function (item) { return item.month; });
    var avgValues = mc.data.map(function (item) { return item.avg; });
    var y2026Values = mc.data.map(function (item) { return item.y2026; });

    var ctx = document.getElementById("chart-monthly");
    if (!ctx) return;

    setupSourceLink("chart-monthly", FIRE_DATA.monthlyComparison.sourceUrl);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "top" })],
      data: {
        labels: labels,
        datasets: [
          {
            label: "Média Histórica (2010-2024)",
            data: avgValues,
            backgroundColor: "rgba(148,163,184,0.5)",
            borderColor: "rgba(148,163,184,0.8)",
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: "2026",
            data: y2026Values,
            backgroundColor: function (ctx) {
              var v = mc.data[ctx.dataIndex].diff2026;
              return v < 0 ? "rgba(16,185,129,0.7)" : "rgba(220,38,38,0.7)";
            },
            borderColor: function (ctx) {
              var v = mc.data[ctx.dataIndex].diff2026;
              return v < 0 ? "rgba(16,185,129,1)" : "rgba(220,38,38,1)";
            },
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            enabled: false,
            external: makeTooltipHandler(function (i) {
              var item = mc.data[i];
              return {
                title: item.month + " — Brasil (todos os biomas)",
                body: "2026: " + formatNumber(item.y2026) + " focos | Média: " + formatNumber(item.avg) + " focos",
                note: "Diferença: " + formatPercent(item.diff2026),
                url: FIRE_DATA.monthlyComparison.sourceUrl,
                linkText: "Ver Boletim InfoQueima"
              };
            })
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grace: "10%",
            title: { display: true, text: "Número de Focos", font: { size: 12 } },
            grid: { color: "rgba(0,0,0,0.05)" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  /* ---------- Bioma Chart ---------- */

  function renderBiomaChart() {
    var bc = FIRE_DATA.biomaComparison;
    var labels = bc.map(function (item) { return item.name; });
    var avgValues = bc.map(function (item) { return item.avg; });
    var y2026Values = bc.map(function (item) { return item.fires2026; });

    var ctx = document.getElementById("chart-bioma");
    if (!ctx) return;

    setupSourceLink("chart-bioma", URL_INFOQUEIMA);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "right" })],
      data: {
        labels: labels,
        datasets: [
          {
            label: "Média Histórica (jun/2010-2024)",
            data: avgValues,
            backgroundColor: "rgba(148,163,184,0.5)",
            borderColor: "rgba(148,163,184,0.8)",
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: "Junho/2026",
            data: y2026Values,
            backgroundColor: "rgba(220,38,38,0.7)",
            borderColor: "rgba(220,38,38,1)",
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            enabled: false,
            external: makeTooltipHandler(function (i) {
              var item = bc[i];
              var diff = item.fires2026 - item.avg;
              var pct = ((diff / item.avg) * 100).toFixed(1);
              return {
                title: item.name,
                body: "Jun/2026: " + formatNumber(item.fires2026) + " focos | Média: " + formatNumber(item.avg) + " focos",
                note: "Diferença vs média: " + (diff >= 0 ? "+" : "") + pct.replace(".", ",") + "%",
                url: URL_INFOQUEIMA,
                linkText: "Ver Boletim InfoQueima"
              };
            })
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grace: "10%",
            title: { display: true, text: "Número de Focos", font: { size: 12 } },
            grid: { color: "rgba(0,0,0,0.05)" }
          },
          y: {
            grid: { display: false }
          }
        }
      }
    });
  }

  /* ==========================================================================
     5. Região (São Paulo)
     ========================================================================== */

  function renderRegiao() {
    var sp = FIRE_DATA.saoPaulo;
    setSafe("sp-why", "São Paulo tem recorde histórico de queimadas em 2024. " +
      "Jan-Set 2024: " + formatNumber(sp.records[sp.records.length - 1].count) +
      " focos — superando o recorde anterior de " + formatNumber(sp.records[0].count) +
      " em 2010. Principais causas: áreas agrícolas (cana-de-açúcar e pastagens) e período de seca prolongado.");

    renderSPChart();
    renderSPJuneChart();
  }

  /* ---------- SP Chart ---------- */

  function renderSPChart() {
    var sp = FIRE_DATA.saoPaulo;
    var labels = sp.records.map(function (item) { return item.year; });
    var values = sp.records.map(function (item) { return item.count; });
    var bgColors = sp.records.map(function (item) {
      if (item.count >= 7000) return "rgba(220,38,38,0.7)";
      if (item.count >= 5000) return "rgba(245,158,11,0.7)";
      return "rgba(16,185,129,0.7)";
    });

    var ctx = document.getElementById("chart-saopaulo");
    if (!ctx) return;

    setupSourceLink("chart-saopaulo", URL_BDQUEIMADAS);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "top" })],
      data: {
        labels: labels,
        datasets: [{
          label: "Focos de Queimada (SP — todos os biomas)",
          data: values,
          backgroundColor: bgColors,
          borderColor: bgColors.map(function (c) { return c.replace("0.7", "1"); }),
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: makeTooltipHandler(function (i) {
              var item = sp.records[i];
              return {
                title: item.year + " — São Paulo",
                body: formatNumber(item.count) + " focos",
                note: item.source + (item.note ? " — " + item.note : ""),
                url: item.sourceUrl,
                linkText: "Acessar fonte"
              };
            })
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grace: "10%",
            title: { display: true, text: "Número de Focos", font: { size: 12 } },
            grid: { color: "rgba(0,0,0,0.05)" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  /* ---------- SP June Chart ---------- */

  function renderSPJuneChart() {
    var spj = FIRE_DATA.saoPaulo.june2026;

    var ctx = document.getElementById("chart-sp-june");
    if (!ctx) return;

    setupSourceLink("chart-sp-june", FIRE_DATA.saoPaulo.june2026.sourceUrl);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "top" })],
      data: {
        labels: ["Média histórica (jun/2010-2024)", "Junho/2026"],
        datasets: [{
          label: "Focos em São Paulo",
          data: [spj.historicalAverage, spj.fires2026],
          backgroundColor: [
            "rgba(148,163,184,0.6)",
            "rgba(220,38,38,0.7)"
          ],
          borderColor: [
            "rgba(148,163,184,1)",
            "rgba(220,38,38,1)"
          ],
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: makeTooltipHandler(function (i) {
              return {
                title: "São Paulo — Junho/2026",
                body: i === 0
                  ? "Média (jun/2010-2024): " + formatNumber(spj.historicalAverage) + " focos"
                  : "Jun/2026: " + formatNumber(spj.fires2026) + " focos",
                note: "Diferença: " + formatPercent(spj.diffPercent) + " vs média",
                url: spj.sourceUrl,
                linkText: "Ver Boletim InfoQueima"
              };
            })
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grace: "10%",
            title: { display: true, text: "Número de Focos", font: { size: 12 } },
            grid: { color: "rgba(0,0,0,0.05)" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  /* ==========================================================================
     6. Prevenção
     ========================================================================== */

  function renderPrevencao() {
    /* Content is static in HTML; no dynamic rendering needed */
  }

  /* ==========================================================================
     7. Participar (QR Code + Form Link)
     ========================================================================== */

  function renderParticipar() {
    var link = document.getElementById("cta-form-link");
    if (link) link.href = GOOGLE_FORMS_URL;

    var qrContainer = document.getElementById("qrcode");
    if (qrContainer && typeof QRCode !== "undefined") {
      qrContainer.innerHTML = "";
      new QRCode(qrContainer, {
        text: GOOGLE_FORMS_URL,
        width: 180,
        height: 180,
        colorDark: "#065f46",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }

  /* ==========================================================================
     8. Impacto (Counters)
     ========================================================================== */

  function setupImpacto() {
    if (!document.getElementById("counter-responses")) return;
    jsonpRequest(COUNTER_API + "?action=stats&callback=__counterCallback");
  }

  window.__counterCallback = function (data) {
    if (!data || typeof data.responses === "undefined") return;
    animateCounter("counter-responses", data.responses);
  };

  function jsonpRequest(url, callback) {
    var cbName = "__cb_" + Math.round(Math.random() * 1e9);
    var timeout;

    if (url.indexOf("callback=") === -1) {
      var sep = url.indexOf("?") === -1 ? "?" : "&";
      url += sep + "callback=" + cbName;
    }

    window[cbName] = function (data) {
      cleanup();
      if (callback) callback(data);
    };

    var script = document.createElement("script");
    script.src = url;
    script.onerror = function () { cleanup(); };

    document.body.appendChild(script);

    function cleanup() {
      clearTimeout(timeout);
      try { document.body.removeChild(script); } catch (e) {}
      try { delete window[cbName]; } catch (e) {}
      window[cbName] = undefined;
    }

    timeout = setTimeout(cleanup, 10000);
  }

  function animateCounter(elementId, targetValue) {
    var el = document.getElementById(elementId);
    if (!el || targetValue === undefined || targetValue === null) return;

    var target = parseInt(targetValue, 10);
    if (isNaN(target) || target < 0) { el.textContent = "--"; return; }

    var duration = 1200;
    var startTime = null;
    var startValue = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(startValue + (target - startValue) * eased);
      el.textContent = current.toLocaleString("pt-BR");
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ==========================================================================
     9. Mobile Navigation
     ========================================================================== */

  function setupMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var navList = document.querySelector(".nav-list");
    if (!toggle || !navList) return;

    var overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);

    function openMenu() {
      navList.classList.add("open");
      overlay.classList.add("visible");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      navList.classList.remove("open");
      overlay.classList.remove("visible");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ==========================================================================
     10. Active Nav Highlight
     ========================================================================== */

  function setupActiveNav() {
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll(".nav-list a");

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.removeAttribute("aria-current");
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.setAttribute("aria-current", "true");
            }
          });
        }
      });
    }, { rootMargin: "-20% 0px -80% 0px" });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ==========================================================================
     11. Fonte oficial: gráfico clicável + hint com URL + teclado
     ========================================================================== */

  function setupSourceLink(canvasId, url) {
    var ctx = document.getElementById(canvasId);
    if (!ctx || !url) return;

    var box = ctx.parentNode;
    var hint = box ? box.querySelector(".chart-hint") : null;

    ctx.style.cursor = "pointer";

    ctx.addEventListener("click", function () {
      window.open(url, "_blank", "noopener");
    });

    if (box) {
      box.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(url, "_blank", "noopener");
        }
      });

      function showUrl() {
        if (hint) hint.textContent = url;
      }

      function showDefault() {
        if (hint) hint.textContent = "Clique para consultar a fonte oficial";
      }

      box.addEventListener("mouseenter", showUrl);
      box.addEventListener("mouseleave", showDefault);
      box.addEventListener("focus", showUrl);
      box.addEventListener("blur", showDefault);
    }
  }

  /* ==========================================================================
     12. Tooltip personalizado com link da fonte
     ========================================================================== */

  function getOrCreateTooltip(chart) {
    var parent = chart.canvas.parentNode;
    var tooltipEl = parent.querySelector(".chartjs-tooltip");
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "chartjs-tooltip";
      parent.appendChild(tooltipEl);
    }
    return tooltipEl;
  }

  function makeTooltipHandler(getInfo) {
    return function (context) {
      var chart = context.chart;
      var tooltip = context.tooltip;
      var tooltipEl = getOrCreateTooltip(chart);

      if (tooltip.opacity === 0 || !tooltip.dataPoints || !tooltip.dataPoints.length) {
        tooltipEl.style.opacity = "0";
        tooltipEl.style.pointerEvents = "none";
        return;
      }

      var index = tooltip.dataPoints[0].dataIndex;
      var info = getInfo(index) || {};

      var html = "";
      if (info.title) html += "<div class='tt-title'>" + info.title + "</div>";
      if (info.body) html += "<div class='tt-body'>" + info.body + "</div>";
      if (info.note) html += "<div class='tt-note'>" + info.note + "</div>";
      if (info.url) {
        html += "<a class='tt-link' href='" + info.url + "' target='_blank' rel='noopener'>" +
          (info.linkText || "Acessar fonte") + " ↗</a>";
      }

      tooltipEl.innerHTML = html;
      tooltipEl.style.opacity = "1";
      tooltipEl.style.pointerEvents = "auto";

      var canvasPos = chart.canvas.getBoundingClientRect();
      var left = canvasPos.left + window.pageXOffset + tooltip.caretX;
      var top = canvasPos.top + window.pageYOffset + tooltip.caretY - 12;
      var maxLeft = canvasPos.left + window.pageXOffset + canvasPos.width - 320;

      if (left + 360 > window.innerWidth + window.pageXOffset) left = maxLeft - 60;
      if (left < 8) left = 8;
      if (top < 8) top = 8;

      tooltipEl.style.left = left + "px";
      tooltipEl.style.top = top + "px";
    };
  }

  /* ==========================================================================
     13. Rótulos de valores exatos nas barras
     ========================================================================== */

  function makeValueLabelsPlugin(opts) {
    opts = opts || {};
    var horizontal = opts.position === "right";

    return {
      id: "valueLabels",
      afterDatasetsDraw: function (chart) {
        var ctx = chart.ctx;
        if (!ctx) return;

        ctx.save();
        ctx.font = "600 11px 'Segoe UI', system-ui, sans-serif";
        ctx.fillStyle = opts.color || "rgba(15,23,42,0.85)";

        chart.data.datasets.forEach(function (dataset, dsIndex) {
          var meta = chart.getDatasetMeta(dsIndex);
          if (meta.hidden || !meta.data.length) return;

          meta.data.forEach(function (bar, idx) {
            var v = dataset.data[idx];
            if (v === null || v === undefined || isNaN(v)) return;
            var text = v.toLocaleString("pt-BR");
            var x, y;

            if (horizontal) {
              x = bar.x + bar.width + 6;
              y = bar.y + bar.height / 2;
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";
            } else {
              x = bar.x + bar.width / 2;
              y = bar.y - 6;
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
            }

            ctx.fillText(text, x, y);
          });
        });

        ctx.restore();
      }
    };
  }

  /* ==========================================================================
     Helpers
     ========================================================================== */

  function setSafe(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function formatNumber(n) {
    if (n === null || n === undefined) return "—";
    return n.toLocaleString("pt-BR");
  }

  function formatPercent(pct) {
    if (pct === null || pct === undefined) return "—";
    var prefix = pct > 0 ? "+" : "";
    return prefix + pct.toFixed(1).replace(".", ",") + "%";
  }

  /* ==========================================================================
     15. Tooltip de siglas (acessível)
     ========================================================================== */

  function initSiglaTooltips() {
    var tooltip = document.createElement("div");
    tooltip.id = "sigla-tooltip";
    tooltip.className = "sigla-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltip);

    var shown = null;

    function positionTooltip(el) {
      var rect = el.getBoundingClientRect();
      var pad = 8;
      var top = rect.bottom + pad;
      var left = rect.left + rect.width / 2;
      var box = tooltip.getBoundingClientRect();
      if (left + box.width / 2 > window.innerWidth - pad) {
        left = window.innerWidth - pad - box.width / 2;
      }
      left = Math.max(pad, left);
      tooltip.style.left = Math.round(left - box.width / 2) + "px";
      tooltip.style.top = Math.round(top) + "px";
    }

    function show(el) {
      var def = el.getAttribute("data-def");
      if (!def) return;
      tooltip.textContent = def;
      shown = el;
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
      tooltip.setAttribute("aria-hidden", "false");
      positionTooltip(el);
    }

    function hide() {
      shown = null;
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
      tooltip.setAttribute("aria-hidden", "true");
    }

    var siglas = document.querySelectorAll(".sigla[data-def]");

    for (var i = 0; i < siglas.length; i++) {
      (function (el) {
        el.addEventListener("mouseenter", function () {
          show(el);
        });
        el.addEventListener("mouseleave", function () {
          hide();
        });
        el.addEventListener("focus", function () {
          show(el);
        });
        el.addEventListener("blur", function () {
          hide();
        });
        el.addEventListener("click", function (e) {
          e.preventDefault();
          if (shown === el) {
            hide();
          } else {
            show(el);
          }
        });
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (shown === el) {
              hide();
            } else {
              show(el);
            }
          } else if (e.key === "Escape") {
            hide();
            el.focus();
          }
        });
      })(siglas[i]);
    }

    document.addEventListener("pointerdown", function (e) {
      if (shown && !shown.contains(e.target)) {
        hide();
      }
    });
    document.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    window.addEventListener("blur", hide);
  }

  /* ==========================================================================
     25. Vídeo complementar (YouTube) — click-to-load
     ========================================================================== */

  function setupVideoFacade() {
    var facade = document.getElementById("video-facade");
    var wrapper = document.getElementById("video-wrapper");
    var frame = wrapper ? wrapper.querySelector("iframe") : null;

    if (!facade || !wrapper) {
      return;
    }

    var thumb = facade.querySelector(".video-facade-thumb");
    if (thumb) {
      thumb.addEventListener("error", function () {
        thumb.style.display = "none";
      });
    }

    function activate() {
      if (facade.classList.contains("is-hidden")) {
        return;
      }
      facade.classList.add("is-hidden");
      facade.setAttribute("aria-hidden", "true");
      wrapper.removeAttribute("hidden");

      if (document.activeElement === facade && frame) {
        try {
          frame.focus({ preventScroll: true });
        } catch (err) {
          frame.focus();
        }
      }
    }

    facade.addEventListener("click", activate);
    facade.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  }

})();
