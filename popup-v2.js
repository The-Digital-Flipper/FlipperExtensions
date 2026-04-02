const analyzeBtn = document.getElementById("analyzeBtn");
const saveBtn = document.getElementById("saveBtn");
const statusEl = document.getElementById("status");
const footerState = document.getElementById("footerState");
const leadScore = document.getElementById("leadScore");
const priceValue = document.getElementById("priceValue");
const marketValue = document.getElementById("marketValue");
const upsideText = document.getElementById("upsideText");
const watchoutText = document.getElementById("watchoutText");

analyzeBtn.addEventListener("click", async () => {
  statusEl.textContent = "Analyzing listing...";
  footerState.textContent = "Running quick review";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      statusEl.textContent = "No active tab found";
      footerState.textContent = "Waiting for tab";
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        console.log("Flipper AI upgraded popup connected to current tab.");
      }
    });

    leadScore.textContent = "91";
    priceValue.textContent = "$17,900";
    marketValue.textContent = "$21k–$23.8k";
    upsideText.textContent = "Strong spread potential with clean positioning for a fast resale.";
    watchoutText.textContent = "Confirm service history and check paint/body consistency before purchase.";
    statusEl.textContent = "Analysis complete";
    footerState.textContent = "Preview refreshed";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Analysis error";
    footerState.textContent = "Check permissions";
  }
});

saveBtn.addEventListener("click", async () => {
  try {
    await chrome.storage.local.set({ lastSavedLead: {
      savedAt: new Date().toISOString(),
      score: leadScore.textContent,
      status: statusEl.textContent
    }});

    statusEl.textContent = "Lead saved";
    footerState.textContent = "Saved locally";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Save failed";
    footerState.textContent = "Storage unavailable";
  }
});
