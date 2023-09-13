const start_listening_btn = document.querySelector(".start-listening");

const listening_content = document.querySelector(".listening-content");
const slider_title = document.querySelector(".slider-title");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const text_btns = document.querySelectorAll(".text-btns button");
let c = 0;
const audioPlayer = document.getElementById("visualizations-player");
const audio = document.querySelector(".audio");
const icon = document.querySelector(".icon");
const audioBtns = document.querySelector(".audio-btns");
const questions = document.querySelector(".questions");
const parts = document.querySelectorAll(".part");
const choices = document.querySelectorAll(".choice");
const part1 = document.querySelector(".part1");
const part2 = document.querySelector(".part2");

Amplitude.init({
  bindings: {
    37: "prev",
    39: "next",
    32: "play_pause",
  },
  debug: true,
  // visualization: "michaelbromley_visualization",
  songs: [
    {
      name: "Tourism in Britain, Europe and Asia",
      // artist: "Ancient Astronauts",
      // album: "We Are to Answer",
      url: "./assets/audio/tourism.mp3",
      // cover_art_url: "./assets/listening/a.png",
      // visualization: "michaelbromley_visualization",
    },
  ],

  waveforms: {
    sample_rate: 300,
  },
  callbacks: {
    stop: function () {
      audioPlayer.style.display = "none";
      audioBtns.style.display = "flex";
    },
  },
});

start_listening_btn.addEventListener("click", () => {
  const listening_intro = document.querySelector(".listening-intro");
  listening_intro.style.display = "none";
  listening_content.style.display = "block";
});

let assay = [
  "Q1: What is the rank of the U.K in regards to tourism?",
  "Q2: How much does tourism contribute to the U.K. economy?",
  "Q3: When did mass tourism begin in England?",
  "Q4: Which type of holidays were popular in the nineteenth century?",
  "Q5: What do tourists expect to see in the U.K.?",
  "Q6: What are the most popular destinations in the country?",
  "Q7: How many heritage sites are there in the U.K.?",
  "Q8: What is the rank of the U.K. in regards to heritage sites?",
  "Q9: What is the main transportation method in the Europe trip?",
  "Q10: Name 3 cities tourists are expected to visit in the Europe trip.",
  "Q11: Name 4 entertainment destinations tourists are expected to enjoy on the Europe trip.",
  "Q12: Where do tourists stay during the Europe trip?",
  "Q13: Name 3 types of transportation tourists will use on the Asia trip.",
  "Q14: Name 2 cities that tourists will visit on the Asia trip.",
  "Q15: What are tourists expected to do in Laos?",
  "Q16: Where is Angkor Wat located? ",
];

let multiple = [
  [
    "1. Circle the destination that is NOT included in the Britain trip.",
    ["Oxford", "New York", "Edinburgh", "Snowdonia"],
    1,
  ],
  [
    "2. What is the main transportation method in Europe trip?",
    ["airplanes", "sailboats", "trains", "cars"],
    2,
  ],
  [
    "3. One of the following cities is not a destination of Europe trip:",
    ["Zurich", "York", "Vienna", "Prague"],
    1,
  ],
  [
    "4. One of the following is not a destination of Europe trip:",
    ["museums", "markets", "theatres", "water parks"],
    3,
  ],
  [
    "5. Where do tourists stay in Europe trip?",
    ["hotels", "farms", "dorms", "tents"],
    2,
  ],
  [
    "6. One of the following transportation methods is UNLIKELY for tourists to use on the Asia trip:",
    ["bikes", "canoes", "tuk-tuks", "coaches"],
    3,
  ],
  [
    "7. Where will tourists sleep in Asia trip?",
    ["hotels room", "dorm bunks", "night-train bunks", "farm houses"],
    2,
  ],
  [
    "8. Which of the following cities are tourists UNLIKELY to visit on an Asian trip?",
    ["Tokyo", "Bangkok", "Laos", "Angkor Wat"],
    0,
  ],
  [
    "9. What are tourists expected to do in Laos?",
    [
      "They will canoe along the Mekong River",
      " They will dive in the Mekong River",
      " They will high dive in the Mekong River",
      " They will sightsee the Mekong River",
    ],
    0,
  ],
  [
    "10. The United Kingdom hosts a total of _______________.",
    [
      "32 World Heritage sites",
      "28 World Heritage sites",
      "38 World Heritage sites",
      "40 World Heritage sites",
    ],
    0,
  ],
];

let part = 1;

resetArrow(prev, 0);
next.style.filter = "contrast(8)";
slider_title.innerText = assay[c];
setOptions();

prev.addEventListener("click", () => {
  handleChoices(1, "");
  resetArrow(next, 1);
  if (c != 0) {
    c--;
    if (part == 1) {
      slider_title.innerText = assay[c];
      document.querySelector(".box").value = "";
    } else {
      slider_title.innerText = multiple[c][0];
      setOptions();
    }
  }
  if (c == 0) {
    resetArrow(prev, 0);
  }
});

next.addEventListener("click", () => {
  handleChoices(1, "");
  let lastIndex = part == 1 ? assay.length : multiple.length;
  if (c != lastIndex - 1) {
    resetArrow(prev, 1);

    c++;
    if (part == 1) {
      slider_title.innerText = assay[c];
      document.querySelector(".box").value = "";
    } else {
      slider_title.innerText = multiple[c][0];
      setOptions();
    }
    if (c > lastIndex) {
      resetArrow(next, 0);

      c = lastIndex;
    }
  }
  if (c == lastIndex - 1) {
    next.style.opacity = ".6";
    next.style.filter = "contrast(0)";
    next.style.cursor = "initial";
  }
});
text_btns[0].addEventListener("click", () => {
  const box = document.querySelector(".box");
  box.value = "";
});
text_btns[1].addEventListener("click", () => {
  const box = document.querySelector(".box");
  console.log(box.value);
});

function restart() {
  audioPlayer.style.display = "block";
  audio.style.display = "flex";
  questions.style.display = "none";
  audioBtns.style.display = "none";
  icon.style.display = "block";
}

function displayQuestions() {
  audioPlayer.style.display = "none";
  audio.style.display = "none";
  questions.style.display = "block";
  audioBtns.style.display = "none";
  icon.style.display = "none";
  parts[1].style.display = "block";
}

parts[0].addEventListener("click", () => {
  console.log("go to multiple assay questions");
  parts[0].style.display = "none";
  parts[1].style.display = "block";
  part1.style.display = "block";
  part2.style.display = "none";
  part = 1;
  c = 0;
  resetArrow(prev, 0);
  resetArrow(next, 1);
  slider_title.innerText = assay[c];
});

parts[1].addEventListener("click", () => {
  console.log("go to multiple choise questions");
  parts[0].style.display = "block";
  parts[1].style.display = "none";
  part1.style.display = "none";
  part2.style.display = "block";
  part = 2;
  c = 0;
  resetArrow(prev, 0);
  resetArrow(next, 1);
  slider_title.innerText = multiple[c][0];
});

choices.forEach((choice, choiceIndx) => {
  choice.nextElementSibling.innerText = multiple[c][1][choiceIndx];
  choice.parentElement.addEventListener("click", () => {
    handleChoices(choiceIndx, multiple[c][2]);
  });
});

function handleChoices(choice, trueChoise) {
  let path = "";
  for (let i = 0; i < choices.length; i++) {
    path = choices[i].src.slice(0, choices[i].src.lastIndexOf("/"));
    choices[i].src = path + "/normal.svg";
    choices[i].nextElementSibling.style.color = "#fff";
  }
  if (trueChoise == choice) {
    choices[trueChoise].src = path + "/correct.svg";
    choices[choice].nextElementSibling.style.color = "#000";
  } else if (trueChoise === "") {
    // dont do any thing
  } else {
    choices[choice].src = path + "/in correct.svg";
    choices[choice].nextElementSibling.style.color = "#000";
  }
}

function resetArrow(arrow, status) {
  if (!status) {
    arrow.style.opacity = ".6";
    arrow.style.filter = "contrast(0)";
    arrow.style.cursor = "initial";
  } else {
    arrow.style.opacity = "1";
    arrow.style.filter = "contrast(8)";
    arrow.style.cursor = "pointer";
  }
}

function setOptions() {
  choices.forEach((choice, choiceIndx) => {
    choice.nextElementSibling.innerText = multiple[c][1][choiceIndx];
  });
}
