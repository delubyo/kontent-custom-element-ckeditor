/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function () {
	return;

	CKEDITOR.plugins.add('kontentshortcode', {
		requires: 'widget,dialog',

    icons: 'image',

    init: function( editor ) {
      editor.widgets.add( 'kontentshortcode', {
	      // button: 'Shortcode',
	      template: '<p class="shortcode">Test Widget</p>',
	      editables: {
	        title: {
	            selector: '.shortcode'
	        },
	    	},
	    	upcast: function( element ) {
	    		console.log({ element });
					return element.name == 'p' && element.hasClass( 'shortcode' );
		    }
	    });

	    // Add toolbar button for this plugin.
			// editor.ui.addButton && editor.ui.addButton( 'Image', {
			// 	label: 'Shortcode',
			// 	command: 'kontentshortcode',
			// 	toolbar: 'insert,10'
			// } );
    }
	});
})();
