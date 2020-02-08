class DetailCard {
    constructor(options) {
        this.options = options
     }

     generateContent(parentContainer) {
         // Main Container
        let detailCard = document.createElement("div")
        detailCard.classList.add("w3-container", "w3-card-4", "w3-padding")
        detailCard.style.backgroundColor = this.options.backgroundColor

        // Header
        let header = this.createHeader(this.options.headerTitle)

        // Poster
        let poster = this.createPoster(this.options.posterData)

        // Content
        let content = this.createContent(this.options.contentData)

        // Favorite Button
        let favoriteButton = this.createFavoriteButton(this.options.favoriteButtonData)

        detailCard.append(header)
        detailCard.append(poster)
        detailCard.append(content)
        
        parentContainer.append(detailCard)
        parentContainer.append(favoriteButton)
     }

     createHeader(data) {
        let container = document.createElement("h3")
        container.append(data)

        return container
     }

     createPoster(data) {
         let container = document.createElement("div")
         container.classList.add("w3-cell")
         container.style.paddingRight = "16px"

         let image = document.createElement("img")
         image.setAttribute("src", data)

         container.append(image)

         return container
     }

     createContent(data) {
        let container = document.createElement("div")
        container.classList.add("w3-cell", "w3-cell-top")

        data.forEach((item) => {
            let paragraph = document.createElement("p")
            paragraph.append(item)

            container.append(paragraph)
        })

        return container
     }

     createFavoriteButton(data) {
        let container = document.createElement("div")
        if(data.showButton) {
            let favoriteButton = document.createElement("button")
            favoriteButton.classList.add("w3-button")
            favoriteButton.style.marginTop = "16px"
            favoriteButton.style.float = "right"
            favoriteButton.style.backgroundColor = data.buttonColor

            favoriteButton.append(data.buttonText)
            favoriteButton.onclick = data.onclick

            container.append(favoriteButton)
        }

        return container
     }
}