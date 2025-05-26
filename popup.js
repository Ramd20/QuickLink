const container = document.getElementById("links-container");
const form = document.getElementById("link-form");
const labelInput = document.getElementById("link-label");
const urlInput = document.getElementById("link-url");

// Load saved links on popup open
chrome.storage.local.get(["quickLinks"], (result) => {
  const links = result.quickLinks || [];
  renderLinks(links);
});

// Add new link
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const label = labelInput.value.trim();
  const url = urlInput.value.trim();
  if (!label || !url) return;

  chrome.storage.local.get(["quickLinks"], (result) => {
    const links = result.quickLinks || [];
    links.push({ label, url });
    chrome.storage.local.set({ quickLinks: links }, () => {
      renderLinks(links);
      labelInput.value = "";
      urlInput.value = "";
    });
  });
});

// Renders links
function renderLinks(links) {
  container.innerHTML = "";

  links.forEach((link, index) => {
    const item = document.createElement("div");
    item.className = "link-item";

    const label = document.createElement("span");
    label.className = "link-label";
    label.textContent = link.label;

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(link.url).then(() => {
    const msg = document.createElement("span");
    msg.textContent = "Copied!";
    msg.className = "copy-msg";
    copyBtn.after(msg);

  setTimeout(() => {
  msg.style.opacity = "0";
  setTimeout(() => msg.remove(), 300);
}, 1200);
})
        .catch(err => console.error("Copy failed", err));
    });

    item.appendChild(label);
    item.appendChild(copyBtn);
    container.appendChild(item);
  });
}
