/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentvimeo';

	CKEDITOR.plugins.add(pluginName, {
		requires: 'widget,dialog',

    icons: 'image',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( pluginName, this.path + 'dialogs/'+ pluginName +'.js' );

      editor.widgets.add( pluginName, {
      	button: pluginName,
	      template: CKEditorShortCode.getTemplate('youtube'),
	      // template: "Test",
	    	dialog: pluginName,
	    	upcast: function( element ) {
					return element.name == 'div' && element.hasClass( pluginName );
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
