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
                            const url = this.getValue();
                            const vimeoID = window.utilities.extractVimeoId(url);
                            const vimeoURL = window.utilities.buildVimeoURL(vimeoID);
                            widget.data.url = vimeoURL;
                            widget.data.vimeoID = vimeoID;
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
                const markup = CKEditorShortCode.getTemplate('vimeo');
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

            const markup = CKEditorShortCode.getTemplate('vimeo', widget.data.vimeoID, widget.data.title);

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