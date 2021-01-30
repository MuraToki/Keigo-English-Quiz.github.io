'use strict' 

{
  const ques = document.getElementById('ques');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel =document.querySelector('#result > h2');
  const scoreText =document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: 'I have been crazy about…の日本語訳は？', s:['…にめっちゃはまってる', '…についておかしいと思う', '…に驚愕した', 'について調べた']},
    {q: '「まさにその通り。」の英訳は？', s:['I could not agree more', 'I could understand your opinion.', 'I will go shopping', 'I thought so.']},
    {q: 'Can you do me a favor ? の日本語訳は？', s:['お願いを聞いてもらえる？', '熱っぽいけど大丈夫ですか？', '私にえこひいきができますか？', '私に賛成できますか？']},
    {q: '役に立ててうれしいよ。の英訳は？', s:['I am gald I could be of help.', 'Any time.', 'I was nothing.', 'I can not thank you enough.']},
    {q: 'Everyone makes mistakes somtimes. の日本語訳は？', s:['誰でも時には間違えるから。', 'あなたのせいではない。', 'みんなが失敗し過ぎ。', '二度と失敗はやめてくださいよ。']},
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