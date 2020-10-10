function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

function getChromeVersion(){
    let match = window.navigator.userAgent.match(/chrome\/(\d+)/i);
    if(match){
        return +match[1]
    }else{
        return null
    }
}

if(getChromeVersion() >= 72){
    let element = new Image();
    Object.defineProperty(element, 'id', {
        get: function () {
            showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000, true);
        }
    });
    console.log('%c/x/', element);
}else{
    var re = /x/;
    console.log(re);
    re.toString = function() {
        showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000, true);
        return '';
    };
}

document.addEventListener('copy', function(e){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000)
});

function initTips(){
    fetch(`${message_Path}message.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data.mouseover.forEach(function (item) {
        document.querySelectorAll(item.selector).forEach(function(el){
          el.onmouseover = function () {
            var text = item.text;
            if(Array.isArray(item.text)) text = item.text[Math.floor(Math.random() * item.text.length + 1)-1];
            text = text.renderTip({text: this.innerText});
            showMessage(text, 3000);
          }
        })
      });
      data.click.forEach(function (item) {
        document.querySelectorAll(item.selector).forEach(function(el){
          el.onclick = function () {
            var text = item.text;
            if(Array.isArray(item.text)) text = item.text[Math.floor(Math.random() * item.text.length + 1)-1];
            text = text.renderTip({text: this.innerText});
            showMessage(text, 3000);
          }
        })
      });
    })
}
initTips();

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '嗨！ 来自 百度搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'so') {
            text = '嗨！ 来自 360搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'google') {
            text = '嗨！ 来自 谷歌搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //主页URL判断，需要斜杠结尾
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了！';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
        }else {
            text = '欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto,30000);

function showHitokoto(){
    fetch('https://v1.hitokoto.cn/')
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
        showMessage(data.hitokoto, 5000)
        })
}

function showMessage (text, timeout) {
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    var message = document.querySelector('.message')
    message.innerHTML = text
    message.style = 'opacity:1'
    hideMessage(timeout)
}

var t1 =null
function hideMessage (timeout) {
    clearTimeout(t1)
    t1 = setTimeout(function () {
        document.querySelector('.message').style = 'opacity:0';
    },timeout)
}

function initLive2d () {
    var hide_btn = document.querySelector('.hide-button')
    var landlord = document.getElementById('landlord')
    try {
        hide_btn.onclick = function () {
            landlord.style = 'display:none'
            hide_btn.style = 'display:none'
        }
        landlord.onmouseover = function () {
            hide_btn.style = 'display:block'
        }
        landlord.onmouseout = function () {
            hide_btn.style = 'display:none'
        }
    }catch (err) {}
}
initLive2d ();
