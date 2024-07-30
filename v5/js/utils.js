//洗牌算法
Array.prototype.shuffle = function () {
    let input = this;
    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

//判空
function isEmpty(obj) {
    return (typeof obj === "undefined" || obj === null || obj === "")
}

let articlesListN = articlesList.slice(0, 1);
let articlesListE = articlesList.slice(1, 2);

console.log(articlesListN.length,articlesListE.length);

let E6C1Text = `
<p style="color: black; font-size: 24px; line-height: 45px;">
根据刚才的文章，结合以下关键词，在白纸上写一段话总结材料原文。<br>
要求：<br>
1. 尽可能详细地写下你记得的原文内容<br>
2. 请反复检查，确保包含以下所有关键词<br>
3. 完成后点击“下一篇文章”<br><br>

关键词：<br>
<p style="font-family: 'KaiTi'">内心孤独 机械修理店 强壮男人 挣两块钱 买威士忌 20块钱 霸占 异样的感觉 摆脱不掉 买了威士忌 纠缠不去 坦白 干零活 缠满绷带 罪恶感 彻底消失 里维兹先生 共进午餐 正当手段 儿童孤儿院之家</p>
</p>
`

let E6E1Text = `
<p style="color: black; font-size: 24px; line-height: 45px;">
根据刚才的文章，结合以下关键词，在白纸上写一段话总结材料原文。<br>
要求：<br>
1. 尽可能详细地写下你记得的原文内容<br>
2. 请反复检查，确保包含以下所有关键词<br>
3. 完成后点击“下一篇文章”<br><br>

关键词：<br>
<p style="font-family: 'KaiTi'">影响智力的因素 记忆力较差 环境 气候温度 春秋 冬天 夏天 氧气 体育活动 光线 音乐 缓解学习疲劳 营养 食物 水果 鱼虾 蔬菜 疾病 </p>
</p>
`


let corrEPraObj = {
    content:`
    &nbsp&nbsp&nbsp&nbsp航天飞机在布放卫星、发射航天器、观天测地、进行材料科学和生命科学的实验等方面，发挥了重要作用，但它也有不尽如人意的地方。<br>
    &nbsp&nbsp&nbsp&nbsp航天飞机是由轨道器、固体火箭发动机和外贮燃料箱三大部分组成的。由于航天飞机是以发射火箭的方式发射，又以轨道器绕轨道运行的方式在空间执行任务，再以飞机的方式降落的，因此航天飞机不仅需要大型的设施，还需要有约4000〜5000个工作人员来为其服务。
    `,
    questions:[
        {
            sequence:'E1',
            keyword1:'轨道器',
            keyword2:'航天飞机',
            corAns:{E1:8},
            tips:'因为轨道器和航天飞机的组成部分，所以这两者的关系就很密切，可以评为9分。'
        },{
            sequence:'E2',
            keyword1:'航天飞机',
            keyword2:'材料科学研究',
            corAns:{E2:4},
            tips:'航天飞机对材料科学研究发挥了重要作用，但这两者的关系似乎没有轨道器和航天飞机关系密切，因此评分应该低于9分，例如5分。'
        },{
            sequence:'E3',
            keyword1:'生命科学',
            keyword2:'轨道器',
            corAns:{E3:1},
            tips:'生命科学和轨道器之间似乎没什么关系，尽管它们之间有航天飞机作为连接的中点，所以可以评为2分甚至更低。'
        },
        
    ]
}



let adjoinNPraObj = {
    content:`
    &nbsp&nbsp&nbsp&nbsp航天飞机在布放卫星、发射航天器、观天测地、进行材料科学和生命科学的实验等方面，发挥了重要作用，但它也有不尽如人意的地方。<br>
    &nbsp&nbsp&nbsp&nbsp航天飞机是由轨道器、固体火箭发动机和外贮燃料箱三大部分组成的。由于航天飞机是以发射火箭的方式发射，又以轨道器绕轨道运行的方式在空间执行任务，再以飞机的方式降落的，因此航天飞机不仅需要大型的设施，还需要有约4000〜5000个工作人员来为其服务。
    `,
    questions:[
        {
            sequence:'N1',
            keyword1:'航天飞机',
            keyword2:'卫星',
            corAns:{N1:8},
            tips:'第一段，航天飞机与卫星位置相邻。'
        },{
            sequence:'N2',
            keyword1:'航天飞机',
            keyword2:'航天器',
            corAns:{N2:4},
            tips:'第一段，航天飞机与航天器不相邻。'
        },{
            sequence:'N3',
            keyword1:'航天飞机',
            keyword2:'轨道器',
            corAns:{N3:8},
            tips:'第二段，航天飞机再次出现，并与轨道器相邻。'
        },
        
    ]
}

var isArticleVisible = false;

window.onscroll = function () {
    updateButtonVisibility();
};

function updateButtonVisibility() {
    var toggleArticleBtn = document.getElementById("toggleArticleBtn");

    // 当页面滚动超过一屏时显示按钮
    if (window.scrollY > window.innerHeight) {
        toggleArticleBtn.style.display = "block";
    } else {
        toggleArticleBtn.style.display = "none";
    }
}

function toggleArticleView() {
    var toggleArticleBtn = document.getElementById("toggleArticleBtn");

    var article = document.getElementById("article");

    // 切换文章显示状态
    isArticleVisible = !isArticleVisible;

    // 根据文章状态显示/隐藏文章
    if (isArticleVisible) {
        toggleArticleBtn.innerText = "收起文章";
        article.style.display = "block";
        updateButtonVisibility(); // 隐藏按钮
    } else {
        toggleArticleBtn.innerText = "查看文章";
        article.style.display = "none";
    }
}