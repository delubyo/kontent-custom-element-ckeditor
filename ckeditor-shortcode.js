(() => {
	const shortCodesPattern = new RegExp(
		'\\[+\(vimeo|youtube|facebook|formassembly|pardot\-form\)\\s+\(?:form\)?id="?\(\[^"\\s\]+\)"?\\s?\(\[^\\]\]*\)\\]+'
	, 'ig');

	const SHORTCODE_TO_HTML = {
		youtube(shortcode, youtubeID) {
			const youtubeURL = youtubeID ? window.utilities.buildYoutubeURL(youtubeID) : '';

			return `
			<div class="kontentyoutube embed embed--youtube">
				<iframe ${youtubeURL ? `src="${youtubeURL}"` : ''} data-src=${youtubeURL} frameborder="0"></iframe>
			</div>
			`;
		},

		vimeo(shortcode, vimeoID) {
			const vimeoURL = shortcode ? window.utilities.buildVimeoURL(vimeoID) : '';

			return `
			<div class="kontentvimeo embed embed--vimeo">
				<iframe ${vimeoURL ? `src="${vimeoURL}"` : ''} data-src=${vimeoURL} frameborder="0"></iframe>
			</div>
			`;
		},

		facebook(shortcode, videoID) {
			const embedURL =  `https://www.facebook.com/facebook/videos/${videoID}`;
			const srcURL = window.utilities.buildFacebookURL(embedURL);

			return `
			<div class="kontentfacebook embed embed--youtube">
				<iframe data-src="${srcURL}" src="${srcURL}" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
			</div>
			`;
		},

		formassembly(shortcode, formID, ...additionalData) {
			return this.form(formID, 'formassembly');
		},

		['pardot-form'](shortcode, formID, ...additionalData) {
			return this.form(formID, 'pardot');
		},

		form(formID = '', formVendor = '') {
			return `
				<div class="kontentforms ncoa-form ncoa-form--${formVendor}" data-form-id="${formID}" data-form-vendor="${formVendor}">
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
			console.log({ shortcode, shortcodeType, captureGroups });
			if ( shortcodeType in SHORTCODE_TO_HTML ) {
				return SHORTCODE_TO_HTML[shortcodeType](shortcode, ...captureGroups.slice(0, -2));
			}
			return shortcode;
		},

		getTemplate(shortcodeType, ...params) {
			if ( shortcodeType in SHORTCODE_TO_HTML ) {
				return SHORTCODE_TO_HTML[shortcodeType](...params);
			}
			return '';
		}

	}
})();