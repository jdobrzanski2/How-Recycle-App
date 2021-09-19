/**
 * ensure update goes through if input is changed via some other means other than keyboard
 */
$(document).ready(function () {
    $("#numGlass").change(function () {
        calcValue();
    });
    $("#numDrink").change(function () {
        calcValue();
    });
    $("#numMetal").change(function () {
        calcValue();
    });
    $("#numPlastic").change(function () {
        calcValue();
    });
});

/**
 * Used in conjunction with "onkeypress" event to only allow specified characters to 
 *     be entered into the number input field. Currently configured to allow 0-9 through.
 * @param {*} input - ASCII value of inputted character from "event.charCode" from "onkeypress" event
 * @returns boolean indicating whether input is permitted character or not
 */
function scrubInput(input) {
    const ZERO = 48;
    const NINE = 57
    return (input <= NINE && input >= ZERO);
}

/**
 * Grabs values from all input fields, then calculates cash back. Includes ways to handle
 *     empty, negative, float, and NAN values (unneeded since input properly scrubbed beforehand)
 */
function calcValue() {

    let strRef = ["#numGlass", "#numMetal", "#numDrink", "#numPlastic"];
    let val = 0;
    let total = 0;

    // iterate through all input fields
    for (let i = 0; i < strRef.length; i++) {
        // get value from input field
        val = $(strRef[i]).val()
        // handle empty input
        if (val == "") {
            val = 0;
        }
        // only add value to total if positive whole number
        if ((Math.floor(val) == val) && (val >= 0)) {
            total += 0.1 * parseInt(val);
        } else {
            //console.log("error on: " + strRef[i]);
        }
    }
    // put result on screen via DOM element, to 2 decimal places
    $(".showValue").text(total.toFixed(2));
}