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
                            const youtubeURL = window.utilities.buildYoutubeURL(youtubeID);
                            widget.data.url = youtubeURL;
                        }
                    },
                    {
                        id: 'title',
                        type: 'text',
                        label: 'Title',
                        setup: function( widget ) {
                            this.setValue(widget.data.title);
                        },
                        commit: function( widget ) {
                            const title = this.getValue();
                            widget.data.title = title;
                        }
                    },
                ]
            }
        ],
        onShow : function()
        {
           let selection = editor.getSelection();
           let element = selection.getStartElement();

            if ( element ) {
                console.log('existing element', { element });
                element = element.getAscendant( 'div', true );
            }

            if ( !element || element.getName() != 'div' ) {
                const markup = CKEditorShortCode.getTemplate('youtube');
                const div = editor.document.createElement('div');

                div.setHtml(markup);

                element = div;
                this.insertMode = true;

            }
            else {
                this.insertMode = false;
            }

            this.element = element;

            if ( !this.insertMode )
                this.setupContent( this.element );
        },
        onOk: function(widget) {
            const dialog = this;

            dialog.commitContent( widget );

            const markup = CKEditorShortCode.getTemplate('youtube', widget.data.url, widget.data.title);

            if ( dialog.insertMode ) {
                this.element.setHtml(markup);
                editor.insertHtml( this.element.getHtml() );
            }
            else {
                const iframe = this.element.$.querySelector('iframe');
                iframe.title = widget.data.title;
                iframe.src = widget.data.url;
                iframe.dataset.src = widget.data.url;
            }
        }
    };
} );