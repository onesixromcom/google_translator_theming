/* Init language translator */

/**
 *  Main function to init Google translator
 */
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'ru',
    includedLanguages: 'ru,en,es,uk',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false,
    multilanguagePage: true
  }, 'google_translate_element');
  initLanguageSelector();
}

/**
 * Click event for custom language selector.
 * @param event
 */
function languageSelectorOnclick(event) {
  event.preventDefault();
  var element = event.target || event.srcElement;
  if (element.nodeName === 'IMG')
    element = element.parentNode;

  if (hasClass(element, "active")) {
    return;
  }

  window.location = element.getAttribute('href');

  checkActiveLanguage(element.getAttribute('data-lang'));
  clickGoogleTranslatorLanguageSelector(element.getAttribute('data-lang-name'));
}

/**
 * Add classes to active language in selector.
 * @param lang_active
 */
function checkActiveLanguage(lang_active) {
  // Attach translation flag to wrapper.
  var div_wrapper = document.getElementById('wrapper');
  addClass(div_wrapper, lang_active + '-translated');

  Array.from(document.getElementsByClassName("lang-select")).forEach(
    function(element, index, array) {

      if (element.getAttribute('data-lang') !== lang_active){
        removeClass(element, 'active');
        removeClass(element.parentElement, 'active');
        return;
      }

      addClass(element, 'active');
      addClass(element.parentElement, 'active');
    }
  );
}

/**
 * Check current active language from cookies or hash.
 */
function initLanguageSelector() {
  var lang_current = getCookie('googtrans');
  var lang_active = 'en';

  // Get langcode from hash.
  var hash_current = window.location.hash;
  if (hash_current.indexOf("googtrans") > 0) {
    lang_current = hash_current.slice(11, 16);
    lang_current = lang_current.split('|');
    lang_active = lang_current[lang_current.length - 1];
  } else if (lang_current.length > 0) {
    lang_current = lang_current.split('/');
    lang_active = lang_current[lang_current.length - 1];
  }

  checkActiveLanguage(lang_active);

  Array.from(document.getElementsByClassName("lang-select")).forEach(
    function(element, index, array) {
       element.onclick = languageSelectorOnclick;
    }
  );
}

/**
 *  Click in Google Translator langauge selector.
 * @param lang_clicked
 */
function clickGoogleTranslatorLanguageSelector(lang_clicked) {
  var iff = document.getElementsByClassName('goog-te-menu-frame');
  if (iff.length > 0) {
    var menu = iff[0].contentDocument.getElementsByClassName('goog-te-menu2');
    var items = menu[0].getElementsByClassName('goog-te-menu2-item');

    for (var i = 0; i < items.length; i++) {
      var lang_text = items[i].getElementsByClassName('text');
      if (lang_text.length > 0 && lang_text[0].innerHTML === lang_clicked) {
        items[i].click();
      }
    }
  }
}
