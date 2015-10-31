(function($) {

  var $window = $(window);
  var $document = $(document);

  window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback) {
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  function Animate(element, settings) {
    this.$element = $(element);
    this.isVisible = false;
    this.settings = $.extend({}, settings, this.$element.data());

    this.init();
  };

  Animate.prototype.init = function() {
    this.setCssProperties();
    this.bindAnimationFrame();
    this.refresh();
  };

  Animate.prototype.setCssProperties = function() {
    this.$element.css('visibility', 'hidden').addClass('animated');
    this.setCssVendorProperty('animationDelay', this.settings.delay + 'ms');
    this.setCssVendorProperty('animationDuration', this.settings.duration + 'ms');
    this.setCssVendorProperty('animationIterationCount', this.settings.repeat);
  }

  Animate.prototype.setCssVendorProperty = function(key, value) {
    var keys = [key], prefixes = ['moz', 'webkit'];

    // set default property
    this.$element[0].style[key] = value;

    // set vendor-prefixed properties
    key = key.charAt(0).toUpperCase() + key.slice(1);
    for (vendor in prefixes) {
      this.$element[0].style[prefixes[vendor] + key] = value;
    }
  }

  Animate.prototype.bindAnimationFrame = function() {
    var self = this;
    var lastPosition = -1;

    (function animLoop() {
      if (lastPosition != window.pageYOffset) {
        lastPosition = window.pageYOffset;
        self.refresh();
      }
      requestAnimFrame(animLoop);
    })();
  }

  Animate.prototype.refresh = function() {
    var $element = this.$element;

    if (this.isInViewport() && !this.isVisible) {
      this.isVisible = true;
      $element
        .css('visibility', 'visible')
        .addClass(this.settings.animation);
    }

    if (!this.isInViewport() && this.isVisible) {
      this.isVisible = false;
      $element
        .css('visibility', 'hidden')
        .removeClass(this.settings.animation);
    }
  };

  Animate.prototype.isInViewport = function() {
    var rect = this.$element[0].getBoundingClientRect(),
        offset = this.isVisible ? 0 : this.settings.offset;
    return (
      rect.bottom >= (0 + offset) &&
      rect.top <= ($window.height() - offset)
    );
  };

  $.fn.tadaaam = function(options) {
    var settings = $.extend({}, $.fn.tadaaam.defaults, options);
    this.each(function() {
      // avoid multiple time initialization on the same element
      if (!$.data(this, '_tadaaam')) {
        $.data(this, '_tadaaam', new Animate(this, settings));
      }
    });
    return this;
  };

  $.fn.tadaaam.defaults = {
    animation: 'fadeIn',
    duration: 1000,
    throttle: 100,
    repeat: 1,
    offset: 0,
    delay: 0
  };

  $('[data-animation]').tadaaam();

}( jQuery ));