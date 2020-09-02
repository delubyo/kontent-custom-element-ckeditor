/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentfacebook';

	CKEDITOR.plugins.add('kontentfacebook', {
		requires: 'widget,dialog',

    icons: 'image',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( 'kontentfacebook', this.path + 'dialogs/kontentfacebook.js' );

      editor.widgets.add( 'kontentfacebook', {
      	button: 'kontentfacebook',
	      template: CKEditorShortCode.getTemplate('facebook'),
	      // template: "Test",
	    	dialog: 'kontentfacebook',
	    	upcast: function( element ) {
					return element.name == 'div' && element.hasClass( 'kontentfacebook' );
		    },
		   //  init() {
		   //  	const iframe = this.element.$.querySelector('iframe');
		   //  	const youtubeID = window.utilities.extractYoutubeId(iframe.dataset.src);

					// this.setData('url', iframe.dataset.src);
					// this.setData('youtubeID', youtubeID);
		   //  },
		   //  data() {
		   //  	const iframe = this.element.$.querySelector('iframe');

		   //  	iframe.dataset.src = this.data.url;
		   //  	iframe.src = `https://www.youtube.com/embed/${this.data.youtubeID}`;
		   //  }
	    });

	    // Add toolbar button for this plugin.
			// editor.ui.addButton && editor.ui.addButton( 'Youtube', {
			// 	label: 'Youtube',
			// 	command: pluginName,
			// 	toolbar: 'insert,10'
			// });
    }
	});
})();
