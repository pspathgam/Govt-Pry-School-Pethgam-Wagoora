// Live Date & Time
function updateDateTime() {
  const now = new Date();
  const dt = document.getElementById("liveDateTime");
  if (dt) dt.innerHTML = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();


// Simple Working Weather (No API issue version)
async function loadWeather() {
  const weatherEl = document.getElementById("weather");

  if (!weatherEl) return;

  weatherEl.innerHTML = "Fetching weather...";

  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=34.20&longitude=74.34&current_weather=true"
    );

    const data = await response.json();

    if (data && data.current_weather) {
      const temp = data.current_weather.temperature;
      weatherEl.innerHTML = "Wagoora: " + temp + "°C 🌤";
    } else {
      weatherEl.innerHTML = "Weather data not available";
    }

  } catch (error) {
    weatherEl.innerHTML = "Unable to load weather";
    console.log("Weather error:", error);
  }
}

loadWeather();


// AI Assistant Button
function chatOpen() {

  let question = prompt("Ask your question about the school:");

  if (!question) return;

  question = question.toLowerCase();

  let reply = "Please contact school office for more details.";

  if (question.includes("admission"))
    reply = "Admissions are open. Visit school office between 10 AM – 2 PM.";

  else if (question.includes("timing"))
    reply = "School timing is 10:00 AM to 4:00 PM.";

  else if (question.includes("principal") || question.includes("headmaster"))
    reply = "Headmaster: Government Primary School Pethgam Wagoora.";

  else if (question.includes("contact"))
    reply = "You can contact the school during working hours.";

  else if (question.includes("mid day meal"))
    reply = "Mid Day Meal is provided daily as per government norms.";

  alert(reply);
  function calculateAttendance() {
  const total = Number(document.getElementById("totalStudents").value);
  const present = Number(document.getElementById("presentStudents").value);
  const result = document.getElementById("attendanceResult");

  if (!total || !present || present > total) {
    result.innerHTML = "Please enter valid numbers";
    return;
  }

  const percentage = ((present / total) * 100).toFixed(2);

  result.innerHTML = "Today's Attendance: " + percentage + "%";
  }
}
