/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentvimeo';

	CKEDITOR.plugins.add(pluginName, {
		requires: 'widget,dialog',

    // icons: 'vimeo',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( pluginName, this.path + 'dialogs/'+ pluginName +'.js' );

			// Add command
			editor.addCommand( 'insertVimeoVideo', new CKEDITOR.dialogCommand( 'kontentvimeo' ));

      editor.widgets.add( pluginName, {
      	// button: pluginName,
	      template: CKEditorShortCode.getTemplate('youtube'),
	      // template: "Test",
	    	dialog: pluginName,
	    	upcast: function( element ) {
					return element.name == 'div' && element.hasClass( pluginName );
		    },
		    init() {
		    	const iframe = this.element.$.querySelector('iframe');
		    	const vimeoID = window.utilities.extractVimeoId(iframe.src);

					this.setData('url', iframe.src);
					this.setData('title', iframe.title);
					this.setData('vimeoID', vimeoID);
		    },
		    data() {
		    	const iframe = this.element.$.querySelector('iframe');

		    	iframe.dataset.src = this.data.url;
		    	iframe.title = this.data.title;
		    	iframe.src = `https://player.vimeo.com/video/${this.data.vimeoID}`;
		    }
	    });

	    // Add toolbar button for this plugin.
			editor.ui.addButton && editor.ui.addButton( 'Vimeo', {
				label: 'Vimeo',
				command: 'insertVimeoVideo',
				// toolbar: 'kentico_toolbar',
				icon: this.path + 'icons/vimeo.png'
			});
    }
	});
})();
