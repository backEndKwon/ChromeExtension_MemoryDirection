document.addEventListener("DOMContentLoaded", () => {
  const instructionElement = document.getElementById("instruction");
  const userInputElement = document.getElementById("user-input");
  const startButton = document.getElementById("start-button");

  let answer = [];
  let userInput = [];
  let level = 1;
  let gameRunning = false;

  const directions = ["←", "→", "↑", "↓"];

  function generateAnswer() {
    answer = [];
    for (let i = 0; i < level; i++) {
        const randomDirection = directions[Math.floor(Math.random() * 4)];
        answer.push(randomDirection);
    }
    console.log("👉 ~ answer:", answer)
  }

  function showAnswer() {
    userInput = [];
    let index = 0;
    const interval = setInterval(() => {
      instructionElement.textContent = answer[index];
      instructionElement.classList.add('blink'); // 깜박임 효과 클래스 추가

      index++;
      if (index === answer.length) {
        clearInterval(interval);
        setTimeout(() => {
          instructionElement.textContent = "Go!";
          instructionElement.classList.remove('blink'); // 깜박임 효과 클래스 제거

          startUserInput();
        }, 1000);
      }
    }, 1000);
  }

  function startUserInput() {
    document.addEventListener("keydown", handleKeyPress);
    userInputElement.textContent = "Your Input: ";
  }

  function handleKeyPress(event) {
    const key = getDirectionFromKeyCode(event.keyCode);
    if (key) {
      userInput.push(key);
      userInputElement.textContent = `Your Input: ${userInput.join(" ")}`;
      if (userInput.length === answer.length) {
        checkUserInput();
      }
    }
  }

  function getDirectionFromKeyCode(keyCode) {
    const keyMap = {
      37: "←", 
      39: "→", 
      38: "↑", 
      40: "↓", 
    };
    return keyMap[keyCode];
  }

  function checkUserInput() {
    document.removeEventListener("keydown", handleKeyPress);
    if (arraysEqual(answer, userInput)) {
      level++;
      instructionElement.textContent = "Correct! Next Level.";
      setTimeout(() => {
        playGame();
      }, 1500);
    } else {
      endGame();
    }
  }

  function endGame() {
    gameRunning = false;//게임 끝났을때 초기화 설정
    userInputElement.style.display = "none"; // 사용자 입력 상자 숨기기

    userInputElement.textContent = ""; //사용자 입력 상자 초기화
    instructionElement.textContent = `Game Over! Your Score: ${level - 1}`;
    startButton.style.display = "block";
  }

  function arraysEqual(arr1, arr2) {
    return arr1.every((value, index) => value === arr2[index]);
  }

  startButton.addEventListener("click", () => {
    if (!gameRunning) {//게임 초기화 확인
      level = 1;
      playGame();
    }
  });

  function playGame() {
    gameRunning = true;
    startButton.style.display = "none";//게임진행하고 있으면 startbutton숨기기
    userInputElement.style.display = 'block'; // 사용자 입력 상자 숨기기
    userInputElement.textContent = ''; // 사용자 입력 상자 초기화
    instructionElement.textContent = `Level ${level}`;
    generateAnswer();
    showAnswer();
  }
});
