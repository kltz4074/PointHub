const page = document.getElementById("page");

function initLinks() {
  const links = document.querySelectorAll(".link");

  links.forEach(link => {
    link.onclick = async e => {
      e.preventDefault();

      // скрытие
      page.classList.add("page-hidden");
      await new Promise(r => setTimeout(r, 500));

      // подгружаем новую страницу
      const res = await fetch(link.href);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newPageContent = doc.querySelector("#page").innerHTML;

      // заменяем содержимое
      page.innerHTML = newPageContent;
      page.classList.remove("page-hidden");

      initLinks();
    };
  });
}

initLinks();
window.addEventListener("popstate", () => location.reload());
