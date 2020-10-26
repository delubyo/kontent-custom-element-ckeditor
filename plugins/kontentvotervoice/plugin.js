/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentvotervoice';

	const template = CKEditorShortCode.getTemplate('votervoice');

	CKEDITOR.plugins.add('kontentvotervoice', {
		requires: 'widget,dialog',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( 'kontentvotervoice', this.path + 'dialogs/kontentvotervoice.js' );

			// Add command
			editor.addCommand( 'insertVoterVoice', new CKEDITOR.dialogCommand( 'kontentvotervoice' ));
			// editor.addCommand( 'insertVoterVoice', {
			// 	exec: editor => {
			// 		editor.insertHtml(template);
			// 	}
			// });

      editor.widgets.add( 'kontentvotervoice', {
	      template,
	      dialog: 'kontentvotervoice',
	    	allowedContent: 'div(!kontentvotervoice)',
	    	requiredContent: 'div(kontentvotervoice)',
	    	upcast: function( element ) {
					return element.name == 'div' && element.hasClass( 'kontentvotervoice' );
		    },
		    init() {
		    	const id = this.element.$.querySelector('.kontentvotervoice__id');
					this.setData('id', id.textContent);
		    },
		    upcast(element) {
		    	return element.hasClass('kontentvotervoice');
		    },
		    data() {
		    	const id = this.element.$.querySelector('.kontentvotervoice__id');
		    	id.textContent = this.data.id;
		    }
	    });

	    // Add toolbar button for this plugin.
			editor.ui.addButton && editor.ui.addButton( 'Voter Voice Embed', {
				label: 'Voter Voice Embed',
				command: 'insertVoterVoice',
				// toolbar: 'kentico_toolbar',
				icon: this.path + 'icons/embed.png'
			});
    }
	});
})();
