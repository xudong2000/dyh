const lecturers = [
  {
    id: 1,
    name: '刘一',
    avatar:
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3158213668,1494288542&fm=11&gp=0.jpg',
    teachSpecialty: 'web前端讲师',
    school: '中南大学',
    learnSpecialty: '计算机科学与技术',
    education: '硕士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
  },
  {
    id: 2,
    name: '陈二',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.uzzf.com%2Fup%2F2021-2%2F16140732077836073.jpg&refer=http%3A%2F%2Fpic.uzzf.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616829591&t=7a83cf36b28c00e778894287c51c07e9',
    teachSpecialty: 'Java高级讲师',
    school: '华中科技大学',
    learnSpecialty: '计算机科学与技术',
    education: '硕士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
  },
  {
    id: 3,
    name: '张三',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.uzzf.com%2Fup%2F2021-2%2F16140732061775739.jpg&refer=http%3A%2F%2Fpic.uzzf.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616827904&t=cf73926eb0132bca173e1551a0975e3d',
    teachSpecialty: 'UI设计讲师',
    school: '武汉大学',
    learnSpecialty: '计算机科学与技术',
    education: '硕士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
  },
  {
    id: 4,
    name: '李四',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.uzzf.com%2Fup%2F2021-2%2F16140732066823408.jpg&refer=http%3A%2F%2Fpic.uzzf.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616828042&t=6973c102d49d478af9cc04bf2a01724a',
    teachSpecialty: '嵌入式讲师',
    school: '复旦大学',
    learnSpecialty: '计算机科学与技术',
    education: '博士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
  },
  {
    id: 5,
    name: '王五',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.uzzf.com%2Fup%2F2021-2%2F16140732067557432.jpg&refer=http%3A%2F%2Fpic.uzzf.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616828121&t=e156167d343e2706f7dc9ada30ef6687',
    teachSpecialty: 'Java高级讲师',
    school: '湖南大学',
    learnSpecialty: '计算机科学与技术',
    education: '硕士',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
  },
  {
    id: 6,
    name: '赵六',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww3.sinaimg.cn%2Fmw690%2F00743zkSly1gnd2kf00psj30rn0rndj9.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616828231&t=07d43c7adcc86917e6424e3fb40ef50c',
    teachSpecialty: '平面设计讲师',
    school: '湖南师范大学',
    learnSpecialty: '计算机科学与技术',
    education: '本科',
    information:
      '5年项目开发经验和5年IT培训经验，曾任职华为科技有限公司项目经理。项目经验：科特迪瓦电信CRM系统、摩洛哥电信CRM系统、湖南移动CRM系统。',
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
  },
  {
    id: 2,
    name: 'Java后端',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.elecfans.com%2Fweb1%2FM00%2F4F%2F06%2FpIYBAFrQBMCAB_fsAAAsUH60r4M557.jpg&refer=http%3A%2F%2Ffile.elecfans.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616844700&t=9fca46cb947cd400c4d34ed6dea597e1',
    intro:
      'Java自1995年问世以来，因其卓越的通用性、高效性、平台移植性 和安全性等特性，成为全球范围内应用范围最广的开发语言，而且即使历经二十余年发展仍然在行业内保持着“常青树”的地位。Java软件工程师是指运用Java这种开发语言去完成软件产品的软件程序设计、开发、测试、维护升级等工作的人员。',
  },
  {
    id: 3,
    name: 'UI设计',
    avatar:
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3129324782,3119396676&fm=26&gp=0.jpg',
    intro:
      'UI设计（或称界面设计）是指对软件的人机交互、操作逻辑、界面美观的整体设计。UI设计分为实体UI和虚拟UI，互联网常用的UI设计是虚拟UI，UI即User Interface(用户界面)的简称。',
  },
  {
    id: 4,
    name: '软件测试',
    avatar:
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1807302593,278200845&fm=26&gp=0.jpg',
    intro:
      '软件测试是使用人工或自动的手段来运行或测定某个软件系统的过程，其目的在于检验它是否满足规定的需求或弄清预期结果与实际结果之间的差别。',
  },
  {
    id: 5,
    name: '运维实施',
    avatar:
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1386709338,3873054872&fm=11&gp=0.jpg',
    intro:
      '运维，本质上是对网络、服务器、服务的生命周期各个阶段的运营与维护，在成本、稳定性、效率上达成一致可接受的状态。',
  },
  {
    id: 6,
    name: '嵌入式',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbbs.eaw.com.cn%2Fevent%2Fattachs%2F20061011_183544_403.jpg&refer=http%3A%2F%2Fbbs.eaw.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616846091&t=ab633128b1c919090de84b517af76875',
    intro:
      '嵌入式即嵌入式系统，IEEE（美国电气和电子工程师协会）对其定义是用于控制、监视或者辅助操作机器和设备的装置，是一种专用的计算机系统；国内普遍认同的嵌入式系统定义是以应用为中心，以计算机技术为基础，软硬件可裁剪，适应应用系统对功能、可靠性、成本、体积、功耗等严格要求的专用计算机系统；从应用对象上加以定义来说，嵌入式系统是软件和硬件的综合体，还可以涵盖机械等附属装置。',
  },
]

module.exports = {
  lecturers,
  specialtys,
}
