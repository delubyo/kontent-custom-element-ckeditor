CKEDITOR.dialog.add( 'kontentforms', function( editor ) {
    return {
        title: 'Form Embed',
        minWidth: 300,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'formID',
                        type: 'text',
                        label: 'Form ID',
                        setup: function( widget ) {
                            this.setValue(widget.data.formID);
                        },
                        commit: function( widget ) {
                            const formID = this.getValue();
                            widget.data.formID = formID;
                        }
                    },
                    {
                        id: 'formVendor',
                        type: 'select',
                        label: 'Form Vendor',
                        items: [
                            ['Pardot', 'pardot'],
                            ['Formassembly', 'formassembly'],
                            ['Rallybound', 'rallybound']
                        ],
                        setup: function( widget ) {
                            this.setValue(widget.data.formVendor);
                        },
                        commit: function( widget ) {
                            const formVendor = this.getValue();
                            widget.data.formVendor = formVendor
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
                const markup = CKEditorShortCode.getTemplate('form');
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

            const markup = CKEditorShortCode.getTemplate('form', widget.data.formID, widget.data.formVendor);

            if ( dialog.insertMode ) {
                this.element.setHtml(markup);
                editor.insertHtml( this.element.getHtml() + '<br />' );
            }
            else {
                // this.element.
                console.log('this.element',this.element);
                this.element.$.firstElementChild.dataset.formId = widget.data.formID;
                this.element.$.firstElementChild.dataset.formVendor = widget.data.formVendor;
            }
        }
    };
} );