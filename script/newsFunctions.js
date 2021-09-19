$(document).ready(function () {


    /**
     * get news items from DB and puts onto screen
     */
    function getNews() {
        db.collection("News")
            .orderBy("date", "desc")
            .get()
            .then(function (snap) {

                var news = snap.docs;
                //console.log(news.length);

                news.forEach(newsItem => {
                    //console.log(newsItem.data().link);
                    //console.log(newsItem.id);

                    let mainContainer = $("<div id = 'mainContainer' data-reference = " + newsItem.id + "></div>");

                    let titleContainer = $("<div id = 'titleContainer'></div>");
                    titleContainer.append("<h1>" + newsItem.data().title + "</h1>");

                    let bodyContainer = $("<div id = 'bodyContainer'></div>");
                    bodyContainer.append(newsItem.data().body);

                    if (newsItem.data().link != null) {
                        var linkContainer = $("<a id = 'linkContainer' href= " + newsItem.data().link + " >Link</a>");
                    }

                    let timeContainer = $("<div id ='timeContainer'></div>");
                    timeContainer.append(newsItem.data().date.toDate());

                    if (newsItem.data().link != null) {
                        mainContainer.append(titleContainer, bodyContainer, linkContainer, timeContainer);
                    } else {
                        mainContainer.append(titleContainer, bodyContainer, timeContainer);
                    }

                    $("#newsContent").append(mainContainer);
                });
            });
    }
    getNews();

    /**
     * handler for when a news item is clicked
     */
    $(document).on('click', '#mainContainer', function () {
        let reference = $(this).attr("data-reference");
        window.location.href = "/html/forum.html?forumID=" + reference;
    });
});