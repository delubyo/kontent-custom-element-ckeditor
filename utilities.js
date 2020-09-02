(() => {
	window.utilities = window.utilities || {

		extractYoutubeId(youtubeURL = '') {
			const youtubeIDPattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
			const [matches] = [...youtubeURL.matchAll(youtubeIDPattern)];
			return matches[1];
		},

		extractVimeoId(vimeoURL = '') {
			const vimeoIDPattern = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/gi;
			const [matches] = [...vimeoURL.matchAll(vimeoIDPattern)];
			console.log({ matches });
			return matches[1];
		}
	}
})();