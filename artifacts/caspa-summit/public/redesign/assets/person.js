// Click a speaker -> profile dialog (photo, title, short bio, outside links). Needs data.js (ALL, byName, B) and bios.js (BIOS).
(function(){
 const d=document.createElement('dialog');d.id='dlg-person';d.className='dlg pdlg';
 d.innerHTML='<div class="pf"><button type="button" class="x" data-close aria-label="Close">×</button><div class="pimg"></div><div class="pbody"><h3></h3><div class="prole"></div><p class="pbio"></p><div class="plinks"></div></div></div>';
 document.body.appendChild(d);
 d.addEventListener('click',e=>{if(e.target===d||e.target.closest('[data-close]'))d.close()});
 function open(name){
  const p=byName(name); if(!p)return;
  const b=(window.BIOS||{})[name]||{};
  const role=[p[1],p[2]].filter(Boolean).join(p[2]&&p[2].includes(',')?' · ':', ');
  d.querySelector('h3').textContent=name;
  d.querySelector('.prole').textContent=role;
  const bio=d.querySelector('.pbio'); bio.textContent=b.bio||''; bio.style.display=b.bio?'':'none';
  const ini=name.split(' ').map(w=>w[0]).join('').slice(0,2);
  const img=d.querySelector('.pimg'); img.innerHTML='<img src="'+B+p[3]+'" alt="'+name+'" onerror="this.outerHTML=\'<i class=ini>'+ini+'</i>\'">';
  const L=d.querySelector('.plinks'); L.innerHTML='';
  (b.links||[]).forEach(([label,url])=>{const a=document.createElement('a');a.className='btn line';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label+' ↗';L.appendChild(a)});
  d.showModal();
 }
 document.addEventListener('click',e=>{const t=e.target.closest('[data-name]'); if(t&&!e.target.closest('a')){open(t.dataset.name)}});
 document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[data-name]')){e.preventDefault();open(e.target.dataset.name)}});
})();
