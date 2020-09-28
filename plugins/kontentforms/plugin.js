/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentforms';

	const template = CKEditorShortCode.getTemplate('form');

	CKEDITOR.plugins.add(pluginName, {
		requires: 'widget,dialog',

    // icons: 'form',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( pluginName, this.path + `dialogs/${pluginName}.js` );

			// Add command
			editor.addCommand( 'insertForm', new CKEDITOR.dialogCommand( pluginName ));

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
		    	const container = this.element.$;
		    	const formID = container.dataset.formId;
		    	const formVendor = container.dataset.formVendor;

					this.setData('formID', formID);
					this.setData('formVendor', formVendor);
		    },
		    upcast(element) {
		    	return element.hasClass(pluginName);
		    },
		    data() {
		    	const container = this.element.$;
		    	const formID = this.data.formID;
		    	const formVendor = this.data.formVendor;

		    	container.dataset.formId = formID;
		    	container.dataset.formVendor = formVendor;
		    }
	    });

	    // Add toolbar button for this plugin.
			editor.ui.addButton && editor.ui.addButton( 'Forms', {
				label: 'Form',
				command: 'insertForm',
				// toolbar: 'kentico_toolbar',
				icon: this.path + 'icons/form.png'
			});
    }
	});
})();
