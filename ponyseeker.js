var ponyseeker = ponyseeker || {};

ponyseeker.resizeVideo = ponyseeker.resizeVideo || function() {
	var helperVideo = $('#helper-video');
	var width = helperVideo.width();
	helperVideo.css('height', (width * 3) / 4);
};

ponyseeker.showPage = ponyseeker.showPage || function(pageSelector) {
	$(".page").hide();
	if (!pageSelector) {
		pageSelector = "#how-to-play";
	}
	var $page = $(pageSelector);

	if ($page.lengh < 1) {
		$page = $("#how-to-play");
		pageSelector = "#how-to-play";
	} else if (pageSelector.substring(0, 8) === "#version") {
		$page = $("#patch-notes");
		pageSelector = "#patch-notes";

	}
	$page.show();

	$(".pony-link").parent().removeClass("selected");
	$('a[href="' + pageSelector + '"]').parent().addClass("selected");
	if (pageSelector === "#how-to-play") {
		ponyseeker.resizeVideo();
	}
};

ponyseeker.hideVertMenu = ponyseeker.hideVertMenu || function() {
	$("#vert-menu-x").css("display", "none");
	$("#vert-menu").hide();
	$("#hamburger-icon").show();
};

ponyseeker.onScroll = ponyseeker.onScroll || function() {
	var divFromTop = $("#empty-distance-check").offset().top - $(window).scrollTop();
	if (divFromTop < 60) {
		$("#sticky-menu").css({
			"position":"fixed",
			"left":"0px",
			"top":"20px"
		});
	} else {
		$("#sticky-menu").css({
			"position":"relative",
			"left":"-20px",
			"top":"0px"
		});
	}
};

$(document).ready(function(){

	var currentPage = window.location.hash;
	ponyseeker.showPage(currentPage);

	ponyseeker.resizeVideo();
	ponyseeker.onScroll();
	setTimeout(ponyseeker.resizeVideo, 300);
	$(window).resize(ponyseeker.resizeVideo);
	$(window).scroll(ponyseeker.onScroll);

	$(".pony-link").on('click', function(e) {
		var pageHref = $(this).attr("href");
		ponyseeker.showPage(pageHref);
		e.preventDefault();
		window.location.hash = this.hash;
		ponyseeker.hideVertMenu();
		$("html, body").scrollTop(0);
	});

	$("#hamburger-icon").on('click', function() {
		$(this).hide();
		$("#vert-menu").show();
		$("#vert-menu-x").css("display", "inline");
	});
	$("#vert-menu-x").on('click', function() {
		ponyseeker.hideVertMenu();
	});
});