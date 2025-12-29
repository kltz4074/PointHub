const { invoke } = window.__TAURI__.core;

const res = await fetch("Menus/Projects.html");
const html = await res.text();

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

const page = doc.getElementById("page");
