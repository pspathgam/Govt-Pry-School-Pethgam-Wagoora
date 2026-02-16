// Ensure the DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
    
    // ================================
    // 1. Live Date & Time
    // ================================
    function updateDateTime() {
        const now = new Date();
        const dt = document.getElementById("liveDateTime");
        // Using toLocaleString for a cleaner, user-friendly format
        if (dt) {
            dt.innerHTML = now.toLocaleString('en-IN', { 
                dateStyle: 'medium', 
                timeStyle: 'short' 
            });
        }
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // ================================
    // 2. Enhanced Weather System
    // ================================
    async function loadWeather() {
        const weatherEl = document.getElementById("weather");
        if (!weatherEl) return;

        try {
            // Fetching for Wagoora coordinates
            const response = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=34.20&longitude=74.34&current_weather=true"
            );
            const data = await response.json();

            if (data && data.current_weather) {
                const temp = Math.round(data.current_weather.temperature);
                const code = data.current_weather.weathercode;
                
                // Simple weather code interpreter
                let icon = "🌤"; 
                if (code >= 51 && code <= 67) icon = "🌧";
                if (code >= 71 && code <= 77) icon = "❄️";
                if (code >= 95) icon = "⛈";

                weatherEl.innerHTML = `Wagoora: ${temp}°C ${icon}`;
            } else {
                weatherEl.innerHTML = "Weather currently unavailable";
            }
        } catch (error) {
            weatherEl.innerHTML = "Unable to load weather";
            console.error("Weather error:", error);
        }
    }
    loadWeather();

    // ================================
    // 3. Attendance System Logic
    // ================================
    const btn = document.getElementById("attendanceBtn");
    if (btn) {
        btn.addEventListener("click", function () {
            const totalInput = document.getElementById("totalStudents").value;
            const presentInput = document.getElementById("presentStudents").value;
            const result = document.getElementById("attendanceResult");

            const total = parseInt(totalInput);
            const present = parseInt(presentInput);

            // Validation: Check for empty, negative, or logical errors
            if (isNaN(total) || isNaN(present) || total <= 0 || present < 0) {
                result.innerHTML = "❌ Please enter valid positive numbers";
                result.style.color = "#ff4444";
            } else if (present > total) {
                result.innerHTML = "❌ Present count cannot exceed total";
                result.style.color = "#ff4444";
            } else {
                const percentage = ((present / total) * 100).toFixed(1);
                result.innerHTML = `✅ Today's Attendance: <strong>${percentage}%</strong>`;
                result.style.color = "#44ff44";
            }
        });
    }
});

// ================================
// 4. AI Assistant (Global Function)
// ================================
function chatOpen() {
    let userInput = prompt("How can I help you today? (e.g., admissions, timing, meal)");
    if (!userInput) return;

    const question = userInput.toLowerCase();
    let reply = "";

    // Using a more scalable matching system
    if (question.includes("admission")) {
        reply = "📍 Admissions 2026: Open for all primary classes. Please visit the school office with a birth certificate and Aadhaar card.";
    } else if (question.includes("timing") || question.includes("time")) {
        reply = "🕒 School Hours: 10:00 AM to 4:00 PM (Monday to Saturday).";
    } else if (question.includes("principal") || question.includes("headmaster") || question.includes("who")) {
        reply = "👨‍🏫 Headmaster: You can meet the Head of Institution at Pethgam Wagoora during office hours.";
    } else if (question.includes("meal") || question.includes("food") || question.includes("lunch")) {
        reply = "🍲 Mid-Day Meal: We provide fresh, nutritious meals daily under the Govt. PM-POSHAN scheme.";
    } else if (question.includes("scholarship")) {
        reply = "🎓 Scholarships: Various Pre-Matric scholarships are available for eligible students. Check the 'Scholarships' section on our site.";
    } else {
        reply = "I'm still learning! 🧠 For specific queries like that, please visit the school or contact us directly.";
    }

    alert(reply);
}
