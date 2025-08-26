// Game state
let currentQuest = 0;
let score = 0;
let timeRemaining = 1200; // 20 minutes in seconds
let timerInterval;
let questScores = {
    1: 10, 2: 15, 3: 20, 4: 15, 5: 25, 6: 20, 7: 25, 8: 30
};
let teamMembers = [];
let startTime;

// Encoded answers
const answers = {
    q1: atob('cmVk'), // 'red'
    q2: String.fromCharCode(49), // '1'
    q3: 'enaqbz'.replace(/[a-zA-Z]/g, c => 
        String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)), // 'random'
    q4: 'rgb(128, 0, 128)',
    q5: (3 * 2).toString(), // '6'
    q6: String.fromCharCode(99, 108, 105, 99, 107), // 'click'
    q7: '=' + '=' + '=', // '==='
    q8: {
        a: ['textcontent', 'innerhtml', 'innertext'],
        b: 'display',
        c: 'queryselectorall',
        d: 'correctcolor'
    }
};

// Start the hunt
function startHunt() {
    // Get team members
    const member1 = document.getElementById('member1').value.trim();
    if (!member1) {
        alert('Please enter at least one team member name!');
        return;
    }
    
    teamMembers.push(member1);
    const member2 = document.getElementById('member2').value.trim();
    if (member2) teamMembers.push(member2);
    const member3 = document.getElementById('member3').value.trim();
    if (member3) teamMembers.push(member3);
    
    // Hide setup, show game
    document.getElementById('teamSetup').style.display = 'none';
    document.getElementById('timerSection').style.display = 'block';
    document.getElementById('progressTracker').style.display = 'flex';
    
    // Start first quest
    currentQuest = 1;
    showQuest(1);
    
    // Initialize Quest 4 colors
    initQuest4();
    
    // Start timer
    startTime = new Date();
    startTimer();
    
    console.log('Hunt started! Good luck finding all the clues!');
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timerText').textContent = timeStr;
    
    const progress = (timeRemaining / 1200) * 100;
    document.getElementById('timerProgress').style.width = progress + '%';
    
    // Change color as time runs out
    if (progress < 20) {
        document.getElementById('timerProgress').style.background = 'linear-gradient(90deg, #f44336, #ff6b6b)';
    } else if (progress < 50) {
        document.getElementById('timerProgress').style.background = 'linear-gradient(90deg, #ff9800, #ffb74d)';
    }
}

// Show quest
function showQuest(num) {
    // Hide all quests
    document.querySelectorAll('.quest').forEach(q => q.classList.remove('active'));
    
    // Show current quest
    document.getElementById('quest' + num).classList.add('active');
    
    // Update progress dots
    document.querySelectorAll('.progress-dot').forEach(dot => {
        const questNum = parseInt(dot.dataset.quest);
        if (questNum < num) {
            dot.classList.add('completed');
            dot.classList.remove('active');
        } else if (questNum === num) {
            dot.classList.add('active');
            dot.classList.remove('completed');
        } else {
            dot.classList.remove('active', 'completed');
        }
    });
}

// Show hint
function showHint(questNum) {
    document.getElementById('hint' + questNum).classList.add('shown');
    // Deduct points
    if (questNum === 1) questScores[1] = Math.max(0, questScores[1] - 2);
    else if (questNum === 2) questScores[2] = Math.max(0, questScores[2] - 3);
    else if (questNum === 3) questScores[3] = Math.max(0, questScores[3] - 4);
    else if (questNum === 4) questScores[4] = Math.max(0, questScores[4] - 3);
    else if (questNum === 5) questScores[5] = Math.max(0, questScores[5] - 5);
    else if (questNum === 6) questScores[6] = Math.max(0, questScores[6] - 4);
    else if (questNum === 7) questScores[7] = Math.max(0, questScores[7] - 5);
    else if (questNum === 8) questScores[8] = Math.max(0, questScores[8] - 6);
}

// Quest 1 checker
function checkQ1(answer) {
    const feedback = document.getElementById('feedback1');
    const correctAnswer = answers.q1;
    
    if (answer === correctAnswer) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ Correct! RGB(255,0,0) is pure red!';
        score += questScores[1];
        setTimeout(() => {
            currentQuest = 2;
            showQuest(2);
        }, 2000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Not quite. Think about what R stands for...';
    }
}

// Quest 2 checker
function checkQ2() {
    const answer = document.getElementById('answer2').value.trim();
    const feedback = document.getElementById('feedback2');
    const correctAnswer = answers.q2;
    
    if (answer === correctAnswer) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ Perfect! Arrays are 0-indexed, so green is at index 1!';
        score += questScores[2];
        setTimeout(() => {
            currentQuest = 3;
            showQuest(3);
        }, 2000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Remember: arrays start counting at 0!';
    }
}

// Quest 3 checker
function checkQ3() {
    const answer = document.getElementById('answer3').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback3');
    const correctAnswer = answers.q3;
    
    if (answer === correctAnswer) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ Excellent! Math.random() generates random numbers!';
        score += questScores[3];
        setTimeout(() => {
            currentQuest = 4;
            showQuest(4);
        }, 2000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Try again! It\'s a common Math method...';
    }
}

// Initialize Quest 4
function initQuest4() {
    const grid = document.getElementById('colorGrid4');
    const colors = [
        'rgb(255, 0, 0)',
        'rgb(0, 255, 0)',
        'rgb(0, 0, 255)',
        'rgb(128, 0, 128)', // Correct answer
        'rgb(255, 255, 0)',
        'rgb(0, 255, 255)'
    ];
    
    grid.innerHTML = '';
    colors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'color-option';
        div.style.backgroundColor = color;
        div.onclick = () => checkQ4(color);
        grid.appendChild(div);
    });
}

// Quest 4 checker
function checkQ4(color) {
    const feedback = document.getElementById('feedback4');
    const correctAnswer = answers.q4;
    
    if (color === correctAnswer) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ Great eye! That\'s purple (red + blue)!';
        score += questScores[4];
        setTimeout(() => {
            currentQuest = 5;
            showQuest(5);
        }, 2000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Not that one. Look for equal red and blue...';
    }
}

// Quest 5 checker
function checkQ5() {
    const answer = document.getElementById('answer5').value.trim();
    const feedback = document.getElementById('feedback5');
    const correctAnswer = answers.q5;
    
    if (answer === correctAnswer) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ Brilliant! The loop runs 6 times (3 * 2)!';
        score += questScores[5];
        setTimeout(() => {
            currentQuest = 6;
            showQuest(6);
        }, 2000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Count again. If numColors is 3, and we multiply by 2...';
    }
}

// Quest 6 checker
function checkQ6() {
    const answer = document.getElementById('answer6').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback6');
    const correctAnswer = answers.q6;
    
    if (answer === correctAnswer) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ Yes! \'click\' is the event for mouse clicks!';
        score += questScores[6];
        setTimeout(() => {
            currentQuest = 7;
            showQuest(7);
        }, 2000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Not quite. It\'s the most basic mouse event...';
    }
}

// Quest 7 checker
function checkQ7(answer) {
    const feedback = document.getElementById('feedback7');
    const correctAnswer = answers.q7;
    
    if (answer === correctAnswer) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ Perfect! === is for strict equality comparison!';
        score += questScores[7];
        setTimeout(() => {
            currentQuest = 8;
            showQuest(8);
        }, 2000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Remember: we need STRICT equality for exact matching...';
    }
}

// Quest 8 checker
function checkQ8() {
    const a1 = document.getElementById('answer8a').value.trim().toLowerCase();
    const a2 = document.getElementById('answer8b').value.trim().toLowerCase();
    const a3 = document.getElementById('answer8c').value.trim().toLowerCase();
    const a4 = document.getElementById('answer8d').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback8');
    
    let correct = 0;
    // Check if answer matches any of the accepted answers for part a
    if (answers.q8.a.includes(a1)) correct++;
    if (a2 === answers.q8.b) correct++;
    if (a3 === answers.q8.c) correct++;
    if (a4 === answers.q8.d) correct++;
    
    if (correct === 4) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ AMAZING! You\'ve mastered the color game code!';
        score += questScores[8];
        setTimeout(() => {
            endGame();
        }, 2000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = `❌ You got ${correct}/4 correct. Check your answers...`;
    }
}

// End game
function endGame() {
    clearInterval(timerInterval);
    
    // Calculate time taken
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    
    // Calculate grade
    const percentage = (score / 150) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';
    
    // Hide all quests
    document.querySelectorAll('.quest').forEach(q => q.classList.remove('active'));
    
    // Show results
    document.getElementById('finalResults').classList.add('show');
    document.getElementById('finalScore').textContent = `Total Score: ${score}/150`;
    document.getElementById('teamNames').textContent = `Team: ${teamMembers.join(', ')}`;
    document.getElementById('completionTime').textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('finalGrade').textContent = `Grade: ${grade} (${Math.round(percentage)}%)`;
    
    // Celebration
    if (percentage >= 70) {
        document.querySelector('.trophy').textContent = '🏆';
    } else {
        document.querySelector('.trophy').textContent = '🎯';
    }
}