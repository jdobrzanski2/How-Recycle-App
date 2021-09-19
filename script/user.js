/**
 * Get and display user information from firebase.
 */
function displayUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var favoriteLocation = document.getElementById("listFavourite");
            var name = user.displayName;
            var email = user.email;
            var uid = user.uid;
            document.getElementById("name").innerHTML = name;
            db.collection("users").doc(uid).onSnapshot(function (doc) {
                $("#listFavourite").empty();
                var dateOfBirth = doc.data().birthday;
                document.getElementById("dateOfBirth").innerHTML = "Birthday: " + dateOfBirth.year + "/" + dateOfBirth.month + "/" + dateOfBirth.day;
                var favoriteDepot = doc.data().favoriteLocation;
                if (favoriteDepot.length > 0) {
                    for (let i = 0; i < favoriteDepot.length && i < 5; i++) {
                        console.log(favoriteDepot[i]);
                        db.collection("Depot").doc(favoriteDepot[i]).onSnapshot(function (doc) {
                            $(favoriteLocation).append("<li class='list-group-item favouriteItem'>"
                                + "<a href = 'depotDetail.html?" + doc.id + "'>"
                                + doc.data().depotName
                                + "</a>"
                                + "<button value = '" + favoriteDepot[i] + "'class = 'addFavourite btn favoritePosition delete' data-message-target='#message' title='remove favorite location'>&times;</button>"
                                + "</li>");
                        })
                    }
                    if (favoriteDepot.length > 5) {
                        $(favoriteLocation).append("<li class='list-group-item favouriteItem'>"
                            + "<a href = 'favorites.html'>"
                            + "View More..."
                            + "</a></li>");
                    }
                } else {
                    $(favoriteLocation).append("<p>You don't have any favorite location.</p>");
                }
            });
        } else {
            window.location.replace("../html/login.html");
        }
    });
}
/**
 * Message box to ask user's confirmation before remove a depot from favorite list.
 */
$(document).on('click', '.delete', function () {

    $(".remove").val(this.value);
    const message = document.getElementById("message");
    if (message == null) return
    message.classList.add('active')
    overlay.classList.add('active')
});
/**
 * Remove depot location from favorite list after recieve confirmation.
 */
$(document).on('click', '.remove', function () {
    var id = this.value;
    message.classList.remove('active');
    overlay.classList.remove('active');
    console.log(this.value);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            var depotRef = db.collection("users").doc(uid);
            depotRef.update({
                favoriteLocation: firebase.firestore.FieldValue.arrayRemove(id)
            })
        } else {
            window.location.replace("../html/login.html");
        }
    })
});

/**
 * Call this function when loading the page.
 */
displayUserInfo();

