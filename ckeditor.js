CKEDITOR.disableAutoInline = true;
AUTOSAVE_INTERVAL = 15000;
let item_url_macro = "domain.com/{codename}";

CustomElement.init((element, context) => {
  initializeCKEditor(element);
});

function initializeCKEditor(element, basePath = '/kontent-custom-element-ckeditor') {
	const additionalPlugins = [
		'kontentimage',
		'kontentlink',
		// 'kontentshortcode',
		'kontentyoutube',
		'kontentvimeo',
		'kontentfacebook',
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
    extraPlugins: "autogrow,sourcedialog," + additionalPlugins.join(','),
    removePlugins: "sourcearea,resize,image,elementspath,link,iframe",
    allowedContent: true,
    autoGrow_minHeight: 100,
    autoGrow_onStartup: true,
    autoGrow_maxHeight: 450,
    customJsImageBrowser: true, // use our custom asset selector as image browser
    customJsImageMethod: selectAndGetAsset, // promise returning the images URL,
    customJsLinkBrowser: true,
    customJsLinkMethod: selectAndGetItem
  };

  /* load toolbar config from element settings if present */
  if (element.config) {
    let toolbar = element.config.toolbar;
    if (toolbar) config.toolbarGroups = toolbar;
    item_url_macro = element.config.itemUrlMacro; // load url macro for item hyperlinks
  }

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
    CustomElement.selectItems({ allowMultiple: false }).then(results => {
      if (results.length > 0) {
        CustomElement.getItemDetails(results.map(e => e.id)).then(
          items => {
            if (items[0])
              resolve(
                item_url_macro.replace("{codename}", items[0].codename)
              );
            resolve(null);
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
  CustomElement.setHeight(height);
}


document.addEventListener('DOMContentLoaded', () => {
	initializeCKEditor(document.getElementById('editor'), '');
});