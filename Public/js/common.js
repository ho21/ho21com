(function() {
	//在ID添加内容
	this.azHtmlLoad = function(t, e)
	{
		var o;
		return o = document.getElementById(t),
		o.innerHTML = e
	}
	//载入内联CSS
	this.cssLoad = function(t) 
	{
		var e, o;
		return e = document.createElement("style"),
		document.getElementsByTagName("head")[0].appendChild(e),
		window.ActiveXObject ? document.styleSheets[document.styleSheets.length - 1].cssText = t: (o = document.createTextNode(t), e.appendChild(o))
	}
	//载入外联CSS文件
	this.cssLinkLoad = function(t)
	{
		var e;
		return e = document.createElement("link"),
		e.rel = "stylesheet",
		e.href = t,
		document.getElementsByTagName("head")[0].appendChild(e)
	}

	this.azScriptExtensionLoad = function(t)
	{
		var e, o;
		return o = document.createElement("script"),
		o.type = "text/javascript",
		o.src = t,
		e = document.getElementsByTagName("head")[0],
		e.appendChild(o)
	}
	//在ID处添加JS文件
	this.azScriptSRCLoad = function(t, e)
	{
		var o, n;
		return n = document.createElement("script"),
		n.type = "text/javascript",
		n.src = e,
		o = document.getElementById(t),
		o.appendChild(n)
	}
}).call(this);
