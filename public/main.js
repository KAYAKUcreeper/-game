// キャラデータ（文字数ダメージ表）
const characters = {
  power3: {
    name: "三文字剣士",
    img: "https://1.bp.blogspot.com/-xb3JjvmmE0U/UPyIwu_nFJI/AAAAAAAAKw4/EM5Ote8wM4I/s1600/knight.png",
    damageTable: { 1: 2, 2: 4, 3: 12, 4: 6, 5: 8, 6: 10 }
  },

  balanced: {
    name: "バランス型",
    img: "https://th.bing.com/th/id/R.4ed0f7eae3af9fe0ab7f362a068ec76a?rik=5YNcWaJRXOXs1A&riu=http%3a%2f%2f3.bp.blogspot.com%2f-f1KvBQ_l6VQ%2fV8jqcEt1wZI%2fAAAAAAAA9fg%2fkhpoh3fO6AQ7EB-4GO8GQZKqqTPt6VgeACLcB%2fs800%2fmahoutsukai_man.png&ehk=b7OtsQMEP668OOr0UtBhM7TRfKz2aOYasua4nRBr3Fk%3d&risl=&pid=ImgRaw&r=0",
    damageTable: { 1: 3, 2: 5, 3: 7, 4: 9, 5: 11, 6: 13 }
  },

  longMaster: {
    name: "長文マスター",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrCYMYEz1gFssedOZrdQ1zjDOJmU5HcVYZtXluc21ZDTp-3Cpt9A5W2kL9MC0tZLRPAjORhIR2bsiIA6i-E6XHxr2zes7Fs27JxqRb9GT2vlud8e0U6pYal8UE9NCP59XCDvF-yJ-stJI/s800/inu_ninja.png",
    damageTable: { 1: 1, 2: 3, 3: 5, 4: 8, 5: 12, 6: 18 }
  }
};

let playerCharacter = null;

// キャラ選択処理
document.querySelectorAll(".char-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.char;
    playerCharacter = characters[key];

    // バトル画面へ切り替え
    document.getElementById("select-screen").style.display = "none";
    document.getElementById("battle-screen").style.display = "block";

    // 選んだキャラの画像を反映
    document.querySelector(".player-img").src = playerCharacter.img;

    updateStatus(playerCharacter);

    addMessage("AI", `${playerCharacter.name} を選んだのか…面白い！`);
  });
});

// キャラ選択後にステータスを表示
function updateStatus(character) {
  const list = document.getElementById("status-list");
  list.innerHTML = "";

  for (let len = 1; len <= 6; len++) {
    const dmg = character.damageTable[len];
    const li = document.createElement("li");
    li.textContent = `${len}文字：${dmg}ダメージ`;
    list.appendChild(li);
  }
}


// バトル処理
const log = document.getElementById("log");
const input = document.getElementById("wordInput");
const sendBtn = document.getElementById("sendBtn");

const playerHP = document.getElementById("player-hp");
const aiHP = document.getElementById("ai-hp");

let lastWord = "しりとり";
let playerHpValue = 100;
let aiHpValue = 100;

addMessage("AI", `最初の単語は「${lastWord}」だ！かかってこい！`);


// 文字数ダメージ計算
function calcDamage(word, character) {
  const len = Math.min(word.length, 6);
  return character.damageTable[len] || 0;
}

// メッセージ追加
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = "message " + (sender === "AI" ? "ai" : "player");
  div.textContent = `${sender}: ${text}`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}


// 攻撃処理
sendBtn.addEventListener("click", () => {
  const word = input.value.trim();
  if (!word) return;

  addMessage("あなた", word);
  input.value = "";

  // プレイヤー攻撃
  const damage = calcDamage(word, playerCharacter);
  aiHpValue -= damage;
  if (aiHpValue < 0) aiHpValue = 0;
  aiHP.style.width = aiHpValue + "%";

  addMessage("AI", `ぐはっ！ ${damage} ダメージ！`);

  if (aiHpValue === 0) {
    addMessage("AI", "ま…負けた…！");
    return;
  }

  // AIの返答（仮）
  const lastChar = word[word.length - 1];
  const aiWord = `${lastChar}から始まる単語（仮）`;

  setTimeout(() => {
    addMessage("AI", aiWord);

    // AI攻撃（AIはバランス型）
    const aiDamage = calcDamage(aiWord, characters.balanced);
    playerHpValue -= aiDamage;
    if (playerHpValue < 0) playerHpValue = 0;
    playerHP.style.width = playerHpValue + "%";

    addMessage("AI", `${aiDamage} ダメージを与えたぞ！`);

    if (playerHpValue === 0) {
      addMessage("AI", "ふっ…勝負あったな！");
    }

    lastWord = aiWord;
  }, 600);
});