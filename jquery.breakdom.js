/*
 *                    )  , ,         )      ,            
 *  ____   _  _/__/_ /       _      /_        __   _  __ 
 *  / / (_(_(_(__(__/ )_(_/_/_)_   /(__(_(_(__/_)_(/_/ (_
 *                       /                   /           
 *                    (_/                  _/            
 *  
 *  jQuery BreakDOM v1.01
 *  http://www.matthijskuiper.nl
 *  
 *  Modified and extended Hakim El Hattab his script
 *  http://hakim.se/experiments/html5/breakdom/
 *  
 *  Copyright (c) 2011 Matthijs Kuiper
 *  Dual licensed under the MIT or GPL Version 2 licenses.
 *
*/

;(function($)
{
	$.fn.breakdom = function(options)
	{
		return this.each(function()
		{
			function init()
			{
				q();
				s();
			}
			
			function q()
			{
				b.enemies.empty();
				b.player.empty();
				i = [];
				c = null;
				var f;
				for (var a = 0; a < w; a++) for (var d = 0; d < x; d++)
				{
					f = $('<input type="' + (settings.blockType == 'both' ? (Math.random() > 0.5 ? "radio" : "checkbox") : settings.blockType) + '" checked>').appendTo(b.enemies);
					f.css(
					{
						position: "absolute",
						left: j + d * (m + j),
						top: j + a * (n + j)
					});
					i.push(new y(f));
				}
				a = e;
				navigator.appVersion.match(/Mac/gi) ? a += 28 : navigator.appVersion.match(/Win/gi) && (a += 40, b.paddle.css("left", -20));
				b.paddle.width(a);
				b.paddler.width(1 / r * e);
				c = new z(b.player);
				c.move(e * 0.2 + Math.random() * e * 0.6, l - 50);
				
				$('<input type="radio" checked>').appendTo(b.player);
				
				if (settings.controller == 'mouse' || settings.controller == 'both') b.mouselistener.addEventListener("mousemove", mouseMove, !1);
				if (settings.controller == 'keyboard' || settings.controller == 'both')
				{
					window.addEventListener("keydown", keyDown, !1);
					window.addEventListener("keyup", keyUp, !1);
				}
				u();
			}
		
			function mouseMove(a)
			{
				g = Math.max(Math.min((a.clientX - b.container.offset().left) / e, 1), 0);
			}
		
			function keyDown(a)
			{
				switch (a.keyCode)
				{
					case 37:
						k.leftDown = !0;
						a.preventDefault();
						break;
					case 39:
						k.rightDown = !0;
						a.preventDefault();
						break;
				};
			}
		
			function keyUp(a)
			{
				switch (a.keyCode)
				{
					case 37:
						k.leftDown = !1;
						a.preventDefault();
						break;
					case 39:
						k.rightDown = !1;
						a.preventDefault();
						break;
				};
			}
		
			function s()
			{
				c.velocity.y = -5;
				c.velocity.x = Math.random() > 0.5 ? -4 : 4;
			}
		
			function u()
			{
				k.leftDown && (g = Math.max(g - 0.02, r / 2));
				k.rightDown && (g = Math.min(g + 0.02, 1 - r / 2));
				var a = c.position();
				if (a.x < 0) c.velocity.x = Math.abs(c.velocity.x);
				else if (a.x + t > e) c.velocity.x = -Math.abs(c.velocity.x);
				if (a.y < 0) c.velocity.y = Math.abs(c.velocity.y);
				else if (a.y > l - 35) if (a.y < l)
				{
					var d = Math.max(Math.min(g * e - o / 2, e - o), 0),
						f = d + o;
					if (a.x + t >= d && a.x <= f) settings.onPaddle.call(this), c.velocity.x = 10 * ((a.x - d) / (f - d) - 0.5), c.velocity.y = -Math.abs(c.velocity.y), c.step();
				}
				else
				{
					settings.onLose.call(this);
					init();
					return;
				}
				c.step();
				d = i.length;
				f = !1;
				for (var v = 0; d--;)
				{
					var p = i[d],
						h = p.position();
					p.falling ? (p.step(), h.y > l && i.splice(d, 1)) : a.x + t > h.x && a.x < h.x + m && a.y + D > h.y && a.y < h.y + n ? (f = !0, p.fall(), c.velocity.y = a.y < h.y + m * 0.5 ? -Math.abs(c.velocity.y) : Math.abs(c.velocity.y), c.velocity.x = a.x < h.x + n * 0.5 ? -Math.abs(c.velocity.x) : Math.abs(c.velocity.x)) : v++;
				}
				f && settings.onHit.call(this);
				i.length === 0 ? (settings.onWin.call(this), init()) : (b.paddle.scrollLeft(g * b.paddler.width() - o * 2), setTimeout(u, 16));
			}
		
			function y(a, b, c)
			{
				this.element = a;
				this.velocity = {
					x: b || 0,
					y: c || 0
				};
				this.rotation = 0;
				this.cachedPosition = {
					x: this.element.position().left,
					y: this.element.position().top
				};
				this.falling = !1;
				this.step = function ()
				{
					var a = this.position().x + this.velocity.x,
						b = this.position().y + this.velocity.y;
					this.element.css(
					{
						left: a,
						top: b
					});
					this.velocity.x *= 0.98;
					this.velocity.y *= 1.02;
					this.cachedPosition = {
						x: a,
						y: b
					}
				};
				this.fall = function ()
				{
					this.falling = !0;
					this.element.removeAttr("checked");
					this.velocity.x = -2 + Math.random() * 4;
					this.velocity.y = 2 + Math.random() * 4;
				};
				this.position = function ()
				{
					return this.cachedPosition;
				};
			}
		
			function z(a, b, c)
			{
				this.element = a;
				this.velocity = {
					x: b || 0,
					y: c || 0
				};
				this.step = function ()
				{
					this.move(this.element.position().left + this.velocity.x, this.element.position().top + this.velocity.y);
				};
				this.move = function (a, b)
				{
					this.element.css(
					{
						left: a,
						top: b
					});
				};
				this.position = function ()
				{
					return {
						x: this.element.position().left,
						y: this.element.position().top
					}
				};
			}
			
			var settings = $.extend({}, $.fn.breakdom.defaults, options),
				b = {};
			
			b.container = $(this).addClass('breakdom');
			b.paddle = $('<div id="paddle" />').appendTo(b.container);
			b.paddler = $('<div id="paddler" />').appendTo(b.paddle);
			b.enemies = $('<div id="enemies" />').appendTo(b.container);
			b.player = $('<div id="player" />').appendTo(b.container);
			b.mouselistener = $(settings.mouseListener)[0];
			
			var k = {
					leftDown: !1,
					rightDown: !1
				},
				e = b.container.width(),
				l = b.container.height(),
				i = [],
				c = null,
				t = 14,
				D = 14,
				m = 15,
				n = 15,
				j = 3,
				x = Math.floor(e / (m + j)),
				w = Math.floor(l / (n + j) * .3),
				r = (settings.paddleWidth < 1) ? settings.paddleWidth : settings.paddleWidth / e,
				o = r * e,
				g = 0;
			
			// Initialize
			init();
		});
	};
	
	// Default options
	$.fn.breakdom.defaults =
	{
		paddleWidth:	.25,			// If smaller then 1 it uses the percentage of the container width, else it uses a fixed width
		blockType:		'checkbox',		// Options: checkbox, radio, both
		controller:		'both',			// Options: mouse, keyboard, both
		mouseListener:	window,			// Selector used for the mouse event listener
		onPaddle: 		function() {},	// On bounce callback
		onHit: 			function() {},	// On hit callback
		onWin: 			function() {},	// On win callback
		onLose: 		function() {}	// On lose callback
	};
	
})(jQuery);
