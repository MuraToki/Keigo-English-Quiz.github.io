'use strict' 

{
  const ques = document.getElementById('ques');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel =document.querySelector('#result > h2');
  const scoreText =document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: 'ご不明な点はございませんか？の英訳は？', s:['Do you have any questions ? ', 'Can you understand or not ?', 'Do you have anything to ask ?', 'Do you have any complaints ?']},
    {q: '大変申し訳ございません、失念しておりました。の英訳は？', s:['I am verry sorry, I forgot.', 'I apologize, I can not forget.', 'I am not sorry, I get a book for my friend.', 'I am little sorry, it was my mistakes.']},
    {q: 'ご都合の良い時間はいつでしょうか？', s:['When is good time to call back ?', 'Where are you want to call me ?', 'When is bad time to sleep ?', 'What are you eating while talking to your friend ?']},
    {q: '少々お待ちください。の英訳は？', s:['Excuse me a moment.', 'Please wait a little.', 'Please give me some time', 'Please listen to my wishes.']},
    {q: 'それでは、お時間どうもありがとうございました。の英訳は？', s:['Okay, thank you for your time, Have a nice day.', 'Good, thank you, I am hungry.', 'OK, thank you to nice, see you.', 'That is all., thank you for listenin, Good Night.']},
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  
  function shuffle(arr) {
    
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].s[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled')
  }
  
  function setQuiz() {
    isAnswered = false;
    ques.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    const shuffledChoices = shuffle([...quizSet[currentNum].s]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
    if (currentNum === quizSet.length - 1) {
      btn.textContent = '点数の確認！';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    };
    btn.classList.add('disabled');
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `君の点数は、 ${score} / ${quizSet.length} 点です‼`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }

    
    if (score > 4) {
      scoreText.textContent = 'おめでとうございます！'
    } else  if (score > 2){
      scoreText.textContent = '惜しいですね'
    } else if(score > 0){
      scoreText.textContent = '頑張りましょう！'
    } else {
      scoreText.textContent = 'まだまだだな'
    }
  });

}