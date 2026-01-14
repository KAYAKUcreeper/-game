document.getElementById("sendBtn").addEventListener("click", sendWord);

function sendWord() {
  const input = document.getElementById("wordInput");
  const word = input.value.trim();
  if (!word) return;

  // ▼ あなたのメッセージ（左）
  addLog(word, "me");
  input.value = "";

  // ▼ AIの返答（ダミー）
  setTimeout(() => {
    addLog("AIの返答（ダミー）", "ai");
  }, 500);
}

function addLog(text, type) {
  const log = document.getElementById("log");
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}