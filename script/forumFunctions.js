$(document).ready(function () {

    const parsedUrl = new URL(window.location.href);
    let forumID = parsedUrl.searchParams.get("forumID");

    /**
     * display forum content
     */
    db.collection("News").doc(forumID).onSnapshot(function (doc) {

        // how to pull each field. 
        let announceTitle = doc.data().title;
        let announceBody = doc.data().body;
        let announceDate = doc.data().date.toDate();
        let announceLink = doc.data().link;

        // for making the news on page
        let mainContainer = $("<div id = 'mainContainer'></div>");

        let titleContainer = $("<div id = 'titleContainer'></div>");
        titleContainer.append("<h1>" + announceTitle + "</h1>");

        let bodyContainer = $("<div id = 'bodyContainer'></div>");
        bodyContainer.append(announceBody);

        if (announceLink != null) {
            var linkContainer = $("<a id = 'linkContainer' href= " + announceLink + " >Link</a>");
        }
        let timeContainer = $("<div id ='timeContainer'></div>");
        timeContainer.append(announceDate);

        if (announceLink != null) {
            mainContainer.append(titleContainer, bodyContainer, linkContainer, timeContainer);
        } else {
            mainContainer.append(titleContainer, bodyContainer, timeContainer);
        }
        $("#forumContent").append(mainContainer);

    });

    /**
     * get and display comment information
     */
    function getComments() {

        //getting all comments
        db.collection("News").doc(forumID).collection("Comments")
            .orderBy("postDate", "desc")
            .get().then(function (snap) {

                var comments = snap.docs;

                if (comments.length > 0) {

                    $("#noComments").empty();
                }

                console.log(comments);

                // what do to with each comment
                comments.forEach(person => {

                    let postedDate = person.data().postDate.toDate();
                    console.log(postedDate);

                    let postInfo = person.data().post;

                    function displayComments() {

                        db.collection("users").doc(person.data().userID)
                            .get().then(function (doc) {
                                let commentBox = "<div class='card ' style='max-width: 540px';>" +
                                    "<div class='row g-0 comment'>" +
                                    "<div class='col '>";

                                commentBox += "<img src='" + doc.data().avatar + " '  class ='commentAvatar' alt='...'>" +
                                    "</div>" +
                                    "<div class='col bodyText'>" +
                                    "<div class='card-body '>" +
                                    "<h5 class='card-title'>" + doc.data().name + "</h5>";

                                commentBox += "<p class='card-text'>" + postInfo + "</p>" +
                                    "<p class='card-text'><small class='text-muted'>" + postedDate + "</small></p>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>";

                                $("#forumComments").append(commentBox);
                            });
                    }
                    displayComments();
                });
            });
    }
    getComments();

    /**
     * see if user logged in to allow posting of comments
     */
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            $("#signInAlert").html("Post a comment");

            //logged in user id to get user information from collection.
            var uid = user.uid;

            let commentForm = "<div id = 'submitComment'>" +
                "<div class='mb-3'>" +
                "<label for='exampleFormControlTextarea1' class='form-label'>Post a comment</label>" +
                "<textarea class='form-control textField' id='commentTextArea' rows='3' placeholder = 'Type here...'></textarea>" +
                "</div>" +
                "<button class='btn btn-outline-success submitFormButton submitRequest postButton' type='submit' data-bs-toggle='modal'" +
                "data-bs-target='#staticBackdrop'>Post</button>" +
                "</div>";
            $("#postCommentSection").html(commentForm);
            $(document).on('click', '.postButton', function () {
                if ($("#commentTextArea").val() == "") {
                    $("#popHeader").html("Error");
                    $("#popBody").html("Please fill in comment before posting");
                } else {
                    db.collection("News").doc(forumID).collection("Comments").doc().set({

                            userID: uid,
                            post: $("#commentTextArea").val(),
                            postDate: firebase.firestore.Timestamp.fromDate(new Date())

                        }).then(function () {
                            console.log("New user added to firestore");
                        })
                        .catch(function (error) {
                            console.log("Error adding new user: " + error);
                        });
                }
            });
            $(document).on('click', '#understood', function () {
                window.location.reload();
            });
        } else {
            console.log("no user");
        }
    });
});