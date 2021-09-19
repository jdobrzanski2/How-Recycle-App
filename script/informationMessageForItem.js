const openMessageButton = document.querySelectorAll('[data-message-target]');
const closeButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

/**
 * Action for all open message button.
 */
openMessageButton.forEach(button => {
    console.log("call this")
    button.addEventListener('click', () => {
        const message = document.querySelector(button.dataset.messageTarget)
        openMessage(message)
    })
})
/**
 * Open and display message box.
 * @param {*} message is a dev
 * @returns no return require
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
 * @returns no return 
 */
function closeMessage(message) {
    if (message == null) return
    message.classList.remove('active')
    overlay.classList.remove('active')
}
/**
 * Action for all close button
 */
closeButton.forEach(button => {
    button.addEventListener('click', () => {
        const message = button.closest('.message')
        closeMessage(message)
    })
})
/**
 * Hide all content in the page except for the message box.
 */
overlay.addEventListener('click', () => {
    const message = document.querySelectorAll('.message.active')
    message.forEach(message => {
        closeMessage(message)
    })
})
