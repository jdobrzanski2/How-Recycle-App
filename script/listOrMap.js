/**
 * Display list view and hide the map view
 */
function listFunction() {
    $("#listDepot").show();
    $("#map").hide();
}

/**
 * Display map view and hide list view.
 */
function mapFunction() {
    $("#listDepot").hide();
    $("#map").show();
    displayMap();
}

var depotRef = db.collection("Depot");

/**
 * Display all depot location in the map.
 */
function displayMap() {
    const mapPerspective = { lat: 49.1888931, lng: -123.1535549, zoom: 10 };
    mapInit(mapPerspective);
    userLocation(true);
    var listDepot;
    var listDepot = [];
    let [colPath, docPath] = interpretURLDoc();
    depotRef.get().then(function (q) {
        var index = 0;
        var accepted, id;
        q.forEach(function (doc) {
            id = doc.id;
            accepted = doc.data().accepted;
            if (isAccepted(docPath, accepted)) {
                listDepot[index] = [{ lat: doc.data().location.latitude, lng: doc.data().location.longitude }, doc.data().depotName, id];
                index++;
            }
        })
        addMarker(listDepot, window.map);
    })
}

/**
 * Load the page whith list view when it is opened
 */
$(document).ready(function () {
    listFunction();
})
