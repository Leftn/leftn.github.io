
function loadChart() {
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {
    ratingData.unshift(["Class", "Rating"]);
    var data = google.visualization.arrayToDataTable(ratingData);
    var options = {
    }
    var chart = new google.visualization.Histogram(document.getElementById("chart_div"));
    chart.draw(data, options);
}