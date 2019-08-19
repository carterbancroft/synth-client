/* eslint-disable */

let beat
let bassSynth
let cymbalSynth
let pos
let prev

document.documentElement.addEventListener('mousedown', () => {
  mouse_IsDown = true
  if (Tone.context.state !== 'running') {
    Tone.context.resume()
    setup()
  }
})

function setup() {
  console.log('in setup')
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
  
  Tone.Transport.bpm.value = 120
  Tone.Transport.start()

  beat.start(0)
}

function song(time) {
  document.querySelector(`#container-${prev}`).style = ``
  
  if (pos % 4 === 0) {
    bassSynth.triggerAttackRelease('C1', '8n', time)
    document.querySelector(`#container-${pos+1}`).style = `background-color: #89d99e`
  }
  else if (pos % 4 !== 1) {
    cymbalSynth.triggerAttackRelease('32n', time, 0.3)
    document.querySelector(`#container-${pos+1}`).style = `background-color: red`
  }

  prev = pos + 1
  pos = (pos + 1) % 16
}

