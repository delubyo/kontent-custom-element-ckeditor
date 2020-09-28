/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentpdf';

	const template = CKEditorShortCode.getTemplate('pdf');

	CKEDITOR.plugins.add(pluginName, {
		requires: 'widget,dialog',

    // icons: 'form',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( pluginName, this.path + `dialogs/${pluginName}.js` );

			// Add command
			editor.addCommand( 'insertPDF', new CKEDITOR.dialogCommand( pluginName ));

      editor.widgets.add( pluginName, {
      	// button: pluginName,
	      template,
	      // template: "Test",
	    	dialog: pluginName,
	    	allowedContent: `div(!${pluginName})`,
	    	requiredContent: `div(${pluginName})`,
	    	upcast: function( element ) {
					return element.name == 'div' && element.hasClass( pluginName );
		    },
		    init() {
		    	const element = this.element.$;
		    	this.setData('file', element.dataset.file);
		    },
		    upcast(element) {
		    	return element.hasClass(pluginName);
		    },
		    data() {
		    	const element = this.element.$;
		    	const link = element.querySelector('a');
		    	const file = this.data.file;

		    	link.href = file;
		    	link.textContent = file;
		    	element.dataset.file = file;
		    }
	    });

	    // Add toolbar button for this plugin.
			editor.ui.addButton && editor.ui.addButton( 'PDF', {
				label: 'PDF',
				command: 'insertPDF',
				// toolbar: 'kentico_toolbar',
				icon: this.path + 'icons/kontentpdf.png'
			});
    }
	});
})();
