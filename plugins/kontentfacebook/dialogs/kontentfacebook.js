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
                        commit: function( elementOrWidget ) {
                            const element = elementOrWidget.$ ? elementOrWidget.$ : elementOrWidget.element.$;
                            const url = this.getValue();
                            const embedURL = window.utilities.buildFacebookURL(url);

                            const iframe = element.querySelector('iframe');

                            if ( !elementOrWidget.$ ) {
                                elementOrWidget.setData('url', embedURL);
                            }

                            iframe.src = embedURL;
                            iframe.dataset.src = embedURL;
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
                element.$.innerHTML = CKEditorShortCode.getTemplate('facebook');
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
            const element = this.element;

            console.log({ element });

            dialog.commitContent( element );

            if ( dialog.insertMode ) {
                editor.insertElement( element );
            }
        }
    };
} );