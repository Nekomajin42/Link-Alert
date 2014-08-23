/* === Alert object ========================================================================= */
var Alert = {}; // tooltip object

// stuff to do on page load
Alert.Init = function()
{
	Options.Zoom();
	Alert.on = false; // icon container is not visible
	Alert.Create();
	
	window.addEventListener("DOMContentLoaded", Alert.Attach, false);
	window.addEventListener("DOMSubtreeModified", Alert.Attach, false);
	window.addEventListener("resize", function()
	{
		Options.Zoom();
		Alert.Resize();
	}, false);
};

// attach event listeners to links
Alert.Attach = function()
{
	var links = document.getElementsByTagName("a");
	for (var i=0; i<links.length; i++)
	{
		links[i].addEventListener("mouseover", Icons.Collect, false);
		links[i].addEventListener("mousemove", Alert.Move, false);
		links[i].addEventListener("mouseout", Alert.Remove, false);
	}
}

// create icon container
Alert.Create = function()
{
	Alert.toolTip = document.createElement("div");
	Alert.toolTip.id = "link_alert_tooltip";
	Alert.toolTip.style.position = "absolute";
	Alert.toolTip.style.zIndex = 10000000; // make sure the tooltip is above everything else
	Alert.toolTip.style.lineHeight = "100%";
	Alert.toolTip.style.padding = "0px";
	Alert.toolTip.style.boxSizing = "border-box";
	if (Options.settings.showBox == true) // add some extra style if "Show box" is enabled
	{
		Alert.toolTip.style.borderStyle = "solid";
		Alert.toolTip.style.borderColor = (Options.settings.darkIcons == true) ? "white" : "black";
		Alert.toolTip.style.backgroundColor = (Options.settings.darkIcons == true) ? "black" : "white";
	}	
};

// adjust icon container properties on page zoom
Alert.Resize = function()
{
	// not part of the style object
	Alert.toolTip.width = (Options.settings.keepZoom == true) ?  Options.zoomLevel*(Icons.collector.length*22+2) : Icons.collector.length*22+2; // icons.length*(img.width+img.margin) + 2*tooltip.borderwidth
	Alert.toolTip.offset = {};
	Alert.toolTip.offset.right = Options.zoomLevel*20;
	Alert.toolTip.offset.left = Options.zoomLevel*5;
	
	Alert.toolTip.style.height = (Options.settings.keepZoom == true) ? Options.zoomLevel*24 + "px" : "24px";
	if (Options.settings.showBox == true)
	{
		Alert.toolTip.style.borderWidth = (Options.settings.keepZoom == true) ? Options.zoomLevel + "px" : "1px";
		Alert.toolTip.style.borderRadius = (Options.settings.keepZoom == true) ? Options.zoomLevel*5 + "px" : "5px";
	}
};

// set icon container position relative to the mouse cursor
Alert.Move = function(e)
{
	if (Alert.on == true)
	{
		if (Options.settings.smartPos == true)
		{
			Alert.toolTip.style.left = ((window.innerWidth - (e.clientX + 2*Alert.toolTip.offset.right)) > Alert.toolTip.width) ? e.pageX + Alert.toolTip.offset.right + "px" : e.pageX - 2*Alert.toolTip.offset.left - Alert.toolTip.width + "px";
		}
		else
		{
			Alert.toolTip.style.left = (e.pageX + Alert.toolTip.offset.right) + "px";
		}
		Alert.toolTip.style.top = e.pageY + "px";
	}
};

// remove icon container from the DOM
Alert.Remove = function()
{
	if (Alert.on == true)
	{
		document.body.removeChild(Alert.toolTip);
		Alert.on = false;
		Icons.Remove();
	}
};

// append icon container to the DOM
Alert.Append = function(e)
{	
	if (Alert.on == true) // remove previous container if it is stuck
	{
		document.body.removeChild(document.getElementById("link_alert_tooltip"));
	}
	
	Alert.Resize();
	Alert.on = true;
	Alert.Move(e); // set icon container position
	document.body.appendChild(Alert.toolTip);
};

/* === Icons object ========================================================================= */
var Icons = {}; // Icons and properties
Icons.collector = []; // contains the necessary icons

// collect Icons
Icons.Collect = function(e)
{
	Icons.collector.length = 0; // clear the container
	
	// check protocols
	outer: // label to break the outer loop
	for (var i=0; i<Options.settings.protocols.length; i++)
	{
		if (Options.settings.protocols[i].value == true)
		{
			for (var j=0; j<Options.settings.protocols[i].pattern.length; j++)
			{
				if (this.protocol == Options.settings.protocols[i].pattern[j])
				{
					Icons.collector.push(Options.settings.protocols[i].icon);
					break outer;
				}
			}
		}
	}
	
	// check attributes
	for (var i=0; i<Options.settings.attributes.length; i++)
	{
		if (Options.settings.attributes[i].value == true)
		{
			for (var j=0; j<Options.settings.attributes[i].pattern.length; j++)
			{
				if (this.hasAttribute(Options.settings.attributes[i].pattern[j]))
				{
					if (i == 0 && this.target != "_blank") // if "target" is found, check its value
					{
						continue;
					}
					Icons.collector.push(Options.settings.attributes[i].icon);
				}
			}
		}
	}
	
	// check bookmark and query
	for (var i=0; i<Options.settings.url.length; i++)
	{
		if (Options.settings.url[i].value == true && this[Options.settings.url[i].pattern] != "")
		{
			if (i == 0 && this.hostname+this.pathname+this.search != location.hostname+location.pathname+location.search) // I really don't remember what this does ^^
			{
				continue;
			}
			Icons.collector.push(Options.settings.url[i].icon);
		}
	}
	
	// check file types
	var path, query; // regexp objects created from file type patterns
	outer: // label to break the outer loop
	for (var i=0; i<Options.settings.filetypes.length; i++)
	{
		if (Options.settings.filetypes[i].value == true)
		{
			for (var j=0; j<Options.settings.filetypes[i].pattern.length; j++)
			{
				path = new RegExp("\\" + Options.settings.filetypes[i].pattern[j] + "$", "i"); // in path fragment
				if (path.test(this.pathname))
				{
					Icons.collector.push(Options.settings.filetypes[i].icon);
					break outer;
				}
				else // don't waste resources to create a new regexp if it is not necessary
				{
					query = new RegExp("\\" + Options.settings.filetypes[i].pattern[j] + "(&.*)?$", "i"); // in query fragment
					if (query.test(this.search))
					{
						Icons.collector.push(Options.settings.filetypes[i].icon);
						break outer;
					}
				}
			}
		}
	}
	
	// do we have any icons to show?
	if (Icons.collector.length != 0)
	{
		// if "No title" is enabled, remove the title attribute
		if (Options.settings.noTitle == true)
		{
			this.removeAttribute("title");
		}

		Icons.Append(e);
	}
};

// remove icons from the icon container
Icons.Remove = function()
{
	for (var i=Alert.toolTip.childNodes.length-1; i>=0; i--)
	{
		Alert.toolTip.removeChild(Alert.toolTip.childNodes[i]);
	}
};

// append icons to the icon container
Icons.Append = function(e)
{
	for (var i=0; i<Icons.collector.length; i++)
	{
		// create icon element
		Icons.img = document.createElement("img");

		// add some style
		Icons.img.style.display = "block";
		Icons.img.style.cssFloat = "left";
		Icons.img.style.width = (Options.settings.keepZoom == true) ? Options.zoomLevel*16 + "px" : "16px";
		Icons.img.style.height = (Options.settings.keepZoom == true) ? Options.zoomLevel*16 + "px" : "16px";
		Icons.img.style.margin = (Options.settings.keepZoom == true) ? Options.zoomLevel*3 + "px" : "3px";
		Icons.img.style.padding = "0px";
		Icons.path = (Options.settings.darkIcons == true) ? "alerts/dark/" : "alerts/light/";
		
		// add file
		Icons.img.src = chrome.extension.getURL(Icons.path + Icons.collector[i] + ".svg");
		Icons.img.alt = Icons.collector[i];
		Alert.toolTip.appendChild(Icons.img);
	}
	Alert.Append(e);
};

/* === Options object ========================================================================= */
var Options = {}; // user settings

// zoom level correction
Options.Zoom = function()
{
	Options.zoomLevel = 1/window.devicePixelRatio;
};

// copy user preferences to other object (so I can refer to them by name)
Options.Copy = function()
{
	var prefs = ["showBox", "smartPos", "darkIcons", "noTitle", "keepZoom", "blacklistOn"];
	for (var i=0; i<prefs.length; i++)
	{
		Options.settings[prefs[i]] = Options.settings.preferences[i].value;
	}
};

// look for the address on the blacklist
Options.Blacklisted = function()
{
	if (Options.settings.blacklistOn == true || Options.settings.blacklist.length != 0)
	{
		for (var i=0; i<Options.settings.blacklist.length; i++)
		{
			url = new RegExp(Options.settings.blacklist[i], "i");
			if (url.test(location.href))
			{
				console.log("Link Alert: This site is on the blacklist.");
				return true;
			}
		}
		return false;
	}
	return false;
};

/* === LOAD ========================================================================= */

// send request for saved preferences
chrome.runtime.sendMessage("", function(response)
{
	console.log("Link Alert: ON!");
	
	Options.settings = response;
	
	if (Options.Blacklisted() == false) // do the stuff if the page is not on the blacklist
	{
		Options.Copy();
		Alert.Init();
	}
});