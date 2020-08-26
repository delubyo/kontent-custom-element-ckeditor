(() => {
	window.utilities = window.utilities || {

		extractYoutubeId(youtubeURL = '') {
			const youtubeIDPattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;;
			const [matches] = [...youtubeURL.matchAll(youtubeIDPattern)];
			return matches[1];
		}
	}
})();