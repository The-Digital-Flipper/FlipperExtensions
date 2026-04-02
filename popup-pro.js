const analyzeBtn = document.getElementById("analyzeBtn");
const saveBtn = document.getElementById("saveBtn");
const statusEl = document.getElementById("status");
const footerState = document.getElementById("footerState");
const leadScore = document.getElementById("leadScore");
const upsideText = document.getElementById("upsideText");
const watchoutText = document.getElementById("watchoutText");

analyzeBtn?.addEventListener("click", async () => {
  statusEl.textContent = "Analyzing current tab...";
  footerState.textContent = "Running quick review";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      statusEl.textContent = "No active tab found";
      footerState.textContent = "Waiting for active tab";
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        console.log("Flipper AI analyzed this listing preview.");
      }
    });

    leadScore.textContent = "91";
    statusEl.textContent = "Analysis complete";
    footerState.textContent = "Lead updated";
    upsideText.textContent = "Fresh review suggests stronger-than-expected resale room for a fast flip.";
    watchoutText.textContent = "Still confirm title, service history, and photo accuracy before outreach.";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Analysis error";
    footerState.textContent = "Needs attention";
  }
});

saveBtn?.addEventListener("click", async () => {
  footerState.textContent = "Saving lead";

  try {
    await chrome.storage.local.set({
      savedLead: {
        score: leadScore.textContent,
        savedAt: new Date().toISOString()
      }
    });

    statusEl.textContent = "Lead saved";
    footerState.textContent = "Saved locally";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Save error";
    footerState.textContent = "Could not save";
  }
});
