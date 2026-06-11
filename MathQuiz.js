const quesElem = document.getElementById("question");
const questionFormElem = document.getElementById("questionForm");
const scoreElem = document.getElementById("score");

let storedAnswer;
let score = 0;

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// console.log('randomNumber', randomNumber(0,25));

const genQues = () => {
    const randomNumber1 = randomNumber(1, 10);
    const randomNumber2 = randomNumber(1, 10);
    const quesType = randomNumber(1, 4);

    let fstNumber, SecNumber;
    if (randomNumber1 > randomNumber2 && quesType == 2) {
        fstNumber = randomNumber1;
        SecNumber = randomNumber2;
    } else {
        fstNumber = randomNumber2;
        SecNumber = randomNumber1;
    }

    let question, answer;

    // const question = `Que. What is ${randomNumber1} multiply by ${randomNumber2}`
    // const answer = randomNumber1 * randomNumber2;

    switch (quesType) {
        case 1:
            question = `Que. What is ${fstNumber} added to ${SecNumber}`
            answer = fstNumber + SecNumber;
            break;

        case 2:
            question = `Que. What is ${fstNumber} subtracted by ${SecNumber}`
            answer = fstNumber - SecNumber;
            break;

        case 3:
            question = `Que. What is ${fstNumber} multiplied by ${SecNumber}`
            answer = fstNumber * SecNumber;
            break;

        case 4:
            const product = randomNumber1 * randomNumber2;
            question = `Que. What is ${product} divided by ${randomNumber1}?`;
            answer = randomNumber2;
            break;
        // question = `Que. What is ${fstNumber} divided by ${SecNumber}`
        // answer = fstNumber / SecNumber;
        // break;

    }

    return { question, answer };
};

const showQues = () => {
    const { question, answer } = genQues();
    quesElem.innerText = question;
    storedAnswer = answer;
};

showQues();

const checkAnswer = (event) => {
    event.preventDefault();

    const formData = new FormData(questionFormElem);
    const userAnswer = +formData.get("answer");

    if (userAnswer === storedAnswer) {
        score += 5;
        showEffect("+5", "correct");  // ← add this
    } else {
        score -= 2;
        showEffect("-2", "wrong");    // ← add this
    }

    scoreElem.innerText = score;
    showQues();
    event.target.reset();
};

const showEffect = (text, type) => {
    const effect = document.createElement("span");
    effect.innerText = text;
    effect.classList.add("score-effect", type);

    const scoreRect = scoreElem.getBoundingClientRect();
    effect.style.left = scoreRect.right + 8 + "px";
    effect.style.top = scoreRect.top + "px";

    document.body.appendChild(effect);

    // remove after animation ends
    setTimeout(() => effect.remove(), 1000);
};
