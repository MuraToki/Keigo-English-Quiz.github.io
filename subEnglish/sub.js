'use strict' 

{
  const ques = document.getElementById('ques');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel =document.querySelector('#result > h2');
  const scoreText =document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: 'I learned a lot.の日本語訳は？', s:['大変勉強になりました。', '無駄なことしか勉強できなかった。', '学ぶのはとてもだが辛い。', '多くのことを学んだから、おかしくなる。']},
    {q: 'May I ask you for your name ?の日本語訳は？', s:['お名前を伺ってよろしいでしょうか。', '君の名前を思い出すことができないかもしれない。', '聞きたいことは何ですか？', '私に君の名前を言わせてください。']},
    {q: 'please sit down の日本語訳は？', s:['どうぞお掛けになってください。', 'どうぞ来てくださいましたね。', 'どうか私だけでも座らせてください。', '席を譲ってください。']},
    {q: 'I am very sorry, I am late for the meeting.の日本語訳は？', s:['大変申し訳ございません、少し会議に遅れます。', 'マジでごめん、今日の約束少し遅れるわ。', 'ごめんなさい、私のせいで。', 'ごめんなさい、会話が少し成り立ってないですね。']},
    {q: 'I am happy, but I will refrain from doing so.の日本語訳は？', s:['お気持ちは嬉しいのですが、遠慮しておきます。', '嬉しいですけど、私ならそうしない。', '嬉しくないですけど、今回のそのようなことはやめておきます。', '嬉しいです、遠慮はしません。']},
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