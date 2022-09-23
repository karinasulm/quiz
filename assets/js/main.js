const questions = [
	{
		question: "Откуда родом кореллы?",
		answers: ["Австралия", "Африка", "Бразилия", "Аргентина"],
		correct: 1,
	},
	{
		question: "К какому семейству относятся кореллы?",
		answers: [
			"Семейство совиных попугаев",
			"Семейство какаду",
			"Семейство попугаевых",
			"Ни один из ответов не является верным",
		],
		correct: 2,
	},
	{
		question: "Сколько живут кореллы в дикой природе?",
		answers: [
			"5 - 10 лет",
			"10 - 15 лет",
			"15 - 20 лет",
			"Более 20 лет",
		],
		correct: 2,
	},
	{
		question: "Сколько живут кореллы в домашних условиях?",
		answers: [
			"5 - 10 лет",
			"10 - 15 лет",
			"15 - 20 лет",
			"Более 20 лет",
		],
		correct: 3,
	},
	{
		question: "Сколько обычно весят кореллы?",
		answers: [
			"50 - 100 грамм",
			"70 - 120 грамм",
			"100 - 150 грамм",
			"Более 150 грамм>",
		],
		correct: 2,
	}
];

const headerContainer = document.querySelector('#quiz-header');
const quiestionsRange = document.querySelector('#quiz-range span');
const listContainer = document.querySelector('#quiz-list');
const submitButton = document.querySelector('#quiz-submit');


let score = 0; // количество правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitButton.onclick = checkAnswer;

// функции

function clearPage() {
	headerContainer.innerHTML = "";
	listContainer.innerHTML = "";
}

function showQuestion() {
	// вывод текушего попроса
	const headerTemplate = `<h2 class="quiz__title">%title%</h2>`;
	const headerHTML = headerTemplate.replace('%title%', questions[questionIndex].question);
	headerContainer.innerHTML = headerHTML;
	// вывод ответов
	for ([index, answerText] of questions[questionIndex].answers.entries()) {
		const questionTemplate = `<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;
		const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', (index + 1));
		listContainer.innerHTML += answerHTML;
	}
}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('#quiz input[type="radio"]:checked');
	// если ответ не выбран - ничего не делаем, выходим из функции
	if (!checkedRadio) {
		submitButton.blur();
		return;
	}
	// сравниваем ответ с правильным
	const userAnswer = parseInt(checkedRadio.value);
	// если ответ верный - увеличиваем счет
	if (userAnswer === questions[questionIndex].correct) {
		score++;
	}
	// проверяем последний ли вопрос
	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		const qestionsPercent = Math.round((questionIndex / questions.length) * 100);
		quiestionsRange.style.width = `${qestionsPercent}%`;
		clearPage();
		showQuestion();
	} else {
		questionIndex = 0;
		quiestionsRange.style.width = `100%`;
		clearPage();
		showResults();
	}
	submitButton.blur();
}

function showResults() {
	const resultsTemplate = `
		<h2 class="quiz__title">%title%</h2>
		<h3 class="quiz__summary">%message%</h3>
		<p class="quiz__result">%result%</p>
	`;
	let title = "";
	let message = "";
	if (score === questions.length) {
		title = "Отлично!"
		message = "Вы ответили верно на все вопросы!";
	} else if ((score * 100) / questions.length >= 50) {
		title = "Не плохо!"
		message = "Вы дали более половины правильных вопросов!";
	} else {
		title = "Стоит постараться..."
		message = "У вас менее половины правильных ответов...";
	}
	const result = `${score} из ${questions.length}`;
	const finalMessage = resultsTemplate.replace('%title%', title).replace('%message%', message).replace('%result%', result);
	headerContainer.innerHTML = finalMessage;
	submitButton.innerText = 'Попробовать еще раз';
	submitButton.onclick = () => {
		history.go(); // перезагрузка страницы
	}
}

function changeRange() {
	const qestionsPercent = Math.round((questionIndex / questions.length) * 100);
	quiestionsRange.style.width = `${qestionsPercent}%`;
}