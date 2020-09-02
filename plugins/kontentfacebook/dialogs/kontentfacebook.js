CKEDITOR.dialog.add( 'kontentfacebook', function( editor ) {
    return {
        title: 'Facebook Embed',
        minWidth: 300,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'url',
                        type: 'text',
                        label: 'Facebook URL',
                        setup: function( widget ) {
                            this.setValue(widget.data.url);
                        },
                        commit: function( widget ) {
                        	const url = this.getValue();
                        	const youtubeID = window.utilities.extractYoutubeId(url);

                          widget.setData( 'url', url );
                          widget.setData( 'youtubeID', youtubeID );
                        }
                    },
                ]
            }
        ]
    };
} );