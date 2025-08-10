const canvas = document.getElementById('oscilloscope');
const ctx = canvas.getContext('2d');

const waveformSelect = document.getElementById('waveform');
const freqSlider = document.getElementById('frequency');
const ampSlider = document.getElementById('amplitude');
const noiseSlider = document.getElementById('noise');
const toggleBtn = document.getElementById('toggle');

const freqVal = document.getElementById('freqVal');
const ampVal = document.getElementById('ampVal');
const noiseVal = document.getElementById('noiseVal');

let waveform = 'sine';
let frequency = 5;
let amplitude = 1;
let noiseLevel = 0;
let playing = true;
let time = 0;

waveformSelect.onchange = e => waveform = e.target.value;
freqSlider.oninput = e => {
  frequency = +e.target.value;
  freqVal.textContent = frequency;
};
ampSlider.oninput = e => {
  amplitude = +e.target.value;
  ampVal.textContent = amplitude;
};
noiseSlider.oninput = e => {
  noiseLevel = +e.target.value;
  noiseVal.textContent = noiseLevel;
};

toggleBtn.onclick = () => {
  playing = !playing;
  toggleBtn.textContent = playing ? 'Pause' : 'Play';
};

function drawWave() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#00ffcc';
  ctx.beginPath();

  for (let x = 0; x < canvas.width; x++) {
    const t = (time + x) * frequency * 2 * Math.PI / canvas.width;
    let y;
    switch (waveform) {
      case 'sine':
        y = Math.sin(t);
        break;
      case 'square':
        y = Math.sign(Math.sin(t));
        break;
      case 'triangle':
        y = 2 * Math.abs(2 * ((t / (2 * Math.PI)) % 1) - 1) - 1;
        break;
    }
    y *= amplitude;
    y += (Math.random() * 2 - 1) * noiseLevel;
    const posY = canvas.height / 2 - y * canvas.height / 3;
    if (x === 0) ctx.moveTo(x, posY);
    else ctx.lineTo(x, posY);
  }
  ctx.stroke();
}

function animate() {
  if (playing) {
    drawWave();
    time += 1;
  }
  requestAnimationFrame(animate);
}

animate();