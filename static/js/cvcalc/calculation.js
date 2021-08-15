var bloodCode = "Achilles";
var weapon = "Bayonet";
var level = "";
var reinforcement = "";

var weaponData;
var bloodCodeData;

$.getJSON("static/json/bloodcode.json", function(data) {
	bloodCodeData = data;
});

$.getJSON("static/json/weapon.json", function(data) {
	weaponData = data;
});

function stat_factor(level) {
	return Math.pow(level, 2);
}

function stat_scaling(level) {
	return (Math.pow(level, 2/(100*Math.sqrt(5))));
}

function dex_factor(level) {
	
}

function updateCalc() {
	
}
