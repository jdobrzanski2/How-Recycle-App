
/**
 * Display depot location's information.
 */
function Depot() {
    var list = document.getElementById("depotInfo");
    while (list.hasChildNodes()) {
        list.removeChild(list.childNodes[0]);
    }
    var listItem = document.getElementById("acceptedItem");
    while (listItem.hasChildNodes()) {
        listItem.removeChild(listItem.childNodes[0]);
    }
    var queryString = decodeURIComponent(window.location.search);
    var queries = queryString.split("?");
    var id = queries[1];
    var accepted, streetNo, streetName, city, state, postcode, website, depotName, phoneNumber, hours;
    /**
     * Get information from database
     */
    db.collection("Depot").doc(id).onSnapshot(function (doc) {
        streetNo = doc.data().address.streetNumber;
        streetName = doc.data().address.streetName;
        city = doc.data().address.city;
        state = doc.data().address.state;
        postcode = doc.data().address.postcode;
        website = doc.data().website;
        depotName = doc.data().depotName;
        phoneNumber = doc.data().phoneNumber;
        hours = doc.data().hours;
        accepted = doc.data().accepted;
        console.log(accepted);
        //display informationto depot deptails page
        $("#depotInfo").append(
            "<div class = 'depotName'>"
            + "<h2 id = 'depotID'>" + depotName + "</h2>"
            + "</div>"
            + "<div class='info'>"
            + "<p><b>Address</b>: " + streetNo + " " + streetName + ", " + city + ", " + state + ", " + postcode + "</p>"
            + "<p><b>Phone number</b>: " + phoneNumber + "</p>"
            + "<p><b>Hour:</b></p>"
            + "<p class='hour'>Mon: " + hours.Mon + "</p>"
            + "<p class='hour'>Tue: " + hours.Tue + "</p>"
            + "<p class='hour'>Wed: " + hours.Wed + "</p>"
            + "<p class='hour'>Thu: " + hours.Thu + "</p>"
            + "<p class='hour'>Fri: " + hours.Fri + "</p>"
            + "<p class='hour'>Sat: " + hours.Sat + "</p>"
            + "<p class='hour'>Sun: " + hours.Sun + "</p>"
            + "<a href = '" + website + "'><b>Website</b>: " + website + "</a>"
            + "</div>"
        );

        $("#acceptedItem").append("<h4>We also accept other items:</h4>");
        let acceptedType = typeOfRecycleItem(accepted);
        console.log(acceptedType);
        //Display all type of item being accepted at this location.
        for (let i = 0; i < acceptedType.length; i++) {
            db.collection(acceptedType[i].parent.path + '/')
                .doc(acceptedType[i].id)
                .get()
                .then(function (item) {
                    image = item._delegate._document.data.partialValue.mapValue.fields.image.stringValue;
                    typeName = item._delegate._document.data.partialValue.mapValue.fields.name.stringValue;

                    $("#acceptedItem").append(
                        "<div class='recyleItem card'>"
                        + "<img src='" + image + "' alt='item' class='card-img-top'>"
                        + "<p class='card-title'>" + typeName + "</p>"
                        + "</div>"
                    );
                })
        }
        /**
         * Share to Twitter button
         */
        $("#acceptedItem").after(
            "<button class ='btnshare' onclick = 'share()'>Share on Twitter</button>"
            + "<img class = 'twitterlogo' src ='../images/icon.png' alt ='Share on Twitter'/>"
            + "<p id = 'error'></p>"
        )
    })
}

/**
 * Check whether the list of id contain a specific id.
 * @param {*} item is the id 
 * @param {*} list is the list of id
 * @returns 
 */
function isContain(item, list) {
    for (let i = 0; i < list.length; i++) {
        if (item.id == list[i].id) {
            return true;
        }
    }
    return false;
}

/**
 * Get all type of recycle item as a list.
 * @param {*} listItem is the list of recycle item
 * @returns a list type of recle item
 */
function typeOfRecycleItem(listItem) {
    var type = [""];
    var index = 0;
    for (let i = 0; i < listItem.length; i++) {
        if (!isContain(listItem[i].parent.parent, type)) {
            type[index] = listItem[i].parent.parent;
            index++;
        }
    }
    return type;
}

/**
 * Show the direction from user's location to the depot location
 */
function Direction() {
    var queryString = decodeURIComponent(window.location.search);
    var queries = queryString.split("?");
    var id = queries[1];
    location.href = "../html/map.html?" + id;
}

Depot();





