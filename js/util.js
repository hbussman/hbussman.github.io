function randInt(min, max)
{ 
	return Math.floor(Math.random()*(max-min+1)+min);
}

function setText(elementId, newText)
{
	document.getElementById(elementId).innerHTML = newText
}

function padded(str, padding, char=' ')
{
	len = str.length
	for(var i = 0; i < padding-len; i++)
		str = char + str;
	return str;
}

// cookie functions from https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript#24103596
function createCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	var newCookie = name + "=" + value + expires + "; path=/";
	document.cookie = newCookie;
	console.log("[cookies::write]: " + newCookie)
	console.log("[cookies::state]: " + document.cookie)
}

function readCookie(name) {
	//console.log("[cookies::read]: " + name);
	console.log("[cookies::all]: " + document.cookie);
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);

		if (c.indexOf(nameEQ) == 0)
		{
			var found = c.substring(nameEQ.length,c.length);
			console.log("[¢ookies::read]: " + name + " -> " + found);
			return found
		}
	}
	console.log("[cookies::read]: didn't find '" + name + "'");
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
