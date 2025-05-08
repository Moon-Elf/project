const questions = [
    "What was the first thing Umang said to you when you met?",
    "What's the most embarrassing moment of Umang that you know?",
    "What's the dumbest thing you and Umang planned but never actually did?",
    "What's one thing about Umang that always makes you smile?",
    "What's the most memorable thing Umang has said to you?",
    "If Umang had a superpower, what do you think it would be?",
    "What's something that you think Umang does better than anyone else?",
    "If Umang were to choose a theme song for his life, what would it be?",
    "What's the most random thing you and Umang have done together?",
    "What's one thing you think Umang should definitely try but hasn't yet?",
    "If Umang could live in any fictional world, which one do you think he'd pick?",
    "What's something that you've always wanted to ask Umang but never did?",
    "What's a quirky habit of Umang that you think is cute or funny?",
    "What's the weirdest thing Umang has ever done around you?",
    "If Umang were a superhero, what would his superhero name be?",
    "What's something Umang always says that annoys you?",
    "What's one thing you think Umang could never live without?",
    "What's the most random thing Umang has ever asked you to do?",
    "What's one thing you think Umang secretly likes but never admits?",
    "If Umang won a million dollars, what do you think he'd spend it on?",
    "Now, the final question: What do you think of Umang? What is he to you? Describe him in your own words! (At least 150 words)"
];

let currentQuestion = 0;
let answers = [];

// Initialize particles
document.addEventListener('DOMContentLoaded', function() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6C63FF" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#6C63FF", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    startQuiz();
});

function startQuiz() {
    document.getElementById("question-container").style.display = "block";
    document.getElementById("question-text").innerText = questions[currentQuestion];
    updateProgress();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar-fill").style.width = `${progress}%`;
    document.getElementById("progress-text").innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function nextQuestion() {
    let answerField = document.getElementById("answer");
    let answer = answerField.value.trim();

    if (!answer) {
        animateError(answerField);
        return;
    }

    answers.push(`Q${currentQuestion + 1}: ${answer}`);
    currentQuestion++;

    if (currentQuestion === questions.length - 1) {
        answerField.outerHTML = '<textarea id="answer" placeholder="Write your thoughts here..." required></textarea>';
        document.querySelector('.input-container').innerHTML += '<div class="underline"></div>';
    }

    if (currentQuestion < questions.length) {
        document.getElementById("question-text").innerText = questions[currentQuestion];
        document.getElementById("answer").value = "";
        updateProgress();
        animateQuestionChange();
    } else {
        document.getElementById("question-container").style.display = "none";
        document.getElementById("prank").style.display = "block";
        showPrankMessages();
    }
}

function animateError(element) {
    element.style.animation = 'shake 0.5s';
    element.style.borderBottomColor = 'var(--secondary)';
    setTimeout(() => {
        element.style.animation = '';
        element.style.borderBottomColor = '';
    }, 500);
}

function animateQuestionChange() {
    const questionText = document.getElementById("question-text");
    questionText.style.animation = 'fadeOut 0.3s forwards';
    
    setTimeout(() => {
        questionText.style.animation = 'fadeIn 0.3s forwards';
    }, 300);
}

let prankMessages = [
    "Analyzing your answers...",
    "Hmm... interesting responses...",
    "Calculating friendship score...",
    "Wow... we've been friends for so long, and yet...",
    "You got EVERYTHING COMPLETELY WRONG! 😭",
    "😂 Just kidding... APRIL FOOLS! 🎉",
    "Thanks for playing! Your answers have been recorded!"
];

let prankMessageIndex = 0;

function showPrankMessages() {
    const prankContainer = document.getElementById("prank");
    prankContainer.innerHTML = '';

    function addNextMessage() {
        if (prankMessageIndex < prankMessages.length) {
            let newMessage = document.createElement("p");
            newMessage.innerHTML = prankMessages[prankMessageIndex];
            newMessage.classList.add("animate__animated", "animate__fadeIn");
            prankContainer.appendChild(newMessage);

            prankMessageIndex++;

            if (prankMessageIndex === prankMessages.length - 2) {
                triggerConfetti();
            }

            if (prankMessageIndex < prankMessages.length) {
                setTimeout(addNextMessage, 2000);
            } else {
                setTimeout(sendEmail, 3000);
            }
        }
    }

    addNextMessage();
}

function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6C63FF', '#FF6584', '#FFFFFF']
    });
}

function sendEmail() {
    let formattedAnswers = answers.join("\n\n");
    document.getElementById("hiddenAnswers").value = formattedAnswers;
    document.getElementById("hiddenForm").submit();
}