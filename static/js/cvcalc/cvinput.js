document.getElementById("weaponReinforcement").addEventListener("change", function(e) {
	$("#reinforcementFeedback").val("+"+e.target.value);
});

//weaponSelect
document.getElementById("weaponSelect").addEventListener("change", function(e) {
	weapon = e.target.value;
});

//bloodCodeSelect
document.getElementById("bloodCodeSelect").addEventListener("change", function(e) {
	bloodCode = e.target.value;
});

//levelInput
document.getElementById("levelInput").addEventListener("change", function(e) {
	level = e.target.value
});