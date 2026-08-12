const weddingDate =
new Date(
'2026-08-27T18:00:00+03:00'
).getTime();


/* HERO AFTER OPENING */

const loader =
document.getElementById('loader');

if(loader){

const loaderObserver =
new MutationObserver(() => {

if(
loader.classList.contains(
'curtains-open'
)
){

document.body.classList.add(
'hero-ready',
'invitation-open'
);

}

});

loaderObserver.observe(
loader,
{
attributes:true,
attributeFilter:['class']
}
);

}


/* COUNTDOWN */

function setFlipNumber(
id,
value
){

const element =
document.getElementById(id);

if(!element){
return;
}

const nextValue =
String(value)
.padStart(
2,
'0'
);

if(
!element.dataset.value
){

element.dataset.value =
nextValue;

element.textContent =
nextValue;

return;
}

if(
element.dataset.value ===
nextValue
){
return;
}

element.classList.remove(
'flip'
);

void element.offsetWidth;

element.classList.add(
'flip'
);

setTimeout(() => {

element.textContent =
nextValue;

element.dataset.value =
nextValue;

},220);

setTimeout(() => {

element.classList.remove(
'flip'
);

},520);

}


function updateCountdown(){

const now =
Date.now();

const distance =
weddingDate - now;

if(
distance <= 0
){

setFlipNumber(
'days',
0
);

setFlipNumber(
'hours',
0
);

setFlipNumber(
'minutes',
0
);

setFlipNumber(
'seconds',
0
);

return;
}

const days =
Math.floor(
distance /
(
1000 *
60 *
60 *
24
)
);

const hours =
Math.floor(
(
distance %
(
1000 *
60 *
60 *
24
)
)
/
(
1000 *
60 *
60
)
);

const minutes =
Math.floor(
(
distance %
(
1000 *
60 *
60
)
)
/
(
1000 *
60
)
);

const seconds =
Math.floor(
(
distance %
(
1000 *
60
)
)
/
1000
);

setFlipNumber(
'days',
days
);

setFlipNumber(
'hours',
hours
);

setFlipNumber(
'minutes',
minutes
);

setFlipNumber(
'seconds',
seconds
);

}

updateCountdown();

setInterval(
updateCountdown,
1000
);


/* REVEAL */

const revealElements =
document.querySelectorAll(
'.reveal'
);

if(
'IntersectionObserver'
in window
){

const revealObserver =
new IntersectionObserver(
(entries) => {

entries.forEach(
(entry) => {

if(
entry.isIntersecting
){

entry.target
.classList
.add(
'visible'
);

}

}
);

},
{
threshold:.12
}
);

revealElements.forEach(
(element) => {

revealObserver.observe(
element
);

}
);

}else{

revealElements.forEach(
(element) => {

element.classList.add(
'visible'
);

}
);

}


/* FALLING HEARTS + PETALS */

const particleLayer =
document.getElementById(
'particleLayer'
);

let particleTimer =
null;

let particleSpeed =
900;


function createFallingParticle(){

if(
!particleLayer
){
return;
}

if(
window
.matchMedia(
'(prefers-reduced-motion: reduce)'
)
.matches
){
return;
}

const particle =
document.createElement(
'span'
);

const random =
Math.random();


if(
random < .42
){

particle.className =
'falling-particle heart-particle';

particle.textContent =
Math.random() > .4
? '♥'
: '♡';

particle.style.fontSize =
`${Math.random() * 8 + 9}px`;

}else if(
random < .78
){

particle.className =
'falling-particle petal-particle';

particle.style.width =
`${Math.random() * 5 + 8}px`;

particle.style.height =
`${Math.random() * 7 + 13}px`;

}else{

particle.className =
'falling-particle sparkle-particle';

particle.textContent =
'✦';

particle.style.fontSize =
`${Math.random() * 6 + 8}px`;

}


const duration =
Math.random() *
6 +
9;

const drift =
(
Math.random() *
140
) -
70;

const rotation =
(
Math.random() *
540
) -
270;


particle.style.left =
`${Math.random() * 100}%`;

particle.style.animationDuration =
`${duration}s`;

particle.style.setProperty(
'--drift',
`${drift}px`
);

particle.style.setProperty(
'--rotation',
`${rotation}deg`
);

particleLayer.appendChild(
particle
);

setTimeout(() => {

particle.remove();

},
duration * 1000 + 200
);

}


function restartParticleTimer(
speed = 900
){

particleSpeed =
speed;

if(
particleTimer
){

clearInterval(
particleTimer
);

}

particleTimer =
setInterval(
createFallingParticle,
particleSpeed
);

}

restartParticleTimer();


/* OPENING BURST */

window.createOpeningBurst =
function createOpeningBurst(){

const types =
[
'heart',
'petal',
'sparkle'
];

for(
let i = 0;
i < 22;
i += 1
){

const piece =
document.createElement(
'span'
);

const type =
types[
Math.floor(
Math.random() *
types.length
)
];

piece.classList.add(
'burst-piece',
`burst-${type}`
);


if(
type === 'heart'
){

piece.textContent =
Math.random() > .5
? '♥'
: '♡';

piece.style.fontSize =
`${Math.random() * 10 + 10}px`;

}


if(
type === 'sparkle'
){

piece.textContent =
'✦';

piece.style.fontSize =
`${Math.random() * 8 + 8}px`;

}


const angle =
Math.random() *
Math.PI *
2;

const distance =
Math.random() *
210 +
90;

const x =
Math.cos(angle) *
distance;

const y =
Math.sin(angle) *
distance;


piece.style.setProperty(
'--burst-x',
`${x}px`
);

piece.style.setProperty(
'--burst-y',
`${y}px`
);

piece.style.setProperty(
'--burst-r',
`${Math.random() * 360 - 180}deg`
);

document.body.appendChild(
piece
);

setTimeout(() => {

piece.remove();

},1350);

}

};


/* PARALLAX */

const parallaxItems =
[
...document.querySelectorAll(
'[data-parallax]'
)
];

let parallaxTicking =
false;


function updateParallax(){

const viewportCenter =
window.innerHeight /
2;

parallaxItems.forEach(
(item) => {

const rect =
item.getBoundingClientRect();

const speed =
Number(
item.dataset.parallax ||
.1
);

const distanceFromCenter =
rect.top +
rect.height / 2 -
viewportCenter;

const offset =
distanceFromCenter *
speed *
-.22;

item.style.translate =
`0 ${offset}px`;

}
);

parallaxTicking =
false;

}


window.addEventListener(
'scroll',
() => {

if(
!parallaxTicking
){

requestAnimationFrame(
updateParallax
);

parallaxTicking =
true;

}

},
{
passive:true
}
);

updateParallax();


/* CURSOR */

const cursorGlow =
document.getElementById(
'cursorGlow'
);

const finePointer =
window
.matchMedia(
'(pointer:fine)'
)
.matches;


if(
cursorGlow &&
finePointer
){

window.addEventListener(
'pointermove',
(event) => {

cursorGlow.style.left =
`${event.clientX}px`;

cursorGlow.style.top =
`${event.clientY}px`;

cursorGlow.classList.add(
'active'
);

}
);

window.addEventListener(
'pointerleave',
() => {

cursorGlow.classList.remove(
'active'
);

}
);

}


if(
finePointer
){

window.addEventListener(
'click',
(event) => {

const count =
5;

for(
let i = 0;
i < count;
i += 1
){

const spark =
document.createElement(
'span'
);

spark.className =
'click-spark';

spark.style.left =
`${event.clientX}px`;

spark.style.top =
`${event.clientY}px`;


const angle =
(
Math.PI *
2 *
i
)
/
count
+
Math.random() *
.25;


const distance =
Math.random() *
24 +
14;


spark.style.setProperty(
'--spark-x',
`${Math.cos(angle) * distance}px`
);

spark.style.setProperty(
'--spark-y',
`${Math.sin(angle) * distance}px`
);

document.body.appendChild(
spark
);

setTimeout(() => {

spark.remove();

},700);

}

}
);

}


/* MUSIC */

function setMusicVisualState(
isPlaying
){

const disc =
document.getElementById(
'musicDisc'
);

const tonearm =
document.getElementById(
'tonearm'
);

const equalizer =
document.getElementById(
'equalizer'
);

const musicIcon =
document.getElementById(
'musicIcon'
);

const musicText =
document.getElementById(
'musicText'
);

const musicButton =
document.getElementById(
'musicButton'
);


if(disc){

disc.classList.toggle(
'playing',
isPlaying
);

}

if(tonearm){

tonearm.classList.toggle(
'playing',
isPlaying
);

}

if(equalizer){

equalizer.classList.toggle(
'playing',
isPlaying
);

}

if(musicButton){

musicButton.classList.toggle(
'playing',
isPlaying
);

}

if(musicIcon){

musicIcon.textContent =
isPlaying
? '❚❚'
: '▶';

}

if(musicText){

musicText.textContent =
isPlaying
? 'Pause Song'
: 'Play Song';

}

}


function toggleMusic(){

const audio =
document.getElementById(
'weddingSong'
);

const musicIcon =
document.getElementById(
'musicIcon'
);

const musicText =
document.getElementById(
'musicText'
);

if(
!audio ||
!musicIcon
){
return;
}

if(
!audio.getAttribute(
'src'
)
){

musicIcon.textContent =
'♪';

if(musicText){

musicText.textContent =
'Add Song File Later';

}

return;
}

if(
audio.paused
){

audio.play()

.then(() => {

setMusicVisualState(
true
);

})

.catch(() => {

musicIcon.textContent =
'!';

if(musicText){

musicText.textContent =
'Unable to Play';

}

});

}else{

audio.pause();

setMusicVisualState(
false
);

}

}

window.toggleMusic =
toggleMusic;


const weddingSong =
document.getElementById(
'weddingSong'
);

if(
weddingSong
){

weddingSong.addEventListener(
'ended',
() => {

setMusicVisualState(
false
);

}
);

}




/* RSVP FORM */

let rsvpAttending =
null;

const rsvpSheetUrl =
'https://script.google.com/macros/s/AKfycbxNHpXqe41sXtXd8E7jtfKrGlVdbUFvc6UP3Uyf5akCncBlTrfdjjgEhiqwXmtvdVoK/exec';

function setAttendance(
isYes
){

rsvpAttending =
isYes;

const yesBtn =
document.getElementById(
'rsvpYes'
);

const noBtn =
document.getElementById(
'rsvpNo'
);

if(yesBtn){

yesBtn.classList.toggle(
'selected',
isYes
);

}

if(noBtn){

noBtn.classList.toggle(
'selected',
!isYes
);

}

}

window.setAttendance =
setAttendance;


function submitRsvp(){

const nameInput =
document.getElementById(
'rsvpName'
);

const songInput =
document.getElementById(
'rsvpSong'
);

const submitBtn =
document.querySelector(
'.rsvp-submit-btn'
);

const successMessage =
document.getElementById(
'rsvpSuccess'
);

const name =
nameInput
? nameInput.value.trim()
: '';

const song =
songInput
? songInput.value.trim()
: '';

if(!name){

alert(
'Please enter your name.'
);

return;
}

if(
rsvpAttending === null
){

alert(
'Please let us know if you will attend.'
);

return;
}

if(submitBtn){

submitBtn.disabled =
true;

submitBtn.textContent =
'SENDING...';

}

const payload =
{
name:name,
attending:
rsvpAttending
? 'Yes'
: 'No',
song:song
};

fetch(
rsvpSheetUrl,
{
method:'POST',
mode:'no-cors',
headers:
{
'Content-Type':
'text/plain'
},
body:
JSON.stringify(
payload
)
}
)
.finally(() => {

const formFields =
document.getElementById(
'rsvpForm'
);

if(formFields){

formFields.style.display =
'none';

}

if(successMessage){

successMessage.style.display =
'block';

}

});

}

window.submitRsvp =
submitRsvp;


/* FINALE */

const finalSection =
document.getElementById(
'finalSection'
);

let finaleTriggered =
false;


if(
finalSection &&
'IntersectionObserver'
in window
){

const finalObserver =
new IntersectionObserver(
(entries) => {

entries.forEach(
(entry) => {

if(
entry.isIntersecting
){

restartParticleTimer(
320
);

if(
!finaleTriggered
){

finaleTriggered =
true;

setTimeout(() => {

for(
let i = 0;
i < 16;
i += 1
){

setTimeout(
createFallingParticle,
i * 70
);

}

},250);

}

}else{

restartParticleTimer(
900
);

}

}
);

},
{
threshold:.3
}
);

finalObserver.observe(
finalSection
);

}
