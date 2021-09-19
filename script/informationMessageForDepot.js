const openMessageButton = document.querySelectorAll('[data-message-target]');
const closeButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

/**
 * functions to handle opening, closing, adding listener for, etc. for information message for depot
 */
openMessageButton.forEach(button => {
    button.addEventListener('click', () => {
        const message = document.querySelector(button.dataset.messageTarget)
        openMessage(message)
    })
})
function openMessage(message) {
    if (message == null) return
    message.classList.add('active')
    overlay.classList.add('active')
}
function closeMessage(message) {
    if (message == null) return
    message.classList.remove('active')
    overlay.classList.remove('active')
}

closeButton.forEach(button => {
    button.addEventListener('click', () => {
        const message = button.closest('.message')
        closeMessage(message)
    })
})
overlay.addEventListener('click', () => {
    const message = document.querySelectorAll('.message.active')
    message.forEach(message => {
        closeMessage(message)
    })
})

/**
 * get depot information for display
 */
function messageContent() {
    var queryString = decodeURIComponent(window.location.search);
    var queries = queryString.split("?");
    var id = queries[1];
    db.collection("Depot").doc(id).onSnapshot(function (doc) {
        var instruction = doc.data().instruction;
        
        for (let i = 0; i< instruction.length; i++) {
            $("#message-body").append(
                "<div>"
                + "<h4>" + instruction[i].title + "</h4>"
            );
            for (let j = 0; j < instruction[i].content.length; j++) {
                $("#message-body").append("<p>" + instruction[i].content[j] + "</p>");
            }
            $("#message-body").append("</div>");
        }
    });
}
messageContent();