// background.js (service_worker for MV3)

// We leave this mostly empty for now.
// In a more advanced build, you could handle subscription checks,
// license validation, or relay requests to a backend here.

chrome.runtime.onInstalled.addListener(() => {
  console.log("AI Email Summarizer extension installed.");
});
