const Model = require("../components/model")

class ModelRoutes {
    static getRoutes(app, router) {
        // Create
        router.post("/create/:modelName", (request, response) => {
            let modelName = request.params.modelName
            let data = request.body

            let options = {
                modelName: modelName,
                data: data,
                app: app
            }

            console.log("model routes options",options)

            let model = new Model(options)

            model.create((data) => {
                response.json(data)
            })
        })

        router.post("/delete/:modelName", (request, response) => {
            let modelName = request.params.modelName
            let data = request.body

            let options = {
                modelName: modelName,
                data: data,
                app: app
            }

            console.log("model routes options",options)

            let model = new Model(options)

            model.delete((data) => {
                response.json(data)
            })
        })

        router.post("/find/:modelName", (request, response) => {
            let modelName = request.params.modelName
            let find = request.body

            let options = {
                modelName: modelName,
                find: find,
                app: app
            }

            let model = new Model(options)

            model.find((data) => {
                response.json(data)
            })
        })
    }
}

module.exports = ModelRoutes