const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithID,
    abortLaunchWithID
} = require('../../models/launches.model')

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches())
} 

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if( !launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target ) {
            return res.status(400).json(
                { error: 'Missing required fields' }
            )  // 400 Bad Request
        }
    launch.launchDate = new Date(launch.launchDate)
    if( isNaN(launch.launchDate) ) {
        return res.status(400).json(
            { error: 'Invalid launch date' }
        )  // 400 Bad Request 
    }
    
    addNewLaunch(launch)
    return res.status(201).json({ message: 'New launch added successfully' })
}

function httpAbortLaunch(req, res) {
    const launchID = Number(req.params.id);
    
    if(!existsLaunchWithID(launchID)) {
        return res.status(404).json({message: 'LaunchID not found'})
    }
    const aborted = abortLaunchWithID(launchID);
    return res.status(200).json({message: 'Mission aborted!'})
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}