const { MongoClient } = require("mongodb");
const supportedTypes = ["png", "svg", "html"];

module.exports = async function (req) {
  if (process.env.MONGODB_URL) {
    if (supportedTypes.includes(req.query.type)) {
      var database;
      try {
        database = await MongoClient.connect(process.env.MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        var collection = database.db("dynamicimage").collection("logs");
        await collection.insertOne({
          ...req.query,
          name: req.query.name.replace(`.${req.query.type}`, ""),
          dateTime: new Date(),
        });
        console.log(`Request logged!`);
      } catch (error) {
        console.log(`Error while logging! ${error.toString()}`);
      } finally {
        if (database) {
          await database.close();
        }
      }
    }
  } else {
    console.log("Project configuration is not using a logger");
  }
};
