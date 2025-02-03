document
  .getElementById("setBackgroundRed")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        document.body.style.backgroundColor = "red";
      },
    });
  });

document.getElementById("setLinkColor").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const color = document.getElementById("linkColorPicker").value;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: (color) => {
      document
        .querySelectorAll("a")
        .forEach((link) => (link.style.color = color));
    },
    args: [color],
  });
});

document.getElementById("removeImages").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      document.querySelectorAll("img").forEach((img) => img.remove());
    },
  });
});

document
  .getElementById("mostrarOcultar")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        password = document.getElementById("pass");
        if (password.type === "password") {
          password.type = "text";
        } else {
          password.type = "password";
        }
      },
    });
  });
