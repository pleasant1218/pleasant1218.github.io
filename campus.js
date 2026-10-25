(() => {
const details=document.querySelector('.all-honors');
if(details)details.addEventListener('toggle',()=>{details.querySelector('summary>span').textContent=details.open?'Show selected honors':'View all honors';});
})();
