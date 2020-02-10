const mongo = require("mongodb")
class Model {
  constructor(options) {
    this.options = options
    this.mongoUrl = this.options.app.get("mongoUrl")
    this.database = this.options.app.get("database")
  }
  create(callback) {
    // DB Connection
    mongo.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true}).then((client) => {
      let db = client.db(this.database)
      try {
        let collection = db.collection(this.options.modelName)
        // Insert data
        collection.insertMany(this.options.data, (error, data) => {
          if(error) {
            console.log({
              error: error
            })
          }
          callback(data)
        })
      }
      catch(error) {
        console.log({
          error: error
        })
        if(client != null) {
          client.close()
        }
        callback(error)
      }
    })
  }

  delete(callback) {
    // DB Connection
    mongo.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true}).then((client) => {
      let db = client.db(this.database)
      try {
        let collection = db.collection(this.options.modelName)

        if(this.options.data.hasOwnProperty("id")) {

          let deleteOptions = {
            id: this.options.data.id
          }
          console.log("del options",deleteOptions)
          // Remove data
          collection.findOneAndDelete(deleteOptions, (error, data) => {
            if(error) {
              console.log({
                error: error
              })
            }
            callback(data)
          })
        }
      }
      catch(error) {
        console.log({
          error: error
        })
        if(client != null) {
          client.close()
        }
        callback(error)
      }
    })
  }

  find(callback) {
    // DB Connection
    mongo.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true}).then((client) => {
      let db = client.db(this.database)
      try {
        let collection = db.collection(this.options.modelName)
        // Find some documents
        collection.find(this.options.find).toArray((error, data) => {
          if(error) {
            console.log({
              error: error
            })
          }
          callback(data)
        })
      }
      catch(error) {
        console.log({
          error: error
        })
        if(client != null) {
          client.close()
        }
        callback(error)
      }
    })
  }
}
module.exports = Model