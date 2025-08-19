// 商品展架列表mock数据 - 支持三级tab层级结构
export const productShelfMockData = {
  "code": 200,
  "message": "success",
  "data": {
    "salesChannels": ["寿渠", "健康险直销", "渠道2", "渠道3"],
    "salesChannel": "online",
    "detail": {
      "exhibitShelfName": "健康险产品展架",
      "exhibitShelfFieldVoList": [
        // 一级tab: 重疾险
        {
          "shelfFieldName": "寿渠",
          "categoryId": "C001",
          "categoryName": "重疾险",
          "categoryDescribe": "包含各类重大疾病保险产品",
          "boothId": "1001",
          "childrenFieldPo": [
            // 二级tab: 高端
            {
              "shelfFieldName": "重疾险",
              "categoryId": "C001-1",
              "categoryName": "高端",
              "categoryDescribe": "高端重疾保障方案",
              "boothId": "10011",
              "childrenFieldPo": [
                // 三级tab: 终身保障
                {
                  "shelfFieldName": "高端",
                  "categoryId": "C001-1-1",
                  "categoryName": "终身保障",
                  "categoryDescribe": "提供终身重疾保障",
                  "boothId": "100111",
                },
                // 三级tab: 定期保障
                {
                  "shelfFieldName": "中端",
                  "categoryId": "C001-1-2",
                  "categoryName": "定期保障",
                  "categoryDescribe": "提供定期重疾保障",
                  "boothId": "100112",
                }
              ]
            },
            // 二级tab: 中端
            {
              "shelfFieldName": "医疗险",
              "categoryId": "C001-2",
              "categoryName": "中端",
              "categoryDescribe": "中端重疾保障方案",
              "boothId": "10012",
              "childrenFieldPo": [] // 可添加三级tab
            },
            // 二级tab: 普惠
            {
              "shelfFieldName": "普惠",
              "categoryId": "C001-3",
              "categoryName": "普惠",
              "categoryDescribe": "普惠型重疾保障方案",
              "boothId": "10013",
              "childrenFieldPo": [] // 可添加三级tab
            }
          ]
        },
        // 一级tab: 医疗险
        {
          "shelfFieldName": "健康险直销",
          "categoryId": "C002",
          "categoryName": "医疗险",
          "categoryDescribe": "包含各类医疗保险产品",
          "boothId": "1002",
          "childrenFieldPo": [
            // 二级tab: 高端
            {
              "shelfFieldName": "医疗险",
              "categoryId": "C002-1",
              "categoryName": "高端",
              "categoryDescribe": "高端医疗保障方案",
              "boothId": "10021",
              "childrenFieldPo": [] // 可添加三级tab
            },
            // 二级tab: 中端
            {
              "shelfFieldName": "意外险",
              "categoryId": "C002-2",
              "categoryName": "中端",
              "categoryDescribe": "中端医疗保障方案",
              "boothId": "10022",
              "childrenFieldPo": [] // 可添加三级tab
            },
            // 二级tab: 普惠
            {
              "shelfFieldName": "哈哈险",
              "categoryId": "C002-3",
              "categoryName": "普惠",
              "categoryDescribe": "普惠型医疗保障方案",
              "boothId": "10023",
              "childrenFieldPo": [
                // 三级tab: 慢病医疗
                {
                  "shelfFieldName": "普惠",
                  "categoryId": "C002-3-1",
                  "categoryName": "慢病医疗",
                  "categoryDescribe": "特定亚健康/慢病人群可投",
                  "boothId": "100231",
                }
              ]
            }
          ]
        },
        // 一级tab: 意外险
        {
          "shelfFieldName": "意外险专区",
          "categoryId": "C003",
          "categoryName": "意外险",
          "categoryDescribe": "包含各类意外保险产品",
          "boothId": "1003",
          "childrenFieldPo": [
            // 二级tab: 高端
            {
              "shelfFieldName": "意外险",
              "categoryId": "C003-1",
              "categoryName": "高端",
              "categoryDescribe": "高端意外保障方案",
              "boothId": "10031",
              "childrenFieldPo": [] // 可添加三级tab
            },
            // 二级tab: 中端
            {
              "shelfFieldName": "中端险",
              "categoryId": "C003-2",
              "categoryName": "中端",
              "categoryDescribe": "中端意外保障方案",
              "boothId": "10032",
              "childrenFieldPo": [] // 可添加三级tab
            },
            // 二级tab: 普惠
            {
              "shelfFieldName": "普惠险",
              "categoryId": "C003-3",
              "categoryName": "普惠",
              "categoryDescribe": "普惠型意外保障方案",
              "boothId": "10033",
              "childrenFieldPo": [] // 可添加三级tab
            }
          ]
        }
      ],
      "boothId2ExhibitsMap": {
      // 重疾险专区 -> 高端 -> 终身重疾
      "100111": [
        {
          "exhibitType": "critical",
          "exhibitName": "守护一生·终身重疾险",
          "exhibitCode": "EXH1001",
          "tags": ["终身保障", "多次赔付"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "热销爆款",
          "exhibitPriceDesc": "12000元(参考价)",
          "detailUrl": "https://example.com/detail/1001",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "12000",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "康泰一生·重大疾病保险",
          "exhibitCode": "EXH1002",
          "tags": ["保障全面", "性价比高"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "新品上市",
          "exhibitPriceDesc": "9800元(参考价)",
          "detailUrl": "https://example.com/detail/1002",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "9800",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "健康无忧·终身重疾",
          "exhibitCode": "EXH1003",
          "tags": ["轻症豁免", "特定疾病额外赔"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "专家推荐",
          "exhibitPriceDesc": "15000元(参考价)",
          "detailUrl": "https://example.com/detail/1003",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "15000",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "一生平安·重疾尊享",
          "exhibitCode": "EXH1004",
          "tags": ["高额保障", "全面覆盖"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "限时特惠",
          "exhibitPriceDesc": "18000元(参考价)",
          "detailUrl": "https://example.com/detail/1004",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "18000",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "御立方·尊享版",
          "exhibitCode": "EXH1005",
          "tags": ["多次赔付", "保费豁免"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "尊贵服务",
          "exhibitPriceDesc": "21000元(参考价)",
          "detailUrl": "https://example.com/detail/1005",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "21000",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "福满一生·终身重疾",
          "exhibitCode": "EXH1006",
          "tags": ["保障递增", "灵活选择"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "性价比之王",
          "exhibitPriceDesc": "13500元(参考价)",
          "detailUrl": "https://example.com/detail/1006",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "13500",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "安心守护·终身重疾",
          "exhibitCode": "EXH1007",
          "tags": ["重疾绿通", "专家诊疗"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "服务优选",
          "exhibitPriceDesc": "16800元(参考价)",
          "detailUrl": "https://example.com/detail/1007",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "16800",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "健康尊享·重疾计划",
          "exhibitCode": "EXH1008",
          "tags": ["全面保障", "终身呵护"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "口碑之选",
          "exhibitPriceDesc": "14200元(参考价)",
          "detailUrl": "https://example.com/detail/1008",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "14200",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "锦绣前程·少儿重疾",
          "exhibitCode": "EXH1009",
          "tags": ["少儿专属", "特定疾病加倍"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "少儿首选",
          "exhibitPriceDesc": "11800元(参考价)",
          "detailUrl": "https://example.com/detail/1009",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "11800",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "金佑人生·重疾保障",
          "exhibitCode": "EXH1010",
          "tags": ["保障升级", "保额递增"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "热销推荐",
          "exhibitPriceDesc": "15600元(参考价)",
          "detailUrl": "https://example.com/detail/1010",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "15600",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "爱无忧·重疾险",
          "exhibitCode": "EXH1011",
          "tags": ["癌症双倍", "保障全面"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "癌症专项",
          "exhibitPriceDesc": "17800元(参考价)",
          "detailUrl": "https://example.com/detail/1011",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "17800",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 重疾险专区 -> 高端 -> 定期重疾
      "100112": [
        {
          "exhibitType": "critical",
          "exhibitName": "定期重疾·20年保障",
          "exhibitCode": "EXH1012",
          "tags": ["定期保障", "高保额"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "3500元(参考价)",
          "detailUrl": "https://example.com/detail/1012",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "3500",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "青年重疾·30年",
          "exhibitCode": "EXH1013",
          "tags": ["年轻人首选", "保费低"],
          "smallPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitMarking": "新品",
          "exhibitPriceDesc": "2800元(参考价)",
          "detailUrl": "https://example.com/detail/1013",
          "bigPictureUrl": "https://stg.iobs.pingan.com.cn/download/ehis-unified-personalized-dmz-stg/vc-upload-1704872275922-183.png",
          "exhibitBaseAmt": "2800",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 重疾险专区 -> 中端
      "10012": [
        {
          "exhibitType": "critical",
          "exhibitName": "安享重疾·计划A",
          "exhibitCode": "EXH1006",
          "tags": ["中端优选", "保障充足"],
          "smallPictureUrl": "https://example.com/critical6.jpg",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "6800元(参考价)",
          "detailUrl": "https://example.com/detail/1006",
          "bigPictureUrl": "https://example.com/critical-big6.jpg",
          "exhibitBaseAmt": "6800",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "幸福安康·重疾险",
          "exhibitCode": "EXH1007",
          "tags": ["性价比高", "覆盖常见重疾"],
          "smallPictureUrl": "https://example.com/critical7.jpg",
          "exhibitMarking": "爆款",
          "exhibitPriceDesc": "5600元(参考价)",
          "detailUrl": "https://example.com/detail/1007",
          "bigPictureUrl": "https://example.com/critical-big7.jpg",
          "exhibitBaseAmt": "5600",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 重疾险专区 -> 普惠
      "10013": [
        {
          "exhibitType": "critical",
          "exhibitName": "普惠重疾·基础版",
          "exhibitCode": "EXH1008",
          "tags": ["普惠价格", "基础保障"],
          "smallPictureUrl": "https://example.com/critical8.jpg",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "1980元(参考价)",
          "detailUrl": "https://example.com/detail/1008",
          "bigPictureUrl": "https://example.com/critical-big8.jpg",
          "exhibitBaseAmt": "1980",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "critical",
          "exhibitName": "全民重疾·普惠版",
          "exhibitCode": "EXH1009",
          "tags": ["低保费", "高杠杆"],
          "smallPictureUrl": "https://example.com/critical9.jpg",
          "exhibitMarking": "新品",
          "exhibitPriceDesc": "1580元(参考价)",
          "detailUrl": "https://example.com/detail/1009",
          "bigPictureUrl": "https://example.com/critical-big9.jpg",
          "exhibitBaseAmt": "1580",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 医疗险专区 -> 高端
      "10021": [
        {
          "exhibitType": "medical",
          "exhibitName": "全球高端医疗险",
          "exhibitCode": "EXH2001",
          "tags": ["全球覆盖", "私立医院"],
          "smallPictureUrl": "https://example.com/medical1.jpg",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "35000元(参考价)",
          "detailUrl": "https://example.com/detail/2001",
          "bigPictureUrl": "https://example.com/medical-big1.jpg",
          "exhibitBaseAmt": "35000",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "medical",
          "exhibitName": "尊享医疗·钻石计划",
          "exhibitCode": "EXH2002",
          "tags": ["高端病房", "专家诊疗"],
          "smallPictureUrl": "https://example.com/medical2.jpg",
          "exhibitMarking": "爆款",
          "exhibitPriceDesc": "28000元(参考价)",
          "detailUrl": "https://example.com/detail/2002",
          "bigPictureUrl": "https://example.com/medical-big2.jpg",
          "exhibitBaseAmt": "28000",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 医疗险专区 -> 中端
      "10022": [
        {
          "exhibitType": "medical",
          "exhibitName": "百万医疗·优选版",
          "exhibitCode": "EXH2003",
          "tags": ["高额保障", "公立医院"],
          "smallPictureUrl": "https://example.com/medical3.jpg",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "1200元(参考价)",
          "detailUrl": "https://example.com/detail/2003",
          "bigPictureUrl": "https://example.com/medical-big3.jpg",
          "exhibitBaseAmt": "1200",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "medical",
          "exhibitName": "健康医疗·中端计划",
          "exhibitCode": "EXH2004",
          "tags": ["性价比高", "覆盖广泛"],
          "smallPictureUrl": "https://example.com/medical4.jpg",
          "exhibitMarking": "新品",
          "exhibitPriceDesc": "980元(参考价)",
          "detailUrl": "https://example.com/detail/2004",
          "bigPictureUrl": "https://example.com/medical-big4.jpg",
          "exhibitBaseAmt": "980",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 医疗险专区 -> 普惠 -> 慢病医疗
      "100231": [
        {
          "exhibitType": "medical",
          "exhibitName": "e生保·慢病医疗2024升级",
          "exhibitCode": "EXH2005",
          "tags": ["特定亚健康/慢病人群可投"],
          "smallPictureUrl": "https://example.com/medical5.jpg",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "680元(参考价)",
          "detailUrl": "https://example.com/detail/2005",
          "bigPictureUrl": "https://example.com/medical-big5.jpg",
          "exhibitBaseAmt": "680",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "medical",
          "exhibitName": "慢病无忧·医疗保险",
          "exhibitCode": "EXH2006",
          "tags": ["高血压/糖尿病可投"],
          "smallPictureUrl": "https://example.com/medical6.jpg",
          "exhibitMarking": "新品",
          "exhibitPriceDesc": "580元(参考价)",
          "detailUrl": "https://example.com/detail/2006",
          "bigPictureUrl": "https://example.com/medical-big6.jpg",
          "exhibitBaseAmt": "580",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "medical",
          "exhibitName": "健康守护·慢病版",
          "exhibitCode": "EXH2007",
          "tags": ["慢病专属", "保障全面"],
          "smallPictureUrl": "https://example.com/medical7.jpg",
          "exhibitMarking": "爆款",
          "exhibitPriceDesc": "780元(参考价)",
          "detailUrl": "https://example.com/detail/2007",
          "bigPictureUrl": "https://example.com/medical-big7.jpg",
          "exhibitBaseAmt": "780",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 意外险专区 -> 高端
      "10031": [
        {
          "exhibitType": "accident",
          "exhibitName": "全球意外保障计划",
          "exhibitCode": "EXH3001",
          "tags": ["全球保障", "高额赔付"],
          "smallPictureUrl": "https://example.com/accident1.jpg",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "3600元(参考价)",
          "detailUrl": "https://example.com/detail/3001",
          "bigPictureUrl": "https://example.com/accident-big1.jpg",
          "exhibitBaseAmt": "3600",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "accident",
          "exhibitName": "尊享意外·钻石版",
          "exhibitCode": "EXH3002",
          "tags": ["全面保障", "尊贵服务"],
          "smallPictureUrl": "https://example.com/accident2.jpg",
          "exhibitMarking": "爆款",
          "exhibitPriceDesc": "2800元(参考价)",
          "detailUrl": "https://example.com/detail/3002",
          "bigPictureUrl": "https://example.com/accident-big2.jpg",
          "exhibitBaseAmt": "2800",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 意外险专区 -> 中端
      "10032": [
        {
          "exhibitType": "accident",
          "exhibitName": "综合意外保障计划",
          "exhibitCode": "EXH3003",
          "tags": ["全面覆盖", "性价比高"],
          "smallPictureUrl": "https://example.com/accident3.jpg",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "880元(参考价)",
          "detailUrl": "https://example.com/detail/3003",
          "bigPictureUrl": "https://example.com/accident-big3.jpg",
          "exhibitBaseAmt": "880",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "accident",
          "exhibitName": "平安意外·优选版",
          "exhibitCode": "EXH3004",
          "tags": ["常见意外", "足额保障"],
          "smallPictureUrl": "https://example.com/accident4.jpg",
          "exhibitMarking": "新品",
          "exhibitPriceDesc": "680元(参考价)",
          "detailUrl": "https://example.com/detail/3004",
          "bigPictureUrl": "https://example.com/accident-big4.jpg",
          "exhibitBaseAmt": "680",
          "exhibitBaseAmtUnit": "元"
        }
      ],
      // 意外险专区 -> 普惠
      "10033": [
        {
          "exhibitType": "accident",
          "exhibitName": "普惠意外·基础版",
          "exhibitCode": "EXH3005",
          "tags": ["低保费", "基础保障"],
          "smallPictureUrl": "https://example.com/accident5.jpg",
          "exhibitMarking": "热销款",
          "exhibitPriceDesc": "120元(参考价)",
          "detailUrl": "https://example.com/detail/3005",
          "bigPictureUrl": "https://example.com/accident-big5.jpg",
          "exhibitBaseAmt": "120",
          "exhibitBaseAmtUnit": "元"
        },
        {
          "exhibitType": "accident",
          "exhibitName": "全民意外·普惠计划",
          "exhibitCode": "EXH3006",
          "tags": ["高性价比", "覆盖广泛"],
          "smallPictureUrl": "https://example.com/accident6.jpg",
          "exhibitMarking": "新品",
          "exhibitPriceDesc": "99元(参考价)",
          "detailUrl": "https://example.com/detail/3006",
          "bigPictureUrl": "https://example.com/accident-big6.jpg",
          "exhibitBaseAmt": "99",
          "exhibitBaseAmtUnit": "元"
        }
      ]
    }
    }
  }
};