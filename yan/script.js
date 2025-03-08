const BASE_URL = "https://yan-1341045368.cos.ap-beijing.myqcloud.com/";
function exitPage() {
window.location.href = "https://www.csyan.asia";
}

const images = [
"250113-1",
"241116-0",
"241022-0",
"240912-1",
"240808-1",
"240603-1",
"240501-0",
"240116-0",
];

const grid = document.querySelector(".grid");
images.forEach((img, index) => {
grid.innerHTML += `
<div class="thumbnail" data-folder="${index + 1}">
<img src="${img}.webp" class="thumb" alt="缩略图">
</div>
`;
});

const foldersData = {
1: {
bgm: "250113.mp3", 
media: ["250113-1.webp", "250113-2.webp","250113-3.webp", "250113-4.webp","250113-5.webp", "250113-6.webp", "250113-7.webp"],
date: "2025-01-13",
text: "我决定做一个照照镜子就能开心一整天的人#我决定重新爱上阳光#每一种生活都值得被记录",
},
2: {
bgm: "241116.mp3", 
media: ["241116-1.mp4", "241116-2.mp4"],
date: "2024-11-16",
},

3: {
bgm: "241022.mp3", 
    media: ["241022-1.mp4", "241022-2.mp4", "241022-3.mp4", "241022-4.mp4", "241022-5.mp4"],
date: "2024-10-22",
text: "有迹可循的moment#宝宝你看镜头#一直在一起的人才值得炫耀",
},
4: {
bgm: "240912.mp3", 
    media: ["240912-1.webp","240912-2.webp"],
date: "2024-09-12",
text: "于是 我驻足。@L",
},

5: {
bgm: "240808.mp3", 
    media: ["240808-1.webp"],
date: "2024-08-08",
text: "冬天来的时候你还在不在#原相机live#冬天",
},
6: {
bgm: "240603.mp3", 
    media: ["240603-1.webp", "240603-2.webp","240603-3.webp"],
date: "2024-06-03",
text:"#生活碎片记录",
},
7: {
bgm: "240501.mp3", 
    media: ["240501-1.mp4", "240501-2.mp4"],
date: "2024-05-01",
text: "Oh爱本是尘埃#夏天的味道#原相机#分享照片",
},
8: {
media: ["240116-1.mp4"] ,
date: "2024-01-16",
text: "幸福开始有预兆",
},

};

let currentFolder = null;
let currentIndex = 0;
let currentFolderId = null;
let isHomeScrollEnabled = true;

// 页面加载完成后，更新所有缩略图的图片路径
document.addEventListener("DOMContentLoaded", function () {
  const thumbs = document.querySelectorAll(".grid .thumb");
  thumbs.forEach((img) => {
    const originalSrc = img.getAttribute("src");
    img.src = BASE_URL + originalSrc;
  });
});

// 为所有缩略图添加点击事件，点击时打开对应文件夹
document.querySelectorAll(".thumbnail").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const folderId = thumb.dataset.folder;
    openFolder(folderId);
  });
});

// 控制背景音乐播放与暂停，并切换播放按钮图标
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const playIcon = document.getElementById("playIcon");
let isMusicPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    playIcon.src = BASE_URL + "gz.png";
  } else {
    bgMusic.play();
    playIcon.src = BASE_URL + "ygz.png";
  }
  isMusicPlaying = !isMusicPlaying;
});

// 打开指定文件夹，加载文件夹内容并显示
function openFolder(folderId) {
  currentFolderId = parseInt(folderId);
  const data = foldersData[folderId];
  const template = document.getElementById("folderTemplate");
  const clone = template.content.cloneNode(true);
  const container = clone.querySelector(".folder-container");

  const bgm = container.querySelector(".bgm");
  if (data.bgm) {
    bgm.src = BASE_URL + data.bgm;
    bgm.loop = true;
  }

  const carousel = container.querySelector(".carousel");
  data.media.forEach((file) => {
    const item = document.createElement("div");
    item.className = "media-item";
    if (file.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.loop = true;
      video.innerHTML = `<source src="${BASE_URL}${file}" type="video/mp4">`;
      video.addEventListener("loadeddata", () => {
        video.volume = 0; // 初始音量设为0
        if (currentIndex === 0) {
          video.volume = 1;
          video.play();
        }
      });
      item.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = BASE_URL + file;
      item.appendChild(img);
    }
    carousel.appendChild(item);
  });

  document.body.appendChild(clone);
  container.style.display = "block";
  currentFolder = container;
  if (data.bgm) bgm.play();

  const dateElement = container.querySelector(".date");
  const descElement = container.querySelector(".description");
  dateElement.textContent = data.date;
  descElement.textContent = data.text || "";

  disableHomeScroll();
  initSwipe(container);
}

// 切换文件夹，带有动画效果并加载新文件夹内容
function switchFolder(newFolderId, direction) {
  const newData = foldersData[newFolderId];
  const template = document.getElementById("folderTemplate");
  const newClone = template.content.cloneNode(true);
  const newContainer = newClone.querySelector(".folder-container");

  const newBgm = newContainer.querySelector(".bgm");
  if (newData.bgm) {
    newBgm.src = BASE_URL + newData.bgm;
    newBgm.loop = true;
  }

  const newCarousel = newContainer.querySelector(".carousel");
  newData.media.forEach((file) => {
    const item = document.createElement("div");
    item.className = "media-item";
    if (file.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.loop = true;
      video.innerHTML = `<source src="${BASE_URL}${file}" type="video/mp4">`;
      video.addEventListener("loadeddata", () => {
        video.volume = 0; // 初始音量设为0
        if (currentIndex === 0) {
          video.volume = 1;
          video.play();
        }
      });
      item.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = BASE_URL + file;
      item.appendChild(img);
    }
    newCarousel.appendChild(item);
  });

  const newDateElement = newContainer.querySelector(".date");
  const newDescElement = newContainer.querySelector(".description");
  newDateElement.textContent = newData.date;
  newDescElement.textContent = newData.text || "";

  document.body.appendChild(newClone);
  newContainer.style.display = "block";

  if (direction === "up") {
    newContainer.style.transform = "translateY(-100%)";
  } else {
    newContainer.style.transform = "translateY(100%)";
  }

  newContainer.offsetHeight;

  newContainer.style.transform = "translateY(0)";
  if (currentFolder) {
    currentFolder.style.transform =
      direction === "up" ? "translateY(100%)" : "translateY(-100%)";
  }

  setTimeout(() => {
    if (currentFolder) {
      currentFolder.querySelectorAll("video, audio").forEach((media) => {
        media.pause();
        media.src = "";
        media.load();
      });
      currentFolder.remove();
    }
    currentFolder = newContainer;
    currentFolderId = parseInt(newFolderId);
    currentIndex = 0;
    if (newData.bgm) newBgm.play();
    playCurrentMedia();
    initSwipe(newContainer);
  }, 300);
}

// 初始化触摸滑动事件，支持左右滑动切换媒体和上下滑动切换文件夹
function initSwipe(container) {
  let startX = 0;
  let startY = 0;
  let isSwiping = false;

  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
  });

  container.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    container.querySelector(".carousel").style.transform = `translateX(${
      -currentIndex * 100 + (deltaX / window.innerWidth) * 100
    }%)`;
  });

  container.addEventListener("touchend", (e) => {
    if (!isSwiping) return;
    isSwiping = false;

    const deltaX = e.changedTouches[0].clientX - startX;
    const deltaY = e.changedTouches[0].clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentIndex > 0) {
          currentIndex--;
        } else if (
          deltaX < 0 &&
          currentIndex < container.querySelectorAll(".media-item").length - 1
        ) {
          currentIndex++;
        }
      }
      container.querySelector(".carousel").style.transform = `translateX(${
        -currentIndex * 100
      }%)`;
      playCurrentMedia();
    } else {
      if (Math.abs(deltaY) > 100) {
        let newFolderId = currentFolderId;
        if (deltaY > 0) {
          newFolderId--;
          if (newFolderId < 1) newFolderId = 19;
          switchFolder(newFolderId.toString(), "up");
        } else {
          newFolderId++;
          if (newFolderId > 19) newFolderId = 1;
          switchFolder(newFolderId.toString(), "down");
        }
      } else {
        container.querySelector(".carousel").style.transform = `translateX(${
          -currentIndex * 100
        }%)`;
      }
    }
  });

  container.querySelector(".close-btn").addEventListener("click", () => {
    closeFolder();
  });
}

// 播放当前选中的媒体（视频）
function playCurrentMedia() {
  const mediaItems = currentFolder.querySelectorAll(".media-item");
  mediaItems.forEach((item, index) => {
    const video = item.querySelector("video");
    if (video) {
      if (index === currentIndex) {
        video.volume = 1;
        video.currentTime = 0;
        video.play();
      } else {
        video.volume = 0;
        video.pause();
      }
    }
  });
}

// 关闭当前文件夹并清理资源
function closeFolder() {
  if (currentFolder) {
    currentFolder.querySelectorAll("video, audio").forEach((media) => {
      media.pause();
      media.src = "";
      media.load();
    });
    currentFolder.remove();
    currentFolder = null;
    currentIndex = 0;
    currentFolderId = null;
  }
  enableHomeScroll();
}

// 禁用主页滚动
function disableHomeScroll() {
  isHomeScrollEnabled = false;
  document.body.style.overflow = "hidden";
}

// 启用主页滚动
function enableHomeScroll() {
  isHomeScrollEnabled = true;
  document.body.style.overflow = "auto";
}

// 阻止触摸滚动（当主页滚动被禁用时）
document.addEventListener(
  "touchmove",
  (e) => {
    if (!isHomeScrollEnabled) {
      e.preventDefault();
    }
  },
  { passive: false }
);