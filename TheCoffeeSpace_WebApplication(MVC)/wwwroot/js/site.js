//Processing other events of the website

//Rotate Text Event in Header
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function () {
    var load = document.getElementById("load")

    setTimeout(() => {
        load.style.display = "none";
    }, 2500);

  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
//EnD

//Slider Show
var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
        invert: false,
    },
    // autoHeight: true,
    pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
    }
});

(() => {
	const images_list = [
	{
	"src": "../img/img_slides/1.jpg",
	"alt": "",
	"name": "1.jpg",
	"link": ""
},
	{
	"src": "../img/img_slides/2.jpg", 
	"alt": "",
	"name": "2.jpg",
	"link": ""
},
	{
	"src": "../img/img_slides/3.jpg", 
	"alt": "",
	"name": "3.jpg",
	"link": ""
},
	{
	"src": "../img/img_slides/4.jpg",
	"alt": "",
	"name": "4.jpg",
	"link": ""
},
	{
	"src": "../img/img_slides/5.jpg",
	"alt": "",
	"name": "5.jpg",
	"link": ""
}
	];

	let slider_id = document.querySelector("#show-slider");
	let dots_div = "";
	let images_div = "";
	for (let i = 0; i < images_list.length; i++) {
		let href = (images_list[i].link == "" ? "":' href="'+images_list[i].link+'"');
	images_div += '<a'+href+' class="hcg-slides animated"'+(i === 0 ? ' style="display:flex"':'')+'>'+
	'<img src="'+images_list[i].src+'" alt="'+images_list[i].name+'">'+
		'</a>';
	dots_div += '<a href="#" class="hcg-slide-dot'+(i === 0 ? ' dot-active':'')+'" data-id="'+i+'"></a>';
	}
	slider_id.querySelector(".hcg-slider-body").innerHTML = images_div;
	slider_id.querySelector(".hcg-slide-dot-control").innerHTML = dots_div;

	let slide_index = 0;

	const images = slider_id.querySelectorAll(".hcg-slides");
	const dots = slider_id.querySelectorAll(".hcg-slide-dot");
	const showSlides = () => {
		if (slide_index > images.length-1) {
		slide_index = 0;
		}
	if (slide_index < 0) {
		slide_index = images.length - 1;
		}
	for (let i = 0; i < images.length; i++) {
		images[i].style.display = "none";
	dots[i].classList.remove("dot-active");
	if (i == slide_index) {
		images[i].style.display = "flex";
	dots[i].classList.add("dot-active");
			}
		}
	}

	const dot_click = event => {
		event.preventDefault();
	slide_index = event.target.dataset.id;
	showSlides();
	}

	for (let i = 0; i < dots.length; i++) {
		dots[i].addEventListener("click", dot_click, false);
	}
	setInterval(() => {
		slide_index++;
	showSlides();
	}, 6000);

})();

(function ($) {
    $.skdslider = function (container, options) {
        var config = {
            'animationSpeed': 500,
            'showNextPrev': false,
            'showPlayButton': false,
            'animationType': 'fading',
        };
        if (options) {
            $.extend(config, options);
        }
        $(container).wrap('<div class="skdslider"></div>');
        var element = $(container).closest('div.skdslider');
        element.find('ul').addClass('slides');
        var slides = element.find('ul.slides li');
        var targetSlide = 0;
        config.currentSlide = 0;
        config.running = false;

        if (config.animationType == 'fading') {
            slides.each(function () {
                $(this).css({
                    'position': 'absolute',
                    'left': '0',
                    'top': '0',
                    'bottom': '0',
                    'right': '0'
                });
            });
        }
        if (config.animationType == 'sliding') {
            slides.each(function () {
                $(this).css({
                    'float': 'left',
                    'display': 'block',
                    'position': 'relative'
                });
            });
            $(window).resize(function () {
                var totalWidth = element.outerWidth() * slides.size();
                element.find('ul.slides').css({
                    'position': 'absolute',
                    'left': '0',
                    'width': totalWidth
                });
                slides.css({
                    'width': element.outerWidth(),
                    'height': element.outerHeight()
                });
            });
        }
        $.skdslider.enableTouch(element, slides, config);
        $.skdslider.createNav(element, slides, config);
        slides.eq(targetSlide).show();
    };


    $.skdslider.createNav = function (element, slides, config) {
        /*
        if (config.showNextPrev == true) {
            var nextPrevButton = '<a class="prev"></a>';
            nextPrevButton += '<a class="next"></a>';

            element.append(nextPrevButton);

            element.find('a.prev').click(function () {
                $.skdslider.prev(element, slides, config);
            });

            element.find('a.next').click(function () {
                $.skdslider.next(element, slides, config);
            });
        }*/
    };

    $.skdslider.next = function (element, slides, config) {
        if ((config.currentSlide + 1) == slides.length) targetSlide = 0;
        else targetSlide = (config.currentSlide + 1);

        clearTimeout(config.interval);
        config.currentState = 'play';
        $.skdslider.playSlide(element, slides, config, targetSlide);
        return false;
    }

    $.skdslider.prev = function (element, slides, config) {
        if (config.currentSlide == 0) targetSlide = (slides.length - 1);
        else targetSlide = (config.currentSlide - 1);

        clearTimeout(config.interval);
        config.currentState = 'play';
        config.running = false;
        $.skdslider.playSlide(element, slides, config, targetSlide);
        return true;
    }

    $.skdslider.playSlide = function (element, slides, config, targetSlide) {

        if (config.currentState == 'play' && config.running == false) {
            element.find('.slide-navs li').removeClass('current-slide');
            if (typeof (targetSlide) == 'undefined') {
                targetSlide = (config.currentSlide + 1 == slides.length) ? 0 : config.currentSlide + 1;
            }
            if (config.animationType == 'fading') {
                config.running = true;
                slides.eq(config.currentSlide).fadeOut(config.animationSpeed);
                slides.eq(targetSlide).fadeIn(config.animationSpeed, function () {
                    $.skdslider.removeIEFilter($(this)[0]);
                    config.running = false;
                });
            }
            if (config.animationType == 'sliding') {
                var left = (targetSlide * element.outerWidth()) * (-1);
                config.running = true;
                element.find('ul.slides').animate({
                    left: left
                }, config.animationSpeed, function () {
                    config.running = false;
                });
            }
            element.find('.slide-navs li').eq(targetSlide).addClass('current-slide');
            config.currentSlide = targetSlide;
        }

        if (config.autoSlide == true && config.currentState == 'play') {
            config.interval = setTimeout((function () {
                $.skdslider.playSlide(element, slides, config);
            }), config.delay);
        }
    };

    $.skdslider.enableTouch = function (element, slides, config) {
        element[0].addEventListener('touchstart', onTouchStart, false);
        var startX;
        var startY;
        var dx;
        var dy;

        function onTouchStart(e) {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            element[0].addEventListener('touchmove', onTouchMove, false);
            element[0].addEventListener('touchend', onTouchEnd, false);
        }

        function onTouchMove(e) {
            e.preventDefault();
            var x = e.touches[0].pageX;
            var y = e.touches[0].pageY;
            dx = startX - x;
            dy = startY - y;
        }

        function onTouchEnd(e) {
            element[0].removeEventListener('touchmove', onTouchMove, false);
            if (dx > 0) {
                $.skdslider.next(element, slides, config);
            } else {
                $.skdslider.prev(element, slides, config);
            }
            element[0].removeEventListener('touchend', onTouchEnd, false);
        }
    }


    $.skdslider.removeIEFilter = function (elm) {
        if (elm.style.removeAttribute) {
            elm.style.removeAttribute('filter');
        }
    }

    $.fn.skdslider = function (options) {
        return this.each(function () {
            (new $.skdslider(this, options));
        });
    };

})(jQuery);

jQuery(document).ready(function () {
    jQuery('#show-slider').skdslider({
        'showNextPrev': true,
        'animationType': 'fading'
    });
});

//EnD
