const omdbClient = require('omdb-client')

class AppRoutes {
    static getRoutes(app, router) {
        // Status
        router.get("/status", (request, response) => {
            response.json({
                status: "OK"
            })
        })
        
        // Search Movie by title/year
        router.post("/search/movie", (request, response) => {
            let parameters = {
                apiKey: "e85e7b16",
                title: request.body.title
            }
        
            if(request.body.year) {
                parameters.year = request.body.year
            }
        
            omdbClient.get(parameters, (error, data) => {
                response.json(data)
            })
        })

                // Search Movie by title/year
                router.post("/search/id", (request, response) => {
                    let parameters = {
                        apiKey: "e85e7b16",
                        id: request.body.id
                    }
                
                    omdbClient.get(parameters, (error, data) => {
                        response.json(data)
                    }) 
                })
    }
}

module.exports = AppRoutes