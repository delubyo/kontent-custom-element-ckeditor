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

		getTwoColumnTemplate(variant = '', items = 1) {
			switch (variant) {
				case 'partners-grid--tier1':
				case 'partners-grid--tier2':
					return `
						<div class="partners-grid kontentpartnersgrid kontentcolumns" data-variant="${variant}" data-items="${items}">
						  <div class="partners-grid__container partners-grid--${variant === 'partners-grid--tier1' ? 'tier1' : 'tier2' }">
						    <h2 class="partners-grid__heading">Heading</h2>
						    ${ this.getPartnerGridItemsTemplate(items) }
						  </div>
						</div>
					`;

				case 'leadership-grid':
					return `
						<div class="leadership-grid">
					  <div class="leadership-grid__container">
					  	<h2 class="leadership-grid__heading">Heading</h2>
					    <div class="leadership-grid__items">
					    	${
					    		Array.from({ length: items }).map(() => `
					    			<div class="leadership-grid__item">
							        <div class="leadership-grid__image">
							          <img src="profile-placeholder.svg" alt="Sample Image" class="leadership-grid__img">
							        </div>
							        <div class="leadership-grid__content">
							          <a href="/">Name</a>
							          <div class="leadership-grid__description">
							            Description
							          </div>
							        </div>
							      </div>
					    		`).join('')
					    	}
					    </div>
					  </div>
					</div>
					`;

				default:
					return `
						<div class="kontentcolumns two-column">
						   <div class="two-column__left"></div>
						   <div class="two-column__right"></div>
						</div>
					`;
			}
		},

		getPartnerGridItemsTemplate(items = 1) {
			return `
				<div class="partners-grid__items">
		    	${
		    		Array.from({ length: items }).map(() => `
		    			<div class="partners-grid__item">
				        <div class="partners-grid__image">
				          <a href="/">
				            <img src="profile-placeholder.svg" alt="Sample Image" class="partners-grid__img">
				          </a>
				        </div>
				        <div class="partners-grid__content">
				          <a href="">Name</a>
				          <div class="partners-grid__description">
				            Description
				          </div>
				        </div>
				      </div>
		    		`).join('')
		    	}
		    </div>
			`;
		}
	}
})();