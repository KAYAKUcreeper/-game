document.getElementById("sendBtn").addEventListener("click", async () => {
    const word = document.getElementById("wordInput").value;
    if (!word) return;

    addLog("あなた", word);

    const res = await fetch("/api/shiritori", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word })
    });

    const data = await res.json();
    addLog("AI", data.ai_word);

    document.getElementById("wordInput").value = "";
});

function addLog(speaker, text) {
    const log = document.getElementById("log");
    const div = document.createElement("div");
    div.className = "msg";
    div.innerHTML = `<strong>${speaker}:</strong> ${text}`;
    log.appendChild(div);
}