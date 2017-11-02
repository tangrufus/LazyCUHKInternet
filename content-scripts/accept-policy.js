function onPolicyPage() {
  const pageHTML = (document.getElementsByTagName("html")[0].innerHTML);
  return pageHTML.indexOf("Use Policies and Guidelines of") > 0;
}

function findPolicyButton() {
  const buttons = document.getElementsByTagName("input");

  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].value.toLowerCase() == "accept") {
      return buttons[i];
    }
  }

  return null;
}

function hasPolicyButton() {
  return findPolicyButton() !== null;
}

function queryParam(name) {
  const results = new RegExp(
    "[?&]" +
    name.replace(/[\[\]]/g, "\\$&") +
    "(=([^&#]*)|&|#|$)"
  ).exec(window.location.href);
  if (!results) {
    return null
  };
  if (!results[2]) {
    return ''
  };
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

function hasErrorMessage() {
  const errorMessage = queryParam('errmsg');
  return (errorMessage !== null && errorMessage !== '');
}

function clickPolicyButton() {
  findPolicyButton().click();
}

if (onPolicyPage() && !hasErrorMessage() && hasPolicyButton()) {
  clickPolicyButton();
}
