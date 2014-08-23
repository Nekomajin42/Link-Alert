var firstrun = {};

// protocols
firstrun.protocols = 
[
	{name: "insecure", pattern: ["http:"], icon: "insecure", value: false},
	{name: "secure", pattern: ["https:"], icon: "secure", value: true},
	{name: "email", pattern: ["mailto:", "pop:", "imap:"], icon: "email", value: true},
	{name: "opera", pattern: ["opera:"], icon: "opera", value: true},
	{name: "internal", pattern: ["about:", "chrome:"], icon: "about", value: true},
	{name: "feed", pattern: ["feed:"], icon: "rss", value: true},
	{name: "ftp", pattern: ["ftp:"], icon: "ftp", value: true},
	{name: "coin", pattern: ["bitcoin:"], icon: "bitcoin", value: true},
	{name: "magnet", pattern: ["magnet:"], icon: "magnet", value: true},
	{name: "geolocation", pattern: ["geo:"], icon: "geolocation", value: true},
	{name: "js", pattern: ["javascript:"], icon: "js", value: true},
	{name: "voip", pattern: ["callto:", "skype:"], icon: "voip", value: true},
	{name: "irc", pattern: ["irc:", "irc6", "ircs"], icon: "irc", value: true},
	{name: "file", pattern: ["file:"], icon: "file", value: true},
	{name: "viewSource", pattern: ["view-source:"], icon: "viewsource", value: true}
];

// common file types
firstrun.filetypes = 
[
	{name: "text", pattern: [".txt", ".readme", ".nfo", ".srt", ".ssa", ".ass"], icon: "text", value: true},
	{name: "document", pattern: [".doc", ".docx", ".rtf", ".odt", ".abw", ".tex", ".ltx"], icon: "document", value: true},
	{name: "spreadsheet", pattern: [".xls", ".xlsx", ".ods", ".gnumeric"], icon: "spreadsheet", value: true},
	{name: "presentation", pattern: [".ppt", ".pptx", ".odp"], icon: "presentation", value: true},
	{name: "database", pattern: [".mdb", ".accdb", ".odb"], icon: "database", value: true},
	{name: "ebook", pattern: [".pdf", ".epub", ".azw", ".mobi"], icon: "pdf", value: true},
	{name: "image", pattern: [".jpg", ".jpeg", ".png", ".bmp", ".gif", ".ico", ".svg", ".webp", ".xcf", ".psd"], icon: "image", value: true},
	{name: "video", pattern: [".mpg", ".mpeg", ".mp4", ".avi", ".mov", ".wmv", ".webm", ".3gp", ".vob"], icon: "video", value: true},
	{name: "audio", pattern: [".mp3", ".wav", ".wma", ".ogg"], icon: "audio", value: true},
	{name: "flash", pattern: [".swf", ".flv"], icon: "flash", value: true},
	{name: "archive", pattern: [".zip", ".rar", ".cbr", ".cbz", ".tar", ".7z", ".tgz", ".tz", ".gz", ".xz", ".lz", ".bz2", ".gzip", ".cab", ".pkg", ".dmg", ".bin", ".iso"], icon: "archive", value: true},
	{name: "data", pattern: [".xml", ".json", ".dat", ".csv", ".sqlite", ".ini", ".cue"], icon: "data", value: true},
	{name: "executable", pattern: [".exe", ".msi", ".app", ".bat", ".sh", ".jar", ".cmd", ".apk", ".vb"], icon: "executable", value: true},
	{name: "extension", pattern: [".nex", ".oex", ".crx", ".xpi"], icon: "extension", value: true},
	{name: "source", pattern: [".js", ".css", ".sql", ".c", ".h", ".cpp", ".hpp", ".cs", ".java", ".class", ".py", ".pl", ".rb"], icon: "source", value: true},
	{name: "font", pattern: [".ttf", ".otf", ".woff"], icon: "font", value: true},
	{name: "torrent", pattern: [".torrent"], icon: "torrent", value: true}
];

// query and hash
firstrun.url = 
[
	{name: "hash", pattern: "hash", icon: "bookmark", value: true},
	{name: "query", pattern: "search", icon: "search", value: false}
];

// link attributes
firstrun.attributes = 
[
	{name: "newTab", pattern: ["target"], icon: "new_tab", value: true},
	{name: "onClick", pattern: ["onclick", "onmousedown", "onmouseup"], icon: "onclick", value: true},
	{name: "onContextMenu", pattern: ["oncontextmenu"], icon: "oncontextmenu", value: true}
];

// other preferences
firstrun.preferences = 
[
	{name: "showBox", icon: "showbox", value: true},
	{name: "smartPosition", icon: "smartposition", value: true},
	{name: "darkIcons", icon: "darkicons", value: false},
	{name: "noTitle", icon: "notitle", value: false},
	{name: "keepZoom", icon: "noresize", value: true},
	{name: "blacklistOn", icon: "blacklist", value: true}
];

// blacklist
firstrun.blacklist = [];