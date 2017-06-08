$(document).ready(function() {
'use strict';
$(function() {
	$("#accordion").accordion({
	  collapsible: true,
	  active: 0,
	  autoHeight: false,
	  heightStyle: "content",
	  animate: 800,
	  header: '.accordionHeader'
	});

	$('.accordionHeader').each(function() {	
    $(this).after($(this).find('.accordionContent'));
});
});

$('.accordionHeader').click(function(){
	$(".accordionHeader").removeClass("accordionHeaderOne");	
	$(".downIcon").removeClass("upIcon");
	if(false === $(this).next().is(':visible')) {
		$(this).addClass("accordionHeaderOne");
		$(this).find(".downIcon").addClass("upIcon");
    }	
			
	return false;

});
	
});

 