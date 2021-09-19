$(document).ready(function () {

    /*
     * get FAQ items and put on page
     */
    function getFaq() {

        db.collection("Help")
            .get()
            .then(function (snap) {

                //start of accordion 
                var accordionHTML = "<div class='accordion accordion-flush' id='accordionFlushExample'>";

                var faq = snap.docs;
                console.log(faq.length);

                let count = 1;

                faq.forEach(faqItem => {
                    console.log(faqItem.data().answer);

                    //individual items added to accordion.
                    accordionHTML += "<div class='accordion-item'>" +
                        "<h2 class='accordion-header' id='flush-headingOne'>" +
                        "<button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapse" + count + "' aria-expanded='false' aria-controls='flush-collapse" + count + "'>" +
                        faqItem.data().question +
                        "</button>" +
                        "</h2>" +
                        "<div id='flush-collapse" + count + "' class='accordion-collapse collapse' aria-labelledby='flush-heading" + count + "' data-bs-parent='#accordionFlushExample'>" +
                        "<div class='accordion-body'>" + faqItem.data().answer + "</div>" +
                        "</div>" +
                        "</div>";

                    count += 1;
                });

                //closing of html for accordion.
                accordionHTML += "</div>"
                console.log(accordionHTML)

                $("#faqContent").html(accordionHTML);
            });
    }

    getFaq();

    /*
    * button listener for submitting help request
    */
    $(".submitRequest").click(function () {

        let emailInfo = $(".emailField").val();
        let textInfo = $(".textField").val();
        let timestamp = new Date();

        if (textInfo == "") {

            $("#popHeader").text("Error");
            $("#popBody").text("Please enter a description before submission.");
        } else if (emailInfo == "") {

            db.collection("Feedback").doc().set({
                email: "unavailable",
                request: textInfo,
                Date: timestamp.toDateString()
            });

        } else {

            db.collection("Feedback").doc().set({
                email: emailInfo,
                request: textInfo,
                Date: timestamp.toDateString()
            });
        }
    });

    /*
    * button listener for model button
    */ 
    $("#understood").click(function () {
        window.location.reload();
    });
});