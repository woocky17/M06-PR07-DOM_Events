document.getElementById("stickyMenu").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addElementToBody,
    });
  }
});

function addElementToBody() {
  let newDiv = document.createElement("div");
  newDiv.innerHTML =
    "<div><button id='informacioImatges'>INFORMACIO IMATGES</button><button id='preuMesPetit'>PREU MES PETIT</button></div>";
  newDiv.style.position = "fixed";
  newDiv.style.top = "50%";
  newDiv.style.right = "10px";
  newDiv.style.transform = "translateY(-50%)";
  newDiv.style.backgroundColor = "#333";
  newDiv.style.color = "white";
  newDiv.style.padding = "10px 20px";
  newDiv.style.borderRadius = "10px";
  newDiv.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  newDiv.style.cursor = "pointer";

  document.body.appendChild(newDiv);

  document
    .getElementById("informacioImatges")
    .addEventListener("click", async () => {
      let images = document.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.dataset.tooltipAdded) {
          img.addEventListener("mouseenter", () => {
            const informationDiv = document.createElement("div");
            informationDiv.className = "remove";
            informationDiv.textContent = img.alt || "No description";

            informationDiv.style.position = "absolute";
            informationDiv.style.background = "rgb(204, 127, 127)";
            informationDiv.style.color = "#333";
            informationDiv.style.padding = "8px 12px";
            informationDiv.style.border = "2px solid rgb(204, 0, 0)";
            informationDiv.style.fontSize = "14px";
            informationDiv.style.fontFamily = "'Arial', sans-serif";
            informationDiv.style.borderRadius = "8px";
            informationDiv.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
            informationDiv.style.zIndex = 10000;

            document.body.appendChild(informationDiv);

            const rect = img.getBoundingClientRect();
            informationDiv.style.top = `${rect.top + window.scrollY - 30}px`;
            informationDiv.style.left = `${rect.left}px`;
          });

          img.addEventListener("mouseleave", () => {
            let deleteInformationDiv = document.querySelectorAll(".remove");
            deleteInformationDiv.forEach((divRemove) => {
              divRemove.remove();
            });
          });

          img.dataset.tooltipAdded = "true";
        }
      });
    });
  document.getElementById("preuMesPetit").addEventListener("click", () => {
    let priceElements = document.querySelectorAll(
      "._cDEzb_p13n-sc-price_3mJ9Z"
    );

    let minPrice = Infinity;
    let minPriceElement = null;

    priceElements.forEach((priceElement) => {
      let priceText = priceElement.innerText
        .replace(/[^\d,.]/g, "")
        .replace(",", ".");
      let price = parseFloat(priceText);

      if (!isNaN(price) && price < minPrice) {
        minPrice = price;
        minPriceElement = priceElement;
      }
    });

    if (minPriceElement) {
      let productElement = minPriceElement.closest("div");

      productElement.style.border = "3px solid red";
      productElement.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
      productElement.style.padding = "10px";
      productElement.style.borderRadius = "10px";

      productElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}
