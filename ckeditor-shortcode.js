(() => {
	const shortCodesPattern = new RegExp([
		'(?:\\[\(youtube\)\\s+id="\(\[^"\]+\)"\\])'
	].join('|'), 'ig');

	const SHORTCODE_TO_HTML = {
		youtube(shortcode, youtubeID) {
			const youtubeURL = shortcode ? `https://www.youtube.com/embed/${youtubeID}` : '';

			return `
			<div class="kontentyoutube">
				<iframe ${youtubeURL ? `src="${youtubeURL}"` : ''} data-src=${youtubeURL} frameborder="0"></iframe>
			</div>
			`;
		}
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