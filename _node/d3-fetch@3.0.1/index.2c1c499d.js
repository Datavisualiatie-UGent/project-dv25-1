import{dsvFormat as i,tsvParse as c,csvParse as h}from"../d3-dsv@3.0.1/index.48418e2e.js";function m(n){if(!n.ok)throw new Error(n.status+" "+n.statusText);return n.blob()}function v(n,t){return fetch(n,t).then(m)}function x(n){if(!n.ok)throw new Error(n.status+" "+n.statusText);return n.arrayBuffer()}function g(n,t){return fetch(n,t).then(x)}function l(n){if(!n.ok)throw new Error(n.status+" "+n.statusText);return n.text()}function s(n,t){return fetch(n,t).then(l)}function f(n){return function(t,r,e){return arguments.length===2&&typeof r=="function"&&(e=r,r=void 0),s(t,r).then(function(o){return n(o,e)})}}function w(n,t,r,e){arguments.length===3&&typeof r=="function"&&(e=r,r=void 0);var o=i(n);return s(t,r).then(function(u){return o.parse(u,e)})}var p=f(h),d=f(c);function b(n,t){return new Promise(function(r,e){var o=new Image;for(var u in t)o[u]=t[u];o.onerror=e,o.onload=function(){r(o)},o.src=n})}function k(n){if(!n.ok)throw new Error(n.status+" "+n.statusText);if(!(n.status===204||n.status===205))return n.json()}function E(n,t){return fetch(n,t).then(k)}function a(n){return(t,r)=>s(t,r).then(e=>new DOMParser().parseFromString(e,n))}var P=a("application/xml"),T=a("text/html"),y=a("image/svg+xml");export{v as blob,g as buffer,p as csv,w as dsv,T as html,b as image,E as json,y as svg,s as text,d as tsv,P as xml};
