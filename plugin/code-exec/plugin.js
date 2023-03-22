window.RevealCodeExec = () => ({
  id: "code-exec",
  init: () => {
    const codeblocks = document.querySelectorAll("pre.code-wrapper[runnable]");
    for (const code of codeblocks) {
      const runTheCode = "Run the code!";
      const div = document.createElement("div");
      code.contentEditable = "true";
      code.style.position = "relative";
      div.style.cursor = "pointer";
      div.style.width = "100%";
      div.style.zIndex = "10";
      div.style.top = "100%";
      div.style.bottom = "0";
      div.style.background = "white";
      div.style.position = "absolute";
      div.innerText = runTheCode;
      div.style.height = "fit-content";
      div.onclick = async () => {
        if (div.innerText !== runTheCode) {
          return (div.innerText = runTheCode);
        }
        div.innerText = "Loading...";
        const body = (
          code.querySelector("code.visible.current-fragment") || code.querySelector("code")
        ).textContent;
        console.log(body);
        const res = await fetch("http://localhost:3000", {
          method: "POST",
          body,
        });
        const text = await res.text()
        div.innerText = text || runTheCode;
      };
      code.appendChild(div);
    }
  },
});
