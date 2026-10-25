(() => {
const dialog=document.getElementById('figure-dialog'), image=document.getElementById('figure-full'), title=document.getElementById('figure-dialog-title');
for(const button of document.querySelectorAll('.figure-button'))button.addEventListener('click',()=>{image.src=button.dataset.source;title.textContent=button.dataset.title;dialog.showModal();});
document.getElementById('close-figure').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
