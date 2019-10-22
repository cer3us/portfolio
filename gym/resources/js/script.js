$(document).ready(function(){
	// Sticky nav, using waypoint.js
	$('.js--section-features').waypoint(function(direction) {
		if(direction == "down") {
			$('nav').addClass('sticky');
		} else {
			$('nav').removeClass('sticky');
		}
	}, {
		offset: '60px' /*sticky appeares 60px before js--section-features*/
	});


// Buttons direct to sections thorugh scrolling
$('.js--scroll-to-plans').click(function() {
	$('html, body').animate({scrollTop: $('.js--section-plans').offset().top}, 1000);
});
$('.js--scroll-to-features').click(function() {
	$('html, body').animate({scrollTop: $('.js--section-features').offset().top}, 1000);
});

// --------------------NAVIGATION scROLL---------
	 $(function() {
		// Select all links with hashes
		$('a[href*="#"]')
		  // Remove links that don't actually link to anything
		  .not('[href="#"]')
		  .not('[href="#0"]')
		  .not('[href="#image1"]')
		  .not('[href="#image2"]')
		  .not('[href="#image3"]')
		  .not('[href="#image4"]')
		  .not('[href="#image5"]')
		  .not('[href="#image6"]')
		  .not('[href="#image7"]')
		  .not('[href="#image8"]')
		  .not('[href="#void"]')
		  .click(function(event) {
		    // On-page links
		    if (
		      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		      && 
		      location.hostname == this.hostname
		    ) {
		      // Figure out element to scroll to
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		      // Does a scroll target exist?
		      if (target.length) {
		        // Only prevent default if animation is actually gonna happen
		        event.preventDefault();
		        $('html, body').animate({
		          scrollTop: target.offset().top
		        }, 1000, function() {
		          // Callback after animation
		          // Must change focus!
		          var $target = $(target);
		          $target.focus();
		          if ($target.is(":focus")) { // Checking if the target was focused
		            return false;
		          } else {
		            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
		            $target.focus(); // Set focus again
		          };
		        });
		      }
		    }
		  });
	}); 
// Scrolling animations=============================
	$('.js--wp-1').waypoint(function(direction) {
		$('.js--wp-1').addClass('animated fadeIn');
	}, {
		offset: '50%'
	});
	$('.js--wp-3').waypoint(function(direction) {
		$('.js--wp-3').addClass('animated fadeInUp'); 
	}, {
		offset: '50%'
	});
	$('.js--wp-4').waypoint(function(direction) {
		$('.js--wp-4').addClass('animated fadeInUp'); 
	}, {
		offset: '50%'
	});
	$('.js--wp-5').waypoint(function(direction) {
		$('.js--wp-5').addClass('animated pulse delay-1s'); 
	}, {
		offset: '50%'
	});

// MOBILE-NAV=============================================
	$('.js--nav-icon').click(function() {
		var nav = $('.js--main-nav');
		var icon = $('.js--nav-icon i');
		nav.slideToggle(200); /*sliding menu*/

		if (icon.hasClass('fa-ellipsis-h')) {
			icon.addClass('fa-times');
			icon.removeClass('fa-ellipsis-h');
		} else {
			icon.addClass('fa-ellipsis-h');
			icon.removeClass('fa-times');
		}

	});
})