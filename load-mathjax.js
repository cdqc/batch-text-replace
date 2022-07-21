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
    textarea.addEventListener("input", throttle(textareaHandler))
  }
})


// -----------------------------------------------------------------------------

function throttle(func, timeFrame = 500) {
  let lastTime = 0, now, calling, tId, _this, _arguments

  function call() { func.apply(_this, _arguments) }
  function delayedTrailingCall() { clearTimeout(tId); tId = setTimeout(call, timeFrame) }

  return function () {
    [_this, _arguments] = [this, arguments]

    calling || (now = Date.now()) - lastTime < timeFrame
      ? delayedTrailingCall()
      : (calling = true, call(), lastTime = now, calling = false)
  }
}