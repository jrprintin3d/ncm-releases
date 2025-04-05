const ids = {
  settingsTitle: "settingsTitle",
  apModeText: "ap-mode-text",
  apModeOnly: "apModeOnly",
  apModeTimeout: "apModeTimeout",
  ssid: "ssid",
  password: "password",
  updateWiFiButton: "update-wifi-button",
  togglePasswordButton: "toggle-password",
  currentDate: "currentDate",
  currentTime: "currentTime",
  timeZone: "timeZone",
  ntpUpdatesEnabled: "ntpUpdatesEnabled",
  ntpUpdatesEnabledCheckbox: "ntpUpdatesEnabledCheckbox",
  ntpWarning: "ntpWarning",
  useDreiviertel: "useDreiviertel",
  displayMode: "displayMode",
  clockLayout: "clockLayout",
  brightness: "brightness",
  red: "red",
  green: "green",
  blue: "blue",
  rainbowMode: "rainbowMode",
  rainbowModeLabel: "rainbowModeLabel",
  nightModeSettings: "nightModeSettings",
  nightLEDSettings: "nightLEDSettings",
  nightMode: "nightMode",
  nightmodeStart: "nightmodeStart",
  nightmodeEnd: "nightmodeEnd",
  nightBrightness: "nightBrightness",
  nightRed: "nightRed",
  nightGreen: "nightGreen",
  nightBlue: "nightBlue",
  searchUpdateButton: "searchUpdateButton",
  currentVersionBadge: "currentVersionBadge",
  buildDateBadge: "buildDateBadge",
  softwareVersion: "softwareVersion",
  buildDate: "buildDate",
  newVersionBadge: "newVersionBadge",
  availableVersions: "availableVersions",
  availableVersionsBadgeLabel: "availableVersionsBadgeLabel",
  updateButton: "updateButton",
  releaseNotesActual: "releaseNotesActual",
  releaseNotesActualLabel: "releaseNotesActualLabel",
  releaseNotesNew: "releaseNotesNew",
  releaseNotesNewLabel: "releaseNotesNewLabel",
  updateButtonAPTextWarning: "updateButtonAPTextWarning",
  factoryResetButton: "factory-reset-button",
  overlay: "overlay",
  progressBar: "progressBar",
  wifiSettings: "wifiSettings",
  apModeOnlyLabel: "apModeOnlyLabel",
  apModeTimeoutLabel: "apModeTimeoutLabel",
  ssidLabel: "ssidLabel",
  passwordLabel: "passwordLabel",
  timeSettings: "timeSettings",
  currentDateLabel: "currentDateLabel",
  currentTimeLabel: "currentTimeLabel",
  timeZoneLabel: "timeZoneLabel",
  ntpUpdatesEnabledLabel: "ntpUpdatesEnabledLabel",
  ntpWarningText: "ntpWarningText",
  dreiviertel: "dreiviertel",
  viertel: "viertel",
  exact: "exact",
  approx: "approx",
  layout: "layout",
  useDreiviertelLabel: "useDreiviertelLabel",
  displayModeLabel: "displayModeLabel",
  clockLayoutLabel: "clockLayoutLabel",
  ledSettings: "ledSettings",
  brightnessLabel: "brightnessLabel",
  redLabel: "redLabel",
  greenLabel: "greenLabel",
  blueLabel: "blueLabel",
  nightModeSettings: "nightModeSettings",
  nightModeLabel: "nightModeLabel",
  nightmodeStartLabel: "nightmodeStartLabel",
  nightmodeEndLabel: "nightmodeEndLabel",
  nightBrightnessLabel: "nightBrightnessLabel",
  nightRedLabel: "nightRedLabel",
  nightGreenLabel: "nightGreenLabel",
  nightBlueLabel: "nightBlueLabel",
  forceNightModeButton: "forceNightModeButton",
  forceNightModeButtonLabel: "forceNightModeButtonLabel",
  updateSection: "updateSection",
  currentVersionBadgeLabel: "currentVersionBadgeLabel",
  buildDateBadgeLabel: "buildDateBadgeLabel",
  factoryResetButtonLabel: "factoryResetButtonLabel",
  factoryResetButton: "factoryResetButton",
  copyright: "copyright",
  websiteLink: "websiteLink",
  languageSelectLabel: "languageSelectLabel",
  languageSelect: "languageSelect",


  //Popuptext Labels
  errorUpdateSettings: "errorUpdateSettings",
  noUpdateAvailable: "noUpdateAvailable",
  errorUpdateWifiSettings: "errorUpdateWifiSettings",
  restartDeviceTextAfterUpdateSettings: "restartDeviceTextAfterUpdateSettings",
  restartDeviceTextAfterResetSettings: "restartDeviceTextAfterResetSettings",
  errorUpdateTimeSettings: "errorUpdateTimeSettings",
  errorMessageGeneral: "errorMessageGeneral",
  errorUpdateLEDSettings: "errorUpdateLEDSettings",
  errorUpdateNightLEDSettings: "errorUpdateNightLEDSettings",
  errorForceNightmode: "errorForceNightmode",
  errorResetSettings: "errorResetSettings",
  errorSearchUpdate: "errorSearchUpdate",
  errorNoReleasesNotesAvailable: "errorNoReleasesNotesAvailable",
  errorLoadingReleaseNotes: "errorLoadingReleaseNotes",
  startUpdateConfirmTitle: "startUpdateConfirmTitle",
  startUpdateConfirmText: "startUpdateConfirmText",
  startUpdateConfirmButton: "startUpdateConfirmButton",
  startUpdateCancelButton: "startUpdateCancelButton",
  startUpdateErrorStart: "startUpdateErrorStart",
  startUpdateServerError: "startUpdateServerError",
  startUpdateUpdateFailed: "startUpdateUpdateFailed",
  startUpdateUpdateCancelled: "startUpdateUpdateCancelled",
  startUpdateSuccess: "startUpdateSuccess"
};

const translations = {};
var siteLanguage = {};

// Variablen deklarieren
let timeUpdateInterval;
let timeUpdatePaused = false;

// Funktion zum Starten des Zeit-Updates
function startUpdatingTime() {
  if (!timeUpdatePaused) {
    timeUpdateInterval = setInterval(updateCurrentTime, 5000); // Aktualisiert die Zeit alle 5 Sekunden
  }
}

// Funktion zum Anhalten des Zeit-Updates
function pauseTimeUpdate() {
  timeUpdatePaused = true;
  clearInterval(timeUpdateInterval);
}

// Funktion zum Fortsetzen des Zeit-Updates
function resumeTimeUpdate() {
  timeUpdatePaused = false;
  startUpdatingTime();
}

// Funktion zum Aktualisieren der aktuellen Zeit
function updateCurrentTime() {
  fetch("/getCurrentTime")
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          return response.json().then((errorMessage) => {
            console.error(
              "Fehler beim Abrufen der aktuellen Zeit: " + errorMessage.message
            );
            throw new Error(errorMessage.message);
          });
        } else {
          throw new Error("Fehlerhafte Antwort vom Server");
        }
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById(ids.currentTime).value = data.currentTime;
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der aktuellen Zeit:", error)
    );
}

// Load translations and set initial language when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initialize();
  loadTranslations();
  // Event-Listener für den Regenbogen-Modus-Schalter
  const rainbowModeCheckbox = document.getElementById(ids.rainbowMode);
  if (rainbowModeCheckbox) {
    rainbowModeCheckbox.addEventListener('change', () => 
      updateColorSliders(rainbowModeCheckbox.checked)
    );
    
    // Initialisiere Farbslider-Zustand basierend auf aktuellem Regenbogen-Modus
    updateColorSliders(rainbowModeCheckbox.checked);
  }
  startUpdatingTime();
});

function loadTranslations() {
  fetch('/translations.json')
    .then(response => response.json())
    .then(data => {
      Object.assign(translations, data);
      console.log('Translations loaded:', translations);
      applyTranslations(document.getElementById(ids.languageSelect).value); // Set the initial language
    })
    .catch(error => console.error('Error loading translations:', error));
}

function applyTranslations(language) {
  if (!translations[language]) {
    console.error('Translations for language not found:', language);
    return;
  }
  siteLanguage = language;
  document.getElementById(ids.settingsTitle).textContent = translations[language].settingsTitle;
  document.getElementById(ids.apModeText).innerHTML = translations[language].apModeText;
  document.getElementById(ids.wifiSettings).textContent = translations[language].wifiSettings;
  document.getElementById(ids.apModeOnlyLabel).textContent = translations[language].apModeOnly;
  document.getElementById(ids.apModeTimeoutLabel).textContent = translations[language].apModeTimeout;
  document.getElementById(ids.ssidLabel).textContent = translations[language].ssidLabel;
  document.getElementById(ids.passwordLabel).textContent = translations[language].passwordLabel;
  document.getElementById(ids.updateWiFiButton).value = translations[language].updateWiFiButton;
  document.getElementById(ids.timeSettings).textContent = translations[language].timeSettings;
  document.getElementById(ids.currentDateLabel).textContent = translations[language].currentDate;
  document.getElementById(ids.currentTimeLabel).textContent = translations[language].currentTime;
  document.getElementById(ids.timeZoneLabel).textContent = translations[language].timeZoneLabel;
  document.getElementById(ids.ntpUpdatesEnabledLabel).textContent = translations[language].ntpUpdatesEnabledLabel;
  document.getElementById(ids.ntpWarningText).textContent = translations[language].ntpWarningText;
  document.getElementById(ids.useDreiviertelLabel).textContent = translations[language].useDreiviertelLabel;
  document.getElementById(ids.dreiviertel).textContent = translations[language].dreiviertel;
  document.getElementById(ids.viertel).textContent = translations[language].viertel;
  document.getElementById(ids.displayModeLabel).textContent = translations[language].displayModeLabel;
  document.getElementById(ids.exact).textContent = translations[language].exact;
  document.getElementById(ids.approx).textContent = translations[language].approx;
  document.getElementById(ids.clockLayoutLabel).textContent = translations[language].clockLayoutLabel;
  document.getElementById(ids.ledSettings).textContent = translations[language].ledSettings;
  document.getElementById(ids.brightnessLabel).textContent = translations[language].brightness;
  document.getElementById(ids.redLabel).textContent = translations[language].red;
  document.getElementById(ids.greenLabel).textContent = translations[language].green;
  document.getElementById(ids.blueLabel).textContent = translations[language].blue;
  document.getElementById(ids.rainbowModeLabel).textContent = translations[language].rainbowModeLabel;
  document.getElementById(ids.nightModeSettings).textContent = translations[language].nightModeSettings;
  document.getElementById(ids.nightModeLabel).textContent = translations[language].nightMode;
  document.getElementById(ids.nightmodeStartLabel).textContent = translations[language].nightmodeStart;
  document.getElementById(ids.nightmodeEndLabel).textContent = translations[language].nightmodeEnd;
  document.getElementById(ids.nightBrightnessLabel).textContent = translations[language].nightBrightness;
  document.getElementById(ids.nightRedLabel).textContent = translations[language].nightRed;
  document.getElementById(ids.nightGreenLabel).textContent = translations[language].nightGreen;
  document.getElementById(ids.nightBlueLabel).textContent = translations[language].nightBlue;
  document.getElementById(ids.forceNightModeButton).value = translations[language].forceNightModeButtonText;
  document.getElementById(ids.forceNightModeButtonLabel).textContent = translations[language].forceNightModeButtonLabel;
  document.getElementById(ids.updateSection).textContent = translations[language].updateSection;
  document.getElementById(ids.currentVersionBadgeLabel).textContent = translations[language].currentVersionBadgeLabel;
  document.getElementById(ids.availableVersionsBadgeLabel).innerHTML = translations[language].availableVersionsBadgeLabel;
  document.getElementById(ids.buildDateBadgeLabel).textContent = translations[language].buildDateBadgeLabel;
  document.getElementById(ids.searchUpdateButton).value = translations[language].searchUpdateButton;
  document.getElementById(ids.updateButtonAPTextWarning).innerHTML = translations[language].updateButtonAPTextWarning;
  document.getElementById(ids.updateButton).value = translations[language].updateButton;
  document.getElementById(ids.releaseNotesNewLabel).innerHTML = translations[language].releaseNotesNewLabel;
  document.getElementById(ids.releaseNotesActualLabel).innerHTML = translations[language].releaseNotesActualLabel;
  document.getElementById(ids.factoryResetButtonLabel).textContent = translations[language].factoryResetButtonLabel;
  document.getElementById(ids.factoryResetButton).value = translations[language].factoryResetButton;
  document.getElementById(ids.copyright).textContent = translations[language].copyright;
  document.getElementById(ids.websiteLink).textContent = translations[language].websiteLink;
  document.getElementById(ids.languageSelectLabel).textContent = translations[language].languageSelectLabel;

}

document.getElementById(ids.languageSelect).addEventListener('change', () => {
  changeLanguage();
  updateLanguageSettings();
});

function changeLanguage() {
  var selectedLanguage = document.getElementById(ids.languageSelect).value;
  console.log('Language selected: ', selectedLanguage);
  applyTranslations(selectedLanguage);
  loadLocalReleaseNotes();
}
async function updateLanguageSettings() {
  const formData = {
    language: document.getElementById(ids.languageSelect).value.trim(),
  };

  console.log("Form Data:", formData);
  const params = new URLSearchParams(formData).toString();
  try {
    const response = await fetch("/updateLanguage", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      alert(translations[siteLanguage].errorUpdateSettings + errorMessage);
    } else {
      const data = await response.text();
      console.log("Answer from the server: ", data);
    }
  } catch (error) {
    console.error("Error: ", error);
    alert(translations[siteLanguage].errorUpdateSettings);
  }
}
function initialize() {
  initializeAPModeFields();
  loadSettingsWithRetry(5, 500);
  checkAPMode();
  startUpdatingTime();
}

function initializeAPModeFields() {
  const apModeOnly = document.getElementById(ids.apModeOnly);
  const apModeTimeout = document.getElementById(ids.apModeTimeout);
  const ssidField = document.getElementById(ids.ssid);
  const passwordField = document.getElementById(ids.password);

  toggleAPModeFields();
  apModeOnly.addEventListener('change', toggleAPModeFields);
}

function toggleAPModeFields() {
  const apModeOnly = document.getElementById(ids.apModeOnly);
  const apModeTimeout = document.getElementById(ids.apModeTimeout);
  const ssidField = document.getElementById(ids.ssid);
  const passwordField = document.getElementById(ids.password);

  if (apModeOnly.checked) {
    ssidField.disabled = true;
    passwordField.disabled = true;
    apModeTimeout.disabled = false;
  } else {
    ssidField.disabled = false;
    passwordField.disabled = false;
    apModeTimeout.disabled = true;
    apModeTimeout.value = "5";
  }
}

function loadSettingsWithRetry(maxRetries, retryDelay) {
  let retryCount = 0;

  function attemptLoadSettings() {
    if (retryCount >= maxRetries) {
      console.error("Maximum number of attempts reached, settings could not be loaded.");
      return;
    }

    retryCount++;

    if (areElementsPresent()) {
      loadSettings();
    } else {
      console.warn(`Attempt ${retryCount}: Elements not yet available, try again in ${retryDelay}ms...`);
      setTimeout(attemptLoadSettings, retryDelay);
    }
  }

  attemptLoadSettings();
}

function areElementsPresent() {
  return document.getElementById(ids.currentVersionBadge) && document.getElementById(ids.buildDateBadge);
}

function loadSettings() {
  fetch("/getSettings")
    .then((response) => response.json())
    .then((data) => {
      console.log("Received settings:", data);
      document.getElementById(ids.apModeOnly).checked = Boolean(data.apModeOnly);
      document.getElementById(ids.apModeTimeout).value = data.apModeTimeout;
      document.getElementById(ids.ssid).value = data.ssid;
      document.getElementById(ids.timeZone).value = parseInt(data.timeZone);
      document.getElementById(ids.currentDate).value = data.currentDate;
      document.getElementById(ids.currentTime).value = data.currentTime;
      document.getElementById(ids.ntpUpdatesEnabled).checked = Boolean(data.ntpUpdatesEnabled);
      document.getElementById(ids.displayMode).value = data.displayMode ? "true" : "false";
      document.getElementById(ids.useDreiviertel).value = data.useDreiviertel ? "true" : "false";
      document.getElementById(ids.clockLayout).value = data.clockLayout;
      document.getElementById(ids.brightness).value = data.brightness;
      document.getElementById(ids.red).value = data.red;
      document.getElementById(ids.green).value = data.green;
      document.getElementById(ids.blue).value = data.blue;
      document.getElementById(ids.rainbowMode).checked = Boolean(data.rainbowMode);
      document.getElementById(ids.nightMode).checked = Boolean(data.nightMode);
      document.getElementById(ids.nightmodeStart).value = data.nightmodeStartHour.toString().padStart(2, '0') + ':' + data.nightmodeStartMinute.toString().padStart(2, '0');
      document.getElementById(ids.nightmodeEnd).value = data.nightmodeEndHour.toString().padStart(2, '0') + ':' + data.nightmodeEndMinute.toString().padStart(2, '0');
      document.getElementById(ids.nightBrightness).value = data.nightBrightness;
      document.getElementById(ids.nightRed).value = data.nightRed;
      document.getElementById(ids.nightGreen).value = data.nightGreen;
      document.getElementById(ids.nightBlue).value = data.nightBlue;
      document.getElementById(ids.languageSelect).value = data.language;


      const currentVersionBadge = document.getElementById(ids.currentVersionBadge);
      const buildDateBadge = document.getElementById(ids.buildDateBadge);

      if (currentVersionBadge) {
        currentVersionBadge.textContent = data.softwareVersion;
      } else {
        console.error("currentVersionBadge Element not found");
      }

      if (buildDateBadge) {
        buildDateBadge.textContent = data.buildDate;
      } else {
        console.error("buildDateBadge Element not found");
      }

      toggleAPModeFields();
    })
    .catch((error) => console.error("Error loading the settings: ", error));
}

function checkAPMode() {
  fetch("/checkAPMode")
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          return response.json().then((errorMessage) => {
            console.error("Error when checking the AP mode: " + errorMessage.message);
            throw new Error(errorMessage.message);
          });
        } else {
          throw new Error("Incorrect response from the server");
        }
      }
      return response.json();
    })
    .then((data) => {
      if (data.isAPMode) {
        disableOnlineFeatures();
      }
    })
    .catch((error) => console.error("Error when checking the AP mode: ", error));
}

function disableOnlineFeatures() {
  document.getElementById(ids.apModeText).style.display = "block";
  document.getElementById(ids.searchUpdateButton).style.display = "none";
  document.getElementById(ids.searchUpdateButton).disabled = true;
  document.getElementById(ids.availableVersions).style.display = "none";
  document.getElementById(ids.availableVersionsBadgeLabel).style.display = "none";
  document.getElementById(ids.updateButtonAPTextWarning).style.display = "block";
  document.getElementById(ids.ntpUpdatesEnabled).disabled = true;
  document.getElementById(ids.ntpWarning).style.display = "inline";
  document.getElementById(ids.ntpUpdatesEnabledCheckbox).style.display = "none";
}

function togglePassword() {
  const passwordField = document.getElementById(ids.password);
  const togglePasswordIcon = document.getElementById(ids.togglePasswordButton);
  const passwordFieldType = passwordField.getAttribute("type");

  if (passwordFieldType === "password") {
    passwordField.type = "text";
    togglePasswordIcon.textContent = "🙈";
  } else {
    passwordField.type = "password";
    togglePasswordIcon.textContent = "👁️";
  }
}

async function updateWiFiSettings() {
  const formData = {
    ssid: document.getElementById(ids.ssid).value.trim(),
    password: document.getElementById(ids.password).value.trim(),
    apModeOnly: document.getElementById(ids.apModeOnly).checked ? "true" : "false",
    apModeTimeout: document.getElementById(ids.apModeTimeout).value.trim(),
  };

  if (!formData.password) {
    delete formData.password;
  }

  if (!formData.ssid) {
    delete formData.ssid;
  }

  console.log("Form Data:", formData);
  const params = new URLSearchParams(formData).toString();
  try {
    const response = await fetch("/updateWiFi", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      alert(translations[siteLanguage].errorUpdateWifiSettings + errorMessage);
    } else {
      const data = await response.text();
      console.log("Answer from the server: ", data);
      alert(translations[siteLanguage].restartDeviceTextAfterUpdateSettings);
      window.location.href = "/restartESP";
    }
  } catch (error) {
    console.error("Error: ", error);
    alert(translations[siteLanguage].errorUpdateSettings);
  }
}

async function updateTimeSettings() {
  const formData = {
    currentDate: document.getElementById(ids.currentDate).value,
    currentTime: document.getElementById(ids.currentTime).value,
    timeZone: document.getElementById(ids.timeZone).value.trim(),
    ntpUpdatesEnabled: document.getElementById(ids.ntpUpdatesEnabled).checked,
    useDreiviertel: document.getElementById(ids.useDreiviertel).value === "true",
    displayMode: document.getElementById(ids.displayMode).value === "true",
  };
  console.log("Form Data:", formData);

  const params = new URLSearchParams(formData).toString();

  try {
    const response = await fetch("/updateTime", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      if (response.status === 404) {
        const errorMessage = await response.json();
        alert(translations[siteLanguage].errorUpdateTimeSettings + errorMessage.message);
      } else {
        alert(translations[siteLanguage].errorMessageGeneral + response.statusText);
      }
    } else {
      const data = await response.text();
    }
  } catch (error) {
    alert(translations[siteLanguage].errorUpdateTimeSettings);
    console.error("Error:", error);
  }
}

async function updateLEDSettings() {
  const formData = {
    brightness: document.getElementById(ids.brightness).value,
    red: document.getElementById(ids.red).value,
    green: document.getElementById(ids.green).value,
    blue: document.getElementById(ids.blue).value,
    rainbowMode: document.getElementById(ids.rainbowMode).checked,
  };
  console.log("Form Data:", formData);

  // Aktualisiere die UI basierend auf dem Regenbogen-Modus-Status
  updateColorSliders(formData.rainbowMode);

  const params = new URLSearchParams(formData).toString();
  try {
    const response = await fetch("/updateLED", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      if (response.status === 404) {
        const errorMessage = await response.json();
        alert(translations[siteLanguage].errorUpdateLEDSettings + errorMessage.message);
      } else {
        throw new Error("Incorrect response from the server ");
      }
    } else {
      const data = await response.text();
    }
  } catch (error) {
    console.error("Error:", error);
    alert(translations[siteLanguage].errorUpdateLEDSettings + errorMessage.message);
  }
}
// Funktion zum Aktualisieren der Farbslider basierend auf dem Regenbogen-Modus
function updateColorSliders(rainbowModeEnabled) {
  const redSlider = document.getElementById(ids.red);
  const greenSlider = document.getElementById(ids.green);
  const blueSlider = document.getElementById(ids.blue);
  const redLabel = document.getElementById(ids.redLabel);
  const greenLabel = document.getElementById(ids.greenLabel);
  const blueLabel = document.getElementById(ids.blueLabel);

  if (rainbowModeEnabled) {
    // Deaktiviere die Farbslider und mache sie transparent
    redSlider.disabled = true;
    greenSlider.disabled = true;
    blueSlider.disabled = true;
    redSlider.style.opacity = "0.5";
    greenSlider.style.opacity = "0.5";
    blueSlider.style.opacity = "0.5";
    redLabel.style.opacity = "0.5";
    greenLabel.style.opacity = "0.5";
    blueLabel.style.opacity = "0.5";
  } else {
    // Aktiviere die Farbslider und mache sie vollständig sichtbar
    redSlider.disabled = false;
    greenSlider.disabled = false;
    blueSlider.disabled = false;
    redSlider.style.opacity = "1";
    greenSlider.style.opacity = "1";
    blueSlider.style.opacity = "1";
    redLabel.style.opacity = "1";
    greenLabel.style.opacity = "1";
    blueLabel.style.opacity = "1";
  }
}

async function updateNightLEDSettings() {
  const nightmodeStart = document.getElementById(ids.nightmodeStart).value.split(':');
  const nightmodeEnd = document.getElementById(ids.nightmodeEnd).value.split(':');

  const formData = {
    nightMode: document.getElementById(ids.nightMode).checked,
    nightBrightness: document.getElementById(ids.nightBrightness).value,
    nightRed: document.getElementById(ids.nightRed).value,
    nightGreen: document.getElementById(ids.nightGreen).value,
    nightBlue: document.getElementById(ids.nightBlue).value,
    nightmodeStartHour: nightmodeStart[0],
    nightmodeStartMinute: nightmodeStart[1],
    nightmodeEndHour: nightmodeEnd[0],
    nightmodeEndMinute: nightmodeEnd[1]
  };
  console.log("Form Data:", formData);

  const params = new URLSearchParams(formData).toString();
  try {
    const response = await fetch("/updateNightLED", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      if (response.status === 404) {
        const errorMessage = await response.json();
        alert(translations[siteLanguage].errorUpdateNightLEDSettings + ": " + errorMessage.message);
      } else {
        throw new Error("Incorrect response from the server");
      }
    } else {
      const data = await response.text();
    }
  } catch (error) {
    console.error("Error: ", error);
    alert(translations[siteLanguage].errorUpdateNightLEDSettings + ": " + errorMessage.message);
  }
}

async function forceNightMode() {
  try {
    const response = await fetch("/forceNightMode", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        const errorMessage = await response.json();
        alert(translations[siteLanguage].errorForceNightmode + ": " + errorMessage.message);
      } else {
        throw new Error("Incorrect response from the server");
      }
    } else {
      const data = await response.text();
    }
  } catch (error) {
    console.error("Error: ", error);
    alert(translations[siteLanguage].errorForceNightmode + ": " + errorMessage.message);
  }
}
async function updateLayout() {
  var layout = document.getElementById(ids.clockLayout).value;
  var formData = {
    layout: layout
  };
  console.log("Layout Data:", formData);

  var params = new URLSearchParams(formData).toString();
  try {
    const response = await fetch("/updateLayout", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      if (response.status === 404) {
        let errorMessage = await response.json();
        alert(
          "Fehler beim Aktualisieren des Layouts: " +
          errorMessage.message
        );
      } else {
        throw new Error("Fehlerhafte Antwort vom Server");
      }
    } else {
      const data = await response.text();
      console.log("Antwort vom Server:", data);
      alert('Layout erfolgreich aktualisiert, Gerät wird neu gestartet.');
      // Warten Sie auf die Bestätigung und dann ESP neustarten
      window.location.href = "/restartESP";
    }
  } catch (error) {
    console.error("Fehler:", error);
    alert(
      "Fehler beim Aktualisieren des Layouts. Bitte versuchen Sie es erneut."
    );
  }
}

async function factoryReset() {
  try {
    const response = await fetch("/factoryReset", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      alert(translations[siteLanguage].errorResetSettings + ": " + errorMessage);
    } else {
      const data = await response.text();
      alert(translations[siteLanguage].restartDeviceTextAfterResetSettings);
      window.location.href = "/restartESP";
    }
  } catch (error) {
    console.error("Error:", error);
    alert(translations[siteLanguage].errorResetSettings + ": " + errorMessage);
  }
}


async function loadLocalReleaseNotes() {
  try {
    const response = await fetch("/getLocalReleaseNotes");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const currentVersion = document.getElementById(ids.currentVersionBadge).textContent.trim();
    let notes = "";
    if (data[siteLanguage] && data[siteLanguage][currentVersion]) {
      notes = `<h4>${currentVersion}</h4><p>${data[siteLanguage][currentVersion]}</p>`;
    } else {
      notes = translations[siteLanguage].errorNoReleasesNotesAvailable;
    }
    document.getElementById(ids.releaseNotesActual).innerHTML = notes;
  } catch (error) {
    console.error("Error loading the actual release notes: ", error);
    document.getElementById(ids.releaseNotesActual).innerText = translations[siteLanguage].errorLoadingReleaseNotes;
  }
}



async function checkForUpdate() {
  try {
    const response = await fetch("/checkForUpdate");
    const data = await response.json();
    console.log("checkForUpdates: ", data);

    if (data.updateAvailable) {
      const versions = data.versions;
      const availableVersionsSelect = document.getElementById(ids.availableVersions);
      document.getElementById(ids.availableVersionsBadgeLabel).style.display = "inline-block";
      availableVersionsSelect.style.display = "inline-block";
      availableVersionsSelect.innerHTML = "";
      versions.forEach(version => {
        const option = document.createElement("option");
        option.value = version;
        option.text = version;
        availableVersionsSelect.add(option);
      });
      document.getElementById(ids.updateButton).style.display = "inline-block";
      displayReleaseNotes();
    } else {
      console.log("No update available.");
      alert(translations[siteLanguage].noUpdateAvailable);
      document.getElementById(ids.updateButton).disabled = true;
      document.getElementById(ids.availableVersionsBadgeLabel).style.display = "none";
      document.getElementById(ids.availableVersions).style.display = "none";
    }
  } catch (error) {
    alert(translations[siteLanguage].errorSearchUpdate);
    console.error("Error:", error);
    document.getElementById(ids.updateButton).disabled = true;
    document.getElementById(ids.availableVersionsBadgeLabel).style.display = "none";
    document.getElementById(ids.availableVersions).style.display = "none";
  }
}

async function displayReleaseNotes() {
  const selectedVersion = document.getElementById(ids.availableVersions).value;
  fetch(`/getServerReleaseNotes?version=${encodeURIComponent(selectedVersion)}`)
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorMessage => {
          throw new Error(errorMessage.message);
        });
      }
      return response.json();
    })
    .then(data => {
      if (data.message) {
        throw new Error(data.message);
      }
      const notes = `<h4>${selectedVersion}</h4><p>${data[selectedVersion]}</p>`;
      document.getElementById(ids.releaseNotesNewLabel).style.display = "block";
      document.getElementById(ids.releaseNotesNew).innerHTML = notes;
    })
    .catch(error => {
      console.error("Error loading the release notes: ", error);
    });
}

async function startUpdate() {
  const updateButton = document.getElementById(ids.updateButton);
  updateButton.disabled = true; // Deaktiviere den Update-Button, um doppelte Klicks zu verhindern
  disableForm(true); // Deaktiviert die gesamte Form, während das Update läuft
  showOverlay(); // Zeigt das Overlay während des Updates an
  pauseTimeUpdate(); // Anhalten das Zeit-Update
  const selectedVersion = document.getElementById(ids.availableVersions).value; // Holt die ausgewählte Version

  Swal.fire({
    title: translations[siteLanguage].startUpdate.confirmTitle,
    text: translations[siteLanguage].startUpdate.confirmText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: translations[siteLanguage].startUpdate.confirmButton,
    cancelButtonText: translations[siteLanguage].startUpdate.cancelButton,
  }).then((result) => {
    if (result.isConfirmed) {
      // Startet den Update-Vorgang, wenn bestätigt
      fetch("/startUpdate?version=" + encodeURIComponent(selectedVersion))
        .then(async (response) => {
          if (!response.ok) {
            console.log("Antwort ist nicht OK, Status:", response.status);
            if (response.status === 404) {
              return response.json().then((errorMessage) => {
                Swal.fire(
                  translations[siteLanguage].startUpdate.error,
                  translations[siteLanguage].startUpdate.errorStart + errorMessage.message,
                  "error"
                );
                console.error("Fehler: ", errorMessage.message);
                throw new Error(errorMessage.message);
              });
            } else {
              console.error("Serverfehler: Status " + response.status);
              throw new Error(translations[siteLanguage].startUpdate.serverError);
            }
          }
          return response.json();
        })
        .then((data) => {
          console.log("Server-Antwort-Daten:", data);

          // Starte die Fortschrittsüberprüfung, wenn das Update erfolgreich gestartet wurde
          if (data) {
            showProgressPopup();  // Zeige ein Popup an, um den Fortschritt zu überwachen
          }

        })
        .catch((error) => {
          console.error("Fehler beim Starten des Updates:", error);
          Swal.fire(
            translations[siteLanguage].startUpdate.error,
            translations[siteLanguage].startUpdate.updateFailed,
            "error"
          );
          hideOverlay();
          disableForm(false);
          pauseTimeUpdate();
          completeUpdate();
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Abbruch des Updates durch den Benutzer
      Swal.fire("Abgebrochen", translations[siteLanguage].startUpdate.updateCancelled, "error");
      hideOverlay();
      disableForm(false);
      pauseTimeUpdate();
      completeUpdate();
    }
  });
}

function showProgressPopup() {
  const startTime = Date.now();
  Swal.fire({
    title: 'Update läuft...',
    timer: 600000, // 600000 Millisekunden entspricht 10 Minuten
    html: 'Der Vorgang kann bis zu 10 Minuten dauern. Bitte warten Sie, bis der Vorgang abgeschlossen ist und die Uhr neu gestartet wird. Seit dem Start des Updates vergangen: <b></b>',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      const updateTimerText = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const minutes = Math.floor(elapsed / 60);
        const seconds = Math.floor(elapsed % 60);
        const progress = document.getElementById(ids.progressBar).textContent;
        timer.textContent = `${minutes ? `${minutes} Minuten und ${seconds} Sekunden` : `${seconds} Sekunden`}`;
      };
      timerInterval = setInterval(updateTimerText, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  });
}

function showOverlay() {
  document.getElementById(ids.overlay).style.display = "block"; // Nur das Overlay anzeigen
  document.getElementById('progressBar').style.display = 'none'; // Fortschrittsbalken standardmäßig ausblenden
  document.getElementById('progressContainer').style.display = 'none'; // Fortschrittsbalken-Container ausblenden
}

function hideOverlay() {
  document.getElementById(ids.overlay).style.display = "none"; // Overlay ausblenden
  document.getElementById('progressBar').style.display = 'none'; // Fortschrittsbalken ausblenden
  document.getElementById('progressContainer').style.display = 'none'; // Fortschrittsbalken-Container ausblenden
}

/**
 * Updates the progress bar on the web page with the given progress value.
 * Ensures the progress bar is visible and sets its width and text content 
 * based on the provided progress percentage. Additionally, updates the progress 
 * in a popup if applicable.
 * 
 * @param {number} progress - The progress value as a percentage (0 to 100).
 */
const updateProgressToWeb = (progress) => {
  const progressBar = document.getElementById(ids.progressBar);
  console.log("progress value: ", progress);
  if (!progressBar) {
    console.error("Progress bar elements are missing from the DOM.");
    return;
  }
  progressBar.style.display = "block";
  progressBar.style.width = `${progress}%`;
  progressBar.textContent = `${progress.toFixed(2)}%`;
  updateProgressInPopup(progress);
};
function updateProgressInPopup(progress) {
  const progressText = document.getElementById("progress-text");
  if (progressText) {
    progressText.textContent = `${progress.toFixed(2)}%`;
  }
}
function disableForm(disabled) {
  document.getElementById(ids.apModeOnly).disabled = disabled;
  document.getElementById(ids.apModeTimeout).disabled = disabled;
  document.getElementById(ids.ssid).disabled = disabled;
  document.getElementById(ids.password).disabled = disabled;
  document.getElementById(ids.togglePasswordButton).disabled = disabled;
  document.getElementById(ids.updateWiFiButton).disabled = disabled;
  document.getElementById(ids.timeZone).disabled = disabled;
  document.getElementById(ids.currentTime).disabled = disabled;
  document.getElementById(ids.currentDate).disabled = disabled;
  document.getElementById(ids.ntpUpdatesEnabled).disabled = disabled;
  document.getElementById(ids.useDreiviertel).disabled = disabled;
  document.getElementById(ids.displayMode).disabled = disabled;
  document.getElementById(ids.brightness).disabled = disabled;
  document.getElementById(ids.red).disabled = disabled;
  document.getElementById(ids.green).disabled = disabled;
  document.getElementById(ids.blue).disabled = disabled;
  document.getElementById(ids.rainbowMode).disabled = disabled;
  document.getElementById(ids.nightMode).disabled = disabled;
  document.getElementById(ids.nightmodeStart).disabled = disabled;
  document.getElementById(ids.nightmodeEnd).disabled = disabled;
  document.getElementById(ids.nightBrightness).disabled = disabled;
  document.getElementById(ids.nightRed).disabled = disabled;
  document.getElementById(ids.nightGreen).disabled = disabled;
  document.getElementById(ids.nightBlue).disabled = disabled;
  document.getElementById(ids.searchUpdateButton).disabled = disabled;
  document.getElementById(ids.updateButton).disabled = disabled;
  document.getElementById(ids.availableVersions).disabled = disabled;
  document.getElementById(ids.availableVersionsBadgeLabel).disabled = disabled;
  document.getElementById(ids.factoryResetButton).disabled = disabled;
}


function completeUpdate() {
  setTimeout(() => {
    document.getElementById(ids.progressBar).style.display = "none"; // Fortschrittsbalken ausblenden
  }, 2000);
}
