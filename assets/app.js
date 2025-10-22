
const docs = [
  {
    "title": "Practical Guidance for Integration _MoH Uganda_Final Version_29.4.25_VF.pdf",
    "path": "docs/Practical_Guidance_for_Integration__MoH_Uganda_Final_Version_29.4.25_VF.pdf"
  },
  {
    "title": "Integration situation analysis 3.1.pdf",
    "path": "docs/Integration_situation_analysis_3.1.pdf"
  },
  {
    "title": "Integration Maturity Framework 10 Jun 25.pdf",
    "path": "docs/Integration_Maturity_Framework_10_Jun_25.pdf"
  },
  {
    "title": "Draft HSSI Roadmap 2.3 August 5th.pdf",
    "path": "docs/Draft_HSSI_Roadmap_2.3_August_5th.pdf"
  },
  {
    "title": "Capacity Development Plan for Integration.pdf",
    "path": "docs/Capacity_Development_Plan_for_Integration.pdf"
  },
  {
    "title": "Final Facility Level Facilitator's Guide.pdf",
    "path": "docs/Final_Facility_Level_Facilitators_Guide.pdf"
  }
];

function $(q, el=document){ return el.querySelector(q); }
function $all(q, el=document){ return [...el.querySelectorAll(q)]; }

function renderCards(list) {
  const grid = $(".grid");
  grid.innerHTML = "";
  list.forEach(d => {
    const card = document.createElement("div");
    card.className = "card";
    const title = document.createElement("h3");
    title.textContent = d.title;
    const p = document.createElement("p");
    const desc = describe(d.title);
    p.textContent = desc;
    const tags = document.createElement("div");
    tags.className = "actions";
    if (d.path) {
      const a1 = document.createElement("a");
      a1.href = d.path;
      a1.textContent = "Read online";
      a1.setAttribute("target","_blank");
      a1.className = "badge";
      tags.appendChild(a1);
      const a2 = document.createElement("a");
      a2.href = d.path;
      a2.download = "";
      a2.textContent = "Download PDF";
      a2.className = "badge";
      tags.appendChild(a2);
    } else {
      const span = document.createElement("span");
      span.textContent = "File missing in /docs";
      span.className = "badge";
      tags.appendChild(span);
    }
    card.appendChild(title);
    card.appendChild(p);
    card.appendChild(tags);
    grid.appendChild(card);
  });
}

function describe(name) {
  name = name.toLowerCase();
  if (name.includes("practical guidance")) return "MoH Practical Guide: operationalizing integrated OPD/Chronic Care (leadership, clinic flow, HMIS, CQI).";
  if (name.includes("situation analysis")) return "National situation analysis of health service integration: history, CPE findings, gaps & enablers.";
  if (name.includes("maturity")) return "Integration Maturity Framework (SIMF): domains, scoring levels, tracking progress.";
  if (name.includes("roadmap")) return "Draft national HSSI Roadmap: platform-based approach, enablers, and phased implementation.";
  if (name.includes("capacity development")) return "Capacity Development Plan (Curriculum): modules, methods, evaluation for training health workers.";
  if (name.includes("facilitator")) return "Facility-level Facilitator’s Guide: 10‑day training package and practical simulations for integration.";
  return "Resource for integrated health-service delivery in Uganda.";
}

function initSearch() {
  const input = $("#q");
  input.addEventListener("input", () => {
    const t = input.value.trim().toLowerCase();
    const filtered = docs.filter(d => d.title.toLowerCase().includes(t));
    renderCards(filtered);
  });
}

function navActivate(){ 
  const hash = (location.hash || "#home").toLowerCase();
  $all("nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href")===hash));
  $all("[data-view]").forEach(v => v.style.display = (("#"+v.dataset.view)===hash ? "block" : "none"));
}

window.addEventListener("hashchange", navActivate);
window.addEventListener("DOMContentLoaded", () => { renderCards(docs); initSearch(); navActivate(); });
