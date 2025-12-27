const page = document.getElementById("page");

let AnimationIsGoing = false;

function initLinks() {
  const links = document.querySelectorAll(".link");

  links.forEach(link => {
    link.onclick = async e => {
      e.preventDefault();

      if (AnimationIsGoing) return;
      AnimationIsGoing = true;

      page.classList.add("page-hidden");
      await new Promise(r => setTimeout(r, 500));

      const res = await fetch(link.href);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newPageContent = doc.querySelector("#page").innerHTML;

      page.innerHTML = newPageContent;

      page.classList.add("page-show");
      await new Promise(r => setTimeout(r, 500));

      page.classList.remove("page-hidden");
      page.classList.remove("page-show");

      AnimationIsGoing = false;
      initLinks();
    };
  });
}

initLinks();
window.addEventListener("popstate", () => location.reload());
