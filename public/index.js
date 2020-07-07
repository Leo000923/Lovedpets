// 导航实例
const headerEl = document.querySelector("header");
// 返回顶部实例
const scrollToTop = document.querySelector(".scrollToTop");

// 窗口滚动处理
window.addEventListener("scroll", () => {
  // 固定导航
  let height = headerEl.getBoundingClientRect().height;

  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  // 显示返回顶部
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

// 初始轮播
const glide = new Glide(".glide");
// 获取轮播标题实例
const captionsEl = document.querySelectorAll(".slide-caption");
// 当轮播加载完成后，每个轮播完成时，加载标题动画
glide.on(["mount.after", "run.after"], () => {
  // 获取当前展示的轮播index
  const caption = captionsEl[glide.index];
  anime({
    // 对每个子元素进行动画
    targets: caption.children,
    // 透明度
    opacity: [0, 1],
    // 持续时间
    duration: 400,
    easing: "linear",
    // 每个子元素相继延迟400毫秒，第一个延迟300毫秒
    delay: anime.stagger(400, { start: 300 }),
    // 从下向上移动，每行从40到10递减，最后移动到0
    translateY: [anime.stagger([40, 10]), 0]
  });
});

// 轮播进行前，把标题透明度设置为0，还原
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach(el => {
    el.style.opacity = 0;
  });
});

// 加载轮播，必须在添加事件处理函数之后
glide.mount();

// 成功案例
// 初始化isotope
const isotope = new Isotope(".cases", {
  // 适应行布局，每行宽度一样
  layoutMode: "fitRows",
  // 每个案例的class选择器
  itemSelector: ".case-item"
  // percentPosition: true
});
  
// 成功案例筛选
const filterBtns = document.querySelector(".filter-btns");
// 当点击筛选按钮时
filterBtns.addEventListener("click", e => {
  let { target = {} } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    // 取消其他按钮active状态
    document
      .querySelectorAll(".filter-btn.active")
      .forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");
    // 筛选
    isotope.arrange({ filter: filterOption });
  }
});

// 流畅滚动
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    // 自动计算固定导航的高度
    header: "header",
    // 偏移80象素
    offset: 80
});

// exploreBtn按钮的处理函数
const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach(exploreBtnEl =>{
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#showcases"));
      });
});

// 折叠按钮
const burgerEl = document.querySelector(".burger");
const nav = document.querySelector("header nav");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});

// 折叠菜单打开时，如果点击了链接，则自动关闭全屏导航
document.addEventListener("scrollStart", () => {
    if (headerEl.classList.contains("open")) {
      headerEl.classList.remove("open");
    }
});

// 按钮实例
const loginbtnEl = document.querySelector("#login-btn");
const registerbtnEl = document.querySelector("#register-btn");
const loginsubmitbtnEl = document.querySelector("#login-submit-btn");
const logincancelbtnEl = document.querySelector("#login-cancel-btn");
const registersubmitbtnEl = document.querySelector("#register-submit-btn");
const registercancelbtnEl = document.querySelector("#register-cancel-btn");

// 点击出现和消失的实例
const hidebgEl = document.querySelector(".hidebg");
const loginDialogEl = document.querySelector("#loginDialog");
const RegisterDialogEl = document.querySelector("#RegisterDialog");

loginbtnEl.addEventListener("click", () => {
    hidebgEl.style.display = "block";
    hidebgEl.style.height = document.body.clientHeight+"px";
    loginDialogEl.style.display = "grid";
});

registerbtnEl.addEventListener("click", () => {
  hidebgEl.style.display = "block";
  hidebgEl.style.height = document.body.clientHeight+"px";
  RegisterDialogEl.style.display = "grid";
});

logincancelbtnEl.addEventListener("click", () => {
  hidebgEl.style.display = "none";
  loginDialogEl.style.display = "none";
});

registercancelbtnEl.addEventListener("click", () => {
  hidebgEl.style.display = "none";
  RegisterDialogEl.style.display = "none";
});

// 上传信息
loginsubmitbtnEl.addEventListener("click", () => {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("post","http://localhost:5000/api/users/login",true);
  xmlhttp.onload = function() {
    console.log("端口调用成功");
    console.log(xmlhttp.responseText);
    alert(xmlhttp.responseText);
    clearTxt();
    hidebgEl.style.display = "none";
    loginDialogEl.style.display = "none";
  }
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlhttp.send("&email="+email+"&password="+password);
  
});

registersubmitbtnEl.addEventListener("click", () => {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("post","http://localhost:5000/api/users/register",true);
  xmlhttp.onload = function() {
    console.log("端口调用成功");
    console.log(xmlhttp.responseText);
    alert(xmlhttp.responseText);
    clearTxt();
    hidebgEl.style.display = "none";
    RegisterDialogEl.style.display = "none";
  }
  var name = document.getElementById("register-name").value;
  var email = document.getElementById("register-email").value;
  var password = document.getElementById("register-password1").value;
  var password2 = document.getElementById("register-password2").value;
  xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlhttp.send("name="+name+"&email="+email+"&password="+password+"&password2="+password2);
  
});

function clearTxt() {
  document.getElementById("login-email").innerHTML = "";
  document.getElementById("login-password").innerHTML = "";
  document.getElementById("register-name").innerHTML = "";
  document.getElementById("register-email").innerHTML = "";
  document.getElementById("register-password1").innerHTML = "";
  document.getElementById("register-password2").innerHTML = "";
}