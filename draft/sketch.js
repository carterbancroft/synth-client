/* eslint-disable */

let beat
let bassSynth
let cymbalSynth
let pos
let prev

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

  /*for (let i = 1; i < 17; i++) {
    const div = document.createElement('div')
    div.setAttribute('id', `container-${i}`)
    div.setAttribute('class', 'container')

    div.addEventListener('click', () => {
      if (div.className.includes('enabled'))
        div.setAttribute('class', 'container')
      else
        div.setAttribute('class', 'container enabled')
    })

    document.querySelector('#grid').appendChild(div)
  }*/
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
  prev.style = ``
  const currentDiv = document.querySelector(`#container-${pos+1}`)
  
  if (currentDiv.className.includes('enabled')) {
    bassSynth.triggerAttackRelease('C1', '8n', time)
    currentDiv.style = `background-color: #b4f2c4`
  }

  prev = currentDiv
  pos = (pos + 1) % 16
}

