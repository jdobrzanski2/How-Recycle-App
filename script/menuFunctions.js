/**
 * setup for menu page
 */
$(document).ready(function () {
  // extract id from url, assign to variable
  let [URLPath, colPath, docName] = interpretURL();
  loadMenu(URLPath);
  menuBanner(colPath, docName);
  buttonListeners();
});

/**
 * function for loading document items in collection. Calls "displayItem()" to put item as formatted card on screen.
 * @param {*} URLPath - path used to access a given collection in the DB
 */
function loadMenu(URLPath) {
  db.collection(URLPath)
    .get()
    .then(function (category) {
      if (category.size > 0) {
        //console.log("this exists");
        category.forEach(function (item) {
          displayItem(item, URLPath);
        });
      } else {
        //console.log("doesn't exist");
        $("#errorMessage").append(
          "<p style='margin-left: 10px;'>Category not found! Please try again.</p>"
        );
      }
    })
    .catch(function (error) {});
}

/**
 * function for loading information to banner of page (back button/collection name). Since it loads collection
 *     as a document, needs collection path and document ID as the input
 * @param {*} colPath - path of the collection item in DB
 * @param {*} docID - ID of the document to access within the given collection
 */
function menuBanner(colPath, docID) {
  $("#bannerMessage").text(
    "Please find an item by clicking on one of the following categories:"
  );
  if (colPath == "Menu/" && docID == null) {
    //console.log("highest level");
    $("#prevPageBtn").css("display", "none");
  } else {
    //console.log("submenu");
    $("#prevPageBtn").css("display", "inline-block");
    db.collection(colPath)
      .doc(docID)
      .get()
      .then(function (doc) {
        $("#headerText").html("You are in: <b>" + doc.data().name) + "</b>";
      });
  }
}

/**
 * function for adding listener to "back" button near to of page
 */
function buttonListeners() {
  document.getElementById("prevPageBtn").addEventListener("click", function () {
    window.history.back();
  });
}

/**
 * function that puts the item onto menu.html page
 * @param {*} itemToDisp - item from DB to display
 * @param {*} URLPath - path to access that item in the DB (used to check if this item should lead to another menu)
 */
function displayItem(itemToDisp, URLPath) {
  let name = itemToDisp.data().name;
  let image = itemToDisp.data().image;
  let id = itemToDisp.id;
  let isCollection = false;

  var codeString =
    '<div class="card item" style= "margin: 1vw;width: 170px; text-align: center; display: inline-block;" id="' +
    id +
    '">' +
    '<div style="padding: 10px 10px 0px 10px; margin: 0px; display: flex; justify-content: center;">' +
    '<img src="' +
    image +
    '" alt="userIcon" style="width: 150px; height: 150px; display: block;">' +
    "</div>" +
    '<p style="display: inline-block; width: 100%; padding: 5px; margin: 0; text-align: center;">' +
    name +
    "</p>" +
    '<div style="width: 30px; background-color: white; display: inline-block; position: absolute; left: 135px; top: 5px; padding: 5px; margin: 0; color: black;">';

  db.collection(URLPath + itemToDisp.id + "/items")
    .get()
    .then(function (check) {
      // see if clicked item is a collection or document and redirect accordingly
      if (check.size > 0) {
        codeString += "🗀</div></div>";
        //console.log("is a collection");
        isCollection = true;
      } else {
        //console.log("not a collection");
        codeString += "🗎</div></div>";
        isCollection = false;
      }
      $("#menuItems").append(codeString);
      addMenuListener(itemToDisp.id, URLPath, isCollection);
    });
}

/**
 * make menu item clickable
 * @param {*} menuID - id of the menu item to display
 * @param {*} URLPath - where in the menu hierarchy this item is (used to confiure re-direct URL)
 * @param {*} isCollection - true/false of whether the menu item is a collection (lead to menu.html) or doc (lead to details page)
 */
function addMenuListener(menuID, URLPath, isCollection) {
  document.getElementById(menuID).addEventListener("click", function () {
    // remove "menu" and "items" from URL path
    let redirectURL = URLPath.replace("Menu/", "").replaceAll("/items/", "-");

    let hypIndex = redirectURL.lastIndexOf("-");
    redirectURL = redirectURL.substring(0, hypIndex);

    // see if clicked item is a collection or document and redirect accordingly
    if (isCollection) {
      //console.log("is a collection");
      if (redirectURL != "") {
        redirectURL += "-";
      }
      redirectURL += menuID;
      window.location.href = "menu.html?path=" + redirectURL;
    } else {
      //console.log("not a collection");
      window.location.href =
        "details_page.html?collection=" + redirectURL + "&document=" + menuID;
    }
  });
}

/**
 * capture path information from URL
 * @returns [properPath, colPath, docName]
 *         properPath - path used to get items collection from this category of DB
 *         colPath - path to get to collection only of this category of DB
 *        docName - document id of the category
 */
function interpretURL() {
  const parsedUrl = new URL(window.location.href);

  // extract id from url, assign to variable
  let path = parsedUrl.searchParams.get("path");
  let colPath = "Menu/";
  let docName;

  // deal with cases where there is no path, else start handling path data
  if (path == null || path == "") {
    return ["Menu/", colPath, docName];
  } else {
    // sanitize input, remove non-alphanumberic character except for "-" ([^0-9a-zA-Z-]) in the entire string (g)
    path = path.replace(/[^0-9a-zA-Z-]/g, "");
    let collectionName = path.split("-");

    // construct path
    let properPath = "Menu/";
    for (let i = 0; i < collectionName.length; i++) {
      if (i == collectionName.length - 1) {
        colPath = properPath;
        docName = collectionName[i];
      }
      properPath += collectionName[i] + "/items/";
    }
    return [properPath, colPath, docName];
  }
}

/**
 * Grab collection path and document ID from URL (as formatted by menu.html page) to access the specific page the user navigated to
 *     use with:
 *         let [colPath, docPath] = interpretURLDoc();
 *         db.collection(colPath)
 *             .doc(docPath)
 *             .get()
 *             .then(function (item) {
 *                 // do something with item data
 *                 console.log(item.data());
 *             })
 * example URL: /html/details_page.html?collection=MXOZAQW6mldwe4yK9VOx-atBRR3Yohf8htoObVJHv&document=ZuwZ4kLFZCnVxbhadn1v
 * @returns [properPath, documentName]
 *           properPath = collection path
 *           documentName = doc name
 */
function interpretURLDoc() {
  const parsedUrl = new URL(window.location.href);

  // extract info from url, assign to variable
  let path = parsedUrl.searchParams.get("collection");
  let documentName = parsedUrl.searchParams.get("document");

  // deal with cases where path is empty, else handle path data
  if (path == null) {
    return [null, null];
  } else {
    // sanitize input, remove non-alphanumberic character except for "-" ([^0-9a-zA-Z-]) in the entire string (g)
    path = path.replace(/[^0-9a-zA-Z-]/g, "");
    var collectionName = path.split("-");

    // assemble path to get document from DB
    let properPath = "Menu/";
    collectionName.forEach(function (id) {
      properPath += id + "/items/";
    });
    return [properPath, documentName];
  }
}