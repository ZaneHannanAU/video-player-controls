const VIDEO_OPTS = // video options
{	speed:
	{	min: .1
	,	max: 4
	,	fine: .1
	,	coarse: .25 }
,	volume:
	{	min: 0
	,	max: 2
	,	step: .2 } }
const VIDEO_KEYMAP = e => {
	switch (e.key.toLocaleLowerCase()) {
		case '?':
		case 'h':
			return VIDEO_CONTROLS.help
			break;
		case ' ':
		case 'k':
			return VIDEO_CONTROLS.playback = !VIDEO_CONTROLS.playback
			break;
		case 'm':
			return VIDEO_CONTROLS.mute = !VIDEO_CONTROLS.mute
			break;
		case '-':
		case '<':
			return VIDEO_CONTROLS.speed = VIDEO_CONTROLS.speed <= 1 ? (
				(	VIDEO_CONTROLS.speed - VIDEO_OPTS.speed.coarse
				) >= VIDEO_OPTS.speed.min ? (
					VIDEO_CONTROLS.speed / 2
				) : VIDEO_OPTS.speed.min
			) : VIDEO_CONTROLS.speed - VIDEO_OPTS.speed.coarse
			break;
		case '=':
		case '+':
		case '>':
			return VIDEO_CONTROLS.speed = VIDEO_CONTROLS.speed < 1 ? (
				VIDEO_CONTROLS.speed * 2
			) : (
				VIDEO_CONTROLS.speed + VIDEO_OPTS.speed.coarse
			) < VIDEO_OPTS.speed.max ? (
				VIDEO_CONTROLS.speed + VIDEO_OPTS.speed.coarse
			) : 4
			break;
		case '[':
			return VIDEO_CONTROLS.speed = (
				VIDEO_CONTROLS.speed - VIDEO_OPTS.speed.fine
			) >= VIDEO_OPTS.speed.min ? (
				VIDEO_CONTROLS.speed - VIDEO_OPTS.speed.fine
			) : VIDEO_OPTS.speed.min
			break;
		case ']':
			return VIDEO_CONTROLS.speed = (
				(VIDEO_CONTROLS.speed + VIDEO_OPTS.speed.fine) < VIDEO_OPTS.speed.max
			) ? (
				VIDEO_CONTROLS.speed + VIDEO_OPTS.speed.fine
			) : VIDEO_OPTS.speed.max
			break;
		case 'q':
			if (e.key == 'Q' && e.shiftKey) {
				return window.close()
			} else if (VIDEO_CONTROLS.fullScreen) {
				return VIDEO_CONTROLS.fullScreen = false
			} else {
				return window.confirm("Exit video?") ? window.close() : false;
			}
			break;
		case 'f':
		case 'f11':
			return VIDEO_CONTROLS.fullScreen = !VIDEO_CONTROLS.fullScreen
		case 'a':
			if (e.key == 'A' && e.shiftKey) {
				return VIDEO_CONTROLS.vote = 1
			} else {
				return VIDEO_CONTROLS.vote = (VIDEO_CONTROLS.vote === 1) ? 0 : 1
			}
			break;
		case 'z':
			if (e.key == 'Z' && e.shiftKey) {
				return VIDEO_CONTROLS.vote = -1
			} else {
				return VIDEO_CONTROLS.vote = (VIDEO_CONTROLS.vote === -1) ? 0 : -1
			}
			break;
		default:
			return e.key;
	}
}

const VIDEO_CONTROLS = // helper set & get functions
{	get playback ( ) {return !this.paused}
,	set playback (b) {this.paused = !b}
,	get state ( ) {return {
		playback: this.playback
	,	speed: this.speed
	,	fullscreen: this.fullScreen
	,	muted: this.mute
	,	vote: this.vote
	}}
,	get fullScreen ( ) {return this.fullscreen || false}
,	set fullScreen (b) {this.fullscreen = b}
,	get mute ( ) {return this.muted || false}
,	set mute (b) {this.muted = b}
,	get speed ( ) {return this.playbackRate || 1}
,	set speed (m) {this.playbackRate = m < 4.01 ? m : 4}
,	get vote ( ) {return this.votemod || 0}
,	set vote (n) {this.votemod = n}
}
// window.addEventListener('keydown', VIDEO_KEYMAP)
// For event switch window to your preferred handler.
window.addEventListener('keydown', x => {
	console.log(VIDEO_KEYMAP(x));
})
// testing boilerplate
