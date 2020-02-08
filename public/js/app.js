class App {
    constructor() { 
        this.store = {
            movieId: null,
            showFavoriteButton: false,
        }
    }
        switchView(name) {
            let content = document.getElementById("content")

            app.currentView = name
            window.location.hash = `#${name}`

            let view = eval(`new ${name}()`)
            content.innerHTML = ""

            view.generateNavBar(content)
            view.generateContent(content)

            window.scrollTo(0, 0)
            
        }
}

let app = new App()
app.switchView("HomeView")

window.onhashchange = () => {
    let locationName = location.hash.replace("#", "")
    if(app.currentView != locationName){
        app.switchView(locationName)
    }
}