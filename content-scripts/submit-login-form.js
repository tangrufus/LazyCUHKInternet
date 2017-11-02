function onLoginPage() {
  const pageHTML = (document.getElementsByTagName("html")[0].innerHTML);
  return pageHTML.indexOf("Login to") > 0;
}

function hasLoginForm() {
  return (document.getElementById("user") !== null &&
    document.getElementById("password") !== null &&
    document.getElementById("regform") !== null);
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

function checkCredentialsAndSubmitLoginForm() {
  chrome.storage.local.get(["username", "password"], function(credentials) {
    if (!credentials.hasOwnProperty('username') || !credentials.hasOwnProperty('password')) {
      return;
    }

    submitLoginForm(credentials.username, credentials.password)
  });
}

function submitLoginForm(username, password) {
  document.getElementById("user").value = username;
  document.getElementById("password").value = password;
  document.getElementById("regform").submit();
}

if (onLoginPage() && hasLoginForm() && !hasErrorMessage()) {
  checkCredentialsAndSubmitLoginForm();
}
