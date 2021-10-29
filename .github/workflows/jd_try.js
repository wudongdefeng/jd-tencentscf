name: try

on:
    workflow_dispatch:
    schedule:
        - cron: "5 1 * * *"
    watch:
        types: [started]
    repository_dispatch:
        types: try

jobs:
    build:
        runs-on: ubuntu-latest        
        steps:
            #- uses: actions/checkout@v1
            - name: Checkout
              run: |
                  git clone -b jd_scripts https://github.com/Aaron-lv/sync.git ~/jd
                  cp -r ~/jd/*.* /home/runner/work/jd-tencentscf/jd-tencentscf                  
                  sed -i 's/GITHUB/GITLAB' jd_try.js 
                  sed -i '/GITHUB/,+6d' jdCookie.js
                  
            - name: Use Node.js 14.x
              uses: actions/setup-node@v1
              with:
                  node-version: 14.15.0
                  
            - name: run
              run: |
                  
                  npm install                   
                  node jd_try.js
                                    
              env:   
                  JD_COOKIE: ${{ secrets.JD_COOKIE}}
                  JD_DEBUG: true
                  TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN}}
                  TG_USER_ID: ${{ secrets.TG_USER_ID}}
                  QYWX_KEY: ${{ secrets.QYWX_KEY}}
                  QYWX_AM: ${{ secrets.QYWX_AM}}
                  JD_TRY: true
                  JD_TRY_PRICE: 0
                  JD_TRY_MAXLENGTH: 500
                  JD_TRY_PASSZC: true
                  JD_TRY_TITLEFILTERS: "钢化膜@僵尸粉@防臭地漏@风湿@口罩@题库@手机壳@在线直播@抖音作品@手机套@qq名片@口臭咀嚼片@咀嚼片@自慰器@阳具情趣用品@情趣玩具@皮带扣@眼影@降敏@钙片@补钙@便携装@睫毛@面膜@玉石@风湿@肉苁蓉@和田玉@羊脂玉@羊脂白玉@男用喷剂@随身wifi@类纸膜@贴>膜@手抄报@贴纸@早餐奶@产后修复@体验装@腮红@袜子一双@睫毛胶水@儿童>牛奶@牙刷头@灵芝@孢子@除臭@鼻炎@口罩@宠物@和田玉@祛痘@解酒@教程@软件@英语@辅导@培训@流量卡@保护套@手机壳@衣架@戒烟@棉签@网课@擦杯布@驱蚊@刷头@卸妆@互动课@小靓美@脚气@文胸@卷尺@种子@档案袋@癣@中年@老太太@妇女@私处@孕妇@卫生巾@卫生条@课@培训@阴道@生殖器@肛门@狐臭@少女内衣@胸罩@洋娃娃@益智@少女@女性内衣@女性内裤@女内裤@女内衣@女孩@屏风底座@童装@吊带@黑丝@钢圈@婴儿@玩具@幼儿@娃娃@网课@网校@电商@手机壳@钢化膜@网络课程@女纯棉@三角裤@美少女@纸尿裤@英语@俄语@四级@六级@四六级@在线网络@在线@阴道炎@宫颈@糜烂@打底裤@手机膜@鱼@狗@猫@宠物@上网卡"
                  JD_TRY_APPLYNUMFILTER: 10000
                  JD_TRY_TABID: "1@2@4@5@8@9@10@11@12@14@15"
