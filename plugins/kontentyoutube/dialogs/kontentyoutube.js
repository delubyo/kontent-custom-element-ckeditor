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
                        commit: function( elementOrWidget ) {
                            const element = elementOrWidget.$ ? elementOrWidget.$ : elementOrWidget.element.$;
                            const url = this.getValue();
                            const youtubeID = window.utilities.extractYoutubeId(url);
                            const youtubeURL = window.utilities.buildYoutubeURL(youtubeID);

                            const iframe = element.querySelector('iframe');

                            if ( !elementOrWidget.$ ) {
                                elementOrWidget.setData('url', youtubeURL);
                            }

                            iframe.src = youtubeURL;
                            iframe.dataset.src = youtubeURL;
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
                element = editor.document.createElement( 'div' );
                element.$.innerHTML = CKEditorShortCode.getTemplate('youtube');
                this.insertMode = true;
            }
            else
                this.insertMode = false;

            this.element = element;


            console.log('this.insertMode',this.insertMode);

            if ( !this.insertMode )
                this.setupContent( this.element );
        },
        onOk: function(widget) {
            const dialog = this;
            const element = this.element;

            console.log({ element });

            dialog.commitContent( element );

            if ( dialog.insertMode ) {
                editor.insertElement( element );
            }
        }
    };
} );