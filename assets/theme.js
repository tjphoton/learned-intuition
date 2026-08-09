/* Shared theme toggle for Learned Intuition (index.html + papers/*.html).
   Single localStorage key so the preference is consistent across every page. */
(function () {
  "use strict";
  var THEME_KEY = "learned-intuition-theme";
  var root = document.documentElement;

  function isDarkNow() {
    var t = root.getAttribute("data-theme");
    if (t === "dark") return true;
    if (t === "light") return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(t, toggle) {
    if (t === "dark" || t === "light") root.setAttribute("data-theme", t);
    else root.removeAttribute("data-theme");
    if (!toggle) return;
    var dark = isDarkNow();
    var sun = toggle.querySelector("#iconSun");
    var moon = toggle.querySelector("#iconMoon");
    if (sun) sun.style.display = dark ? "none" : "block";
    if (moon) moon.style.display = dark ? "block" : "none";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("themeToggle");
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    applyTheme(saved, toggle);
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var next = isDarkNow() ? "light" : "dark";
      applyTheme(next, toggle);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      document.dispatchEvent(new CustomEvent("theme-changed", { detail: { theme: next } }));
    });
  });
})();
