/**
 * initialization for Google Map API. Stores map object in window.map for ease of accessibility in other functions
 * @param {*} startLocation - array containing [lat, lng, zoom] to set initial location of map
*/
function mapInit(startLocation) {
    // initialize variable here to have scope of this function (initializing in if/else makes scope limited to that block)
    let pos = "";
    let mapZoom = 10;

    // get coordinates from start location. If nothing entered, have default location
    if ((startLocation["lat"] == null) || (startLocation["lng"] == null)) {
        pos = {
            lat: 40.4246078,
            lng: -111.744955
        };
    } else {
        pos = {
            lat: startLocation["lat"],
            lng: startLocation["lng"]
        };
    }
    // set map zoom (have default case if no zoom provided)
    if (startLocation["zoom"] == null) {
        mapZoom = 10;
    } else {
        mapZoom = startLocation["zoom"];
    }

    // make map object a property of window so it's accessible throughout page (i.e. in other JS functions)
    window.map = new google.maps.Map(document.getElementById("map"), {
        zoom: mapZoom,
        center: pos,
    });
}

/**
 * function to put markers onto map
 *      sidenote: tried out () => notation in this function
 * @param {*} coordinates - [[{lat: ... , lng: ...}, "facility name"], [{lat: ... , lng: ...}, "facility name2"]];
 * @param {*} mapVar - where the map object is being stored (e.g. window.map)
 */
function addMarker(coordinates, mapVar) {
    let markerWindow = new google.maps.InfoWindow();

    // iterate through list of coordinates, adding each to the map
    coordinates.forEach(([coord, title, id], i) => {
        console.log([coord, title], i);
        let facilityMarker = new google.maps.Marker({
            position: coord,
            map: mapVar,
            title: "<a href = 'depotDetail.html?" + id + "'><b>Facility name: </b>" + title + "</a>",
            label: "♻"
        });

        // make each marker clickable
        facilityMarker.addListener("click", () => {
            markerWindow.setContent(facilityMarker.getTitle());
            markerWindow.open(facilityMarker.getMap(), facilityMarker);
        });
    });
}

/**
 * finds which coordinate from a list is closes to a reference coordinate
 * @param {*} coordinates - [[{lat: ... , lng: ...}, "facility name"], [{lat: ... , lng: ...}, "facility name2"]];
 * @param {*} compareCoord - reference coordinate
 * @returns index of "coordinates" list that is closest to "compareCoord"
 */
function closestDist(coordinates, compareCoord) {
    // track which item 
    let index = 0;

    // minimum value to beat
    let minDist = Number.POSITIVE_INFINITY;

    // current distance between coordinate and comparison coordinate
    let dist = Number.POSITIVE_INFINITY;

    // index value of item closest to comparison coordinate
    let captureIndex = 0;

    coordinates.forEach(function (coord) {
        dist = Math.sqrt(Math.pow(coord[0]["lat"] - compareCoord["lat"], 2) + Math.pow(coord[0]["lng"] - compareCoord["lng"], 2));
        //console.log(compareCoord);
        if (dist < minDist) {
            minDist = dist;
            captureIndex = index;
        }
        index++;
    });
    return captureIndex;
}

/**
 * function to get coordinates of user. Based on HTML5 geolocation of browser
 * navigator.geolocation.getCurrentPosition relies on callback functions so "hasLocation" and "errorLocation"
 * serve as the functions for success and failure to access user location via browser.
 * @param {*} displayLocation - boolean to say if you want marker of user on map.
 */
function userLocation(displayLocation) {
    if (displayLocation == null) {
        displayLocation = false;
    }

    // check to see if browser has geolocation
    if (!navigator.geolocation) {
        console.log("Browser does not have geolocation.");
    } else {
        navigator.geolocation.getCurrentPosition(hasLocation, errorLocation);
    }

    // success case for getting user location
    function hasLocation(userPos) {
        let userCoord = {
            lat: userPos.coords.latitude,
            lng: userPos.coords.longitude
        };
        outputCoord = {
            lat: GeolocationCoordinates.latitude,
            lng: GeolocationCoordinates.longitude
        };

        if (displayLocation) {
            // put user location on map (change as needed)
            let userMarker = new google.maps.Marker({
                position: userCoord,
                map: window.map,
                title: "Your location",
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                }
            });
        }
    }
    // failure case for getting user location
    function errorLocation() {
        console.log("Please enable geolocation in browswer.");
    }
}

/**
 * function to get coordinates of user, uses a promise to allow use of coords in other functions (to get around async nature of Geolocation). 
 *     Based on HTML5 geolocation of browser
 *     navigator.geolocation.getCurrentPosition relies on callback named "pass" and "fail" for in the Promise. Passes coords/error message to
 *         those functions if Geolocation successful/unsuccessful
 * E.g. Use with: 
 *      let x = userLocationPromise();
 *     x.then(passCaseFunc, failCaseFunc); // where passCaseFunc and failCaseFunc you define to handle input arg of coords/error as desired.
 * @returns uses promises to handle getting the location, successful extraction of coordinate able to be used in specified function.
 */
function userLocationPromise() {
    return new Promise(function (pass, fail) {
        navigator.geolocation.getCurrentPosition(function (userPos) {
            pass({
                lat: userPos.coords.latitude,
                lng: userPos.coords.longitude
            });
        }, function () {
            fail("Error: Geolocation unable to be found (check browser for Geolocation compatibility/enable browser to access location)");
        });
    });
}

/**
 * initialize map for displaying directions and put directions on it based on inputted start/end coordinates
 * @param {*} startLocation - starting coord of directions
 * @param {*} endLocation - destination of directions
 * @param {*} mapVar - location to store map object, use window.varName (varName can be whatever you want) so map is accessible in other functions too
 * @returns [dirService, dirRenderer]
 *          things generated to operate the specific map you generated, use as part of the input of mapDirections
 */
function dirMapInit(startLocation, endLocation, mapVar) {
    let dirService = new google.maps.DirectionsService();
    let dirRenderer = new google.maps.DirectionsRenderer();

    // initialize variable here to have scope of this function (initializing in if/else makes scope limited to that block)
    let pos = "";
    let mapZoom;

    // get coordinates from start location. If nothing entered, have default location
    if ((startLocation["lat"] == null) || (startLocation["lng"] == null)) {
        pos = {
            lat: 40.4246078,
            lng: -111.744955
        };
    } else {
        pos = {
            lat: startLocation["lat"],
            lng: startLocation["lng"]
        };
    }

    if (startLocation["zoom"] == null) {
        mapZoom = 10;
    } else {
        mapZoom = startLocation["zoom"];
    }

    mapVar = new google.maps.Map(document.getElementById("directionMap"), {
        position: pos,
        zoom: mapZoom,
        center: pos,
    });
    dirRenderer.setMap(mapVar);
    dirRenderer.setPanel(document.getElementById('infoPanel'));

    // set default values for direction map to have (ran into problem where it wanted initial lat/lng)
    let dirRoute = {
        origin: pos,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING
    };
    dirService.route(
        dirRoute,
        function (res, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                dirRenderer.setDirections(res);
                console.log(res);
                console.log(res.routes[0].legs[0].distance.text);
            } else {
                console.log("Error in routing.");
            }
        });
    return [dirService, dirRenderer];
}

/** function for putting directions onto a map (map object to be stored in window.dispMap)
* @param {*} fromCoord - coordinate for starting point
* @param {*} toCoord - coordinate for ending point
* @param {*} dirService - directions object to put directions of map to
* @param {*} dirDisplay - directions object to put directions (text) to
* @param {*} mapVar - location map object is stored to (e.g. window.dirMap)
* @returns none, but directions set on map
*/ 
function mapDirections(fromCoord, toCoord, dirService, dirDisplay, mapVar) {
    dirDisplay.setMap(mapVar);
    dirDisplay.setPanel(document.getElementById('infoPanel'));

    let dirRequest = {
        origin: fromCoord,
        destination: toCoord,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    dirService.route(dirRequest, function (res, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            dirDisplay.setDirections(res);
        } else {
            console.log("Error in routing.");
        }
    });
}

/**
 * get distance between two locations
 * @param {*} startLocation - location A
 * @param {*} endLocation - location B
 * @param {*} id - ID of doc in firebase for directions
 * @returns distance between locations
 */
function getDistance(startLocation, endLocation, id) {
    let dirService = new google.maps.DirectionsService();
    let dirRenderer = new google.maps.DirectionsRenderer();

    // initialize variable here to have scope of this function (initializing in if/else makes scope limited to that block)
    let pos = "";
    let mapZoom;

    pos = {
        lat: startLocation["lat"],
        lng: startLocation["lng"]
    };
    if (startLocation["zoom"] == null) {
        mapZoom = 10;
    } else {
        mapZoom = startLocation["zoom"];
    }

    // set default values for direction map to have (ran into problem where it wanted initial lat/lng)
    let dirRoute = {
        origin: pos,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING
    };
    dirService.route(
        dirRoute,
        function (res, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                dirRenderer.setDirections(res);
                console.log(id);
                document.getElementById(id).innerHTML = "Distance " + res.routes[0].legs[0].distance.text;
            } else {
                console.log("Error in routing.");
            }
        });
    return [dirService, dirRenderer];
}