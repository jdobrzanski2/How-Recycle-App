/*
* add listeners to buttons in header and footer
*/
$(document).ready(function () {
  $(".footer-left").click(function () {
    window.location.href = "/html/user.html";
  });

  $(".foot-right").click(function () {
    window.location.href = "/html/help.html";
  });

  $(".foot-center").click(function () {
    window.location.href = "index.html";
  });

  $(".goSearch").click(function () {
    window.location.href = "/html/menu.html";
  });
  var signOutBtn = document.getElementById("signout");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      signOutBtn.style.visibility = "show";
    } else {
      signOutBtn.style.visibility = "hidden";
    }
  });
});
