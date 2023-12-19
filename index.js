document.addEventListener("DOMContentLoaded", () => {
  const instructionElement = document.getElementById("instruction");
  const userInputElement = document.getElementById("user-input");
  const congratulationMessage = document.getElementById(
    "congratulation-message"
  );
  const startButton = document.getElementById("start-button");

  /* 다크모드 */
  const darkModeToggle = document.getElementById("dark-mode-checkbox");

  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
  });

  /* ******** */

  let answer = [];
  let userInput = [];
  let level = 1;
  let gameRunning = false;

  // 단계 설정
  const controlNumber = 10;

  // 방향
  const directions = ["←", "→", "↑", "↓"];

  //축하메세지
  const firstMessage = "Congratulations! Your memory are impressive!";
  const secondMessage =
    "Capture this screen and share it with the developer (rhaehfdl0433@naver.com)!";
  const thirdMessage = "You have a chance to get a random prize:)";

  function generateAnswer() {
    answer = [];
    for (let i = 0; i < level; i++) {
      const randomDirection = directions[Math.floor(Math.random() * 4)];
      answer.push(randomDirection);
    }
  }

  function showAnswer() {
    userInput = [];
    let index = 0;
    const interval = setInterval(() => {
      instructionElement.textContent = answer[index];
      instructionElement.classList.add("blink"); // 깜박임 효과 클래스 추가

      index++;
      if (index === answer.length) {
        clearInterval(interval);
        setTimeout(() => {
          instructionElement.textContent = "Go!";
          instructionElement.classList.remove("blink"); // 깜박임 효과 클래스 제거

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
      if (level <= controlNumber) {
        instructionElement.textContent = "Correct! Next Level.";
        setTimeout(() => {
          playGame();
        }, 1500);
      } else {
        endGame();
      }
    } else {
      endGame();
    }
  }

  function endGame(congratulate = false) {
    gameRunning = false; // 게임 끝났을때 초기화 설정
    userInputElement.style.display = "none"; // 사용자 입력 상자 숨기기

    userInputElement.textContent = ""; // 사용자 입력 상자 초기화
    if (level - 1 === controlNumber) {
      // congratulationMessage.style.display = "block";
      // congratulationMessage.textContent = "축하합니다! 본 화면을 캡쳐해서 개발자에게(rhaehfdl0433@naver.com) 공유해보세요! 랜덤 추첨으로 선물을 드립니다:)";
      openModal(`${firstMessage}\n${secondMessage}\n${thirdMessage}`);
    } else {
      const instructionElement = document.getElementById("instruction");
      instructionElement.textContent = `Game Over! Your Score: ${level - 1}`;
    }
    startButton.style.display = "block";
  }

  function arraysEqual(arr1, arr2) {
    return arr1.every((value, index) => value === arr2[index]);
  }

  startButton.addEventListener("click", () => {
    if (!gameRunning) {
      //게임 초기화 확인
      level = 1;
      playGame();
    }
  });

  function playGame() {
    gameRunning = true;
    startButton.style.display = "none"; //게임진행하고 있으면 startbutton숨기기
    userInputElement.style.display = "block"; // 사용자 입력 상자 숨기기
    userInputElement.textContent = ""; // 사용자 입력 상자 초기화
    instructionElement.textContent = `Level ${level}`;
    generateAnswer();
    showAnswer();
    //게임 다시 시작하게 될때 congratulationMessage 감추기
    congratulationMessage.style.display = "none";
    closeModal();
  }
});

function openModal(message) {
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modal-message");

  modalMessage.textContent = message;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
