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
                            console.log({ elementOrWidget });
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
                            console.log('iframe.dataset.src',iframe.dataset.src);
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
            const element = this.element;

            dialog.commitContent( element );

            if ( dialog.insertMode ) {
                editor.insertHtml( element.$.innerHTML.trim() );
            }
        }
    };
} );