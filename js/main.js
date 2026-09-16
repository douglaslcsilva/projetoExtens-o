/* ==========================================================================
   Mata Atlântica em Alerta — JavaScript Principal
   Gráficos, interações e funcionalidades
   Fonte de dados dos gráficos: TerraBrasilis / INPE
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Google Forms (pesquisa) ---------- */
  var GOOGLE_FORMS_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdZTCjDHHZe6QuzB6OsygMpYzsfBPFZ-gQeCYMoouUuKqiG5Q/viewform?usp=sharing&ouid=115903134200025727500";

  /* ---------- Contador de participações ---------- */
  var COUNTER_API = "https://script.google.com/macros/s/AKfycbzAYitvMzctgxXXgfMbyGWJb3ZhQTx4DVrVhuru246rD3j4DXF7nZ8wYKFagNZFwd7wWQ/exec";

  /* ---------- Fonte oficial dos gráficos (TerraBrasilis) ---------- */
  var URL_TERRABRASILIS = "https://terrabrasilis.dpi.inpe.br/app/dashboard/fires/biomes/aggregated/";

  /* ---------- Wait for DOM ---------- */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    renderHeroStats();
    renderMonitoramentoSource();
    renderDados();
    renderPrevencao();
    renderParticipar();
    setupImpacto();
    setupMobileNav();
    setupActiveNav();
    setupVideoFacade();
  }

  /* ==========================================================================
     1. Hero Stats
     ========================================================================== */

  function renderHeroStats() {
    var d = FIRE_DATA;
    setSafe("hero-ma-remaining", formatNumber(d.mataAtlantica.florestasMaduras) + "%");
    setSafe("hero-2024", formatNumber(d.peak2024));
    setSafe("hero-2026", formatNumber(d.ytd2026.count));
    setSafe("hero-source",
      "Fonte dos gráficos: TerraBrasilis / Programa Queimadas — INPE · atualizado em " + d.metadata.lastUpdate +
      " · % de remanescente: Atlas da Mata Atlântica 2024-2025 (INPE/SOS MA)");
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
    setSafe("dados-intro",
      "Estes números vêm do TerraBrasilis (INPE), o portal que reúne as informações de queimadas observadas pelos satélites do Brasil. " +
      "Última atualização: " + d.metadata.lastUpdate + ". " + d.periodNote);

    setSafe("stat-2024", formatNumber(d.peak2024));
    setSafe("stat-2024-detail", "Maior total da série 2018-2026");

    setSafe("stat-2026", formatNumber(d.ytd2026.count));
    setSafe("stat-2026-detail", d.ytd2026.months + " · " + d.ytd2026.note);

    setSafe("stat-sp2024", formatNumber(d.sp2024));
    setSafe("stat-sp2024-detail", "Maior número do estado em toda a série");

    renderAnnualChart();
    renderMonthlyChart();
    renderUfChart();
  }

  /* ---------- Série histórica anual ---------- */

  function renderAnnualChart() {
    var a = FIRE_DATA.annual;
    var labels = a.map(function (item) { return String(item.year); });
    var values = a.map(function (item) { return item.count; });
    var barBg = function (ctx) {
      var item = a[ctx.dataIndex];
      if (item.partial) return makeHatchPattern(ctx.chart.ctx, "rgba(245,158,11,0.75)");
      if (item.count >= 20000) return "rgba(220,38,38,0.7)";
      if (item.count >= 15000) return "rgba(245,158,11,0.7)";
      return "rgba(16,185,129,0.7)";
    };
    var barBorder = function (ctx) {
      var item = a[ctx.dataIndex];
      if (item.partial) return "rgba(245,158,11,1)";
      if (item.count >= 20000) return "rgba(220,38,38,1)";
      if (item.count >= 15000) return "rgba(245,158,11,1)";
      return "rgba(16,185,129,1)";
    };

    var ctx = document.getElementById("chart-historical");
    if (!ctx) return;

    setupSourceLink("chart-historical", URL_TERRABRASILIS);
    renderChartLegend("legend-annual", [
      { style: "background:#10b981", label: "menos de 15 mil" },
      { style: "background:#f59e0b", label: "de 15 mil a 19.999" },
      { style: "background:#dc2626", label: "20 mil ou mais" },
      { style: "background-image:repeating-linear-gradient(45deg, rgba(245,158,11,0.9) 0 4px, #fff7ed 4px 8px)", label: "ano em curso (parcial)" }
    ]);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "top" })],
      data: {
        labels: labels,
        datasets: [{
          label: "Focos de Queimada (Mata Atlântica)",
          data: values,
          backgroundColor: barBg,
          borderColor: barBorder,
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
                title: String(item.year) + (item.partial ? " (ano em curso)" : ""),
                body: formatNumber(item.count) + " focos",
                note: item.note,
                url: URL_TERRABRASILIS,
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

  /* ---------- Mensal: 2026 vs média 2019-2025 ---------- */

  function renderMonthlyChart() {
    var mc = FIRE_DATA.monthly2026;
    var labels = mc.map(function (item) { return item.month; });
    var avgValues = mc.map(function (item) { return item.avg; });
    var y2026Values = mc.map(function (item) { return item.value; });

    var ctx = document.getElementById("chart-monthly");
    if (!ctx) return;

    setupSourceLink("chart-monthly", URL_TERRABRASILIS);
    renderChartLegend("legend-monthly", [
      { style: "background:rgba(148,163,184,0.6)", label: "média 2019-2025" },
      { style: "background:#10b981", label: "2026 abaixo da média" },
      { style: "background:#dc2626", label: "2026 acima da média" },
      { style: "background-image:repeating-linear-gradient(45deg, rgba(245,158,11,0.9) 0 4px, #fff7ed 4px 8px)", label: "mês em curso" }
    ]);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "top" })],
      data: {
        labels: labels,
        datasets: [
          {
            label: FIRE_DATA.avgPeriod,
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
              var item = mc[ctx.dataIndex];
              if (item.partial) return makeHatchPattern(ctx.chart.ctx, "rgba(245,158,11,0.75)");
              return item.value <= item.avg ? "rgba(16,185,129,0.7)" : "rgba(220,38,38,0.7)";
            },
            borderColor: function (ctx) {
              var item = mc[ctx.dataIndex];
              if (item.partial) return "rgba(245,158,11,1)";
              return item.value <= item.avg ? "rgba(16,185,129,1)" : "rgba(220,38,38,1)";
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
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: makeTooltipHandler(function (i) {
              var item = mc[i];
              return {
                title: item.month + " — Mata Atlântica" + (item.partial ? " (mês em curso)" : ""),
                body: "2026: " + formatNumber(item.value) + " focos | Média: " + formatNumber(item.avg) + " focos",
                note: "Diferença vs média: " + formatPercent(percentDiff(item.value, item.avg)),
                url: URL_TERRABRASILIS,
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

  /* ---------- Focos por estado ---------- */

  function renderUfChart() {
    var uf = FIRE_DATA.ufTotal;
    var labels = uf.map(function (item) { return item.uf; });
    var values = uf.map(function (item) { return item.count; });
    var bgColors = uf.map(function (item) {
      return item.highlight ? "rgba(220,38,38,0.8)" : "rgba(16,185,129,0.7)";
    });

    var ctx = document.getElementById("chart-uf");
    if (!ctx) return;

    setupSourceLink("chart-uf", URL_TERRABRASILIS);
    renderChartLegend("legend-uf", [
      { style: "background:#10b981", label: "demais estados" },
      { style: "background:#dc2626", label: "São Paulo (destaque)" }
    ]);

    new Chart(ctx, {
      type: "bar",
      plugins: [makeValueLabelsPlugin({ position: "right" })],
      data: {
        labels: labels,
        datasets: [{
          label: "Focos (2018-2026)",
          data: values,
          backgroundColor: bgColors,
          borderColor: bgColors.map(function (c) { return c.replace("0.7", "1").replace("0.8", "1"); }),
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        layout: {
          padding: { right: 60 }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: makeTooltipHandler(function (i) {
              var item = uf[i];
              return {
                title: item.uf + " — Mata Atlântica",
                body: formatNumber(item.count) + " focos (2018-2026)",
                note: item.uf === "São Paulo" ? FIRE_DATA.spNote : null,
                url: URL_TERRABRASILIS,
                linkText: "Acessar fonte"
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
     4. Prevenção
     ========================================================================== */

  function renderPrevencao() {
    /* Conteúdo estático no HTML */
  }

  /* ==========================================================================
     5. Participar (QR Code + Form Link)
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
     6. Impacto (contador)
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
     7. Mobile Navigation
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
     8. Active Nav Highlight
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
     9. Fonte oficial: gráfico clicável + hint com URL + teclado
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
     10. Tooltip personalizado com link da fonte
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
     11. Rótulos de valores exatos nas barras
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
              x = chart.scales.x.getPixelForValue(v) + 6;
              y = bar.y + bar.height / 2;
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";

              var textW = ctx.measureText(text).width;
              var rightPad = 8;
              if (chart.options.layout && chart.options.layout.padding &&
                  typeof chart.options.layout.padding.right === "number") {
                rightPad = chart.options.layout.padding.right;
              }
              var maxX = Math.min(chart.chartArea.right + rightPad, chart.canvas.width) - 2;
              if (x < chart.chartArea.left + 2) x = chart.chartArea.left + 2;
              if (x + textW > maxX) x = maxX - textW;
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

  function renderChartLegend(containerId, items) {
    var el = document.getElementById(containerId);
    if (!el || !items || !items.length) return;

    var html = "";
    items.forEach(function (item) {
      html += "<span class='legend-item'>" +
        "<span class='legend-chip' style='" + item.style + "'></span>" +
        "<span class='legend-label'>" + item.label + "</span>" +
        "</span>";
    });
    el.innerHTML = html;
  }

  function makeHatchPattern(chartCtx, color) {
    var size = 12;
    var patternCanvas = document.createElement("canvas");
    patternCanvas.width = size;
    patternCanvas.height = size;

    var pctx = patternCanvas.getContext("2d");
    pctx.strokeStyle = color;
    pctx.lineWidth = 3;
    pctx.beginPath();
    pctx.moveTo(-size, size / 2);
    pctx.lineTo(size / 2, -size);
    pctx.moveTo(-size / 2, size);
    pctx.lineTo(size, -size / 2);
    pctx.stroke();

    return chartCtx.createPattern(patternCanvas, "repeat");
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

  function percentDiff(value, base) {
    if (!base) return 0;
    return ((value - base) / base) * 100;
  }

  /* ==========================================================================
     12. Vídeo complementar (YouTube) — click-to-load
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