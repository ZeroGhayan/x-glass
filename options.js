const DEFAULTS = {
  enabled: true,
  bgImage: "",
  blurAmount: 8,
  textColor: "#ffffff",
  textOpacity: 1,
  overlayColor: "#000000",
  timelineOpacity: 0,
  toolbarMainOpacity: 0,
  toolbarReplyOpacity: 0,
  toolbarPostOpacity: 0,
  composerAreaOpacity: 0,
  toolbarContainerOpacity: 0,
  navOpacity: 0,
  searchOuterOpacity: 0,
  searchFormOpacity: 0,
  searchInnerOpacity: 0,
  searchKemksiOpacity: 0,
  premiumOpacity: 0,
  trendsOpacity: 0,
  whoToFollowOpacity: 0
};

const SLIDERS = [
  "timelineOpacity", "toolbarMainOpacity", "toolbarReplyOpacity", "toolbarPostOpacity",
  "composerAreaOpacity", "toolbarContainerOpacity", "navOpacity",
  "searchOuterOpacity", "searchFormOpacity", "searchInnerOpacity", "searchKemksiOpacity",
  "premiumOpacity", "trendsOpacity", "whoToFollowOpacity"
];

function updatePreview(src) {
  const img = document.getElementById("preview");
  if (src) {
    img.src = src;
    img.style.display = "block";
  } else {
    img.style.display = "none";
    img.src = "";
  }
}

function load() {
  chrome.storage.local.get(["bgImage"], (local) => {
    chrome.storage.sync.get(DEFAULTS, (items) => {
      document.getElementById("enabled").checked = items.enabled !== false;
      const bg = local.bgImage || items.bgImage || "";
      document.getElementById("bgImage").value = bg.startsWith("data:") ? "" : bg;
      document.getElementById("overlayColor").value = items.overlayColor;
      updatePreview(bg);

      SLIDERS.forEach(id => {
        const el = document.getElementById(id);
        const valId = id === "whoToFollowOpacity" ? "whoVal" : id.replace("Opacity", "Val");
        if (el) {
          el.value = items[id] ?? 0;
          const span = document.getElementById(valId);
          if (span) span.textContent = Number(items[id] ?? 0).toFixed(2);
        }
      });
    });
  });
}

function save() {
  const settings = {
    enabled: document.getElementById("enabled").checked,
    textColor: document.getElementById("textColor").value,
    textOpacity: Number(document.getElementById("textOpacity").value),
    overlayColor: document.getElementById("overlayColor").value
  };
  SLIDERS.forEach(id => {
    const el = document.getElementById(id);
    if (el) settings[id] = Number(el.value);
  });
  chrome.storage.sync.set(settings);

  const url = document.getElementById("bgImage").value.trim();
  if (url && !url.startsWith("data:")) {
    chrome.storage.local.set({ bgImage: url }, () => updatePreview(url));
  }
  document.getElementById("status").textContent = "Saved!";
  setTimeout(() => document.getElementById("status").textContent = "", 1500);
}

document.getElementById("file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    chrome.storage.local.set({ bgImage: reader.result }, () => {
      document.getElementById("status").textContent = "Background saved!";
      document.getElementById("bgImage").value = "";
      updatePreview(reader.result);
    });
  };
  reader.readAsDataURL(file);
});

document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.local.set({ bgImage: "" }, () => {
    document.getElementById("status").textContent = "Background cleared.";
    document.getElementById("file").value = "";
    document.getElementById("bgImage").value = "";
    updatePreview("");
  });
});

SLIDERS.forEach(id => {
  const el = document.getElementById(id);
  const valId = id === "whoToFollowOpacity" ? "whoVal" : id.replace("Opacity", "Val");
  if (el) {
    el.addEventListener("input", (e) => {
      const span = document.getElementById(valId);
      if (span) span.textContent = Number(e.target.value).toFixed(2);
      save();
    });
  }
});

document.getElementById("mainGroupOpacity").addEventListener("input", (e) => {
  const val = e.target.value;
  document.getElementById("mainGroupVal").textContent = Number(val).toFixed(2);
  ["timelineOpacity", "composerAreaOpacity", "toolbarContainerOpacity", "toolbarMainOpacity", "toolbarReplyOpacity", "toolbarPostOpacity"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.value = val;
      const valId = id.replace("Opacity", "Val");
      const span = document.getElementById(valId);
      if (span) span.textContent = Number(val).toFixed(2);
    }
  });
  save();
});

document.getElementById("searchGroupOpacity").addEventListener("input", (e) => {
  const val = e.target.value;
  document.getElementById("searchGroupVal").textContent = Number(val).toFixed(2);
  ["searchOuterOpacity", "searchFormOpacity", "searchInnerOpacity", "searchKemksiOpacity"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.value = val;
      const valId = id.replace("Opacity", "Val");
      const span = document.getElementById(valId);
      if (span) span.textContent = Number(val).toFixed(2);
    }
  });
  save();
});

document.getElementById("textColor").addEventListener("change", save);
document.getElementById("overlayColor").addEventListener("change", save);
document.getElementById("bgImage").addEventListener("change", save);
document.getElementById("save").addEventListener("click", save);

load();