// GUESSING GAME YO!

// variables
var _min = 1
var _max = 100;
var _numberToGuess = randInt(_min, _max);
var _scores = null;
var _numTries = 0;
var _onSubmit = onGuess

function initGame()
{
	// bind the form submission
	document.getElementById('guessing-game').onsubmit = function (e) {
		_onSubmit();
		e.preventDefault();
	};

	// initiate with some example score if there are none
	loadScores();
	if(_scores == null || typeof(_scores) != "object")
	{
		_scores = [];
		createNewScoreEntry("überpro", 23); // sample entry
	}

	generateScoreboard();
}

function onGuess()
{
	_numTries++;

	var input = document.getElementById("game-input");

	var entered = input.value;
	if(entered == null || entered == "")
		return;

	input.value = ""; // clear it for conventience

	var guessed = parseInt(entered);
	console.log("guessed: " + guessed);

	// TODO logic
	if(guessed == _numberToGuess)
	{
		offerScoreboardEntry()
	}

	// inform the player about what's going on
	var deviation = "strange"; // shouldn't happen, but if it does for some reason, we got an easter egg.
	if(guessed == _numberToGuess)
		deviation = "correct!";
	else if(guessed > _numberToGuess)
		deviation = "too big";
	else if(guessed < _numberToGuess)
		deviation = "too small";

	var text = 'The guessed number of ' + guessed + ' is <font color="red">' + deviation + '</font>';

	if(guessed == _numberToGuess)
	{
		text += ' It took you <font color="red">' + _numTries + '</font> guesses to find that out!';
	}

	setText("guess-result", text);

}

function offerScoreboardEntry()
{
	console.log("offering scoreboard entry now");
	var button = document.getElementById('game-button');
	var input = document.getElementById('game-input');
	_onSubmit = addScoreboardEntry;
	button.innerHTML = "Add to Scoreboard";
	input.type = "string";
	input.value = "";
}

function addScoreboardEntry()
{
	console.log("adding scoreboard entry!");

	var inputBox = document.getElementById('game-input');

	createNewScoreEntry(inputBox.value, _numTries);

	resetGame();
}

function createNewScoreEntry(name, tries)
{
	var date = new Date();
	var entry = {
		name: name,
		tries: tries,
		date: padded(date.getDate(), 2, '0') + "." + padded(date.getMonth(), 2, '0') + "." + date.getFullYear() + ", " 
			  + padded(date.getHours(), 2, '0') + ":" + padded(date.getMinutes(), 2, '0') + ":" + padded(date.getSeconds(), 2, '0')
	};

	console.log("creating scoreboard entry for '" + name + "' with " + tries + " tries:");
	console.log(entry);

	var range = calcRange();

	if(_scores[range] == null)
		_scores[range] = [];

	_scores[range].push(entry);

	saveScoreboard();
	generateScoreboard();
}

function saveScoreboard()
{
	deleteScores();

	var tbl = _scores[calcRange()];

	// save all the scores if there are any
	if(tbl)
	{
		console.log("saving " + tbl.length + " scores");
		createCookie("num_scores_" + calcRange(), tbl.length);
		for(var i = 0; i < tbl.length; i++)
		{
			createCookie("score_" + calcRange() + "-" + i + ".name", tbl[i].name);
			createCookie("score_" + calcRange() + "-" + i + ".tries", tbl[i].tries);
			createCookie("score_" + calcRange() + "-" + i + ".date", tbl[i].date);
		}
	}
}

function deleteScores()
{
	var prev_entries = readCookie("num_scores_" + calcRange());
	if(prev_entries == null)
		prev_entries = 0;
	prev_entries = parseInt(prev_entries);

	// delete all dangling cookies
	console.log("deleting " + prev_entries + " old score cookies");
	eraseCookie("num_scores_" + calcRange());
	for(var i = 0; i < prev_entries; i++)
	{
		eraseCookie("score_" + calcRange() + "-" + i + ".name");
		eraseCookie("score_" + calcRange() + "-" + i + ".tries");
		eraseCookie("score_" + calcRange() + "-" + i + ".date");
	}
}

function loadScores()
{
	_scores = []

	var num_entries = readCookie("num_scores_" + calcRange());
	if(num_entries == null)
	{
		_scores[calcRange()] = null;
		return;
	}
	num_entries = parseInt(num_entries);

	if(_scores[calcRange()] == null)
		_scores[calcRange()] = [];

	var tbl = _scores[calcRange()];
	for(var i = 0; i < num_entries; i++)
	{
		name = readCookie("score_" + calcRange() + "-" + i + ".name");
		tries = parseInt( readCookie("score_" + calcRange() + "-" + i + ".tries") );
		date = readCookie("score_" + calcRange() + "-" + i + ".date");
		tbl.push({
			name: name,
			tries: tries,
			date: date
		});
	}
}

function generateScoreboard()
{
	// table header
	var html_text = 
	'<tr> \
		<th style="width:30px">Rank</th> \
		<th style="width:250px">Name</th> \
		<th style="width:30px">Tries</th> \
		<th style="width:120px">Date</th> \
	</tr>';

	var range = calcRange();

	if(_scores != null && _scores[range] != null)
	{
		var tbl = _scores[range];
		console.log("tbl: " + tbl);
		tbl.sort(function(a,b){ return a.tries - b.tries; });
		for(var i = 0; i < tbl.length; i++)
		{
			html_text += "<tr>";
			html_text += "<td>" + (i+1) + "</td>"; // rank
			html_text += "<td>" + tbl[i].name + "</td>"; // name
			html_text += "<td>" + tbl[i].tries + "</td>"; // tries
			html_text += "<td>" + tbl[i].date + "</td>"; // tries
			html_text += "</tr>";
		}
	}

	setText("scoreboard", html_text);
}

function resetGame()
{
	var button = document.getElementById('game-button');
	var input = document.getElementById('game-input');

	button.innerHTML = "Guess!";
	_onSubmit = onGuess;

	input.type = "number";
	input.value = "";

	setText("guess-result", "Benutze das Eingabefeld und den Button, um zu raten:");

	_numberToGuess = randInt(_min, _max);
	_numTries = 0;

}

// this is to stay extensible so we can extend the range later dynamically
function calcRange()
{
	var range = _max - _min + 1;
	return "level_" + range;
}
