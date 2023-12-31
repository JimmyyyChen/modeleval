import {
  UserGroupIcon,
  DeviceTabletIcon,
  RectangleStackIcon,
  Bars4Icon,
  FaceSmileIcon,
  WrenchScrewdriverIcon,
  SwatchIcon,
  ClockIcon,
  TableCellsIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
export const datasetTypes = [
  {
    id: "type",
    label: "类型",
    value: [
      {
        id: 1,
        content: "主观",
      },
      {
        id: 2,
        content: "客观",
      },
    ],
  },
  {
    id: "size",
    label: "大小",
    value: [
      {
        id: 1,
        content: "<1K",
      },
      {
        id: 2,
        content: "1K-10K",
      },
      {
        id: 3,
        content: "10K-100K",
      },
      {
        id: 4,
        content: "100K-1M",
      },
      {
        id: 5,
        content: "1M-10M",
      },
      {
        id: 6,
        content: ">10M",
      },
    ],
  },
  {
    id: "task",
    label: "任务",
    value: [
      {
        id: 1,
        content: "事实问答",
      },
      {
        id: 2,
        content: "情感分析",
      },
      {
        id: 3,
        content: "自动化程序生成",
      },
      {
        id: 4,
        content: "多模态",
      },
      {
        id: 5,
        content: "时间序列预测",
      },
      {
        id: 6,
        content: "表格分类",
      },
      {
        id: 7,
        content: "表格回归",
      },
    ],
  },
];

export const modelTypes = [
  {
    id: "language",
    label: "语言",
    value: [
      {
        id: 1,
        content: "支持中文",
      },
      {
        id: 2,
        content: "支持英文",
      },
      {
        id: 3,
        content: "支持日文",
      },
      {
        id: 4,
        content: "支持韩文",
      },
      {
        id: 3,
        content: "支持西班牙文",
      },
      {
        id: 3,
        content: "支持德文",
      },
    ],
  },
  {
    id: "type",
    label: "类型",
    value: [
      {
        id: 1,
        content: "文本补全",
      },
      {
        id: 2,
        content: "聊天对话",
      },
      {
        id: 3,
        content: "金融",
      },
      {
        id: 4,
        content: "医疗",
      },
      {
        id: 5,
        content: "法律",
      },
      {
        id: 6,
        content: "数学",
      },
    ],
  }
];

export const labels = {
  "主观": <UserGroupIcon className="h-4 w-4 text-primary" />,
  "客观": <DeviceTabletIcon className="h-4 w-4 text-primary" />,
  "<1K": <RectangleStackIcon className="h-4 w-4 text-primary" />,
  "1K-10K": <RectangleStackIcon className="h-4 w-4 text-primary" />,
  "10K-100K": <RectangleStackIcon className="h-4 w-4 text-primary" />,
  "100K-1M": <RectangleStackIcon className="h-4 w-4 text-primary" />,
  "1M-10M": <RectangleStackIcon className="h-4 w-4 text-primary" />,
  ">10M": <RectangleStackIcon className="h-4 w-4 text-primary" />,
  "事实问答": <Bars4Icon className="h-4 w-4 text-primary" />,
  "情感分析": <FaceSmileIcon className="h-4 w-4 text-primary" />,
  "自动化程序生成": <WrenchScrewdriverIcon className="h-4 w-4 text-primary" />,
  "多模态": <SwatchIcon className="h-4 w-4 text-primary" />,
  "时间序列预测": <ClockIcon className="h-4 w-4 text-primary" />,
  "表格分类": <TableCellsIcon className="h-4 w-4 text-primary" />,
  "表格回归": <BookmarkIcon className="h-4 w-4 text-primary" />,
  // TODO: add more icons
}