const TRANSLATIONS = {
  en: {
    title: "Cristian Bastidas — crixodia",
    description:
      "Computer Science Engineer, science and technology enthusiast.",
    ogLocale: "en_US",
    bio: "Computer Science Engineer bringing CS concepts to wider audiences through writing and short-form content.",
    labelProjects: "Featured Projects",
    labelWriting: "Writing",
    blogSub: "Articles on dev, automation, hardware &amp; computer vision",
    labelConnect: "Let's Connect",
    btnContact: "Get in Touch",
    btnGithub: "View GitHub",
    footerMade: "Made with",
    modalTitle: "Get in Touch",
    modalSub: "I'll get back to you as soon as possible.",
    labelEmail: "Your Email",
    labelMessage: "Your Message",
    emailPH: "name@example.com",
    messagePH: "Type your message here...",
    btnSend: "Send Message",
    successText: "Message sent! I'll be in touch soon.",
    projectsError: "Could not load projects —",
  },
  es: {
    title: "Cristian Bastidas — crixodia",
    description:
      "Ingeniero en Ciencias de la Computación, entusiasta de la ciencia y la tecnología.",
    ogLocale: "es_EC",
    bio: "Ingeniero en Ciencias de la Computación explicando sus conceptos a audiencias más amplias a través de contenido escrito y en video.",
    labelProjects: "Proyectos destacados",
    labelWriting: "Blog",
    blogSub:
      "Artículos sobre desarrollo, automatización, hardware y visión artificial",
    labelConnect: "Conectemos",
    btnContact: "Contáctame",
    btnGithub: "Ver GitHub",
    footerMade: "Hecho con",
    modalTitle: "Contáctame",
    modalSub: "Te responderé lo antes posible.",
    labelEmail: "Tu correo",
    labelMessage: "Tu mensaje",
    emailPH: "nombre@ejemplo.com",
    messagePH: "Escribe tu mensaje aquí...",
    btnSend: "Enviar mensaje",
    successText: "¡Mensaje enviado! Me pondré en contacto pronto.",
    projectsError: "No se pudieron cargar los proyectos —",
  },
};

let currentLang = "en";

function detectLang() {
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "en" || param === "es") return param;
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  return browser === "es" ? "es" : "en";
}

function setLang(lang, pushState = true) {
  currentLang = lang;
  const t = TRANSLATIONS[lang];

  // HTML lang attribute
  document.documentElement.lang = lang;

  // <head> meta tags
  document.title = t.title;
  document.getElementById("meta-title").textContent = t.title;
  document.getElementById("meta-desc").content = t.description;
  document.getElementById("og-title").content = t.title;
  document.getElementById("og-desc").content = t.description;
  document.getElementById("og-locale").content = t.ogLocale;
  document.getElementById("tw-title").content = t.title;
  document.getElementById("tw-desc").content = t.description;

  // Body text — section labels have a ::after pseudo so we target the text node
  document.getElementById("bio-text").innerHTML = t.bio;

  const setLabel = (id, text) => {
    const el = document.getElementById(id);
    el.childNodes[0].textContent = text + " ";
  };
  setLabel("label-projects", t.labelProjects);
  setLabel("label-writing", t.labelWriting);
  setLabel("label-connect", t.labelConnect);

  document.getElementById("blog-sub").innerHTML = t.blogSub;
  document.getElementById("btn-contact").textContent = t.btnContact;
  document.getElementById("btn-github").textContent = t.btnGithub;
  document.getElementById("footer-made").textContent = t.footerMade;

  // Modal
  document.getElementById("modal-title").textContent = t.modalTitle;
  document.getElementById("modal-sub").textContent = t.modalSub;
  document.getElementById("label-email").textContent = t.labelEmail;
  document.getElementById("label-message").textContent = t.labelMessage;
  document.getElementById("inp-email").placeholder = t.emailPH;
  document.getElementById("inp-message").placeholder = t.messagePH;
  document.getElementById("btn-send").textContent = t.btnSend;
  document.getElementById("success-text").textContent = t.successText;

  // Toggle buttons
  document.getElementById("btn-en").classList.toggle("active", lang === "en");
  document.getElementById("btn-es").classList.toggle("active", lang === "es");

  // Update URL without reload
  if (pushState) {
    const url = new URL(window.location);
    url.searchParams.set("lang", lang);
    history.pushState({ lang }, "", url);
  }
}

// Init
document.addEventListener("DOMContentLoaded", () =>
  setLang(detectLang(), false),
);

// Handle back/forward
window.addEventListener("popstate", (e) => {
  if (e.state && e.state.lang) setLang(e.state.lang, false);
});
