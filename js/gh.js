(async function () {
  const LANG_COLORS = {
    Python: "#3572A5",
    Java: "#b07219",
    JavaScript: "#f1e05a",
    "C++": "#f34b7d",
    C: "#555555",
    TypeScript: "#2b7489",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Jupyter: "#DA5B0B",
    Arduino: "#00979D",
    Kotlin: "#A97BFF",
    Rust: "#dea584",
    Go: "#00ADD8",
  };
  const grid = document.getElementById("projects-grid");
  try {
    const res = await fetch(
      "https://api.github.com/users/crixodia/repos?per_page=100&sort=pushed",
    );
    if (!res.ok) throw new Error();
    const repos = await res.json();
    const filtered = repos
      .filter((r) => !r.fork && !r.archived && r.name !== "crixodia")
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);
    grid.innerHTML = filtered
      .map((r) => {
        const lang = r.language || "—";
        const dot = LANG_COLORS[lang]
          ? `<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${LANG_COLORS[lang]};margin-right:5px;vertical-align:middle;"></span>`
          : "";
        const desc = r.description ? r.description.replace(/</g, "&lt;") : "";
        return `<a class="project-card" href="${r.html_url}" target="_blank" rel="noopener">
<span class="project-lang">${dot}${lang}</span>
<span class="project-name">${r.name}</span>
<span class="project-desc">${desc || '<em style="opacity:.4">—</em>'}</span>
<span class="project-stars">★ ${r.stargazers_count}</span>
</a>`;
      })
      .join("");
  } catch {
    const t = TRANSLATIONS[currentLang];
    grid.innerHTML = `<p style="color:var(--muted);font-size:.8rem;grid-column:1/-1;">${t.projectsError} <a href="https://github.com/crixodia" style="color:var(--accent)">GitHub</a></p>`;
  }
})();
