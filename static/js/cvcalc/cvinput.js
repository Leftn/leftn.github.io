document.getElementById("weaponReinforcement").addEventListener("change", function(e) {
	$("#reinforcementFeedback").val("+"+e.target.value);
	updateCalc()
});

//weaponSelect
document.getElementById("weaponSelect").addEventListener("change", function(e) {
	weapon = e.target.value;
	updateCalc()
});

//bloodCodeSelect
document.getElementById("bloodCodeSelect").addEventListener("change", function(e) {
	bloodCode = e.target.value;
	updateCalc()
});

//levelInput
document.getElementById("levelInput").addEventListener("change", function(e) {
	level = e.target.value
	updateCalc()
});