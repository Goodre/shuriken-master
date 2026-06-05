const backgroundCanvas = document.getElementById("background");
const canvas = document.getElementById("game");
const gameCtx = canvas.getContext("2d");
const backgroundCtx = backgroundCanvas.getContext("2d");
let ctx = gameCtx;

const ui = {
  score: document.getElementById("score"),
  wave: document.getElementById("wave"),
  best: document.getElementById("best"),
  coins: document.getElementById("coins"),
  overlay: document.getElementById("overlay"),
  overlayTitle: document.getElementById("overlayTitle"),
  overlayText: document.getElementById("overlayText"),
  overlayStats: document.getElementById("overlayStats"),
  deadScore: document.getElementById("deadScore"),
  deadCrystals: document.getElementById("deadCrystals"),
  primaryBtn: document.getElementById("primaryBtn"),
  pauseBtn: document.getElementById("pauseBtn"),
  shopBtn: document.getElementById("shopBtn"),
  restartBtn: document.getElementById("restartBtn"),
  shop: document.getElementById("shop"),
  closeShopBtn: document.getElementById("closeShopBtn"),
  shopCoins: document.getElementById("shopCoins"),
  shopPreview: document.getElementById("shopPreview"),
  shopPrice: document.getElementById("shopPrice"),
  shopPriceValue: document.getElementById("shopPriceValue"),
  variantStrip: document.getElementById("variantStrip"),
  overlayRestartBtn: document.getElementById("overlayRestartBtn"),
  overlayHomeBtn: document.getElementById("overlayHomeBtn"),
  skinGrid: document.getElementById("skinGrid"),
  loading: document.getElementById("loadingScreen"),
};

const imageNames = [
  "Back.png",
  "Loading Logo.png",
  "main.png",
  "In-game.png",
  "Main_asset (1).png",
  "Main_asset (2).png",
  "Main_asset (3).png",
  "Main_asset (4).png",
  "Main_asset (5).png",
  "Market_asset (1).png",
  "Market_asset (2).png",
  "Market_asset (4).png",
  "Crystal_2.png",
  "Crystal_3.png",
  "TrophyGold.png",
  "PauseButton.png",
  "Ресурс 28.png",
  "Ресурс 30.png",
  "Shop_button 1.png",
  "PlayButt_ (2).png",
  "Lose_But.png",
  "Dead-menu.png",
  "ShopButton.png",
  "ContinueButton.png",
  "Gold.png",
  "Shuriken-master-.png",
  "Sun_Rays.png",
  "sun_rays2.png",
  "Sun.png",
  "Dots_main.png",
  "Met.png",
  "Gray_met.png",
  "Orange_Met.png",
  "Purple_X_Met.png",
  "Snow_Met.png",
  "Dark_Met.png",
  "Shine.png",
  "Particle_Dots.png",
  "Asset 141.png",
  "suriken.png",
  "suriken1.png",
  "suriken2.png",
  "suriken3.png",
  "suriken4.png",
  "suriken5.png",
  "suriken6.png",
  "suriken7.png",
  "21 09 2019/1.png",
  "21 09 2019/1.1.png",
  "21 09 2019/1.2.png",
  "21 09 2019/2.png",
  "21 09 2019/2.1.png",
  "21 09 2019/2.2.png",
  "21 09 2019/2.3.png",
  "21 09 2019/3.png",
  "21 09 2019/3.1.png",
  "21 09 2019/3.3.png",
  "21 09 2019/4.png",
  "21 09 2019/4.1.png",
  "21 09 2019/4.2.png",
  "21 09 2019/5.png",
  "21 09 2019/5.1.png",
  "21 09 2019/5.2.png",
  "21 09 2019/6.png",
  "21 09 2019/6.1.png",
  "21 09 2019/6.2.png",
  "21 09 2019/7.png",
  "21 09 2019/7.1.png",
  "21 09 2019/7.2.png",
  "21 09 2019/8.png",
  "21 09 2019/8.1.png",
  "21 09 2019/8.2.png",
  "21 09 2019/9.png",
  "21 09 2019/9.1.png",
  "21 09 2019/9.2.png",
];

const skinData = [
  { id: "classic", name: "Classic", src: "Asset 141.png", price: 0, variants: ["Asset 141.png"] },
  { id: "blade-9", name: "Night", src: "21 09 2019/9.png", price: 190, variants: ["21 09 2019/9.png", "21 09 2019/9.1.png", "21 09 2019/9.2.png"] },
  { id: "blade-2", name: "Cross", src: "21 09 2019/2.png", price: 220, variants: ["21 09 2019/2.png", "21 09 2019/2.1.png", "21 09 2019/2.2.png", "21 09 2019/2.3.png"] },
  { id: "blade-3", name: "Three", src: "21 09 2019/3.png", price: 260, variants: ["21 09 2019/3.png", "21 09 2019/3.1.png", "21 09 2019/3.3.png"] },
  { id: "blade-7", name: "Violet", src: "21 09 2019/7.png", price: 320, variants: ["21 09 2019/7.png", "21 09 2019/7.1.png", "21 09 2019/7.2.png"] },
  { id: "blade-6", name: "Dark", src: "21 09 2019/6.png", price: 460, variants: ["21 09 2019/6.png", "21 09 2019/6.1.png", "21 09 2019/6.2.png"] },
  { id: "blade-1", name: "Silver", src: "21 09 2019/1.png", price: 560, variants: ["21 09 2019/1.png", "21 09 2019/1.1.png", "21 09 2019/1.2.png"] },
  { id: "blade-8", name: "Storm", src: "21 09 2019/8.png", price: 680, variants: ["21 09 2019/8.png", "21 09 2019/8.1.png", "21 09 2019/8.2.png"] },
  { id: "blade-4", name: "Sharp", src: "21 09 2019/4.png", price: 820, variants: ["21 09 2019/4.png", "21 09 2019/4.1.png", "21 09 2019/4.2.png", "21 09 2019/5.png", "21 09 2019/5.1.png", "21 09 2019/5.2.png"] },
];

const audio = {
  throw: new Audio("assets/trim_thr2.wav"),
  hit: new Audio("assets/Stones- Hit- Drop-017.mp3"),
  danger: new Audio("assets/Fiolet met.mp3"),
  miss: new Audio("assets/Snow_Crash_meteor (1).mp3"),
};

Object.values(audio).forEach((sound) => {
  sound.preload = "auto";
  sound.volume = 0.35;
});

const images = {};
const SHURIKEN_SIZE = 68;
const BASE_W = 360;
const BASE_H = 640;
let W = BASE_W;
let H = BASE_H;
let viewW = BASE_W;
let viewH = BASE_H;
let screenW = BASE_W;
let screenH = BASE_H;
let renderScale = 1;
let renderOffsetX = 0;
let renderOffsetY = 0;
let renderDpr = 1;
let menuBackgroundAnchorY = null;
let lastTime = performance.now();
let pendingNextWave = 0;
let shake = 0;
let menuSpin = 0;
let transition = { active: false, t: 0, duration: 0.82 };

const defaults = {
  coins: 0,
  best: 0,
  selectedSkin: "classic",
  selectedSkinSrc: "Asset 141.png",
  ownedSkins: ["classic"],
  shopFocus: "blade-1",
};

let save = loadSave();
let game = makeGame("menu");

function loadSave() {
  try {
    const raw = { ...defaults, ...JSON.parse(localStorage.getItem("shurikenMasterWeb") || "{}") };
    if (raw.selectedSkin === "blade-5") raw.selectedSkin = "blade-4";
    if (raw.shopFocus === "blade-5") raw.shopFocus = "blade-4";
    if (Array.isArray(raw.ownedSkins) && raw.ownedSkins.some((item) => typeof item === "number")) {
      raw.ownedSkins = ["classic"];
      raw.selectedSkin = "classic";
      raw.selectedSkinSrc = "Asset 141.png";
    }
    if (!Array.isArray(raw.ownedSkins) || !raw.ownedSkins.length) raw.ownedSkins = ["classic"];
    if (raw.ownedSkins.includes("blade-5") && !raw.ownedSkins.includes("blade-4")) raw.ownedSkins.push("blade-4");
    raw.ownedSkins = raw.ownedSkins.filter((item) => item !== "blade-5");
    if (!skinData.some((item) => item.id === raw.selectedSkin)) raw.selectedSkin = "classic";
    const selected = skinData.find((item) => item.id === raw.selectedSkin) || skinData[0];
    if (!selected.variants.includes(raw.selectedSkinSrc)) raw.selectedSkinSrc = selected.src;
    if (!skinData.some((item) => item.id === raw.shopFocus)) raw.shopFocus = raw.selectedSkin;
    return raw;
  } catch {
    return { ...defaults };
  }
}

function persist() {
  localStorage.setItem("shurikenMasterWeb", JSON.stringify(save));
}

function currentSkin() {
  const selected = skinData.find((item) => item.id === save.selectedSkin) || skinData[0];
  return {
    family: selected,
    src: selected.variants.includes(save.selectedSkinSrc) ? save.selectedSkinSrc : selected.src,
  };
}

function focusedSkin() {
  return skinData.find((item) => item.id === save.shopFocus) || skinData[0];
}

function makeGame(mode = "playing") {
  return {
    mode,
    shopPaused: false,
    score: 0,
    runCrystals: 0,
    wave: 1,
    combo: 0,
    cooldown: 0,
    launcher: { reload: 1, wait: 0 },
    shurikens: [],
    meteors: [],
    sparks: [],
    pickups: [],
    message: "",
  };
}

function menuHeroMetrics(t = 0) {
  const eased = easeInOutCubic(clamp(t, 0, 1));
  const startSize = Math.min(W, H) * 0.27;
  const endSize = 68;
  const startY = H * 0.49;
  const endY = H - Math.max(84, H * 0.11);
  return {
    x: W / 2,
    y: startY + (endY - startY) * eased,
    size: startSize + (endSize - startSize) * eased,
  };
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
}

function isInsideMenuHero(x, y) {
  const hero = menuHeroMetrics(0);
  return Math.hypot(x - hero.x, y - hero.y) <= hero.size * 0.72;
}

function loadImages() {
  return Promise.all(
    imageNames.map((name) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = `assets/${name}`;
      images[name] = img;
    }))
  );
}

function resize() {
  viewW = Math.max(1, canvas.clientWidth);
  viewH = Math.max(1, canvas.clientHeight);
  screenW = Math.max(1, window.innerWidth || document.documentElement.clientWidth || viewW);
  screenH = Math.max(1, window.innerHeight || document.documentElement.clientHeight || viewH);
  renderDpr = Math.min(window.devicePixelRatio || 1, 2);
  W = BASE_W;
  H = BASE_H;
  renderScale = Math.min(viewW / W, viewH / H);
  renderOffsetX = (viewW - W * renderScale) / 2;
  renderOffsetY = (viewH - H * renderScale) / 2;
  canvas.width = Math.floor(viewW * renderDpr);
  canvas.height = Math.floor(viewH * renderDpr);
  backgroundCanvas.width = Math.floor(screenW * renderDpr);
  backgroundCanvas.height = Math.floor(screenH * renderDpr);
  document.body.dataset.outer = usesMobileOuterBackground() ? "mobile" : "desktop";
  applyGameTransform();
}

function applyGameTransform() {
  ctx.setTransform(
    renderDpr * renderScale,
    0,
    0,
    renderDpr * renderScale,
    renderDpr * renderOffsetX,
    renderDpr * renderOffsetY,
  );
}

function clearCanvas() {
  ctx.save();
  ctx.setTransform(renderDpr, 0, 0, renderDpr, 0, 0);
  ctx.clearRect(0, 0, viewW, viewH);
  ctx.restore();
}

function clearBackgroundCanvas() {
  backgroundCtx.save();
  backgroundCtx.setTransform(renderDpr, 0, 0, renderDpr, 0, 0);
  backgroundCtx.clearRect(0, 0, screenW, screenH);
  backgroundCtx.restore();
}

function usesMobileOuterBackground() {
  return screenW / screenH < BASE_W / BASE_H;
}

function clientToGame(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left - renderOffsetX) / renderScale,
    y: (clientY - rect.top - renderOffsetY) / renderScale,
  };
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function choice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function ageTrail(points, dt, maxAge, maxPoints = 120) {
  for (const point of points) point.age = (point.age || 0) + dt;
  while (points.length && points[points.length - 1].age > maxAge) points.pop();
  points.length = Math.min(points.length, maxPoints);
}

function play(name) {
  const source = audio[name];
  if (!source) return;
  const sound = source.cloneNode();
  sound.volume = source.volume;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function drawImageCover(img, alpha = 1, scaleBoost = 1) {
  if (!img || !img.complete || !img.naturalWidth) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#0b1222";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
    return;
  }

  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight) * scaleBoost;
  const width = img.naturalWidth * scale;
  const height = img.naturalHeight * scale;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, (W - width) / 2, (H - height) / 2, width, height);
  ctx.restore();
}

function coverRect(img, scaleBoost = 1) {
  if (!img || !img.complete || !img.naturalWidth) {
    return { x: 0, y: 0, width: W, height: H };
  }
  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight) * scaleBoost;
  const width = img.naturalWidth * scale;
  const height = img.naturalHeight * scale;
  return { x: (W - width) / 2, y: (H - height) / 2, width, height };
}

function drawImageCoverAround(img, pivotX, pivotY, alpha = 1, rotation = 0, offsetX = 0, offsetY = 0, scaleBoost = 1) {
  if (!img || !img.complete || !img.naturalWidth) return;
  const rect = coverRect(img, scaleBoost);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(pivotX + offsetX, pivotY + offsetY);
  ctx.rotate(rotation);
  ctx.translate(-pivotX, -pivotY);
  ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);
  ctx.restore();
}

function drawImageFitWidth(img, x, y, width, rotation = 0, alpha = 1) {
  if (!img || !img.complete || !img.naturalWidth) return;
  const height = width * (img.naturalHeight / img.naturalWidth);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.drawImage(img, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function drawSprite(img, x, y, size, rotation = 0, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  if (img && img.complete && img.naturalWidth) {
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
  } else {
    ctx.fillStyle = "#dce8f7";
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function biomeForScore(score = game.score) {
  if (score >= 28) {
    return { id: "dark", kind: "dark", name: "Dark", dropChance: 1, speed: 0.78, curve: 170, size: 78 };
  }
  if (score >= 12) {
    return { id: "snow", kind: "snow", name: "Snow", dropChance: 0.58, speed: 0.9, curve: 135, size: 74 };
  }
  return { id: "gray", kind: "gray", name: "Stone", dropChance: 0.34, speed: 1, curve: 105, size: 70 };
}

function meteorKind() {
  return biomeForScore().kind;
}

function drawImageCoverAnchoredY(img, anchorY, imageAnchorRatioY = 0.5, alpha = 1, scaleBoost = 1) {
  if (!img || !img.complete || !img.naturalWidth) {
    drawImageCover(img, alpha, scaleBoost);
    return;
  }

  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight) * scaleBoost;
  const width = img.naturalWidth * scale;
  const height = img.naturalHeight * scale;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, (W - width) / 2, anchorY - height * imageAnchorRatioY, width, height);
  ctx.restore();
}

function drawImageCoverAroundAnchoredY(img, pivotX, pivotY, imageAnchorRatioY = 0.5, alpha = 1, rotation = 0, offsetX = 0, offsetY = 0, scaleBoost = 1) {
  if (!img || !img.complete || !img.naturalWidth) return;
  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight) * scaleBoost;
  const width = img.naturalWidth * scale;
  const height = img.naturalHeight * scale;
  const x = (W - width) / 2;
  const y = pivotY - height * imageAnchorRatioY;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(pivotX + offsetX, pivotY + offsetY);
  ctx.rotate(rotation);
  ctx.translate(-pivotX, -pivotY);
  ctx.drawImage(img, x, y, width, height);
  ctx.restore();
}

function makeMeteor(kind, delay) {
  const left = Math.random() < 0.5;
  const biome = biomeForScore();
  const speedBump = Math.min(game.wave * 0.018 + game.score * 0.006, 0.38);
  const baseDuration = kind === "dark" ? rand(1.72, 2.06) : kind === "snow" ? rand(1.95, 2.34) : rand(2.24, 2.75);
  const actualDuration = Math.max(1.48, baseDuration - speedBump);
  const kindMap = {
    normal: { img: "Gray_met.png", reward: 1, dropChance: 0.34, hp: 1, size: 70, required: true },
    gray: { img: "Gray_met.png", reward: 1, dropChance: 0.34, hp: 1, size: 70, required: true },
    snow: { img: "Snow_Met.png", reward: 1, dropChance: 0.58, hp: 1, size: 74, required: true, speedMul: 0.92 },
    dark: { img: "Dark_Met.png", reward: 1, dropChance: 1, hp: 1, size: 78, required: true, speedMul: 0.8, hitScale: 0.33 },
    gold: { img: "Orange_Met.png", reward: 5, dropChance: 1, hp: 1, size: 54, hitScale: 0.22, speedMul: 0.76, required: false },
    danger: { img: "Purple_X_Met.png", reward: 0, dropChance: 0, hp: 1, size: 73, required: false },
  };
  const data = kindMap[kind] || kindMap.gray;
  const curvePower = kind === "dark" ? 152 : kind === "snow" ? 126 : biome.curve;
  const path = makeMeteorPath(curvePower, data.size);

  return {
    ...data,
    kind,
    delay,
    active: false,
    t: 0,
    x: left ? -90 : W + 90,
    y: path.startY,
    startX: left ? -90 : W + 90,
    endX: left ? W + 90 : -90,
    startY: path.startY,
    endY: path.endY,
    centerY: path.centerY,
    curve: path.curve,
    duration: actualDuration * (data.speedMul || biome.speed || 1),
    speedRatio: clamp((2.75 - actualDuration) / 1.3, 0, 1),
    rotation: rand(0, Math.PI * 2),
    spin: rand(-2.8, 2.8),
    hitFlash: 0,
    trailSeed: rand(0, 1000),
    trail: [],
  };
}

function makeMeteorPath(curvePower, size) {
  const safeTop = 58 + size * 0.12;
  const safeBottom = Math.min(H * 0.7, launcherY() - SHURIKEN_SIZE * 1.25);

  for (let attempt = 0; attempt < 24; attempt += 1) {
    const centerY = rand(H * 0.25, H * 0.52);
    const curve = rand(-curvePower, curvePower);
    const startY = clamp(centerY + rand(-66, 64), safeTop, H * 0.62);
    const endY = clamp(centerY + rand(-66, 72), safeTop, H * 0.62);
    if (isMeteorPathSafe(startY, endY, curve, safeTop, safeBottom)) {
      return { centerY, curve, startY, endY };
    }
  }

  const centerY = rand(H * 0.28, H * 0.46);
  const curve = rand(-curvePower * 0.45, curvePower * 0.45);
  return {
    centerY,
    curve,
    startY: clamp(centerY + rand(-44, 44), safeTop, safeBottom),
    endY: clamp(centerY + rand(-44, 44), safeTop, safeBottom),
  };
}

function isMeteorPathSafe(startY, endY, curve, safeTop, safeBottom) {
  for (let i = 0; i <= 12; i += 1) {
    const t = i / 12;
    const y = startY + (endY - startY) * t + Math.sin(t * Math.PI) * curve;
    if (y < safeTop || y > safeBottom) return false;
  }
  return true;
}

function spawnWave() {
  pendingNextWave = 0;
  const biome = biomeForScore();
  const requiredCount = clamp(1 + Math.floor(game.score / 24), 1, 2);
  const list = [];
  const requiredSpacing = biome.id === "dark" ? 1.22 : biome.id === "snow" ? 1.18 : 1.12;
  const occupiedDelays = [];

  for (let i = 0; i < requiredCount; i += 1) {
    const kind = meteorKind();
    const delay = i * requiredSpacing + rand(0, 0.14);
    occupiedDelays.push(delay);
    list.push(makeMeteor(kind, delay));
  }

  if (game.score >= 6 && Math.random() < 0.28 + Math.min(game.score * 0.004, 0.18)) {
    const delay = findBonusDelay(occupiedDelays, requiredSpacing);
    if (delay !== null) {
      occupiedDelays.push(delay);
      list.push(makeMeteor("gold", delay));
    }
  }

  if (game.score >= 4 && Math.random() < 0.42) {
    const delay = findBonusDelay(occupiedDelays, requiredSpacing);
    if (delay !== null) list.push(makeMeteor("danger", delay));
  }

  game.meteors.push(...list.sort((a, b) => a.delay - b.delay));
  game.message = `${biome.name} ${game.wave}`;
}

function findBonusDelay(occupiedDelays, requiredSpacing) {
  const last = occupiedDelays.length ? Math.max(...occupiedDelays) : 0;
  const candidates = [
    last + rand(0.92, 1.2),
    last + rand(1.28, 1.62),
    last + rand(1.72, 2.05),
  ];
  for (const candidate of candidates) {
    const tooClose = occupiedDelays.some((delay) => Math.abs(delay - candidate) < requiredSpacing * 0.82);
    if (!tooClose) return candidate;
  }
  return last + requiredSpacing * 1.08;
}

function startGame() {
  if (game.mode === "menu") {
    startTransition();
    return;
  }
  beginPlaying();
}

function startTransition() {
  transition = { active: true, t: 0, duration: 1.25 };
  game.mode = "transition";
  hideOverlay();
  closeShop();
}

function beginPlaying() {
  pendingNextWave = 0;
  transition.active = false;
  game = makeGame("playing");
  hideOverlay();
  closeShop();
  spawnWave();
  updateHud();
}

function pauseGame() {
  if (game.mode === "playing") {
    game.mode = "paused";
    showOverlay("PAUSE", "", "Continue", "pause");
  } else if (game.mode === "paused") {
    game.mode = "playing";
    hideOverlay();
  }
}

function endGame(title, text, sound = "miss") {
  if (game.mode === "gameover") return;
  game.mode = "gameover";
  save.best = Math.max(save.best || 0, game.score);
  persist();
  shake = 0;
  play(sound);
  ui.deadScore.textContent = game.score;
  ui.deadCrystals.textContent = String(game.runCrystals || 0);
  showOverlay("DEAD", "", "", "dead");
}

function showOverlay(title, text, buttonText, mode = "panel") {
  ui.overlayTitle.textContent = title;
  ui.overlayText.textContent = text;
  ui.primaryBtn.textContent = buttonText;
  ui.overlayStats.hidden = mode !== "dead";
  ui.overlay.classList.remove("menu-overlay", "pause-overlay", "dead-overlay");
  if (mode === "menu") ui.overlay.classList.add("menu-overlay");
  if (mode === "pause") ui.overlay.classList.add("pause-overlay");
  if (mode === "dead") ui.overlay.classList.add("dead-overlay");
  ui.overlay.classList.add("is-visible");
}

function hideOverlay() {
  ui.overlay.classList.remove("is-visible");
}

function goMainMenu() {
  transition.active = false;
  pendingNextWave = 0;
  shake = 0;
  game = makeGame("menu");
  closeShop();
  hideOverlay();
  updateHud();
}

function launch() {
  if (game.mode !== "playing" || game.cooldown > 0) return;
  if (!game.launcher || game.launcher.reload < 1) return;

  play("throw");
  const skin = currentSkin();
  const y = launcherY();
  game.shurikens.push({
    x: W / 2,
    y,
    vy: -1320,
    radius: 24,
    rotation: menuSpin,
    spin: 19,
    spent: false,
    img: skin.src,
    trail: [],
  });
  game.cooldown = 0.34;
  game.launcher.reload = 0;
  game.launcher.wait = 0.18;
}

function update(dt) {
  if (game.mode !== "paused" && game.mode !== "gameover") {
    menuSpin += dt * (game.mode === "menu" || game.mode === "transition" ? 2.25 : 1.2);
  }
  if (game.mode === "transition") {
    transition.t += dt / transition.duration;
    if (transition.t >= 1) beginPlaying();
    return;
  }
  if (game.mode !== "playing") return;

  game.cooldown = Math.max(0, game.cooldown - dt);
  updateLauncher(dt);
  shake = Math.max(0, shake - dt * 38);

  updateShurikens(dt);
  updateMeteors(dt);
  updateSparks(dt);
  updatePickups(dt);
  checkCollisions();
  checkWaveClear(dt);
}

function updateLauncher(dt) {
  if (!game.launcher) game.launcher = { reload: 1, wait: 0 };
  if (game.launcher.wait > 0) {
    game.launcher.wait = Math.max(0, game.launcher.wait - dt);
    return;
  }
  game.launcher.reload = Math.min(1, game.launcher.reload + dt / 0.24);
}

function updateShurikens(dt) {
  for (const shuriken of game.shurikens) {
    shuriken.y += shuriken.vy * dt;
    shuriken.rotation += shuriken.spin * dt;
    ageTrail(shuriken.trail, dt, 0.12, 12);
    shuriken.trail.unshift({ x: shuriken.x, y: shuriken.y, age: 0 });
  }
  game.shurikens = game.shurikens.filter((item) => item.y > -90 && !item.remove);
}

function updateMeteors(dt) {
  for (const meteor of game.meteors) {
    if (meteor.delay > 0) {
      meteor.delay -= dt;
      continue;
    }

    meteor.active = true;
    meteor.t += dt / meteor.duration;
    const t = clamp(meteor.t, 0, 1);
    meteor.x = meteor.startX + (meteor.endX - meteor.startX) * t;
    meteor.y = meteor.startY + (meteor.endY - meteor.startY) * t + Math.sin(t * Math.PI) * meteor.curve;
    meteor.rotation += meteor.spin * dt;
    meteor.hitFlash = Math.max(0, meteor.hitFlash - dt * 5);
    ageTrail(meteor.trail, dt, meteorTrailMaxAge(meteor), 96);
    meteor.trail.unshift({ x: meteor.x, y: meteor.y, age: 0 });

    if (meteor.t >= 1) {
      meteor.remove = true;
      if (meteor.required) {
        endGame("Пропущено", "Один метеорит пролетів повз.", "miss");
      }
    }
  }
  game.meteors = game.meteors.filter((item) => !item.remove);
}

function meteorTrailMaxAge(meteor) {
  return 0.62 + meteor.speedRatio * 0.16 + (meteor.kind === "dark" ? 0.05 : 0);
}

function updateSparks(dt) {
  for (const spark of game.sparks) {
    spark.x += spark.vx * dt;
    spark.y += spark.vy * dt;
    spark.vy += 160 * dt;
    spark.vx *= 0.992;
    spark.vy *= 0.992;
    spark.rotation += spark.spin * dt;
    spark.trail.unshift({ x: spark.x, y: spark.y });
    spark.trail.length = Math.min(spark.trail.length, 9);
    spark.life -= dt;
  }
  game.sparks = game.sparks.filter((item) => item.life > 0);
}

function updatePickups(dt) {
  for (const pickup of game.pickups) {
    pickup.x += pickup.vx * dt;
    pickup.y += pickup.vy * dt;
    pickup.vy += 90 * dt;
    pickup.life -= dt;
  }
  game.pickups = game.pickups.filter((item) => item.life > 0);
}

function checkCollisions() {
  for (const shuriken of game.shurikens) {
    if (shuriken.spent) continue;

    for (const meteor of game.meteors) {
      if (!meteor.active || meteor.remove) continue;
      const radius = shuriken.radius + meteor.size * (meteor.hitScale || 0.36);
      if (dist(shuriken, meteor) > radius) continue;

      shuriken.spent = true;
      shuriken.remove = true;

      if (meteor.kind === "danger") {
        burst(meteor.x, meteor.y, "danger", 24);
        endGame("Небезпечний удар", "Фіолетовий метеорит краще було пропустити.", "danger");
        return;
      }

      meteor.hp -= 1;
      meteor.hitFlash = 1;
      burst(meteor.x, meteor.y, meteor.kind, 22);
      play("hit");
      shake = Math.max(shake, 7);

      if (meteor.hp <= 0) {
        meteor.remove = true;
        game.score += 1;
        game.combo += 1;
        const earned = Math.random() <= (meteor.dropChance || 0) ? meteor.reward : 0;
        if (earned > 0) {
          game.runCrystals += earned;
          save.coins += earned;
          persist();
          dropCoins(meteor.x, meteor.y, earned);
        }
        updateHud();
      }
      break;
    }
  }
}

function checkWaveClear(dt) {
  const hasRequired = game.meteors.some((item) => item.required && !item.remove);
  if (hasRequired || game.mode !== "playing") return;

  if (!pendingNextWave) {
    pendingNextWave = 0.78;
    game.wave += 1;
    updateHud();
  }

  pendingNextWave -= dt;
  if (pendingNextWave <= 0) spawnWave();
}

function burst(x, y, kind, count) {
  const pieces = Math.max(9, Math.floor(count * 0.55));
  for (let i = 0; i < pieces; i += 1) {
    const a = rand(0, Math.PI * 2);
    const speed = rand(90, 310);
    game.sparks.push({
      x,
      y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      size: rand(10, 26),
      color: kind === "danger" ? "#3f344c" : kind === "gold" ? "#5b5140" : "#303234",
      edgeColor: kind === "gold" ? "#d5b63b" : kind === "danger" ? "#9c72e5" : "#777d7f",
      points: rand(3, 6) | 0,
      trail: [{ x, y }],
      rotation: rand(0, Math.PI * 2),
      spin: rand(-5, 5),
      life: rand(0.62, 1.05),
      maxLife: 1.05,
    });
  }
}

function dropCoins(x, y, amount) {
  const count = Math.max(0, Math.floor(amount));
  for (let i = 0; i < count; i += 1) {
    const angle = -Math.PI / 2 + rand(-0.95, 0.95);
    const speed = rand(68, 128) + i * 4;
    game.pickups.push({
      x: x + rand(-8, 8),
      y: y + rand(-8, 8),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.92 + rand(0, 0.18),
      maxLife: 1.1,
      value: 1,
    });
  }
}

function render() {
  const mobileOuter = usesMobileOuterBackground();
  if (mobileOuter) renderOuterBackground();
  else clearBackgroundCanvas();

  ctx = gameCtx;
  clearCanvas();
  applyGameTransform();
  ctx.save();
  if (shake > 0) {
    ctx.translate(rand(-shake, shake) * 0.35, rand(-shake, shake) * 0.35);
  }

  const isMenuLike = game.mode === "menu" || (game.mode === "paused" && game.shopPaused);
  const isTransition = game.mode === "transition";
  const blend = isTransition ? easeInOutCubic(clamp(transition.t, 0, 1)) : 0;

  if (!mobileOuter) {
    if (isTransition) {
      drawMenuBackground(1 - blend);
      drawGameBackground(blend);
    } else {
      if (isMenuLike) drawMenuBackground(1);
      else drawGameBackground(1);
    }

    drawAtmosphere(isTransition ? blend : isMenuLike ? 0 : 1);
    const vignetteStrength = isTransition ? 1 + (0.12 - 1) * blend : isMenuLike ? 1 : game.mode === "paused" ? 0.28 : 0.12;
    drawVignette(vignetteStrength);
  }

  if (isMenuLike || isTransition) {
    if (!mobileOuter) drawMenuTitle(isTransition ? 1 - blend : 1);
    drawMenuHero(isTransition ? blend : 0);
  } else if (game.mode !== "gameover") {
    drawMeteors();
    drawShurikens();
    drawLauncher();
    drawPickups();
    drawSparks();
    if (game.mode === "paused") drawPauseShade();
    if (!mobileOuter && game.mode === "gameover") drawDeadMenu();
  } else if (!mobileOuter) {
    drawDeadMenu();
  }
  ctx.restore();
}

function renderOuterBackground() {
  clearBackgroundCanvas();
  const previousCtx = ctx;
  const previousW = W;
  const previousH = H;
  ctx = backgroundCtx;
  W = BASE_W;
  H = screenH / renderScale;
  ctx.setTransform(renderDpr * renderScale, 0, 0, renderDpr * renderScale, 0, 0);

  const shopOpen = ui.shop.classList.contains("is-visible");
  const isMenuLike = game.mode === "menu" || (game.mode === "paused" && game.shopPaused);
  const isTransition = game.mode === "transition";
  const blend = isTransition ? easeInOutCubic(clamp(transition.t, 0, 1)) : 0;

  if (shopOpen) {
    drawMarketBackground(1);
    drawAtmosphere(0.25);
    drawVignette(0.32);
  } else if (game.mode === "gameover") {
    drawDeadMenu();
  } else if (isTransition) {
    menuBackgroundAnchorY = (H - BASE_H) / 2 + BASE_H * 0.49;
    drawMenuBackground(1 - blend);
    menuBackgroundAnchorY = null;
    drawGameBackground(blend);
    drawAtmosphere(blend);
    drawVignette(1 + (0.12 - 1) * blend);
    drawMenuTitleOuter(1 - blend);
  } else {
    if (isMenuLike) {
      menuBackgroundAnchorY = (H - BASE_H) / 2 + BASE_H * 0.49;
      drawMenuBackground(1);
      menuBackgroundAnchorY = null;
    } else {
      drawGameBackground(1);
    }
    drawAtmosphere(isMenuLike ? 0 : 1);
    drawVignette(isMenuLike ? 1 : game.mode === "paused" ? 0.28 : 0.12);
    if (isMenuLike) drawMenuTitleOuter(1);
  }

  if (game.mode === "paused") drawPauseShade();
  ctx = previousCtx;
  W = previousW;
  H = previousH;
}

function drawMenuBackground(alpha) {
  const img = images["main.png"] || images["Back.png"];
  if (menuBackgroundAnchorY === null) drawImageCover(img, alpha, 1.2);
  else drawImageCoverAnchoredY(img, menuBackgroundAnchorY, 0.5, alpha, 1.2);
  drawMenuEffects(alpha);
}

function drawMenuEffects(alpha) {
  if (alpha <= 0.01) return;
  const time = performance.now() * 0.001;
  const pivotX = W / 2;
  const pivotY = menuBackgroundAnchorY === null ? H * 0.49 : menuBackgroundAnchorY;
  const rayA = Math.sin(time * Math.PI * 0.32) * 0.075;
  const rayB = Math.sin(time * Math.PI * 0.27 + Math.PI * 0.65) * -0.058;
  const dotX = Math.sin(time * Math.PI * 0.18) * 10;
  const dotY = Math.cos(time * Math.PI * 0.15) * 12;

  ctx.save();
  if (menuBackgroundAnchorY === null) {
    drawImageCoverAround(images["Sun_Rays.png"], pivotX, pivotY, alpha * 0.95, rayA, 0, 0, 1.15);
    drawImageCoverAround(images["sun_rays2.png"], pivotX, pivotY, alpha * 0.82, rayB, 0, 0, 1.15);
    drawImageCoverAround(images["Dots_main.png"], pivotX, pivotY, alpha * 0.42, 0, dotX, dotY, 1.08);
  } else {
    drawImageCoverAroundAnchoredY(images["Sun_Rays.png"], pivotX, pivotY, 0.5, alpha * 0.95, rayA, 0, 0, 1.15);
    drawImageCoverAroundAnchoredY(images["sun_rays2.png"], pivotX, pivotY, 0.5, alpha * 0.82, rayB, 0, 0, 1.15);
    drawImageCoverAroundAnchoredY(images["Dots_main.png"], pivotX, pivotY, 0.5, alpha * 0.42, 0, dotX, dotY, 1.08);
  }
  ctx.restore();
}

function drawGameBackground(alpha) {
  if (alpha <= 0.01) return;
  drawImageCover(images["Main_asset (1).png"] || images["In-game.png"], alpha, 1.06);
  drawGameEffects(alpha);
  drawGameBackgroundDim(alpha);
}

function drawMarketBackground(alpha) {
  if (alpha <= 0.01) return;
  drawImageCover(images["Market_asset (1).png"], alpha, 1.06);
  const time = performance.now() * 0.001;
  const pivotX = W / 2;
  const pivotY = H * 1.18;
  const rayA = Math.sin(time * Math.PI * 0.16) * 0.026;
  const rayB = Math.sin(time * Math.PI * 0.12 + Math.PI * 0.62) * -0.021;
  const dotX = Math.sin(time * Math.PI * 0.14) * 8;
  const dotY = Math.cos(time * Math.PI * 0.12) * 10;

  drawImageCoverAround(images["Market_asset (2).png"], pivotX, pivotY, alpha * 0.76, rayA, 0, 0, 1.08);
  drawImageCoverAround(images["Market_asset (4).png"], pivotX, pivotY, alpha * 0.66, rayB, 0, 0, 1.1);
  drawImageCoverAround(images["Dots_main.png"], W / 2, H / 2, alpha * 0.34, 0, dotX, dotY, 1.05);
}

function drawGameEffects(alpha) {
  const time = performance.now() * 0.001;
  const pivotX = W / 2;
  const pivotY = H * 1.18;
  const rayA = Math.sin(time * Math.PI * 0.1) * 0.018;
  const rayB = Math.sin(time * Math.PI * 0.085 + Math.PI * 0.7) * -0.015;
  const dotX = Math.sin(time * Math.PI * 0.14) * 8;
  const dotY = Math.cos(time * Math.PI * 0.12) * 10;

  drawImageCoverAround(images["Main_asset (2).png"], pivotX, pivotY, alpha * 0.82, rayA, 0, 0, 1.11);
  drawImageCoverAround(images["Main_asset (4).png"], pivotX, pivotY, alpha * 0.72, rayB, 0, 0, 1.12);
  drawGameBottomSun(alpha, time);
  drawImageCoverAround(images["Dots_main.png"], W / 2, H / 2, alpha * 0.34, 0, dotX, dotY, 1.05);
}

function drawGameBottomSun(alpha, time) {
  const img = images["Main_asset (5).png"];
  if (!img || !img.complete || !img.naturalWidth) return;
  const pulse = 1 + Math.sin(time * Math.PI * 0.42) * 0.035;
  const width = W * 1.14 * pulse;
  const height = width * (img.naturalHeight / img.naturalWidth);
  ctx.save();
  ctx.globalAlpha = alpha * 0.95;
  ctx.drawImage(img, (W - width) / 2, H - height * 0.95, width, height);
  ctx.restore();
}

function drawGameBackgroundDim(alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(8, 15, 24, 0.035)";
  ctx.fillRect(0, 0, W, H);

  const lower = ctx.createLinearGradient(0, H * 0.48, 0, H);
  lower.addColorStop(0, "rgba(8, 15, 24, 0)");
  lower.addColorStop(1, "rgba(8, 15, 24, 0.045)");
  ctx.fillStyle = lower;
  ctx.fillRect(0, H * 0.48, W, H * 0.52);
  ctx.restore();
}

function drawAtmosphere(gameplayBlend) {
  ctx.save();
  ctx.globalAlpha = 0.08 + (0.03 - 0.08) * gameplayBlend;
  ctx.fillStyle = "#071020";
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, H, H * 0.03, W / 2, H, H * 0.34);
  const glowAlpha = 0.42 + (0.18 - 0.42) * gameplayBlend;
  const glowMid = 0.18 + (0.08 - 0.18) * gameplayBlend;
  glow.addColorStop(0, `rgba(195, 255, 75, ${glowAlpha})`);
  glow.addColorStop(0.42, `rgba(155, 224, 78, ${glowMid})`);
  glow.addColorStop(1, "rgba(155, 224, 78, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, H * 0.58, W, H * 0.42);
  ctx.restore();
}

function drawMenuTitle(alpha) {
  if (alpha <= 0.01) return;
  const hero = menuHeroMetrics(0);
  drawMenuTitleBetween(alpha, Math.max(112, H * 0.145), hero.y, hero.size, false);
}

function drawMenuTitleOuter(alpha) {
  if (alpha <= 0.01) return;
  const fieldTop = (H - BASE_H) / 2;
  const heroSize = Math.min(BASE_W, BASE_H) * 0.27;
  const heroY = fieldTop + BASE_H * 0.49;
  drawMenuTitleBetween(alpha, 88, heroY, heroSize, true);
}

function drawMenuTitleBetween(alpha, hudClear, heroY, heroSize, compact) {
  const title = images["Shuriken-master-.png"];
  if (title && title.complete && title.naturalWidth) {
    const heroTop = heroY - heroSize * 0.88;
    const available = Math.max(58, heroTop - hudClear);
    const naturalWidth = W * (compact ? 0.76 : 0.82);
    const naturalHeight = naturalWidth * (title.naturalHeight / title.naturalWidth);
    const titleWidth = naturalHeight > available ? naturalWidth * (available / naturalHeight) * 0.94 : naturalWidth;
    const titleHeight = titleWidth * (title.naturalHeight / title.naturalWidth);
    const y = clamp((hudClear + heroTop) / 2, hudClear + titleHeight / 2, heroTop - titleHeight / 2);
    drawImageFitWidth(title, W / 2, y, titleWidth, 0, alpha * 0.92);
    return;
  }
  ctx.save();
  ctx.globalAlpha = alpha * 0.68;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#eef4ee";
  ctx.font = `${Math.min(76, Math.max(42, W * 0.125))}px ShurikenBlock, sans-serif`;
  ctx.fillText("SHURIKEN", W / 2, H * 0.19);
  ctx.fillText("MASTER", W / 2, H * 0.27);
  ctx.restore();
}

function drawMenuHero(t = 0) {
  const skin = currentSkin();
  const { x, y, size } = menuHeroMetrics(t);

  ctx.save();
  const glowAlpha = clamp(1 - t * 6, 0, 1);
  if (glowAlpha > 0) {
    const pulse = 1 + Math.sin(performance.now() * 0.0018) * 0.035;
    drawSprite(images["Sun.png"], x, y, size * 1.5 * pulse, Math.sin(performance.now() * 0.0005) * 0.025, glowAlpha * 0.48);
  }
  drawSprite(images[skin.src], x, y, size, menuSpin);
  ctx.restore();
}

function drawMeteors() {
  for (const meteor of game.meteors) {
    if (!meteor.active) {
      if (meteor.kind === "danger") drawWarning(meteor);
      continue;
    }

    drawMeteorTail(meteor);

    drawSprite(images[meteor.img], meteor.x, meteor.y, meteor.size * (1 + meteor.hitFlash * 0.08), meteor.rotation);

    if (meteor.hp > 1) {
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.72)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, meteor.size * 0.48, -Math.PI / 2, Math.PI * 1.5);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function drawMeteorTail(meteor) {
  if (meteor.trail.length < 2) return;
  ctx.save();
  const head = meteor.trail[0];
  const firstTail = meteor.trail[1];
  const tail = meteor.trail[Math.min(meteor.trail.length - 1, 62)];
  let dx = tail.x - head.x;
  let dy = tail.y - head.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  dx /= len;
  dy /= len;
  const px = -dy;
  const py = dx;
  const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.006 + meteor.trailSeed);
  const visible = Math.min(meteor.trail.length, 68 + Math.round(meteor.speedRatio * 24));
  const baseWidth = meteor.size * (0.4 + meteor.speedRatio * 0.025 + pulse * 0.015);
  const startBehind = meteor.size * 0.16;
  const firstLen = Math.max(1, Math.hypot(firstTail.x - head.x, firstTail.y - head.y));
  const anchor = {
    x: head.x + ((firstTail.x - head.x) / firstLen) * startBehind,
    y: head.y + ((firstTail.y - head.y) / firstLen) * startBehind,
  };
  const tailPoints = meteor.trail
    .slice(1, visible)
    .filter((point) => Math.hypot(point.x - head.x, point.y - head.y) >= startBehind * 0.85);
  const points = [anchor, ...tailPoints];
  if (points.length < 2) {
    ctx.restore();
    return;
  }
  const colors = meteorTrailColors(meteor.kind);
  const outerColor = colors.outer;
  const midColor = colors.mid;

  drawTaperedTrailRibbon(points, baseWidth, outerColor, colors.outerAlpha, 0.04);
  drawTaperedTrailRibbon(points, baseWidth * 0.46, midColor, colors.midAlpha, 0.03);

  const smokeLimit = Math.min(meteor.trail.length, Math.max(18, Math.floor(visible * 0.48)));
  for (let i = 5; i < smokeLimit; i += 5) {
    const point = meteor.trail[i];
    const fade = 1 - i / smokeLimit;
    const wobble = Math.sin(performance.now() * 0.002 + meteor.trailSeed + i * 1.7) * meteor.size * 0.16;
    const size = meteor.size * (0.09 + fade * 0.12);
    drawSmokeCloud(
      point.x + px * wobble,
      point.y + py * wobble,
      size,
      fade * 0.28,
      colors.smoke,
      meteor.trailSeed + i,
    );
  }
  ctx.restore();
}

function meteorTrailColors(kind) {
  if (kind === "danger") {
    return {
      outer: "rgba(130, 86, 232, 0.54)",
      mid: "rgba(190, 148, 255, 0.22)",
      smoke: "#5c536b",
      outerAlpha: 0.8,
      midAlpha: 0.44,
    };
  }
  if (kind === "snow") {
    return {
      outer: "rgba(238, 250, 255, 0.62)",
      mid: "rgba(184, 229, 255, 0.25)",
      smoke: "#b9c4c7",
      outerAlpha: 0.78,
      midAlpha: 0.42,
    };
  }
  if (kind === "dark") {
    return {
      outer: "rgba(82, 78, 88, 0.5)",
      mid: "rgba(160, 151, 170, 0.14)",
      smoke: "#55575a",
      outerAlpha: 0.72,
      midAlpha: 0.34,
    };
  }
  return {
    outer: "rgba(255, 214, 34, 0.5)",
    mid: "rgba(255, 176, 28, 0.16)",
    smoke: "#6b6f68",
    outerAlpha: 0.92,
    midAlpha: 0.44,
  };
}

function drawTaperedTrailRibbon(points, baseWidth, color, alpha, minTip = 0.02) {
  if (points.length < 2) return;
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    let tx = b.x - a.x;
    let ty = b.y - a.y;
    const length = Math.max(1, Math.hypot(tx, ty));
    tx /= length;
    ty /= length;
    const nx = -ty;
    const ny = tx;
    const t0 = (i - 1) / (points.length - 1);
    const t1 = i / (points.length - 1);
    const w0 = taperedTrailWidth(baseWidth, t0, minTip);
    const w1 = taperedTrailWidth(baseWidth, t1, minTip * 0.5);
    ctx.globalAlpha = alpha * Math.pow(1 - t0, 0.18);
    ctx.beginPath();
    ctx.moveTo(a.x + nx * w0, a.y + ny * w0);
    ctx.lineTo(b.x + nx * w1, b.y + ny * w1);
    ctx.lineTo(b.x - nx * w1 * 0.78, b.y - ny * w1 * 0.78);
    ctx.lineTo(a.x - nx * w0 * 0.78, a.y - ny * w0 * 0.78);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function taperedTrailWidth(baseWidth, t, minTip) {
  return baseWidth * Math.max(minTip, Math.pow(1 - t, 0.95));
}

function drawSmokeCloud(x, y, size, alpha, color, seed) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  const time = performance.now() * 0.001;
  for (let i = 0; i < 4; i += 1) {
    const angle = seed + i * 1.9 + Math.sin(time * 0.8 + seed) * 0.18;
    const radius = size * (0.44 + i * 0.07);
    const ox = Math.cos(angle) * size * 0.22;
    const oy = Math.sin(angle) * size * 0.18;
    ctx.beginPath();
    ctx.arc(x + ox, y + oy, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawWarning(meteor) {
  const incoming = 1 - clamp(meteor.delay / 1.2, 0, 1);
  const x = meteor.startX < 0 ? 18 : W - 18;
  const y = clamp(meteor.startY, 90, H - 160);
  ctx.save();
  ctx.globalAlpha = 0.2 + incoming * 0.55;
  ctx.fillStyle = meteor.kind === "danger" ? "#9d6cff" : "#66e6ff";
  ctx.beginPath();
  ctx.arc(x, y, 8 + incoming * 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawShurikens() {
  for (const shuriken of game.shurikens) {
    drawShurikenTrail(shuriken.trail);
    drawSprite(images[shuriken.img], shuriken.x, shuriken.y, SHURIKEN_SIZE, shuriken.rotation);
  }
}

function drawShurikenTrail(points) {
  if (points.length < 2) return;
  ctx.save();
  ctx.lineCap = "round";
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const fade = 1 - i / points.length;
    ctx.globalAlpha = fade * 0.58;
    ctx.strokeStyle = "rgba(246, 252, 255, 0.78)";
    ctx.lineWidth = Math.max(2, 12 * fade);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y + 12);
    ctx.lineTo(b.x, b.y + 32);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLauncher() {
  const baseY = launcherY();
  const wait = game.launcher ? game.launcher.wait || 0 : 0;
  if (wait > 0) return;
  const reload = game.launcher ? clamp(game.launcher.reload, 0, 1) : 1;
  const eased = easeOutCubic(reload);
  const y = baseY + (1 - eased) * Math.max(96, H * 0.16);
  const skin = currentSkin();

  ctx.save();
  ctx.globalAlpha = 1;
  drawSprite(images[skin.src], W / 2, y, SHURIKEN_SIZE, menuSpin);
  ctx.restore();
}

function launcherY() {
  return H - Math.max(84, H * 0.11);
}

function drawPickups() {
  for (const pickup of game.pickups) {
    const alpha = clamp(pickup.life / pickup.maxLife, 0, 1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = "900 42px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText("+", pickup.x - 9, pickup.y + 1);
    ctx.restore();
    drawSprite(images["Crystal_3.png"], pickup.x + 13, pickup.y, 31, 0, alpha);
  }
}

function drawDeadStats() {
  ctx.save();
  const x = W / 2;
  const y = H * 0.51;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "38px ShurikenBlock, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  drawSprite(images["TrophyGold.png"], x - 34, y + 8, 46, -0.05, 0.95);
  ctx.fillText(String(game.score), x + 34, y + 8);
  ctx.font = "28px ShurikenBlock, sans-serif";
  ctx.fillText(`BEST ${save.best || 0}`, x, y + 54);
  ctx.restore();
}

function drawPauseShade() {
  ctx.save();
  ctx.fillStyle = "rgba(5, 9, 14, 0.58)";
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

function drawDeadMenu() {
  drawImageCover(images["Dead-menu.png"], 0.98, 1);
}

function drawSparks() {
  for (const spark of game.sparks) {
    const alpha = clamp(spark.life / spark.maxLife, 0, 1);
    drawShardTrail(spark, alpha);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = spark.color;
    ctx.translate(spark.x, spark.y);
    ctx.rotate(spark.rotation);
    ctx.beginPath();
    for (let i = 0; i < spark.points; i += 1) {
      const a = (i / spark.points) * Math.PI * 2;
      const r = spark.size * (0.42 + 0.28 * Math.sin(i * 2.1 + spark.size));
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = alpha * 0.75;
    ctx.strokeStyle = spark.edgeColor;
    ctx.lineWidth = Math.max(1, spark.size * 0.08);
    ctx.stroke();
    ctx.restore();
  }
}

function drawShardTrail(spark, alpha) {
  if (!spark.trail || spark.trail.length < 2) return;
  ctx.save();
  ctx.lineCap = "round";
  for (let i = spark.trail.length - 1; i > 0; i -= 1) {
    const a = spark.trail[i];
    const b = spark.trail[i - 1];
    const fade = (1 - i / spark.trail.length) * alpha;
    ctx.globalAlpha = fade * 0.55;
    ctx.strokeStyle = spark.edgeColor;
    ctx.lineWidth = Math.max(1, spark.size * 0.15 * fade);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTrail(points, color, width) {
  if (points.length < 2) return;
  ctx.save();
  ctx.lineCap = "round";
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    ctx.globalAlpha = 1 - i / points.length;
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, width * (1 - i / points.length));
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawVignette(strength = 1) {
  const g = ctx.createRadialGradient(W / 2, H * 0.42, H * 0.12, W / 2, H * 0.42, H * 0.75);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, `rgba(0,0,0,${0.55 * strength})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function updateHud() {
  ui.score.textContent = game.score;
  ui.wave.textContent = game.wave;
  ui.best.textContent = save.best || 0;
  ui.coins.textContent = save.coins;
  ui.shopCoins.textContent = save.coins;
  renderShop();
}

function renderShop() {
  ui.skinGrid.innerHTML = "";
  ui.variantStrip.innerHTML = "";

  const focus = focusedSkin();
  const current = currentSkin();
  const focusOwned = save.ownedSkins.includes(focus.id);
  const focusSelected = save.selectedSkin === focus.id;
  ui.shopPreview.src = `assets/${focusOwned && focus.id === current.family.id ? current.src : focus.src}`;
  ui.shopPriceValue.textContent = focusSelected ? "SELECTED" : focusOwned ? "SELECT" : focus.price;
  ui.shopPrice.classList.toggle("is-owned", focusOwned);
  ui.shopPrice.classList.toggle("is-selected", focusSelected);

  for (const variant of focus.variants) {
    const btn = document.createElement("button");
    btn.className = `variant-btn${variant === current.src ? " is-selected" : ""}`;
    btn.type = "button";
    btn.disabled = !focusOwned;
    const img = document.createElement("img");
    img.src = `assets/${variant}`;
    img.alt = "";
    btn.append(img);
    btn.addEventListener("click", () => {
      if (!focusOwned) return;
      save.selectedSkin = focus.id;
      save.selectedSkinSrc = variant;
      save.shopFocus = focus.id;
      persist();
      updateHud();
    });
    ui.variantStrip.append(btn);
  }

  for (const skin of skinData) {
    const owned = save.ownedSkins.includes(skin.id);
    const selected = save.selectedSkin === skin.id;
    const item = document.createElement("article");
    item.className = `skin${selected ? " is-selected" : ""}${owned ? "" : " is-locked"}`;
    item.dataset.price = skin.price;

    const btn = document.createElement("button");
    btn.className = "skin-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", selected ? "SELECTED" : owned ? "SELECT" : `${skin.price}`);
    btn.addEventListener("click", () => focusSkin(skin, item));

    const img = document.createElement("img");
    img.src = `assets/${skin.src}`;
    img.alt = "";

    const name = document.createElement("strong");
    name.textContent = skin.name;

    btn.append(img, name);
    if (!owned) {
      const price = document.createElement("span");
      price.className = "skin-price";
      price.textContent = skin.price;
      btn.append(price);
    }

    item.append(btn);
    ui.skinGrid.append(item);
  }
}

function focusSkin(skin, element) {
  save.shopFocus = skin.id;
  persist();
  if (element) {
    element.classList.add("is-pressed");
    window.setTimeout(() => element.classList.remove("is-pressed"), 150);
  }
  updateHud();
}

function activateFocusedSkin() {
  const skin = focusedSkin();
  ui.shopPrice.classList.add("is-pressed");
  window.setTimeout(() => ui.shopPrice.classList.remove("is-pressed"), 150);

  if (save.ownedSkins.includes(skin.id)) {
    save.selectedSkin = skin.id;
    save.selectedSkinSrc = skin.variants.includes(save.selectedSkinSrc) ? save.selectedSkinSrc : skin.src;
    persist();
    updateHud();
    return;
  }

  if (save.coins < skin.price) {
    updateHud();
    return;
  }

  save.coins -= skin.price;
  save.ownedSkins.push(skin.id);
  save.selectedSkin = skin.id;
  save.selectedSkinSrc = skin.src;
  persist();
  updateHud();
}

function openShop() {
  if (game.mode !== "menu") return;
  hideOverlay();
  save.shopFocus = save.selectedSkin || "classic";
  updateHud();
  ui.shop.classList.add("is-visible");
}

function closeShop() {
  ui.shop.classList.remove("is-visible");
}

function loop(now) {
  const dt = Math.min(0.032, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  document.body.dataset.mode = game.mode;
  document.body.dataset.shop = ui.shop.classList.contains("is-visible") ? "open" : "closed";
  render();
  requestAnimationFrame(loop);
}

function handleLaunchInput() {
  if (ui.shop.classList.contains("is-visible")) return;
  if (game.mode === "transition" || game.mode === "gameover") return;
  if (game.mode !== "playing") return;
  launch();
}

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  if (ui.shop.classList.contains("is-visible")) return;
  if (game.mode === "menu") {
    const point = clientToGame(event.clientX, event.clientY);
    if (isInsideMenuHero(point.x, point.y)) startTransition();
    return;
  }
  handleLaunchInput();
});

window.addEventListener("keydown", (event) => {
  if (event.code !== "Space") return;
  event.preventDefault();
  handleLaunchInput();
});

ui.primaryBtn.addEventListener("click", () => {
  if (game.mode === "paused") {
    pauseGame();
  } else if (game.mode === "gameover" || game.mode === "menu") {
    startGame();
  } else {
    hideOverlay();
  }
});

ui.pauseBtn.addEventListener("click", pauseGame);
ui.restartBtn.addEventListener("click", startGame);
ui.overlayRestartBtn.addEventListener("click", () => beginPlaying());
ui.overlayHomeBtn.addEventListener("click", goMainMenu);
ui.shopBtn.addEventListener("click", () => {
  if (game.mode !== "menu") return;
  if (ui.shop.classList.contains("is-visible")) closeShop();
  else openShop();
});
ui.closeShopBtn.addEventListener("click", closeShop);
ui.shopPrice.addEventListener("click", activateFocusedSkin);

window.addEventListener("resize", resize);

const loadingHold = new Promise((resolve) => window.setTimeout(resolve, 1050));

Promise.all([loadImages(), loadingHold]).then(() => {
  resize();
  document.body.dataset.mode = game.mode;
  document.body.dataset.shop = "closed";
  document.body.dataset.loading = "done";
  if (ui.loading) window.setTimeout(() => ui.loading.remove(), 520);
  hideOverlay();
  updateHud();
  requestAnimationFrame(loop);
});
