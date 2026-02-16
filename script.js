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
  alert("Admissions are open. School timing: 10:00 AM – 4:00 PM.");
}
