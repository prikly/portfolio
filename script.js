/* =========================================================
   1. PIXEL STICKERS
   Each sticker is a little grid of letters. Every letter is a colour
   (see PALETTE). "." means empty. The code turns them into pixels.
   ========================================================= */
const PALETTE = {
    K: "#1a1a1a", // black outline
    W: "#ffffff", // white
    Y: "#ffd84d", // yellow
    y: "#fff0a0", // light yellow
    G: "#6cc24a", // green
    B: "#4fb3e8", // blue
    b: "#bfe8fa", // light blue
    R: "#ff6b5b", // red
    O: "#f5a623", // orange
    S: "#c9ccd1"  // silver grey
};

const SPRITES = {
    heart: [
        ".KKK.KKK.",
        "KRRRKRRRK",
        "KRWRRRRRK",
        "KRRRRRRRK",
        ".KRRRRRK.",
        "..KRRRK..",
        "...KRK...",
        "....K...."
    ],
    sparkle: [
        "....B....",
        "....B....",
        "...BBB...",
        "BBBBbBBBB",
        "...BBB...",
        "....B....",
        "....B...."
    ],
    cursor: [
        "K..........",
        "KK.........",
        "KWK........",
        "KWWK.......",
        "KWWWK......",
        "KWWWWK.....",
        "KWWWWWK....",
        "KWWWWWWK...",
        "KWWWWWWWK..",
        "KWWWWWKKKKK",
        "KWWKWWK....",
        "KWK.KWWK...",
        "KK..KWWK...",
        "K....KWWK..",
        ".....KWWK..",
        "......KK..."
    ],
    coin: [
        "...KKKK...",
        "..KYYYYK..",
        ".KYyyYYYK.",
        "KYyYYYYYYK",
        "KYyYYYYYYK",
        "KYYYYYYYOK",
        "KYYYYYYYOK",
        ".KYYYYOOK.",
        "..KOOOOK..",
        "...KKKK..."
    ],
    computer: [
        ".KKKKKKKKKK.",
        "KWWWWWWWWWWK",
        "KWbbbbbbbbWK",
        "KWbbKbbKbbWK",
        "KWbbbbbbbbWK",
        "KWbKbbbbKbWK",
        "KWbbKKKKbbWK",
        "KWWWWWWWWWWK",
        "KSSSSSSSSSSK",
        ".KKKKKKKKKK."
    ],
    folder: [
        "." + "K".repeat(6) + ".".repeat(9),
        "K" + "Y".repeat(6) + "K".repeat(8) + ".",
        "K" + "Y".repeat(14) + "K",
        "KY" + "y".repeat(12) + "YK",
        "KY" + "y".repeat(12) + "YK",
        "KY" + "y".repeat(12) + "YK",
        "KY" + "y".repeat(12) + "YK",
        "K" + "Y".repeat(14) + "K",
        "." + "K".repeat(14) + "."
    ],
    floppy: [
        "K".repeat(13),
        "KBBK" + "S".repeat(5) + "KBBK",
        "KBBK" + "S".repeat(5) + "KBBK",
        "KBBK" + "S".repeat(5) + "KBBK",
        "K" + "B".repeat(11) + "K",
        "K" + "B".repeat(11) + "K",
        "KB" + "W".repeat(9) + "BK",
        "KBW" + "K".repeat(7) + "WBK",
        "KB" + "W".repeat(9) + "BK",
        "KBW" + "K".repeat(7) + "WBK",
        "KB" + "W".repeat(9) + "BK",
        "K" + "B".repeat(11) + "K",
        "K".repeat(13)
    ]
};

function drawSprite(rows, scale) {
    let rects = "";
    rows.forEach((row, y) => {
        [...row].forEach((ch, x) => {
            if (PALETTE[ch]) {
                rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${PALETTE[ch]}"/>`;
            }
        });
    });
    const w = rows[0].length;
    const h = rows.length;
    return `<svg width="${w * scale}" height="${h * scale}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}

document.querySelectorAll("[data-sprite]").forEach(el => {
    const rows = SPRITES[el.dataset.sprite];
    el.innerHTML = drawSprite(rows, Number(el.dataset.scale) || 6);
});


/* =========================================================
   2. DRAGGABLE STICKERS
   ========================================================= */
let topLayer = 10;

document.querySelectorAll(".sticker").forEach(el => {
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    el.addEventListener("pointerdown", e => {
        const hero = el.parentElement.getBoundingClientRect();
        const left = el.offsetLeft;
        const top = el.offsetTop;

        // switch from "right/bottom" positioning to plain left/top
        el.style.left = left + "px";
        el.style.top = top + "px";
        el.style.right = "auto";
        el.style.bottom = "auto";

        offsetX = e.clientX - hero.left - left;
        offsetY = e.clientY - hero.top - top;

        dragging = true;
        el.setPointerCapture(e.pointerId);
        el.style.zIndex = ++topLayer;
        el.classList.add("dragging");
    });

    el.addEventListener("pointermove", e => {
        if (!dragging) return;
        const hero = el.parentElement.getBoundingClientRect();
        el.style.left = (e.clientX - hero.left - offsetX) + "px";
        el.style.top = (e.clientY - hero.top - offsetY) + "px";
    });

    const stopDrag = () => {
        dragging = false;
        el.classList.remove("dragging");
    };
    el.addEventListener("pointerup", stopDrag);
    el.addEventListener("pointercancel", stopDrag);
});


/* =========================================================
   3. TECH STACK TILES
   To add a tool: add a line like  ["Name", "folder/file-name"],
   Icons come from https://devicon.dev (search a tool there).
   To remove a tool: delete its line.
   ========================================================= */
const STACK = [
    ["HTML", "html5/html5-original"],
    ["CSS", "css3/css3-original"],
    ["JavaScript", "javascript/javascript-original"],
    ["React", "react/react-original"],
    ["Bootstrap", "bootstrap/bootstrap-original"],
    ["WordPress", "wordpress/wordpress-plain"],
    ["Python", "python/python-original"],
    ["Git", "git/git-original"],
    ["GitHub", "github/github-original"],
    ["VS Code", "vscode/vscode-original"],
    ["Figma", "figma/figma-original"]
];

const stackGrid = document.getElementById("stackGrid");
STACK.forEach(([name, path]) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML =
        `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${path}.svg" alt="${name}">` +
        `<span>${name}</span>`;
    stackGrid.appendChild(tile);
});


/* =========================================================
   4. TIMELINE: the green line grows as you scroll
   ========================================================= */
const timeline = document.querySelector(".timeline");
const fill = document.querySelector(".timeline-fill");
const items = document.querySelectorAll(".t-item");

function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const trigger = window.innerHeight * 0.5; // the middle of the screen

    let progress = (trigger - rect.top) / rect.height;
    progress = Math.min(Math.max(progress, 0), 1);
    fill.style.height = progress * 100 + "%";

    items.forEach(item => {
        item.classList.toggle("active", item.getBoundingClientRect().top < trigger);
    });
}

window.addEventListener("scroll", updateTimeline, { passive: true });
window.addEventListener("resize", updateTimeline);
updateTimeline();


/* =========================================================
   5. FOOTER YEAR
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();
/* =========================================================
   6. RESUME POP-UP
   ========================================================= */
const resumeBtn = document.getElementById("resumeBtn");
const resumeModal = document.getElementById("resumeModal");
const resumeFrame = document.getElementById("resumeFrame");

function openResume() {
    // load the PDF only the first time it is opened
    if (!resumeFrame.getAttribute("src")) {
        resumeFrame.setAttribute("src", "resume.pdf");
    }
    resumeModal.classList.add("open");
    resumeModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
}

function closeResume() {
    resumeModal.classList.remove("open");
    resumeModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
}

resumeBtn.addEventListener("click", e => {
    e.preventDefault();          // stops the normal link behaviour
    openResume();
});

// close with the x button, or by clicking the dark area outside the window
resumeModal.addEventListener("click", e => {
    if (e.target === resumeModal || e.target.closest("[data-close]")) closeResume();
});

// close with the Esc key
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeResume();
});