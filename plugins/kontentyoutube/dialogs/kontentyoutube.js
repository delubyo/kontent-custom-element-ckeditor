CKEDITOR.dialog.add( 'kontentyoutube', function( editor ) {
    return {
        title: 'Youtube Embed',
        minWidth: 300,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'url',
                        type: 'text',
                        label: 'Youtube URL',
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