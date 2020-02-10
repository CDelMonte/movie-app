class DetailView {
    constructor() { 
        this.movieId = app.store.movieId
        this.showFavoriteButton = app.store.showFavoriteButton
        this.showDeleteButton = app.store.showDeleteButton
    }

    generateNavBar(parentContainer) {
        let navBar = new NavBar({
            title: "Movie Searcher",
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
                // backgroundColor: "#ffbf00",
                backgroundColor: "#F5F2F2",
                headerTitle: movieData.Title,
                posterData: movieData.Poster,
                contentData: [
                    "Directed by: " + movieData.Director,
                    "Plot: " + movieData.Plot,
                    "Cast: " + movieData.Actors,
                    "Genre: " + movieData.Genre,
                    "Released on: " + movieData.Released,
                    "Rating: " + movieData.Rated,
                    "Awards earned: " + movieData.Awards
                ],
                favoriteButtonData: {
                    showButton: this.showFavoriteButton,
                    buttonColor: "lightgreen",
                    buttonText: "Add to Favorites",
                    onclick: () => {
                        this.saveFavorite(movieData.imdbID).then(() => {
                            app.switchView("FavoritesView")
                        })
                    }
                },
                deleteButtonData: {
                    showButton: this.showDeleteButton,
                    showDeleteButton: false,
                    buttonColor: "red",
                    buttonText: "Remove from favorites",
                     onclick: () => {
                        this.deleteFavorite(movieData.imdbID).then(() => {
                            //app.switchView("HomeView")
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

    deleteFavorite(id) {
        let promise = new Promise((resolve, reject) => {
            let options = {
                id: id
            }

            axios.post("/api/delete/movies", options).then((response) => {
                resolve(response.data)
            })

        })

        return promise
    } 
}