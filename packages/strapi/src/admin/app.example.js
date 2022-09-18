if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    try{
      for(const r of registrations){
        if(r.active?.scriptURL?.endsWith('/url-encoder.js')){
          console.log('service worker already registered');
          return;
        }
      }
    }catch{}
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/url-encoder.js').then(function(registration) {
        console.log('Service worker registered with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  });
}

const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
};

const bootstrap = (app) => {

};

export default {
  config,
  bootstrap,
};
