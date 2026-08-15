const cursor=document.querySelector('.cursor');
window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));

const featured=new Set(['ClosedEYE','SwiftRun','DIMFF','Piestructure']);
const grid=document.getElementById('repoGrid'), status=document.getElementById('repoStatus');

async function repos(){
 try{
  const r=await fetch('https://api.github.com/users/ADevNamedDeLL/repos?per_page=100&sort=updated');
  if(!r.ok)throw Error();
  const data=await r.json();
  status.textContent=data.length+' PUBLIC REPOSITORIES';
  grid.innerHTML=data.filter(x=>!x.fork&&!featured.has(x.name)).map(x=>`
   <a class="repo" href="${x.html_url}" target="_blank" rel="noreferrer">
    <span class="repo-arrow">↗</span>
    <h4>${safe(x.name)}</h4>
    <p>${safe(x.description||'A project from the A Dev Named DeLL archive.')}</p>
    <div class="repo-meta"><span class="lang">${safe(x.language||'PROJECT')}</span><span>${x.stargazers_count} STARS</span><span>${x.forks_count} FORKS</span></div>
   </a>`).join('');
 }catch(e){status.textContent='ARCHIVE OFFLINE';grid.innerHTML='<div class="repo" style="grid-column:1/-1"><h4>GitHub could not be reached.</h4><p>Use the GitHub button above to open the repository archive.</p></div>'}
}
function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
document.getElementById('year').textContent=new Date().getFullYear();
repos();
