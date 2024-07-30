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

let articlesListE = articlesList.slice(0, 4);
let articlesListN = articlesList.slice(4, 8);

console.log(articlesListE.length,articlesListN.length);

let E5C3Text = `
<p style="color: black; font-size: 24px; line-height: 45px;">
请关闭阅读材料，然后在右侧蓝色区域写一段话总结材料原文。<br>
要求：<br>
1. 尽可能详细地写下你记得的原文内容<br>
2. 请反复检查，确保包含以下所有关键词<br>
3. 完成后保存并关闭文件<br><br>

关键词：<br>
<p style="font-family: 'KaiTi'">眼睛、雄鹰、老鼠、动物、视野、立体视觉、食肉动物、食草动物、水生动物、昼行动物、夜视眼、瞳孔、长颈鹿、白天、猫头鹰、猫、夜晚、变色龙、复眼、感光细胞</p>
</p>
`

let N5A1Text = `
<p style="color: black; font-size: 24px; line-height: 45px;">
请关闭阅读材料，然后在右侧蓝色区域写一段话总结材料原文。<br>
要求：<br>
1. 尽可能详细地写下你记得的原文内容<br>
2. 请反复检查，确保包含以下所有关键词<br>
3. 完成后保存并关闭文件<br><br>

关键词：<br>
<p style="font-family: 'KaiTi'">气候变暖、高温期、二氧化碳、计算机模型、岩石、南极冰盖微气泡、植物叶片化石、浅海贝类化石、海洋酸度、气候敏感性、气温、水蒸气、积雪海冰、太阳辐射、反馈效应、快速反馈、长期反馈、陆地冰原、上新世早期</p>
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
            corAns:{N1:1},
            tips:'第一段，航天飞机与卫星位置相邻。'
        },{
            sequence:'N2',
            keyword1:'航天飞机',
            keyword2:'航天器',
            corAns:{N2:0},
            tips:'第一段，航天飞机与航天器不相邻。'
        },{
            sequence:'N3',
            keyword1:'航天飞机',
            keyword2:'轨道器',
            corAns:{N3:1},
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