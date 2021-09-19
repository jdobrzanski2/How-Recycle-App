/**
 * Add a depot to user's favorite list by adding the depot ID.
 * @param {*} id is the id of a specific location
 */
function addFavourite(id) {
    document.getElementById(id).className = "removeFavourite";
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            var depotRef = db.collection("users").doc(uid);
            depotRef.update({
                favoriteLocation: firebase.firestore.FieldValue.arrayUnion(id)
            }).then(function () {
                $("#message-body").empty();
                $("#message-body").append("Added to the favorite list");
            });
        } else {
            document.getElementById(id).className = "addFavourite";
            $("#message-header").empty();
            $("#message-header").append("<div class='title'>"
                + "<h3>Stop</h3>"
                + "</div>"
                + "<button data-close-button class='close-button'>&times;</button>");
            $("#message-body").empty();
            $("#message-body").append("You must login first");
            document.getElementById(id).className = "addFavourite";
        }
        const message = document.getElementById("message");
        openMessage(message);
    })
}

/**
 * Remove a specific depot from favorite list.
 * @param {*} id is a depot document ID
 */
function removeFavourite(id) {
    console.log(document.getElementById(id) != null);
    if (document.getElementById(id) != null) {
        document.getElementById(id).className = "addFavourite";
    }
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            var depotRef = db.collection("users").doc(uid);
            depotRef.update({
                favoriteLocation: firebase.firestore.FieldValue.arrayRemove(id)
            }).then(function () {
                $("#message-body").empty();
                $("#message-body").append("Removed from the favorite list");

            });
        } else {
            $("#message-body").empty();
            $("#message-body").append("You must login first");
        }
        const message = document.getElementById("message");
        openMessage(message);
    })
}

/**
 * Add or remove a depot from favorite list.
 * @param {*} id is the depot document ID
 */
function favouriteFunction(id) {
    console.log(id);
    var depotID = document.getElementById(id);
    const message = document.getElementById("message");
    $("#message-header").empty();
    $("#message-header").append("<div class='title'>"
        + "<h3>Update favorite list</h3>"
        + "</div>"
        + "<button data-close-button class='close-button'>&times;</button>");
    if (depotID.className == "addFavourite") {
        addFavourite(id);
    } else {
        $("#message-body").empty();
        $("#message-body").append("<p>Are you sure want to remove this depot location from your favorite list?</p>");
        $("#message-body").append("<div class='message-bottom'>"
            + "<button  class='btn btn-danger remove' data-remove-button = 'message'>Remove</button>"
            + "</div>");
        openMessage(message);
        $(document).on('click', '.remove', function () {
            removeFavourite(id);
        });
    }
    $(document).on('click', '.close-button', function () {
        closeMessage(message);
    });
}

/**
 * Display depot location in the favorite list with red favorite button.
 * @param {*} id is the depot document ID
 */
function favorite(id) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            db.collection("users").doc(uid).onSnapshot(function (doc) {
                var favoriteList = doc.data().favoriteLocation;
                if (favoriteList.length != 0) {
                    for (let i = 0; i < favoriteList.length; i++) {
                        if (id == favoriteList[i]) {
                            document.getElementById(id).className = "removeFavourite";
                        }
                    }
                }
            })
        }
    })
}

/**
 * Display the message box.
 * @param {*} message is dev
 * @returns no return required
 */
function openMessage(message) {
    console.log("call open message");
    if (message == null) return
    message.classList.add('active')
    overlay.classList.add('active')
}

/**
 * Close and hide the message box.
 * @param {*} message is a dev
 * @returns 
 */
function closeMessage(message) {
    if (message == null) return
    message.classList.remove('active')
    overlay.classList.remove('active')
}