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
                            const embedURL = window.utilities.buildFacebookURL(url);
                            widget.data.url = embedURL;
                            widget.data.videoURL = url;
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
                element = element.getAscendant( 'div', true );
            }

            if ( !element || element.getName() != 'div' ) {
                const markup = CKEditorShortCode.getTemplate('facebook');
                const div = editor.document.createElement('div');

                div.setHtml(markup);

                element = div;
                this.insertMode = true;
            }
            else
                this.insertMode = false;

            this.element = element;

            if ( !this.insertMode )
                this.setupContent( this.element );
        },
        onOk: function(widget) {
            const dialog = this;

            dialog.commitContent( widget );

            if ( dialog.insertMode ) {
                const markup = CKEditorShortCode.getTemplate('facebook', widget.data.videoURL, widget.data.title);
                this.element.setHtml(markup);
                editor.insertHtml( this.element.getHtml() );
            }
            else {
                const iframe = this.element.$.querySelector('iframe');
                iframe.title = widget.data.title;
                iframe.src = widget.data.url;
                iframe.dataset.src = widget.data.videoURL;
            }
        }
    };
} );