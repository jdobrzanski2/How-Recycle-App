
/**
 * Get path and id information from window.location.href.
 * @returns path to the document and document id
 */
function interpretURLDoc() {
    const parsedUrl = new URL(window.location.href);
    // extract info from url, assign to variable
    let path = (parsedUrl.searchParams.get("collection"));
    let documentName = (parsedUrl.searchParams.get("document"));
    if (path == null) {
        return [null, null];
    } else {
        // sanitize input, remove non-alphanumberic character except for "-" ([^0-9a-zA-Z-]) in the entire string (g)
        path = path.replace(/[^0-9a-zA-Z-]/g, "");
        var collectionName = path.split("-");
        // assemble path to get document from DB
        let properPath = "Menu/";
        collectionName.forEach(function (id) {
            properPath += id + "/items/";
        });
        return [properPath, documentName];
    }
}

/**
 * Check whehter item is in the list or not.
 * @param {*} item is a item
 * @param {*} itemList the list of item
 * @returns true if the list contain item and false otherwise
 */
function isAccepted(item, itemList) {
    for (let i = 0; i < itemList.length; i++) {
        if (item == itemList[i].id) {
            return true;
        }
    }
    return false;
}

var [dirServ, dirRend] = [];
/**
 * Display distance from user location to the depot location.
 * @param {*} dest is the destination
 * @param {*} id is id of <p> element to display distance
 */
function setDistance(dest, id) {

    let getPos = userLocationPromise();
    getPos.then(functionPass, functionFail);

    function functionPass(userCoord) {
        const mapPerspective = { lat: userCoord["lat"], lng: userCoord["lng"], zoom: 10 };
        [dirServ, dirRend] = getDistance(mapPerspective, dest, id);
    }
    function functionFail(errorM) {
        console.log(errorM);
    }
}
/**
 * Get all depot location and display as a list from database.
 */
function listDepot() {
    var list = document.getElementById("listDepot");
    while (list.hasChildNodes()) {
        list.removeChild(list.childNodes[0]);
    }
    var depotRef = db.collection("Depot");

    let [colPath, docPath] = interpretURLDoc();
    db.collection(colPath)
        .doc(docPath)
        .get()
        .then(function (item) {
            $("#itempicture").attr("src", item.data().image);
            var name = item.data().name;
            if (name.length > 20) {
                name = name.substring(0, 20) + "...";
            }
            $("#recycleItem").text(name);
        })
    depotRef.get().then(function (q) {
        var id, streetNo, streetName, city, state, postcode, depotName, accepted, endLocation, distance;
        q.forEach(function (doc) {
            id = doc.id;
            accepted = doc.data().accepted;
            // console.log(accepted[0].id);
            streetNo = doc.data().address.streetNumber;
            streetName = doc.data().address.streetName;
            city = doc.data().address.city;
            state = doc.data().address.state;
            postcode = doc.data().address.postcode;
            depotName = doc.data().depotName;
            endLocation = { lat: doc.data().location.latitude, lng: doc.data().location.longitude };
            if (isAccepted(docPath, accepted)) {
                // console.log(true);
                $("#listDepot").append(
                    "<button id = '" + id + "' class = 'addFavourite' onclick='favouriteFunction(this.id)' title='favorite location'>&hearts;</button>"
                    + "<div class='depot card-body'>"
                    + "<a href='depotDetail.html?" + id + "'>"
                    + "<p class= 'card-title'>Name: " + depotName + "</p>"
                    + "<p class= 'card-text' id = 'distance" + id + "'></p>"
                    + "<p class='card-text'>Address: " + streetNo + " " + streetName + ", " + city + ", " + state + ", " + postcode + "</p>"
                    + "</a>"
                    + "</div>"
                )
                setDistance(endLocation, "distance" + id);
                favorite(id);
            }
        })
    })
}
/**
 * Set the message content to display specific recycle item information.
 */
function messageContent() {
    let [colPath, docPath] = interpretURLDoc();
    db.collection(colPath)
        .doc(docPath)
        .get()
        .then(function (item) {
            var info = item.data().Information;
            var instruction = item.data().instruction;
            $("#message-body").append(
                "<div>"
                + "<h4>Item Information:</h4>"
            );
            for (let i = 0; i < info.length; i++) {
                $("#message-body").append(
                    "<p>" + info[i] + "</p>"
                );
            }
            $("#message-body").append("</div>");

            $("#message-body").append(
                "<div>"
                + "<h4>Item Instruction:</h4>"
            );
            for (let i = 0; i < instruction.length; i++) {
                $("#message-body").append(
                    "<p>" + instruction[i] + "</p>"
                );
            }
            $("#message-body").append("</div>");
        })
}

/**
 * Display message content.
 */
function disposalInformation() {
    $("#message-body").empty();
    messageContent();
}

/**
 * Load the page when it is opened.
 */
$(document).ready(function () {
    listDepot();
})