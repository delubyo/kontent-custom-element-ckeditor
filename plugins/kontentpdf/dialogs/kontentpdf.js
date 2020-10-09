function selectKontentAssets() {
    return CustomElement.selectAssets({
        fileType: 'all',
        allowMultiple: false
    })
    .then(onAssetSelect)
}

function onAssetSelect([ asset ]) {
    return CustomElement.getAssetDetails([ asset.id ]);
}

CKEDITOR.dialog.add( 'kontentpdf', function( editor ) {
    return {
        title: 'PDF File',
        minWidth: 300,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'file',
                        type: 'text',
                        label: 'PDF File',
                        setup: function( widget ) {
                            this.setValue(widget.data.file);
                        },
                        commit: function( widget ) {
                            const file = this.getValue();
                            widget.data.file = file;
                        }
                    },
                    {
                        id: 'browse',
                        type: 'button',
                        label: 'Browse Server',
                        onClick(a) {
                            const dialog = this.getDialog();

                            selectKontentAssets()
                           .then(([file]) => {
                               if ( file.type === "application/pdf" ) {
                                   dialog.setValueOf('info', 'file', file.url);
                               }
                               else {
                                   alert('Please select a PDF File.');
                               }
                           });
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
                const markup = CKEditorShortCode.getTemplate('pdf');
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

            const markup = CKEditorShortCode.getTemplate('pdf', widget.data.file);

            if ( dialog.insertMode ) {
                this.element.setHtml(markup);
                editor.insertHtml( this.element.getHtml() );
            }
            else {
                const link = this.element.$.querySelector('a');
                this.element.$.firstElementChild.dataset.file = widget.data.file;
                link.href = widget.data.file;
                link.textContent = widget.data.file;
            }
        }
    };
} );