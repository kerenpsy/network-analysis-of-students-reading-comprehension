# -*- coding: utf-8 -*-
import csv
import json
import pandas as pd


##处理评分题
import pandas as pd

# 读取评分CSV文件，请修改地址（格式参考-评分.csv）
df = pd.read_csv(r'C:\Code\jsPsych\ReadingTest\text\rating.csv', encoding='utf-8')

# 创建一个空字典用于存储分组后的数据
ratingDict = {}

# 按'aId'分组，并将每组数据转换为对象格式，添加到ratingDict字典中
for group_name, group_data in df.groupby('aId'):
    # 将每组数据转换为对象格式
    group_object = group_data.to_dict(orient='records')
    
    # 将每个'aId'对应的数组存储在字典中
    ratingDict[group_name] = group_object

# 将字典的值转换为一个列表
ratingList = list(ratingDict.values())

#检查ratingList
print(ratingList)





##处理文章和选择题
articlesList = []

# 读取选择题CSV，请修改地址（格式参考-选择题.csv）
with open(r'C:\Code\jsPsych\ReadingTest\text\code.csv', 'r',encoding = 'utf-8') as f:
    reader = csv.reader(f)
    headers = next(reader)
    
    article = {}
    questions = []
    
    for row in reader:
        docType = row[0]
        docId = row[2]
        docTitle = row[3]
        docContent = row[4]
        wordCount = row[5]
        qType = row[7] 
        qTitle = row[9]
        options_list = []
        options_list = row[10].splitlines()
        cleaned_options = [option.strip() for option in options_list]
        qOptions = cleaned_options
        qAnswer = row[11]
        qScore = row[12]
        qCode = row[13]
        if docId != article.get('aId'): 
                article = {}
                questions = []
                article['aType'] = docType
                article['aId'] = docId
                article['aTitle'] = docTitle
                article['aContent'] = docContent
                article['aWordCount'] = wordCount
                article['questions'] = questions
                articlesList.append(article)
        question = {
            'qType': qType,
            'qTitle': qTitle,
            'qOptions': qOptions,
            'qAnswer': qAnswer,
            'qScore': qScore,
            'qCode': qCode
        }
        questions.append(question)
        article['questions'] = questions

#将评分题融入大数组。
for item in articlesList:
    aId = item['aId']
    if aId in ratingDict:
        item['ratingList'] = ratingDict[aId]
        print('成功')

#最终结果

json_str = json.dumps(articlesList, ensure_ascii=False)

#将结果保存为data.json文件
with open('data.json', 'w', encoding='utf8')as f:
    f.write(json_str)