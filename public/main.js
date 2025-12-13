document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (text === "") return;

    // ログに追加
    addLog("あなた", text);

    // 左の吹き出しに表示
    document.getElementById("player-bubble").textContent = text;

    // AIの返答（仮のしりとりロジック）
    const aiWord = getAIWord(text);
    addLog("AI", aiWord);

    // 右の吹き出しに表示
    document.getElementById("ai-bubble").textContent = aiWord;

    input.value = "";
}

function addLog(sender, message) {
    const log = document.getElementById("chat-log");

    const entry = document.createElement("div");
    entry.innerHTML = `<strong>${sender}:</strong> ${message}`;

    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

// 仮のAIしりとりロジック（適当）
function getAIWord(userWord) {
    const lastChar = userWord.slice(-1);

    const dictionary = {
        "り": "りんご",
        "ご": "ごりら",
        "ら": "らっぱ",
        "ぱ": "パンダ",
        "だ": "だるま",
        "ま": "まくら",
        "ら": "ラーメン"
    };

    return dictionary[lastChar] || "？？？";
}