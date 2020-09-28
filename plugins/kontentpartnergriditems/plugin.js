/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	const pluginName = 'kontentpartnergriditems';

	// const template = `
	// 	<div class="${pluginName}">
	// 	   <div class="two-column__left"></div>
	// 	   <div class="two-column__right"></div>
	// 	</div>
	// `;

	CKEDITOR.plugins.add(pluginName, {
		requires: 'widget,dialog',

    // icons: 'youtube',

    init: function( editor ) {
    	// Add dialog
			CKEDITOR.dialog.add( pluginName, this.path + `dialogs/${pluginName}.js` );

			// Add command
			// editor.addCommand( 'insertColumns', {
			// 	exec(editor) {
   //        editor.insertHtml( template );
			// 	}
			// });
			editor.addCommand( 'insertPartnerGridItem', new CKEDITOR.dialogCommand( pluginName ));


      editor.widgets.add( pluginName, {
      	// button: pluginName,
	      template: window.utilities.getPartnerGridItemsTemplate(1),
	      // template: "Test",
	    	dialog: pluginName,
	    	allowedContent: `div(!partners-grid__items)`,
	    	requiredContent: 'div(partners-grid__items)',
	    	editables: {
	    		// columnLeft: {
	      //     selector: 'div.two-column__left'
	      //   },
	      //   columnRight: {
	      //     selector: 'div.two-column__right'
	      //   },
	        // partnersGridItems: {
	        // 	selector: '.partners-grid__item',
		       //  allowedContent: '.partners-grid__item'
	        // }
	    	},
	    	upcast: function( element ) {
	    		console.log({ element });
					return element.name == 'div' && element.hasClass( 'partners-grid__item' );
		    },
		    init() {
		    	// const columnContainer = this.element.$;
		    	// const variant = columnContainer.dataset.variant;
		    	// const items = columnContainer.dataset.items;
		    	console.log('kontentpartnergriditems');

		    	if ( editor.contextMenu ) {
					    editor.addMenuGroup( 'Partner Grid' );
					    editor.addMenuItem( 'add_partner_grid_item', {
					        label: 'Add Partner Grid Item',
					        // icon: this.path + 'icons/abbr.png',
					        command: 'insertPartnerGridItem',
					        // group: 'abbrGroup'
					    });
					}

					// this.setData('variant', variant);
					// this.setData('items', items);
		    },
		    upcast(element) {
		    	return element.hasClass('partners-grid__items');
		    },
		    data() {
		    	// const iframe = this.element.$.querySelector('iframe');

		    	// iframe.dataset.src = this.data.url;
		    	// iframe.src = `https://www.youtube.com/embed/${this.data.youtubeID}`;
		    }
	    });

	    // Add toolbar button for this plugin.
			// editor.ui.addButton && editor.ui.addButton( '2 Columns', {
			// 	label: '2 Columns',
			// 	command: 'insertColumns',
			// 	// toolbar: 'kentico_toolbar',
			// 	icon: this.path + 'icons/columns.png'
			// });
    },

	});
})();
