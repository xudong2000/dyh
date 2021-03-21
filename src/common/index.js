const lecturers = [
  {
    id: 1,
    name: '李荣',
    avatar:
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3158213668,1494288542&fm=11&gp=0.jpg',
    teachSpecialty: 'web前端讲师',
    school: '中南大学',
    learnSpecialty: '计算机科学与技术',
    education: '硕士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
    number: 0,
  },
  {
    id: 2,
    name: '黎原',
    avatar:
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2752148155,155093617&fm=26&gp=0.jpg',
    teachSpecialty: 'Java高级讲师',
    school: '华中科技大学',
    learnSpecialty: '计算机科学与技术',
    education: '硕士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
    number: 0,
  },
  {
    id: 3,
    name: '郑俊贤',
    avatar:
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3491935679,2157982853&fm=26&gp=0.jpg',
    teachSpecialty: 'UI设计讲师',
    school: '武汉大学',
    learnSpecialty: '计算机科学与技术',
    education: '硕士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
    number: 0,
  },
  {
    id: 4,
    name: '谭诚',
    avatar:
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2796144188,439704386&fm=26&gp=0.jpg',
    teachSpecialty: '嵌入式讲师',
    school: '复旦大学',
    learnSpecialty: '计算机科学与技术',
    education: '博士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
    number: 0,
  },
  {
    id: 5,
    name: '谭英柯',
    avatar:
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3848918876,1367705290&fm=26&gp=0.jpg',
    teachSpecialty: '运维测试',
    school: '湖南大学',
    learnSpecialty: '计算机科学与技术',
    education: '硕士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
    number: 0,
  },
]

const specialtys = [
  {
    id: 1,
    name: 'web前端',
    avatar:
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4031334537,2110657524&fm=26&gp=0.jpg',
    intro:
      '前端开发是创建Web页面或app等前端界面呈现给用户的过程，通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互 [1]  。它从网页制作演变而来，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web1.0时代的产物，早期网站主要内容都是静态，以图片和文字为主，用户使用网站的行为也以浏览为主。随着互联网技术的发展和HTML5、CSS3的应用，现代网页更加美观，交互效果显著，功能更加强大。',
    number: 0,
  },
  {
    id: 2,
    name: 'Java后端',
    avatar:
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2893615075,2492346271&fm=26&gp=0.jpg',
    intro:
      'Java自1995年问世以来，因其卓越的通用性、高效性、平台移植性 和安全性等特性，成为全球范围内应用范围最广的开发语言，而且即使历经二十余年发展仍然在行业内保持着“常青树”的地位。Java软件工程师是指运用Java这种开发语言去完成软件产品的软件程序设计、开发、测试、维护升级等工作的人员。',
    number: 0,
  },
  {
    id: 3,
    name: 'UI设计',
    avatar:
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3129324782,3119396676&fm=26&gp=0.jpg',
    intro:
      'UI设计（或称界面设计）是指对软件的人机交互、操作逻辑、界面美观的整体设计。UI设计分为实体UI和虚拟UI，互联网常用的UI设计是虚拟UI，UI即User Interface(用户界面)的简称。',
    number: 0,
  },
  {
    id: 4,
    name: '软件测试',
    avatar:
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1807302593,278200845&fm=26&gp=0.jpg',
    intro:
      '软件测试是使用人工或自动的手段来运行或测定某个软件系统的过程，其目的在于检验它是否满足规定的需求或弄清预期结果与实际结果之间的差别。',
    number: 0,
  },
  {
    id: 5,
    name: '运维实施',
    avatar:
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1386709338,3873054872&fm=11&gp=0.jpg',
    intro:
      '运维，本质上是对网络、服务器、服务的生命周期各个阶段的运营与维护，在成本、稳定性、效率上达成一致可接受的状态。',
    number: 0,
  },
  {
    id: 6,
    name: '嵌入式',
    avatar:
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=216837752,3743132688&fm=26&gp=0.jpg',
    intro:
      '嵌入式即嵌入式系统，IEEE（美国电气和电子工程师协会）对其定义是用于控制、监视或者辅助操作机器和设备的装置，是一种专用的计算机系统；国内普遍认同的嵌入式系统定义是以应用为中心，以计算机技术为基础，软硬件可裁剪，适应应用系统对功能、可靠性、成本、体积、功耗等严格要求的专用计算机系统；从应用对象上加以定义来说，嵌入式系统是软件和硬件的综合体，还可以涵盖机械等附属装置。',
    number: 0,
  },
]

module.exports = {
  lecturers,
  specialtys,
}
