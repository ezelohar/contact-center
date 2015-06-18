angular.module('ContactCenter').filter('embedUrl', function ($sce) {
	return function(audioFile) {
		if (audioFile !== null) {
			return $sce.trustAsResourceUrl('http://www.kosamja.com/mp3s/' + audioFile);
		} else {
			return null;
		}

	};
});