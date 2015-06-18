/**
 * Play audio file. Directive used to communicate with player
 * To change files and stop/play them
 */

angular.module('ContactCenter').directive('play', function () {
		'use strict';
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.bind('click', function (event) {
					var holder = elem.parents('#main');
					var player = holder.find('audio');

					player.css('display', 'block');

					/* id of current call playing */
					var currentPlayingID = player.attr('data-player');

					/* We toggle element class on click */
					elem.toggleClass('play');

					/* Same button case, no new play instancing */
					if (currentPlayingID == attrs.callId) {
						if (player[0].duration > 0 && !player[0].paused) {
							player[0].pause();
						} else {
							player[0].play();
						}
					} else {
						/* if is playing */
						if (player[0].duration > 0 && !player[0].paused) {
							player[0].pause();
							holder.find('#play_' + currentPlayingID).toggleClass('play');
						}

						/* bind data to template for new song */
						scope.$apply(attrs.play);

						player[0].load();
						player[0].play();
					}

				});
			}
		};
	});