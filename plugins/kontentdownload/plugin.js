/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentdownload';

	const template = CKEditorShortCode.getTemplate('file');

	CKEDITOR.plugins.add(pluginName, {
		requires: 'widget,dialog',

    // icons: 'form',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( pluginName, this.path + `dialogs/${pluginName}.js` );

			// Add command
			editor.addCommand( 'insertFile', new CKEDITOR.dialogCommand( pluginName ));

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
					const url = this.data.file;
					const fileName = url.split('/').pop().split('.')[0];
					const fileType = url.split('/').pop().split('.')[1];

					const fileNameNode = this.element.$.querySelector('.file__name');
					const fileMetaNode = this.element.$.querySelector('.file__meta');
					const downloadBtnNode = this.element.$.querySelector('.download__btn');

					if (fileNameNode) {
							fileNameNode.innnerHTML = fileName;
					}

					if (fileMetaNode) {
							fileMetaNode.innnerHTML = `.${ fileType }`;
					}

					if (downloadBtnNode) {
							downloadBtnNode.setAttribute('href', url);
							downloadBtnNode.setAttribute('download', fileName);
					}
		    }
	    });

	    // Add toolbar button for this plugin.
			editor.ui.addButton && editor.ui.addButton( 'File', {
				label: 'File',
				command: 'insertFile',
				// toolbar: 'kentico_toolbar',
				icon: this.path + 'icons/kontentdownload.png'
			});
    }
	});
})();
