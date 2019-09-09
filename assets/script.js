/* Init language translator */

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'ru',
    includedLanguages: 'ru,en,es,uk',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false,
    multilanguagePage: true
  }, 'google_translate_element');
  detectLanguageAttachClick();
}


function languageSelectorOnclick(e) {
  e.preventDefault();
  var theLang = this.getAttribute('data-lang');

  if (hasClass(this, "active")) {
    return;
  }

  window.location = this.getAttribute('href');
  location.reload();
}

function detectLanguageAttachClick() {

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

  // Attach translation flag to wrapper.
  var div_wrapper = document.getElementById('wrapper');
  addClass(div_wrapper, lang_active + '-translated');

  var language_selectors = document.getElementsByClassName('lang-select');

  for (var i = 0; i < language_selectors.length; i++) {
    // Add class to active language.
    if (language_selectors[i].getAttribute('data-lang') == lang_active) {
      addClass(language_selectors[i], 'active');
      addClass(language_selectors[i].parentElement, 'active');
    }

    language_selectors[i].onclick = languageSelectorOnclick;
  }
  document.getElementsByClassName('lang-select').onclick = languageSelectorOnclick;
}


