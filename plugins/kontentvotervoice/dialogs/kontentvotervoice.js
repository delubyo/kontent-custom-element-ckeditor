CKEDITOR.dialog.add( 'kontentvotervoice', function( editor ) {
    return {
        title: 'Voter Voice Embed',
        minWidth: 300,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'id',
                        type: 'text',
                        label: 'ID',
                        setup: function( widget ) {
                            this.setValue(widget.data.id);
                        },
                        commit: function( widget ) {
                            const id = this.getValue();
                            widget.data.id = id;
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
                const markup = CKEditorShortCode.getTemplate('votervoice');
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

            const markup = CKEditorShortCode.getTemplate('votervoice', widget.data.id);

            if ( dialog.insertMode ) {
                this.element.setHtml(markup);
                editor.insertHtml( this.element.getHtml() );
            }
            else {
                const idElement = this.element.$.querySelector('.kontentvotervoice__id');
                idElement.textContent = widget.data.id;
            }
        }
    };
} );