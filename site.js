document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.nav-links');

  if(btn&&nav){
    const setOpen=(open)=>{
      nav.classList.toggle('open',open);
      btn.setAttribute('aria-expanded',open?'true':'false');
      btn.setAttribute('aria-label',open?'關閉選單':'開啟選單');
      btn.textContent=open?'✕':'☰';
    };

    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      setOpen(!nav.classList.contains('open'));
    });

    nav.addEventListener('click',(e)=>{
      if(e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click',(e)=>{
      if(nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)){
        setOpen(false);
      }
    });

    document.addEventListener('keydown',(e)=>{
      if(e.key==='Escape') setOpen(false);
    });
  }

  document.querySelectorAll('.comparison').forEach(slider=>{
    const before=slider.querySelector('.before');
    const handle=slider.querySelector('.compare-handle');
    if(!before||!handle)return;
    let dragging=false;
    const move=x=>{
      const r=slider.getBoundingClientRect();
      let p=((x-r.left)/r.width)*100;
      p=Math.max(0,Math.min(100,p));
      handle.style.left=`calc(${p}% - 2px)`;
      before.style.clipPath=`inset(0 ${100-p}% 0 0)`;
    };
    slider.addEventListener('pointerdown',e=>{
      dragging=true;
      slider.setPointerCapture(e.pointerId);
      move(e.clientX);
    });
    slider.addEventListener('pointermove',e=>{if(dragging)move(e.clientX)});
    slider.addEventListener('pointerup',()=>dragging=false);
    slider.addEventListener('pointercancel',()=>dragging=false);
  });
});
