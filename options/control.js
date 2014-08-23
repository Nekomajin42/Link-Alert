// change subpages
var subpages = document.querySelectorAll(".subpage");
var menuitems = document.querySelectorAll("#sidebar-menu li");	
function toggleMenu(id)
{
	for (var i=0; i<menuitems.length; i++)
	{
		if (menuitems[i].id == id)
		{
			menuitems[i].setAttribute("class", "selected");
			subpages[i].setAttribute("class", "subpage visible");
		}
		else
		{
			menuitems[i].removeAttribute("class");
			subpages[i].setAttribute("class", "subpage");
		}
	}
}

// load local language
function selectLocale()
{
	var elements = document.querySelectorAll("[data-i18n]");
	for (var i = 0; i < elements.length; i++)
	{
		if (elements[i].tagName == "TEXTAREA")
		{
			elements[i].placeholder = chrome.i18n.getMessage(elements[i].dataset.i18n);
		}
		else if (elements[i].tagName == "INPUT")
		{
			elements[i].value = chrome.i18n.getMessage(elements[i].dataset.i18n);
		}
		else
		{
			elements[i].innerHTML = chrome.i18n.getMessage(elements[i].dataset.i18n) + elements[i].innerHTML;
		}
	}
}

// open settings on extension install/update
function updatePopup()
{
	if (location.search)
	{
		var reason = location.search.slice(location.search.indexOf("=")+1);
		if (reason == "install")
		{
			window.alert(chrome.i18n.getMessage("settings_popup_install"));
		}
		else if (reason == "update")
		{
			window.alert(chrome.i18n.getMessage("settings_popup_update"));
		}
	}
}