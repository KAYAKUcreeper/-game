document.getElementById("sendBtn").addEventListener("click", sendWord);

function sendWord() {
  const input = document.getElementById("wordInput");
  const word = input.value.trim();
  if (!word) return;

  // ▼ あなたのメッセージ（左）
  addLog(word, "me");
  input.value = "";

  // ▼ AIの返答をサーバーから取得
  fetch("/api/shiritori", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: word }),
  })
    .then((response) => response.json())
    .then((data) => {
      addLog(data.ai_word, "ai");
    })
    .catch((error) => {
      console.error("Error:", error);
      addLog("エラーが発生しました。", "ai");
    });
}

function addLog(text, type) {
  const log = document.getElementById("log");
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}