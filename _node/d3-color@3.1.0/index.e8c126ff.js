function m(t,i,r){t.prototype=i.prototype=r,r.constructor=t}function x(t,i){var r=Object.create(t.prototype);for(var n in i)r[n]=i[n];return r}function b(){}var d=.7,$=1/d,N="\\s*([+-]?\\d+)\\s*",M="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",c="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",bt=/^#([0-9a-f]{3,8})$/,dt=new RegExp(`^rgb\\(${N},${N},${N}\\)$`),ft=new RegExp(`^rgb\\(${c},${c},${c}\\)$`),wt=new RegExp(`^rgba\\(${N},${N},${N},${M}\\)$`),yt=new RegExp(`^rgba\\(${c},${c},${c},${M}\\)$`),mt=new RegExp(`^hsl\\(${M},${c},${c}\\)$`),$t=new RegExp(`^hsla\\(${M},${c},${c},${M}\\)$`),L={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};m(b,q,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:F,formatHex:F,formatHex8:Nt,formatHsl:kt,formatRgb:G,toString:G});function F(){return this.rgb().formatHex()}function Nt(){return this.rgb().formatHex8()}function kt(){return Y(this).formatHsl()}function G(){return this.rgb().formatRgb()}function q(t){var i,r;return t=(t+"").trim().toLowerCase(),(i=bt.exec(t))?(r=i[1].length,i=parseInt(i[1],16),r===6?J(i):r===3?new a(i>>8&15|i>>4&240,i>>4&15|i&240,(i&15)<<4|i&15,1):r===8?H(i>>24&255,i>>16&255,i>>8&255,(i&255)/255):r===4?H(i>>12&15|i>>8&240,i>>8&15|i>>4&240,i>>4&15|i&240,((i&15)<<4|i&15)/255):null):(i=dt.exec(t))?new a(i[1],i[2],i[3],1):(i=ft.exec(t))?new a(i[1]*255/100,i[2]*255/100,i[3]*255/100,1):(i=wt.exec(t))?H(i[1],i[2],i[3],i[4]):(i=yt.exec(t))?H(i[1]*255/100,i[2]*255/100,i[3]*255/100,i[4]):(i=mt.exec(t))?X(i[1],i[2]/100,i[3]/100,1):(i=$t.exec(t))?X(i[1],i[2]/100,i[3]/100,i[4]):L.hasOwnProperty(t)?J(L[t]):t==="transparent"?new a(NaN,NaN,NaN,0):null}function J(t){return new a(t>>16&255,t>>8&255,t&255,1)}function H(t,i,r,n){return n<=0&&(t=i=r=NaN),new a(t,i,r,n)}function I(t){return t instanceof b||(t=q(t)),t?(t=t.rgb(),new a(t.r,t.g,t.b,t.opacity)):new a}function K(t,i,r,n){return arguments.length===1?I(t):new a(t,i,r,n??1)}function a(t,i,r,n){this.r=+t,this.g=+i,this.b=+r,this.opacity=+n}m(a,K,x(b,{brighter(t){return t=t==null?$:Math.pow($,t),new a(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?d:Math.pow(d,t),new a(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new a(f(this.r),f(this.g),f(this.b),R(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Q,formatHex:Q,formatHex8:xt,formatRgb:T,toString:T}));function Q(){return`#${w(this.r)}${w(this.g)}${w(this.b)}`}function xt(){return`#${w(this.r)}${w(this.g)}${w(this.b)}${w((isNaN(this.opacity)?1:this.opacity)*255)}`}function T(){const t=R(this.opacity);return`${t===1?"rgb(":"rgba("}${f(this.r)}, ${f(this.g)}, ${f(this.b)}${t===1?")":`, ${t})`}`}function R(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function f(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function w(t){return t=f(t),(t<16?"0":"")+t.toString(16)}function X(t,i,r,n){return n<=0?t=i=r=NaN:r<=0||r>=1?t=i=NaN:i<=0&&(t=NaN),new o(t,i,r,n)}function Y(t){if(t instanceof o)return new o(t.h,t.s,t.l,t.opacity);if(t instanceof b||(t=q(t)),!t)return new o;if(t instanceof o)return t;t=t.rgb();var i=t.r/255,r=t.g/255,n=t.b/255,e=Math.min(i,r,n),s=Math.max(i,r,n),h=NaN,u=s-e,p=(s+e)/2;return u?(i===s?h=(r-n)/u+(r<n)*6:r===s?h=(n-i)/u+2:h=(i-r)/u+4,u/=p<.5?s+e:2-s-e,h*=60):u=p>0&&p<1?0:h,new o(h,u,p,t.opacity)}function _(t,i,r,n){return arguments.length===1?Y(t):new o(t,i,r,n??1)}function o(t,i,r,n){this.h=+t,this.s=+i,this.l=+r,this.opacity=+n}m(o,_,x(b,{brighter(t){return t=t==null?$:Math.pow($,t),new o(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?d:Math.pow(d,t),new o(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,i=isNaN(t)||isNaN(this.s)?0:this.s,r=this.l,n=r+(r<.5?r:1-r)*i,e=2*r-n;return new a(O(t>=240?t-240:t+120,e,n),O(t,e,n),O(t<120?t+240:t-120,e,n),this.opacity)},clamp(){return new o(U(this.h),E(this.s),E(this.l),R(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=R(this.opacity);return`${t===1?"hsl(":"hsla("}${U(this.h)}, ${E(this.s)*100}%, ${E(this.l)*100}%${t===1?")":`, ${t})`}`}}));function U(t){return t=(t||0)%360,t<0?t+360:t}function E(t){return Math.max(0,Math.min(1,t||0))}function O(t,i,r){return(t<60?i+(r-i)*t/60:t<180?r:t<240?i+(r-i)*(240-t)/60:i)*255}const V=Math.PI/180,W=180/Math.PI,j=18,Z=.96422,tt=1,it=.82521,rt=4/29,k=6/29,nt=3*k*k,Mt=k*k*k;function et(t){if(t instanceof l)return new l(t.l,t.a,t.b,t.opacity);if(t instanceof g)return ot(t);t instanceof a||(t=I(t));var i=A(t.r),r=A(t.g),n=A(t.b),e=P((.2225045*i+.7168786*r+.0606169*n)/tt),s,h;return i===r&&r===n?s=h=e:(s=P((.4360747*i+.3850649*r+.1430804*n)/Z),h=P((.0139322*i+.0971045*r+.7141733*n)/it)),new l(116*e-16,500*(s-e),200*(e-h),t.opacity)}function vt(t,i){return new l(t,0,0,i??1)}function at(t,i,r,n){return arguments.length===1?et(t):new l(t,i,r,n??1)}function l(t,i,r,n){this.l=+t,this.a=+i,this.b=+r,this.opacity=+n}m(l,at,x(b,{brighter(t){return new l(this.l+j*(t??1),this.a,this.b,this.opacity)},darker(t){return new l(this.l-j*(t??1),this.a,this.b,this.opacity)},rgb(){var t=(this.l+16)/116,i=isNaN(this.a)?t:t+this.a/500,r=isNaN(this.b)?t:t-this.b/200;return i=Z*S(i),t=tt*S(t),r=it*S(r),new a(z(3.1338561*i-1.6168667*t-.4906146*r),z(-.9787684*i+1.9161415*t+.033454*r),z(.0719453*i-.2289914*t+1.4052427*r),this.opacity)}}));function P(t){return t>Mt?Math.pow(t,1/3):t/nt+rt}function S(t){return t>k?t*t*t:nt*(t-rt)}function z(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function A(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function st(t){if(t instanceof g)return new g(t.h,t.c,t.l,t.opacity);if(t instanceof l||(t=et(t)),t.a===0&&t.b===0)return new g(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var i=Math.atan2(t.b,t.a)*W;return new g(i<0?i+360:i,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function qt(t,i,r,n){return arguments.length===1?st(t):new g(r,i,t,n??1)}function ht(t,i,r,n){return arguments.length===1?st(t):new g(t,i,r,n??1)}function g(t,i,r,n){this.h=+t,this.c=+i,this.l=+r,this.opacity=+n}function ot(t){if(isNaN(t.h))return new l(t.l,0,0,t.opacity);var i=t.h*V;return new l(t.l,Math.cos(i)*t.c,Math.sin(i)*t.c,t.opacity)}m(g,ht,x(b,{brighter(t){return new g(this.h,this.c,this.l+j*(t??1),this.opacity)},darker(t){return new g(this.h,this.c,this.l-j*(t??1),this.opacity)},rgb(){return ot(this).rgb()}}));var lt=-.14861,B=1.78277,D=-.29227,C=-.90649,v=1.97294,ut=v*C,ct=v*B,gt=B*D-C*lt;function Ht(t){if(t instanceof y)return new y(t.h,t.s,t.l,t.opacity);t instanceof a||(t=I(t));var i=t.r/255,r=t.g/255,n=t.b/255,e=(gt*n+ut*i-ct*r)/(gt+ut-ct),s=n-e,h=(v*(r-e)-D*s)/C,u=Math.sqrt(h*h+s*s)/(v*e*(1-e)),p=u?Math.atan2(h,s)*W-120:NaN;return new y(p<0?p+360:p,u,e,t.opacity)}function pt(t,i,r,n){return arguments.length===1?Ht(t):new y(t,i,r,n??1)}function y(t,i,r,n){this.h=+t,this.s=+i,this.l=+r,this.opacity=+n}m(y,pt,x(b,{brighter(t){return t=t==null?$:Math.pow($,t),new y(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?d:Math.pow(d,t),new y(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=isNaN(this.h)?0:(this.h+120)*V,i=+this.l,r=isNaN(this.s)?0:this.s*i*(1-i),n=Math.cos(t),e=Math.sin(t);return new a(255*(i+r*(lt*n+B*e)),255*(i+r*(D*n+C*e)),255*(i+r*(v*n)),this.opacity)}}));export{q as color,pt as cubehelix,vt as gray,ht as hcl,_ as hsl,at as lab,qt as lch,K as rgb};
