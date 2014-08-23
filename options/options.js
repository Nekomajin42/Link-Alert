// object containing everything
var settings = {};

// load preferences
function loadData()
{
	// load default settings
	settings = firstrun;
	
	// overwrite is saved data is available
	if (window.localStorage.linkAlert1)
	{
		var temp = JSON.parse(window.localStorage.linkAlert1);
		var blocks = ["protocols", "filetypes", "attributes", "url", "preferences"];
		for (var i=0; i<blocks.length; i++)
		{
			for (var j=0; j<firstrun[blocks[i]].length; j++)
			{
				if (temp[blocks[i]][j] != null)
				{
					settings[blocks[i]][j].value = temp[blocks[i]][j].value;
				}
			}
		}
		settings.blacklist = temp.blacklist;
	}
	
	// then save data
	window.localStorage.linkAlert1 = JSON.stringify(settings);
}

// apply preferences
function setData()
{
	var i, j;
	var blocks = ["preferences", "filetypes", "protocols", "attributes", "url"];
	var icons;
	var path = (settings.preferences[2].value == false) ? "light" : "dark";
	for (i=0; i<blocks.length; i++)
	{
		icons = document.querySelectorAll("#" + blocks[i] + " div");
		for (j=0; j<settings[blocks[i]].length; j++)
		{
			document.getElementById(settings[blocks[i]][j].name).checked = settings[blocks[i]][j].value;
			if (i>0)
			{
				icons[j].style.backgroundImage = "url('../alerts/" + path + "/" + settings[blocks[i]][j].icon + ".svg')";
			}
		}
	}
	document.getElementById("blacklistEditor").value = settings.blacklist.join("\n");
}

// save preferences
function saveData(id, parentid)
{
	// find what has changed
	for (var i=0; i<settings[parentid].length; i++)
	{
		if (settings[parentid][i].name == id)
		{
			settings[parentid][i].value = (settings[parentid][i].value == false) ? true : false;
			break;
		}
	}
	window.localStorage.linkAlert1 = JSON.stringify(settings);
	if (id == "darkIcons")
	{
		location.reload(true);
	}
}

// save blacklist URLs
function saveBlacklist()
{
	settings.blacklist = (document.getElementById("blacklistEditor").value.length > 0) ? document.getElementById("blacklistEditor").value.split("\n") : [];
	window.localStorage.linkAlert1 = JSON.stringify(settings);
}

// things to do on page load
window.addEventListener("load", function()
{
	// select locale strings (control.js)
	selectLocale();
	
	// load saved values
	loadData();
	
	// set checkboxes
	setData();
	
	// attach event listener to the forms
	var form = document.getElementsByClassName("settings");
	for (var i=0; i<form.length; i++)
	{
		form[i].addEventListener("change", function(e){saveData(e.target.id, e.target.parentNode.id);}, false);
	}
	document.getElementById("saveBlacklist").addEventListener("click", saveBlacklist, false);
	
	// attach event listener to the menu items (control.js)
	var menu = document.querySelectorAll("#sidebar-menu li");
	for (var i=0; i<menu.length; i++)
	{
		menu[i].addEventListener("click", function(e){toggleMenu(this.id);}, false);
	}
	
	// check update (control.js)
	updatePopup();
}, false);