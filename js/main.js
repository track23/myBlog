!function(){var e="https://cdn.jsdelivr.net",n=document.getElementById("secondary-toggle"),t=document.getElementById("secondary"),o="undefined"!=typeof window,i=o&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent),a=o&&"IntersectionObserver"in window,l="UqKcJNE0cBerSu52yLvC1qVs-gzGzoHsz",c="cUR3tOdrBA0ULbONb8sfOipw",d=null,s=null,r=document.getElementsByClassName("loading-bar")[0],u=document.querySelector(".loading-bar>.progress"),m=null;window.message_Path="/live2d/",window.home_Path="https://crosschannel.cc/";var g=[{name:"aoba",textures:1},{name:"neko",textures:2},{name:"Pio",textures:65,favorite:14},{name:"Tia",textures:40,favorite:34},{name:"Terisa",textures:1}],p=0,h=1;function f(e,n,t){var o=document.createElement("script");o.src=e,n&&(o.onload=n),t&&(o.type="module"),o.async=!0,document.body.appendChild(o)}function y(){i||(window.pjax=new Pjax({selectors:["title","#main"],cacheBust:!1,analytics:!1,scrollRestoration:!1}),document.addEventListener("pjax:send",(function(){scrollTo(0,0);var e=20;r.classList.add("loading"),u.style.width=e+"%",clearInterval(m),m=setInterval((function(){(e+=3)>95&&(e=95),u.style.width=e+"%"}),500)})),document.addEventListener("pjax:complete",(function(){clearInterval(m),u.style.width="100%",r.classList.remove("loading"),setTimeout((function(){u.style.width=0}),400),d.update(),("dark"===localStorage.getItem("theme")||(new Date).getHours()>=21||(new Date).getHours()<7||matchMedia("(prefers-color-scheme: dark)").matches)&&document.documentElement.setAttribute("data-theme","dark"),k(),b()}))),this.onload=null}function v(){new Valine({el:"#valine",count_el:"#comment-count",lang:"zh-cn",emoticon_url:e+"/gh/track23/blog-static/alu",emoticon_list:["吐.png","喷血.png","狂汗.png","不说话.png","汗.png","坐等.png","献花.png","不高兴.png","中刀.png","害羞.png","皱眉.png","小眼睛.png","中指.png","尴尬.png","瞅你.png","想一想.png","中枪.png","得意.png","肿包.png","扇耳光.png","亲亲.png","惊喜.png","脸红.png","无所谓.png","便便.png","愤怒.png","蜡烛.png","献黄瓜.png","内伤.png","投降.png","观察.png","看不见.png","击掌.png","抠鼻.png","邪恶.png","看热闹.png","口水.png","抽烟.png","锁眉.png","装大款.png","吐舌.png","无奈.png","长草.png","赞一个.png","呲牙.png","无语.png","阴暗.png","不出所料.png","咽气.png","期待.png","高兴.png","吐血倒地.png","哭泣.png","欢呼.png","黑线.png","喜极而泣.png","喷水.png","深思.png","鼓掌.png","暗地观察.png"],app_id:l,app_key:c,placeholder:"Write a Comment",admin_email_hash:"ed69c6079398441b73dbfdbbfc8cd196",max_nest:2,page_size:5})}function w(){setTimeout((function(){var e=document.getElementById("comment");if(!i&&a&&e){var n=new IntersectionObserver((function(e){e[0].isIntersecting&&(v(),n.disconnect(),n=null)}),{threshold:[0]});n.observe(e)}else e&&v()}),1e3)}function b(){var e,n,t;1===document.getElementsByClassName("leancloud_visitors").length&&document.getElementById("comment")?(e=document.getElementsByClassName("leancloud_visitors")[0],n=e.getAttribute("id").trim(),t=e.getAttribute("data-flag-title").trim(),E(n).then((function(e){return e.json()})).then((function(e){var o,i;0===e.results.length?function(e,n){var t={title:e,url:n,time:1},o=JSON.stringify(t);return fetch("https://api.leancloud.cn/1.1/classes/Counter?fetchWhenSave=true",{method:"POST",headers:{"Content-Type":"application/json","X-LC-Id":l,"X-LC-Key":c},body:o})}(t,n).then((function(e){return e.json()})).then((function(e){document.getElementById(n).textContent=e.time})):(o=e.results[0].objectId,i=JSON.stringify({time:{__op:"Increment",amount:1}}),fetch("https://api.leancloud.cn/1.1/classes/Counter/"+o+"?fetchWhenSave=true",{method:"PUT",headers:{"Content-Type":"application/json","X-LC-Id":l,"X-LC-Key":c},body:i})).then((function(e){return e.json()})).then((function(e){document.getElementById(n).textContent=e.time}))})).catch((function(e){}))):document.getElementsByClassName("post-title-link").length>=1&&E().then((function(e){return e.json()})).then((function(e){e.results.forEach((function(e){document.getElementById(e.url).textContent=e.time}))})).catch((function(e){}))}function E(e){var n={_method:"GET",_ApplicationId:l,_ApplicationKey:c};if(e)n.keys="time",n.limit=1,n.where={url:e};else{n.keys="time,url";var t=[];document.querySelectorAll(".leancloud_visitors").forEach((function(e){t.push(e.getAttribute("id").trim())})),n.where={url:{$in:t}}}var o=JSON.stringify(n);return fetch("https://api.leancloud.cn/1.1/classes/Counter",{method:"POST",headers:{"Content-Type":"text/plain"},body:o})}function I(){t.classList.toggle("toggle-on")?(n.classList.remove("iconcaidan"),n.classList.add("iconfork"),t.setAttribute("aria-expanded","true")):(n.classList.remove("iconfork"),n.classList.add("iconcaidan"),t.setAttribute("aria-expanded","false"))}function j(){p===g.length-1&&(p=-1),p++,h=g[p].favorite||1,loadlive2d("live2d","/live2d/".concat(g[p].name,"/model").concat(h,".json"))}function B(){1!==g[p].textures&&(h===g[p].textures&&(h=0),h++,loadlive2d("live2d","/live2d/".concat(g[p].name,"/model").concat(h,".json")))}function x(e){var n=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=n-e,i=Math.random();return(e+o*i).toFixed(t)}(0,14);document.getElementById("friend-link").href=e[n].url,document.getElementById("friend-name").textContent=e[n].name,document.getElementById("friend-desc").textContent=e[n].description}function k(){Array.isArray(s)?x(s):fetch("/friend.json").then((function(e){return e.json()})).then((function(e){document.getElementById("friend-link").style.display="block",x(e),s=e}))}window.menuToggle=I,window.loadValine=w,window.onload=function(){!function(){function e(){confirm("垃圾浏览器nmsl，该换浏览器了")?window.location.href="https://www.microsoft.com/zh-cn/edge":document.body.innerHTML='<h1 style="fontSize:50px">该换浏览器了</h1>'}try{(window.ActiveXObject||"ActiveXObject"in window)&&e();var n=window.navigator.userAgent;if(n.includes("UBrowser")){var t=n.match(/Chrome\/[0-9]*/g)[0].split("/")[1];Number(t)<=55&&e()}}catch(e){console.log(e)}}(),n.onclick=I,document.getElementById("search-form").onsubmit=function(e){var n=document.getElementById("search-input"),t=n.value.trim();null!==t&&""!==t||(e.preventDefault(),n.value="")},document.getElementById("search-input").onblur=function(){document.getElementById("search-input").value=""},document.getElementById("xm").onclick=function(){"dark"===document.documentElement.getAttribute("data-theme")?(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light")):(document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"))},f(e+"/npm/vanilla-lazyload@17.1.3/dist/lazyload.min.js",(function(){d=new LazyLoad({elements_selector:".lazyload"}),this.onload=null})),f(e+"/npm/instant.page@5.1.0",!1,!0),f(e+"/npm/pjax@0.2.8/pjax.min.js",y),f(e+"/gh/track23/blog-static/Valine.min.js",w),f(e+"/npm/aplayer@1.10.1/dist/APlayer.min.js",(function(){f(e+"/npm/meting@2.0.1/dist/Meting.min.js"),this.onload=null})),k(),b(),window.screen.width>955?(f("/js/live2d.min.js",(function(){document.getElementById("landlord").style.display="block";var e=JSON.parse(localStorage.getItem("live2d"));e&&(p=e.currentModel,h=e.currentTextures),loadlive2d("live2d","/live2d/".concat(g[p].name,"/model").concat(h,".json"));var n=document.createElement("div");n.className="btns",n.innerHTML='<button class="changeTextures-btn">👘</button><button class="changeModel-btn">🙍‍♀️</button>',document.getElementById("landlord").appendChild(n),document.getElementsByClassName("changeModel-btn")[0].onclick=j,document.getElementsByClassName("changeTextures-btn")[0].onclick=B,this.onload=null})),window.onbeforeunload=function(){localStorage.setItem("live2d",JSON.stringify({currentModel:p,currentTextures:h}))},f("/js/message.js")):(document.getElementById("memu").onclick=I,document.getElementById("tagcloud").onclick=I,document.querySelector(".site-title>a").onclick=function(){t.classList.contains("toggle-on")&&I()}),window.onload=null}}();