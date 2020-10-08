(() => {
	const shortCodesPattern = new RegExp(
		'\\[+\(vimeo|youtube|facebook|formassembly|pardot\-form\)\\s+\(?:form\)?id="?\(\[^"\\s\]+\)"?\\s?\(\[^\\]\]*\)\\]+'
	, 'ig');

	const SHORTCODE_TO_HTML = {
		youtube(shortcode, youtubeID, title = '') {
			const youtubeURL = youtubeID ? window.utilities.buildYoutubeURL(youtubeID) : '';

			return `
			<div class="kontentyoutube embed embed--youtube">
				<iframe
					${title ? `title="${title}"`: ''}
					${youtubeURL ? `src="${youtubeURL}"` : ''}
					${youtubeURL ? `data-src="${youtubeURL}"` : ''}
					frameborder="0"
				></iframe>
			</div>
			`;
		},

		vimeo(shortcode, vimeoID, title = '') {
			const vimeoURL = shortcode ? window.utilities.buildVimeoURL(vimeoID) : '';

			return `
			<div class="kontentvimeo embed embed--vimeo">
				<iframe
					${title ? `title="${title}"`: ''}
					${vimeoURL ? `src="${vimeoURL}"` : ''}
					${vimeoURL ? `data-src="${vimeoURL}"` : ''}
					frameborder="0"
				></iframe>
			</div>
			`;
		},

		facebook(shortcode, videoIDorURL, title = '') {
			const videoURL = /^http/.test(videoIDorURL) ? videoIDorURL : `https://www.facebook.com/facebook/videos/${videoIDorURL}`;
			const srcURL = window.utilities.buildFacebookURL(videoURL);

			return `
			<div class="kontentfacebook embed embed--youtube">
				<iframe
					${title ? `title="${title}"`: ''}
					data-src="${videoURL}"
					src="${srcURL}"
					width="560"
					height="315"
					style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"
				></iframe>
			</div>
			`;
		},

		formassembly(shortcode, formID, ...additionalData) {
			return this.form(formID, 'formassembly');
		},

		['pardot-form'](shortcode, formID, ...additionalData) {
			return this.form(formID, 'pardot');
		},

		form(shortcode, formID = '', formVendor = '') {
			return `
				<div class="kontentforms ncoa-form ncoa-form--${formVendor}" data-form-id="${formID}" data-form-vendor="${formVendor}">
					<span style="font-size: 0px">form container</span>
				</div>
			`;
		},

		pdf(shortcode, file = '') {
			return `
				<div class="kontentpdf ncoa-pdf-container" data-file="${file}">
					<strong>PDF File:</strong>&nbsp;<a href="${file}" target="_blank">${file}</a>
				</div>
			`
		},

		file(shortcode, file = '') {
			const fileName = file.split('/').pop().split('.')[0];
			const fileType = file.split('/').pop().split('.')[1];

			return `
				<div class="download">
					<div class="file">
						<h4 class="file__name">${ fileName }</h4>
						<p class="file__meta">.${ fileType }</p>
					</div>
					<a class="download__btn" href="${ file }" download="${ fileName }" target="_blank">Download</a>
				</div>
			`
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
			if  (htmlWithShortcodes ===  null) return '';
			return htmlWithShortcodes.replace(shortCodesPattern, this.toMarkup);
		},

		toMarkup(shortcode, shortcodeType, ...captureGroups) {
			if ( shortcodeType in SHORTCODE_TO_HTML ) {
				return SHORTCODE_TO_HTML[shortcodeType](shortcode, ...captureGroups.slice(0, -2));
			}
			return shortcode;
		},

		getTemplate(shortcodeType, ...params) {
			if ( shortcodeType in SHORTCODE_TO_HTML ) {
				return SHORTCODE_TO_HTML[shortcodeType](shortcodeType, ...params);
			}
			return '';
		}

	}
})();