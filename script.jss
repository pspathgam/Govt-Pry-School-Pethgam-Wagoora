function updateDateTime() {
  const now = new Date();
  document.getElementById("liveDateTime").innerHTML = now.toLocaleString();
}
setInterval(updateDateTime, 1000);

function chatOpen() {
  alert("AI Assistant Coming Soon!");
}

async function loadWeather() {
  document.getElementById("weather").innerHTML = "Pleasant Weather in Wagoora 🌤";
}
loadWeather();
