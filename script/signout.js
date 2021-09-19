/**
 * This code was adapted from firebase
 * 
 * source: https://firebase.google.com/docs/auth/web/password-auth
 */
function signout() {
  firebase.auth().signOut().then(() => {
    window.location.reload();
  }).catch((error) => {
    alert("Error");
  });
}