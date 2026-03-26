function openModal() {
  document.getElementById("modalBg").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modalBg").classList.remove("open");
  document.body.style.overflow = "";
}
function handleBgClick(e) {
  if (e.target === document.getElementById("modalBg")) closeModal();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById("btn-send");
  const t = TRANSLATIONS[currentLang];
  btn.textContent = "…";
  btn.disabled = true;
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      document.getElementById("formWrap").style.display = "none";
      document.getElementById("successMsg").style.display = "block";
    } else {
      btn.textContent = t.btnSend;
      btn.disabled = false;
    }
  } catch {
    btn.textContent = t.btnSend;
    btn.disabled = false;
  }
}
