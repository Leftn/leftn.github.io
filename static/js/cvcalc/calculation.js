var bloodCode = "Achilles";
var weapon = "Bayonet";
var level = "1";
var reinforcement = "0";

var weaponData;
var bloodCodeData;

var letterReference = {
	"S+":16,
	"S":15,
	"A+":14,
	"A":13,
	"B+":12,
	"B":11,
	"C+":10,
	"C":9,
	"D+":8,
	"D":7,
	"E+":6,
	"E":5,
	"-":0
};

$.getJSON("static/json/bloodcode.json", function(data) {
	bloodCodeData = data;
});

$.getJSON("static/json/weapon.json", function(data) {
	weaponData = data;
});

function stat_factor(stat) {
	return Math.pow(letterReference[stat], 2)/100;
}

function stat_scaling(stat) {
	return (Math.pow(letterReference[stat], 2/(100*Math.sqrt(5))));
}

function dex_factor(l) {
	return stat_factor(weaponData[weapon].dex) * (Math.pow(l, 2) / (Math.pow(l, 2) + 10000/stat_factor(bloodCodeData[bloodCode].dexterity)));
}

function str_factor(l) {
	return stat_factor(weaponData[weapon].str) * (Math.pow(l, 2) / (Math.pow(l, 2) + 10000/stat_factor(bloodCodeData[bloodCode].strength)));
}

function multiplier(l) {
	return str_factor(l) + dex_factor(l) + (stat_scaling([weaponData[weapon].dex]) * stat_scaling(bloodCodeData[bloodCode].dexterity)) + (stat_scaling(weaponData[weapon].str) * stat_scaling(bloodCodeData[bloodCode].strength));
}

function updateCalc() {
	let l = parseInt(level);
	let base = weaponData[weapon].base * (1 + (0.1 * reinforcement));
	base = Math.floor(base * multiplier(l));
	
	$("#damageOutput").html(base);
}
