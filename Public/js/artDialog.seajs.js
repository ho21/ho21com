
define(function (require) 
{
var $ = require('jquery');
//var dialog = require('../demos/artDialog/src/dialog');
var dialog = require('../demos/artDialog/src/dialog-plus');
window.dialog = dialog;
window.$ = window.jQuery = $;
window.console = window.console || { log:$.noop };
$(function () { console.log('Loaded with dialog boxes'); })
});
/*
//2.2.
define(function(require,exports,moudles){

    require('jquery');
	require('../demos/artDialog/jquery.artDialog.js?skin=simple' );
	
	//require('../demos/artDialog/artDialog.config.js' );
	//require('../demos/artDialog/plugins/iframeTools.js' );

	

 
})
*/
/*
//2.1.1.0
define(function(require,exports,moudles){

	require.async('jquery', function(jquery) {
	var a= require('/public/demos/artDialog/jquery.artDialog.js?skin=simple' );
	 $('img').css('border','1px solid red'); 
  });
	
	

 
})*/
/*
//2.1.1
define(function(require,exports,moudles){
    require('jquery');
	require('../demos/artDialog/jquery.artDialog.js?skin=simple' );
		$.dialog('hello world!');
		
	
	
	 $('img').css('border','1px solid red'); 

 
})
*/
/*
//2.1
define(function(require,exports,moudles){
    var jquery = require('jquery');
	(function(){
	  $('img').css('border','1px solid red'); 
	})(jquery)
 
})
*/
/*
//1.0
define(function(require, exports, module) 
{
     var $ = require('jquery');

    r$(document).ready(function(){      
     $('img').css('border','1px solid red'); 

    })

});
*/
/*
define(function(require, exports, module) 
{
	window.$ = window.jQuery = require('jquery');

    
	//require.async('jquery',function($){ $('body,img').css('border','1px solid red'); });
	$('img').css('border','1px solid red'); 

	//var ad = require('../demos/artDialog/jquery.artDialog.js?skin=simple' );
	$.dialog({
		title: 'hello world!'
	});

});
*/