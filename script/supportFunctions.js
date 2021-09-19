/**
 * function to sort a list according to Select Sort methodology. List must be formatted as [valueToSortBy, otherValue] 
 *     (values sorted according to valueToSortBy, otherValue is the item associated with the sorted value)
 *     e.g. valueToSortBy = distance from reference, relevance to search, etc.
 *     e.g. otherValue = facility name, DB key associated with a location, etc.
 * NOTE: JS already has method to reverse array (arrayName.reverse()) so user can use that to get ascending order
 * @param {*} listToSort - list you want to sort
 * @returns the list, sorted in ascending order (smallest to largest)
 */      
function sort(listToSort) {
    // where the value to sort list by is stored in array
    const indOfSortVal = 0;

    let minVal = Number.POSITIVE_INFINITY;
    let minIndex = 0;

    // go through items of list
    for (let i = 0; i < listToSort.length; i++) {
        // set default values
        minVal = Number.POSITIVE_INFINITY;
        minIndex = 0;

        // go through unsorted items of list
        for (let j = i; j < listToSort.length; j++) {

            // find smallest value in unsorted portion of list
            if (listToSort[j][indOfSortVal] < minVal) {
                minVal = listToSort[j][indOfSortVal];
                minIndex = j;
            }
        }

        // now that min value found, swap items in array
        swap(listToSort, i, minIndex);
    }

    return listToSort;
}

/**
 * function to swap the values of "listToSwap" stored in the locations of "index1" and "index2"
 * @param {*} listToSwap - list you want to swap items for
 * @param {*} index1 - index of item 1 to swap
 * @param {*} index2 - index of other item to swap
 * @returns list of swapped items
 */
function swap(listToSwap, index1, index2) {
    let temp = listToSwap[index1];
    listToSwap[index1] = listToSwap[index2];
    listToSwap[index2] = temp;
    return listToSwap;
}