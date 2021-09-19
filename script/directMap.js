

var [dirServ, dirRend] = [];

/**
 * Get and display the direction from user's location to a depot location.
 */
function getDirection() {
    var queryString = decodeURIComponent(window.location.search);
    var queries = queryString.split("?");
    var id = queries[1];
    var dest;

    let getPos = userLocationPromise();
    getPos.then(functionPass, functionFail);

    function functionPass(userCoord) {
        db.collection("Depot").doc(id).onSnapshot(function (doc) {
            dest = { lat: doc.data().location.latitude, lng: doc.data().location.longitude };

            const mapPerspective = { lat: userCoord["lat"], lng: userCoord["lng"], zoom: 10 };
            [dirServ, dirRend] = dirMapInit(mapPerspective, dest, window.dirMap);
            console.log(dirRend);

        });
    }
    function functionFail(errorM) {
        console.log(errorM);
    }

}
getDirection();