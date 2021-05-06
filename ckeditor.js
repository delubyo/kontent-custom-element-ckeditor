CKEDITOR.disableAutoInline = true;
AUTOSAVE_INTERVAL = 15000;

let item_url_macro = "{codename}";
let projectId;
var Kc;
var deliveryClient;

CustomElement.init((element, context) => {
  projectId = context.projectId;
  initializeCKEditor(element);
});

CKEDITOR.addStylesSet('customstyleset', [
  {
    name: 'Heading 2',
    element: 'h2',
  },
  {
    name: 'Heading 3',
    element: 'h3',
  },
  {
    name: 'Paragraph',
    element: 'p',
  },
  {
    name: 'Footnote',
    element: 'small',
  },
]);

function initializeCKEditor(element, basePath = '/kontent-custom-element-ckeditor') {
	const additionalPlugins = [
		'kontentimage',
		'kontentlink',
		// 'kontentshortcode',
		'kontentyoutube',
		'kontentvimeo',
		'kontentfacebook',
    'kontentpartnergriditems',
    'kontentcolumns',
    'kontentforms',
    'kontentpdf',
    'kontentdownload',
    'kontentvotervoice',
	];

	additionalPlugins.forEach(pluginName => {
		CKEDITOR.plugins.addExternal(
	    pluginName,
	    `${basePath}/plugins/${pluginName}/`,
	    "plugin.js"
	  );
	});

  let config = {
    skin: "moono-lisa",
    customConfig: `${basePath}/config.js`,
    extraPlugins: "autogrow," + additionalPlugins.join(','),
    removePlugins: "resize,image,elementspath,link,iframe",
    allowedContent: true,
    autoGrow_minHeight: 600,
    autoGrow_onStartup: true,
    autoGrow_maxHeight: 950,
    customJsImageBrowser: true, // use our custom asset selector as image browser
    customJsImageMethod: selectAndGetAsset, // promise returning the images URL,
    customJsLinkBrowser: true,
    linkShowAdvancedTab: true,
    customJsLinkMethod: selectAndGetItem,
    contentsCss: [
      'ckeditor-styles.css',
      'ckeditor-additional-styles.css',
    ],
    bodyClass: 'article-body__wrapper',
  };

  config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'outdent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
  ];

  config.removeButtons = 'Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,CopyFormatting,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Flash,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Font,FontSize,TextColor,BGColor,Maximize,ShowBlocks,About,Format';

  /* load toolbar config from element settings if present */
  if (element.config) {
    let toolbar = element.config.toolbar;
    if (toolbar) config.toolbarGroups = toolbar;
    item_url_macro = element.config.itemUrlMacro; // load url macro for item hyperlinks
  }

  // config.toolbarGroups = config.toolbarGroups || [];
  // config.toolbarGroups.push({
  //   name: 'kentico_toolbar',
  //   groups: [ 'document' ]
  // });

  CKEDITOR.config.stylesCombo_stylesSet = 'customstyleset';

  /* on dialog definition */
  CKEDITOR.on('dialogDefinition', function(evt) {
    const dialog = evt.data;

    if (dialog.name === 'table') {
      const def = evt.data.definition;

      // remove advance tab
      def.removeContents('advanced');

      // remove fields
      const info = def.getContents('info');
      info.remove('txtWidth');
      info.remove('txtHeight');
      info.remove('txtCaption');
      info.remove('txtSummary');
    }
  });

  let ckeditor = CKEDITOR.replace("editor", config);

  /* what to do on autogrow */
  ckeditor.on("resize", updateElementHeight);

  /* on editor load */
  ckeditor.on("instanceReady", function () {
    // reposition so there are no unnecessary toolbars
    document.getElementById("cke_editor").style.margin = "-2px 0px 0px -2px";

    // setup readonly on disable
    CustomElement.onDisabledChanged(readonly => {
      ckeditor.setReadOnly(readonly);
    });

    // Convert raw HTML with shortcodes
    const html = CKEditorShortCode.formatHTML(element.value);

    // load data and view them in the editor
    ckeditor.setData(html);

    // resizes editor to initial height
    updateElementHeight();

    Kc = window['kontentDelivery'];

    deliveryClient = new Kc.DeliveryClient({
			projectId: projectId
		});
  });

  /* on editor blur */
  ckeditor.on("blur", function () {
    save(ckeditor);
  });

  /* periodic saving timer */
  let saveTimer = setInterval(function () {
    save(ckeditor);
  }, AUTOSAVE_INTERVAL);
}

/* Saves custom element value */
function save(ckeditor) {
  let data = ckeditor.getData();
  // if the editor contains invisible tags save empty (so required flag is not triggered)
  if (data.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;|\s/g, '') == "") data = null;
  CustomElement.setValue(data);
}

/* Displays asset selector and returns URL of the selected asset */
function selectAndGetAsset() {
  return new Promise((resolve, reject) => {
    CustomElement.selectAssets({
      allowMultiple: false,
      fileType: "images"
    }).then(results => {
      if (results.length > 0) {
        CustomElement.getAssetDetails(results.map(e => e.id)).then(
          assets => {
            if (assets[0]) resolve(assets[0].url);
            resolve(null);
          }
        );
      }
    });
  });
}

/* Displays content item selector and returns url of the selected content item */
function selectAndGetItem() {
  return new Promise((resolve, reject) => {
    CustomElement.selectItems({ allowMultiple: false }).then((results) => {
      if (results.length > 0) {
        CustomElement.getItemDetails(results.map(e => e.id)).then(async (items) => {
            if (items[0]) {
              deliveryClient.item(items[0].codename)
                .toPromise()
                .then(async (response) => {
                  let url;

                  switch (items[0].type.codename) {
                    case 'ncoa_article_content': {
                      url = `article/${response.item.url.value}`;
                      console.log(url);
                      break;
                    }
                    case 'standard_page': {
                      // has parent page
                      if (response.item.parent_page.itemCodenames.length > 0) {
                        const parentPageCodename = response.item.parent_page.itemCodenames[0];
                        const parentPageURLSlug = await deliveryClient.item(parentPageCodename).toPromise().then((parentPageRaw) => parentPageRaw.item.url.value);
                        url = `page/${parentPageURLSlug}/${response.item.url.value}`;
                      } else {
                        url = `page/${response.item.url.value}`;
                      }
                      break;
                    }
                    case 'standard_page__special': {
                      url = `page/${response.item.url.value}`;
                      break;
                    }
                    case 'taxonomy_custom_content': {
                      url = response.item.category_page_url.value;
                      break;
                    }
                    case 'template___audience_page': {
                      url = response.item.audience_page_url.value;
                      break;
                    }
                  }

                  resolve(item_url_macro.replace("{codename}", url));
                });
            } else {
              resolve(null);
            }
          }
        );
      }
    });
  });
}

/* Resizes custom element iframe based on document height. Won't pass MAX_HEIGHT. */
function updateElementHeight() {
  const height = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  );
  setTimeout(function(){
  CustomElement.setHeight(height);
}, 1000);
}

// If local testing, load immediately
if ( location.hostname === 'localhost' ) {
  document.addEventListener('DOMContentLoaded', () => {
    initializeCKEditor(document.getElementById('editor'), '');
  });
}
