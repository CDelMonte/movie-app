class FormCard {
    constructor(options) {
        this.options = options
    }
 
    generateContent(parentContainer) {
        let formCard = document.createElement("div")
        formCard.classList.add("w3-card", "w3-padding")

        let headerContainer = document.createElement("div")
        headerContainer.classList.add("w3-container", "w3-margin")

        let header = document.createElement("h2")
        header.style.textAlign = "center"
        header.append(this.options.headerTitle)

        headerContainer.append(header)

        let formContent = document.createElement("div")
        formContent.classList.add("w3-container")

        let formInputs = this.createInputs(this.options.inputData)
        formContent.append(formInputs)

        let formButton = document.createElement("button")
        formButton.classList.add("w3-button", "w3-margin")
        formButton.style.backgroundColor = "#FFBF00"
        formButton.append(this.options.formButtonName)
        formButton.onclick = this.options.onclick


        formCard.append(headerContainer)
        formCard.append(formContent)
        formCard.append(formButton)
        
        parentContainer.append(formCard)
    }

    createInputs(data) {
        let container = document.createElement("div")

        data.forEach(item => {
            let label = document.createElement("label")
            label.append(item.inputName)

            let input = document.createElement("input")
            input.type = item.inputType
            input.classList.add("w3-input", "w3-margin-bottom")
            input.id = item.inputName

            container.append(label)
            container.append(input)
        })
        return container
    }
}