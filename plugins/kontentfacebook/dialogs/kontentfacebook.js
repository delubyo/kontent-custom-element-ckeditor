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
                            this.setValue(widget.data.videoURL);
                        },
                        commit: function( widget ) {
                          const url = this.getValue();
                          widget.setData( 'videoURL', url );
                        }
                    },
                ]
            }
        ]
    };
} );