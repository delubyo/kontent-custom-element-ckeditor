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
                        commit: function( elementOrWidget ) {
                            const element = elementOrWidget.$ ? elementOrWidget.$ : elementOrWidget.element.$;
                            const url = this.getValue();

                            const vimeoID = window.utilities.extractVimeoId(url);
                            const vimeoURL = window.utilities.buildVimeoURL(vimeoID);

                            const iframe = element.querySelector('iframe');

                            if ( !elementOrWidget.$ ) {
                                elementOrWidget.setData('url', vimeoURL);
                            }

                            iframe.src = vimeoURL;
                            iframe.dataset.src = vimeoURL;
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
                element.$.innerHTML = CKEditorShortCode.getTemplate('vimeo');
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