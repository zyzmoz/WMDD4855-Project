class Route {
  constructor(pageId, htmlPath, controller) {
    this.pageId = pageId;
    this.htmlPath = htmlPath;
    this.controller = controller || `./${htmlPath.replace(".html", ".js")}`;
  }
}

class Router {
  static init(renderElement, pages) {
    Router.pages = pages;
    Router.renderElement = document.getElementById(renderElement);
    window.addEventListener("hashchange", (e) => {
      Router.render();
    });
    Router.render();
  }

  static async render() {
    const pageHash = window.location.hash;
    const authenticated = localStorage.getItem('authenticated')

    if ((pageHash.trim().length > 0 && (authenticated === 'true')) || (pageHash === "#register" || pageHash === "#login")) {
      const routeObj = Router.pages.find((page) => page.pageId === pageHash);
      const pageHtml = await (await fetch(routeObj.htmlPath)).text();

      Router.renderElement.innerHTML = pageHtml;
      Router.createController(routeObj.controller);
    } else {
      const routeObj = Router.pages[0];
      const pageHtml = await (await fetch(routeObj.htmlPath)).text();
      Router.renderElement.innerHTML = pageHtml;
      Router.createController(routeObj.controller);
    }
  }

  static createController(ctrl) {
    let controller = document.createElement("script");
    controller.setAttribute("src", ctrl);
    controller.setAttribute("type", "text/javascript");
    Router.renderElement.appendChild(controller);
  }
}
