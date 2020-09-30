CKEDITOR.dialog.add( 'kontentcolumns', function( editor, a, b, c ) {
    var notification = new CKEDITOR.plugins.notification( editor, { message: 'Foo' } );

    return {
        title: '2-Column Layout',
        minWidth: 300,
        minHeight: 100,
        contents: [
            {
                id: 'details',
                elements: [
                    {
                        id: 'variant',
                        type: 'select',
                        label: '2 Column Variant',
                        items: [
                            ['Partners Grid: Tier 1', 'partners-grid--tier1'],
                            ['Partners Grid: Tier 2', 'partners-grid--tier2'],
                            ['Leadership Grid', 'leadership-grid']
                        ],
                        setup: function( widget ) {
                            this.setValue(widget.data.variant);
                        },
                        commit: function( widget ) {
                            console.log('variant',this.getValue());
                            widget.data.variant = this.getValue();
                        }
                    },
                    {
                        id: 'items',
                        type: 'text',
                        label: 'Items',
                        default: '1',
                        validate: function(a) {
                            if ( !/^[0-9]+$/.test(this.getValue().trim()) ) {
                                editor.showNotification('Items count should be a number', 'warning', 3000);
                                return false;
                            }
                        },
                        setup: function( widget ) {
                            this.setValue(widget.data.items);
                        },
                        commit: function( widget ) {
                            widget.data.items = this.getValue();
                        }
                    }
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
                const markup = window.utilities.getTwoColumnTemplate();
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
                this.element.setHtml(window.utilities.getTwoColumnTemplate(widget.data.variant, widget.data.items));
                editor.insertHtml( '<br />' + this.element.getHtml() + '<br />' );
            }
        }
    };
} );