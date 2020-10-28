/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentcolumns';

	const template = `
		<div class="kontentcolumns">
		   <div class="two-column__left"></div>
		   <div class="two-column__right"></div>
		</div>
	`;

	CKEDITOR.plugins.add('kontentcolumns', {
		requires: 'widget,dialog',

    // icons: 'youtube',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( 'kontentcolumns', this.path + 'dialogs/kontentcolumns.js' );

			// Add command
			// editor.addCommand( 'insertColumns', {
			// 	exec(editor) {
   //        editor.insertHtml( template );
			// 	}
			// });
			editor.addCommand( 'insertColumns', new CKEDITOR.dialogCommand( 'kontentcolumns' ));


      editor.widgets.add( 'kontentcolumns', {
      	// button: 'kontentcolumns',
	      // template,
	      // template: "Test",
	    	// dialog: 'kontentcolumns',
	    	allowedContent: `div(!kontentcolumns)`,
	    	requiredContent: 'div(kontentcolumns)',
	    	editables: {
	    		columnLeft: {
	          selector: 'div.two-column__left'
	        },
	        columnRight: {
	          selector: 'div.two-column__right'
	        },
	        heading: '.partners-grid__heading',
	        partnersGridItems: {
	        	selector: '.partners-grid__items'
	        }
	    	},
	    	upcast: function( element ) {
					return element.name == 'div' && element.hasClass( 'kontentcolumns' );
		    },
		    init() {
		    	const columnContainer = this.element.$;
		    	const variant = columnContainer.dataset.variant;
		    	const items = columnContainer.dataset.items;

					this.setData('variant', variant);
					this.setData('items', items);
		    },
		    upcast(element) {
		    	return element.hasClass('kontentcolumns');
		    },
		    data() {
		    	console.log('data');
		    	// const iframe = this.element.$.querySelector('iframe');

		    	// iframe.dataset.src = this.data.url;
		    	// iframe.src = `https://www.youtube.com/embed/${this.data.youtubeID}`;
		    }
	    });

	    // Add toolbar button for this plugin.
			editor.ui.addButton && editor.ui.addButton( '2 Columns', {
				label: '2 Columns',
				command: 'insertColumns',
				// toolbar: 'kentico_toolbar',
				icon: this.path + 'icons/columns.png'
			});
    },

	});
})();
