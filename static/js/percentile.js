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

// Code retrieved from: https://gist.github.com/IceCreamYou/6ffa1b18c4c8f6aeaad2
function scoreOfPercentile(arr, p) {
    if (arr.length === 0) return 0;
    if (typeof p !== 'number') throw new TypeError('p must be a number');
    if (p <= 0) return arr[0];
    if (p >= 1) return arr[arr.length - 1];

    var index = (arr.length - 1) * p,
        lower = Math.floor(index),
        upper = lower + 1,
        weight = index % 1;

    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
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
    $("#userMMROutput").val(percentileOfScore(ratingData, e.target.value).toFixed(2) + "%");
})