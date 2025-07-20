const launchesDB = require('./launches.mongo')

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100, 
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

saveLaunches(launch).then(() =>{});
// launches.set(launch.flightNumber, launch);

async function getAllLaunches() {
    return await launchesDB.find({}, {
        '_id': 0,
        '__v': 0
    });
}

async function saveLaunches(params) {
    await launchesDB.updateOne({
        flightNumber: params.flightNumber,
    },
        params,
     {
        upsert: true,
    })
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customer: ['Made by sonu', 'NASA'],
            flightNumber: latestFlightNumber
        }));
}

function existsLaunchWithID(launchID) {
    return launches.has(launchID)
}

function abortLaunchWithID(launchID) {
    const aborted = launches.get(launchID);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}


module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithID,
    abortLaunchWithID
}