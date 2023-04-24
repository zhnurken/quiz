const quizData = [
  {
    type: "radio",
    question: "Для кого вы ищете учебное заведение?",
    options: [
      "Себе",
      "Супругу/супруге",
      "Родственнику",
      "Коллеге",
      "Ребенку",
      "Другое",
    ],
  },
  {
    type: "select",
    question: "В каком городе планируете поступать?",
    options: [
      "Санкт-Петербург",
      "Москва",
      "Новосибирск",
      "Нижний Новгород",
      "Ростов на Дону",
    ],
  },
  {
    type: "radio",
    question: "Какое образование уже есть?",
    options: [
      "9 классов",
      "Колледж/техникум",
      "11 классов",
      "10 классов",
      "Училище",
      "Неоконченное высшее",
    ],
  },
  {
    type: "radio",
    question: "Куда планируете поступать?",
    options: ["Вуз", "Колледж/техникум", "Училище"],
  },
  {
    type: "radio",
    question: "Какую форму обучения предпочитаете?",
    options: ["Очную", "Заочную", "Дистанционную"],
  },
  {
    type: "radio",
    question: "Рассматриваете платное обучение?",
    options: [
      "Нет, только бюджет",
      "Да, планирую учиться платно",
      "Возможны оба варианта",
    ],
  },
  {
    type: "checkbox",
    question: "Какая специальность интересует?",
    options: [
      "Экономика",
      "Философия",
      "Социология",
      "Юриспруденция",
      "Медицина",
    ],
  },
  {
    type: "radio",
    question: "Как скоро планируете поступать?",
    options: ["Как можно быстрее", "Месяц", "Квартал", "Полгода", "Год"],
  },
];

const quizContainer = document.getElementById('quiz-container');

quizData.forEach((quizItem, index) => {
    const stepContainer = document.createElement('div');
    stepContainer.className = 'quiz__step';
    stepContainer.style.display = index === 0 ? "block" : "none";

    const stepTitle = document.createElement('p');
    stepTitle.className = 'quiz__step-title';
    stepTitle.innerHTML = quizItem.question;
    stepContainer.appendChild(stepTitle);

    const stepSubtitle = document.createElement("p");
    stepSubtitle.className = "quiz__step-subtitle";
    stepSubtitle.innerHTML = `Шаг ${index + 1} из ${quizData.length}`;
    stepContainer.appendChild(stepSubtitle);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'quiz__step-form';
    stepContainer.appendChild(optionsContainer);

    if (quizItem.type === 'radio') {
        quizItem.options.forEach((option, optionIndex) => {
            const optionLabel = document.createElement('label');
            optionLabel.className = 'quiz__step-label custom-radio';

            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question-${index + 1}`;
            optionInput.id = `question-${index + 1}-option-${optionIndex + 1}`;
            optionInput.value = `option-${optionIndex + 1}`;

            const checkmarkSpan = document.createElement('span');
            checkmarkSpan.className = 'checkmark';

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(checkmarkSpan);
            optionLabel.appendChild(document.createTextNode(option));

            optionsContainer.appendChild(optionLabel);
        });
    } else if (quizItem.type === 'checkbox') {
        const selectElement = document.createElement('checkbox');
        selectElement.name = `question-${index + 1}`;
        selectElement.multiple = true;

        quizItem.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('option');
            optionElement.value = `option-${optionIndex + 1}`;
            optionElement.innerHTML = option;

            selectElement.appendChild(optionElement);
        });

        optionsContainer.appendChild(selectElement);
    }

    quizContainer.appendChild(stepContainer);
});

// Добавляем кнопки "Назад" и "Далее"

const controlsContainer = document.createElement('div');
controlsContainer.className = 'quiz-controls';

const prevButton = document.createElement('button');
prevButton.className = "quiz__button quiz__button-prev";
prevButton.innerHTML = "Назад";
prevButton.disabled = true;
controlsContainer.appendChild(prevButton);

const nextButton = document.createElement("button");
nextButton.className = "quiz__button quiz__button-next";
nextButton.innerText = "Далее";
controlsContainer.appendChild(nextButton);

quizContainer.appendChild(controlsContainer);

// Обработчики событий для кнопок "Назад" и "Далее"

let currentStep = 0;

prevButton.addEventListener('click', () => {
    quizContainer.children[currentStep].style.display = 'none';
    currentStep--;
    quizContainer.children[currentStep].style.display = 'block';
    nextButton.innerText = currentStep === quizData.length - 1 ? 'Завершить' : 'Далее';
    prevButton.disabled = currentStep === 0;
});

nextButton.addEventListener("click", () => {
  quizContainer.children[currentStep].style.display = "none";
  currentStep++;
  quizContainer.children[currentStep].style.display = "block";
  nextButton.innerText =
    currentStep === quizData.length - 1 ? "Завершить" : "Далее";
  prevButton.disabled = currentStep === 0;
});