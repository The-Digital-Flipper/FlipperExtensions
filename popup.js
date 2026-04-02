const analyzeBtn = document.getElementById("analyzeBtn");
const statusEl = document.getElementById("status");

analyzeBtn.addEventListener("click", async () => {
  statusEl.textContent = "Analyzing...";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      statusEl.textContent = "No active tab found";
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        console.log("Flipper AI extension injected successfully.");
      }
    });

    statusEl.textContent = "Tab analyzed";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Error";
  }
});
