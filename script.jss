function updateDateTime() {
  const now = new Date();
  document.getElementById("liveDateTime").innerHTML = now.toLocaleString();
}
setInterval(updateDateTime, 1000);

function chatOpen() {
  alert("AI Assistant Coming Soon!");
}

async function loadWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=34.15&longitude=74.62&current_weather=true"
    );
    const data = await response.json();
    const temp = data.current_weather.temperature;
    document.getElementById("weather").innerHTML =
      "Wagoora: " + temp + "°C 🌤";
  } catch (error) {
    document.getElementById("weather").innerHTML =
      "Weather unavailable";
  }
}

loadWeather();
