chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	var options = JSON.parse(window.localStorage.linkAlert1);
	sendResponse(options);
});

chrome.runtime.onInstalled.addListener(function(details)
{
	if (details.reason != "chrome_update")
	{
		chrome.tabs.create({"url" : "options/options.html?reason=" + details.reason});
	}
});