const questions = [
	{
		question: "¿Cuál es la salida de: console.log(typeof null)?",
		answers: [
			{ text: "object", correct: true },
			{ text: "null", correct: false },
			{ text: "undefined", correct: false },
			{ text: "number", correct: false },
		]
	},
	{
		question: "¿Cuál de las siguientes no es una palabra reservada en JavaScript?",
		answers: [
			{ text: "let", correct: false },
			{ text: "const", correct: false },
			{ text: "yield", correct: false },
			{ text: "awaiting", correct: true },
		]
	},
	{
		question: "¿Qué método se usa para convertir una cadena de texto a un número entero?",
		answers: [
			{ text: "parseInt()", correct: true },
			{ text: "Number()", correct: false },
			{ text: "parseFloat()", correct: false },
			{ text: "toString()", correct: false },
		]
	},
	{
		question: "¿Qué es una 'closure' en JavaScript?",
		answers: [
			{ text: "Una función que recuerda su entorno léxico", correct: true },
			{ text: "Una variable global", correct: false },
			{ text: "Un bucle dentro de una función", correct: false },
			{ text: "Una función sin parámetros", correct: false },
		]
	},
	{
		question: "¿Cuál es la diferencia entre '==' y '===' en JavaScript?",
		answers: [
			{ text: "'==' compara valores y tipos, '===' solo compara valores", correct: false },
			{ text: "'==' compara valores sin importar el tipo, '===' compara valores y tipos", correct: true },
			{ text: "No hay diferencia", correct: false },
			{ text: "'==' es solo para números, '===' es para strings", correct: false },
		]
	}
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//Inicializamos o reiniciamos el quiz
function startQuiz(){
	currentQuestionIndex = 0; // Reinicia el índice de la pregunta actual a la primera
	score = 0; // Reinicia el puntaje a cero
	nextButton.innerHTML = "Siguiente"; // Cambia el texto del botón "Siguiente" a "Siguiente"
	showQuestion(); // Llama a la función para mostrar la primera pregunta
}

function showQuestion() {
	resetState();
	let currentQuestion = questions[currentQuestionIndex]; // Obtiene la pregunta actual según el índice
	let questionNo = currentQuestionIndex + 1; // Suma 1 al índice para mostrar el número de la pregunta
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Muestra el número de la pregunta y el texto en la interfaz

	currentQuestion.answers.forEach(answer => { 
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtonsElement.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function resetState() {
	nextButton.style.display = "none"; 
	while(answerButtonsElement.firstChild){
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtonsElement.children).forEach(button => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct")
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore() {
	resetState();
	questionElement.innerHTML = `Tu puntaje es ${score} de ${questions.length}!`;
	nextButton.innerHTML = "Juega de nuevo";
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	}else{
		showScore();
	}
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < questions.length) {
		handleNextButton();
	}else{
		startQuiz();
	}
});

startQuiz();