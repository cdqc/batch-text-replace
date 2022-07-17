window.MathJax = {
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    tags: "ams"
  },
  svg: {
    fontCache: "global"
  }
}

document.head.appendChild(
  Object.assign(document.createElement("script"), {
    src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
    async: true
  })
).addEventListener("load", async () => {
  await MathJax.startup.promise
  const regexTex = /(?:\$|\\\(|\\\[|\\begin\{.*?})/
  const textareaHandler = () => {
    if (!mjx._use && !regexTex.test(textarea.value)) return
    mjx._use = true
    mjx.hidden = ""
    mjx.innerHTML = textarea.value
    MathJax.texReset()
    try {
      MathJax.typeset([mjx])
    }
    catch (e) {
      e.message !== "MathJax retry" && console.error(e)
      MathJax.typesetClear()
    }
  }
  MathJax.startup.__domReady = (handlerName = textareaHandler.name) => {
    (textarea[handlerName] = textareaHandler)()
    textarea.addEventListener("input", textareaHandler)
  }
})