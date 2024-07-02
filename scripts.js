function toggleMenuHeight() {
    const menu = document.getElementById('courseMenu');
    menu.classList.toggle('expanded');
}

function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.style.display = (dropdown.style.display === "none" || dropdown.style.display === "") ? "block" : "none";
}

function showContent(id) {
    const contents = document.getElementsByClassName("content");
    for (let content of contents) {
        content.style.display = "none";
    }

    const activeContent = document.getElementById(id);
    if (activeContent) {
        activeContent.style.display = "block";
    }

    // Pause all videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());

    // Restart and play the video within the active content
    const video = activeContent.querySelector('video');
    if (video) {
        video.currentTime = 0; // Reset the video to the start
        video.play();
    }

    // Update active link
    const links = document.querySelectorAll(".course-menu a");
    links.forEach(link => link.classList.remove("active-link"));

    const activeLink = document.querySelector(`[onclick="showContent('${id}')"]`);
    if (activeLink) {
        activeLink.classList.add("active-link");
    }
}

function setupVideoEndListeners() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('ended', () => moveToNextContent(video.closest('.content')));
    });
}

function moveToNextContent(currentContent) {
    let nextContent = currentContent.nextElementSibling;

    // Find the next valid content section
    while (nextContent && !nextContent.classList.contains('content')) {
        nextContent = nextContent.nextElementSibling;
    }

    if (nextContent) {
        showContent(nextContent.id);
    }
}

function setupContinueButtons() {
    const continueButtons = document.querySelectorAll('.continue-btn');
    continueButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentContent = button.closest('.content');
            moveToNextContent(currentContent);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize dropdowns to be hidden
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => dropdown.style.display = 'none');

    // Hide all content items initially and show the first one
    const contents = document.getElementsByClassName("content");
    if (contents.length > 0) {
        contents[0].style.display = "block";
    }

    // Set up video end listeners
    setupVideoEndListeners();

    // Set up continue button listeners
    setupContinueButtons();
});

/*Map*/

function showLocation(location) {
    const locations = {
        'NEOM': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580535.8423773396!2d35.00000000000001!3d27.86086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDUxJzM5LjAiTiAzNcKwMzAnMzAuMCJF!5e0!3m2!1sen!2s!4v1629275244958!5m2!1sen!2s',
        'Diriyah Gate': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580535.8423773396!2d46.00000000000001!3d24.7376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ0JzE1LjYiTiA0NsKwMzQnNDYuMCJF!5e0!3m2!1sen!2s!4v1629275244958!5m2!1sen!2s',
        'King Salman Park': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580535.8423773396!2d46.00000000000001!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQxLjAiTiA0NsKwNDAnMzIuMCJF!5e0!3m2!1sen!2s!4v1629275244958!5m2!1sen!2s',
        'Jeddah Tower': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580535.8423773396!2d39.00000000000001!3d21.71068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQyJzM4LjQiTiAzOcKwMDcnMTYuOCJF!5e0!3m2!1sen!2s!4v1629275244958!5m2!1sen!2s',
       'The Red Sea Project': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580535.8423773396!2d36.00000000000001!3d26.7974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ3JzUxLjAiTiAzNsKwMDMnMTkuMiJF!5e0!3m2!1sen!2s!4v1629275244958!5m2!1sen!2s',
        'King Abdullah Financial District': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580535.8423773396!2d46.00000000000001!3d24.7364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ0JzEwLjgiTiA0NsKwMzknMTUuMiJF!5e0!3m2!1sen!2s!4v1629275244958!5m2!1sen!2s'
    };

    const mapFrame = document.getElementById('mapFrame');
    mapFrame.src = locations[location];

    // Remove the active class from all buttons
    const buttons = document.querySelectorAll('.location-menu button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add the active class to the clicked button
    const activeButton = document.querySelector(`button[onclick="showLocation('${location}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function showAllLocations() {
    const allLocationsMapUrl = 'https://www.google.com.qa/maps/d/embed?mid=17jrEuDjUMToUY2tEB81zPpNa0GvKFUs&ehbc=2E312F'; // Your custom multi-location map URL
    const mapFrame = document.getElementById('mapFrame');
    mapFrame.src = allLocationsMapUrl;

    // Remove the active class from all buttons
    const buttons = document.querySelectorAll('.location-menu button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add the active class to the "Show All Pins" button
    const showAllButton = document.querySelector('button[onclick="showAllLocations()"]');
    if (showAllButton) {
        showAllButton.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize dropdowns to be hidden
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => dropdown.style.display = 'none');

    // Hide all content items initially and show the first one
    const contents = document.getElementsByClassName("content");
    if (contents.length > 0) {
        contents[0].style.display = "block";
    }

    // Set up video end listeners
    setupVideoEndListeners();

    // Set up continue button listeners
    setupContinueButtons();
});
/**/

/*video*/



let currentQuestion = 1;
const totalQuestions = 2;

function showQuestion(questionNumber) {
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`question-${i}`).style.display = 'none';
    }
    document.getElementById(`question-${questionNumber}`).style.display = 'block';
    document.getElementById('question-number').innerText = `Question ${questionNumber}/${totalQuestions}`;
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function submitAnswer() {
    const options = document.querySelectorAll(`#question-${currentQuestion} .options input`);
    let selectedValue;
    for (const option of options) {
        if (option.checked) {
            selectedValue = option.value;
            break;
        }
    }

    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');

    if (selectedValue === undefined) {
        resultText.innerText = 'Please select an option!';
    } else {
        // Add the correct answer checking logic here
        let correctAnswer;
        switch (currentQuestion) {
            case 1:
                correctAnswer = '2';
                break;
            case 2:
                correctAnswer = '1';
                break;
            default:
                correctAnswer = '';
        }

        if (selectedValue === correctAnswer) {
            resultText.innerText = 'Correct!';
        } else {
            resultText.innerText = 'Incorrect, please try again.';
        }
    }

    resultModal.style.display = 'block';
}

function closeModal() {
    const resultModal = document.getElementById('result-modal');
    resultModal.style.display = 'none';
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    const resultModal = document.getElementById('result-modal');
    if (event.target == resultModal) {
        resultModal.style.display = 'none';
    }
}

// Initially show the first question
document.addEventListener('DOMContentLoaded', () => {
    showQuestion(currentQuestion);
});

// Quiz2 specific logic
let currentQuestionQuiz2 = 1;
const totalQuestionsQuiz2 = 2;

function showQuestionQuiz2(questionNumber) {
    for (let i = 1; i <= totalQuestionsQuiz2; i++) {
        document.getElementById(`quiz2-question-${i}`).style.display = 'none';
    }
    document.getElementById(`quiz2-question-${questionNumber}`).style.display = 'block';
    document.getElementById('quiz2-question-number').innerText = `Question ${questionNumber}/${totalQuestionsQuiz2}`;
}

function nextQuestionQuiz2() {
    if (currentQuestionQuiz2 < totalQuestionsQuiz2) {
        currentQuestionQuiz2++;
        showQuestionQuiz2(currentQuestionQuiz2);
    }
}

function prevQuestionQuiz2() {
    if (currentQuestionQuiz2 > 1) {
        currentQuestionQuiz2--;
        showQuestionQuiz2(currentQuestionQuiz2);
    }
}

function submitAnswerQuiz2() {
    const options = document.querySelectorAll(`#quiz2-question-${currentQuestionQuiz2} .options input`);
    let selectedValue;
    for (const option of options) {
        if (option.checked) {
            selectedValue = option.value;
            break;
        }
    }

    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');

    if (selectedValue === undefined) {
        resultText.innerText = 'Please select an option!';
    } else {
        // Add the correct answer checking logic here
        let correctAnswer;
        switch (currentQuestionQuiz2) {
            case 1:
                correctAnswer = '3';
                break;
            case 2:
                correctAnswer = '2';
                break;
            default:
                correctAnswer = '';
        }

        if (selectedValue === correctAnswer) {
            resultText.innerText = 'Correct!';
        } else {
            resultText.innerText = 'Incorrect, please try again.';
        }
    }

    resultModal.style.display = 'block';
}

// Initially show the first question for quiz2
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz1')) {
        showQuestion(currentQuestion);
    }
    if (document.getElementById('quiz2')) {
        showQuestionQuiz2(currentQuestionQuiz2);
    }
});


// Quiz3 specific logic
let currentQuestionQuiz3 = 1;
const totalQuestionsQuiz3 = 2;

function showQuestionQuiz3(questionNumber) {
    for (let i = 1; i <= totalQuestionsQuiz3; i++) {
        document.getElementById(`quiz3-question-${i}`).style.display = 'none';
    }
    document.getElementById(`quiz3-question-${questionNumber}`).style.display = 'block';
    document.getElementById('quiz3-question-number').innerText = `Question ${questionNumber}/${totalQuestionsQuiz3}`;
}

function nextQuestionQuiz3() {
    if (currentQuestionQuiz3 < totalQuestionsQuiz3) {
        currentQuestionQuiz3++;
        showQuestionQuiz3(currentQuestionQuiz3);
    }
}

function prevQuestionQuiz3() {
    if (currentQuestionQuiz3 > 1) {
        currentQuestionQuiz3--;
        showQuestionQuiz3(currentQuestionQuiz3);
    }
}

function submitAnswerQuiz3() {
    const options = document.querySelectorAll(`#quiz3-question-${currentQuestionQuiz3} .options input`);
    let selectedValue;
    for (const option of options) {
        if (option.checked) {
            selectedValue = option.value;
            break;
        }
    }

    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');

    if (selectedValue === undefined) {
        resultText.innerText = 'Please select an option!';
    } else {
        // Add the correct answer checking logic here
        let correctAnswer;
        switch (currentQuestionQuiz3) {
            case 1:
                correctAnswer = '2';
                break;
            case 2:
                correctAnswer = '3';
                break;
            default:
                correctAnswer = '';
        }

        if (selectedValue === correctAnswer) {
            resultText.innerText = 'Correct!';
        } else {
            resultText.innerText = 'Incorrect, please try again.';
        }
    }

    resultModal.style.display = 'block';
}

// Initially show the first question for quiz3
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz1')) {
        showQuestion(currentQuestion);
    }
    if (document.getElementById('quiz2')) {
        showQuestionQuiz2(currentQuestionQuiz2);
    }
	if (document.getElementById('quiz3')) {
        showQuestionQuiz3(currentQuestionQuiz3);
    }
});

// Quiz4 specific logic
let currentQuestionQuiz4 = 1;
const totalQuestionsQuiz4 = 2;

function showQuestionQuiz4(questionNumber) {
    for (let i = 1; i <= totalQuestionsQuiz4; i++) {
        document.getElementById(`quiz4-question-${i}`).style.display = 'none';
    }
    document.getElementById(`quiz4-question-${questionNumber}`).style.display = 'block';
    document.getElementById('quiz4-question-number').innerText = `Question ${questionNumber}/${totalQuestionsQuiz4}`;
}

function nextQuestionQuiz4() {
    if (currentQuestionQuiz4 < totalQuestionsQuiz4) {
        currentQuestionQuiz4++;
        showQuestionQuiz4(currentQuestionQuiz4);
    }
}

function prevQuestionQuiz4() {
    if (currentQuestionQuiz4 > 1) {
        currentQuestionQuiz4--;
        showQuestionQuiz4(currentQuestionQuiz4);
    }
}

function submitAnswerQuiz4() {
    const options = document.querySelectorAll(`#quiz4-question-${currentQuestionQuiz4} .options input`);
    let selectedValue;
    for (const option of options) {
        if (option.checked) {
            selectedValue = option.value;
            break;
        }
    }

    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');

    if (selectedValue === undefined) {
        resultText.innerText = 'Please select an option!';
    } else {
        // Add the correct answer checking logic here
        let correctAnswer;
        switch (currentQuestionQuiz4) {
            case 1:
                correctAnswer = '2';
                break;
            case 2:
                correctAnswer = '2';
                break;
            default:
                correctAnswer = '';
        }

        if (selectedValue === correctAnswer) {
            resultText.innerText = 'Correct!';
        } else {
            resultText.innerText = 'Incorrect, please try again.';
        }
    }

    resultModal.style.display = 'block';
}

// Initially show the first question for quiz4
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz1')) {
        showQuestion(currentQuestion);
    }
    if (document.getElementById('quiz2')) {
        showQuestionQuiz2(currentQuestionQuiz2);
    }
	if (document.getElementById('quiz3')) {
        showQuestionQuiz3(currentQuestionQuiz3);
    }
	if (document.getElementById('quiz4')) {
        showQuestionQuiz4(currentQuestionQuiz4);
    }
});

// Quiz5 specific logic
let currentQuestionQuiz5 = 1;
const totalQuestionsQuiz5 = 2;

function showQuestionQuiz5(questionNumber) {
    for (let i = 1; i <= totalQuestionsQuiz5; i++) {
        document.getElementById(`quiz5-question-${i}`).style.display = 'none';
    }
    document.getElementById(`quiz5-question-${questionNumber}`).style.display = 'block';
    document.getElementById('quiz5-question-number').innerText = `Question ${questionNumber}/${totalQuestionsQuiz5}`;
}

function nextQuestionQuiz5() {
    if (currentQuestionQuiz5 < totalQuestionsQuiz5) {
        currentQuestionQuiz5++;
        showQuestionQuiz5(currentQuestionQuiz5);
    }
}

function prevQuestionQuiz5() {
    if (currentQuestionQuiz5 > 1) {
        currentQuestionQuiz5--;
        showQuestionQuiz5(currentQuestionQuiz5);
    }
}

function submitAnswerQuiz5() {
    const options = document.querySelectorAll(`#quiz5-question-${currentQuestionQuiz5} .options input`);
    let selectedValue;
    for (const option of options) {
        if (option.checked) {
            selectedValue = option.value;
            break;
        }
    }

    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');

    if (selectedValue === undefined) {
        resultText.innerText = 'Please select an option!';
    } else {
        // Add the correct answer checking logic here
        let correctAnswer;
        switch (currentQuestionQuiz5) {
            case 1:
                correctAnswer = '3';
                break;
            case 2:
                correctAnswer = '2';
                break;
            default:
                correctAnswer = '';
        }

        if (selectedValue === correctAnswer) {
            resultText.innerText = 'Correct!';
        } else {
            resultText.innerText = 'Incorrect, please try again.';
        }
    }

    resultModal.style.display = 'block';
}

// Initially show the first question for quiz5
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz1')) {
        showQuestion(currentQuestion);
    }
    if (document.getElementById('quiz2')) {
        showQuestionQuiz2(currentQuestionQuiz2);
    }
	if (document.getElementById('quiz3')) {
        showQuestionQuiz3(currentQuestionQuiz3);
    }
	if (document.getElementById('quiz4')) {
        showQuestionQuiz4(currentQuestionQuiz4);
    }
	if (document.getElementById('quiz5')) {
        showQuestionQuiz5(currentQuestionQuiz5);
    }
});

// Quiz6 specific logic
let currentQuestionQuiz6 = 1;
const totalQuestionsQuiz6 = 5;

function showQuestionQuiz6(questionNumber) {
    for (let i = 1; i <= totalQuestionsQuiz6; i++) {
        document.getElementById(`quiz6-question-${i}`).style.display = 'none';
    }
    document.getElementById(`quiz6-question-${questionNumber}`).style.display = 'block';
    document.getElementById('quiz6-question-number').innerText = `Question ${questionNumber}/${totalQuestionsQuiz6}`;
}

function nextQuestionQuiz6() {
    if (currentQuestionQuiz6 < totalQuestionsQuiz6) {
        currentQuestionQuiz6++;
        showQuestionQuiz6(currentQuestionQuiz6);
    }
}

function prevQuestionQuiz6() {
    if (currentQuestionQuiz6 > 1) {
        currentQuestionQuiz6--;
        showQuestionQuiz6(currentQuestionQuiz6);
    }
}

function submitAnswerQuiz6() {
    const options = document.querySelectorAll(`#quiz6-question-${currentQuestionQuiz6} .options input`);
    let selectedValue;
    for (const option of options) {
        if (option.checked) {
            selectedValue = option.value;
            break;
        }
    }

    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');

    if (selectedValue === undefined) {
        resultText.innerText = 'Please select an option!';
    } else {
        // Add the correct answer checking logic here
        let correctAnswer;
        switch (currentQuestionQuiz6) {
            case 1:
                correctAnswer = '3';
                break;
            case 2:
                correctAnswer = '2';
                break;
			case 3:
                correctAnswer = '2';
                break;
			case 4:
                correctAnswer = '3';
                break;
			case 5:
                correctAnswer = '2';
                break;			
            default:
                correctAnswer = '';
        }

        if (selectedValue === correctAnswer) {
            resultText.innerText = 'Correct!';
        } else {
            resultText.innerText = 'Incorrect, please try again.';
        }
    }


    resultModal.style.display = 'block';
}

// Initially show the first question for quiz6
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz1')) {
        showQuestion(currentQuestion);
    }
    if (document.getElementById('quiz2')) {
        showQuestionQuiz2(currentQuestionQuiz2);
    }
	if (document.getElementById('quiz3')) {
        showQuestionQuiz3(currentQuestionQuiz3);
    }
	if (document.getElementById('quiz4')) {
        showQuestionQuiz4(currentQuestionQuiz4);
    }
	if (document.getElementById('quiz5')) {
        showQuestionQuiz5(currentQuestionQuiz5);
    }
	if (document.getElementById('quiz6')) {
        showQuestionQuiz6(currentQuestionQuiz6);
    }
});

// Quiz7 specific logic
    let currentQuestionQuiz7 = 1;
    const totalQuestionsQuiz7 = 5;

    function showQuestionQuiz7(questionNumber) {
        for (let i = 1; i <= totalQuestionsQuiz7; i++) {
            document.getElementById(`quiz7-question-${i}`).style.display = 'none';
        }
        document.getElementById(`quiz7-question-${questionNumber}`).style.display = 'block';
        document.getElementById('quiz7-question-number').innerText = `Question ${questionNumber}/${totalQuestionsQuiz7}`;
    }

    function nextQuestionQuiz7() {
        if (currentQuestionQuiz7 < totalQuestionsQuiz7) {
            currentQuestionQuiz7++;
            showQuestionQuiz7(currentQuestionQuiz7);
        }
    }

    function prevQuestionQuiz7() {
        if (currentQuestionQuiz7 > 1) {
            currentQuestionQuiz7--;
            showQuestionQuiz7(currentQuestionQuiz7);
        }
    }

    function submitAnswerQuiz7() {
        const options = document.querySelectorAll(`#quiz7-question-${currentQuestionQuiz7} .options input`);
        let selectedValue;
        for (const option of options) {
            if (option.checked) {
                selectedValue = option.value;
                break;
            }
        }

        const resultModal = document.getElementById('result-modal');
        const resultText = document.getElementById('result-text');

        if (selectedValue === undefined) {
            resultText.innerText = 'Please select an option!';
        } else {
            // Add the correct answer checking logic here
            let correctAnswer;
            switch (currentQuestionQuiz7) {
                case 1:
                    correctAnswer = '2';  
                    break;
                case 2:
                    correctAnswer = '2';  
                    break;
                case 3:
                    correctAnswer = '3';  
                    break;
                case 4:
                    correctAnswer = '3';  
                    break;
                case 5:
                    correctAnswer = '2';  
                    break;
                default:
                    correctAnswer = '';
            }

            if (selectedValue === correctAnswer) {
                resultText.innerText = 'Correct!';
            } else {
                resultText.innerText = 'Incorrect, please try again.';
            }
        }

        resultModal.style.display = 'block';
    }

    // Initially show the first question for quiz7
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('quiz1')) {
            showQuestion(currentQuestion);
        }
        if (document.getElementById('quiz2')) {
            showQuestionQuiz2(currentQuestionQuiz2);
        }
        if (document.getElementById('quiz3')) {
            showQuestionQuiz3(currentQuestionQuiz3);
        }
        if (document.getElementById('quiz4')) {
            showQuestionQuiz4(currentQuestionQuiz4);
        }
        if (document.getElementById('quiz5')) {
            showQuestionQuiz5(currentQuestionQuiz5);
        }
        if (document.getElementById('quiz6')) {
            showQuestionQuiz6(currentQuestionQuiz6);
        }
        if (document.getElementById('quiz7')) {
            showQuestionQuiz7(currentQuestionQuiz7);
        }
    });








