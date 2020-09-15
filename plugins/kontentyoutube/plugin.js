/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentyoutube';

	const template = CKEditorShortCode.getTemplate('youtube');

	CKEDITOR.plugins.add('kontentyoutube', {
		requires: 'widget,dialog',

    // icons: 'youtube',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( 'kontentyoutube', this.path + 'dialogs/kontentyoutube.js' );

			// Add command
			editor.addCommand( 'insertYoutubeVideo', new CKEDITOR.dialogCommand( 'kontentyoutube' ));
			// editor.addCommand( 'insertYoutubeVideo', {
			// 	exec(editor) {
   //        editor.insertHtml( template );
			// 	}
			// });


      editor.widgets.add( 'kontentyoutube', {
      	button: 'kontentyoutube',
	      template,
	      // template: "Test",
	    	dialog: 'kontentyoutube',
	    	allowedContent: `div(!kontentyoutube)`,
	    	requiredContent: 'div(kontentyoutube)',
	    	upcast: function( element ) {
					return element.name == 'div' && element.hasClass( 'kontentyoutube' );
		    },
		    init() {
		    	const iframe = this.element.$.querySelector('iframe');
		    	const youtubeID = window.utilities.extractYoutubeId(iframe.dataset.src);

					this.setData('url', iframe.dataset.src);
					this.setData('youtubeID', youtubeID);
		    },
		    upcast(element) {
		    	return element.hasClass('kontentyoutube');
		    },
		    data() {
		    	const iframe = this.element.$.querySelector('iframe');

		    	iframe.dataset.src = this.data.url;
		    	iframe.src = `https://www.youtube.com/embed/${this.data.youtubeID}`;
		    }
	    });

	    // Add toolbar button for this plugin.
			editor.ui.addButton && editor.ui.addButton( 'Youtube', {
				label: 'Youtube',
				command: 'insertYoutubeVideo',
				// toolbar: 'kentico_toolbar',
				icon: this.path + 'icons/youtube.png'
			});
    }
	});
})();
