const page = document.getElementById("page");

let AnimationIsGoing = false;

async function loadPage(url, withAnimation = true) {
  if (AnimationIsGoing) return;
  AnimationIsGoing = true;

  if (withAnimation) {
    page.classList.add("page-hidden");
    await new Promise(r => setTimeout(r, 500));
  }

  const res = await fetch(url);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const newPage = doc.querySelector("#page");

  if (!newPage) {
    console.error("На странице нет #page");
    AnimationIsGoing = false;
    return;
  }

  page.innerHTML = newPage.innerHTML;

  if (withAnimation) {
    page.classList.add("page-show");
    await new Promise(r => setTimeout(r, 500));
    page.classList.remove("page-hidden");
    page.classList.remove("page-show");
  }

  AnimationIsGoing = false;
  initLinks();
}

function initLinks() {
  const links = document.querySelectorAll(".link");

  links.forEach(link => {
    link.onclick = e => {
      e.preventDefault();
      loadPage(link.getAttribute("href"));
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const startPage = document.querySelector("[data-startPage]")?.dataset.startpage;

  if (startPage) {
    loadPage(startPage, false);
  }
});
