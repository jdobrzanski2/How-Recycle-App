/**
 * setup for making clickable elemements on page for testing various map functions.
 */
$(document).ready(function () {
    // sample data to feed to functions
    const recyclingDepot = [
        [{
            lat: 49.272128160675955,
            lng: -123.0824158014017
        }, "Regional Recycling Vancouver Bottle Depot"],
        [{
            lat: 49.268095873465924,
            lng: -123.10610507055142
        }, "Go Green Bottle Depot & Recycling"],
        [{
            lat: 49.274816169070604,
            lng: -123.1273910810634
        }, "Yaletown Return-It Express Depot"],
        [{
            lat: 49.272128160675955,
            lng: -123.0958053883124
        }, "United We Can"],
        [{
            lat: 49.24725713882776,
            lng: -123.10198519729738
        }, "Joe's Bottles & Paint Depot"],
        [{
            lat: 49.24098138793727,
            lng: -123.05254672255016
        }, "Vancouver Central Return-It Express Depot"],
        [{
            lat: 49.236498220396804,
            lng: -123.02096103035056
        }, "Collingwood Bottle Exchange"],
        [{
            lat: 49.311985258076284,
            lng: -123.04053042643923
        }, "North Vancouver Bottle & Return-It Depot"],
        [{
            lat: 49.30235981022107,
            lng: -123.01649783454823
        }, "North Shore Recycling Drop-off Depot"],
        [{
            lat: 49.263877075938694,
            lng: -122.99383853263545
        }, "Burnaby Eco-Centre"],
        [{
            lat: 49.19863711773734,
            lng: -123.07932589570441
        }, "Regional Recycling Richmond Bottle Depot"],
        [{
            lat: 49.211198581085306,
            lng: -123.10301516510222
        }, "South Van Bottle Depot"],
        [{
            lat: 49.20392467040433,
            lng: -123.13395607170538
        }, "RETURN-IT Express Depot"],
        [{
            lat: 49.208979932581435,
            lng: -123.11489240983231
        }, "Vancouver Zero Waste Centre"],
        [{
            lat: 49.207863807600916,
            lng: -123.1143667429574
        }, "Vancouver Transfer Station"],
        [{
            lat: 49.174133422455135,
            lng: -123.16479077281953
        }, "City of Richmond Recycling Depot"],
        [{
            lat: 49.211469659050984,
            lng: -123.1119683878407
        }, "Computer & Electronics Recycling Depot (Computie)"],
        [{
            lat: 49.174133422455135,
            lng: -123.14195686232497
        }, "O K Bottle Depot"],
        [{
            lat: 49.171675711220395,
            lng: -123.1348560730858
        }, "Richmond Return-It Bottle Depot"],
    ];

    document.getElementById("makeMap")
        .addEventListener("click", function () {
            // create map and position here
            const mapPerspective = {
                lat: 49.1888931,
                lng: -123.1535549,
                zoom: 10
            };
            mapInit(mapPerspective);
        });

    document.getElementById("makeMarker")
        .addEventListener("click", function () {
            // create markers and put on map
            addMarker(recyclingDepot, window.map);
        });

    document.getElementById("userLocation")
        .addEventListener("click", function () {
            userLocation(true);
        });

    document.getElementById("userLocationPromise")
        .addEventListener("click", function () {
            // get location via promise then display location on map
            let getPos = userLocationPromise();
            getPos.then(functionPass, functionFail);

            function functionPass(uPos) {
                console.log(uPos);
                let userMarker = new google.maps.Marker({
                    position: uPos,
                    map: window.map,
                    title: "Your location",
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                    }
                });
            }

            function functionFail(errorM) {
                console.log(errorM);
            }
        });

    document.getElementById("closest")
        .addEventListener("click", function () {
            let userLoc = {
                lat: 49.2234249,
                lng: -123.08954870000001
            };
            let ind = closestDist(recyclingDepot, userLoc);
            //console.log(ind);

            let userMarker = new google.maps.Marker({
                position: recyclingDepot[ind][0],
                map: window.map,
                title: "Your location",
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                }
            });
        });

    var [dirServ, dirRend] = [];
    document.getElementById("getDirection")
        .addEventListener("click", function () {
            let userCoord = userLocation(false);
            const mapPerspective = {
                lat: 49.1888931,
                lng: -123.1535549,
                zoom: 10
            };
            let coord1 = {
                lat: 49.171675711220395,
                lng: -123.1348560730858
            };
            let coord2 = {
                lat: 49.272128160675955,
                lng: -123.0824158014017
            };

            [dirServ, dirRend] = dirMapInit(mapPerspective, window.dirMap);
            mapDirections(coord1, coord2, dirServ, dirRend, window.dirMap);
        });

    document.getElementById("setDirection")
        .addEventListener("click", function () {
            let coord1 = {
                lat: 49.171675711220395,
                lng: -123.1348560730858
            };
            let coord2 = {
                lat: 49.272128160675955,
                lng: -123.0824158014017
            };

            mapDirections(coord1, coord2, dirServ, dirRend, window.dirMap);
        });
});