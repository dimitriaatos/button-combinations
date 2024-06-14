import { Oscillator, Context, setContext } from 'tone';
import scale from './scale';

const BASE_NOTE = 69
const KEYS = ['a', 's', 'd', 'f']

const body = document.querySelector('body')
const context = new Context({ latencyHint: 'playback' });
setContext(context);

let state = [0, 0, 0, 0]
let prevNoteIndex = -1

const osc = new Oscillator(440, 'square').toDestination()

const play = (keyState) => ({ key }) => {
	const index = KEYS.indexOf(key)
	if (index < 0) return
	state[index] = keyState
	const noteIndex = parseInt(state.join(''), 2)
	if (prevNoteIndex === noteIndex) return
	prevNoteIndex = noteIndex
	// if at least one key is pressed
	if (noteIndex !== 0) {
		const note = noteIndex - 1 + BASE_NOTE
		osc.frequency.value = scale[note]
		osc.start()
	} else osc.stop()
}

body.addEventListener('keydown', play(1))
body.addEventListener('keyup', play(0))

