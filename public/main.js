const log = document.getElementById("log");
const input = document.getElementById("wordInput");
const sendBtn = document.getElementById("sendBtn");

let lastWord = "しりとり";
addMessage("AI", `最初の単語は「${lastWord}」です`);

sendBtn.addEventListener("click", () => {
  const word = input.value.trim();
  if (!word) return;

  addMessage("あなた", word);
  input.value = "";

  // 仮AI：最後の文字 + "から始まる単語（仮）"
  const lastChar = word[word.length - 1];
  const aiWord = `${lastChar}から始まる単語（仮）`;

  addMessage("AI", aiWord);
  lastWord = aiWord;
});

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = "message " + (sender === "AI" ? "ai" : "player");
  div.textContent = `${sender}: ${text}`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}