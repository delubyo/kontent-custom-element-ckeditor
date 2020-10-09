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
                               dialog.setValueOf('info', 'file', file.url);
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

            console.log('widget.data',widget.data);

            const markup = CKEditorShortCode.getTemplate('file', widget.data.file);

            if ( dialog.insertMode ) {
                this.element.setHtml(markup);
                console.log('file embed markup', markup);
                editor.insertHtml( this.element.getHtml() );
            }
            else {
                const url = widget.data.file;
                const fileName = url.split('/').pop().split('.')[0];
                const fileType = url.split('/').pop().split('.')[1];

                const fileNameNode = this.element.$.querySelector('.file__name');
                const fileMetaNode = this.element.$.querySelector('.file__meta');
                const downloadBtnNode = this.element.$.querySelector('.download__btn');

                if (fileNameNode) {
                    fileNameNode.innnerHTML = fileName;
                }

                if (fileMetaNode) {
                    fileMetaNode.innnerHTML = `.${ fileType }`;
                }

                if (downloadBtnNode) {
                    downloadBtnNode.setAttribute('href', url);
                    downloadBtnNode.setAttribute('download', fileName);
                }

                // const link = this.element.$.querySelector('a');
                // this.element.$.firstElementChild.dataset.file = widget.data.file;
                // link.href = widget.data.file;
                // link.textContent = widget.data.file;
            }
        },
        // onOk: function(widget) {
        //     const dialog = this;

        //     console.log('before commit content', widget);

        //     dialog.commitContent( widget );
            
        //     console.log('after commit content', widget);

        //     const markup = CKEditorShortCode.getTemplate('file', widget.data.file);

        //     if ( dialog.insertMode ) {
        //         this.element.setHtml(markup);
        //         editor.insertHtml( this.element.getHtml() );
        //     }
        //     else {
        //         const file = widget.data.file || {};
        //         console.log(file);
        //         const fileName = typeof file == 'object' && file.hasOwnProperty('fileName') ? file.fileName.split('.')[0] : '';
        //         const fileType = typeof file == 'object' && file.hasOwnProperty('fileName') ? file.fileName.split('.')[1] : '';
        //         const fileUrl = typeof file == 'object' && file.hasOwnProperty('url') ? file.url : '';
        //         const fileSize = typeof file == 'object' && file.hasOwnProperty('size') ? file.size : 0;

        //         let fileSizeString = '';
        //         if (fileSize > 0) {
        //             const kb = (fileSize / Math.pow(1024, 1));
        //             const mb = (fileSize / Math.pow(1024, 2));
                    
        //             fileSizeString = mb >= 1 ? `${mb.toFixed(0)}Mb` : `${kb.toFixed(0)}Kb`;
        //         }
            
        //         const fileNameNode = this.element.$.querySelector('.file__name');
        //         const fileMetaNode = this.element.$.querySelector('.file__meta');
        //         const downloadBtnNode = this.element.$.querySelector('.download__btn');

        //         if (fileNameNode) {
        //             fileNameNode.innnerHTML = fileName;
        //         }

        //         if (fileMetaNode) {
        //             fileMetaNode.innnerHTML = `.${ fileType } - ${ fileSizeString }`;
        //         }

        //         if (downloadBtnNode) {
        //             downloadBtnNode.setAttribute('href', fileUrl);
        //             downloadBtnNode.setAttribute('download', fileName);
        //         }
        //     }
        // }
    };
} );