var z = document.createElement("script"); z.type = "text/javascript"; z.async = true; z.src = "http://localhost/Public/js/jquery-1.4.2.min.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(z, s);
(function(){
 var ojb = {};
$('img').mouseover(function(){
	ojb.alt = $(this).attr('alt');
	ojb.title = $(this).attr('title');
	$(this).css('border','1px solid red').attr('alt','采集到Ho21').attr('title','采集到Ho21');
}).mouseout(function(){
	$(this).css('border','none').attr('alt',ojb.alt).attr('title',ojb.title);
}).click(function(){
window.open('http://localhost:90/fetchurl/list.php?htmldata=<S>'+$(this).attr('src')+'<E>',"_blank");
 return false;
})


}(document))