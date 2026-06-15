(function(){
  var layer=document.getElementById('pl');
  if(!layer)return;
  var G=['♝','♗','♜','♖','♞','♘','♛','♕','♟','♙','♚','♔'];
  var isD=window.innerWidth>700;
  function ri(a,b){return a+Math.floor(Math.random()*(b-a+1));}
  function rf(a,b){return a+Math.random()*(b-a);}
  function spawn(delay){
    var size=isD?ri(90,160):ri(30,52);
    var op=isD?rf(0.22,0.38):rf(0.12,0.22);
    var dur=isD?rf(2200,4500):rf(900,1800);
    var pause=rf(500,1800);
    var total=ri(4,9);
    var done=0;
    var x=rf(0.04,0.90)*window.innerWidth;
    var y=rf(0.04,0.90)*window.innerHeight;
    var el=document.createElement('div');
    el.className='piece';
    el.textContent=G[ri(0,G.length-1)];
    el.style.fontSize=size+'px';
    el.style.left=x+'px';
    el.style.top=y+'px';
    layer.appendChild(el);
    function fadeIn(cb){
      var s=null,d=800;
      function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/d,1);el.style.opacity=p*op;el.style.transform='scale('+(0.5+p*0.5)+')';if(p<1)requestAnimationFrame(step);else cb();}
      requestAnimationFrame(step);
    }
    function fadeOut(cb){
      var s=null,d=800;
      function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/d,1);el.style.opacity=op*(1-p);el.style.transform='scale('+(1-p*0.3)+')';if(p<1)requestAnimationFrame(step);else{el.remove();if(cb)cb();}}
      requestAnimationFrame(step);
    }
    function moveTo(tx,ty,cb){
      var sx=parseFloat(el.style.left),sy=parseFloat(el.style.top),s=null,arc=ri(20,60);
      function step(ts){
        if(!s)s=ts;
        var p=Math.min((ts-s)/dur,1),e=p<0.5?2*p*p:-1+(4-2*p)*p;
        el.style.left=(sx+(tx-sx)*e)+'px';
        el.style.top=(sy+(ty-sy)*e-arc*Math.sin(p*Math.PI))+'px';
        el.style.transform='scale('+(1+Math.sin(p*Math.PI)*0.05)+')';
        el.style.opacity=op;
        if(p<1)requestAnimationFrame(step);else{x=tx;y=ty;cb();}
      }
      requestAnimationFrame(step);
    }
    function doMove(){
      if(done>=total){fadeOut(function(){setTimeout(spawn,rf(200,900));});return;}
      done++;
      var nx=rf(0.04,0.90)*window.innerWidth;
      var ny=rf(0.04,0.90)*window.innerHeight;
      setTimeout(function(){moveTo(nx,ny,function(){setTimeout(doMove,pause);});},60);
    }
    setTimeout(function(){fadeIn(function(){setTimeout(doMove,pause);});},delay);
  }
  var n=isD?10:6;
  for(var i=0;i<n;i++)spawn(i*(isD?450:400));
})();
