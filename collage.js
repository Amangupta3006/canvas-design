const canvas = document.getElementById("photoCanvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("imageUpload");

const captions = [
  "My Queen", "Our Trip", "Laughs", "Together Always",
  "Your Smile", "Sweet Moments", "Love You", "Forever"
];

upload.addEventListener("change", function () {
  const files = Array.from(this.files).slice(0, 8); // Only first 8 images
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cols = 4;
  const rows = 2;
  const polaroidWidth = 180;
  const polaroidHeight = 220;
  const padding = 20;

  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = padding + col * (polaroidWidth + padding);
        const y = padding + row * (polaroidHeight + padding);

        // Polaroid background
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, polaroidWidth, polaroidHeight);

        // Draw the image
        ctx.drawImage(img, x + 10, y + 10, 160, 160);

        // Draw the caption
        ctx.fillStyle = "black";
        ctx.font = "14px cursive";
        ctx.textAlign = "center";
        ctx.fillText(captions[index], x + polaroidWidth / 2, y + 195);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});
