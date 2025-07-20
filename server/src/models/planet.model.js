const { error } = require("console");
const { parse } = require("csv-parse");
const fs = require("fs");
const planets = require('./planet.mongo');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("../server/data/kepler_data.csv")
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanets(data)
        }
      })
      .on("error", (err) => {
        console.log("err" + err);
        reject(err);
      })
      .on("end", async() => {
        console.log(`${(await getAllPlanets()).length} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({})
}

async function savePlanets(planet) {
  await planets.updateOne({
    keplerName: planet.kepler_name,
  }, {
    keplerName: planet.kepler_name,
  }, {
    upsert: true,
  });
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
