var time;

// Open settings button and slide in form
function openSettings() {
  document.getElementById("settings").classList.toggle("settings-open");
}

document
  .getElementById("settings-button")
  .addEventListener("click", openSettings);

function changeTime() {
  time = parseInt(document.getElementById("time-input").value);
  getGreeting();
}

// Prevent form from refreshing and adjust time according to form
document.getElementById("time-form").addEventListener("submit", function (e) {
  e.preventDefault();
  changeTime();
});

function getGreeting() {
  // Error if input cannot be converted to integer or is negative
  if (isNaN(time) || time < 0) {
    document.getElementById().innerHTML = `Please enter a valid time.`;
  } else {
    timer(time);
  }
}

// Reset popup to original state on startup
document.getElementById("greeting").innerHTML = `Welcome`;
chrome.browserAction.setBadgeText({ text: "" });

// Timer function to countdown
function timer(time) {
  // Hide submission form on countdown 
  document.getElementById("time-form").style.display = "none";
  var now = new Date().getTime();
  var target = new Date(now + time * 1000);
  var int = setInterval(function () {
    var now = new Date();
    var remaining = (target - now) / 1000;

    if (remaining <= 0) {
      // Play audio when timer ends and flash red badge
      var myAudio = new Audio();
      myAudio.src = "alarm.mp3";
      myAudio.loop = false;
      chrome.browserAction.setBadgeText({ text: "done" });
      chrome.browserAction.setBadgeBackgroundColor({ color: "red" });
      myAudio.play();

      document.getElementById(
        "greeting"
      ).innerHTML = `Timer done. Enter new time.`;
      clearInterval(int);
      
      // Reintroduce submission form 
      document
        .getElementById("settings-button")
        .addEventListener("click", openSettings);
      document.getElementById("time-form").style.display = "block";
      return;
    }

    // Display time remaining
    var minutes = ~~(remaining / 60);
    var seconds = ~~(remaining % 60);
    document.getElementById(
      "greeting"
    ).innerHTML = `Time remaining: ${minutes}m ${seconds}s`;
  });
}