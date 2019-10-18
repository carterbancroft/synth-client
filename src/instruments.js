import Tone from 'tone'

const instruments = [
  {
    id: 0,
    name: 'Bass',
    config: {
      key: 0,
      synth: Tone.MembraneSynth,
      attackRelease: {
        note: 'C1',
        duration: '8n',
      },
    },
  },
  {
    id: 1,
    name: 'High Hat',
    config: {
      key: 1,
      synth: Tone.MetalSynth,
      synthOptions: {
        frequency: 250,
        envelope: {
          attack: 0.001,
          decay: 0.1,
          release: 0.01,
        },
        harmonicity: 3.1,
        modulationIndex: 16,
        resonance: 4000,
        octaves: 1.5,
      },
      attackRelease: {
        duration: '32n',
        velocity: 0.3,
      },
    },
  },
  {
    id: 2,
    name: 'Snare',
    config: {
      key: 2,
      synth: Tone.NoiseSynth,
      synthOptions: {
        noise: {
          type: "brown"
        },
        envelope : {
          attack : 0.005,
          decay : 0.1,
          sustain : 0.05
        }
      },
      attackRelease: {
        duration: '8n',
      },
    },
  }
]

export default instruments
