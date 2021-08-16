document.getElementById("weaponReinforcement").addEventListener("change", function(e) {
	$("#reinforcementFeedback").val("+"+e.target.value);
	reinforcement = parseInt(e.target.value);
	updateCalc();
});

//weaponSelect
document.getElementById("weaponSelect").addEventListener("change", function(e) {
	weapon = e.target.value;
	updateCalc();
});

//bloodCodeSelect
document.getElementById("bloodCodeSelect").addEventListener("change", function(e) {
	bloodCode = e.target.value;
	updateCalc();
});

//levelInput
document.getElementById("levelInput").addEventListener("change", function(e) {
	level = parseInt(e.target.value);
	updateCalc();
});

// Stat boosts

document.getElementById("StrUp").addEventListener("change", function(e) {
	strUp = parseInt(e.target.value);
	updateCalc();
});

document.getElementById("DexUp").addEventListener("change", function(e) {
	dexUp = parseInt(e.target.value);
	updateCalc();
});
document.getElementById("VitUp").addEventListener("change", function(e) {
	vitUp = parseInt(e.target.value);
	updateCalc();
});

document.getElementById("FortUp").addEventListener("change", function(e) {
	fortUp = parseInt(e.target.value);
	updateCalc();
});

document.getElementById("MndUp").addEventListener("change", function(e) {
	mndUp = parseInt(e.target.value);
	updateCalc();
});