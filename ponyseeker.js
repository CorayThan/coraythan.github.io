var ponyseeker = ponyseeker || {};

ponyseeker.resizeVideo = ponyseeker.resizeVideo || function() {
	var helperVideo = $('#helper-video');
	var width = helperVideo.width();
	helperVideo.css('height', (width * 5) / 8);
	var helperVideo2 = $('#helper-video-2');
	var width = helperVideo2.width();
	helperVideo2.css('height', (width * 5) / 8);
};

ponyseeker.showPage = ponyseeker.showPage || function(pageSelector) {
	$(".page").hide();
	if (!pageSelector) {
		pageSelector = "#about-ponyseeker";
	}
	var $page = $(pageSelector);

	if ($page.lengh < 1) {
		$page = $("#about-ponyseeker");
		pageSelector = "#about-ponyseeker";
	} else if (pageSelector.substring(0, 8) === "#version") {
		$page = $("#patch-notes");
		pageSelector = "#patch-notes";

	}
	$page.show();

	$(".pony-link").parent().removeClass("selected");
	$('a[href="' + pageSelector + '"]').parent().addClass("selected");
	ponyseeker.resizeVideo();
};

ponyseeker.hideVertMenu = ponyseeker.hideVertMenu || function() {
	$("#vert-menu-x").css("display", "none");
	$("#vert-menu").hide();
	$("#hamburger-icon").show();
};

$(document).ready(function(){

	var currentPage = window.location.hash;
	ponyseeker.showPage(currentPage);

	ponyseeker.resizeVideo();
	setTimeout(ponyseeker.resizeVideo, 300);
	$(window).resize(ponyseeker.resizeVideo);

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