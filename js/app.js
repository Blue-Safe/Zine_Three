const startScreen = document.getElementById("screenStart");
const formScreen = document.getElementById("screenForm");
const thanksScreen = document.getElementById("screenThanks");

const startBtn = document.getElementById("startBtn");
const form = document.getElementById("claimForm");

const claimType = document.getElementById("claimType");
const details = document.getElementById("details");

const warning = document.getElementById("warning");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const restartBtn = document.getElementById("restartBtn");

const bannedWords = [
    "harassment",
    "harrasement",
    "harasment",
    "sexual harassment",
    "assault",
    "assualt",
    "sexual assault",
    "rape",
    "molest",
    "molestation",
    "abuse",
    "sexual abuse",
    "groped",
    "groping",
    "touched me",
    "inappropriate touching",
    "violated",
    "violation",
    "coerced",
    "coercion",
    "forced",
    "pressure",
    "pressured",
    "threatened",
    "threat",
    "intimidated",
    "intimidation",
    "unsafe",
    "felt unsafe",
    "sexual",
    "sexually",
    "explicit",
    "comments",
    "inappropriate comments",
    "lewd",
    "lewd comments",
    "dirty",
    "suggestive",
    "made advances",
    "propositioned",
    "hit on me",
    "asked me out repeatedly",
    "unwanted advances",
    "unwanted",
    "staring",
    "stared at",
    "looked at my body",
    "body",
    "touched my",
    "grabbed",
    "boss",
    "manager",
    "supervisor",
    "director",
    "owner",
    "regional manager",
    "mr",
    "mr.",
    "mr smith",
    "mr.smith",
    "smith",
    "he is my boss",
    "my boss",
    "traumatized",
    "trauma",
    "disgusted",
    "terrified",
    "scared",
    "afraid",
    "humiliated",
    "embarrassed",
    "angry",
    "furious",
    "crying",
    "anxious",
    "he did",
    "he kept",
    "he wouldn't stop",
    "this is harassment",
    "this was assault",
    "he assaulted me",
    "he harassed me",
    "he abused"]
function hasBannedWord(text) {
  const t = text.toLowerCase();
  return bannedWords.some(w => t.includes(w));
}

function showScreen(which) {
  startScreen.hidden = (which !== "start");
  formScreen.hidden = (which !== "form");
  thanksScreen.hidden = (which !== "thanks");
}

function updateBlocking() {
  const typeSelected = claimType.value !== "";
  const text = details.value;

  let blocked = false;

 
  if (!typeSelected) blocked = true;

  if (hasBannedWord(text)) {
    blocked = true;
    warning.hidden = false;
    warning.textContent =
      "Your message contains restricted language and cannot be submitted. Please avoid sensitive topics or statements directed at coworkers. Please revise to comply with policy.";
  } else {
    warning.hidden = true;
    warning.textContent = "";
  }

  submitBtn.disabled = blocked;
}

startBtn.addEventListener("click", () => {
  showScreen("form");
});

claimType.addEventListener("change", updateBlocking);
details.addEventListener("input", updateBlocking);

clearBtn.addEventListener("click", () => {
  claimType.value = "";
  details.value = "";
  updateBlocking();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateBlocking();
  if (submitBtn.disabled) return;
  showScreen("thanks");
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

showScreen("start");
updateBlocking();