const categories = [];
let menuIds = [];
let menuItems = [];

getData();
/**
 *  autofill function for a search bar
 */
$("#search-area").keyup(function () {
  let txt = $(this).val();

  if (txt != "") {
    $("#search-autofill").children().remove();
    categories.forEach(function (sub1) {

      const subCatKey = Object.keys(sub1);
      let subCatValue = Object.values(sub1);
      
      for (let i = 0; i < subCatKey.length; i++) {
        if (Array.isArray(subCatValue[i])) {
          for (let j = 0; j < subCatValue[i].length; j++) {
            if (subCatValue[i][j].indexOf(txt) > -1) {
              console.log(subCatValue[i][j]);
              $("#search-autofill").append(
                $('<div id="appended-list">').text(subCatValue[i][j])
              );
            }
          }
        }
        if (subCatKey[i].indexOf(txt) > -1) {
          $("#search-autofill").append(
            $('<div id="appended-list">').text(subCatKey[i])
          );
        }
      }
    });
    $("#search-autofill")
      .children()
      .each(function () {
        $(this).click(function () {
          $("#search-area").val($(this).text());
          $("#search-autofill").children().remove();
        });
      });
  } else {
    $("#search-autofill").children().remove();
    $("#search-autofill").show();
  }
  $("#search-autofill").click(function (e) {
    e.stopPropagation();
  });
  $("body").click(function () {
    $("#search-autofill").hide();
  });
});

/**
 * get menu tag data for auto display feature of search bar
 */
function getData() {
  db.collection("menuTags")
    .get()
    .then((category) => {
      category.forEach((doc) => {
        categories.push(doc.data().category);
        console.log("data: ", categories);
      });
    });
  db.collection("Menu")
    .get()
    .then((items) => {
      items.forEach((doc) => {
        menuItems.push([doc.data().name, doc.id]);
      });
      menuIds.push(menuItems);
      console.log("menuIds", menuIds);
    });
}

/**
 * handler for submit button
 */
$("#submit").click(() => {
  directURL();
});

/**
 * redirect URL based on which menu tag is chosen
 */
function directURL() {
  let found = false;
  let newURLDefault = location.origin + "/html/menu.html";
  localStorage.setItem("input", $("#search-area").val().toLowerCase());
  let searchInput = localStorage.getItem("input").toLowerCase();

  db.collection("menuTags")
    .get()
    .then((cat) => {
      cat.forEach((sub1) => {
        let cats = sub1.data().category;
        let subCatKey = Object.keys(cats);
        let subCatValue = Object.values(cats);
        console.log("keys", subCatKey, "values", subCatValue);
        if (searchInput == "") {
          alert("Please Enter Something");
        } else {
          for (let i = 0; i < subCatKey.length; i++) {
            if (searchInput == subCatKey[i]) {
              found = true;
              window.location.href = newURLDefault;
            }
            for (let j = 0; j < subCatValue.length; j++) {
              if (searchInput == subCatValue[i][j]) {
                console.log(
                  "value lth , value",
                  subCatValue.length,
                  subCatValue[j]
                );
                menuIds[0].forEach((cat) => {
                  console.log(
                    "subcatkey, cat[0]",
                    subCatKey[i],
                    cat[0].toLowerCase(),
                    cat[1]
                  );
                  if (subCatKey[i] == cat[0].toLowerCase()) {
                    found = true;
                    console.log("new url: ", newURLDefault);
                    let newURL = newURLDefault + "?path=" + cat[1];
                    window.location.href = newURL;
                  }
                });
              }
            }
          }
          if (found == false) {
            alert("No Results Found");
          }
        }
      });
    });
}