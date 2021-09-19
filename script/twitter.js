const cb = new Codebird;
cb.setConsumerKey('GZ5D0UdkoW6nBMziEvOPWrBDA', 'nLOU2ZldEeFZLtHj2YKnSWMhG00GamTdEtBJwqf9s29hJaLURh');
// cb.setToken('756100524-cFopAk4GC70nAgbaTyEuZ4dtK7QXKqNOYmbCHKK9', 'BjYB2UMOjM6OyvTU0bfVGECu5tHNaAm4Vdj8upjQxxCJi');
cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAIY8QAEAAAAA8QumcruZ9e4ZpTFq5PEQs14PFqA%3D56V34s0WsyqzqCJOfTn275BOKroExIkqClUk3VnNNU6XToIH3h");

function share() {
    var twitterPIN = document.getElementById("twitterPin");
    twitterPin.classList.add("active");
    var overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    /**
     * Share function start
     * This share button script was adapted on github.com
     * 
     * @author J.M. Rütter and others
     * @see https://github.com/jublo/codebird-js 
     */

    cb.__call("oauth_requestToken", {
        oauth_callback: "oob"
    }, function (
        reply,
        rate,
        err
    ) {
        if (err) {
            console.log("error response or timeout exceeded" + err.error);
        }
        if (reply) {
            if (reply.errors && reply.errors["415"]) {
                // check your callback URL
                console.log(reply.errors["415"]);
                return;
            }

            // stores the token
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            // gets the authorize screen URL
            cb.__call("oauth_authorize", {}, function (auth_url) {
                window.codebird_auth = window.open(auth_url);
            });
        }
    });
}

/**
 * Get PIN and post tweet to Twitter.
 */
$("#submitPIN").click(function () {
    var pin = document.getElementById("passcode").value;
    // var pin = this.value;
    twitterPin.classList.remove('active');
    overlay.classList.remove('active');
    console.log(pin);
    cb.__call(
        "oauth_accessToken", {
            oauth_verifier: document.getElementById("passcode").value
        },
        function (reply, rate, err) {
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
            }
            if (reply) {
                // store the authenticated token, which may be different from the request token (!)
                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                var queryString = decodeURIComponent(window.location.search);
                var queries = queryString.split("?");
                var id = queries[1];
                db.collection("Depot").doc(id).onSnapshot(function (doc) {
                    var msg = "Let check this depot location: " + doc.data().depotName + " at this website: " + window.location.href
                    var params = {
                        status: msg
                    };
                    console.log(params);
                    cb.__call("statuses_update",
                        params,
                        function (reply, err) {
                            console.log(reply);
                            var shareTwitterResult = document.getElementById("shareTwitterResult");
                            var updateContent = document.getElementById("updateContent");
                            if (err) {
                                updateContent.innerHTML = "Oops!!! Something wrong happen. You may already share this depot before";
                            } else {
                                updateContent.innerHTML = "Update successfully";
                            }
                            shareTwitterResult.classList.add("active");
                            overlay.classList.add("active");
                        })
                })
            }
        });
})

/**
 * share function end  https://github.com/jublo/codebird-js
 * source: 
 */
/**
 * Show result when share content to twitter.
 */
$("#ok").click(function () {
    shareTwitterResult.classList.remove("active");
    overlay.classList.remove("active");
})