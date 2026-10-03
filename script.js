(function(){
  var SYM={'+':'+','-':'−','*':'×','/':'÷'};
  var cur='0',prev=null,op=null,fresh=false,err=null,exprText='';
  var elV=document.getElementById('val'),elE=document.getElementById('expr');

  function clean(n){return String(parseFloat(n.toPrecision(12)))}
  function fmt(s){
    if(/e/i.test(s)){return s.replace('e+','e')}
    var neg=s[0]==='-',t=neg?s.slice(1):s,p=t.split('.');
    p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
    return (neg?'−':'')+p.join('.');
  }
  function calc(a,b,o){
    if(o==='+')return a+b; if(o==='-')return a-b; if(o==='*')return a*b;
    if(b===0){err='Cannot divide by zero';return 0}
    return a/b;
  }
  function render(){
    elE.textContent=exprText;
    elV.className='val';
    if(err){elV.textContent=err;elV.classList.add('err')}
    else{
      var t=fmt(cur);elV.textContent=t;
      if(t.length>13)elV.classList.add('sm');else if(t.length>8)elV.classList.add('md');
    }
    document.querySelectorAll('.op').forEach(function(b){
      b.classList.toggle('on',!!op&&fresh&&b.dataset.k===op);
    });
  }
  function reset(){cur='0';prev=null;op=null;fresh=false;err=null;exprText=''}
  function digit(d){
    if(err)reset();
    if(fresh){cur=d;fresh=false;if(!op)exprText=''}
    else if(cur.replace(/[-.]/g,'').length<12)cur=(cur==='0')?d:cur+d;
  }
  function dot(){
    if(err)reset();
    if(fresh){cur='0.';fresh=false;if(!op)exprText=''}
    else if(cur.indexOf('.')<0)cur+='.';
  }
  function operator(o){
    if(err)return;
    if(op&&!fresh){
      var r=calc(parseFloat(prev),parseFloat(cur),op);
      if(err){render();return}
      prev=clean(r);cur=prev;
    }else if(!op){prev=cur}
    op=o;fresh=true;exprText=fmt(prev)+' '+SYM[o];
  }
  function equals(){
    if(err||!op||fresh)return;
    var a=prev,b=cur,o=op,r=calc(parseFloat(a),parseFloat(b),o);
    exprText=fmt(a)+' '+SYM[o]+' '+fmt(b)+' =';
    if(err){prev=null;op=null;return}
    cur=clean(r);prev=null;op=null;fresh=true;
  }
  function percent(){
    if(err)return;
    cur=clean(parseFloat(cur)/100);
  }
  function neg(){
    if(err)return;
    if(cur!=='0')cur=cur[0]==='-'?cur.slice(1):'-'+cur;
  }
  function back(){
    if(err){reset();return}
    if(fresh)return;
    cur=(cur.length>1&&!(cur.length===2&&cur[0]==='-'))?cur.slice(0,-1):'0';
  }
  function press(k){
    if(/^\d$/.test(k))digit(k);
    else if(k==='.')dot();
    else if(SYM[k])operator(k);
    else if(k==='=')equals();
    else if(k==='%')percent();
    else if(k==='neg')neg();
    else if(k==='back')back();
    else if(k==='AC')reset();
    render();
  }
  document.getElementById('keys').addEventListener('click',function(e){
    var b=e.target.closest('button');if(b)press(b.dataset.k);
  });
  document.addEventListener('keydown',function(e){
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    var k=e.key,map={Enter:'=','=':'=',Backspace:'back',Escape:'AC',Delete:'AC',',':'.'};
    if(map[k])k=map[k];
    var ok=/^\d$/.test(k)||k==='.'||SYM[k]||k==='='||k==='%'||k==='back'||k==='AC';
    if(!ok)return;
    e.preventDefault();
    press(k);
    var btn=document.querySelector('button[data-k="'+(k==='-'?'-':k)+'"]');
    if(btn){btn.classList.add('press');setTimeout(function(){btn.classList.remove('press')},110)}
  });
  render();
})();