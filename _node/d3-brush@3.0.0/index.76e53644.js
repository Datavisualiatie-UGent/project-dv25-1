import{dispatch as At}from"../d3-dispatch@3.0.1/index.be49ca5f.js";import{dragDisable as Et,dragEnable as Kt}from"../d3-drag@3.0.0/index.d3ae5f0f.js";import{interpolate as Tt}from"../d3-interpolate@3.0.1/index.7ed7c7fe.js";import{select as H,pointer as pt}from"../d3-selection@3.0.0/index.13204b25.js";import{interrupt as mt}from"../d3-transition@3.0.1/index.d140d658.js";var et=t=>()=>t;function Vt(t,{sourceEvent:k,target:q,selection:G,mode:P,dispatch:j}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:k,enumerable:!0,configurable:!0},target:{value:q,enumerable:!0,configurable:!0},selection:{value:G,enumerable:!0,configurable:!0},mode:{value:P,enumerable:!0,configurable:!0},_:{value:j}})}function Pt(t){t.stopImmediatePropagation()}function nt(t){t.preventDefault(),t.stopImmediatePropagation()}var dt={name:"drag"},rt={name:"space"},N={name:"handle"},O={name:"center"};const{abs:bt,max:_,min:x}=Math;function vt(t){return[+t[0],+t[1]]}function ut(t){return[vt(t[0]),vt(t[1])]}var W={name:"x",handles:["w","e"].map(Q),input:function(t,k){return t==null?null:[[+t[0],k[0][1]],[+t[1],k[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},$={name:"y",handles:["n","s"].map(Q),input:function(t,k){return t==null?null:[[k[0][0],+t[0]],[k[1][0],+t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},St={name:"xy",handles:["n","w","e","s","nw","ne","sw","se"].map(Q),input:function(t){return t==null?null:ut(t)},output:function(t){return t}},V={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},yt={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},gt={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},Ct={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},It={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1};function Q(t){return{type:t}}function Xt(t){return!t.ctrlKey&&!t.button}function jt(){var t=this.ownerSVGElement||this;return t.hasAttribute("viewBox")?(t=t.viewBox.baseVal,[[t.x,t.y],[t.x+t.width,t.y+t.height]]):[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function Bt(){return navigator.maxTouchPoints||"ontouchstart"in this}function st(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function Dt(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function Mt(t){var k=t.__brush;return k?k.dim.output(k.selection):null}function Nt(){return at(W)}function Ot(){return at($)}function qt(){return at(St)}function at(t){var k=jt,q=Xt,G=Bt,P=!0,j=At("start","brush","end"),K=6,J;function p(e){var n=e.property("__brush",xt).selectAll(".overlay").data([Q("overlay")]);n.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",V.overlay).merge(n).each(function(){var r=st(this).extent;H(this).attr("x",r[0][0]).attr("y",r[0][1]).attr("width",r[1][0]-r[0][0]).attr("height",r[1][1]-r[0][1])}),e.selectAll(".selection").data([Q("selection")]).enter().append("rect").attr("class","selection").attr("cursor",V.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var s=e.selectAll(".handle").data(t.handles,function(r){return r.type});s.exit().remove(),s.enter().append("rect").attr("class",function(r){return"handle handle--"+r.type}).attr("cursor",function(r){return V[r.type]}),e.each(M).attr("fill","none").attr("pointer-events","all").on("mousedown.brush",it).filter(G).on("touchstart.brush",it).on("touchmove.brush",wt).on("touchend.brush touchcancel.brush",_t).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}p.move=function(e,n,s){e.tween?e.on("start.brush",function(r){B(this,arguments).beforestart().start(r)}).on("interrupt.brush end.brush",function(r){B(this,arguments).end(r)}).tween("brush",function(){var r=this,a=r.__brush,o=B(r,arguments),z=a.selection,T=t.input(typeof n=="function"?n.apply(this,arguments):n,a.extent),l=Tt(z,T);function E(i){a.selection=i===1&&T===null?null:l(i),M.call(r),o.brush()}return z!==null&&T!==null?E:E(1)}):e.each(function(){var r=this,a=arguments,o=r.__brush,z=t.input(typeof n=="function"?n.apply(r,a):n,o.extent),T=B(r,a).beforestart();mt(r),o.selection=z===null?null:z,M.call(r),T.start(s).brush(s).end(s)})},p.clear=function(e,n){p.move(e,null,n)};function M(){var e=H(this),n=st(this).selection;n?(e.selectAll(".selection").style("display",null).attr("x",n[0][0]).attr("y",n[0][1]).attr("width",n[1][0]-n[0][0]).attr("height",n[1][1]-n[0][1]),e.selectAll(".handle").style("display",null).attr("x",function(s){return s.type[s.type.length-1]==="e"?n[1][0]-K/2:n[0][0]-K/2}).attr("y",function(s){return s.type[0]==="s"?n[1][1]-K/2:n[0][1]-K/2}).attr("width",function(s){return s.type==="n"||s.type==="s"?n[1][0]-n[0][0]+K:K}).attr("height",function(s){return s.type==="e"||s.type==="w"?n[1][1]-n[0][1]+K:K})):e.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function B(e,n,s){var r=e.__brush.emitter;return r&&(!s||!r.clean)?r:new ot(e,n,s)}function ot(e,n,s){this.that=e,this.args=n,this.state=e.__brush,this.active=0,this.clean=s}ot.prototype={beforestart:function(){return++this.active===1&&(this.state.emitter=this,this.starting=!0),this},start:function(e,n){return this.starting?(this.starting=!1,this.emit("start",e,n)):this.emit("brush",e),this},brush:function(e,n){return this.emit("brush",e,n),this},end:function(e,n){return--this.active===0&&(delete this.state.emitter,this.emit("end",e,n)),this},emit:function(e,n,s){var r=H(this.that).datum();j.call(e,this.that,new Vt(e,{sourceEvent:n,target:p,selection:t.output(this.state.selection),mode:s,dispatch:j}),r)}};function it(e){if(J&&!e.touches||!q.apply(this,arguments))return;var n=this,s=e.target.__data__.type,r=(P&&e.metaKey?s="overlay":s)==="selection"?dt:P&&e.altKey?O:N,a=t===$?null:Ct[s],o=t===W?null:It[s],z=st(n),T=z.extent,l=z.selection,E=T[0][0],i,m,S=T[0][1],d,b,C=T[1][0],v,y,I=T[1][1],g,w,c=0,h=0,tt,R=a&&o&&P&&e.shiftKey,U,Z,A=Array.from(e.touches||[e],u=>{const f=u.identifier;return u=pt(u,n),u.point0=u.slice(),u.identifier=f,u});mt(n);var L=B(n,arguments,!0).beforestart();if(s==="overlay"){l&&(tt=!0);const u=[A[0],A[1]||A[0]];z.selection=l=[[i=t===$?E:x(u[0][0],u[1][0]),d=t===W?S:x(u[0][1],u[1][1])],[v=t===$?C:_(u[0][0],u[1][0]),g=t===W?I:_(u[0][1],u[1][1])]],A.length>1&&D(e)}else i=l[0][0],d=l[0][1],v=l[1][0],g=l[1][1];m=i,b=d,y=v,w=g;var lt=H(n).attr("pointer-events","none"),Y=lt.selectAll(".overlay").attr("cursor",V[s]);if(e.touches)L.moved=ht,L.ended=ft;else{var ct=H(e.view).on("mousemove.brush",ht,!0).on("mouseup.brush",ft,!0);P&&ct.on("keydown.brush",kt,!0).on("keyup.brush",zt,!0),Et(e.view)}M.call(n),L.start(e,r.name);function ht(u){for(const f of u.changedTouches||[u])for(const F of A)F.identifier===f.identifier&&(F.cur=pt(f,n));if(R&&!U&&!Z&&A.length===1){const f=A[0];bt(f.cur[0]-f[0])>bt(f.cur[1]-f[1])?Z=!0:U=!0}for(const f of A)f.cur&&(f[0]=f.cur[0],f[1]=f.cur[1]);tt=!0,nt(u),D(u)}function D(u){const f=A[0],F=f.point0;var X;switch(c=f[0]-F[0],h=f[1]-F[1],r){case rt:case dt:{a&&(c=_(E-i,x(C-v,c)),m=i+c,y=v+c),o&&(h=_(S-d,x(I-g,h)),b=d+h,w=g+h);break}case N:{A[1]?(a&&(m=_(E,x(C,A[0][0])),y=_(E,x(C,A[1][0])),a=1),o&&(b=_(S,x(I,A[0][1])),w=_(S,x(I,A[1][1])),o=1)):(a<0?(c=_(E-i,x(C-i,c)),m=i+c,y=v):a>0&&(c=_(E-v,x(C-v,c)),m=i,y=v+c),o<0?(h=_(S-d,x(I-d,h)),b=d+h,w=g):o>0&&(h=_(S-g,x(I-g,h)),b=d,w=g+h));break}case O:{a&&(m=_(E,x(C,i-c*a)),y=_(E,x(C,v+c*a))),o&&(b=_(S,x(I,d-h*o)),w=_(S,x(I,g+h*o)));break}}y<m&&(a*=-1,X=i,i=v,v=X,X=m,m=y,y=X,s in yt&&Y.attr("cursor",V[s=yt[s]])),w<b&&(o*=-1,X=d,d=g,g=X,X=b,b=w,w=X,s in gt&&Y.attr("cursor",V[s=gt[s]])),z.selection&&(l=z.selection),U&&(m=l[0][0],y=l[1][0]),Z&&(b=l[0][1],w=l[1][1]),(l[0][0]!==m||l[0][1]!==b||l[1][0]!==y||l[1][1]!==w)&&(z.selection=[[m,b],[y,w]],M.call(n),L.brush(u,r.name))}function ft(u){if(Pt(u),u.touches){if(u.touches.length)return;J&&clearTimeout(J),J=setTimeout(function(){J=null},500)}else Kt(u.view,tt),ct.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);lt.attr("pointer-events","all"),Y.attr("cursor",V.overlay),z.selection&&(l=z.selection),Dt(l)&&(z.selection=null,M.call(n)),L.end(u,r.name)}function kt(u){switch(u.keyCode){case 16:{R=a&&o;break}case 18:{r===N&&(a&&(v=y-c*a,i=m+c*a),o&&(g=w-h*o,d=b+h*o),r=O,D(u));break}case 32:{(r===N||r===O)&&(a<0?v=y-c:a>0&&(i=m-c),o<0?g=w-h:o>0&&(d=b-h),r=rt,Y.attr("cursor",V.selection),D(u));break}default:return}nt(u)}function zt(u){switch(u.keyCode){case 16:{R&&(U=Z=R=!1,D(u));break}case 18:{r===O&&(a<0?v=y:a>0&&(i=m),o<0?g=w:o>0&&(d=b),r=N,D(u));break}case 32:{r===rt&&(u.altKey?(a&&(v=y-c*a,i=m+c*a),o&&(g=w-h*o,d=b+h*o),r=O):(a<0?v=y:a>0&&(i=m),o<0?g=w:o>0&&(d=b),r=N),Y.attr("cursor",V[s]),D(u));break}default:return}nt(u)}}function wt(e){B(this,arguments).moved(e)}function _t(e){B(this,arguments).ended(e)}function xt(){var e=this.__brush||{selection:null};return e.extent=ut(k.apply(this,arguments)),e.dim=t,e}return p.extent=function(e){return arguments.length?(k=typeof e=="function"?e:et(ut(e)),p):k},p.filter=function(e){return arguments.length?(q=typeof e=="function"?e:et(!!e),p):q},p.touchable=function(e){return arguments.length?(G=typeof e=="function"?e:et(!!e),p):G},p.handleSize=function(e){return arguments.length?(K=+e,p):K},p.keyModifiers=function(e){return arguments.length?(P=!!e,p):P},p.on=function(){var e=j.on.apply(j,arguments);return e===j?p:e},p}export{qt as brush,Mt as brushSelection,Nt as brushX,Ot as brushY};
