var ratingData = [];

$.getJSON("/static/json/data.json", function(data){
    ratingData = data;
    loadChart();
    $("#userMMRInput").attr("readonly", false);
    $("#userMMRInput").attr("placeholder", "Input your rating.");
});

function percentileOfScore(array, score){
    if (isNaN(score)) {
        return NaN;
    }

    if (Array.isArray(array)){
        if (array.length === 0) {
            return 100.0
        } else {
            let left = countLT(array, score);
            let right = countLTE(array, score);
            let i = -1;

            if (right > left) {
                i = 1;
            } else {
                i = 0;
            }

            pct = (right + left + i) * 50.0/array.length;
            return pct
        }
    } else {
        return 0.0
    }
}

function countLT(array, v) {
    var count = 0;

    for (var x = 0; x < array.length; x++){
        if (array[x] < v){
            count++;
        }
    }

    return count;
}

function countLTE(array, v) {
    var count = 0;

    for (var x = 0; x < array.length; x++){
        if (array[x] <= v){
            count++;
        }
    }

    return count;
}

function filterRatingData(data, class){
    // Class: "All" or any of the class Ids

}

$("#userMMRInput").change(function(e){
    $("#userMMROutput").val(percentileOfScore(ratingData, e.target.value).toFixed(2) + "%");
})