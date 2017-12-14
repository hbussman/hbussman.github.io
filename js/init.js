window.onload = function()
{
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	if(isChrome && window.location.href.startsWith("file://"))
	{
		setText("chrome-warning", "ACHTUNG: Diese Seite funktioniert nicht richtig, wenn sie lokal in Google Chrome angezeigt wird, da Chrome auf lokalen Seiten Cookies verweigert!");
	}

	eraseCookie("_ga"); // noone needs damn google analytics
	initMusic();
	initGame();
	eraseCookie("_ga"); // fts
}
