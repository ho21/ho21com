define(function (require) 
{
	var $ = require('jquery');
	var $ = require('jquery');
	
	
	var roundabout = require('../demos/roundabout/jquery.roundabout.min.js');
	var shapes = require('../demos/roundabout/jquery.roundabout-shapes.min.js');
	window.$ = window.jQuery = $;
	window.console = window.console || { log:$.noop };
	$(function () { console.log('Loaded with roundabout boxes'); })
});