// Reference to container
const menuFrames = document.getElementById('menuFrames');
const MENU_BUTTONS = document.getElementById('shopButtons');
const frameSpacing = 300;
const baseRight = 65;
const topPosition = 20;
const frameWidth = 520;
const frameHeight = 500;

// Global scope
const decorationImageList = [
  { name: "Bongo Bango Bongos", src: "images/Decorations/StarShop Decorations/Bingo Bango Bongos.png" },
  { name: "Givutawai Tree", src: "images/Decorations/StarShop Decorations/Givutawai Tree.png" },
  { name: "Tree Hut", src: "images/Decorations/Tree Hut.png" },
  { name: "Tree Hut", src: "images/Decorations/Tree Hut.png" },
  { name: "Extra Item", src: "images/Decorations/Tree Hut.png" }
];

const MSMFont = new FontFace('MSMFont', 'url(fonts/OpenDyslexic-Bold.otf)');

MSMFont.load().then((loadedFont) => {
  document.fonts.add(loadedFont);
}).catch(err => console.error(err));

// Draw image centered
function drawCenteredImage(ctx, img, x, y, newWidth, newHeight) {
  ctx.drawImage(img, 0, 0, img.width, img.height, x - newWidth / 2, y - newHeight / 2, newWidth, newHeight);
}

// Function to open the decorations menu
function createDecorationsMenu(decorationImageList) {
  const frameElements = [];
  const canvasElements = [];
  const nameElements = [];
  
  // Container for scrollbar
  let scrollbar;

  // Create all elements
  decorationImageList.forEach((item, index) => {
    // Frame
    const frame = document.createElement('img');
    frame.src = 'images/Store/Menu_Display.png';
    frame.style.position = 'fixed';
    frame.style.top = `${topPosition}%`;
    frame.style.right = `${baseRight - index * (frameSpacing / 10)}%`;
    frame.style.transition = 'right 0.3s ease, opacity 0.3s ease';
    menuFrames.appendChild(frame);
    frameElements.push(frame);

    // Canvas
    const canvas = document.createElement('canvas');
    canvas.width = frameWidth;
    canvas.height = frameHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = `${topPosition}%`;
    canvas.style.right = `${baseRight - index * (frameSpacing / 10)}%`;
    canvas.style.transition = 'right 0.3s ease, opacity 0.3s ease';
    menuFrames.appendChild(canvas);
    canvasElements.push(canvas);

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = item.src;
    img.onload = () => {
      const maxWidth = canvas.width * 0.4;
      const maxHeight = canvas.height * 0.4;
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      drawCenteredImage(ctx, img, 350, 230, img.width * scale, img.height * scale);
    };

    // Name
    const nameEl = document.createElement('h1');
    nameEl.textContent = item.name;
    nameEl.style.position = 'fixed';
    nameEl.style.top = `${topPosition + 5}%`;
    nameEl.style.right = `${baseRight + 5 - index * (frameSpacing / 10)}%`;
    nameEl.style.color = 'white';
    nameEl.style.fontSize = '20px';
    nameEl.style.fontFamily = 'MSMFont';
    nameEl.style.textAlign = 'center';
    nameEl.style.width = '220px';
    nameEl.style.transition = 'right 0.3s ease, opacity 0.3s ease';
    menuFrames.appendChild(nameEl);
    nameElements.push(nameEl);
  });

  // Scrollbar
  scrollbar = document.createElement('input');
  scrollbar.type = 'range';
  scrollbar.min = 0;
  scrollbar.max = Math.max(0, decorationImageList.length - 3);
  scrollbar.step = 0.01;
  scrollbar.value = 0;
  scrollbar.style.position = 'fixed';
  scrollbar.style.width = '300px';
  scrollbar.style.left = '50%';
  scrollbar.style.transform = 'translateX(-50%)';
  scrollbar.style.bottom = '20px';
  menuFrames.appendChild(scrollbar);

  function updateVisibility(scrollIndex) {
    decorationImageList.forEach((_, index) => {
      const offset = index - scrollIndex;

      const originalRightFrame = baseRight - index * (frameSpacing / 10);
      const originalRightName = baseRight + 5 - index * (frameSpacing / 10);

      frameElements[index].style.right = `${originalRightFrame + scrollIndex * (frameSpacing / 10)}%`;
      canvasElements[index].style.right = `${originalRightFrame + scrollIndex * (frameSpacing / 10)}%`;
      nameElements[index].style.right = `${originalRightName + scrollIndex * (frameSpacing / 10)}%`;

      if (offset < 0 || offset > 2) {
        frameElements[index].style.opacity = '0';
        canvasElements[index].style.opacity = '0';
        nameElements[index].style.opacity = '0';
      } else {
        frameElements[index].style.opacity = '1';
        canvasElements[index].style.opacity = '1';
        nameElements[index].style.opacity = '1';
      }
    });
  }

  // Initialize visibility
  updateVisibility(0);

  scrollbar.addEventListener('input', () => {
    const scrollIndex = parseFloat(scrollbar.value);
    updateVisibility(scrollIndex);
  });

  // Function to remove menu
  function removeMenu() {
    frameElements.forEach(el => menuFrames.removeChild(el));
    canvasElements.forEach(el => menuFrames.removeChild(el));
    nameElements.forEach(el => menuFrames.removeChild(el));
    if (scrollbar) menuFrames.removeChild(scrollbar);
  }

  return { removeMenu };
}

let currentDecorationsMenu; // global reference

function openDecorationsMenu() {
  MENU_BUTTONS.style.display = 'none';

  // Create the menu and store reference
  currentDecorationsMenu = createDecorationsMenu(decorationImageList);
}

// Example function to close the menu
function closeDecorationsMenu() {
  if (currentDecorationsMenu) {
    currentDecorationsMenu.removeMenu(); // removes all frames, canvases, names, and scrollbar
    currentDecorationsMenu = null;
  }
  MENU_BUTTONS.style.display = 'block';
}


// Example usage:
// const myMenu = createDecorationsMenu(decorationImageList);
// myMenu.removeMenu(); // call this to remove it
