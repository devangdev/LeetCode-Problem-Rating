let ratings = {};

// ---------- Create Tooltip ----------
const tooltip = document.createElement("div");
tooltip.className = "lc-tooltip";
document.body.appendChild(tooltip);

// ---------- Make Tooltip Follow Mouse ----------
document.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 20 + "px";
    tooltip.style.top = e.clientY + 20 + "px";
});

// ---------- Initialize ----------
async function init() {
    try {
        const url = chrome.runtime.getURL("data/ratings.json");

        const response = await fetch(url);

        ratings = await response.json();

        console.log("Ratings Loaded:", ratings);

        setupHoverEvents();
    }
    catch (err) {
        alert("Failed to load ratings.json");
        console.error(err);
    }
}

// ---------- Hover Events ----------
function setupHoverEvents() {

    document.addEventListener("mouseover", (event) => {

        const problem = event.target.closest('a[href^="/problems/"]');

        if (!problem) return;

        const info = ratings[problem.id];

        if (!info) {
            tooltip.innerHTML = `
                <div><strong>Contest Rating</strong></div>
                <div>N/A</div>
            `;
        
        } else {
            tooltip.innerHTML = `
                <div><strong>⭐ Rating:</strong> ${info.rating}</div>
                <div><strong>🏆 Contest:</strong> ${info.contestType} ${info.contestNumber}</div>
                <div><strong>📝 Question:</strong> Q${info.question}</div>
            `;
        }

        tooltip.style.display = "block";
    });

    document.addEventListener("mouseout", (event) => {

        const problem = event.target.closest('a[href^="/problems/"]');

        if (!problem) return;

        tooltip.style.display = "none";
    });
}

init();