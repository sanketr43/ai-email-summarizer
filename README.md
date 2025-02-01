# MVP AI Email Summarizer

A minimal Chrome Extension that summarizes Gmail emails using a **free Hugging Face** model ([facebook/bart-large-cnn](https://huggingface.co/facebook/bart-large-cnn)).

## Features
- Inserts a "Summarize Email" button when you're viewing a Gmail message.
- Sends the email text to Hugging Face for summarization.
- Displays the summary in an alert.

## Quick Setup

1. **Clone or Download** this repo.
2. **Obtain a free Hugging Face token** from:  
   [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
3. **Open `content_script.js`** and replace `"YOUR_HUGGING_FACE_TOKEN_HERE"` with your token.  
4. **Load the extension into Chrome**:
   - Visit `chrome://extensions/`
   - Enable **Developer mode** (toggle in the top-right).
   - Click **"Load unpacked"**.
   - Select the **`mvp-ai-email-summarizer`** folder.
5. **Navigate to Gmail**, open an email, and look for the **Summarize Email** button at bottom-right.
6. **Click** to see the summarized text in an alert.

## Notes
- This is an MVP with no usage limits or authentication logic.
- **Not secure** to store the API token in the client code. Ideally, calls to Hugging Face should go through a server to keep the token private.
- The DOM selectors for Gmail can break if Google updates their structure. Adjust as needed.

## Future Improvements
- Move summarization logic to a secure server (Node.js or serverless).
- Implement usage tracking and subscription plans.
- Add Slack, Outlook, Teams, etc. integrations.
- Polish the UI (replace `alert()` with a styled overlay).

Enjoy and customize as needed!
