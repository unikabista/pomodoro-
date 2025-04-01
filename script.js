document.addEventListener("DOMContentLoaded", function () { 
    let timerInterval = null;
    let remainingTime = 0;
    let totalTime = 0;
    let isPaused = false;
  
    const timeInput = document.getElementById("timeInput");
    const startTimerBtn = document.getElementById("startTimerBtn");
    const pauseTimerBtn = document.getElementById("pauseTimerBtn");
    const resetTimerBtn = document.getElementById("resetTimerBtn");
    const timerDisplay = document.getElementById("timerDisplay");
    const timerPointer = document.getElementById("timerPointer");
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
  
    if (timeInput && startTimerBtn && pauseTimerBtn && resetTimerBtn && timerDisplay && timerPointer) {
      function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
  
      function updateDisplay() {
        timerDisplay.textContent = formatTime(remainingTime);
        const fraction = (totalTime - remainingTime) / totalTime;
        const angle = fraction * 360;
        timerPointer.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      }
  
      function countdown() {
        if (!isPaused) {
          remainingTime--;
          updateDisplay();
          if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerDisplay.textContent = "DONE";
            timerPointer.style.transform = `translateX(-50%) rotate(360deg)`;
            pauseTimerBtn.disabled = true;
            resetTimerBtn.disabled = false;
            alert("Time's up!");
            logSession(); // 🆕 Log session here
          }
        }
      }
  
      function startTimer() {
        if (timerInterval) return;
        const inputMinutes = parseInt(timeInput.value, 10);
        if (isNaN(inputMinutes) || inputMinutes <= 0) {
          alert("Please enter a valid number of minutes.");
          return;
        }
        totalTime = inputMinutes * 60;
        remainingTime = totalTime;
        isPaused = false;
        updateDisplay();
        startTimerBtn.disabled = true;
        pauseTimerBtn.disabled = false;
        resetTimerBtn.disabled = false;
        timerInterval = setInterval(countdown, 1000);
      }
  
      function pauseTimer() {
        if (!timerInterval) return;
        isPaused = !isPaused;
        pauseTimerBtn.textContent = isPaused ? "Resume" : "Pause";
      }
  
      function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.textContent = "START";
        timerPointer.style.transform = `translateX(-50%) rotate(0deg)`;
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
        resetTimerBtn.disabled = true;
        pauseTimerBtn.textContent = "Pause";
      }
  
      startTimerBtn.addEventListener('click', startTimer);
      pauseTimerBtn.addEventListener('click', pauseTimer);
      resetTimerBtn.addEventListener('click', resetTimer);
    }
  
    updateSessionList(); 
  
    const greetingEl = document.getElementById("greeting");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (greetingEl && storedUser && storedUser.name) {
      greetingEl.textContent = `👋 Welcome, ${storedUser.name}!`;
    }
  
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
  