(function () {
  const canvas = document.getElementById("gol");
  const ctx = canvas.getContext("2d");
  const CELL = 12;
  const INTERVAL = 120;
  let cols, rows, grid, next;
  let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const cellColor = () =>
    dark ? "rgba(232,67,26,0.18)" : "rgba(181,45,10,0.13)";
  const bgColor = () => (dark ? "#0d0d0d" : "#f5f4f0");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(canvas.width / CELL);
    rows = Math.ceil(canvas.height / CELL);
    grid = newGrid(true);
    next = newGrid(false);
  }
  function newGrid(random) {
    return Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () =>
        random ? (Math.random() < 0.28 ? 1 : 0) : 0,
      ),
    );
  }
  function step() {
    for (let x = 0; x < cols; x++)
      for (let y = 0; y < rows; y++) {
        let n = 0;
        for (let dx = -1; dx <= 1; dx++)
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            n += grid[(x + dx + cols) % cols][(y + dy + rows) % rows];
          }
        const alive = grid[x][y];
        next[x][y] =
          (alive && (n === 2 || n === 3)) || (!alive && n === 3) ? 1 : 0;
      }
    [grid, next] = [next, grid];
  }
  function draw() {
    ctx.fillStyle = bgColor();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = cellColor();
    for (let x = 0; x < cols; x++)
      for (let y = 0; y < rows; y++)
        if (grid[x][y])
          ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
  }

  resize();
  window.addEventListener("resize", resize);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      dark = e.matches;
    });
  setInterval(() => {
    step();
    draw();
  }, INTERVAL);
  draw();
})();
