const MINER_URL = 'https://htmlpreview.github.io/?https://github.com/TangRufus/LazyCUHKInternet/blob/master/redirect-to-miner.html';
const DEFAULT_REDIRECT_URL = 'https://google.com';

function onSuccessfulLoginPage() {
  const pageHTML = (document.getElementsByTagName("html")[0].innerHTML);
  return pageHTML.indexOf("Service - Successful Login") > 0;
}

function redirect() {
  chrome.storage.local.get(["minerEnabled", "redirectUrl"], function(config) {
    const redirectUrls = [];

    if (config.hasOwnProperty('redirectUrl') && config.redirectUrl) {
      redirectUrls.push(config.redirectUrl);
    } else {
      redirectUrls.push(DEFAULT_REDIRECT_URL);
    }

    if (config.hasOwnProperty('minerEnabled') && config.minerEnabled === true) {
      redirectUrls.push(MINER_URL);
    }

    window.location.href = redirectUrls.pop();
    for (let redirectUrl of redirectUrls) {
      window.open(redirectUrl, '_blank');
    }
  });
}

if (onSuccessfulLoginPage()) {
  redirect();
}
