class FavoritesCard {
    constructor(options) {
        this.options = options
    }

    generateContent(parentContainer) {
        let card = document.createElement("div")
        card.classList.add("w3-card", "w3-hover-shadow", "w3-half", "w3-padding")
        card.style.backgroundColor = this.options.cardColor

        card.onclick = this.options.onclick

        let cardContent = this.createCardContent(this.options.cardData)
        card.append(cardContent)
        
        parentContainer.append(card)
    }

    createCardContent(data) {
        let container = document.createElement("div")
        container.classList.add("w3-container")

        data.forEach((item) =>{
            let element = document.createElement("p")
            element.id = item.value
            element.setAttribute("style", item.style)

            element.append(item.value)
            container.append(element)
        })
        return container
    }
}