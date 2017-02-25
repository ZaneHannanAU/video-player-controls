const KEYLOG = e => {
return{
	char: e.char
,	key: e.key
,	code: e.charCode
,	location: e.location
,	locale: e.locale
,	rept: e.repeat
,	detail: e.detail
,	ctrl: e.ctrlKey
,	shft: e.shiftKey
,	meta: e.metaKey
,	alt: e.altKey
}}
const CONSOLE_KEYLOG = e => console.log(KEYLOG(e))
window.addEventListener('keydown', CONSOLE_KEYLOG)
