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

CKEDITOR.dialog.add( 'kontentdownload', function( editor ) {
    return {
        title: 'Embed File',
        minWidth: 300,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'file',
                        type: 'text',
                        label: 'File',
                        setup: function( widget ) {
                            this.setValue(widget.data.file.url);
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
                                // file name: file.fileName (with file type already)
                                // file type: get it from file name
                                // file size: file.size
                               
                                dialog.setValueOf('info', 'file', file);
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
                const markup = CKEditorShortCode.getTemplate('file');
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

            const markup = CKEditorShortCode.getTemplate('file', widget.data.file);

            if ( dialog.insertMode ) {
                this.element.setHtml(markup);
                editor.insertHtml( this.element.getHtml() );
            }
            else {
                const file = widget.data.file;
                const fileName = file.fileName.split('.')[0];
                const fileType = file.fileName.split('.')[1];
                const fileUrl = file.url;
                const fileSize = file.size;

                const kb = (fileSize / Math.pow(1024, 1));
                const mb = (fileSize / Math.pow(1024, 2));
                const fileSizeString = mb >= 1 ? `${mb.toFixed(0)}Mb` : `${kb.toFixed(0)}Kb`;
            
                const fileNameNode = this.element.$.querySelector('.file__name');
                const fileMetaNode = this.element.$.querySelector('.file__meta');
                const downloadBtnNode = this.element.$.querySelector('.download__btn');

                if (fileNameNode) {
                    fileNameNode.innnerHTML = fileName;
                }

                if (fileMetaNode) {
                    fileMetaNode.innnerHTML = `.${ fileType } - ${ fileSizeString }`;
                }

                if (downloadBtnNode) {
                    downloadBtnNode.setAttribute('href', fileUrl);
                    downloadBtnNode.setAttribute('download', fileName);
                }
            }
        }
    };
} );