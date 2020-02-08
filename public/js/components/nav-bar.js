class NavBar {
    constructor(options) {
        this.options = options
    }

    generateContent(parentContainer) {
        let navBar = document.createElement("div")
        navBar.classList.add("w3-bar", "w3-padding", "w3-card")

        let navContent = this.createNavBarItems(this.options.title, this.options.navData)

        navBar.append(navContent)

        parentContainer.append(navBar)
    }

    createNavBarItems(title, data) {
        let container = document.createElement("div")

        let navTitle = document.createElement("a")
        navTitle.classList.add("w3-bar-item")
        navTitle.append(title)

        container.append(navTitle)

        data.forEach(item => {
            let barItem = document.createElement("a")
            barItem.append(item.name)
            barItem.onclick = () => { app.switchView(item.route) }
            barItem.classList.add("w3-bar-item", "w3-button")
            container.append(barItem)
        })
        return container
    }
}