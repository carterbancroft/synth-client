/* eslint-disable */

let beat
let bassSynth
let cymbalSynth
let pos
let prev

createGrid()

let isPlaying = false

document.documentElement.addEventListener('mousedown', () => {
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

function createGrid() {
  for (let i = 1; i < 33; i++) {
    const div = document.createElement('div')
    div.setAttribute('id', `container-${i}`)
    div.setAttribute('class', 'container')
    document.querySelector('#grid').appendChild(div)
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
  
  Tone.Transport.bpm.value = 80
  Tone.Transport.start()
}

function song(time) {
  document.querySelector(`#container-${prev}`).style = ``
  document.querySelector(`#container-${prev+16}`).style = ``
  
  if (pos % 4 === 0) {
    bassSynth.triggerAttackRelease('C1', '8n', time)
    document.querySelector(`#container-${pos+1}`).style = `background-color: #89d99e`
  }
  else if (pos % 4 !== 1) {
    cymbalSynth.triggerAttackRelease('32n', time, 0.3)
    document.querySelector(`#container-${pos+17}`).style = `background-color: red`
  }

  prev = pos + 1
  pos = (pos + 1) % 16
}

