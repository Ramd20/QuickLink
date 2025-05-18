// Hardcoded list of links (for now)
const links = [
    { label: "GitHub", url: "https://github.com/yourusername" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourprofile" }
  ];
  
  // Get the container from popup.html
  const container = document.getElementById("links-container");
  
  // For each link, create a row with label and copy button
  links.forEach(link => {
    const item = document.createElement("div");
    item.className = "link-item";
  
    const label = document.createElement("span");
    label.className = "link-label";
    label.textContent = link.label;
  
    const button = document.createElement("button");
    button.className = "copy-btn";
    button.textContent = "Copy";
  
    // When button is clicked, copy the link to clipboard
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(link.url)
        .then(() => alert(`${link.label} copied!`))
        .catch(err => console.error("Copy failed", err));
    });
  
    // Add label + button to the row
    item.appendChild(label);
    item.appendChild(button);
  
    // Add row to the popup container
    container.appendChild(item);
  });
  