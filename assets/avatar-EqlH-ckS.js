import{a as C,j as r}from"./jsx-runtime-TtYKBvr-.js";import{r as _}from"./index-IybTgENJ.js";import{b as k}from"./icon-7S-xPcKO.js";import{u as w}from"./use-image-AuCul83v.js";import{u as x,c as F,a as P,K as S,h as E}from"./factory-APG2CWDq.js";import{f as M}from"./forward-ref-6T0UNPU-.js";import{u as R}from"./use-component-style-XlqdEMGL.js";import{o as T}from"./theme-provider-rjxHA_Gz.js";const $=t=>C(k,{viewBox:"0 0 128 128",color:["white","black"],width:"100%",height:"100%",className:"ui-avatar__icon",...t,children:[r("path",{fill:"currentColor",d:"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"}),r("path",{fill:"currentColor",d:"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"})]}),B=t=>{const a=t.trim().split(" "),e=a[0]??"",s=a.length>1?a[a.length-1]:"";return e&&s?`${e.charAt(0)}${s.charAt(0)}`:e.charAt(0)},K=({name:t,format:a=B,...e})=>{const o={...W().name};return r(x.div,{className:"ui-avatar__name",role:"img","aria-label":t,__css:o,...e,children:t?a(t):null})},[O,W]=F({strict:!1,name:"AvatarContext"}),V=M((t,a)=>{const[e,s]=R("Avatar",t),{className:o,src:c,srcSet:l,name:m,loading:n,alt:d,icon:u,ignoreFallback:f,referrerPolicy:h,borderRadius:i="9999px",rounded:p="9999px",onError:v,onLoad:A,crossOrigin:g,format:b,children:L,...N}=T(s),[y,I]=_.useState(!1),j={position:"relative",display:"inline-flex",justifyContent:"center",alignItems:"center",flexShrink:0,textAlign:"center",textTransform:"uppercase",fontWeight:"medium",...e.container};return r(O,{value:e,children:C(x.span,{ref:a,className:P("ui-avatar",o),"data-loaded":S(y),borderRadius:i,rounded:p,__css:j,...N,children:[r(Z,{src:c,alt:d,srcSet:l,loading:n,borderRadius:i,rounded:p,onLoad:E(A,()=>I(!0)),onError:v,crossOrigin:g,format:b,name:m,icon:u,ignoreFallback:f,referrerPolicy:h}),L]})})}),Z=({src:t,alt:a,srcSet:e,onError:s,onLoad:o,format:c,borderRadius:l,rounded:m,name:n,loading:d,icon:u=r($,{}),ignoreFallback:f,crossOrigin:h,referrerPolicy:i})=>{const v=w({src:t,onLoad:o,onError:s,crossOrigin:h,ignoreFallback:f})==="loaded";if(!t||!v)return n?r(K,{name:n,format:c}):_.cloneElement(u,{role:"img"});const g={width:"100%",height:"100%",objectFit:"cover"};return r(x.img,{className:"ui-avatar__image",src:t,srcSet:e,alt:a??n,loading:d,referrerPolicy:i,borderRadius:l,rounded:m,__css:g})};export{V as A,W as u};
