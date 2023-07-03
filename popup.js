const selector = document.querySelector("#speed-select");
chrome.storage.sync.get("speed", function (value) {
  if (value.speed === undefined) selector.value = "1";
  else selector.value = value.speed;
});

selector.addEventListener("change", (event) => {
  chrome.storage.sync.set({ speed: event.target.value });
});
