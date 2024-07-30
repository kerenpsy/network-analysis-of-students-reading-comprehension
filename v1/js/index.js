let timeline = []
let list = []
let switchPra = true // true则循环练习，false继续
let score = 16 //总分
let scoreE = 8 //说明文得分
let scoreN = 8 //记叙文得分
let score1 = 0 //获得与推断 - 1
let score2 = 0 //分析与综合 - 2
let score3 = 0 //鉴赏与评价 - 3
let score4 = 0 //运用与创新 - 4
let shortQuest = []
let E5C3J = {} //简答题
let N5A1J = {} //简答题
let praListE = [] // 说明文练习
let praListN = [] //记叙文练习
let practiceLoopBlock = [] //练习循环

let jsPsych = initJsPsych({
  use_webaudio: true,
  on_finish: function () {
    jsPsych.data.get().localSave('csv', '实验结果');
  },
  extensions: [
      { type: Naodao }
  ]
});

//欢迎页
let welcome = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: `
  <h1 style="margin-bottom:10px">同学，你好！👋</h1>
  <h2 style="margin-bottom:100px">欢迎你参加本次阅读理解能力测试</h2>
  `,
  button_label: ["Let's Go🤓"]
};

//收集被试信息
var participantsInfo = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<h1 style="margin-bottom:50px">📋请输入你的个人信息</h1>',
  html:
    `<div style="max-width: 400px; margin: 0 auto;font-size:24px">

    <div style="display: flex; align-items: center; margin-bottom: 25px;">
      <div style="width: 80px; text-align: right;">学校:</div>
      <input name="class" type="text" placeholder="请填写学校" style="flex: 1; font-size:24px; margin-left: 10px; padding: 5px; border: 1px solid #ccc;" required>
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 25px;">
      <div style="width: 80px; text-align: right;">年级:</div>
      <div style="flex:1;margin-left:15px;text-align: left;">五年级</div>
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 25px;">
      <div style="width: 80px; text-align: right;">班级:</div>
      <input name="class" type="number" placeholder="请输入数字" style="flex: 1; font-size:24px; margin-left: 10px; padding: 5px; border: 1px solid #ccc;" required>
    </div>

    <div style="display: flex; align-items: center; margin-bottom: 25px;">
      <div style="width: 80px; text-align: right;">学号:</div>
      <input name="id" type="number" placeholder="请输入数字" style="flex: 1; font-size:24px; margin-left: 10px; padding: 5px; border: 1px solid #ccc;" required>
    </div>

    <div style="display: flex; align-items: center; margin-bottom: 25px;">
      <div style="width: 80px; text-align: right;">姓名:</div>
      <input name="name" type="text" placeholder="请填写名字" style="flex: 1; font-size:24px; margin-left: 10px; padding: 5px; border: 1px solid #ccc;" required>
    </div>

    <div style="display: flex; align-items: center; margin-bottom: 25px;">
    <label for="age" style="width: 80px; text-align: right;">年龄:</label>
    <select id="age" name="age" style="flex: 1; font-size:24px; margin-left: 10px; padding: 5px; border: 1px solid #ccc;">
      <option value="" disabled selected hidden>请选择年龄</option>
      <option value="9">9岁</option>
      <option value="10">10岁</option>
      <option value="11">11岁</option>
      <option value="12">12岁</option>
      <option value="12">13岁</option>
    </select>
  </div>

    <div style="margin: 20px 0 50px 0; display: flex; align-items: center;">
      <div style="width: 80px; text-align: right;">性别:</div>  
      <label style="margin:0 20px 0 10px;"><input name="gender" type="radio" value="male" required> 男</label> 
      <label><input name="gender" type="radio" value="female" required> 女</label>
    </div>
  
  </div>
  `,
  button_label: '确认'
};

let readingSurvey = {
  type: jsPsychSurveyLikert,
  preamble: `<div style="width:1200px;margin:0 auto;font-size:30px;line-height:45px">📋小调查</div>`,
  questions: [
    {prompt: "关于你的阅读兴趣",
     name: 'interest',
     labels: [
      "<div style='margin-top:10px'>1</div><div style='margin:10px 0 0 -35px;width: 105px;'>没有兴趣</div>",
      "<div style='margin-top:10px'>2</div>",
      "<div style='margin-top:10px'>3</div><div style='margin-top:10px;'>一般</div>",
      "<div style='margin-top:10px'>4</div>",
      "<div style='margin-top:10px'>5</div><div style='margin:10px 0 0 -10px;width: 105px;'>极有兴趣</div>",
    ],
    required: true
  },
    {prompt: "关于你的阅读习惯",
    name: 'habit',
    labels: [
      "<div style='margin-top:10px'>1</div><div style='margin:10px 0 0 -35px;width: 105px;'>没有习惯</div>",
      "<div style='margin-top:10px'>2</div>",
      "<div style='margin-top:10px'>3</div><div style='margin-top:10px;'>一般</div>",
      "<div style='margin-top:10px'>4</div>",
      "<div style='margin-top:10px'>5</div><div style='margin:10px 0 0 -10px;width: 105px;'>养成习惯</div>",
   ],
   required: true
  },
  ],
  button_label: '确认',
  on_start:function(){
  }
};

//总指导语
let instruction = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p style="margin-bottom: 15px;font-size: 1.4em;line-height:2">
    🤔你想了解和提高自己的阅读水平吗？
      <br>
      本次测试会出示<span class="redT">8篇文章📜</span>，帮助你了解自己的阅读能力。
      <br>
      请你仔细阅读这8篇文章，并认真完成文章后的题目。
      <br>
      📝题目一共有<span class="redT">三种</span>：
      <br>
      第一种是<span class="redT">选择题</span>，每道选择题只有一个正确答案；
      <br>
      第二种是<span class="redT">评分题</span>，需要你根据题意，对词语之间的<span class="redT" style="font-style: italic;">关系</span>进行评分（放心，稍后会有例题哦！）；
      <br>
      第三种是<span class="redT">简答题</span>，需要你输入一段进行回答。
      <br>
      在测试结束后，你将拥有一份属于你的阅读理解能力报告，让你更了解自己的阅读水平。
    </p>
  
    <p style="text-align: center; font-size: 1.2em; color: #1890ff; margin-top: 30px;">
    🏅祝你成功，best wish!🏅
    </p>`,
  choices: ['继续']
};

//前测指导语
let preInstruction = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h1 style="color: #1890ff;">小小练习</h1>

    <p style="margin-bottom: 15px;font-size: 1.4em;line-height:2">
    正式测试开始前，让我们先做一做评分题的练习。
      <br>
      评分题有两种，第一种是<span class="redT">相邻性评分</span>，第二种是<span class="redT">关联性评分</span>。
    </p>`,
  choices: ['开始练习']
};

//前测指导语
let preNAdjionInstruction = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p style="margin-bottom: 15px;font-size: 1.4em;line-height:2">
    现在，我们来做一做“相邻性评分”的练习。
    <br>
    即根据词语之间的位置关系远近进行评分.
    </p>`,
  choices: ['开始练习']
};

//前测指导语
let preECorrelateInstruction = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p style="margin-bottom: 15px;font-size: 1.4em;line-height:2">
    接下来，我们来做一做“关联性评分”的测试。
      <br>
      想象老师让你在班级同学中找出一对对的好朋友。
      <br>
      一群班级同学是文章的关键词，
      <br>
      而一对好朋友则是关键词组之间的关系远近。
      <br>
      相邻性评分的规则是指根据文章的内容，
      <br>
      语文老师从中挑选出30个左右关键词，
      <br>
      然后你根据对文章的理解，对词组之间的逻辑关系进行评分。
    </p>`,
  choices: ['开始练习']
};

//说明文E关联性评分
var likertScaleE = [
  "<div style='margin-top:10px'>1</div><div style='margin:10px 0 0 -35px;width: 105px;'>完全无关</div>",
  "<div style='margin-top:10px'>2</div>",
  "<div style='margin-top:10px'>3</div>",
  "<div style='margin-top:10px'>4</div>",
  "<div style='margin-top:10px'>5</div>",
  "<div style='margin-top:10px'>6</div>",
  "<div style='margin-top:10px'>7</div>",
  "<div style='margin-top:10px'>8</div>",
  "<div style='margin-top:10px'>9</div><div style='margin:10px 0 0 -10px;width: 105px;'>关系密切</div>",
];

//记叙文N相邻性评分
var likertScaleN = [
  "<div style='margin-top:10px'>不相邻</div>",
  "<div style='margin-top:10px'>相邻</div>"
];


//前测
function practiceFun(content, quest, type) {
  return {
    type: jsPsychSurveyLikert,
    preamble: function () {
      let text =
        `
      <div style="width:80%;margin:0 auto;font-size:24px;line-height:45px">
      <p class="aContent">${content}</p>
      </div>
      <div style="width:80%;margin:0 auto;font-size:24px;line-height:45px;font-weight:bold;text-align:left"></div>
      `
      return text
    },
    questions: function () {
      //判断是说明文还是记叙文
      if (type === 'E') {
        likert_scale = likertScaleE
      } else {
        likert_scale = likertScaleN
      }
      return [{
        prompt: quest.keyword1 + '&nbsp-&nbsp' + quest.keyword2,
        name: quest.sequence,
        labels: likert_scale,
        required: true, //必填
        horizontal: true
      }]
    },
    button_label: '提交',
    on_finish: function (data) {
      console.log(data);
      if (_.isEqual(data.response, quest.corAns)) {
        switchPra = false;
      } else {
        switchPra = true;
      }
    }
  }
}

function praFeedbackFun(quest) {
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: function () {
      let feedback = switchPra ? '回答错误' : '回答正确！';
      let tempHtml = `
      <h1 style="color: red;">${feedback}</h1>
      <p style="margin-bottom: 15px;font-size: 1.4em;line-height:2">
        <b>小提示：</b>
        <br>
        ${quest.tips}
      </p>
    `
      return tempHtml
    },
    choices: ['继续']
  }
}

function practiceLoopFun(list) {
  return {
    timeline: [...list],
    loop_function: function () {
      if (switchPra) {
        return true;
      } else {
        return false;
      }
    }
  }
}

//说明文关联性前测循环
for (let i = 0; i < corrEPraObj.questions.length; i++) {
  praListE.push(practiceFun(corrEPraObj.content, corrEPraObj.questions[i], 'E'),praFeedbackFun(corrEPraObj.questions[i]))
}

//记叙文相邻性前测循环
for (let i = 0; i < adjoinNPraObj.questions.length; i++) {
  praListN.push(practiceFun(adjoinNPraObj.content, adjoinNPraObj.questions[i], 'N'),praFeedbackFun(adjoinNPraObj.questions[i]))
}


//正式测验过渡页
let testBegin = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h1 style="color: #1890ff" class="mb66">接下来是正式测验</h1>`,
  choices: ['开始']
};

//第一部分：说明文+关联性评分指导语
let part1E = {
  type: jsPsychHtmlButtonResponse,
  stimulus: ` 
  <h1 style="color: #1890ff">第一部分</h1>
  <p style="color: black; font-size: 24px; line-height: 45px;">
  请你仔细阅读以下文章，<br>
  分别完成<span class="redT">选择题</span>与<span class="redT">关联性评分</span>的题目。
  </p>
`,
  choices: ['开始']
};

//第二部分：记叙文+相邻评分指导语
let part2N = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1 style="color: #1890ff">第二部分</h1>
  <p style="color: black; font-size: 24px; line-height: 45px;">
    请你仔细阅读以下文章，<br>
    分别完成<span class="redT">选择题</span>与<span class="redT">相邻性评分</span>的题目。
  </p>
  `,
  choices: ['开始']
};

//第三部分：简答题指导语
let part3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1 style="color: #1890ff">第三部分</h1>
  <p style="color: black; font-size: 24px; line-height: 45px;">
    请你仔细阅读以下文章，<br>
    分别完成<span class="redT">选择题</span>与<span class="redT">简答题</span>的题目。
  </p>
  `,
  choices: ['开始']
};

//测验 - 选择题
function createMultiChoice(article) {
  return {
    type: jsPsychSurveyMultiChoice,
    preamble: function () {
      let text =
        `
    <div style="width:80%;margin:0 auto;font-size:24px;line-height:45px">
    <h1 class="aTitle">${article.aTitle}</h1>

    <p class="aContent">${article.aContent}</p>
    </div>
    <div style="width:80%;margin:0 auto;font-size:24px;line-height:45px;font-weight:bold;text-align:left;font-family: 'FangSong'">一、选择题：每道题只有一个正确答案，请你根据你对文章的理解，完成以下选择题。</div>
    <div id="article">
      <div style="width:80%;margin:0 auto;font-size:24px;line-height:45px">
        <h1 class="aTitle">${article.aTitle}</h1>

        <p class="aContent">${article.aContent}</p>
      </div>
    </div>

    <!-- 展开/收起按钮 -->
    <button onclick="toggleArticleView()" id="toggleArticleBtn">查看文章</button>


    `
      return text
    },
    questions: function () {
      let oriQuestList = article.questions
      console.log(oriQuestList);
      let finQuestList = []
      for (let i = 0; i < oriQuestList.length; i++) {
        let index = String(i + 1)
        finQuestList.push({
          prompt: index + '.&nbsp' + oriQuestList[i].qTitle,
          name: 'Q' + index,
          options: oriQuestList[i].qOptions,
          required: true,//必填
          horizontal: false
        })
      }
      return finQuestList
    },
    button_label: '下一题',
    on_finish: function (data) {
      let answerList = Object.values(data.response);
      let quest = article.questions
      for (i = 0; i < quest.length; i++) {
        data.response[i] = answerList[i][0]
        if (quest[i].qAnswer === data.response[i]) {
          score++
          if (article.aType == 'E') {
            scoreE++
          } else {
            scoreN++
          }
          if (quest[i].qType === '1') {
            score1++;
          } else if (quest[i].qType === '2') {
            score2++;
          } else if (quest[i].qType === '3') {
            score3++;
          } else if (quest[i].qType === '4') {
            score4++;
          }
        }
      }
      console.log(score);
      console.log(scoreE);
      console.log(scoreN);
      console.log(score1);
      console.log(score2);
      console.log(score3);
      console.log(score4);
    }
  }
}

//测验 - 评分题
function createMultiLikert(article, type) {
  return {
    type: jsPsychSurveyLikert,
    preamble: function () {
      let curQuest = ''
      if (type === 'E') {
        curQuest = '二、评分题：以下为关联性评分，即根据词语之间的逻辑关系远近进行评分。<br></div><div style="width:80%;margin:0 auto;font-size:24px;line-height:45px;;text-align:left;font-style: italic;">1分表示词语之间没有关系；9分表示词语之间关系密切；5分表示词语之间有关系，但关系相对较小。'
      } else {
        curQuest = '二、评分题：以下为相邻性评分，即根据词语之间的位置关系远近进行评分。'
      }
      let text =
        `
    <div style="width:80%;margin:0 auto;font-size:24px;line-height:45px">
      <h1 class="aTitle">${article.aTitle}</h1>

      <p class="aContent">${article.aContent}</p>
    </div>
    <div style="width:80%;margin:0 auto;font-size:24px;line-height:45px;font-weight:bold;text-align:left">${curQuest}</div>
    `
      return text
    },
    questions: function () {
      let likert_scale = ''
      //判断是说明文还是记叙文
      if (type === 'E') {
        likert_scale = likertScaleE
      } else {
        likert_scale = likertScaleN
      }
      let oriRatingList = article.ratingList
      let finRatingList = []
      for (let i = 0; i < oriRatingList.length; i++) {
        let index = String(i + 1)
        finRatingList.push({
          prompt: index + '.&nbsp' + oriRatingList[i].keyword1 + '&nbsp-&nbsp' + oriRatingList[i].keyword2,
          name: oriRatingList[i].aId + oriRatingList[i].rID,
          labels: likert_scale,
          required: true //必填
        })
      }
      return finRatingList
    },
    button_label: '下一篇文章',
    on_finish: function (data) {
    }
  }
}

//简答题
function textQuestFun(textInstr) {
  return {
    type: jsPsychSurveyText,
    preamble: textInstr,
    questions: [
      { prompt: '请在下方作答', rows: 10, columns: 70, required: true }
    ],
    button_label: '下一篇文章'
  }
}

//离开全屏
var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false
}

//成绩反馈
let endFeedback = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    let tempHtml = `
    <h2>🎉测验已结束，辛苦了同学😄</h2>
    <h2>以下是你在这次测验中的得分：</h2>
    <table>
        <tr>
            <th>类别</th>
            <th>分数</th>
        </tr>
        <tr>
            <td>总分</td>
            <td>${score}</td>
        </tr>
        <tr>
            <td>说明文得分</td>
            <td>${scoreE}</td>
        </tr>
        <tr>
            <td>记叙文得分</td>
            <td>${scoreN}</td>
        </tr>
        <tr>
            <td>获得与推断思维能力</td>
            <td>${score1}</td>
        </tr>
        <tr>
            <td>分析与综合思维能力</td>
            <td>${score2}</td>
        </tr>
        <tr>
            <td>鉴赏与评价思维能力</td>
            <td>${score3}</td>
        </tr>
        <tr>
            <td>运用与创新思维能力</td>
            <td>${score4}</td>
        </tr>
    </table>
    `
    return tempHtml
  },
  choices: ['结束'],
  data: function () {
    return {
      score: score,
      scoreE: scoreE,
      scoreN: scoreN,
      AcquisitionAndInference: score1,
      AnalysisAndSynthesis: score2,
      AppreciationAndEvaluation: score3,
      ApplicationAndInnovation: score4
    }
  },
  extensions: [
      { type: Naodao }
  ],
};

timeline.push(welcome)
timeline.push(participantsInfo)
timeline.push(readingSurvey)
timeline.push(instruction)
timeline.push(preInstruction)
timeline.push(preECorrelateInstruction)
timeline.push(practiceLoopFun(praListE))
timeline.push(preNAdjionInstruction)
timeline.push(practiceLoopFun(praListN))
timeline.push(testBegin)

//生成说明文
timeline.push(part1E)
for (let article of articlesListE) {
  if (article.aId === "E5C3") {
    shortQuest.push(createMultiChoice(article), textQuestFun(E5C3Text))
  } else {
    timeline.push(createMultiChoice(article))
    timeline.push(createMultiLikert(article, 'E'))
  }
}

//生成记叙文
timeline.push(part2N)
for (let article of articlesListN) {
  if (article.aId === "N5A1") {
    shortQuest.push(createMultiChoice(article), textQuestFun(N5A1Text))
  } else {
    timeline.push(createMultiChoice(article))
    timeline.push(createMultiLikert(article, 'N'))
  }
}

//生成简答题
timeline.push(part3)
timeline.push(...shortQuest)
timeline.push(exit_fullscreen)
timeline.push(endFeedback)

jsPsych.run(timeline);