const attributes = {
  'ATR': { name: 'Atrape', value: 85 },
  'J.AE': { name: 'Juego Aereo', value: 78 },
  'VOZ': { name: 'Voz de Mando', value: 82 },
  'CAI': { name: 'Caídas', value: 88 },
  'J.PIE': { name: 'Juego de pies', value: 77 }
};

function openModal(attr) {
  const data = attributes[attr];
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal-title').textContent = `${attr}: ${data.name}`;
  document.getElementById('modal-value').textContent = `${data.value} / 100`;
  document.getElementById('modal-bar').style.width = data.value + '%';
  document.getElementById('modal-msg').textContent = `+${100 - data.value} puntos necesarios para subir de nivel`;
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Radar chart
const ctx = document.getElementById('radarChart').getContext('2d');
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: Object.keys(attributes),
    datasets: [{
      label: 'Attributes',
      data: Object.values(attributes).map(a => a.value),
      backgroundColor: 'rgba(249, 115, 22, 0.4)',
      borderColor: '#f39c1f',
      borderWidth: 3,
      pointBackgroundColor: '#f97316'
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        angleLines: { color: '#374151' },
        grid: { color: '#374151' },
        pointLabels: {
          color: '#E5E7EB',
          font: { size: 13 }
        },
        ticks: { display: false },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  }
});

