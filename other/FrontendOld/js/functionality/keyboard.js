let mapClicks = () => {
  // piano show/hide/select button click
  let drums = document.getElementById('drums-container');
  let melody = document.getElementById('melody-container');
  let keyboard = document.getElementById('keyboard-container');
  document.getElementById('keyboard-select').addEventListener('click', (e) => {
    keyboard.style.display = 'block';
    drums.style.display = 'none';
    melody.style.display = 'none';
  })
}

module.exports = {
  mapClicks: mapClicks
}