/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentfacebook';

	const template = CKEditorShortCode.getTemplate('facebook');

	CKEDITOR.plugins.add('kontentfacebook', {
		requires: 'widget,dialog',

    // icons: 'facebook',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( 'kontentfacebook', this.path + 'dialogs/kontentfacebook.js' );

			// Add commad
			editor.addCommand( 'insertFBVideo', new CKEDITOR.dialogCommand( 'kontentfacebook' ));

      editor.widgets.add( 'kontentfacebook', {
      	// button: 'kontentfacebook',
	      template: template,
	      // template: "Test",
	    	dialog: 'kontentfacebook',
	    	upcast: function( element ) {
					return element.name == 'div' && element.hasClass( 'kontentfacebook' );
		    },
		    init() {
		    	const iframe = this.element.$.querySelector('iframe');
		    	const videoURL = window.utilities.extractFacebookVideoURL(iframe.src);

					this.setData('url', iframe.src);
					this.setData('videoURL', iframe.dataset.src);
		    },
		    data() {
		    	const iframe = this.element.$.querySelector('iframe');

		    	iframe.dataset.src = this.data.videoURL;
		    	iframe.src = this.data.url;
		    }
	    });

	    // Add toolbar button for this plugin.
			editor.ui.addButton && editor.ui.addButton( 'Facebook Video', {
				label: 'Facebook Video',
				command: 'insertFBVideo',
				// toolbar: 'kentico_toolbar',
				icon: this.path + 'icons/facebook.png'
			});
    }
	});
})();
