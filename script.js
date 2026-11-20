/*
 * PERSONALIZATION AREA
 * Change these values to turn this page into a truly personal birthday surprise.
 * For music: place an audio file in the asset folder, then set musicUrl to that path.
 */
const CONFIG = {
  name: "HISNA FAWAIDA ZAMZAMI",
  birthdayMessage: "Hari ini, tanggal 21 november 2026 hari dimana kamu lahir.",
  letter: "AKU MAU MINTA MAAF ATAS KESALAHAN YANG KU LAKUKAN KE PADA MU KEMARINN, Semoga kamu selalu di berikan kesehatan, kebahagian, dan slalu di mudahkan untuk mencapai impianmu dan cita cita kamu.",
  finalMessage: "Aku mau minta maaf atas kesalahan yang ku lakukan kepada mu, dan aku mau bilang semoga setelah ini kamu slalu bahagia teruss dan slalu di berikan kesehatan dan slalu di mudahkan untuk mencapai impian mu dan cita cita kamu,",
  
  musicUrl: "asset/lagu cantik .mpeg", // Replace this path to use another song.
  gallery: [
    { src: "https://cdn.phototourl.com/anon/2026-11-20-fb9a4db0-f1c7-4246-868a-de540e49a7a2.webp", caption: "a beautiful photo of you" },
    { src: "https://cdn.phototourl.com/anon/2026-11-20-2ba62b4a-8156-4aa2-b236-300927b943d3.webp", caption: "a beautiful photo of you" },
    { src: "https://cdn.phototourl.com/anon/2026-11-20-d709c8ae-2810-4c60-ace9-077fd77d3a9c.webp", caption: "a beautiful photo of you" },
    { src: "https://cdn.phototourl.com/anon/2026-11-20-d5a0fece-b976-46ca-9895-6c598fb8ac80.jpg", caption: "a beautiful photo of you" }
  ]
};

const $ = (selector) => document.querySelector(selector);
const story = $("#story");
const intro = $("#intro");
const ambientLayer = $("#ambientLayer");
const confettiLayer = $("#confettiLayer");
const petalLayer = $("#petalLayer");
let hasOpened = false;
let audio, audioContext, melodyTimer, melodyStep = 0;

// Insert easily editable content from CONFIG.
function populateContent() {
  $("#birthdayName").textContent = CONFIG.name;
  $("#letterName").textContent = CONFIG.name;
  $("#finalMessage").textContent = CONFIG.finalMessage;

  const grid = $("#galleryGrid");
  CONFIG.gallery.forEach((item, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "polaroid";
    card.style.setProperty("--tilt", `${[-3, 2, -1, 3][index % 4]}deg`);
    card.style.setProperty("--delay", `${index * 120}ms`);
    card.innerHTML = `<img src="${item.src}" alt="${item.caption}" loading="lazy"><figcaption>${item.caption}</figcaption>`;
    card.addEventListener("click", () => openLightbox(item));
    grid.append(card);
  });
}

function createAmbientHearts() {
  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("span");
    heart.className = "ambient-heart";
    heart.textContent = i % 3 === 0 ? "✦" : "♥";
    heart.style.setProperty("--left", `${Math.random() * 100}%`);
    heart.style.setProperty("--size", `${10 + Math.random() * 18}px`);
    heart.style.setProperty("--speed", `${10 + Math.random() * 12}s`);
    heart.style.animationDelay = `${-Math.random() * 18}s`;
    ambientLayer.append(heart);
  }
}

function showerConfetti(amount = 60) {
  const colors = ["#e890a4", "#f9c78f", "#fff4d4", "#b7748a", "#f6adbd"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.setProperty("--left", `${Math.random() * 100}%`);
    piece.style.setProperty("--color", colors[i % colors.length]);
    piece.style.setProperty("--rotate", `${Math.random() * 180}deg`);
    piece.style.setProperty("--drift", `${-180 + Math.random() * 360}px`);
    piece.style.setProperty("--duration", `${2.2 + Math.random() * 1.5}s`);
    confettiLayer.append(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

function createPetals() {
  for (let i = 0; i < 22; i++) {
    const petal = document.createElement("i");
    petal.className = "petal";
    petal.style.setProperty("--left", `${Math.random() * 100}%`);
    petal.style.setProperty("--delay", `${-Math.random() * 14}s`);
    petal.style.setProperty("--duration", `${8 + Math.random() * 8}s`);
    petal.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
    petal.style.setProperty("--petal-color", i % 2 ? "#f3a7b5" : "#ffe4e5");
    petalLayer.append(petal);
  }
}

function typeText(element, text, speed = 21) {
  element.textContent = "";
  let i = 0;
  const typing = setInterval(() => {
    element.textContent += text.charAt(i++);
    if (i >= text.length) { clearInterval(typing); element.classList.add("done"); }
  }, speed);
}

function revealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      if (entry.target.classList.contains("polaroid")) entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: .16 });
  document.querySelectorAll(".reveal, .polaroid").forEach(el => observer.observe(el));
}

function openSurprise() {
  if (hasOpened) return;
  hasOpened = true;
  intro.classList.add("leaving");
  setTimeout(() => {
    intro.style.display = "none";
    story.classList.add("visible");
    story.setAttribute("aria-hidden", "false");
    typeText($("#typedMessage"), CONFIG.birthdayMessage);
    revealObserver();
    showerConfetti(85);
    petalLayer.classList.add("active");
  }, 620);
}

function openLightbox(item) {
  $("#lightboxImage").src = item.src;
  $("#lightboxImage").alt = item.caption;
  $("#lightboxCaption").textContent = item.caption;
  $("#lightbox").showModal();
}

function openLetter() {
  const envelope = $("#envelope");
  if (envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");
  setTimeout(() => typeText($("#letterText"), CONFIG.letter, 16), 450);
}

function makeWish() {
  const cake = document.querySelector(".cake");
  if (cake.classList.contains("blown")) return;
  cake.classList.add("blown");
  $("#wishMessage").textContent = "May all your wishes come true! ✨";
  $("#wishMessage").classList.add("visible");
  showerConfetti(45);
}

// Background sound: supports your own MP3, with a soft Web Audio melody as a self-contained fallback.
function playGeneratedMelody() {
  audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
  audioContext.resume();
  const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 523.25, 493.88];
  melodyTimer = setInterval(() => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.value = notes[melodyStep++ % notes.length];
    gain.gain.setValueAtTime(.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.07, audioContext.currentTime + .06);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .65);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(); osc.stop(audioContext.currentTime + .7);
  }, 720);
}

async function toggleMusic() {
  const button = $("#musicToggle");
  const label = button.querySelector(".music-label");
  const active = button.classList.contains("playing");
  if (active) {
    audio?.pause();
    if (melodyTimer) clearInterval(melodyTimer);
    melodyTimer = null;
    button.classList.remove("playing"); button.setAttribute("aria-pressed", "false"); label.textContent = "Lagu Fav";
    return;
  }
  if (CONFIG.musicUrl) {
    audio ??= new Audio(CONFIG.musicUrl);
    audio.loop = true;
    try { await audio.play(); } catch { label.textContent = "Music unavailable"; return; }
  } else { playGeneratedMelody(); }
  button.classList.add("playing"); button.setAttribute("aria-pressed", "true"); label.textContent = "Pause melody";
}

function replay() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  showerConfetti(70);
  setTimeout(() => typeText($("#typedMessage"), CONFIG.birthdayMessage), 600);
}

populateContent();
createAmbientHearts();
createPetals();
$("#openSurprise").addEventListener("click", openSurprise);
$("#musicToggle").addEventListener("click", toggleMusic);
$("#envelope").addEventListener("click", openLetter);
$("#wishButton").addEventListener("click", makeWish);
$("#replaySurprise").addEventListener("click", replay);
$("#lightboxClose").addEventListener("click", () => $("#lightbox").close());
$("#lightbox").addEventListener("click", (event) => { if (event.target === $("#lightbox")) $("#lightbox").close(); });
