var ponyseeker = ponyseeker || {};

ponyseeker.resizeVideo = ponyseeker.resizeVideo || function() {
	var helperVideo = $('#helper-video');
	var width = helperVideo.width();
	helperVideo.css('height', (width * 3) / 4);
};

ponyseeker.showPage = ponyseeker.showPage || function(pageSelector) {
	$(".page").hide();
	$(pageSelector).show();
	$(".pony-link").parent().removeClass("selected");
	$('a[href="' + pageSelector + '"]').parent().addClass("selected");
	if (pageSelector === "#how-to-play") {
		ponyseeker.resizeVideo();
	}
};

$(document).ready(function(){

	var currentPage = window.location.hash;
	if (!currentPage) {
		currentPage = "#how-to-play";
	}
	ponyseeker.showPage(currentPage);

	ponyseeker.resizeVideo();
	setTimeout(ponyseeker.resizeVideo, 300);
	$(window).resize(ponyseeker.resizeVideo);

	$(".pony-link").click(function() {
		var pageHref = $(this).attr("href");
		ponyseeker.showPage(pageHref);
	});
});