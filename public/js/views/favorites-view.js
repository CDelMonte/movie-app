class FavoritesView {
    constructor() { }

    generateNavBar(parentContainer) {
        let navBar = new NavBar({
            title: "Movie Search",
            navData: [
                {
                    name: "Home",
                    route: "HomeView"

                },
                {
                    name: "Favorites",
                    route: "FavoritesView"
                }
            ]
        })
        navBar.generateContent(parentContainer)
    }

    generateContent(parentContainer) {
        this.getFavorites().then((favorites) => {
            let container = document.createElement("div")
            container.classList.add("w3-container")
    
            let viewTitle = document.createElement("h3")
            viewTitle.append("Favorites View")
    
            container.append(viewTitle)

            favorites.forEach((favoriteData) => {
                this.getMovieData(favoriteData.id).then((favorite) => {
                    let favoritesCard = new FavoritesCard({
                        cardColor: "#ffbf00",
                        cardData: [
                            {
                                value: favorite.Title,
                                style: "font-weight: 700;"
                            },
                            {
                                value: favorite.Year,
                                style: ""
                            },
                            {
                                value: favorite.Rated,
                                style: "float: right;"
                            },
                            {
                                value: favorite.Genre,
                                style: "margin-top: 4px;"
                            }
                        ],
                        onclick: () => {
                            // Pass favorite to detail view
                            app.store.showFavoriteButton = false
                            app.store.movieId = favorite.imdbID
                            app.switchView("DetailView")
                        }
                    })
                    
                    favoritesCard.generateContent(container)
                })
            })

            parentContainer.append(container)
        })
    }

    getFavorites() {
        // Get favorites from mongo
        let promise = new Promise((resolve, reject) => {
                let options = {}
    
                axios.post("/api/find/movies", options).then((response) => {
                    resolve(response.data)
                })
        })

        return promise
    }

    getMovieData(id) {
        // Get movie from omdb
        let promise = new Promise((resolve, reject) => {
            let options = {
                id: id,
            }
    
            axios.post("/api/search/id", options).then((response) => {
                resolve(response.data)
            })
        })

        return promise
    }
}