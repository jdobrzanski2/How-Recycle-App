$(document).ready(function () {

    /**
     * do certain actions based on whether user is logged in or not (i.e. display favorites else redirect to login)
     */
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            //testing if logged in.
            console.log(user);

            //logged in user id to get user information from collection.
            var uid = user.uid;
            console.log(uid);

            //where to populate.
            var listFavorites = $("#listFavorites");
            function getFavorites() {
                db.collection("users").doc(uid).get().then(function (doc) {
                    $("#userName").empty();
                    let name = doc.data().name;

                    // test to see if the right user. 
                    console.log(name);
                    $("#userName").append(name);
                    var favoriteDepot = doc.data().favoriteLocation;
                    if (favoriteDepot.length > 0) {
                        for (let i = 0; i < favoriteDepot.length; i++) {
                            db.collection("Depot").doc(favoriteDepot[i]).onSnapshot(function (doc) {
                                //console.log(favoriteDepot[i]);
                                listFavorites.append("<div class = 'listElement'><a class='list-group-item list-group-item-action favoriteItem' " +
                                    "href='/html/depotDetail.html?" + favoriteDepot[i] + "'>" +
                                    doc.data().depotName + "</a><button type='button' class=' toDelete' value = '" +
                                    favoriteDepot[i] + "' data-bs-toggle='modal' data-bs-target='#staticBackdrop'>x</button></div>");
                            })
                        }
                        $(document).on('click', '.toDelete', function () {

                            $(".remove").val(this.value);
                            console.log(this.value);
                        });

                        // when clicking to remove an element from favorite lists. 
                        $(document).on('click', '.remove', function () {
                            //console.log(this.value);
                            let newFavlist = favoriteDepot;
                            for (let i = 0; i < newFavlist.length; i++) {

                                if (newFavlist[i] == this.value) {
                                    newFavlist.splice(i, 1);
                                    break;
                                }
                            }
                            db.collection("users").doc(uid).update({

                                favoriteLocation: newFavlist
                            }).then(function () {
                                //$("#listFavorites").empty()
                                window.location.reload();
                            })
                        });
                    } else {
                        listFavorites.append("<p>You don't have any favorite location.</p>");
                    }
                });
            }
            getFavorites();
        } else {
            window.location.replace("../html/login.html");
        }
    });
});