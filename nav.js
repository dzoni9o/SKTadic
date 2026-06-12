function toggleMenu(){document.getElementById('mob').classList.toggle('open')}
document.addEventListener('click',function(e){
  var m=document.getElementById('mob');
  if(m&&!m.contains(e.target)&&!e.target.closest('.hamburger'))m.classList.remove('open');
});
