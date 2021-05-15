var listTypeArr = {
  dblz: "代表履职",
  rddt: "人大动态"
};

var typeArr = {
  dbysh: "代表议事会",
  scdy: "视察调研",
  dbfc: "代表风采",
  dhqj: "大会期间",
  bhqj: "闭会期间",
  bljy: "办理建议",
  xwsd: "新闻速递",
  jygg: "决议公告",
  rsrm: "人事任免",
  gzjx: "工作简讯",
  mtgz: "媒体关注"
};

var isTopArr = ["非置顶", "置顶"];

var isOnlineArr = {
  "off": "下线",
  "on": "上线"
}

var handleStatusArr = {
  "on": true,
  "off": false
};


// 大类型格式转换
export function listTypeFormatter(listType) {
  console.log('listType', listType);
  return listTypeArr[listType];
}


// 小类型格式转换
export function typeFormatter(type) {
  return typeArr[type];
}


// 是否置顶格式转换
export function isTopFormatter(isTop) {
  return isTopArr[isTop];
}


// 上下线状态格式转换
export function isOnlineFormatter(online) {
  return isOnlineArr[online];
}


// 上下线按钮状态格式转换
export function handleStatus(online) {
  console.log(online);
  return handleStatusArr[online];
}
