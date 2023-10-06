document.addEventListener('DOMContentLoaded', function () {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
  
    sendButton.addEventListener('click', function () {
      const userString = userInput.value;
      // Open a new tab with the desired URL and pass the userString as a query parameter
      chrome.tabs.create({
        url: `http://localhost:5173/avivohayon/fashionai/extension/${encodeURIComponent(userString)}`
      });
    });
  });
  