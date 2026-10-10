// X Glassmorphism — individual element controls (all start at 0)

const DEFAULTS = {
  enabled: true,
  bgImage: "",
  blurAmount: 8,
  textColor: "#ffffff",
  textOpacity: 1,
  overlayColor: "#000000",
  // Individual areas (all start at 0)
  timelineOpacity: 0,
  toolbarMainOpacity: 0,
  toolbarReplyOpacity: 0,
  toolbarPostOpacity: 0,
  composerAreaOpacity: 0,
  toolbarContainerOpacity: 0,
  navOpacity: 0,
  tabsOpacity: 0,
  composerOpacity: 0,
  composerToolbarOpacity: 0,
  searchOpacity: 0,
  searchOuterOpacity: 0,
  searchFormOpacity: 0,
  searchInnerOpacity: 0,
  searchKemksiOpacity: 0,
  premiumOpacity: 0,
  trendsOpacity: 0,
  whoToFollowOpacity: 0,
  primaryColumnOpacity: 0,
  sidebarColumnOpacity: 0
};

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function applySettings(settings) {
  const s = { ...DEFAULTS, ...settings };

  const styleId = "x-glass-dynamic";
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.documentElement.appendChild(style);
  }

  if (s.enabled === false) {
    style.textContent = `
      body::before { display: none !important; content: none !important; }
      body, #react-root, main { background-color: unset !important; }
    `;
    return;
  }

  const textRgba = hexToRgba(s.textColor, s.textOpacity);
  const timelineRgba = hexToRgba(s.overlayColor, s.timelineOpacity);
  const toolbarMainRgba = hexToRgba(s.overlayColor, s.toolbarMainOpacity);
  const toolbarReplyRgba = hexToRgba(s.overlayColor, s.toolbarReplyOpacity);
  const toolbarPostRgba = hexToRgba(s.overlayColor, s.toolbarPostOpacity);
  const composerAreaRgba = hexToRgba(s.overlayColor, s.composerAreaOpacity);
  const toolbarContainerRgba = hexToRgba(s.overlayColor, s.toolbarContainerOpacity);
  const navRgba = hexToRgba(s.overlayColor, s.navOpacity);
  const tabsRgba = hexToRgba(s.overlayColor, s.tabsOpacity);
  const searchRgba = hexToRgba(s.overlayColor, s.searchOpacity);
  const searchOuterRgba = hexToRgba(s.overlayColor, s.searchOuterOpacity);
  const searchFormRgba = hexToRgba(s.overlayColor, s.searchFormOpacity);
  const searchInnerRgba = hexToRgba(s.overlayColor, s.searchInnerOpacity);
  const searchKemksiRgba = hexToRgba(s.overlayColor, s.searchKemksiOpacity);
  const premiumRgba = hexToRgba(s.overlayColor, s.premiumOpacity);
  const trendsRgba = hexToRgba(s.overlayColor, s.trendsOpacity);
  const whoRgba = hexToRgba(s.overlayColor, s.whoToFollowOpacity);
  const primaryRgba = hexToRgba(s.overlayColor, s.primaryColumnOpacity);
  const sidebarRgba = hexToRgba(s.overlayColor, s.sidebarColumnOpacity);

  style.textContent = `
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-image: ${s.bgImage ? `url("${s.bgImage}")` : "none"};
    }

    body, article, [data-testid="tweet"], [data-testid="tweetText"],
    [data-testid="User-Name"], span, div, p, a {
      color: ${textRgba} !important;
    }

    /* Timeline posts */
    article,
    [data-testid="tweet"] {
      background-color: ${timelineRgba} !important;
    }

    /* Composer area — outer container with progressbar */
    div.r-kemksi.r-184en5c:has(> div > [role="progressbar"]) {
      background-color: ${composerAreaRgba} !important;
    }

    /* Toolbar container (r-jumn1c r-kemksi) */
    div.r-jumn1c.r-kemksi:has([data-testid="toolBar"]) {
      background-color: ${toolbarContainerRgba} !important;
    }

    /* Toolbar main icons area */
    div[data-testid="toolBar"] nav[role="navigation"] {
      background-color: ${toolbarMainRgba} !important;
    }

    /* Toolbar reply permission button */
    button[aria-label="Qualquer pessoa pode responder"] {
      background-color: ${toolbarReplyRgba} !important;
    }

    /* Toolbar post button area */
    button[data-testid="tweetButtonInline"] {
      background-color: ${toolbarPostRgba} !important;
    }

    /* Left navigation */
    nav[aria-label="Principal"],
    nav[aria-label="Primary"] {
      background-color: ${navRgba} !important;
    }

    /* Top tabs — fixed transparent */
    nav[aria-live="polite"][role="navigation"] div[role="tablist"] {
      background-color: transparent !important;
    }

    /* Premium only */
    div.r-kemksi.r-1kqtdi0:has(aside[aria-label="Assine o Premium"]),
    aside[aria-label="Assine o Premium"] {
      background-color: ${premiumRgba} !important;
    }

    /* Trends only — card with "Assuntos do momento" */
    div.r-kemksi.r-1kqtdi0:has([aria-label="Timeline: Assuntos do momento"]),
    section:has([aria-label="Timeline: Assuntos do momento"]) {
      background-color: ${trendsRgba} !important;
    }

    /* Who to follow */
    div.r-kemksi.r-1kqtdi0:has(aside[aria-label="Quem seguir"]),
    aside[aria-label="Quem seguir"] {
      background-color: ${whoRgba} !important;
    }

    /* Search levels */
    /* Outer */
    div:has(> div > div > form[aria-label="Buscar"]) {
      background-color: ${searchOuterRgba} !important;
    }
    /* Form */
    form[aria-label="Buscar"] {
      background-color: ${searchFormRgba} !important;
    }
    /* Inner r-kemksi */
    form[aria-label="Buscar"] div.r-kemksi,
    div.r-kemksi:has([data-testid="SearchBox_Search_Input"]) {
      background-color: ${searchKemksiRgba} !important;
    }
    /* Label area */
    [data-testid="SearchBox_Search_Input_label"] {
      background-color: ${searchInnerRgba} !important;
    }

    /* Primary and Sidebar columns — always transparent */
    [data-testid="primaryColumn"],
    [data-testid="sidebarColumn"] {
      background-color: transparent !important;
    }

    /* Force main containers transparent by default */
    body, #react-root, main {
      background-color: transparent !important;
      background: transparent !important;
    }

    /* No blur for now */
    .public-DraftStyleDefault-block,
    .public-DraftEditor-content {
      /* intentionally empty */
    }
  `;
}

function loadAndApply() {
  chrome.storage.local.get(["bgImage"], (local) => {
    chrome.storage.sync.get(DEFAULTS, (items) => {
      const bg = local.bgImage || items.bgImage || "";
      applySettings({ ...items, bgImage: bg });
    });
  });
}

loadAndApply();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" || area === "local") {
    loadAndApply();
  }
});