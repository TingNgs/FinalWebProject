$(function() {
    //$("#footer").load("footer.html");
	$('header').load('header.html');
	
});
$(document).ready(function(){
	$(document).on("click", "#nav-icon", function() {
		$("#nav-icon").toggleClass('open');
	});
});
