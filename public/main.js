const API_KEY = "YOUR_API_KEY";
const APP_ID = "YOUR_APP_ID";

document.getElementById("sendBtn").addEventListener("click", sendWord);

async function sendWord() {
  const input = document.getElementById("wordInput");
  const word = input.value.trim();
  if (!word) return;

  addLog("あなた", word);
  input.value = "";

  const res = await fetch(`https://api.dify.ai/v1/chat-messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: {},
      query: word,
      response_mode: "blocking",
      user: "shiritori-user"
    })
  });

  const data = await res.json();
  const aiWord = data.answer;

  addLog("AI", aiWord);
}

function addLog(name, text) {
  const log = document.getElementById("log");
  const div = document.createElement("div");
  div.className = "p-2 bg-gray-200 rounded";
  div.textContent = `${name}: ${text}`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}