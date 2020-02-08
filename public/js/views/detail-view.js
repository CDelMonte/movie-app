class DetailView {
    constructor() { 
        this.movieId = app.store.movieId
        this.showFavoriteButton = app.store.showFavoriteButton
    }

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
        this.getMovieData(this.movieId).then((movieData) => {
            let container = document.createElement("div")
            container.classList.add("w3-container")

            let viewTitle = document.createElement("h3")
            viewTitle.append("Detail View")

            container.append(viewTitle)

            let detailCard = new DetailCard({
                backgroundColor: "#ffbf00",
                headerTitle: movieData.Title,
                posterData: movieData.Poster,
                contentData: [
                    movieData.Director,
                    movieData.Plot,
                    movieData.Actors,
                    movieData.Genre,
                    movieData.Released,
                    movieData.Rated,
                    movieData.Awards
                ],
                favoriteButtonData: {
                    showButton: this.showFavoriteButton,
                    buttonColor: "#ffbf00",
                    buttonText: "Add to Favorites",
                    onclick: () => {
                        this.saveFavorite(movieData.imdbID).then(() => {
                            app.switchView("FavoritesView")
                        })
                    }
                }
            })

            detailCard.generateContent(container)

            parentContainer.append(container)
        })
    }

    getMovieData(id) {
        let promise = new Promise((resolve, reject) => {
            let options = {
                id: id
            }

            axios.post("/api/search/id", options).then((response) => {
                resolve(response.data)
            })
        })

        return promise
    }

    saveFavorite(id) {
        let promise = new Promise((resolve, reject) => {
            let options = [{
                id: id
            }]

            axios.post("/api/create/movies", options).then((response) => {
                resolve(response.data)
            })

        })

        return promise
    }
}