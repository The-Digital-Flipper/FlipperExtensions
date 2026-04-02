const statusEl = document.getElementById('status');
const analyzeBtn = document.getElementById('analyzeBtn');

analyzeBtn.addEventListener('click', async () => {
  statusEl.textContent = 'Checking current tab...';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab || !tab.id) {
      statusEl.textContent = 'No active tab found.';
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        console.log('Flipper AI extension is connected to this page.');
      }
    });

    statusEl.textContent = 'Tab connected successfully.';
  } catch (error) {
    console.error(error);
    statusEl.textContent = 'Unable to access this tab.';
  }
});
