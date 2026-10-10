// Service worker: handles file upload so popup can close safely
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_BG_IMAGE") {
    chrome.storage.local.set({ bgImage: message.dataUrl }, () => {
      sendResponse({ ok: true });
    });
    return true; // keep channel open for async response
  }
});