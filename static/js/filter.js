//<tr>
//    <th scope="row">1</th>
//    <td>24</td>
//</tr>

let percentiles = [1, 5, 25, 50, 75, 90, 95, 99, 99.9];

function filterRatingData(data, class_id){
    // Class: "All" or any of the class Ids
    return data.filter(row => row[0] == class_id);
}

$("#inputClassFilter").change(function(e){
    if ((e.target.value >= 0) && (e.target.value <= 12)) {
        let class_data = []
        if (e.target.value > 0){
            class_data = filterRatingData(ratingData, e.target.value)
        } else {
            class_data = ratingData;
        }
        class_data = class_data.map(x => x[1]);
        let html = "";
        for (let i = 0; i < percentiles.length; i++){
            let p = scoreOfPercentile(class_data, percentiles[i]);
            html += `
<tr>
    <th scope="row">` + percentiles[i] + `</th>
    <td>` + p + `</td>
</tr>`;
        }
        $("#percentileTable").html(html);
        $("#chartDisplay").attr("src", "static/img/" + e.target.value + ".png");
    }
});

