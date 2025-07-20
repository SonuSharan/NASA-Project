const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planet.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://sonusharan888:mMmYZIrRAkZhNg21@nasacluster.od9zz5b.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster";

const server = http.createServer(app);
mongoose.connection.once('open', () => {
    console.log("MongoDB connection is ready");
})
mongoose.connection.on('error', () => {
    console.log("Error connection mongoDB");
    
})

async function startServer() {
mongoose.connect(MONGO_URL).then((res) =>{
    console.log("connected to databse: " + res);
    
});
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}...`);
  });
}
startServer();
