(() => {
	window.utilities = window.utilities || {

		extractYoutubeId(youtubeURL = '') {
			const youtubeIDPattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
			const [matches] = [...youtubeURL.matchAll(youtubeIDPattern)];
			return matches[1];
		},

		buildYoutubeURL(youtubeID) {
			return `https://www.youtube.com/embed/${youtubeID}`;
		},

		buildVimeoURL(vimeoID) {
			return `https://player.vimeo.com/video/${vimeoID}`;
		},

		buildFacebookURL(facebookVideoURL) {
			return `https://www.facebook.com/plugins/video.php?href=${facebookVideoURL}&show_text=0&width=560`;
		},

		extractVimeoId(vimeoURL = '') {
			const vimeoIDPattern = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/gi;
			const [matches] = [...vimeoURL.matchAll(vimeoIDPattern)];
			return matches[1];
		},

		extractFacebookVideoURL(videoEmbedSrcURL = '') {
			const facebookVideoURLPattern = /(?<=href=)[^&]+/gi;
			const [matches] = [...videoEmbedSrcURL.matchAll(facebookVideoURLPattern)];
			return matches[0];
		},
	}
})();