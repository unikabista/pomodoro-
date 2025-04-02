document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const authContainer = document.querySelector('.auth-container');
  const greetingEl = document.getElementById('greeting');

  if (currentUser) {
    // User is logged in
    // Add logout button
    if (authContainer) {
      authContainer.innerHTML = `
        <button id="logoutBtn" class="auth-button logout-btn">Log Out</button>
      `;

      // Add logout functionality
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
          localStorage.removeItem('currentUser');
          window.location.reload();
        });
      }
    }

    // Update greeting with user's first name
    if (greetingEl) {
      const firstName = currentUser.name.split(' ')[0];
      greetingEl.textContent = `👋 Welcome, ${firstName}!`;
    }
  } else {
    // User is not logged in
    // Show login/signup buttons
    if (authContainer) {
      authContainer.innerHTML = `
        <a href="/login/login.html" class="auth-button">Log In</a>
        <a href="/signup/signup.html" class="auth-button">Sign Up</a>
      `;
    }

    // Clear greeting
    if (greetingEl) {
      greetingEl.textContent = '';
    }
  }

  // Timer durations in seconds
  const pomodoroDuration = 25 * 60; // 25 minutes
  const shortBreakDuration = 5 * 60; // 5 minutes
  const longBreakDuration = 10 * 60; // 10 minutes

  let timerInterval = null;
  let remainingTime = 0;
  let isPaused = false;

  // DOM Elements
  const timerDisplay = document.getElementById("timerDisplay");
  const timerPointer = document.getElementById("timerPointer"); // Clock hand
  const pomodoroBtn = document.getElementById("pomodoroBtn");
  const shortBreakBtn = document.getElementById("shortBreakBtn");
  const longBreakBtn = document.getElementById("longBreakBtn");
  const startTimerBtn = document.getElementById("startTimerBtn");
  const pauseTimerBtn = document.getElementById("pauseTimerBtn");
  const resetTimerBtn = document.getElementById("resetTimerBtn");
  const timeInput = document.getElementById("timeInput");
  const timerSound = document.getElementById('timerSound');

  // Update Timer Display
  function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")} ${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  // Rotate Clock Hand
  function updateClockHand(totalDuration, remainingTime) {
    const rotation = (360 * (totalDuration - remainingTime)) / totalDuration;
    timerPointer.style.transform = `rotate(${rotation}deg)`;
  }

  // Start Timer
  function startTimer(duration) {
    clearInterval(timerInterval); // Clear any existing timer
    remainingTime = duration;
    isPaused = false;
    updateTimerDisplay(remainingTime);
    updateClockHand(duration, remainingTime);

    pauseTimerBtn.disabled = false;
    resetTimerBtn.disabled = false;

    timerInterval = setInterval(() => {
      if (!isPaused) {
        remainingTime--;
        updateTimerDisplay(remainingTime);
        updateClockHand(duration, remainingTime);

        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          timerDisplay.textContent = "DONE";
          alert("Time's up!");
          timerSound.play();
        }
      }
    }, 1000);
  }

  // Pause Timer
  function pauseTimer() {
    isPaused = !isPaused;
    pauseTimerBtn.textContent = isPaused ? "Resume" : "Pause";
  }

  // Reset Timer
  function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerDisplay.textContent = "START";
    timerPointer.style.transform = "rotate(0deg)"; // Reset clock hand
    pauseTimerBtn.disabled = true;
    resetTimerBtn.disabled = true;
    pauseTimerBtn.textContent = "Pause";
  }

  // Switch Timer Mode and Start Timer
  function switchMode(duration, activeButton) {
    // Update active button styles
    document.querySelectorAll(".mode-btn").forEach((btn) => btn.classList.remove("active"));
    activeButton.classList.add("active");

    // Start the timer with the selected duration
    startTimer(duration);
  }

  // Event Listeners for Mode Buttons
  pomodoroBtn.addEventListener("click", () => switchMode(pomodoroDuration, pomodoroBtn));
  shortBreakBtn.addEventListener("click", () => switchMode(shortBreakDuration, shortBreakBtn));
  longBreakBtn.addEventListener("click", () => switchMode(longBreakDuration, longBreakBtn));

  // Event Listener for Custom Timer Input
  startTimerBtn.addEventListener("click", () => {
    const customMinutes = parseInt(timeInput.value, 10);
    if (!isNaN(customMinutes) && customMinutes > 0) {
      clearInterval(timerInterval); // Clear any existing timer
      document.querySelectorAll(".mode-btn").forEach((btn) => btn.classList.remove("active")); // Remove active styles
      startTimer(customMinutes * 60); // Start timer with custom duration
    } else {
      alert("Please enter a valid number greater than 0.");
    }
  });

  // Event Listeners for Timer Controls
  pauseTimerBtn.addEventListener("click", pauseTimer);
  resetTimerBtn.addEventListener("click", resetTimer);

  // Initialize Timer Display
  updateTimerDisplay(0);
  timerPointer.style.transform = "rotate(0deg)"; // Initialize clock hand position

  const sessionList = document.getElementById("sessionList");

  function logSession() {
    const sessionData = JSON.parse(localStorage.getItem("sessions")) || [];
    const time = new Date().toLocaleTimeString();
    const newEntry = `✅ Focus session completed at ${time}`;
    sessionData.push(newEntry);
    localStorage.setItem("sessions", JSON.stringify(sessionData));
    updateSessionList();
  }

  function updateSessionList() {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    if (sessionList) {
      sessionList.innerHTML = "";
      sessions.forEach((session) => {
        const li = document.createElement("li");
        li.textContent = session;
        sessionList.appendChild(li);
      });
    }
  }

  updateSessionList();

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const userData = { name, email, password };
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Account created successfully!");
      window.location.href = "index.html";
    });
  }
});

// Get the username from the URL query parameters
const params = new URLSearchParams(window.location.search);
const username = params.get("username");

// Display the welcome message
if (username) {
  document.getElementById("greeting").textContent = `Welcome ${username}`;
}

function scrollToSamaya() {
  const samayaSection = document.getElementById('whatIsSamaya');
  samayaSection.scrollIntoView({ behavior: 'smooth' });
}
