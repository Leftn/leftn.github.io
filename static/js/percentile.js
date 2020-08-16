var ratingData = [];

$.getJSON("/static/json/data.json", function(data){
    ratingData = data;

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

function scoreOfPercentile(array, p) {
    if (array.length === 0) {
        return 0;
    }

    if (p === 0) {
        return array[0];
    }

    let idx = Math.ceil(array.length * (p/100)) - 1;

    return array[idx];
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

$("#userMMRInput").change(function(e){

    let class_data = []
    if (e.target.value > 0){
        class_data = filterRatingData(ratingData, $("#inputClassFilter").val());
    } else {
        class_data = ratingData;
    }
    class_data = class_data.map(x => x[1]);

    $("#userMMROutput").val(percentileOfScore(class_data, e.target.value).toFixed(2) + "%");
})