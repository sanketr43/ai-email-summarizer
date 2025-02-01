// content_script.js
// Inject a "Summarize Email" button into Gmail UI and fetch summarization from Hugging Face.

function getEmailBody() {
  // Attempt to find the open email’s body text.
  // This selector might need adjustments if Gmail changes its DOM.
  const emailBodyElement = document.querySelector(".ii.gt");
  if (!emailBodyElement) return null;
  return emailBodyElement.innerText;
}

function insertSummarizeButton() {
  // Check if we already inserted the button.
  if (document.getElementById("mvpSummarizeBtn")) return;

  // Create the button
  const btn = document.createElement("button");
  btn.id = "mvpSummarizeBtn";
  btn.innerText = "Summarize Email";
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background-color: #4285f4;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
  `;

  btn.onclick = async () => {
    const emailText = getEmailBody();
    if (!emailText) {
      alert("Unable to find email content. Please open an email to summarize.");
      return;
    }

    try {
      // Call Hugging Face summarization
      const summary = await callHuggingFaceAPI(emailText);
      alert("Summary:\n\n" + summary);
    } catch (error) {
      console.error("Summarization error:", error);
      alert("Failed to summarize. Check console for details.");
    }
  };

  document.body.appendChild(btn);
}

async function callHuggingFaceAPI(text) {
  // Replace with your Hugging Face Inference API token
  const HF_API_TOKEN = "YOUR_HUGGING_FACE_TOKEN_HERE";

  // Bart Large CNN is good for summarization tasks
  const modelUrl = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

  const payload = {
    inputs: text,
    parameters: {
      max_length: 130,
      min_length: 30,
      do_sample: false
    }
  };

  const response = await fetch(modelUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${HF_API_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Hugging Face API error: " + (await response.text()));
  }

  const data = await response.json();
  if (data && Array.isArray(data) && data[0]?.summary_text) {
    return data[0].summary_text;
  } else {
    throw new Error("No summary returned from model.");
  }
}

// Observe Gmail content changes to insert the button when an email is open
let gmailObserver = null;

function startGmailObserver() {
  const targetNode = document.body;
  if (!targetNode) return;

  // Create an observer that checks for changes in the DOM
  gmailObserver = new MutationObserver(() => {
    // Try to insert the button whenever DOM changes
    insertSummarizeButton();
  });

  gmailObserver.observe(targetNode, { childList: true, subtree: true });
}

// Start observer when the content script loads
window.addEventListener("load", () => {
  setTimeout(() => {
    startGmailObserver();
    console.log("MVP Summarizer observer started.");
  }, 3000);
});
