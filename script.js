(() => {
'use strict';
const head=document.getElementById('head'),portrait=document.getElementById('portrait'),pupils=[...document.querySelectorAll('.pupil')],button=document.getElementById('motion'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let enabled=!reduced.matches,tx=0,ty=0,x=0,y=0,frame=0;
const clamp=v=>Math.max(-1,Math.min(1,v));
function render(){x+=(tx-x)*.09;y+=(ty-y)*.09;head.style.transform=`translate(${x*9}px,${y*5}px) rotate(${x*4}deg) skewY(${y*.7}deg)`;pupils.forEach(p=>p.style.transform=`translate(${x*8}px,${y*5}px)`);frame=Math.abs(x-tx)+Math.abs(y-ty)>.002?requestAnimationFrame(render):0;}
function aim(a,b){tx=a;ty=b;if(!frame)frame=requestAnimationFrame(render);}
window.addEventListener('pointermove',e=>{if(!enabled||e.pointerType==='touch')return;const r=portrait.getBoundingClientRect();aim(clamp((e.clientX-r.left-r.width*.53)/Math.max(innerWidth*.35,240)),clamp((e.clientY-r.top-r.height*.17)/Math.max(innerHeight*.4,200)));},{passive:true});
document.documentElement.addEventListener('pointerleave',()=>aim(0,0));window.addEventListener('blur',()=>aim(0,0));
function sync(){button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'Motion ON':'Motion OFF';button.setAttribute('aria-label',enabled?'Turn character motion off':'Turn character motion on');document.body.classList.toggle('still',!enabled);if(!enabled)aim(0,0);}
button.addEventListener('click',()=>{enabled=!enabled;sync();});reduced.addEventListener('change',()=>{enabled=!reduced.matches;sync();});sync();
const text=document.getElementById('typewriter'),phrases=['Collecting little discoveries…','A little work, a little wonder.','Always room for a little curiosity!'];let phrase=0,pos=phrases[0].length,deleting=true;
function tick(){if(!enabled||document.hidden){setTimeout(tick,1000);return;}const sentence=phrases[phrase];pos+=deleting?-1:1;text.textContent=sentence.slice(0,pos);let delay=deleting?65:140;if(pos===0){deleting=false;phrase=(phrase+1)%phrases.length;delay=350;}else if(pos===sentence.length&&!deleting){deleting=true;delay=2500;}setTimeout(tick,delay);}setTimeout(tick,3000);
})();

(() => {
  const hero=document.querySelector('.hero'), bed=document.getElementById('dog-bed'), dog=document.getElementById('dog-actor');
  dog.dataset.pose='sleep';
  function placeDog(){
    const h=hero.getBoundingClientRect(),b=bed.getBoundingClientRect();
    const x=b.left-h.left+b.width/2-dog.offsetWidth/2;
    const y=b.top-h.top+b.height*.58-dog.offsetHeight*.96;
    dog.style.transform=`translate(${x}px,${y}px)`;
  }
  const resize=new ResizeObserver(placeDog);resize.observe(hero);resize.observe(bed);placeDog();
})();

// Open the research card with a gentle expansion into its own page.
(() => {
const card=document.querySelector('.card[href="work-research.html"]');if(!card)return;
let opening=false;
card.addEventListener('click',event=>{
 if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 event.preventDefault();if(opening)return;opening=true;
 const r=card.getBoundingClientRect(),clone=card.cloneNode(true);clone.removeAttribute('href');clone.setAttribute('aria-hidden','true');clone.classList.add('page-zoom-overlay');
 Object.assign(clone.style,{left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:`${r.height}px`,transform:'none'});document.body.append(clone);
 const animation=clone.animate([{transform:'translate(0,0) scale(1,1)',opacity:1},{transform:`translate(${-r.left}px,${-r.top}px) scale(${innerWidth/r.width},${innerHeight/r.height})`,opacity:1}],{duration:430,easing:'cubic-bezier(.22,.7,.25,1)',fill:'forwards'});
 animation.finished.then(()=>location.assign(card.href));
});
window.addEventListener('pageshow',()=>{opening=false;document.querySelectorAll('.page-zoom-overlay').forEach(el=>el.remove());});
})();
