const {
  checkbox: { MDCCheckbox },
  // formField: { MDCFormField },
  list: { MDCList },
  menu: { MDCMenu },
  ripple: { MDCRipple },
  snackbar: { MDCSnackbar },
  textField: { MDCTextField },
  iconButton: { MDCIconButtonToggle },
  tooltip: { MDCTooltip }
} = mdc;


[
  [".mdc-text-field", MDCTextField],
  [".mdc-button", MDCRipple],
  [".mdc-snackbar", MDCSnackbar],
  [".mdc-list", MDCList],
  [".mdc-checkbox", MDCCheckbox],
  // [".mdc-form-field", MDCFormField],
  [".mdc-menu", MDCMenu],
  [".mdc-icon-button", MDCRipple],
  [".mdc-icon-button", MDCIconButtonToggle],
  [".mdc-tooltip", MDCTooltip]
]
  .forEach(([_class, Class]) => {
    const __class = `${_class.replace(/^\W+/, "").replace(/\W+/g, "_")}__list`
    window[__class] = []
    each(
      document.querySelectorAll(_class),
      el => window[__class].push(new Class(el))
    )
  });

[mdc_text_field__list, mdc_tooltip__list, mdc_menu__list].forEach(assocDOMJS)


const the3label = [...the3.querySelectorAll("#the3>label")]
const the3textarea = the3label.map(_ => _.querySelector("textarea"))
const the4textarea = [textarea, ...the3textarea]
const $checkbox$ = "input[type=checkbox]"


function resizeWithTextarea() {
  const [w, h] = ["clientWidth", "clientHeight"].map(_ => `${textarea[_]}px`);
  [btns, ruleList].forEach(el => {
    el.style.setProperty(el === btns ? "width" : "max-width", w)
    el.classList[textarea.clientWidth < 600 ? "add" : "remove"]("narrow")
  })
  the3label.forEach(_ => _.style.cssText += `width: ${w}; height: ${h}`)
  document.body.style.maxWidth = `${1.25 * parseInt(w)}px`
  mjx.style.cssText += `max-width: ${w}; max-height: ${h}`
}
resizeWithTextarea()

new ResizeObserver(resizeWithTextarea).observe(textarea)


assoc_MDC_inst_with_tmpl(ruleList, { tmplId: "mdc-text-field--filled", class: MDCTextField, selector: "label" })
ruleList.exec = fn => each(btn_frzSel._filterNotFrz(checkboxes()), fn)
ruleList.addEventListener("click", ({ target }) => {
  target.matches($checkbox$) && btn_toggleAll._detectBoxesStat()
})

become.addEventListener("scroll", ({ target }) => {
  the3.querySelectorAll("textarea:not(#become)").forEach(_ => _.scrollTo(target.scrollLeft, target.scrollTop))
})



btns.addEventListener("pointerdown", ({ target, x, y }) => {
  if (target !== btns) return
  const { right: r, bottom: b, height: h } = btns.getBoundingClientRect()
  if ([r - x, b - y].every(v => v <= 32)) {
    btns.style.minHeight = btns.style.maxHeight = "unset"
    btns.style.height = `${h}px`
  }
  else if ([r - x, b - y].every(v => v > 128)) btns.style.removeProperty("max-height")
})
btn_diff._close = e => {
  const { wasViewing } = btn_diff._ctrl({ detail: { inst: true } })
  if (e && wasViewing) e.stopImmediatePropagation()
}
[btn_rplc, btn_undo, btn_cut, btn_menu].forEach(el => el.addEventListener("click", btn_diff._close))

btn_undo.addEventListener("click", () => {
  if (!textarea._oldVal) return
  textarea.value = textarea._oldVal
  textarea.textareaHandler()
})
function toggleAttr(el, add, attr) { el[`${add ? "set" : "remove"}Attribute`](attr, "") }
btn_diff.addEventListener("click", btn_diff._ctrl = ({ detail: { inst } = {} }) => {
  const viewing = !the3.hidden
  const closeView = inst || viewing
  !closeView && ["unchanged", "replaced", "become"].forEach(id => document.getElementById(id).value = btn_diff._alloc(id));
  // Then switch to:
  [textarea, the3].forEach((el, i) => el.hidden = !((i + closeView) % 2))
  btn_diff.dataset.viewing = !closeView
  btn_lineWrap._wrapAll()
  return { wasViewing: viewing }
})
btn_diff._alloc = targetAreaId => {
  if (!btn_diff._diffTables_src) return ""
  if (!btn_diff._diffTables) btn_diff._diffTables_gen()
  return btn_diff._diffTables.map(([str, mark]) => mark === targetAreaId ? str : str.replace(/\S/g, m => " ".repeat(/[^\x00-\xff]/.test(m) ? 2 : 1))).join("")
}
btn_diff._diffTables_gen = () => {
  if (!btn_diff._diffTables_src) return
  if (btn_diff._diffTables) return btn_diff._diffTables
  btn_diff._diffTables = Object.values(btn_diff._diffTables_src).flat().sort(([, i1, mk1], [, i2]) => i1 - i2 !== 0 ? i1 - i2 : mk1 === "become")
  btn_diff._diffTables.forEach(([str_i, , mk, hasMod], i, arr) => {
    if (mk !== "replaced" || hasMod) return arr[i].splice(0, Infinity, str_i, "", mk)
    mergeExactSubsetStrings([arr[i], arr[i + 1]].map(([str]) => str), arr, i)
  })
  function mergeExactSubsetStrings([str1, str2, isReversed], arr, i) {
    if (str1.length > str2.length) return mergeExactSubsetStrings([str2, str1, "(reversed)"], ...Array.prototype.slice.call(arguments, 1))
    if (!str2.includes(str1)) return
    const jud = { "isAdded": "become", "isDeleted": "replaced" }[isReversed ? "isDeleted" : "isAdded"]
    const { index } = str2.indexOf(str1)
    arr[i].splice(0, Infinity, str1, "", "unchanged")
    arr[i + 1].splice(0, Infinity, str2.substring(index + str1.length), "", jud, jud)
    index > 0 && arr.splice(i, 0, [str2.substring(0, index), "", jud])
  }
  btn_diff._diffTables.forEach(_ => { _.splice(1, 1); _.splice(2, 1) })
}
btn_diff._diffTables_reset = srcObj => {
  btn_diff._diffTables_src = srcObj
  delete btn_diff._diffTables
}
btn_rplc.addEventListener("click", () => {
  const _oldVal = textarea.value
  const textArr = [[_oldVal, 0, "unchanged"]]
  let count = 0, text, value, index_c/*current*/, index_a/*anchor*/, index_n/*next*/
  const rplcArr = []
  const rules = getOneRulePairAsStrArr().filter(([$find, , checked]) => checked && $find)
  if (!rules.length) return tell(ruleList.childElementCount ? "No rules are ticked" : "No search rules are filled")
  try {
    rules.forEach(([$find, $rplc], i) => {
      $find = $find.replace(/^\s*\/\*.*?\*\//, "")
      if (!$find) return
      $find = isStrReg($find) ? eval(/\/\w*g\w*$/.test($find) ? $find : `${$find}g`) : RegExp(escChars(btn_bslEsc._on ? $find : dblBsl($find)), "g")
      if (btn_bslEsc._on) $rplc = eval(`"${$rplc.replaceAll(`"`, `\\"`)}"`)
      // console.log($find, $rplc)
      rplcArr[i] = []
      while ([text, index_a] = textArr.shift() || [], text) {
        index_n = $find.lastIndex = 0
        const vm = text.matchAll($find)
        while ({ value } = vm.next(), value) {
          ++count;
          ({ index: index_c } = value, [value] = value)
          if (index_n < index_c) rplcArr[i].push([text.substring(index_n, index_c), index_a + index_n, "unchanged"])
          rplcArr[i].push([value, index_a + index_c, "replaced"], [value.replace($find, $rplc), index_a + index_c, "become"])
          index_n = index_c + value.length
        }
        if (index_n < text.length) rplcArr[i].push([text.substring(index_n), index_a + index_n, "unchanged"])
      }
      rplcArr[i].forEach(([, , mark], i, arr) => mark === "unchanged" && textArr.push(arr.splice(i, 1).shift()))
    })
  } catch (err) {
    return tell(err, Infinity)
  }
  const rplcArr_flat = rplcArr.flat()
  const ctgy = { unchanged: textArr, replaced: [], become: [] }
  rplcArr_flat.forEach(sim => ctgy[sim[2]].push(sim))
  const rplcResultSegs = ctgy.unchanged.concat(ctgy.become).sort(([, i1], [, i2]) => i1 - i2)
  const rplcResultText = rplcResultSegs.map(([segStr]) => segStr).join("")
  // console.log(JSON.stringify(ctgy, null, 2))
  if (_oldVal === rplcResultText)
    tell(count ? "Replaced but no change happened." : "No matches found")
  else {
    btn_diff._diffTables_reset(ctgy)
    textarea._oldVal = textarea.value
    textarea.value = rplcResultText
    tell(`Replaced <b>${count}</b> places`)
    textarea.textareaHandler()
  }
})
btn_cut.addEventListener("click", async () => {
  if (!textarea.value) return tell("No, the textbox is empty.")
  await navigator.clipboard.writeText(textarea.value)
  textarea.value = ""
})
btn_rem.addEventListener("click", () => textarea.value && (btn_rem._remed = textarea.value))
btn_rec.addEventListener("click", () => btn_rem._remed && (textarea.value = btn_rem._remed))
btn_toggleAll._states = ["check_box_outline_blank", "indeterminate_check_box", "check_box"]
btn_toggleAll.addEventListener("click", () => {
  const [n, m, y] = btn_toggleAll._states
  btn_toggleAll._nextState = [n, m].some(_ => _ === boxesStat.innerText) ? y : n
  ruleList.exec(el => el.checked = btn_toggleAll._nextState === y)
  btn_toggleAll._detectBoxesStat(btn_toggleAll._nextState)
})
btn_toggleAll._detectBoxesStat = direct => {
  if (typeof direct === "string") return boxesStat.innerText = direct
  const boxes = checkboxes(), coll = {}
  for (let i = 0, checked; i < boxes.length; ++i) {
    ({ checked } = boxes[i])
    coll[checked] = 1
    if (coll[checked] && coll[!checked]) break
  }
  const [n, m, y] = btn_toggleAll._states
  boxesStat.innerText = coll[true] ? coll[false] ? m : y : n
}
setTimeout(() => [btn_invSel, btn_addRule, btn_delRules, btn_selBtwn].forEach(_ => _.addEventListener("click", btn_toggleAll._detectBoxesStat)))
btn_invSel.addEventListener("click", () => {
  btn_frzSel._filterNotFrz(checkboxes()).forEach(el => el.checked = !el.checked)
})
btn_rvsOrd.addEventListener("click", () => {
  const sels = [[]]
  let pSib
  btn_frzSel._filterNotFrz(checkboxes(true)).map(el => el.closest("[rule-pair]")).forEach((rp, i, arr) => {
    pSib = rp.previousElementSibling
    if (pSib && arr[i - 1] && pSib !== arr[i - 1]) sels.push([])
    sels[sels.length - 1].push(rp)
  })
  let clnNode, oriNode
  sels.some(rps => rps.length === 1)
    ? sels.splice(0, Infinity, ...sels.flat()) && sels.find((rp, i, arr) => (
      i === Math.floor(arr.length / 2) || (
        oriNode = arr[arr.length - 1 - i], clnNode = oriNode.cloneNode(),
        oriNode.replaceWith(clnNode), rp.replaceWith(oriNode), clnNode.replaceWith(rp),
        null
      )))
    : sels.forEach(rps => rps[0].before(...rps.reverse()))
})
btn_addRule._tmpSetTop = () => {
  btn_addRule._tmpSetToped = true
  setTimeout(() => btn_addRule._tmpSetToped = false)
}
btn_addRule.addEventListener("click", () => {
  btn_addRule._tmpSetTop()
  insertAnEmptyRulePair().querySelector($checkbox$).checked = true
})
btn_delRules.addEventListener("click", () => {
  const children = Array.prototype.slice.call(ruleList.children)
  let count = 0
  ruleList.exec(el => el.checked && ++count && el.closest("[rule-pair]").remove())
  if (!count) return
  tell(`Deleted ${count} rules.`, tell.timeout_max, function Undo() { ruleList.append(...children); btn_toggleAll._detectBoxesStat() })
})
function mvSel() {
  const [sib, dir] = mvSel.dict[this.id]
  const sels = checkboxes.checked()
  dir === "after" && sels.reverse()
  sels.forEach(_ => {
    _ = _.closest("[rule-pair]")
    _[sib] && !_[sib].querySelector($checkbox$).checked && _[sib][dir](_)
  })
}
mvSel.dict = { btn_mvSelUp: ["previousElementSibling", "before"], btn_mvSelDown: ["nextElementSibling", "after"] }
btn_mvSelUp.addEventListener("click", mvSel)
btn_mvSelDown.addEventListener("click", mvSel)
btn_selBtwn.addEventListener("click", () => {
  const sels = btn_frzSel._filterNotFrz(checkboxes.checked())
  if (sels.length < 2) return
  const [fst, lst] = [sels.shift(), sels.pop()]
  let sib = fst
  while ((sib = sib.closest("[rule-pair]").nextElementSibling.querySelector($checkbox$)) !== lst) sib.checked = true
})
btn_toTop._exec = isAntonym => ruleList[isAntonym ? "append" : "prepend"](...checkboxes.checked().map(_ => _.closest("[rule-pair]")))
btn_toTop.addEventListener("click", () => btn_toTop._exec(0))
btn_toBtm.addEventListener("click", () => btn_toTop._exec(1))
btn_frzSel._filterNotFrz = elems => filter(elems, el => !el._frozen)
btn_frzSel._filterFrz = elems => filter(elems, el => el._frozen)
btn_frzSel.__toggle = elems => {
  elems.forEach(_ => {
    _._frozen = !_._frozen
    _.closest(".mdc-checkbox").classList[_._frozen ? "add" : "remove"]("frozen")
  })
}
btn_frzSel._toggle = wasFrz => btn_frzSel.__toggle(btn_frzSel[`_filter${wasFrz ? "" : "Not"}Frz`](checkboxes.checked()))
btn_frzSel.addEventListener("click", () => btn_frzSel._toggle())
btn_unfrzSel.addEventListener("click", () => btn_frzSel._toggle(true))
const toggleState = (el, tipEl, { foundation }) => {
  toggleState._next = el.dataset.state === "on" ? "off" : "on";
  [el, tipEl].forEach(_ => _.dataset.state = toggleState._next)
  !tipEl._invis && setTimeout(() => foundation.show())
  return toggleState._next === "on"
}
toggleState.tmpInvis = tipEl => {
  tipEl._invis = true
  setTimeout(() => delete tipEl._invis, 200)
}
btn_lineWrap._wrapAll = () => {
  the4textarea.forEach(_ => _.dataset.css = btn_diff.dataset.viewing === "true" && !btn_lineWrap._off ? "don't squoosh spaces; break words" : "")
}
btn_lineWrap.addEventListener("click", () => {
  btn_lineWrap._off = !toggleState(btn_lineWrap, btn_lineWrap_tip, btn_lineWrap_tip_J)
  the4textarea.forEach(_ => _.classList[btn_lineWrap._off ? "add" : "remove"]("nowrap"))
  btn_lineWrap._wrapAll()
})
btn_bslEsc._on = true
btn_bslEsc.addEventListener("click", () => {
  btn_bslEsc._on = toggleState(btn_bslEsc, btn_bslEsc_tip, btn_bslEsc_tip_J)
})
btn_menu._h__preInputFromTest = "48px"
btn_menu.addEventListener("click", () => {
  if (btn_menu.dataset.state) return
  btn_menu.dataset.state = "on"
  btn_menu.style.marginBottom = btn_menu._h__preInputFromTest
  btns.style.setProperty("--ex-h", btn_menu._h__preInputFromTest)
  if (btns.style.height) {
    btns.style._height = btns.style.height
    btns.style.height = `calc(${btns.offsetHeight}px - ${btn_menu.offsetHeight}px + ${content_menu_div._h__preInputFromTest})`
  }
  content_menu_J.open = true
})
content_menu_div._h__preInputFromTest = "96px"
content_menu_div.addEventListener("focusout", () => {
  setTimeout(() => delete btn_menu.dataset.state, 100)
  content_menu_J.open = false
  btn_menu.style.marginBottom = ""
  btns.style.removeProperty("--ex-h")
  if (btns.style._height) {
    btns.style.height = btns.style._height
    delete btns.style._height
  }
})
importRules.addEventListener("pointerdown", () => { // NB: The trigger of "click" or "pointerup" has a high probability of not taking effect!
  ruleList._oriChildNums = ruleList.childElementCount
  importRules.feed(textarea.value) &&
    tell(`Imported <b>${ruleList.childElementCount - ruleList._oriChildNums}</b> new rules.${ruleList._oriChildNums ? `<br>Current total: <b>${ruleList.childElementCount}</b>` : ""}`)
})
const Y = true
importRules.feed = srcText => {
  if (typeof srcText !== "string" || srcText === "null") return
  try {
    const evaledImportRules = eval(srcText)
    if (!Array.isArray(evaledImportRules) || !Array.isArray(evaledImportRules[0])) {
      tell("Please enter a 2D array (in JS).")
      return
    }
    const flushed = Array.from(new Set(convertToLinenArr(evaledImportRules).concat(exportRules.reap() || [])))
    ruleList.innerHTML = ""
    const fSet = new Set
    flushed.forEach(item => {
      const [$find, $rplc = "", $box] = eval(item)
      const ruleAsStr = `${$find}${find.length}${$rplc}`
      if (fSet.has(ruleAsStr)) return
      fSet.add(ruleAsStr)
      const [_find, _rplc, _box] = getOneRulePairAsElemArr(insertAnEmptyRulePair())
      _find.value = $find
      _rplc.value = $rplc;
      [_find, _rplc].forEach(set__mdc_floating_label_to_above)
      _box.checked = $box
    })
    btn_toggleAll._detectBoxesStat()
    return true
  } catch (err) {
    console.error(err)
    tell(`The input JS array has a ${err}`, Infinity)
  }
}
exportRules.addEventListener("pointerdown", () => {
  const rules = exportRules.reap("")
  if (!rules) return tell("Oh no, you never entered any rules.")
  textarea.value = rules
  set__mdc_floating_label_to_above(textarea)
})
exportRules.reap = (retType = "partialArray") => {
  let rules = getOneRulePairAsStrArr()
  rules = rules.filter(([$find, $rplc]) => $find || $rplc)
  if (!rules.length) return null
  rules = convertToLinenArr(rules)
  return retType === "partialArray" ? rules : `[\n  ${rules.join(",\n  ")}\n]`
}


assoc_MDC_inst_with_tmpl(mdc_checkbox__list, { tmplId: "mdc-checkbox" })


// -----------------------------------------------------------------------------

const mdc_snackbar = mdc_snackbar__list.pop()
mdc_snackbar.foundation.setTimeoutMs(-1)
snackbar.action_div = snackbar.querySelector(".mdc-snackbar__actions")


function checkboxes(checked) {
  return checked ? checkboxes.checked() : ruleList.querySelectorAll($checkbox$)
}
checkboxes.checked = () => filter(checkboxes(), _ => _.checked)

function convertToLinenArr(rules = [["", "", ""]]) {
  return [...new Set(rules.filter(arr => arr.length).map(([$find, $rplc, $box]) => `[ ${[isStrReg($find) ? $find : `"${dblBsl($find)}"`, `"${dblBsl($rplc)}"`].join(",\n    ")}${$box ? `,  ${$box}` : ""} ]`))]
}
function dblBsl(str, strip) {
  return str.replaceAll(...!strip ? ["\\", "\\\\"] : ["\\\\", "\\"])
}

function set__mdc_floating_label_to_above(label_or_child_el) {
  label_or_child_el.closest("label").querySelector(".mdc-floating-label").classList.add("mdc-floating-label--float-above")
}

function assocDOMJS(mdc_xx__list) {
  const $dJI = "data-js-id"
  const dJI$ = "[data-js-id]"
  mdc_xx__list.forEach(item => {
    const targetEl = (item.root.matches(dJI$) ? item.root : item.root.querySelector(dJI$)) || item.root.id && item.root
    if (!targetEl) return
    if (!targetEl.id) targetEl.id = targetEl.getAttribute($dJI)
    window[`${targetEl.id}_J`] = item
    targetEl.removeAttribute($dJI)
  })
  mdc_xx__list.length = 0
}

function getOneRulePairAsStrArr() {
  return map(ruleList.children, getOneRulePairAsElemArr).map(([_find, _rplc, _box]) => [_find, _rplc].map(el => el.value).concat(_box.checked ? "Y" : []))
}

function insertAnEmptyRulePair() {
  const rulePair = ruleList.insertTmpl()
  mdc_checkbox__list.replacePlaceholder(rulePair)
  return rulePair
}

function getOneRulePairAsElemArr(el) {
  return Array.from(el.querySelectorAll("input[type=text]")).concat(el.querySelector($checkbox$))
}

snackbar.surface_div = snackbar.querySelector(".mdc-snackbar__surface")
function tell(htmlStr, timeout, action) {
  if (!timeout) timeout = tell.timeout
  snackbar.querySelector(".mdc-snackbar__label").innerHTML = htmlStr
  mdc_snackbar.open()
  tell.stay(timeout)
  if (typeof action === "function") {
    snackbar.action_div.removeAttribute("hidden")
    snackbar.surface_div.classList.add("two")
    snackbar.querySelector(".mdc-button__label").innerHTML = action.name
    const actBtn = snackbar.querySelector("button")
    actBtn._prevActFn && actBtn.removeEventListener("click", actBtn._prevActFn)
    actBtn.addEventListener("click", actBtn._prevActFn = action, { once: true })
  }
  else {
    snackbar.action_div.setAttribute("hidden", "")
    snackbar.surface_div.classList.remove("two")
  }
}
tell.timeout = 4000
tell.timeout_max = 10000
tell.stay = timeout => {
  timeout = Math.min(timeout, tell.timeout_max)
  clearTimeout(tell._tId)
  tell._tId = setTimeout(() => {
    if (snackbar.matches(":hover")) return tell.stay(timeout)
    mdc_snackbar.close()
  }, timeout)
}

function assoc_MDC_inst_with_tmpl(arbitraryObj, { tmplId = "", class: Class, selector } = {}) {
  arbitraryObj._tmplId = tmplId
  arbitraryObj._tmpl = document.getElementById(arbitraryObj._tmplId).innerHTML
  arbitraryObj.replacePlaceholder = function (rootEl) {
    const placeholderEl = rootEl.querySelector(this._tmplId)
    placeholderEl.innerHTML = this._tmpl
  }
  arbitraryObj.insertTmpl = function () {
    if (!(this instanceof HTMLElement)) throw TypeError("Only valid if `this` is an HTML element.")
    this.insertAdjacentHTML(btn_addRule._tmpSetToped ? "afterbegin" : "beforeend", this._tmpl)
    const el = this[`${btn_addRule._tmpSetToped ? "first" : "last"}ElementChild`]
    if (Class) {
      if (el.matches(selector)) new Class(el)
      else each(el.querySelectorAll(selector), el => new Class(el))
    }
    return el
  }
}


// -----------------------------------------------------------------------------

function arrPFC(fname, _this, ...args) { return Array.prototype[fname] && Array.prototype[fname].apply(_this, args) }
function filter() { return arrPFC("filter", ...arguments) }
function each() { arrPFC("forEach", ...arguments) }
function map() { return arrPFC("map", ...arguments) }
function isAny() { return arrPFC("some", ...arguments) }

function isStrReg(str) { return !!(isObjReg(str) || typeof str === "string" && /^\/.+\/\w*$/.test(str) && isObjReg(tryEval(str))) }
function isObjReg(obj) { return Object.prototype.toString.call(obj) == "[object RegExp]" }
function tryEval(str) { try { return eval(str) } catch (_) { return false } }
const metaChars = RegExp("[$()*+.?[\\]^{|}]", "g")
function escChars(str) { return str.replace(metaChars, "\\$&") }


// -----------------------------------------------------------------------------

const backedupRules = () => `backedupRules${location.hash}`
backedupRules.import = () => importRules.feed(localStorage.getItem(backedupRules()))
backedupRules.export = () => localStorage.setItem(backedupRules(), exportRules.reap(""))
backedupRules.import()
addEventListener("beforeunload", backedupRules.export)
addEventListener("hashchange", backedupRules.import);


// -----------------------------------------------------------------------------

(window.MathJaxStartup = () => window.MathJax && MathJax.startup
  ? MathJax.startup.__domReady()
  : setTimeout(window.MathJaxStartup, 500)
)()