var ratingData = [];

$.getJSON("/static/json/data.json", function(data){
    ratingData = data;
    $("#userMMRInput").attr("readonly", false);
    $("#userMMRInput").val("Enter your rating.");
});