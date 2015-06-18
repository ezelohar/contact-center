/**
 * Manage table buttons for player events on pause and play
 */
angular.module('ContactCenter').directive('playerManager', function () {
	'use strict';
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			var holder = elem.parents('#main');
			elem.bind('pause', function (event) {
				var currentPlayingID = attrs.player, element = holder.find('#play_' + currentPlayingID);

				if (element.hasClass('play')) {
					holder.find('#play_' + currentPlayingID).toggleClass('play');
				}
			}).bind('play', function (event) {
				var currentPlayingID = attrs.player, element = holder.find('#play_' + currentPlayingID);

				if (!element.hasClass('play')) {
					holder.find('#play_' + currentPlayingID).toggleClass('play');
				}
			});
		}
	};
});