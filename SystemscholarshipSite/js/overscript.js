$(document).ready(function() {	
'use strict';	

	$(".MobileBtn").click(function() {
		$(".FormBoxs").show();
		$(".box").show();
		$(".MobileBtn").hide();
		return false;
	});
	
	$(".box").click(function() {
		if($(window).width() < 767)
		{
			$(".BackBox").show();
			$(".box").hide();
			$(".FormBoxs").hide();
			$(".UserAccountTitle").hide();
			$(".CookieTxt").hide();
		} 
		return false;
	});
	
	$(".box").click(function() {
		if($(window).width() > 767)
		{
			$(".BackBox").show();
			$(".box").hide();
			$(".FormBoxs").hide();
			$(".UserAccountTitle").hide();
			$(".CookieTxt").hide();
		} 
		return false;
	});

	$(".BackBox").click(function() {
			$(".box").show();
			$(".FormBoxs").show();
			$(".UserAccountTitle").show();
			$(".CookieTxt").show();
			$(".BackBox").hide();
		return false;
	});

	$(".EnterSmsCodePhoneBtn").click(function() {
		$(".EnterSmsCode").show();
		$(".EnterSmsMobile").hide();
		return false;
	});

	$(".HidePass").hide();	
	$(".showPass").click(function() {
		$(".HidePass").show();
		$(".showPass").hide();
	});

/*----------------------------------- WorkingProcess Selcted -------------------------*/
	$(".UpLoudFileBtn").click(function() {
		$(".UpLoudFileBtn").addClass("SelctedBtn");
		$(".EmptyIcon").hide();
		$(".ChackIcon").show();
		$(".FileNotUpLoad").hide();
		$(".ProcessBox").show();
		$(".ProcessBox").addClass("WorkingProcess");
		$(".UpLoudFileBtnBox").addClass("UpLoudFileBoxSlected");
		
	});
	
	$(".UpLoudFileBtnMobile").click(function() {
		$(".UpLoudFileBtnMobile").addClass("SelctedBtn");
		$(".EmptyIcon").hide();
		$(".ChackIcon").show();
		$(".FileNotUpLoad").hide();
		$(".ProcessBox").show();
		$(".ProcessBox").addClass("WorkingProcess");
		$(".UpLoudFileBtnBox").addClass("UpLoudFileBoxSlected");
	});
	
});
// end of ready()