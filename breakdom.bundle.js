!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){var i=n(1);"string"==typeof i&&(i=[[e.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,r);i.locals&&(e.exports=i.locals)},function(e,t,n){},function(e,t,n){var i,r,o={},a=(i=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=i.apply(this,arguments)),r}),s=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var i=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(e){i=null}t[e]=i}return t[e]}}(),l=null,c=0,h=[],d=n(3);function u(e,t){for(var n=0;n<e.length;n++){var i=e[n],r=o[i.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](i.parts[a]);for(;a<i.parts.length;a++)r.parts.push(b(i.parts[a],t))}else{var s=[];for(a=0;a<i.parts.length;a++)s.push(b(i.parts[a],t));o[i.id]={id:i.id,refs:1,parts:s}}}}function p(e,t){for(var n=[],i={},r=0;r<e.length;r++){var o=e[r],a=t.base?o[0]+t.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}function f(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=h[h.length-1];if("top"===e.insertAt)i?i.nextSibling?n.insertBefore(t,i.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),h.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=s(e.insertAt.before,n);n.insertBefore(t,r)}}function y(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=h.indexOf(e);t>=0&&h.splice(t,1)}function v(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var i=function(){0;return n.nc}();i&&(e.attrs.nonce=i)}return m(t,e.attrs),f(e,t),t}function m(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function b(e,t){var n,i,r,o;if(t.transform&&e.css){if(!(o="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=o}if(t.singleton){var a=c++;n=l||(l=v(t)),i=x.bind(null,n,a,!1),r=x.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",m(t,e.attrs),f(e,t),t}(t),i=function(e,t,n){var i=n.css,r=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||o)&&(i=d(i));r&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([i],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,t),r=function(){y(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),i=function(e,t){var n=t.css,i=t.media;i&&e.setAttribute("media",i);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){y(n)});return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return u(n,t),function(e){for(var i=[],r=0;r<n.length;r++){var a=n[r];(s=o[a.id]).refs--,i.push(s)}e&&u(p(e,t),t);for(r=0;r<i.length;r++){var s;if(0===(s=i[r]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete o[s.id]}}}};var w,g=(w=[],function(e,t){return w[e]=t,w.filter(Boolean).join("\n")});function x(e,t,n,i){var r=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=g(t,r);else{var o=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,i=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?e:(r=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:i+o.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(e,t,n){"use strict";n.r(t);n(0);function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.velocity={x:n||0,y:i||0},this.rotation=0,this.cachedPosition={x:this.element.position().left,y:this.element.position().top},this.falling=!1}var t,n,r;return t=e,(n=[{key:"step",value:function(){var e=this.position().x+this.velocity.x,t=this.position().y+this.velocity.y;this.element.css({left:e,top:t}),this.velocity.x*=.98,this.velocity.y*=1.02,this.cachedPosition={x:e,y:t}}},{key:"fall",value:function(){this.falling=!0,this.element.removeAttr("checked"),this.velocity.x=4*Math.random()-2,this.velocity.y=2+4*Math.random()}},{key:"position",value:function(){return this.cachedPosition}}])&&i(t.prototype,n),r&&i(t,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.velocity={x:n||0,y:i||0}}var t,n,i;return t=e,(n=[{key:"step",value:function(){this.move(this.element.position().left+this.velocity.x,this.element.position().top+this.velocity.y)}},{key:"move",value:function(e,t){this.element.css({left:e,top:t})}},{key:"position",value:function(){return{x:this.element.position().left,y:this.element.position().top}}}])&&o(t.prototype,n),i&&o(t,i),e}();function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(new(function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"mouseMoveHandler",function(e){t.scrollX=Math.max(Math.min((e.clientX-t.dom.container.offset().left)/t.width,1),0)}),l(this,"keyDownHandler",function(e){switch(e.keyCode){case 37:t.key.leftDown=!0,e.preventDefault();break;case 39:t.key.rightDown=!0,e.preventDefault()}}),l(this,"keyUpHandler",function(e){switch(e.keyCode){case 37:t.key.leftDown=!1,e.preventDefault();break;case 39:t.key.rightDown=!1,e.preventDefault()}}),l(this,"update",function(){t.key.leftDown&&(t.scrollX=Math.max(t.scrollX-.02,t.paddleFactor/2)),t.key.rightDown&&(t.scrollX=Math.min(t.scrollX+.02,1-t.paddleFactor/2));var e=t.player.position();if(e.x<0?t.player.velocity.x=Math.abs(t.player.velocity.x):e.x+t.playerWidth>t.width&&(t.player.velocity.x=-Math.abs(t.player.velocity.x)),e.y<0)t.player.velocity.y=Math.abs(t.player.velocity.y);else if(e.y>t.height-35){if(!(e.y<t.height))return void t.start();var n=Math.max(Math.min(t.scrollX*t.width-t.paddleWidth/2,t.width-t.paddleWidth),0),i=n+t.paddleWidth;e.x+t.playerWidth>=n&&e.x<=i&&(t.player.velocity.x=10*((e.x-n)/(i-n)-.5),t.player.velocity.y=-Math.abs(t.player.velocity.y),t.player.step())}t.player.step();for(var r=t.enemies.length,o=!1,a=0;r--;){var s=t.enemies[r],l=s.position();s.falling?(s.step(),l.y>t.height&&t.enemies.splice(r,1)):e.x+t.playerWidth>l.x&&e.x<l.x+t.enemyWidth&&e.y+t.playerHeight>l.y&&e.y<l.y+t.enemyHeight?(o=!0,s.fall(),e.y<l.y+.5*t.enemyWidth?t.player.velocity.y=-Math.abs(t.player.velocity.y):t.player.velocity.y=Math.abs(t.player.velocity.y),e.x<l.x+.5*t.enemyHeight?t.player.velocity.x=-Math.abs(t.player.velocity.x):t.player.velocity.x=Math.abs(t.player.velocity.x)):a++}if(o&&(t.dom.counter.stop(!0,!0).fadeTo(50,.4).fadeTo(900,.1),t.dom.counter.text(a)),0===t.enemies.length)return alert("Omg omg! You won! Totally deserve a prize, but I don't have one :'("),void t.start();t.dom.paddle.scrollLeft(t.scrollX*t.dom.paddler.width()-2*t.paddleWidth),requestAnimationFrame(t.update)}),this.dom={},this.dom.container=$("#breakdom"),this.dom.counter=$('<div id="counter" />').appendTo(this.dom.container),this.dom.paddle=$('<div id="paddle" />').appendTo(this.dom.container),this.dom.paddler=$('<div id="paddler" />').appendTo(this.dom.paddle),this.dom.enemies=$('<div id="enemies" />').appendTo(this.dom.container),this.dom.player=$('<div id="player" />').appendTo(this.dom.container),this.key={leftDown:!1,rightDown:!1},this.width=this.dom.container.width(),this.height=this.dom.container.height(),this.enemies=[],this.player=null,this.playing=!1,this.playerWidth=14,this.playerHeight=14,this.enemyWidth=15,this.enemyHeight=15,this.enemySpacing=3,this.columns=Math.floor(this.width/(this.enemyWidth+this.enemySpacing)),this.rows=Math.floor(this.height/(this.enemyHeight+this.enemySpacing)*.3),this.paddleFactor=.25,this.paddleWidth=.25*this.width,this.scrollX=0,window.addEventListener("mousemove",this.mouseMoveHandler,!1),window.addEventListener("keydown",this.keyDownHandler,!1),window.addEventListener("keyup",this.keyUpHandler,!1)}var t,n,i;return t=e,(n=[{key:"reset",value:function(){this.dom.enemies.empty(),this.dom.player.empty(),this.enemies=[],this.playing=!1,this.player=null,this.dom.counter.text(""),this.createEnemies(),this.createPaddle(),this.createPlayer(),this.update()}},{key:"createEnemies",value:function(){for(var e=0;e<this.rows;e++)for(var t=0;t<this.columns;t++){var n=Math.random()>.5?"radio":"checkbox",i=$('<input type="'+n+'" checked>').appendTo(this.dom.enemies);i.css({position:"absolute",left:this.enemySpacing+t*(this.enemyWidth+this.enemySpacing),top:this.enemySpacing+e*(this.enemyHeight+this.enemySpacing)}),this.enemies.push(new r(i))}}},{key:"createPaddle",value:function(){this.dom.paddler.width(1/this.paddleFactor*this.width)}},{key:"createPlayer",value:function(){this.player=new a(this.dom.player),this.player.move(.2*this.width+Math.random()*(.6*this.width),this.height-50),$('<input type="radio" checked>').appendTo(this.dom.player)}},{key:"start",value:function(){this.reset(),this.playing=!0,this.player.velocity.y=-5,this.player.velocity.x=Math.random()>.5?-4:4}}])&&s(t.prototype,n),i&&s(t,i),e}())).start()}]);