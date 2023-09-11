function appendPreloaderManager(parent, isShown) {
  if (isShown) page.appendChild(parent.children[0]);
  else parent.appendChild(page.querySelector("#preloader"));
}

function wScale_title(elements, widthScale, mt, imgSource, mr, top) {
  elements.forEach((ele) => {
    ele.style.marginTop = mt;
    ele.style.top = top;
    ele.querySelector("img").src = imgSource;
    let imgs = ele.querySelectorAll("img");
    imgs.forEach((img) => {
      img.style.width = widthScale;
    });
  });
}

function wScale_icons(elements, widthScale, pt, mt) {
  let imgs = null;
  elements.forEach((ele, i) => {
    ele.style.paddingTop = pt;
    ele.style.marginTop = mt;

    imgs = ele.querySelectorAll("img");
    imgs.forEach((img) => {
      img.style.width = widthScale;
    });
  });
}

function rotateClock(element, angel) {
  element.style.transform = "rotate(" + 0 + "deg)";
  element.style.transform = "rotate(" + angel + "deg)";
}

function getDynamicDiv(div_name) {
  // filling content after flipping
  //   inner_dynamic_temp_content = dynamic_content_wrapper.innerHTML;
  //   dynamic_content_wrapper.innerHTML = `<div> ${dynamicDivs[div_name]} </div>`;
}

function resetDynamicDiv() {
  // filling content to original state

  if (inner_dynamic_temp_content != null) {
    // dynamic_content_wrapper.innerHTML = inner_dynamic_temp_content;
  } else {
    dynamic_content_wrapper.innerHTML = `<div> Somthing goes Wrong ! Contact your admin </div>`;
  }
}

const dynamicDivs = {
  home: "<div>home_div</div>",
  vocab: "<div>vocab_div</div>",
  grammar: "<div>grammar_div</div>",
  skills: `<div>skills_div</div>`,
  home_icon: "<div>home_icon_div</div>",
};
const titleFontSize = "1.3vw";
const page = document.querySelector(".page");
const hotspot = document.querySelector(".hotspot");
const arrow = document.querySelector("#clock_pointer");
const home_icon = document.querySelector("#home_icon");
const icons_img = document.querySelectorAll(".a2");
const titleBadge_img = document.querySelectorAll(".a1");
const home_btn = document.querySelector(".hs1");
const vocab_btn = document.querySelector(".hs2");
const grammar_btn = document.querySelector(".hs3");
const skills_btn = document.querySelector(".hs4");
const mobileBg = document.getElementById("mobileBG");
const contentMbile = document.querySelector(".contentMbile");
const mobile = document.querySelector(".mobile");
const reloadIcon = icons_img[0].querySelectorAll("img")[0];
const instructionIcon = icons_img[0].querySelectorAll("img")[1];
const dynamic_content_wrapper = document.querySelector(
  ".dynamic-content-wrapper"
);
let inner_dynamic_temp_content = null;

widthCalculations(false);

reloadIcon.addEventListener("click", function () {
  if (confirm("Do you want to reload all the page !")) {
    window.location.reload();
  }
});

instructionIcon.addEventListener("click", function () {
  alert("We still working on support and help page :)");
});

let switchFlag = false;

transformMobile(home_btn, 0);
transformMobile(vocab_btn, 180);
transformMobile(grammar_btn, 270);
transformMobile(skills_btn, 90);
transformMobile(home_icon, 360);

function transformMobile(btn, angel) {
  btn.onclick = () => {
    console.log(btn.getAttribute("name"));

    switchFlag = !switchFlag;

    if (switchFlag) {
      // clocke rotates ...
      rotateClock(arrow, angel);

      // after clock rotates ...
      setTimeout(() => {
        mobile.classList.toggle("goNext");
        contentMbile.style.width = "15vw";
      }, 600);

      hotspot.style.display = "none";

      setTimeout(() => {
        wScale_icons(icons_img, "5%", "0vw", "0%");
        wScale_title(
          titleBadge_img,
          "23%",
          "1%",
          "assets/images/maxi.svg",
          "1%",
          "7%"
        );

        contentMbile.style.transform = "rotate(90deg)";

        let w = getComputedStyle(mobile).getPropertyValue("width");
        let h = getComputedStyle(mobile).getPropertyValue("height");
        w = w.split("px");
        h = h.split("px");
        w[0] = parseFloat(w[0]);
        h[0] = parseFloat(h[0]);

        contentMbile.style.height = w[0] * 1.14 + "px";
        contentMbile.style.width = h[0] * 1.14 + "px";

        arrow.style.display = "none";
        page.classList.add("pageBG2");
        home_icon.style.animation = "fadeOut 0.5s linear";
        // home_icon.style.transition='5s ease';

        home_icon.style.display = "block";
        home_icon.style.cursor = "pointer";
        widthCalculations(true);

        // filling content after flipping regards to div_name
        getDynamicDiv(btn.getAttribute("name"));
      }, 1000);
      //// here is what externl (home icon) will do
    } else {
      mobile.classList.toggle("goNext");
      setTimeout(() => {
        widthCalculations(false);

        resetDynamicDiv();
      }, 600);

      returnToPortrait();
    }
  };
}

function returnToPortrait() {
  mobile.classList.remove("goNext");
  setTimeout(() => {
    widthCalculations(false);
  }, 600);

  contentMbile.style.width = "83%";
  contentMbile.style.height = "100%";
  wScale_icons(icons_img, "6%", "0vw", "-7%");
  wScale_title(
    titleBadge_img,
    "30%",
    "2%",
    "assets/images/mini.svg",
    "-10%",
    "0%"
  );

  contentMbile.style.transform = "rotate(0deg)";
  page.classList.remove("pageBG2");
  home_icon.style.display = "none";
  home_icon.style.cursor = "none";
  arrow.style.display = "block";
  widthCalculations(false);

  hotspot.style.display = "block";
}

function widthCalculations(flipped) {
  let w = getComputedStyle(contentMbile).getPropertyValue("width");
  let h = getComputedStyle(contentMbile).getPropertyValue("height");
  let mainTitle = document.getElementById("mainTitle");
  w = w.split("px");
  h = h.split("px");
  w[0] = parseFloat(w[0]);
  h[0] = parseFloat(h[0]);
  if (!flipped) {
    mainTitle.style.fontSize = w[0] / 25 + "px";
  } else {
    mainTitle.style.fontSize = h[0] / 30 + "px";
  }
  mainTitle.style.transition = "0.5s ease";
}

widthCalculations(false);

function resizeHeight() {
  let wInitial = document.documentElement.clientWidth;
  let hInitial = document.documentElement.clientHeight;
  let aspectRatio = wInitial / hInitial;
  page.style.height = wInitial / 2.062 + "px";

  // if (aspectRatio < 1) {
  //     page.style.height = (wInitial / 2.062) + 'px';
  // }
  // else
  //     if (wInitial > 1023) {
  //         page.style.height = '100vh';

  //     }
  //     else {
  //         page.style.height = '87vh';

  //     }
  widthCalculations(false);
}

resizeHeight();

window.onresize = () => {
  resizeHeight();
  returnToPortrait();
  switchFlag = false;
};

////////////////// pre loader
const preloader = document.querySelector(".preloader");
appendPreloaderManager(preloader, true);
document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    setTimeout(function () {
      appendPreloaderManager(preloader, false);
      preloader.style.display = "none";
    }, 10);
  }
};
//////////////////////////////////////////
