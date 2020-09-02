(() => {
	const shortCodesPattern = new RegExp(
		'\\[\(vimeo|youtube|facebook\)\\s+id="\(\[^"\]+\)".*\\]'
	, 'ig');

	console.log({ shortCodesPattern });

	const SHORTCODE_TO_HTML = {
		youtube(shortcode, youtubeID) {
			const youtubeURL = shortcode ? `https://www.youtube.com/embed/${youtubeID}` : '';

			return `
			<div class="kontentyoutube">
				<iframe ${youtubeURL ? `src="${youtubeURL}"` : ''} data-src=${youtubeURL} frameborder="0"></iframe>
			</div>
			`;
		},

		vimeo(shortcode, vimeoID) {
			const vimeoURL = shortcode ? `https://player.vimeo.com/video/${vimeoID}` : '';

			return `
			<div class="kontentvimeo">
				<iframe ${vimeoURL ? `src="${vimeoURL}"` : ''} data-src=${vimeoURL} frameborder="0"></iframe>
			</div>
			`;
		},

		facebook(shortcode, postID) {
			const embedURL = shortcode ? `https://www.facebook.com/videos/${postID}` : '';

			return `
			<div class="kontentfacebook">
				<div class="fb-video" ${embedURL ? `data-href="${embedURL}"` : ''} data-show-text="true" data-width=""></div>
			</div>
			`;
		},
		
	};

	window.CKEditorShortCode = window.CKEditorShortCode || {

		/**
		 * Accepts HTML string containing shortcodes,
		 * and formats them accordingly
		 * @param  {string} htmlWithShortcodes 
		 * @return {string}                    
		 */
		formatHTML(htmlWithShortcodes = '') {
			return htmlWithShortcodes.replace(shortCodesPattern, this.toMarkup);
		},

		toMarkup(shortcode, shortcodeType, ...captureGroups) {
			console.log({ shortcode, shortcodeType, captureGroups });
			if ( shortcodeType in SHORTCODE_TO_HTML ) {
				return SHORTCODE_TO_HTML[shortcodeType](shortcode, ...captureGroups.slice(0, -2));
			}
			return shortcode;
		},

		getTemplate(shortcodeType) {
			if ( shortcodeType in SHORTCODE_TO_HTML ) {
				return SHORTCODE_TO_HTML[shortcodeType]();
			}
			return '';
		}

	}
})();