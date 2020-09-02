CKEDITOR.dialog.add( 'kontentvimeo', function( editor ) {
    return {
        title: 'Vimeo Embed',
        minWidth: 300,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'url',
                        type: 'text',
                        label: 'Vimeo URL',
                        setup: function( widget ) {
                            this.setValue(widget.data.url);
                        },
                        commit: function( widget ) {
                        	// const url = this.getValue();
                        	// const youtubeID = window.utilities.extractYoutubeId(url);

                         //  widget.setData( 'url', url );
                         //  widget.setData( 'youtubeID', youtubeID );
                        }
                    },
                ]
            }
        ]
    };
} );