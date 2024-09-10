class ClientRouter {
    __PAGES = [
        "courses.html",
        "home.html",
        "path.html",
        "payment.html",
        "prices.html",
    ];

    isAppPage(page){
        return this.__PAGES.includes(page)
    }

    getPage = () => this.__page
}

const router = new ClientRouter();

window.onhashchange = () => {
    renderRoute(window.location.hash.substring(1))
}

const renderRoute = (page) => {
    if(router.isAppPage(page)){
        window.location.href = `/${page}`
    } else {
        window.location.href = `/not-found.html`
    }
}
