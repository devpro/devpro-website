document.querySelectorAll('pre').forEach((pre) => {
  // defines the clipboard SVG
  const clipboardSvg = `
    <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  `;

  // creates button with copy icon
  const button = document.createElement('button');
  button.className = 'copy-button';
  button.setAttribute('aria-label', 'Copy code to clipboard');
  button.innerHTML = clipboardSvg;

  // sets copy action on click
  button.onclick = () => {
    navigator.clipboard.writeText(pre.querySelector('code').textContent)
      .then(() => {
       button.innerHTML = `
          <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        setTimeout(() => {
          button.innerHTML = clipboardSvg;
        }, 2000);
      });
  };

  // adds button to code block
  pre.style.position = 'relative';
  pre.appendChild(button);
});
