var bloodCode = "Queenslayer";
var weapon = "Zweihander";
var level = "1";
var reinforcement = "0";

var strUp = 0;
var dexUp = 0;
var mndUp = 0;
var vitUp = 0;
var fortUp = 0;

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

$("document").on("ready", function(e) {
	updateCalc();
});

function stat_factor(stat) {
	return Math.pow(letterReference[stat], 2)/100;
}

function stat_scaling(stat) {
	return (Math.pow(letterReference[stat], 2/(100*Math.sqrt(5))));
}

function dex_factor(l) {
	let n_dex;
	if (l == 0) {
		n_dex = dexUp;
	} else {
		n_dex = dexUp/l;
	}
	return stat_factor(weaponData[weapon].dex) * (Math.pow(l, 2) / (Math.pow(l, 2) + 10000/(stat_factor(bloodCodeData[bloodCode].dexterity) + n_dex)));
}

function str_factor(l) {
	let n_str;
	if (l == 0) {
		n_str = strUp;
	} else {
		n_str = strUp/l;
	}
	return stat_factor(weaponData[weapon].str) * (Math.pow(l, 2) / (Math.pow(l, 2) + 10000/(stat_factor(bloodCodeData[bloodCode].strength) + n_str)));
}

function multiplier(l) {
	return str_factor(l) + dex_factor(l) + (stat_scaling([weaponData[weapon].dex]) * (Math.pow((letterReference[bloodCodeData[bloodCode].dexterity] + dexUp), 2/(100*Math.sqrt(5))))) + (stat_scaling(weaponData[weapon].str) * (Math.pow((letterReference[bloodCodeData[bloodCode].strength] + strUp), 2/(100*Math.sqrt(5)))));
}

function hp_multiplier(l) {
	let n_vit;
	let n_str;
	if (level == 0) {
		n_vit = vitUp;
		n_str = strUp;
	} else {
		n_vit = vitUp/level;
		n_str = strUp/level;
	}
	return 5 * (l/(l+100/((letterReference[bloodCodeData[bloodCode].strength] + n_str)/12 * 0.25 + ((letterReference[bloodCodeData[bloodCode].vitality] + n_vit)/12)));
}

function flat_stamina_mind(L) {
	let n_mnd;
	if (level == 0) {
		n_mnd = mndUp;
	} else {
		n_mnd = mndUp/parseInt(level)
	}
	return (3(L + n_mnd) - 40/3)
}

function flat_stamina_fortitude(L) {
	let n_fort;
	if (level == 0) {
		n_fort = fortUp;
	} else {
		n_fort = fortUp/parseInt(level)
	}
	return (3(L + n_fort) - 40/3)
}

function stam_multiplier(l) {
	return 100 * ((5/3 * l / (l + 100/((letterReference[bloodCodeData[bloodCode].mind]/15)/4 + letterReference[bloodCodeData[bloodCode].fortitude]/15))) + 1) + (1/4 * flat_stamina_mind(bc_mnd)+ flat_stamina_fortitude(bc_fort)))
}

function updateCalc() {
	let base = weaponData[weapon].base * (1 + (0.1 * reinforcement));
	let hp = 2000/3;
	let stam;
	base = Math.floor(base * multiplier(level));
	hp = Math.ceil(hp * (1 + hp_multiplier(level)));
	stam = Math.floor(stam_multiplier(level));
	$("#hpOutput").html(hp);
	$("#damageOutput").html(base);
	$("#stamOutput").html(stam);
}
