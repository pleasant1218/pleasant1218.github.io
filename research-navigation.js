(() => {
let opening=false;
for(const entry of document.querySelectorAll('.thesis-entry'))entry.addEventListener('click',event=>{
 if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 event.preventDefault();if(opening)return;opening=true;
 const r=entry.getBoundingClientRect(),clone=entry.cloneNode(true);clone.removeAttribute('href');clone.setAttribute('aria-hidden','true');clone.classList.add('page-zoom-overlay');
 Object.assign(clone.style,{left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:`${r.height}px`,transform:'none'});document.body.append(clone);
 const animation=clone.animate([{transform:'translate(0,0) scale(1,1)'},{transform:`translate(${-r.left}px,${-r.top}px) scale(${innerWidth/r.width},${innerHeight/r.height})`}],{duration:400,easing:'cubic-bezier(.22,.7,.25,1)',fill:'forwards'});
 animation.finished.then(()=>location.assign(entry.href));
});
window.addEventListener('pageshow',()=>{opening=false;document.querySelectorAll('.page-zoom-overlay').forEach(el=>el.remove());});
})();
