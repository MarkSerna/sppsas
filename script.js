const DIMS = ['AC', 'LU', 'ES', 'PL', 'TE', 'EX', 'TR'];
const MAX = { AC: 10, LU: 10, ES: 6, PL: 10, TE: 9, EX: 5, TR: 6 };

const ITEMS = [
  { id: 1, dim: 'AC', resp: 'Sí' }, { id: 6, dim: 'AC', resp: 'Sí' },
  { id: 8, dim: 'AC', resp: 'Sí' }, { id: 15, dim: 'AC', resp: 'No' },
  { id: 22, dim: 'AC', resp: 'Sí' }, { id: 24, dim: 'AC', resp: 'Sí' },
  { id: 32, dim: 'AC', resp: 'No' }, { id: 42, dim: 'AC', resp: 'Sí' },
  { id: 46, dim: 'AC', resp: 'Sí' }, { id: 52, dim: 'AC', resp: 'Sí' },

  { id: 2, dim: 'LU', resp: 'No' }, { id: 9, dim: 'LU', resp: 'Sí' },
  { id: 16, dim: 'LU', resp: 'No' }, { id: 25, dim: 'LU', resp: 'Sí' },
  { id: 29, dim: 'LU', resp: 'Sí' }, { id: 35, dim: 'LU', resp: 'Sí' },
  { id: 38, dim: 'LU', resp: 'Sí' }, { id: 43, dim: 'LU', resp: 'No' },
  { id: 45, dim: 'LU', resp: 'Sí' }, { id: 47, dim: 'LU', resp: 'Sí' },

  { id: 3, dim: 'ES', resp: 'Sí' }, { id: 11, dim: 'ES', resp: 'Sí' },
  { id: 18, dim: 'ES', resp: 'No' }, { id: 26, dim: 'ES', resp: 'Sí' },
  { id: 33, dim: 'ES', resp: 'Sí' }, { id: 53, dim: 'ES', resp: 'No' },

  { id: 4, dim: 'PL', resp: 'Sí' }, { id: 12, dim: 'PL', resp: 'Sí' },
  { id: 19, dim: 'PL', resp: 'Sí' }, { id: 27, dim: 'PL', resp: 'Sí' },
  { id: 34, dim: 'PL', resp: 'Sí' }, { id: 36, dim: 'PL', resp: 'Sí' },
  { id: 40, dim: 'PL', resp: 'No' }, { id: 44, dim: 'PL', resp: 'Sí' },
  { id: 48, dim: 'PL', resp: 'No' }, { id: 54, dim: 'PL', resp: 'Sí' },

  { id: 5, dim: 'TE', resp: 'Sí' }, { id: 13, dim: 'TE', resp: 'Sí' },
  { id: 17, dim: 'TE', resp: 'No' }, { id: 21, dim: 'TE', resp: 'Sí' },
  { id: 28, dim: 'TE', resp: 'Sí' }, { id: 37, dim: 'TE', resp: 'Sí' },
  { id: 41, dim: 'TE', resp: 'Sí' }, { id: 49, dim: 'TE', resp: 'Sí' },
  { id: 51, dim: 'TE', resp: 'Sí' },

  { id: 7, dim: 'EX', resp: 'Sí' }, { id: 14, dim: 'EX', resp: 'Sí' },
  { id: 23, dim: 'EX', resp: 'Sí' }, { id: 31, dim: 'EX', resp: 'Sí' },
  { id: 55, dim: 'EX', resp: 'No' },

  { id: 10, dim: 'TR', resp: 'Sí' }, { id: 20, dim: 'TR', resp: 'Sí' },
  { id: 30, dim: 'TR', resp: 'Sí' }, { id: 39, dim: 'TR', resp: 'No' },
  { id: 50, dim: 'TR', resp: 'No' }, { id: 56, dim: 'TR', resp: 'Sí' },
];

// X marks
const xSet = new Set();

function td(cls) { const d = document.createElement('td'); if (cls) d.className = cls; return d; }

function build() {
  const tbody = document.getElementById('dataBody');
  tbody.innerHTML = '';
  const byDim = {};
  for (const d of DIMS) byDim[d] = [];
  for (const it of ITEMS) byDim[it.dim].push(it);

  const maxR = Math.max(...DIMS.map(d => byDim[d].length));
  const idx = {}; for (const d of DIMS) idx[d] = 0;

  for (let r = 0; r < maxR; r++) {
    // Separator row
    if (r > 0) {
      const sr = document.createElement('tr'); sr.className = 'sr';
      sr.appendChild(td()); // left label spacer
      for (let d = 0; d < DIMS.length; d++) {
        sr.appendChild(td()); // num spacer
        sr.appendChild(td()); // resp spacer
        sr.appendChild(td('xx')); // chk spacer
        if (d < DIMS.length - 1) sr.appendChild(td()); // gap
      }
      sr.appendChild(td()); // right spacer
      tbody.appendChild(sr);
    }

    // Data row
    const tr = document.createElement('tr'); tr.className = 'dr';
    tr.appendChild(td()); // left label spacer
    for (let d = 0; d < DIMS.length; d++) {
      const it = byDim[DIMS[d]][idx[DIMS[d]]];
      if (it) {
        idx[DIMS[d]]++;
        const isSi = it.resp === 'Sí';
        const n = td('num'); n.textContent = it.id;
        const rsp = td('resp'); rsp.className = 'resp ' + (isSi ? 'si' : 'no'); rsp.textContent = it.resp;
        const xx = td('xx'); const key = 'x' + it.id;
        
        const box = document.createElement('div');
        box.className = 'chk-box';
        if (xSet.has(key)) box.textContent = 'X';
        xx.appendChild(box);
        
        xx.addEventListener('click', () => {
          if (xSet.has(key)) {
            xSet.delete(key);
            box.textContent = '';
          } else {
            xSet.add(key);
            box.textContent = 'X';
          }
          calc();
        });
        
        tr.appendChild(n); tr.appendChild(rsp); tr.appendChild(xx);
      } else {
        tr.appendChild(td('num')); tr.appendChild(td('resp')); tr.appendChild(td('xx'));
      }
      if (d < DIMS.length - 1) tr.appendChild(td());
    }
    tr.appendChild(td()); // right spacer
    tbody.appendChild(tr);
  }
}

function getScores() {
  const s = {};
  for (const d of DIMS) {
    let n = 0;
    for (const it of ITEMS) if (it.dim === d && xSet.has('x' + it.id)) n++;
    s[d] = { score: n, pct: MAX[d] > 0 ? Math.round((n / MAX[d]) * 100) : 0 };
  }
  return s;
}

function draw(sc) {
  const cv = document.getElementById('chart');
  if (!cv) return;
  
  const rect = cv.getBoundingClientRect();
  cv.width = rect.width;
  cv.height = 324;
  
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;

  ctx.clearRect(0, 0, W, H);

  // Draw perimetral orange border around grid (from top y=11.5 to bottom y=311.5)
  ctx.strokeStyle = '#f98f43';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.rect(0.75, 11.5, W - 1.5, 300);
  ctx.stroke();

  // Draw thin gray horizontal grid lines (at 10% steps from 10% to 90%)
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 0.5;
  for (let p = 10; p <= 90; p += 10) {
    const y = 311.5 - (p / 100) * 300;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Draw 50% line as dashed for reference
  ctx.strokeStyle = '#ccc';
  ctx.setLineDash([2, 2]);
  const y50 = 311.5 - 0.5 * 300;
  ctx.beginPath();
  ctx.moveTo(0, y50);
  ctx.lineTo(W, y50);
  ctx.stroke();
  ctx.setLineDash([]);

  // Calculate X coordinates for each dimension based on column grid percentages
  const percents = [0.10852, 0.25254, 0.39655, 0.54057, 0.68458, 0.82860, 0.97262];
  const xs = percents.map(p => p * W);

  // Draw blue profile line connecting points
  ctx.strokeStyle = '#4472c4';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  for (let i = 0; i < DIMS.length; i++) {
    const x = xs[i];
    const pct = sc[DIMS[i]].pct;
    const y = 311.5 - (pct / 100) * 300;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Draw points and values
  for (let i = 0; i < DIMS.length; i++) {
    const x = xs[i];
    const pct = sc[DIMS[i]].pct;
    const y = 311.5 - (pct / 100) * 300;

    // Circle markers (blue border, white center)
    ctx.fillStyle = '#4472c4';
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, 2.0, 0, Math.PI * 2);
    ctx.fill();

    // Value label text above the point
    ctx.fillStyle = '#000';
    ctx.font = 'bold 10px Calibri, Arial, sans-serif';
    ctx.textAlign = 'center';
    const textY = y - 8;
    ctx.fillText(pct + '%', x, textY < 12 ? y + 14 : textY);
  }
}

function calc() {
  const sc = getScores();
  for (const d of DIMS) {
    document.getElementById('pd-' + d).textContent = sc[d].score;
    document.getElementById('pct-' + d).textContent = sc[d].pct + '%';
  }
  draw(sc);
}

document.addEventListener('DOMContentLoaded', () => {
  build();
  calc();
  
  // Sexo buttons toggle
  const btnV = document.getElementById('sexo-v');
  const btnM = document.getElementById('sexo-m');
  if (btnV && btnM) {
    btnV.addEventListener('click', () => {
      btnV.classList.add('selected');
      btnM.classList.remove('selected');
    });
    btnM.addEventListener('click', () => {
      btnM.classList.add('selected');
      btnV.classList.remove('selected');
    });
  }
  
  window.addEventListener('resize', () => {
    draw(getScores());
  });
});
