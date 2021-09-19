/**
 * Cancel the action.
 */
function cancel() {
    location.href = "../html/user.html";
}

/**
 * Save and update user information on firebase.
 */
function save() {
    var user = firebase.auth().currentUser;
    var newPassword = document.getElementById("password").value;
    var DOB = document.getElementById("birthday").value.split("-");
    var userName = document.getElementById("userName").value;
    console.log(newPassword);
    if (newPassword != "") {
        user.updatePassword(newPassword).then(function () {
            alert("Updated password");
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }
    user.updateProfile({
        displayName: userName
    }).then(function () {
        console.log("Update user name successfully");
    }).catch(function (error) {
        alert("Error occurred!");
    });
    db.collection("users").doc(user.uid).update({
        name: userName,
        birthday: { year: DOB[0], month: DOB[1], day: DOB[2] }
    }, { merge: true }).then(function (doc) {
        window.location.href = "../html/user.html";
    });
}

/**
 * Load the user page when it open.
 */
$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var name = user.displayName;
            var email = user.email;
            var uid = user.uid;
            var birthday = document.getElementById("birthday");
            var userEmail = document.getElementById("email");
            var userName = document.getElementById("userName");
            var password = document.getElementById("password");
            password.value = "";
            password.placeholder = "*****";
            userName.value = name;
            userEmail.value = email;
            db.collection("users").doc(uid).onSnapshot(function (doc) {
                var dateOfBirth;
                var day = doc.data().birthday.day;
                var month = doc.data().birthday.month;
                var year = doc.data().birthday.year;
                dateOfBirth = year + "-";
                if (month.length < 2) {
                    dateOfBirth += "0" + month + "-";
                } else {
                    dateOfBirth += month + "-"
                }
                if (day.length < 2) {
                    dateOfBirth += "0" + day;
                } else {
                    dateOfBirth += day;
                }
                birthday.value = dateOfBirth;
            });
            password.value = "";
        } else {
            window.location.replace("../html/login.html");
        }
    });
})
