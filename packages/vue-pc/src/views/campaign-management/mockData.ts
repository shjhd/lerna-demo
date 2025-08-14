import type { Campaign } from './types';

// 包含新增字段的mock数据
const mockData: Campaign[] = [
  {
    id: '1',
    productName: '商品A',
    salesPlanCode: 'SPC001',
    salesChannel: 'life',
    validPeriod: '2023-01-01 00:00:00 ~ 2023-12-31 23:59:59',
    status: 1,
    creator: '张三',
    createTime: '2023-01-01 10:30:00',
    editor: '李四',
    updateTime: '2023-01-02 14:15:00'
  },
  {
    id: '2',
    productName: '商品B',
    salesPlanCode: 'SPC002',
    salesChannel: 'bank',
    validPeriod: '2023-06-01 00:00:00 ~ 2024-05-31 23:59:59',
    status: 0,
    creator: '王五',
    createTime: '2023-06-01 09:15:00',
    editor: '赵六',
    updateTime: '2023-06-02 16:45:00'
  },
  {
    id: '3',
    productName: '商品C',
    salesPlanCode: 'SPC003',
    salesChannel: 'property',
    validPeriod: '2022-01-01 00:00:00 ~ 2022-12-31 23:59:59',
    status: 0,
    creator: '钱七',
    createTime: '2022-01-01 11:20:00',
    editor: '孙八',
    updateTime: '2022-01-03 09:30:00'
  },
  {
    id: '4',
    productName: '商品D',
    salesPlanCode: 'SPC004',
    salesChannel: 'life',
    validPeriod: '2023-03-01 00:00:00 ~ 2024-02-28 23:59:59',
    status: 1,
    creator: '周九',
    createTime: '2023-03-01 13:45:00',
    editor: '吴十',
    updateTime: '2023-03-02 15:20:00'
  },
  {
    id: '5',
    productName: '商品E',
    salesPlanCode: 'SPC005',
    salesChannel: 'bank',
    validPeriod: '2023-04-01 00:00:00 ~ 2024-03-31 23:59:59',
    status: 1,
    creator: '郑十一',
    createTime: '2023-04-01 09:00:00',
    editor: '王十二',
    updateTime: '2023-04-02 11:30:00'
  },
  {
    id: '6',
    productName: '商品F',
    salesPlanCode: 'SPC006',
    salesChannel: 'property',
    validPeriod: '2022-06-01 00:00:00 ~ 2023-05-31 23:59:59',
    status: 0,
    creator: '赵十三',
    createTime: '2022-06-01 14:20:00',
    editor: '钱十四',
    updateTime: '2022-06-03 10:15:00'
  },
  {
    id: '7',
    productName: '商品G',
    salesPlanCode: 'SPC007',
    salesChannel: 'life',
    validPeriod: '2023-02-01 00:00:00 ~ 2024-01-31 23:59:59',
    status: 1,
    creator: '孙十五',
    createTime: '2023-02-01 11:00:00',
    editor: '李十六',
    updateTime: '2023-02-02 16:40:00'
  },
  {
    id: '8',
    productName: '商品H',
    salesPlanCode: 'SPC008',
    salesChannel: 'bank',
    validPeriod: '2023-07-01 00:00:00 ~ 2024-06-30 23:59:59',
    status: 1,
    creator: '周十七',
    createTime: '2023-07-01 09:30:00',
    editor: '吴十八',
    updateTime: '2023-07-02 14:25:00'
  },
  {
    id: '9',
    productName: '商品I',
    salesPlanCode: 'SPC009',
    salesChannel: 'property',
    validPeriod: '2022-03-01 00:00:00 ~ 2023-02-28 23:59:59',
    status: 0,
    creator: '郑十九',
    createTime: '2022-03-01 15:10:00',
    editor: '王二十',
    updateTime: '2022-03-02 10:00:00'
  },
  {
    id: '10',
    productName: '商品J',
    salesPlanCode: 'SPC010',
    salesChannel: 'life',
    validPeriod: '2023-05-01 00:00:00 ~ 2024-04-30 23:59:59',
    status: 1,
    creator: '赵二十一',
    createTime: '2023-05-01 10:45:00',
    editor: '钱二十二',
    updateTime: '2023-05-02 16:30:00'
  },
  {
    id: '11',
    productName: '商品K',
    salesPlanCode: 'SPC011',
    salesChannel: 'bank',
    validPeriod: '2023-08-01 00:00:00 ~ 2024-07-31 23:59:59',
    status: 1,
    creator: '孙二十三',
    createTime: '2023-08-01 09:15:00',
    editor: '李二十四',
    updateTime: '2023-08-02 14:10:00'
  },
  {
    id: '12',
    productName: '商品L',
    salesPlanCode: 'SPC012',
    salesChannel: 'property',
    validPeriod: '2022-04-01 00:00:00 ~ 2023-03-31 23:59:59',
    status: 0,
    creator: '周二十五',
    createTime: '2022-04-01 11:30:00',
    editor: '吴二十六',
    updateTime: '2022-04-02 15:45:00'
  },
  {
    id: '13',
    productName: '商品M',
    salesPlanCode: 'SPC013',
    salesChannel: 'life',
    validPeriod: '2023-09-01 00:00:00 ~ 2024-08-31 23:59:59',
    status: 1,
    creator: '郑二十七',
    createTime: '2023-09-01 10:00:00',
    editor: '王二十八',
    updateTime: '2023-09-02 14:20:00'
  },
  {
    id: '14',
    productName: '商品N',
    salesPlanCode: 'SPC014',
    salesChannel: 'bank',
    validPeriod: '2023-10-01 00:00:00 ~ 2024-09-30 23:59:59',
    status: 1,
    creator: '赵二十九',
    createTime: '2023-10-01 09:45:00',
    editor: '钱三十',
    updateTime: '2023-10-02 15:10:00'
  },
  {
    id: '15',
    productName: '商品O',
    salesPlanCode: 'SPC015',
    salesChannel: 'property',
    validPeriod: '2022-05-01 00:00:00 ~ 2023-04-30 23:59:59',
    status: 0,
    creator: '孙三十一',
    createTime: '2022-05-01 14:30:00',
    editor: '李三十二',
    updateTime: '2022-05-02 10:15:00'
  }
];

export default mockData;