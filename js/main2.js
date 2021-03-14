const BaseUrl = 'https://cdn.jsdelivr.net';
const menuBtn = document.getElementById('secondary-toggle');
const secondary = document.getElementById('secondary');
const runningOnBrowser = typeof window !== "undefined";
const isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent);
const supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;
const app_id = 'UqKcJNE0cBerSu52yLvC1qVs-gzGzoHsz';
const app_key = 'cUR3tOdrBA0ULbONb8sfOipw';
let lazyLoadInstance = null;
let linkArr = null;
let loadingBar = document.getElementsByClassName('loading-bar')[0];
let progress = document.querySelector('.loading-bar>.progress');
let timer = null;
window.message_Path = '/live2d/';
window.home_Path = 'https://crosschannel.cc/';
const live2dModel = [
  {
    name: 'aoba',
    textures: 1
  },
  {
    name: 'neko',
    textures: 2
  },
  {
    name: 'Pio',
    textures: 65,
    favorite: 14
  },
  {
    name: 'Tia',
    textures: 40,
    favorite: 34
  },
  {
    name: 'Terisa',
    textures: 1
  }
];
let currentModel = 0;
let currentTextures = 1;


function loadScript(url, cb, isMoudule) {
  const script = document.createElement('script');
  script.src = url;
  if (cb) script.onload = cb;
  if (isMoudule) script.type = 'module';
  script.async = true;
  document.body.appendChild(script);
}

function initPjax() {
  if(!isBot) {
    window.pjax = new Pjax({
      selectors: ['title', '#main'],
      cacheBust: false,
      analytics: false,
      scrollRestoration: false
    });
    // pjax回调函数
    document.addEventListener('pjax:send', function() {
      var loadingBarWidth = 20;
      var MAX_LOADING_WIDTH = 95;
      loadingBar.classList.add('loading');
      progress.style.width = loadingBarWidth + '%';
      clearInterval(timer);
      timer = setInterval(function() {
        loadingBarWidth += 3;
        if (loadingBarWidth > MAX_LOADING_WIDTH) {
          loadingBarWidth = MAX_LOADING_WIDTH;
        }
        progress.style.width = loadingBarWidth + '%';
      }, 500);
    });
    document.addEventListener('pjax:complete', function (){
      clearInterval(timer);
      progress.style.width = '100%';
      loadingBar.classList.remove('loading');
      setTimeout(function() {
        progress.style.width = 0;
      }, 400);
      lazyLoadInstance.update();
      if(localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else if (new Date().getHours() >= 21 || new Date().getHours() < 7) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else if (matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      showLink();
      initCount();
      showeibo();
    });
  }
  this.onload = null;
}

function initValine() {
  new Valine({
    el: '#valine',
    count_el: '#comment-count',
    lang: 'zh-cn',
    emoticon_url: BaseUrl + '/gh/track23/blog-static/alu',
    emoticon_list: ["吐.png", "喷血.png", "狂汗.png", "不说话.png", "汗.png", "坐等.png", "献花.png", "不高兴.png", "中刀.png", "害羞.png", "皱眉.png", "小眼睛.png", "中指.png", "尴尬.png", "瞅你.png", "想一想.png", "中枪.png", "得意.png", "肿包.png", "扇耳光.png", "亲亲.png", "惊喜.png", "脸红.png", "无所谓.png", "便便.png", "愤怒.png", "蜡烛.png", "献黄瓜.png", "内伤.png", "投降.png", "观察.png", "看不见.png", "击掌.png", "抠鼻.png", "邪恶.png", "看热闹.png", "口水.png", "抽烟.png", "锁眉.png", "装大款.png", "吐舌.png", "无奈.png", "长草.png", "赞一个.png", "呲牙.png", "无语.png", "阴暗.png", "不出所料.png", "咽气.png", "期待.png", "高兴.png", "吐血倒地.png", "哭泣.png", "欢呼.png", "黑线.png", "喜极而泣.png", "喷水.png", "深思.png", "鼓掌.png", "暗地观察.png"],
    app_id,
    app_key,
    placeholder: 'Write a Comment',
    admin_email_hash: 'ed69c6079398441b73dbfdbbfc8cd196',
    max_nest: 2,
    page_size: 5
  })
  this.onload = null;
}

function loadValine() {
  const flag = typeof Valine === 'function';
  setTimeout(()=>{
    const comment = document.getElementById('comment');
    if (!isBot && supportsIntersectionObserver && comment) {
      let valine_observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          flag ? initValine() : loadScript(BaseUrl+ '/gh/track23/blog-static/Valine.min.js',initValine)
          valine_observer.disconnect();
          valine_observer = null;
        }
      }, { threshold: [0] });
      valine_observer.observe(comment);
    } else {
      comment && flag ? initValine() : loadScript(BaseUrl+ '/gh/track23/blog-static/Valine.min.js',initValine)
    }
  },1200)
}

function initCount() {
  if (document.getElementsByClassName('leancloud_visitors').length === 1 && document.getElementById('comment')) {
    addCount();
  } else if (document.getElementsByClassName('post-title-link').length >= 1) {
    showTime();
  }
}

function queryCount(url){
  const QueryObj = {
    _method:"GET",
    _ApplicationId: app_id,
    _ApplicationKey: app_key
  };
  if (url) {
    QueryObj.keys = 'time';
    QueryObj.limit = 1;
    QueryObj.where = {url};
  } else {
    QueryObj.keys = "time,url";
    const URl_Arr = [];
    const visItem = document.querySelectorAll('.leancloud_visitors');
    visItem.forEach(function (el) {
      URl_Arr.push(el.getAttribute('id').trim());
    });
    QueryObj.where = {url:{$in:URl_Arr}};
  }
  const raw = JSON.stringify(QueryObj);
  const requestOptions = {
    method: 'POST',
    headers: {"Content-Type": "text/plain"},
    body: raw
  };
  return fetch('https://api.leancloud.cn/1.1/classes/Counter', requestOptions)
}

function showTime() {
  queryCount()
  .then(response => response.json())
  .then(result=> {
    result.results.forEach(i => {
      document.getElementById(i.url).textContent = i.time;
    });
  })
  .catch((error)=>{})
}

function updateCount(id) {
  const raw = JSON.stringify({time:{__op:"Increment",amount:1}})
  const reqOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "X-LC-Id": app_id,
      "X-LC-Key": app_key
    },
    body: raw,
  }
  return fetch('https://api.leancloud.cn/1.1/classes/Counter/'+id+'?fetchWhenSave=true', reqOptions)
}

function addCount(){
  const visItem = document.getElementsByClassName('leancloud_visitors')[0];
  const url = visItem.getAttribute('id').trim();
  const title = visItem.getAttribute('data-flag-title').trim();
  queryCount(url)
  .then(response => response.json())
  .then(result => {
    if (result.results.length === 0) {
      createCount(title,url)
      .then(response => response.json())
      .then(result => {
        document.getElementById(url).textContent = result.time;
      })
    }else{
      const id = result.results[0].objectId;
      updateCount(id)
      .then(response => response.json())
      .then(result => {
        document.getElementById(url).textContent = result.time;
      })
    }
  })
  .catch((error)=>{})
} 

function createCount(title,url){
  const obj = {
    title,
    url,
    time:1
  }
  const raw = JSON.stringify(obj)
  const reqOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-LC-Id": app_id,
      "X-LC-Key": app_key
    },
    body: raw
  }
  return fetch('https://api.leancloud.cn/1.1/classes/Counter?fetchWhenSave=true', reqOptions)
}

function menuToggle () {
  const menuState = secondary.classList.toggle('toggle-on');
  if (menuState) {
    menuBtn.classList.remove('iconcaidan');
    menuBtn.classList.add('iconfork');
    secondary.setAttribute('aria-expanded', 'true')
  } else {
    menuBtn.classList.remove('iconfork');
    menuBtn.classList.add('iconcaidan');
    secondary.setAttribute('aria-expanded', 'false')
  }
}

function changeModel() {
  if(currentModel === live2dModel.length - 1) {
    currentModel = -1
  }
  currentModel++;
  currentTextures = live2dModel[currentModel].favorite || 1;
  loadlive2d("live2d", `/live2d/${live2dModel[currentModel].name}/model${currentTextures}.json`);
}

function changeTextures() {
  if (live2dModel[currentModel].textures === 1) {
    return
  } else {
    if(currentTextures === live2dModel[currentModel].textures) {
      currentTextures = 0
    }
    currentTextures++;
    loadlive2d("live2d", `/live2d/${live2dModel[currentModel].name}/model${currentTextures}.json`);
  }
}

function initLive2d () {
  if (window.screen.width > 955) {
    loadScript('/js/live2d.min.js', function (){
      document.getElementById('landlord').style.display = 'block';
      const localData = JSON.parse(localStorage.getItem('live2d'));
      if (localData) {
        currentModel = localData.currentModel;
        currentTextures = localData.currentTextures;
      }
      loadlive2d("live2d", `/live2d/${live2dModel[currentModel].name}/model${currentTextures}.json`);
      const btns = document.createElement('div');
      btns.className = 'btns';
      btns.innerHTML = '<button class="changeTextures-btn">👘</button><button class="changeModel-btn">🙍‍♀️</button>';
      document.getElementById('landlord').appendChild(btns);
      document.getElementsByClassName('changeModel-btn')[0].onclick = changeModel;
      document.getElementsByClassName('changeTextures-btn')[0].onclick = changeTextures;
      this.onload = null;
    });
    window.onbeforeunload = function () {
      localStorage.setItem('live2d',JSON.stringify({currentModel,currentTextures}))
    }
    loadScript('/js/message.js')
  } else {
    document.getElementById('memu').onclick = menuToggle;
    document.getElementById('tagcloud').onclick = menuToggle;
    document.querySelector('.site-title>a').onclick = function () {
      secondary.classList.contains('toggle-on') ? menuToggle() : null;
    };
  }
}


//侧边栏动态友链
function randomNum(max,min){
  return Math.floor(Math.random()*(max-min+1)+min)
}
function reWriteLink (data) {
  const i = randomNum(16,0);
  document.getElementById('friend-link').href = data[i].url;
  document.getElementById('friend-name').textContent = data[i].name;
  document.getElementById('friend-desc').textContent = data[i].description;
}

function showLink () {
  if (Array.isArray(linkArr)) {
    reWriteLink(linkArr)
  } else {
    fetch('/friend.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      reWriteLink(data);
      document.getElementById('friend-link').style.display = 'block';
      linkArr = data;
    });
  }
}


//检测死妈浏览器
function nmsl() {
  function getEdge() {
    if (confirm('垃圾浏览器nmsl，该换浏览器了')) {
      window.location.href = 'https://www.microsoft.com/zh-cn/edge';
    } else {
      document.body.innerHTML = '<h1 style="fontSize:50px">该换浏览器了</h1>';
    }
  }
  try{
    !!window.ActiveXObject || "ActiveXObject" in window ? getEdge() : null;
    const UA = window.navigator.userAgent;
    if (UA.includes('UBrowser')) {
      let version =  UA.match(/Chrome\/[0-9]*/g)[0].split('/')[1];
      Number(version) <= 55 ? getEdge() : null;
    }
  }catch(e){
    console.log(e)
  }
}

// 获取weibo
function reqweibo (skip, limit = 10) {
  const requestOptions = {
    method: "GET",
    headers: {
      'X-LC-Id': app_id,
      'X-LC-Key': app_key,
      'Content-Type': 'application/json'
    }
  };
  return fetch(`https://api.leancloud.cn/1.1/classes/content?count=1&limit=${limit}&skip=${skip}&order=-createdAt`, requestOptions)
  .then(response => response.json())
  .then(data => data)
}

// 格式化weibo内容
function contentToHTML(data) {
  const re = /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;
  const re_forpic = /\bhttps?:\/\/.*?(\.gif|\.jpeg|\.png|\.jpg|\.bmp|\.webp)/g;
  data.forEach(element => {
    element.content = element.content.replace(re_forpic, imgUrl =>{
      return "<img src='" + imgUrl + "' /> "
    });
    element.content = element.content.replace(re, url =>{
      return `<a href="${url}" target="_blank" class="weibo_link">👉链接</a>`
    });
    element.content = element.content.replace(/\n/g, '<br />');
  })
}

// 时间格式化
function dateFormat(time) {
  const dt = new Date(time)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}`
}

// 首页显示weibo
function showeibo () {
  const weibo = document.getElementsByClassName('weibo')[0];
  const content = document.getElementsByClassName('weibo_content')[0];
  if (weibo) {
    reqweibo(0,1).then( data => {
      contentToHTML(data.results);
      document.getElementsByClassName('weibo_content')[0].innerHTML = `${data.results[0].content}<div class="weibo_time">--- ${dateFormat(data.results[0].createdAt)}</div>`;
      weibo.style.display = 'block';
    });
    content.onclick = function (event) {
      const targetClass = event.target.className;
      for(let i=0; i<3; i++) {
        if (event.path[i].className === 'weibo_content' && targetClass !== 'weibo_link') {
          content.onclick = null;
          pjax ? pjax.loadUrl('/weibo.html') : location.href = '/weibo.html';
        }
      }
    }
  }
}

// 页面功能初始化
window.menuToggle = menuToggle;
window.loadValine = loadValine;
window.reqweibo = reqweibo;
window.contentToHTML = contentToHTML;
window.dateFormat = dateFormat;

window.onload = function(){
  nmsl();
  menuBtn.onclick = menuToggle;
  document.getElementById('search-form').onsubmit = function (event) {
    const input = document.getElementById('search-input');
    const value = input.value.trim();
    if (value === null || value === '') {
      event.preventDefault();
      input.value = '';
    }
  };
  document.getElementById('search-input').onblur = function () {
    document.getElementById('search-input').value = '';
  };
  // 暗色模式
  document.getElementById('xm').onclick = function () {
    const colorTheme =  document.documentElement.getAttribute('data-theme');
    if(colorTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  loadScript(BaseUrl+ '/npm/vanilla-lazyload@17.1.3/dist/lazyload.min.js', function () {
    lazyLoadInstance = new LazyLoad({
      elements_selector: '.lazyload'
    });
    this.onload = null;
  });
  loadScript(BaseUrl+ '/npm/instant.page@5.1.0', false, true);
  loadScript(BaseUrl+ '/npm/pjax@0.2.8/pjax.min.js', initPjax);
  loadScript(BaseUrl+ '/npm/aplayer@1.10.1/dist/APlayer.min.js',function () {
    loadScript(BaseUrl+ '/npm/meting@2.0.1/dist/Meting.min.js')
    this.onload = null;
  });
  initCount();
  showeibo();
  showLink();
  initLive2d();
  window.onload = null;
}
