const BASE_URL = "https://mx-1341045368.cos.ap-chengdu.myqcloud.com/";

const images = [
  "250227",
  "250217",
  "250115",
  "250101",
  "241215",
  "241128",
  "241123",
  "241116",
  "241102",
  "241010-1",
  "241005",
  "241001",
  "240930",
  "240923-1",
  "240915",
  "240910",
  "240904",
  "240826",
  "240624",
];

const grid = document.querySelector(".grid");
images.forEach((img, index) => {
  grid.innerHTML += `
    <div class="thumbnail" data-folder="${index + 1}">
      <img src="${img}-0.webp" class="thumb" alt="缩略图">
    </div>
  `;
});

const foldersData = {
  1: {
    bgm: "250227.mp3",
    media: ["250227-1.mp4", "250227-2.mp4", "250227-3.mp4"],
    date: "2025-02-27 20:18",
    text: "人总是真正经历失去，才会懂得珍惜#分享照片",
  },
  2: {
    bgm: "250217.mp3",
    media: ["250217-1.mp4"],
    date: "2025-02-17 10:49",
    text: "#生活碎片",
  },
  3: {
    bgm: "250115.mp3",
    media: ["250115-1.mp4", "250115-2.mp4"],
    date: "2025-01-15 11:14",
    text: "#人类幼崽 姨姨带娃，有福啦！",
  },
  4: {
    bgm: "250101.mp3",
    media: ["250101-1.mp4", "250101-2.mp4", "250101-3.mp4", "250101-4.mp4"],
    date: "2025-01-01 14:54",
    text: "#分享照片",
  },
  5: {
    bgm: "241215.mp3",
    media: ["241215-1.mp4", "241215-2.mp4", "241215-3.mp4", "241215-4.webp"],
    date: "2024-12-15 17:41",
    text: "#生活碎片",
  },
  6: {
    bgm: "241128.mp3",
    media: ["241128-1.png"],
    date: "2024-11-28 19:44",
  },
  7: {
    bgm: "241123.mp3",
    media: ["241123-1.mp4", "241123-2.mp4", "241123-3.png"],
    date: "2024-11-23 21:15",
    text: "22",
  },
  8: {
    bgm: "241116.mp3",
    media: ["241116-1.mp4"],
    date: "2024-11-16 09:02",
    text: "祝自己小人得志",
  },
  9: {
    bgm: "241102.mp3",
    media: ["241102-1.jpeg", "241102-2.jpeg", "241102-3.jpeg"],
    date: "2024-11-02 00:07",
    text: "三张图，找三个人p。",
  },
  10: {
    bgm: "241010.mp3",
    media: ["241010-1-0.webp", "241010-2.webp"],
    date: "2024-10-10 12:37",
  },
  11: {
    bgm: "241005.mp3",
    media: ["241005-1.mp4"],
    date: "2024-10-05 18:41",
    text: "说遗憾也不是很遗憾说不遗憾也很遗憾",
  },
  12: {
    bgm: "241001.mp3",
    media: ["241001-1.webp", "241001-2.webp", "241001-3.webp", "241001-4.webp", "241001-5.webp"],
    date: "2024-10-01 23:18",
    text: "没有常青树做自己的自由花",
  },
  13: {
    bgm: "240930.mp3",
    media: ["240930-1.mp4"],
    date: "2024-09-30 00:20",
    text: "圆周率没有没有尽头，人们也只记得开头！",
  },
  14: {
    bgm: "240923.mp3",
    media: ["240923-1-0.webp"],
    date: "2024-09-23 01:14",
    text: "你承诺过的月亮，还是没有出现！",
  },
  15: {
    bgm: "240915.mp3",
    media: ["240915-1.webp", "240915-2.webp"],
    date: "2024-09-15 23:37",
    text: "幸福没有标准答案",
  },
  16: {
    bgm: "240910.mp3",
    media: ["240910-1.jpg", "240910-2.jpg"],
    date: "2024-09-10 23:08",
  },
  17: {
    bgm: "240904.mp3",
    media: ["240904-1.mp4"],
    date: "2024-09-04 01:28",
  },
  18: {
    bgm: "240826.mp3",
    media: ["240826-1.jpg"],
    date: "2024-08-26 22:57",
  },
  19: {
    bgm: "240624.mp3",
    media: ["240624-1.mp4"],
    date: "2024-06-24 23:21",
  },
};

function exitPage() {
  window.location.href = "https://www.csyan.asia";
}

let currentFolder = null;
let currentIndex = 0;
let currentFolderId = null;
let isHomeScrollEnabled = true;
let isMediaPlaying = false;

document.addEventListener("DOMContentLoaded", function () {
  const thumbs = document.querySelectorAll(".grid .thumb");
  thumbs.forEach((img) => {
    const originalSrc = img.getAttribute("src");
    img.src = BASE_URL + originalSrc;
  });
});

document.querySelectorAll(".thumbnail").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const folderId = thumb.dataset.folder;
    openFolder(folderId);
  });
});

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

function getDistance(touch1, touch2) {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

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
  carousel.style.transition = "transform 0.3s ease";
  data.media.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "media-item";
    if (file.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.loop = true;
      video.innerHTML = `<source src="${BASE_URL}${file}" type="video/mp4">`;
      video.addEventListener("loadeddata", () => {
        video.volume = 1;
      });
      item.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = BASE_URL + file;
      item.appendChild(img);
    }
    carousel.appendChild(item);
  });

  preloadAdjacentMedia(data.media, 0);

  document.body.appendChild(clone);
  container.style.display = "block";
  currentFolder = container;
  currentIndex = 0;
  isMediaPlaying = true;
  if (data.bgm) bgm.play();
  playCurrentMedia();

  const dateElement = container.querySelector(".date");
  const descElement = container.querySelector(".description");
  dateElement.textContent = data.date;
  descElement.textContent = data.text || "";

  disableHomeScroll();
  initSwipe(container);
}

function preloadAdjacentMedia(mediaList, currentIndex) {
  const prevIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
  const nextIndex = (currentIndex + 1) % mediaList.length;

  const preloadMedia = (index) => {
    const file = mediaList[index];
    if (file.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.src = BASE_URL + file;
      video.preload = "auto";
    } else {
      const img = new Image();
      img.src = BASE_URL + file;
    }
  };

  preloadMedia(prevIndex);
  preloadMedia(nextIndex);
}

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
  newCarousel.style.transition = "transform 0.3s ease";
  newData.media.forEach((file) => {
    const item = document.createElement("div");
    item.className = "media-item";
    item.style.transform = "scale(1)";
    if (file.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.loop = true;
      video.innerHTML = `<source src="${BASE_URL}${file}" type="video/mp4">`;
      video.addEventListener("loadeddata", () => {
        video.volume = 1;
      });
      item.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = BASE_URL + file;
      item.appendChild(img);
    }
    newCarousel.appendChild(item);
  });

  preloadAdjacentMedia(newData.media, 0);

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
    currentFolder.style.transform = direction === "up" ? "translateY(100%)" : "translateY(-100%)";
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
    isMediaPlaying = true;
    if (newData.bgm) newBgm.play();
    playCurrentMedia();
    initSwipe(newContainer);
  }, 300);
}

function initSwipe(container) {
  let startX = 0;
  let startY = 0;
  let gestureMode = null;
  let pinchStartScale = 1;
  let pinchStartTranslateX = 0;
  let pinchStartTranslateY = 0;
  let initialDistance = 0;
  let initialCenterX = 0;
  let initialCenterY = 0;

  container.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      gestureMode = "swipe";
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      gestureMode = "pinch";
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      initialDistance = getDistance(touch1, touch2);
      initialCenterX = (touch1.clientX + touch2.clientX) / 2;
      initialCenterY = (touch1.clientY + touch2.clientY) / 2;
      const currentMediaItem = container.querySelectorAll(".media-item")[currentIndex];
      const style = window.getComputedStyle(currentMediaItem);
      const transform = style.transform;
      const matrix = transform.match(/^matrix\((.+)\)$/);
      if (matrix) {
        const values = matrix[1].split(", ");
        pinchStartScale = parseFloat(values[0]);
        pinchStartTranslateX = parseFloat(values[4]);
        pinchStartTranslateY = parseFloat(values[5]);
      } else {
        pinchStartScale = 1;
        pinchStartTranslateX = 0;
        pinchStartTranslateY = 0;
      }
    }
  });

  container.addEventListener("touchmove", (e) => {
    if (gestureMode === "swipe" && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - startX;
      const carousel = container.querySelector(".carousel");
      const totalItems = container.querySelectorAll(".media-item").length;
      
      let translateX = -currentIndex * 100 + (deltaX / window.innerWidth) * 100;
      if (currentIndex === 0 && deltaX > 0) {
        translateX = 0; 
      } else if (currentIndex === totalItems - 1 && deltaX < 0) {
        translateX = -currentIndex * 100; 
      }
      
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(${translateX}%)`;
    } else if (gestureMode === "pinch" && e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const newDistance = getDistance(touch1, touch2);
      const scaleFactor = newDistance / initialDistance;
      let newScale = pinchStartScale * scaleFactor;
      const minScale = 0.1;
      const maxScale = 7;
      newScale = Math.min(Math.max(newScale, minScale), maxScale);

      const newCenterX = (touch1.clientX + touch2.clientX) / 2;
      const newCenterY = (touch1.clientY + touch2.clientY) / 2;
      const deltaCenterX = newCenterX - initialCenterX;
      const deltaCenterY = newCenterY - initialCenterY;

      const currentMediaItem = container.querySelectorAll(".media-item")[currentIndex];
      const rect = currentMediaItem.getBoundingClientRect();
      const translateX = pinchStartTranslateX + deltaCenterX;
      const translateY = pinchStartTranslateY + deltaCenterY;

      currentMediaItem.style.transition = "none";
      currentMediaItem.style.transform = `translate(${translateX}px, ${translateY}px) scale(${newScale})`;
      currentMediaItem.style.transformOrigin = "center center";
    }
  });

  container.addEventListener("touchend", (e) => {
    if (e.touches.length === 0) {
      const carousel = container.querySelector(".carousel");
      const totalItems = container.querySelectorAll(".media-item").length;
      
      if (gestureMode === "swipe") {
        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          carousel.style.transition = "transform 0.3s ease";
          if (Math.abs(deltaX) > 65) {
            if (deltaX > 0 && currentIndex > 0) {
              currentIndex--; // 只在不是第一个时允许左滑
            } else if (deltaX < 0 && currentIndex < totalItems - 1) {
              currentIndex++; // 只在不是最后一个时允许右滑
            }
          }
          carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
          if (isMediaPlaying) playCurrentMedia();
          preloadAdjacentMedia(foldersData[currentFolderId].media, currentIndex);
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
            carousel.style.transition = "transform 0.3s ease";
            carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
          }
        }
      } else if (gestureMode === "pinch") {
        const currentMediaItem = container.querySelectorAll(".media-item")[currentIndex];
        currentMediaItem.style.transition = "transform 0.3s ease";
        currentMediaItem.style.transform = "translate(0px, 0px) scale(1)";
        currentMediaItem.style.transformOrigin = "center center";
      }
      gestureMode = null;
    }
  });

  container.querySelector(".close-btn").addEventListener("click", () => {
    closeFolder();
  });

  container.addEventListener("click", (e) => {
    if (container.querySelector(".close-btn").contains(e.target)) return;
    isMediaPlaying = !isMediaPlaying;
    const bgm = container.querySelector(".bgm");
    const currentItem = container.querySelectorAll(".media-item")[currentIndex];
    const video = currentItem.querySelector("video");
    if (isMediaPlaying) {
      if (bgm.src) bgm.play();
      if (video) video.play();
    } else {
      if (bgm.src) bgm.pause();
      if (video) video.pause();
    }
  });
}

function playCurrentMedia() {
  if (isMediaPlaying) {
    const currentItem = currentFolder.querySelectorAll(".media-item")[currentIndex];
    const video = currentItem.querySelector("video");
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  }
}

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
    isMediaPlaying = false;
  }
  enableHomeScroll();
}

function disableHomeScroll() {
  isHomeScrollEnabled = false;
  document.body.style.overflow = "hidden";
}

function enableHomeScroll() {
  isHomeScrollEnabled = true;
  document.body.style.overflow = "auto";
}

document.addEventListener(
  "touchmove",
  (e) => {
    if (!isHomeScrollEnabled) {
      e.preventDefault();
    }
  },
  { passive: false }
);