import Tone from 'tone'

const instruments = [
  {
    id: 0,
    name: 'Bass',
    config: {
      synth: Tone.MembraneSynth,
      attackRelease: {
        note: 'C1',
        duration: '8n',
      },
      key: 0,
    },
  },
  {
    id: 1,
    name: 'High Hat',
    config: {
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
      key: 1,
    },
  }
]

export default instruments
