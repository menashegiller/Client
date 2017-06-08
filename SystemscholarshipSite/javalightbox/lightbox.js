$(document).ready(function() {
'use strict';
var btncloseBtn = $(this).find(".closeBtn");
	$(btncloseBtn).click(function() {
	$(".BoxWrapperLightbox").hide();
	$(".popGroup1Content").hide();
	$(".BoxContainer").hide();
	$('#bgDiv').remove();
	$('html').css('overflow-y','auto');
});


var popClose = function onPopClose(){
	$(".BoxWrapperLightbox").hide();
	$(".popGroup1Content").hide();
	$(".BoxContainer").hide();
	$('#bgDiv').remove();
	$('html').css('overflow-y','auto');
};

var popClick = function onPopClick(){
		// show/hide the pop content:
			var popNameVar = $(this).data("pop");
			$('html').css('overflow', 'hidden');
			$(".BoxContainer").show();
			$(".BoxWrapperLightbox").show();
			var bgDiv = document.createElement("DIV");
			bgDiv.setAttribute("id", "bgDiv");
			document.body.appendChild(bgDiv);
			$("#bgDiv").addClass("BoxWrapperLightbox");
			$("#bgDiv").click(popClose);
			$("#"+popNameVar).show();	
			return false;
	};
	$(".popBtn").click(popClick);

});