document.addEventListener('DOMContentLoaded', function(){

	// Page Nav Highlighting
	// Cache selectors
	let topMenu = $('.top-nav ul');

	if ($(window).width() < 768) {
		topMenu = $('.mobile-top-nav ul')
	}

	let lastId,
		topMenuHeight = 0,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function() {
			var item = $($(this).attr("href"));
			if (item.length) {
				return item;
			}
		});

	// Bind to scroll
	$(window).scroll(function() {
		let fromTop = $(this).scrollTop() + topMenuHeight + 300;

		let cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop){
				if ($(this).offset().top + $(this).outerHeight() > $(window).scrollTop() + $(window).height()) {
					return this;
				}
			}
		});

		cur = cur[cur.length - 1];
		let id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			menuItems.removeClass("active");
			menuItems.filter("[href='#" + id + "']").addClass("active");
		}
	});


	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	$('[data-fancybox]').fancybox();

	$('.gallery-card').click(function(e){
		if ( !$(e.target).is('a') ) {
			$(this).find('.card-image').trigger('click');
		}
	});

	// Fields
	$('.input-wrapper input').on('change keyup', function(e){
		if ($(this).val() !== '') {
			$(this).addClass('not-empty');
		} else{
			$(this).removeClass('not-empty');
		}
	});

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M10 2L8 0 0 8.2l8 8.2 2-2-6.2-6.2L10 2z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M0 2l2-2 8 8.2-8 8.2-2-2 6.2-6.2L0 2z"/></svg></button>'
	}

	// $('.gallery-slider').slick({
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	arrows: true,
	// 	dots: true,
	// 	infinite: true,
	// 	speed: 600,
	// 	...arrowsButtons,
	// 	responsive: [
	// 		{
	// 			breakpoint: 576,
	// 			settings: {
	// 				arrows: false
	// 			}
	// 		}
	// 	]
	// });

	// Product photos
	$('.photos-component').each(function(i, cmp){
		$(cmp).find('.previews-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			vertical: true,
			arrows: true,
			dots: false,
			infinite: true,
			speed: 600,
			...arrowsButtons,
			asNavFor: $(cmp).find('.fullsize-images-slider'),
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 5,
						vertical: false
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 3,
						vertical: false
					}
				}
			]
		});

		$(cmp).find('.fullsize-images-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: true,
			speed: 600,
			asNavFor: $(cmp).find('.previews-slider'),
			// fade: true
			// responsive: [
			// 	{
			// 		breakpoint: 576,
			// 		settings: {
			// 			arrows: false
			// 		}
			// 	}
			// ]
		});
	});

	// Advantages
	if ($(window).width() <= 991) {
		$('.advantages-grid').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			infinite: true,
			speed: 600,
			// ...arrowsButtons,
			swipeToSlide: true,
			responsive: [
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2
					}
				}
			]
		});

		equalSlideHeight('.advantages-grid');
	}

	// Magnifier
	$('.magnifier-component').each(function(i, cmp){
		let glass = $(cmp).find('.cmp-glass');
		let cmpWidth = $(cmp).width();
		let cmpHeight = $(cmp).height();

		glass.css('background-size', cmpWidth * 1.5 +'px auto');

		// $(cmp).mousemove(function(e){
			// let left = e.offsetX / cmpWidth * 100 + '%';
			// let top = e.offsetY / cmpHeight * 100 + '%';

			// glass.css({
			// 	left: left,
			// 	top: top,
			// 	backgroundPosition: left + ' ' + top
			// });
		// });

		$('.additional-section .legend-list .item').on('click focus', function(e){
			let left = $(this).data('x') + '%';
			let top = $(this).data('y') + '%';

			glass.css({
				'background-position': left + ' ' + top,
				left: left,
				top: top,
			}, 300);
		});

		$('.additional-section .legend-list .item').eq(0).trigger('click');

		// Legend
		if ($(window).width() <= 991) {
			$('.legend-list').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
				infinite: true,
				speed: 600
			});

			equalSlideHeight('.legend-list');

			$('.legend-list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				let currentItem = slick.$slides[nextSlide];

				let left = $(currentItem).data('x') + '%';
				let top = $(currentItem).data('y') + '%';

				glass.css({
					'background-position': left + ' ' + top,
					left: left,
					top: top,
				}, 300);
			});
		}
	});

	// How we work
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	$('.how-we-work-component').each(function(i, cmp){
		let currentStep = 1;

		$(cmp).find('.shelves .item').each(function(i, el){
			$(el).css('transition-delay', (getRandomInt(5) + 2) / 10 + 's');
		});

		function showProducts(step){
			$(cmp).find('.shelves .item').each(function(i, el){
				if (+$(el).data('show') <= step) {
					$(el).addClass('visible');
				} else{
					$(el).removeClass('visible');
				}
			});
		}

		$(cmp).find('.steps-list .item').focus(function(e){
			$(this).trigger('click');
		});

		$(cmp).find('.steps-list .item').click(function(e){
			e.preventDefault();

			$(this).addClass('current').siblings().removeClass('current');

			currentStep = $(this).data('step');

			showProducts(currentStep);
		});

		$(cmp).find('.steps-list .item').eq(0).trigger('click');


		if ($(window).width() <= 575) {
			$('.steps-list').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
				infinite: true,
				speed: 600
			});

			equalSlideHeight('.steps-list');

			$('.steps-list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				currentStep = nextSlide + 1;
				showProducts(currentStep);
			});
		}
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = 63;

		if ($(window).width() < 992) {
			offset = 47;
		}

		if ($(window).width() < 768) {
			offset = 60;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - offset
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
		$('.header').toggleClass('nav-opened');
	});

	if ($(window).width() < 768) {
		$('.mobile-top-nav a').click(function(e){
			$('.menu-opener').trigger('click');
		});
	}

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 90
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	// Tabs
	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		$('[data-tab="'+tabId+'"]').addClass('current').parent().siblings().find('[data-tab]').removeClass('current');
	}

	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $(this).data('tab');

		goToTab(dest, $(this));

		// $(dest).find('.slick-slider').slick('setPosition');
	});

	$(".filter-nav, .tabs-nav, .cmp-tabs-nav").each(function(i, el){
		$(el).find('[data-tab]').eq(0).click();
	});

	$('.tabs-select').on('change', function(){
		goToTab($(this).val());
	});


	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');
		$(this).find('.block-overlay').fadeOut(300);

		let videoId = $(this).find('.play-btn').data('video-id');

		if (!videoId) {
			videoId = $(this).data('video-id');
		}

		if (videoId == undefined) {
			$(this).find('video')[0].play();
		} else{
			let videoType = $(this).data('video-type') ? $(this).data('video-type').toLowerCase() : 'youtube';

			if (videoType == 'youtube') {
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"></div>');
				createVideo(videoId, videoId);
			} else if(videoType == 'vimeo'){
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
			}
		}
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('youtube').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 0,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
						setTimeout(function(){
							e.target.playVideo();
						}, 200);
					// }
				}
			}
		});
	}
});

function getScrollWidth(){
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;
function showModal(modal){
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').addClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', getScrollWidth());
}

function hideModal(modal){
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').removeClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', 0);
}