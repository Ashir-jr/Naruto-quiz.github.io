var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
    {
      q: "How old is Naruto when he gets married?",
      o: ["19", "24", "21", "27"],
      a: 0, // arrays start with 0, so answer is 19
    },
    {
      q: "What is under Kakashi's mask?",
      o: [" His face", "Buck teeth", "Anothermask", "Blimp lips"],
      a: 2,
    },
    {
      q: "How many surviving Uchihas are there?",
      o: ["4", "2", "3", "1"],
      a: 1,
    },
    {
      q: "Who permanently defeats Kaguya?",
      o: [
        "Naruto and Sasuke",
        "Orochimaru and Sasuke",
        "Itachi and Sasuke",
        "Obito,Kakashi and Naruto",
      ],
      a: 0,
    },
    {
      q: "How many times did Naruto fail the graduation test from the Academy?",
      o: ["four", "five", "three", "two"],
      a: 2,
    },
    {
      q: "What color is the eye shadow around Naruto's eyes when he enters sage mode?",
      o: ["orange", "blue", "black", "red"],
      a: 0,
    },
    {
      q: "Who was the 'White Fang of the Leaf'?",
      o: ["Minato Namikaze", "Kakashi Hatake", "Sakumo Hatake", "Orochimaru"],
      a: 2,
    },
    {
      q: "What is summoned when Itachi Mangekyo and Amaratsu are awakened?",
      o: ["snake", "Susano", "Toad", "Fox"],
      a: 1,
    },
    {
      q: "Which of the following is not one of the five basic chakra natures?",
      o: ["wind", "water", "fire", "ice"],
      a: 3,
    },
    {
      q: "What is the name of the dōjutsu in Sasuke's right eye?",
      o: ["Ketsuryugan", "Mangekyō Sharingan", "Byakugan", "Rinne Sharingan"],
      a: 1,
    },
    {
      q: "What is the name of the fourth Inner Gate?",
      o: ["The Gate of Pain", "The Gate of Limit", "The Gate of Joy", "The Gate of Life"],
      a: 0,
    },
    {
      q: "What kind of animal is Aoda?",
      o: ["Monkey", "Slug", "Frog", "Snake"],
      a: 3,
    },
    {
      q: "Which of the following is not one of the Three Great Dōjutsu?",
      o: ["Ketsuryūgan", "Sharingan", "Byakugan", "Rinnegan"],
      a: 0,
    },
    {
      q: "Who was 'The Professor'?",
      o: ["Jiraiya", "Orochimaru", "Hiruzen Sarutobi", "Tobirama Senju"],
      a: 2,
    },
    {
      q: "What is the real name of the pain that he fought in the leaf village?",
      o: ["Kakuzu", "Hiraku", "Kabuto", "Yahiku"],
      a: 3,
    },
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: function () {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: function () {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: function () {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let option = this;
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(function () {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        quiz.hQn.innerHTML =
          "You have answered " +
          quiz.score +
          " of " +
          quiz.data.length +
          " correctly.";
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset: function () {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  },
};

window.addEventListener("load", quiz.init);