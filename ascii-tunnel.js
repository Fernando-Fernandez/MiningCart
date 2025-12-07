// resolution: characters not pixels
const COLS = 120;
const ROWS = 40;

// create ASCII buffer
let buffer = Array.from({ length: ROWS }, () =>
  Array(COLS).fill(" ")
);

// ASCII brightness ramp
const RAMP = " .:-=+*#%@"; // darkest -> brightest

// main ascii output node
const screen = document.getElementById("screen");

// clear buffer each frame
function clearBuffer() {
  for (let y = 0; y < ROWS; y++) {
    buffer[y].fill(" ");
  }
}

// draw a projected block as a character cell
function drawCharAt(x, y, brightness) {
  const cx = x | 0;
  const cy = y | 0;
  if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) return;

  const idx = (brightness / 255 * (RAMP.length - 1)) | 0;
  const ch = RAMP[idx];
  buffer[cy][cx] = ch;
}

// call instead of fillRect
function drawBlockASCII(xScreen, yScreen, size, L) {
  const cx = (xScreen / size) | 0;
  const cy = (yScreen / size) | 0;
  drawCharAt(cx, cy, L);
}

// your existing loop calls this per segment/block
// replacing fillRect(...)
function renderBlock(x, y, w, h, L) {
  // collapse block area into a single char cell
  const size = 8; // virtual "pixel" -> char mapping
  drawBlockASCII(x, y, size, L);
}

// flush text buffer to DOM
function flush() {
  let output = "";
  for (let y = 0; y < ROWS; y++) {
    output += buffer[y].join("") + "\n";
  }
  screen.textContent = output;
}

// The game loop should run:
// clearBuffer()
// loop tunnel blocks: renderBlock(...)
// flush()

function loop() {
  clearBuffer();

  // ----- your existing update logic -----
  if (cart + HORIZON_STEPS > lastGen - 200)
    generate(cart + HORIZON_STEPS);

  const seg = segments[cart % HORIZON_STEPS];
  cartF += 4 + seg.y/30000;
  cart = cartF|0;
  // -------------------------------------

  // ----- rendering each segment -----
  for (let i = lastGen - 1; i >= cart; i--) {
    drawSegment(i); // uses ASCII renderBlock() inside
  }

  flush(); // write characters to <pre>
  requestAnimationFrame(loop);
}

loop();

// function loop() {
//   clearBuffer();
//   updateTunnel(); // your existing simulation + projection
//   flush();
//   requestAnimationFrame(loop);
// }

// loop();
