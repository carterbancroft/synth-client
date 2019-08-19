/* eslint-disable */

let beat
let bassSynth
let cymbalSynth
let pos
let prevs

createGrid()

let isPlaying = false

document.documentElement.addEventListener('keyup', e => {
  if (e.keyCode !== 32) return

  if (Tone.context.state !== 'running') {
    Tone.context.resume()
    setup()
  }

  if (!isPlaying)
    beat.start(0)
  else
    beat.stop()

  isPlaying = !isPlaying
})

document.querySelector('input').addEventListener('keyup', e => {
  if (e.keyCode !== 13) return

  const bpm = document.querySelector('input').value

  Tone.Transport.bpm.value = parseInt(bpm)
})

function createGrid() {
  const rows = 2
  const columns = 16

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const div = document.createElement('div')
      div.setAttribute('class', 'container')
      div.setAttribute('row', r)
      div.setAttribute('column', c)

      div.addEventListener('click', () => {
        if (div.className.includes('enabled'))
          div.setAttribute('class', 'container')
        else
          div.setAttribute('class', 'container enabled')
      })

      document.querySelector('#grid').appendChild(div)
    }
  }
}

function setup() {
  pos = 0
  prev = 1

  bassSynth = new Tone.MembraneSynth().toMaster()
  cymbalSynth = new Tone.MetalSynth({
    frequency: 250,
    envelope: {
      attack: 0.001,
      decay: 0.1,
      releae: 0.01,
    },
    harmonicity: 3.1,
    modulationIndex: 16,
    resonance: 4000,
    octaves: 1.5,
  }).toMaster()
  
  beat = new Tone.Loop(song, '16n')

  const bpm = document.querySelector('input').value
  
  Tone.Transport.bpm.value = parseInt(bpm)
  Tone.Transport.start()
}

function song(time) {
  if (prevs) {
    prevs.forEach(d => d.style = ``)
  }

  const currentDivs = document.querySelectorAll(`div[column='${pos}']`)

  currentDivs.forEach(d => {
    if (d.className.includes('enabled')) {
      if (d.getAttribute('row') === '0')
        bassSynth.triggerAttackRelease('C1', '8n', time)
      else
        cymbalSynth.triggerAttackRelease('32n', time, 0.3)

      d.style = 'background-color: #ff00ff; border-color: black;'
    }
    else {
      d.style = 'border-color: black;'
    }
  })

  prevs = currentDivs

  pos = (pos + 1) % 16
}

