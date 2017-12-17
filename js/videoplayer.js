// MUSIC MANAGEMENT SCRIPT

// there is a specific order to this that shall be maintained. rather obvious actually.
const _songs = [
	{
		id: "zPonioDYnoY", // Elan
		params: ["end=272"]
	},
	{
		id: "DJS5g4-p3K4" // Turn Loose The Mermaids
	},
	{
		id: "ggVGiKw-geQ", // Evolution
		params: ["start=8"]
	},
	{
		id: "JPm46Qgyn24", // Gunman
		params: ["start=17", "end=333"]
	},
	{
		id: "VDLZ6Mqy7AM", // Liar Liar
		params: ["end=272"]
	},
	{
		id: "D_QLQHkj1XU", // Edge Of The Blade
	},
	{
		id: "YLbWAgMXSVY" // Through My Veins
	},
	{
		id: "kb8WGig0MLU", // Thousandfold
		params: ["start=8"]
	},
	{
		id: "pkpd9G2q3aY" // ?
	}
];

var _currentSong = 0;


// initialize music on page load
function initMusic()
{
	_currentSong = readCookie("songIndex");
	if(_currentSong == null)
	{
		_currentSong = 0;
		console.log("initializing song index cookie");
	}
	_currentSong = parseInt(_currentSong);
	if(_currentSong >= _songs.length)
		_currentSong = 0;

	updateSong();
}

function updateSong()
{
	console.log("loading video #" + _currentSong);

	var song = _songs[_currentSong];
	var url = "https://www.youtube-nocookie.com/embed/" + song.id + "?rel=0&autoplay=1"; // base url
	if(song.params != null) {
		for (var i = 0; i < song.params.length; i++) { // append all parameters
			url += "&" + song.params[i];
		}
	}

	// load the chosen video
	document.getElementById("yt-player").src = url;
	console.log("video loaded: " + url);

	setText("video-label", "Video " + (_currentSong+1) + "/" + _songs.length);

	// save what's next
	_currentSong++;
	if(_currentSong >= _songs.length)
		_currentSong = 0;
	createCookie("songIndex", _currentSong, 3);
	console.log("next video: " + (_currentSong+1) + " of " + _songs.length);
}

function nextSong()
{
	console.log("> next song selected");
	updateSong();
}

function prevSong()
{
	console.log("> previous song selected");
	_currentSong = (_currentSong+_songs.length - 2) % _songs.length;
	updateSong();
}
