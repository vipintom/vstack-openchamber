(()=>{var g="openchamber.sdk",A=1;var ot=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function qt(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let a=new WeakMap;e.addEventListener("scroll",(d)=>{let c=d.target===e?o:d.target;if(!(c instanceof Element))return;if(!c.hasAttribute("data-oc-scrolling"))c.setAttribute("data-oc-scrolling","");let h=a.get(c);if(h!==void 0)clearTimeout(h);a.set(c,setTimeout(()=>{a.delete(c),c.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var er=`(${qt.toString()})(document);`;var rt=128,nt=65536;var Ue=128;var we=65536;var ro=/^[a-z][a-z0-9-]{0,39}$/;var eo=(e)=>Object(e)===e&&!Array.isArray(e),st=(e,o)=>Object.keys(e).every((a)=>o.includes(a)),to=(e)=>String(e)===e&&e.length>=1&&e.length<=60,oo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,no=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let a of e){if(!eo(a)||!ro.test(a.id)||!to(a.label))return!1;if(a.disabled!==void 0&&a.disabled!==!0&&a.disabled!==!1)return!1;if(o.has(a.id))return!1;if(o.add(a.id),a.kind==="button"){if(!st(a,["kind","id","label","disabled"]))return!1;continue}if(a.kind!=="select"||!st(a,["kind","id","label","value","options","disabled"]))return!1;if(!oo(a.value)||!Array.isArray(a.options)||a.options.length<1||a.options.length>16)return!1;let d=new Set;for(let c of a.options){if(!eo(c)||!st(c,["value","label"])||!oo(c.value)||!to(c.label)||d.has(c.value))return!1;d.add(c.value)}if(!d.has(a.value))return!1}return!0};var Ce=20000000,Ie=256;var it=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,so=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let a=0;a<e.bytes.byteLength;a+=1)if(e.bytes[a]!==o.bytes[a])return!1;return!0};var io=/^[A-Za-z0-9_-]{1,80}$/;var ao=["left","right","top","bottom"];var co=(e,o=0,a={remaining:16000})=>{if(--a.remaining<0||o>=32)return!1;if(e===null)return!0;let d=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let c of d)if(!co(c,o+1,a))return!1;return!0},at=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(at);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(at)}return String(e)===e||Number.isFinite(e)},ct=(e)=>{try{if(String(e.id)!==e.id||!io.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ao.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!co(e.data)||!at(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var po=["file","directory","other","missing"],lt=(e)=>Boolean(e&&"sessionId"in e),pt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var uo=/^[0-9a-f]{7,64}$/i,ut=(e)=>uo.test(e),Le=500,Me=32000,Eo=16000,fo=128,_o=200,ho=2000,So=16000,To=80,mo=200,go=16000;var Ao=2000;var Et=20000,Ne=1024,$e=2000000;var Pe=64000,Ge=8000,ft=4000;var _t=960000;var ko=999,xo=1e4,xe=500,bo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Oo=["stopped","starting","ready","failed"],or=new Set(bo),vo=(e)=>or.has(e),yo=(e)=>e&&vo(e)?e:"HOST_REJECTED",he=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(he);if(Object(e)===e)return Object.values(e).every(he);return!1},Ro=(e)=>he(e)&&JSON.stringify(e).length<=go,lo=(e)=>e?.trim().slice(0,mo)??"",Se=(e)=>{let o=e.id.trim().slice(0,fo),a=e.title.trim().slice(0,_o),d=e.url.trim().slice(0,ho),c=e.text?.trim().slice(0,So),h=e.author?.trim().slice(0,To),I=e.kind==="pull"?"pull":"issue",S={providerId:e.providerId.trim(),id:o,title:a||o,url:d,kind:I};if(c)S.text=c;if(h)S.author=h;if(I==="pull"){let f=lo(e.branches?.head),V=lo(e.branches?.base);if(f&&V)S.branches={head:f,base:V}}if(Ro(e.data))S.data=e.data;return S},ht=(e)=>{let o=Se(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},St=(e)=>{let o={text:e.text.trim().slice(0,Eo)};if(e.send)o.send=!0;return o},Tt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ko,Math.max(0,Math.round(e)))},mt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(xo,Math.max(0,Math.ceil(e)))};var Te=(e)=>e.length>0&&e.length<=Ne&&!e.includes("\x00")&&!e.includes("\\");var De=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ao)return!1;return!e.split("/").some((a)=>a==="."||a==="..")},rr=new Set(Oo),gt=(e)=>Boolean(e&&"status"in e&&rr.has(String(e.status))&&!("body"in e)),He=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),At=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),kt=(e)=>Boolean(e&&"written"in e&&e.written===!0),xt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),nr=new Set(po),bt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&nr.has(String(e.kind))&&Number.isFinite(e.size)),Ot=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),sr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ir=(e)=>Object(e)===e?e:null,dt=(e)=>String(e)===e&&e.length>0,ar=(e)=>{if(!dt(e.id))return null;if(e.ok===!0){let o={channel:g,v:A,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&dt(e.error))return{channel:g,v:A,type:"result",id:e.id,ok:!1,error:e.error,code:yo(dt(e.code)?e.code:void 0)};return null},vt=(e)=>{let o=ir(e);if(!o||o.channel!==g||o.v!==A)return null;if(o.type==="result")return ar(o);if(!sr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Uo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),cr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class E extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var wo=()=>Promise.reject(new E("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Xe=()=>Promise.reject(new E("BAD_PATH",`File path must be 1 to ${Ne} characters without NUL or backslash.`)),Fe=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new E("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},_=(e)=>(e.value+=1,`oc-${e.value}`),be=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new E("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let a=e.acceptSource??((t)=>t===o.parent),d=e.requestTimeoutMs??Et,c=new Set,h=new Set,I=new Set,S=new Set,f=new Set,V=new Set,ae=new Set,ue=new Set,Ee=new Set,oe=new Set,Ae=[],ce=null,re=null,fe=new Set,_e=new Set,de=null,le=null,ke=!1,ne=new Map,j=new Map,K=new Map,B=!1,n={value:0},s=null,p=null,T=!1,m=!1,M=null,Y=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},L=(t)=>{o.parent.postMessage(t,"*")},Vt=()=>{if(B||o.parent===o||oe.size===0||s?.features?.lateGenerateResults!==!0)return;L({channel:g,v:A,type:"generate-late-listen"})},y=(t,r)=>{for(let l of t)try{l(r)}catch(u){console.error(u)}},Bt=(t)=>{if(!(t instanceof MessageEvent))return;if(!a(t.source))return;let r=vt(t.data);if(!r)return;if(r.type==="workspace"){let u=j.get(r.payload.subscriptionId);if(u)y([u],r.payload.snapshot);return}if(r.type==="shells"){let u=K.get(r.payload.subscriptionId);if(u)y([u],r.payload.snapshot);return}if(r.type==="ready"){if(s=r.payload,p=Y(r.payload.session),y(c,r.payload),y(h,r.payload.directory),y(I,r.payload.session),p)y(S,p);y(f,r.payload.connection),y(V,r.payload.settings),y(ae,r.payload.item),Vt();return}if(r.type==="generate-late"){if(oe.size===0)Ae.push(r.payload);else y(oe,r.payload);return}if(r.type==="directory"){if(s)s={...s,directory:r.payload.directory};y(h,r.payload.directory);return}if(r.type==="session"){if(s)s={...s,session:r.payload.session};if(!r.payload.session)p=null;else if(p?.sessionId!==r.payload.session.id)p=Y(r.payload.session);y(I,r.payload.session);return}if(r.type==="session-lifecycle"){p=r.payload,y(S,r.payload);return}if(r.type==="connection"){if(s)s={...s,connection:r.payload.connection};y(f,r.payload.connection);return}if(r.type==="settings"){if(s)s={...s,settings:r.payload.settings};y(V,r.payload.settings);return}if(r.type==="item"){if(s)s={...s,item:r.payload.item};y(ae,r.payload.item);return}if(r.type==="status-control-event"){y(ue,r.payload);return}if(r.type==="popover-closed"){y(Ee,r.payload);return}if(r.type==="action"){let u=(x)=>{if(!B)L({channel:g,v:A,type:"action-result",id:r.id,payload:x})},b=re;if(!b){u({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>b(r.payload)).then(()=>u({ok:!0}),(x)=>{let C=(x instanceof Error?x.message:String(x)).trim();u({ok:!1,error:(C||"Action failed.").slice(0,xe)})});return}if(r.type==="file-open"){let u=r.payload;if(le&&so(le,u))return;le=u,y(fe,r.payload);return}if(r.type==="file-saved"){y(_e,r.payload.version);return}if(r.type==="file-snapshot"){let u=(C)=>{if(!B)L({channel:g,v:A,type:"file-snapshot-result",id:r.id,payload:C})},b=(C)=>u({error:(C.trim()||"Could not read the edited file.").slice(0,xe)}),x=de;if(!x){b("This extension does not edit files.");return}Promise.resolve().then(()=>x(r.payload.purpose)).then((C)=>{if(it(C)>Ce){b(`The file is over ${Ce} ${"bytes"in C?"bytes":"characters"}.`);return}if(C.version.length>Ie){b(`The snapshot version is over ${Ie} characters.`);return}u({snapshot:"bytes"in C?{bytes:C.bytes,version:C.version}:{content:C.content,version:C.version}})},(C)=>b(C instanceof Error?C.message:String(C)));return}if(r.type==="resolve"){let u=(x)=>{L({channel:g,v:A,type:"resolve-result",id:r.id,payload:x})},b=ce;if(!b){u({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>b(r.payload)).then((x)=>u({item:x?Se(x):null}),(x)=>{let C=(x instanceof Error?x.message:String(x)).trim();u({error:(C||"Command failed.").slice(0,xe)})});return}let l=ne.get(r.id);if(!l)return;if(clearTimeout(l.timer),ne.delete(r.id),r.ok){l.resolve(r.payload);return}l.reject(new E(r.code,r.error))};o.addEventListener("message",Bt),L({channel:g,v:A,type:"hello"});let N=(t,r=d)=>{if(B||o.parent===o)return Promise.reject(new E("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((l,u)=>{let b=setTimeout(()=>{ne.delete(t.id),u(new E("HOST_TIMEOUT","Host did not answer in time."))},r);ne.set(t.id,{resolve:l,reject:u,timer:b}),L(t)})},U=(t)=>N(t).then(()=>{return}),w={channel:g,v:A},qe=(t)=>{if(!B&&o.parent!==o)L(t)},jt=()=>qe({...w,type:"file-save"}),zt=(t)=>{if(!Uo(t)||!cr(t))return;t.preventDefault(),jt()},Wt=(t)=>{if(!Uo(t)||t.key!=="Escape"||s?.surface!=="popover"||!s.popover)return;t.preventDefault(),Qt(s.popover.id,"escape").catch(()=>{return})},ve=()=>{let t=s?.surface==="popover"?s.popover:void 0;if(!t)return;let r=T||m;if(M===r)return;M=r,Zt(t.id,r).catch(()=>{return})},ye=()=>{if(s?.surface!=="popover"||T)return;T=!0,ve()},Kt=(t)=>{if(s?.surface!=="popover"||t.relatedTarget!==null||!T)return;T=!1,ve()},Jt=()=>{if(s?.surface!=="popover"||m)return;m=!0,ve()},Yt=()=>{if(s?.surface!=="popover"||!m)return;m=!1,ve()},J=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new E("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},et=async(t)=>{if(t.kind!=="projects")J(t.projectId);let r=await N({...w,type:"workspace-read",id:_(n),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new E("HOST_REJECTED","Host did not return workspace data.");return r},tt=async(t,r)=>{if(t.kind!=="projects")J(t.projectId);let l=_(n);j.set(l,r);try{await U({...w,type:"workspace-subscribe",id:_(n),payload:{subscriptionId:l,query:t}})}catch(u){if(j.delete(l),!B)L({...w,type:"workspace-unsubscribe",id:_(n),payload:{subscriptionId:l}});throw u}return()=>{if(!j.delete(l)||B)return;L({...w,type:"workspace-unsubscribe",id:_(n),payload:{subscriptionId:l}})}},qo=async(t,r)=>{if(t.kind==="session")J(t.sessionId);if(t.kind==="project")J(t.projectId);let l=_(n);K.set(l,r);try{await U({...w,type:"shells-subscribe",id:_(n),payload:{subscriptionId:l,scope:t}})}catch(u){if(K.delete(l),!B)L({...w,type:"shells-unsubscribe",id:_(n),payload:{subscriptionId:l}});throw u}return()=>{if(!K.delete(l)||B)return;L({...w,type:"shells-unsubscribe",id:_(n),payload:{subscriptionId:l}})}},Re=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>rt))throw new E("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!he(t.value))throw new E("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>nt)throw new E("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&s?.features?.deviceStorage!==!0)throw new E("UNSUPPORTED","This host does not support device storage.");let r=await N({...w,type:"storage",id:_(n),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new E("HOST_REJECTED","Host did not return storage data.");return r},Qt=(t,r)=>s?.features?.popovers!==!0&&!(s?.surface==="popover"&&s.popover?.id===t)?Promise.reject(new E("UNSUPPORTED","This host does not support popovers.")):U({...w,type:"popover-close",id:_(n),payload:r?{id:t,reason:r}:{id:t}}),Zt=(t,r)=>s?.features?.popovers!==!0&&!(s?.surface==="popover"&&s.popover?.id===t)?Promise.reject(new E("UNSUPPORTED","This host does not support popovers.")):U({...w,type:"popover-anchor",id:_(n),payload:{id:t,active:r}});return o.addEventListener("keydown",Wt,!0),o.addEventListener("pointerover",ye),o.addEventListener("pointermove",ye),o.addEventListener("pointerout",Kt),o.addEventListener("focus",Jt),o.addEventListener("blur",Yt),{onAction:(t)=>(re=t,()=>{if(re===t)re=null}),listProjects:async()=>{let t=await et({kind:"projects"});if(t.kind!=="projects")throw new E("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await et({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new E("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await et({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new E("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>tt({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>tt({kind:"worktrees",projectId:t},(l)=>{if(l.kind==="worktrees")r(l)}),onSessions:(t,r)=>tt({kind:"sessions",projectId:t},(l)=>{if(l.kind==="sessions")r(l)}),onRunningShells:(t,r)=>qo(t,r),readShellOutput:async(t,r)=>{J(t,Ue);let l=r?.cursor;if(l!==void 0&&(!Number.isInteger(l)||l<0))throw new E("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let u=r?.tailBytes;if(u!==void 0&&(!Number.isInteger(u)||u<1||u>we))throw new E("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${we}.`);let x=await N({...w,type:"shell-output",id:_(n),payload:{shellId:t,cursor:l,tailBytes:u}});if(!x||typeof x.output!=="string"||!Number.isFinite(x.cursor))throw new E("HOST_REJECTED","Host did not return shell output.");return x},stopShell:async(t)=>{if(J(t,Ue),(await N({...w,type:"shell-stop",id:_(n),payload:{shellId:t}}))?.stopped!==!0)throw new E("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{J(t),await U({...w,type:"open-session",id:_(n),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let l=Fe(r),u={op:"get",key:t};if(l)u.scope=l;let b=await Re(u);return b.op==="get"&&b.found?b.value:void 0},set:async(t,r,l)=>{let u=Fe(l),b={op:"set",key:t,value:r};if(u)b.scope=u;await Re(b)},delete:async(t,r)=>{let l=Fe(r),u={op:"delete",key:t};if(l)u.scope=l;await Re(u)},keys:async(t)=>{let r=Fe(t),l={op:"keys"};if(r)l.scope=r;let u=await Re(l);if(u.op!=="keys")throw new E("HOST_REJECTED","Expected storage keys.");return u.keys}},onReady:(t)=>{if(c.add(t),s)t(s);return()=>{c.delete(t)}},onDirectory:(t)=>{if(h.add(t),s)t(s.directory);return()=>{h.delete(t)}},onSession:(t)=>{if(I.add(t),s)t(s.session);return()=>{I.delete(t)}},onSessionLifecycle:(t)=>{if(S.add(t),p)t(p);return()=>{S.delete(t)}},onConnection:(t)=>{if(f.add(t),s)t(s.connection);return()=>{f.delete(t)}},onSettings:(t)=>{if(V.add(t),s)t(s.settings);return()=>{V.delete(t)}},onItem:(t)=>{if(ae.add(t),s)t(s.item);return()=>{ae.delete(t)}},onStatusControl:(t)=>(ue.add(t),()=>{ue.delete(t)}),onPopoverClosed:(t)=>(Ee.add(t),()=>{Ee.delete(t)}),setStatusControls:(t)=>{if(s?.features?.statusControls!==!0)return Promise.reject(new E("UNSUPPORTED","This host does not support status controls."));if(!no(t))return Promise.reject(new E("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return U({...w,type:"status-controls",id:_(n),payload:{controls:t}})},openPopover:(t)=>{if(s?.features?.popovers!==!0)return Promise.reject(new E("UNSUPPORTED","This host does not support popovers."));if(!ct(t))return Promise.reject(new E("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return U({...w,type:"popover-open",id:_(n),payload:t})},closePopover:Qt,setPopoverAnchorActive:Zt,onResolve:(t)=>(ce=t,()=>{if(ce===t)ce=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Le)return Promise.reject(new E("HOST_REJECTED",`Toast message must contain 1 to ${Le} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Me))return Promise.reject(new E("HOST_REJECTED",`Toast copy text must contain 1 to ${Me} characters.`));return U({channel:g,v:A,type:"toast",id:_(n),payload:{...t,message:r}})},openUrl:(t)=>U({channel:g,v:A,type:"open-url",id:_(n),payload:{url:t}}),openCommit:(t)=>ut(t)?U({channel:g,v:A,type:"open-commit",id:_(n),payload:{sha:t}}):Promise.reject(new E("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>U({channel:g,v:A,type:"open-surface",id:_(n),payload:{surfaceId:t}}),writeClipboard:(t)=>U({channel:g,v:A,type:"clipboard-write",id:_(n),payload:{text:t}}),compose:(t)=>U({channel:g,v:A,type:"compose",id:_(n),payload:t}),attach:(t)=>U({channel:g,v:A,type:"attach",id:_(n),payload:Se(t)}),startSession:async(t)=>{if(t.projectId!==void 0)J(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")J(r.directory);else{if(r.name!==void 0)J(r.name,200);if(r.baseBranch!==void 0)J(r.baseBranch,200)}let l=await N({channel:g,v:A,type:"start-session",id:_(n),payload:ht(t)},e.requestTimeoutMs??180000);if(!lt(l))throw new E("HOST_REJECTED","Host did not return a session.");return l},prompt:(t)=>N({channel:g,v:A,type:"prompt",id:_(n),payload:St(t)}).then((r)=>{if(!pt(r))throw new E("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>U({channel:g,v:A,type:"session-link",id:_(n),payload:Se(t)}),close:()=>U({channel:g,v:A,type:"close",id:_(n)}),oauthStart:()=>U({channel:g,v:A,type:"oauth-start",id:_(n)}),oauthDisconnect:()=>U({channel:g,v:A,type:"oauth-disconnect",id:_(n)}),request:(t)=>(De(t.path)?N({channel:g,v:A,type:"request",id:_(n),payload:t}):wo()).then((r)=>{if(!He(r))throw new E("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(De(t.path)?N({channel:g,v:A,type:"service-request",id:_(n),payload:t}):wo()).then((r)=>{if(!He(r))throw new E("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>N({channel:g,v:A,type:"service-status",id:_(n)}).then((t)=>{if(!gt(t))throw new E("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Te(t)?N({channel:g,v:A,type:"file-read",id:_(n),payload:{path:t}}):Xe()).then((r)=>{if(!At(r))throw new E("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!Te(t))return Xe();if(r.length>$e)return Promise.reject(new E("FILE_TOO_LARGE",`Content is over ${$e} characters.`));return N({channel:g,v:A,type:"file-write",id:_(n),payload:{path:t,content:r}}).then((l)=>{if(!kt(l))throw new E("HOST_REJECTED","Host did not confirm the write.");return l})},listDir:(t)=>(Te(t)?N({channel:g,v:A,type:"file-list",id:_(n),payload:{path:t}}):Xe()).then((r)=>{if(!xt(r))throw new E("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(Te(t)?N({channel:g,v:A,type:"file-stat",id:_(n),payload:{path:t}}):Xe()).then((r)=>{if(!bt(r))throw new E("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),l=t.system?.trim();if(r.length===0||r.length>Pe)return Promise.reject(new E("HOST_REJECTED",`Prompt must be 1 to ${Pe} characters.`));if(l!==void 0&&(l.length===0||l.length>Ge))return Promise.reject(new E("HOST_REJECTED",`System prompt must be 1 to ${Ge} characters.`));let u=t.maxOutputTokens===void 0?void 0:Math.min(ft,Math.max(1,Math.floor(t.maxOutputTokens)));if(u!==void 0&&!Number.isFinite(u))return Promise.reject(new E("HOST_REJECTED","maxOutputTokens must be a number."));let b={prompt:r};if(l!==void 0)b.system=l;if(u!==void 0)b.maxOutputTokens=u;return N({channel:g,v:A,type:"generate",id:_(n),payload:b},e.requestTimeoutMs??_t).then((x)=>{if(!Ot(x))throw new E("HOST_REJECTED","Host did not return generated text.");return x})},onLateGenerateResult:(t)=>{oe.add(t);for(let r of Ae.splice(0))y([t],r);return Vt(),()=>{oe.delete(t)}},setBadge:(t)=>U({channel:g,v:A,type:"badge",id:_(n),payload:{count:Tt(t)}}),setHeight:(t)=>U({channel:g,v:A,type:"resize",id:_(n),payload:{height:mt(t)}}),onFileOpen:(t)=>{if(fe.add(t),!ke)ke=!0,o.addEventListener("keydown",zt,!0);if(le)t(le);return()=>{fe.delete(t)}},onFileSnapshot:(t)=>(de=t,()=>{if(de===t)de=null}),onFileSaved:(t)=>(_e.add(t),()=>{_e.delete(t)}),reportFileChange:(t)=>qe({...w,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:jt,reportFileUnsupported:()=>qe({...w,type:"file-unsupported"}),dispose:()=>{for(let t of j.keys())L({...w,type:"workspace-unsubscribe",id:_(n),payload:{subscriptionId:t}});j.clear();for(let t of K.keys())L({...w,type:"shells-unsubscribe",id:_(n),payload:{subscriptionId:t}});if(K.clear(),B=!0,ce=null,re=null,de=null,fe.clear(),_e.clear(),ke)o.removeEventListener("keydown",zt,!0);o.removeEventListener("message",Bt),o.removeEventListener("keydown",Wt,!0),o.removeEventListener("pointerover",ye),o.removeEventListener("pointermove",ye),o.removeEventListener("pointerout",Kt),o.removeEventListener("focus",Jt),o.removeEventListener("blur",Yt);for(let t of ne.values())clearTimeout(t.timer),t.reject(new E("HOST_UNAVAILABLE","Host client was disposed."));ne.clear(),c.clear(),h.clear(),I.clear(),S.clear(),f.clear(),V.clear(),ae.clear(),ue.clear(),Ee.clear(),oe.clear(),Ae.length=0}}};var Co=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var on=new Set(Co);var Io=["none","agent","user"];var nn=new Set(Io);var dr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],lr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Lo=(e,o)=>{o.style.colorScheme=e.mode;for(let[a,d]of dr)o.style.setProperty(a,e.tokens[d]);for(let[a,d,c]of lr){let h=e.tokens[c]??"";o.style.setProperty(a,h),o.style.setProperty(d,h)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},yt=(e,o)=>{if(Lo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var pr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},v=(e,o)=>`var(--${e}, var(--oc-${pr[e]}, ${o}))`,q=v("surface-background","transparent"),Be=v("surface-elevated","transparent"),me=v("surface-elevated-foreground","inherit"),z=v("surface-foreground","inherit"),O=v("surface-muted-foreground","gray"),ur=v("surface-muted","transparent"),se=v("interactive-border","currentColor"),P=v("interactive-hover","transparent"),pe=v("interactive-active","transparent"),Rt=v("interactive-selection","transparent"),Ut=v("interactive-selection-foreground","inherit"),Z=v("primary","currentColor"),wt=v("primary-text","inherit"),Ct=v("error-text","inherit"),Er=v("font-sans","inherit"),It=v("font-mono","monospace"),Go=v("radius","9px"),Lt=`calc(${Go} - 2px)`,Mo=`calc(${Go} - 4px)`,R=(e,o,a="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${a})`,No=`background-image: linear-gradient(${P}, ${P});`,Mt=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,Nt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",$o="box-shadow: var(--oc-sdk-lit);",Po=`inset 0 1px 0 0 ${R(z,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,fr=`
:root {
  --oc-sdk-edge: ${R(z,10)};
  --oc-sdk-field-bg: ${Be};
  --oc-sdk-raised-bg: ${q};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.1);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${R(z,6)};
  --oc-sdk-field-bg: ${R(q,50,Be)};
  --oc-sdk-raised-bg: ${Be};
  --oc-sdk-field-lift: ${Po};
  --oc-sdk-raised-lift: ${Po};
  --oc-sdk-lit: inset 0 1px 0 0 ${R(z,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.36);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Ve=(e)=>{let o=v(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${v(`${e}-text`,"inherit")}; }`},_r=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Do=`${fr}
.oc-sdk { color: ${z}; font-family: ${Er}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${No} }
.oc-sdk-mono { font-family: ${It}; }
.oc-sdk-muted { color: ${O}; }
${Ve("success")}${Ve("warning")}${Ve("error")}${Ve("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Z}; --oc-sdk-tone-text: ${wt}; }

.oc-sdk-btn { border-radius: ${Lt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Mo}; }
.oc-sdk-btn[data-variant="default"] { color: ${wt}; background: ${R(Z,10,q)}; border-color: ${R(Z,12)}; ${$o} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${R(Z,16,q)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${R(Z,22,q)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ur}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${me}; ${Nt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${pe}, ${pe}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${P}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${pe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${v("status-error","red")}; color: ${Ct}; background: ${R("var(--oc-sdk-tone)",7,q)}; border-color: ${R("var(--oc-sdk-tone)",12)}; ${$o} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${R("var(--oc-sdk-tone)",9,q)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${R("var(--oc-sdk-tone)",11,q)}; box-shadow: none; }

.oc-sdk-field-note { color: ${O}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Ct}; }
.oc-sdk-input { border-radius: ${Lt}; background: var(--oc-sdk-field-bg); color: ${me}; ${Mt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${O}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Mt(R(z,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Mt(v("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${It}; }

.oc-sdk-search-icon { color: ${O}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search-clear { border-radius: ${Mo}; color: ${O}; }
.oc-sdk-search-clear:hover { background: ${P}; color: ${z}; }

.oc-sdk-trigger { border-radius: ${Lt}; background: var(--oc-sdk-raised-bg); color: ${me}; ${Nt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${P}, ${P}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${O}; }
.oc-sdk-trigger-chevron { color: ${O}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${me}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Be}; background-clip: padding-box; color: ${me}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${P}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Rt}; color: ${Ut}; }
.oc-sdk-option-check { color: ${z}; }
.oc-sdk-option[data-destructive="true"] { color: ${Ct}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${R(v("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${O}; }
.oc-sdk-popup-empty { color: ${O}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${se}; border-radius: 4px; color: ${z}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${R(z,60,se)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${se}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${q}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${No} }
.oc-sdk-check-desc { color: ${O}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${R(z,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${O}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${z}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ut}; background: ${Rt}; border-color: ${se}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${me}; background: var(--oc-sdk-raised-bg); ${Nt} }
.oc-sdk-tab-count { color: ${O}; }

.oc-sdk-badge { border-radius: 9999px; background: ${P}; color: ${O}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${R("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${P}; }
.oc-sdk-row[aria-selected="true"] { background: ${Rt}; color: ${Ut}; }
.oc-sdk-row-lead { font-family: ${It}; color: ${O}; }
.oc-sdk-row-sub { color: ${O}; }
.oc-sdk-row-meta { color: ${O}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${O}; }

.oc-sdk-empty-body { color: ${O}; }

.oc-sdk-spinner { color: ${O}; }
.oc-sdk-spinner-ring { border-color: ${se}; border-top-color: ${Z}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${R("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${O}; }

.oc-sdk-separator { color: ${O}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${R(se,40)}; }

.oc-sdk-progress-label { color: ${O}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${se}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Z}); }

.oc-sdk-text a { color: ${wt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${R(se,60)}; }
`,G=`
${ot}
${_r}
${Do}`;var Gt=be();function Ye(e){let o=e instanceof Error?e.message:String(e);return/ENOENT|NOT_FOUND|not found|no such file|does not exist/i.test(o)}async function Dt(e){return(await Gt.readFile(e)).content}async function gr(){try{return await Gt.listDir(".vstack"),!0}catch(e){if(Ye(e))return!1;throw e}}async function Ar(){try{return await Dt(".vstack/state.json")}catch(e){if(Ye(e))return null;throw e}}async function kr(){try{return await Dt(".vstack/history.jsonl")}catch(e){if(Ye(e))return null;throw e}}async function xr(){try{let o=(await Gt.listDir(".vstack/deliveries")).entries.filter((d)=>d.kind==="file"&&d.name.endsWith(".json"));return await Promise.all(o.map(async(d)=>({name:d.name,text:await Dt(`.vstack/deliveries/${d.name}`)})))}catch(e){if(Ye(e))return[];throw e}}var Je=null;async function Ho(){if(!await gr())return Je=null,{present:!1,stateText:null,historyText:null,archives:[]};let[o,a]=await Promise.all([Ar(),kr()]),d=`${o??""}\x00${a??""}`;if(Je?.key!==d)Je={key:d,archives:await xr()};return{present:!0,stateText:o,historyText:a,archives:Je.archives}}function Q(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}function k(e){return typeof e==="string"&&e.length>0}function br(e){return e==="todo"||e==="doing"||e==="done"||e==="blocked"}function Or(e){return e==="passed"||e==="failed"||e==="blocked"||e==="not_verified"||e==="judgement"}function vr(e){return e==="command"||e==="artifact"||e==="review"}function yr(e){return Q(e)&&k(e.id)&&vr(e.kind)&&k(e.check)}function Rr(e){return Q(e)&&k(e.id)&&k(e.claim)&&k(e.check)&&Or(e.result)&&k(e.createdAt)&&"gateId"in e&&"digest"in e&&(e.gateId===null||typeof e.gateId==="string")&&(e.digest===null||typeof e.digest==="string")}function Ur(e){return Q(e)&&k(e.id)&&k(e.choice)&&k(e.alternatives)&&k(e.reason)&&k(e.consequence)&&k(e.owner)}function wr(e){return Q(e)&&k(e.state)&&k(e.nextAction)}function Cr(e){return Q(e)&&k(e.id)&&k(e.title)&&br(e.status)&&k(e.check)&&(e.evidenceId===null||typeof e.evidenceId==="string")&&(e.artifact===null||typeof e.artifact==="string")&&"gateId"in e&&(e.gateId===null||typeof e.gateId==="string")&&k(e.createdAt)&&k(e.updatedAt)}function Xo(e){if(!Q(e))return{ok:!1,kind:"invalid",message:"delivery is not an object"};if(!k(e.id))return{ok:!1,kind:"invalid",message:"delivery.id is missing"};if(!k(e.title))return{ok:!1,kind:"invalid",message:"delivery.title is missing"};if(!k(e.tier))return{ok:!1,kind:"invalid",message:"delivery.tier is missing"};if(!k(e.playbook))return{ok:!1,kind:"invalid",message:"delivery.playbook is missing"};if(!k(e.phase))return{ok:!1,kind:"invalid",message:"delivery.phase is missing"};if(!k(e.status))return{ok:!1,kind:"invalid",message:"delivery.status is missing"};if(!Array.isArray(e.tasks)||!e.tasks.every(Cr))return{ok:!1,kind:"invalid",message:"delivery.tasks is malformed"};if(!Array.isArray(e.gates)||!e.gates.every(yr))return{ok:!1,kind:"invalid",message:"delivery.gates is malformed (requires recorder 0.3.0 / schema 2)"};if(!Array.isArray(e.evidence)||!e.evidence.every(Rr))return{ok:!1,kind:"invalid",message:"delivery.evidence is malformed"};if(!Array.isArray(e.decisions)||!e.decisions.every(Ur))return{ok:!1,kind:"invalid",message:"delivery.decisions is malformed"};if(!Array.isArray(e.handoffs)||!e.handoffs.every(wr))return{ok:!1,kind:"invalid",message:"delivery.handoffs is malformed"};if(!k(e.createdAt)||!k(e.updatedAt))return{ok:!1,kind:"invalid",message:"delivery timestamps are missing"};if(e.closedAt!==null&&!k(e.closedAt))return{ok:!1,kind:"invalid",message:"delivery.closedAt is malformed"};return{ok:!0,value:e}}function Fo(e){let o;try{o=JSON.parse(e)}catch{return{ok:!1,kind:"invalid",message:"state.json is not valid JSON"}}if(!Q(o))return{ok:!1,kind:"invalid",message:"state is not an object"};if(typeof o.schemaVersion!=="number")return{ok:!1,kind:"invalid",message:"schemaVersion is missing"};if(o.schemaVersion!==2){if(o.schemaVersion>2)return{ok:!1,kind:"incompatible",message:`state schema ${o.schemaVersion} is newer than this panel reads (2): requires recorder 0.3.0 / schema 2`};return{ok:!1,kind:"invalid",message:`state schema ${o.schemaVersion} is older than schema 2: ${"requires recorder 0.3.0 / schema 2"} — re-record or migrate the delivery`}}if(typeof o.revision!=="number")return{ok:!1,kind:"invalid",message:"revision is missing"};if(!k(o.createdAt)||!k(o.updatedAt))return{ok:!1,kind:"invalid",message:"state timestamps are missing"};if(o.delivery!==null&&!Q(o.delivery))return{ok:!1,kind:"invalid",message:"delivery is malformed"};if(o.delivery!==null){let a=Xo(o.delivery);if(!a.ok)return a}return{ok:!0,value:o}}function Vo(e){let o=[],a=e.split(`
`).filter((d)=>d.trim().length>0);for(let[d,c]of a.entries()){let h;try{h=JSON.parse(c)}catch{return{ok:!1,kind:"invalid",message:`history line ${d+1} is not JSON`}}if(!Q(h)||!k(h.ts)||!k(h.type)||!k(h.deliveryId)||!Q(h.data))return{ok:!1,kind:"invalid",message:`history line ${d+1} is malformed`};o.push(h)}return{ok:!0,value:o}}function Bo(e){let o=[],a=[];for(let d of e){let c;try{c=JSON.parse(d.text)}catch{a.push(`${d.name} is not JSON`);continue}let h=Xo(c);if(!h.ok){a.push(`${d.name}: ${h.message}`);continue}o.push(h.value)}return{deliveries:o,errors:a}}function jo(e){if(!e.present)return{state:"missing",title:"Missing",detail:"No .vstack/ directory in this project. Open a delivery with vstack_route to start recording."};if(e.stateError&&!e.stateError.ok)return{state:e.stateError.kind==="incompatible"?"incompatible":"invalid",title:e.stateError.kind==="incompatible"?"Incompatible":"Invalid",detail:e.stateError.message};if(!e.state)return{state:"invalid",title:"Invalid",detail:"state.json could not be read."};if(e.historyError&&!e.historyError.ok)return{state:"invalid",title:"Invalid",detail:e.historyError.message};if(e.archiveErrors.length>0)return{state:"invalid",title:"Invalid",detail:e.archiveErrors.join("; ")};let o=e.events.at(-1);if(o&&typeof o.revision==="number"){if(o.revision!==e.state.revision)return{state:"stale",title:"Stale",detail:`The last event is revision ${o.revision}; state.json is revision ${e.state.revision}. The recorder may have stopped mid-write.`}}else if(o){let a=Date.parse(o.ts),d=Date.parse(e.state.updatedAt);if(!Number.isNaN(a)&&!Number.isNaN(d)&&a>d)return{state:"stale",title:"Stale",detail:"The history is newer than state.json. The recorder may have stopped mid-write."}}return{state:"healthy",title:"Healthy",detail:"State is present, current and readable."}}function Ht(e,o){let a=new Map;for(let c of o)a.set(c.id,c);let d=e?.delivery;if(d)a.set(d.id,d);return[...a.values()].sort((c,h)=>{if(c.status==="active"&&h.status!=="active")return-1;if(h.status==="active"&&c.status!=="active")return 1;return h.updatedAt.localeCompare(c.updatedAt)})}function zo(e){if(!e)return"—";return e.length>8?e.slice(0,8):e}function Wo(e){return(e.gates??[]).map((o)=>{let a=e.evidence.filter((c)=>c.gateId===o.id),d=a.filter((c)=>c.result==="passed").length;return{gateId:o.id,kind:o.kind,evidenceCount:a.length,passedCount:d,status:d>0?"covered":"uncovered"}})}function Ko(e){return e.tasks.find((o)=>o.status==="doing")??e.tasks.find((o)=>o.status==="todo")}function Qe(e,o){if(!o.evidenceId)return"not run";let a=e.evidence.find((d)=>d.id===o.evidenceId);return a?`${a.result} (${a.id})`:"missing evidence"}function Xt(e){return e.handoffs.at(-1)}function Ft(e){return{done:e.tasks.filter((o)=>o.status==="done").length,total:e.tasks.length}}function ie(e){if(!e)return"—";let o=new Date(e);if(Number.isNaN(o.getTime()))return e;return o.toLocaleString()}function Jo(e){return e.length>18?`${e.slice(0,18)}…`:e}var te=[{id:"now",label:"Now"},{id:"plan",label:"Plan"},{id:"evidence",label:"Evidence"},{id:"timeline",label:"Timeline"},{id:"decisions",label:"Decisions"},{id:"deliveries",label:"Deliveries"},{id:"health",label:"Health"}];var Ir=3000;function i(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ze(e){if(["passed","done","healthy","closed","covered","match"].includes(e))return"success";if(["failed","blocked","invalid","incompatible","missing","mismatch"].includes(e))return"error";if(["stale","doing","active","parked","judgement","uncovered"].includes(e))return"warning";return"neutral"}function F(e){return`<span class="badge tone-${Ze(e)}">${i(e)}</span>`}function W(e){return`<button class="copy" data-copy="${i(e)}" title="Copy command">Copy</button>`}function D(e,o){return`<div class="empty"><strong>${i(e)}</strong><p>${i(o)}</p></div>`}function Yo(e){return`${i(e.title)} <span class="muted">${i(e.id)}</span>`}function Lr(e){let o=Ft(e),a=Xt(e),d=e.tasks.map((f)=>`<tr>
        <td>${i(f.id)}</td>
        <td>${i(f.title)}</td>
        <td>${F(f.status)}</td>
        <td>${i(Qe(e,f))}</td>
        <td><code>${i(f.check)}</code></td>
      </tr>`).join(""),c=e.evidence.map((f)=>{let V=!f.digest?"—":`<code title="${i(f.digest)}">${i(f.digest.slice(0,8))}</code> ${F(f.result==="failed"?"mismatch":"match")}`;return`<tr>
        <td>${i(f.id)}</td>
        <td>${i(f.claim)}</td>
        <td>${F(f.result)}</td>
        <td>${i(f.gateId??"—")}</td>
        <td>${V}</td>
        <td><code>${i(f.check)}</code></td>
        <td>${i(f.artifact??"—")}</td>
      </tr>`}).join(""),h=(e.gates??[]).map((f)=>`<tr>
        <td>${i(f.id)}</td>
        <td>${i(f.kind)}</td>
        <td><code>${i(f.check)}</code></td>
      </tr>`).join(""),I=e.decisions.map((f)=>`<li><strong>${i(f.choice)}</strong> — ${i(f.reason)}
        <div class="muted">Alternatives: ${i(f.alternatives)}. Consequence: ${i(f.consequence)}. Owner: ${i(f.owner)}.</div></li>`).join(""),S=e.close?.waiver;return`<section class="card">
      <div class="row-between">
        <h2>${Yo(e)}</h2>
        ${F(e.status)}
      </div>
      <p>${i(e.outcome)}</p>
      <dl class="facts">
        <dt>Tier</dt><dd>${i(e.tier)}</dd>
        <dt>Playbook</dt><dd>${i(e.playbook)}</dd>
        <dt>Phase</dt><dd>${i(e.phase)}</dd>
        <dt>Done when</dt><dd>${i(e.doneWhen)}</dd>
        <dt>Tasks</dt><dd>${o.done}/${o.total} done</dd>
        <dt>Updated</dt><dd>${i(ie(e.updatedAt))}</dd>
        <dt>Closed</dt><dd>${i(ie(e.closedAt))}</dd>
        <dt>Record</dt><dd><code>${i(e.close?.recordPath??`.vstack/deliveries/${e.id}.md`)}</code>
          ${W(`cat ${e.close?.recordPath??`.vstack/deliveries/${e.id}.md`}`)}</dd>
      </dl>
      ${S?`<p class="callout tone-warning"><strong>Waiver</strong> ${i(S.reason)} — accepted by ${i(S.owner)}.</p>`:""}
    </section>
    <section class="card">
      <h3>Tasks</h3>
      ${d?`<div class="scroll"><table><thead><tr><th>ID</th><th>Task</th><th>Status</th><th>Evidence</th><th>Check</th></tr></thead><tbody>${d}</tbody></table></div>`:D("No tasks recorded","Add one with vstack_task.")}
    </section>
    <section class="card">
      <h3>Gates</h3>
      ${h?`<div class="scroll"><table><thead><tr><th>ID</th><th>Kind</th><th>Check</th></tr></thead><tbody>${h}</tbody></table></div>`:D("No gates declared","Gates are declared by the recorder.")}
    </section>
    <section class="card">
      <h3>Evidence</h3>
      ${c?`<div class="scroll"><table><thead><tr><th>ID</th><th>Claim</th><th>Result</th><th>Gate</th><th>Digest</th><th>Check</th><th>Artifact</th></tr></thead><tbody>${c}</tbody></table></div>`:D("No evidence recorded","A task cannot complete without it.")}
    </section>
    <section class="card">
      <h3>Decisions</h3>
      ${I?`<ul>${I}</ul>`:D("No decisions recorded","Record one with vstack_decision.")}
    </section>
    <section class="card">
      <h3>Handoff</h3>
      ${a?`<p><strong>${i(a.state)}</strong> → ${i(a.nextAction)}</p>
             <p class="muted">Blockers: ${a.blockers.length?i(a.blockers.join(", ")):"none"}. Tree: ${i(a.treeStatus||"unknown")}.</p>`:D("No handoff recorded","Record one with vstack_handoff.")}
    </section>`}function Qo(e,o){let a=o.view??"now",d=null,c=null,h=[],I=[],S={state:"missing",title:"Missing",detail:"Not read yet."};e.innerHTML=`<div class="vstack">
    <header>
      <div class="brand"><span class="mark">v</span><span>vstack</span><span id="health-badge"></span></div>
      <div class="actions">
        <button id="refresh" class="secondary">Refresh</button>
      </div>
    </header>
    <div id="health-banner" class="banner" aria-live="polite"></div>
    <nav class="tabs" role="tablist">${te.map((n)=>`<button role="tab" id="tab-${n.id}" data-view="${n.id}" aria-controls="view" aria-selected="false">${i(n.label)}</button>`).join("")}</nav>
    <main id="view" role="tabpanel"></main>
    <footer id="footer" class="muted"></footer>
  </div>`;let f=e.querySelector("#view"),V=e.querySelector("#health-banner"),ae=e.querySelector("#health-badge"),ue=e.querySelector("#footer");function Ee(){ae.innerHTML=F(S.state),V.className=`banner tone-${Ze(S.state)}`,V.innerHTML=`<strong>${i(S.title)}</strong> ${i(S.detail)}`,e.querySelectorAll("[data-view]").forEach((s)=>{let p=s.dataset.view===a;s.classList.toggle("active",p),s.setAttribute("aria-selected",String(p)),s.tabIndex=p?0:-1}),f.setAttribute("aria-labelledby",`tab-${a}`);let n=c?`revision ${c.revision}`:"no state";ue.textContent=`${n} · ${h.length} events · ${I.length} archived deliveries`}function oe(){let n=c?.delivery;if(!n)return`<section class="card">${D("No delivery recorded","Open one with vstack_route. The panel never invents a delivery or a task.")}<p class="command"><code>vstack_route</code>${W("vstack_route")}</p></section>`;let s=Ko(n),p=Xt(n);return`<section class="card">
        <div class="row-between"><h2>${Yo(n)}</h2>${F(n.status)}</div>
        <p>${i(n.outcome)}</p>
        <dl class="facts">
          <dt>Phase</dt><dd>${i(n.phase)}</dd>
          <dt>Tier</dt><dd>${i(n.tier)}</dd>
          <dt>Playbook</dt><dd>${i(n.playbook)}</dd>
          <dt>Done when</dt><dd>${i(n.doneWhen)}</dd>
          <dt>Next task</dt><dd>${s?`${i(s.title)} <span class="muted">${i(s.id)}</span>`:"none"}</dd>
          <dt>Next action</dt><dd>${p?.nextAction?i(p.nextAction):"none recorded"}</dd>
          <dt>Blockers</dt><dd>${p?.blockers.length?i(p.blockers.join(", ")):"none recorded"}</dd>
          <dt>Last activity</dt><dd>${i(ie(n.updatedAt))}</dd>
        </dl>
        <p class="muted">${n.tasks.filter((T)=>T.status==="done").length}/${n.tasks.length} tasks done · ${n.evidence.length} evidence records</p>
      </section>
      <section class="card">
        <h3>Commands</h3>
        <p class="command"><code>vstack_task {"action":"add","title":"…","check":"…"}</code>${W('vstack_task {"action":"add","title":"…","check":"…"}')}</p>
        <p class="command"><code>vstack_evidence {"claim":"…","check":"…","result":"passed"}</code>${W('vstack_evidence {"claim":"…","check":"…","result":"passed"}')}</p>
        <p class="command"><code>vstack_close</code>${W("vstack_close")}</p>
      </section>`}function Ae(){let n=c?.delivery;if(!n)return D("No plan recorded","Open a delivery and add tasks.");let p=[{status:"doing",label:"Doing"},{status:"todo",label:"Todo"},{status:"blocked",label:"Blocked"},{status:"done",label:"Done"}].map((T)=>{let m=n.tasks.filter((M)=>M.status===T.status);if(m.length===0)return"";return`<h3>${T.label} (${m.length})</h3>
          <div class="scroll"><table><thead><tr><th>ID</th><th>Task</th><th>Check</th><th>Evidence</th><th>Command</th></tr></thead><tbody>
          ${m.map((M)=>{let Y=M.status==="todo"||M.status==="blocked"?(()=>{let L=`vstack_task {"action":"start","taskId":"${M.id}"}`;return`<td class="command"><code>${i(L)}</code>${W(L)}</td>`})():"<td>—</td>";return`<tr><td>${i(M.id)}</td><td>${i(M.title)}</td><td><code>${i(M.check)}</code></td><td>${i(Qe(n,M))}</td>${Y}</tr>`}).join("")}
          </tbody></table></div>`}).join("");return`<section class="card">
      <h2>Plan</h2>
      ${fe(n)}
      ${p||D("No tasks recorded","Add one with vstack_task.")}
    </section>`}function ce(n){if(!n.digest)return"—";let s=n.result==="failed"?F("mismatch"):F("match");return`<code title="${i(n.digest)}">${i(zo(n.digest))}</code> ${s}`}function re(n){return`<div class="scroll"><table><thead><tr><th>ID</th><th>Claim</th><th>Result</th><th>Gate</th><th>Digest</th><th>Check</th><th>Artifact</th><th>Time</th></tr></thead><tbody>
      ${n.map((s)=>`<tr><td>${i(s.id)}</td><td>${i(s.claim)}</td><td>${F(s.result)}</td><td>${i(s.gateId??"—")}</td><td>${ce(s)}</td><td><code>${i(s.check)}</code></td><td>${i(s.artifact??"—")}</td><td>${i(ie(s.createdAt))}</td></tr>`).join("")}
      </tbody></table></div>`}function fe(n){let s=Wo(n),p=s.filter((T)=>T.status==="covered").length;if(s.length===0)return'<p class="muted">No gates declared.</p>';return`<h3>Gate coverage (${p}/${s.length} covered)</h3>
      <div class="scroll"><table><thead><tr><th>Gate</th><th>Kind</th><th>Evidence</th><th>Status</th></tr></thead><tbody>
      ${s.map((T)=>`<tr><td>${i(T.gateId)}</td><td>${i(T.kind)}</td><td>${T.evidenceCount}</td><td>${F(T.status)}</td></tr>`).join("")}
      </tbody></table></div>`}function _e(){let n=c?.delivery;if(!n)return D("No evidence recorded","Open a delivery first.");let s=new Set,p=n.tasks.map((m)=>{let M=n.evidence.filter((Y)=>{let L=Y.taskId===m.id||m.evidenceId===Y.id;if(L)s.add(Y.id);return L});return`<h3>${i(m.title)} <span class="muted">${i(m.id)}</span> ${F(Qe(n,m))}</h3>
          ${M.length?re(M):'<p class="callout tone-warning">not run — no evidence recorded for this task.</p>'}`}).join(""),T=n.evidence.filter((m)=>!s.has(m.id));return`<section class="card">
      <h2>Evidence</h2>
      ${p||D("No tasks recorded","Evidence is grouped by task; a task with no evidence shows not run.")}
      ${T.length?`<h3>Unlinked evidence</h3>${re(T)}`:""}
      ${n.evidence.length===0?D("No evidence recorded","A task without evidence shows not run."):""}
    </section>`}function de(){return`<section class="card">
      <h2>Timeline</h2>
      ${h.length?`<div class="scroll"><table><thead><tr><th>Time</th><th>Event</th><th>Delivery</th><th>Data</th></tr></thead><tbody>
            ${h.map((n)=>`<tr><td>${i(ie(n.ts))}</td><td>${F(n.type)}</td><td><code>${i(Jo(n.deliveryId))}</code></td><td><code>${i(JSON.stringify(n.data))}</code></td></tr>`).join("")}
            </tbody></table></div>`:D("No events recorded","The recorder writes history.jsonl on every change.")}
    </section>`}function le(){let n=c?.delivery,s=n?.decisions??[],p=n?.close?.waiver,T=n?.close?.review;return`<section class="card">
      <h2>Decisions</h2>
      ${s.length?`<ul>${s.map((m)=>`<li><strong>${i(m.choice)}</strong> — ${i(m.reason)}
                  <div class="muted">Alternatives: ${i(m.alternatives)}. Consequence: ${i(m.consequence)}. Owner: ${i(m.owner)}.</div>
                  <div class="muted">${i(ie(m.createdAt))}</div></li>`).join("")}</ul>`:D("No decisions recorded","Record one with vstack_decision.")}
      ${T?`<h3>Review</h3><p>${F(T.outcome)} ${i(T.notes||"no notes")} — ${i(T.owner)}</p>`:""}
      ${p?`<h3>Waiver</h3><p class="callout tone-warning">${i(p.reason)} — accepted by ${i(p.owner)}.</p>`:""}
    </section>`}function ke(){let n=Ht(c,I);if(n.length===0)return`<section class="card">${D("No deliveries recorded","Closed deliveries are kept in .vstack/deliveries/. Open one with vstack_route.")}<p class="command"><code>vstack_route</code>${W("vstack_route")}</p></section>`;if(!d)d=n[0].id;let s=n.find((p)=>p.id===d)??n[0];return`<section class="card">
        <h2>Deliveries</h2>
        <p class="muted">Every delivery recorded in this project, newest first. Closed records stay in <code>.vstack/deliveries/</code>.</p>
        <div class="scroll"><table class="deliveries"><thead><tr><th>Delivery</th><th>Status</th><th>Tier</th><th>Tasks</th><th>Evidence</th><th>Updated</th></tr></thead><tbody>
        ${n.map((p)=>{let T=Ft(p);return`<tr data-delivery="${i(p.id)}" class="${p.id===d?"selected":""}">
              <td><strong>${i(p.title)}</strong><div class="muted">${i(p.id)}</div></td>
              <td>${F(p.status)}</td>
              <td>${i(p.tier)}</td>
              <td>${T.done}/${T.total}</td>
              <td>${p.evidence.length}</td>
              <td>${i(ie(p.updatedAt))}</td>
            </tr>`}).join("")}
        </tbody></table></div>
      </section>
      ${Lr(s)}`}function ne(){return`<section class="card">
      <h2>Health</h2>
      <dl class="facts">${[["State",S.state],["Detail",S.detail],["Schema",c?String(c.schemaVersion):"—"],["Revision",c?String(c.revision):"—"],["State path",".vstack/state.json"],["History path",".vstack/history.jsonl"],["Archive path",".vstack/deliveries/"],["History events",String(h.length)],["Archived deliveries",String(I.length)]].map(([s,p])=>`<dt>${i(s)}</dt><dd>${i(p)}</dd>`).join("")}</dl>
      <h3>Next action</h3>
      ${S.state==="missing"?`<p>Install and enable the recorder, then open a delivery.</p><p class="command"><code>vstack_route</code>${W("vstack_route")}</p>`:S.state==="incompatible"?`<p>Update the panel to a version that reads schema ${c?.schemaVersion??"newer"}.</p><p class="command"><code>cat .vstack/state.json</code>${W("cat .vstack/state.json")}</p>`:S.state==="invalid"?`<p class="callout tone-error">A required record is malformed. Fix or move the named file; the panel will not invent values.</p><p class="command"><code>cat .vstack/state.json</code>${W("cat .vstack/state.json")}</p>`:S.state==="stale"?`<p>Run a recorder command to rewrite state, or refresh after the current command finishes.</p><p class="command"><code>cat .vstack/history.jsonl</code>${W("cat .vstack/history.jsonl")}</p>`:"<p>No action. Every value above comes from a recorded file.</p>"}
    </section>`}function j(){if(Ee(),S.state==="missing"){f.innerHTML=`<section class="card">${D("No vstack state","This project has no .vstack/ directory. The panel is read-only; the recorder creates state.")}<p class="command"><code>vstack_route</code>${W("vstack_route")}</p></section>`;return}if(S.state==="incompatible"){f.innerHTML=`<section class="card"><h2>${i(S.title)}</h2><p class="callout tone-${Ze(S.state)}">${i(S.detail)}</p>
        <p class="muted">Open Health for the file and schema details.</p></section>`;return}if(S.state==="invalid"&&!(a==="deliveries"&&I.length>0)){f.innerHTML=`<section class="card"><h2>${i(S.title)}</h2><p class="callout tone-${Ze(S.state)}">${i(S.detail)}</p>
        <p class="muted">Open Health for the file and schema details.</p></section>`;return}switch(a){case"now":f.innerHTML=oe();break;case"plan":f.innerHTML=Ae();break;case"evidence":f.innerHTML=_e();break;case"timeline":f.innerHTML=de();break;case"decisions":f.innerHTML=le();break;case"deliveries":f.innerHTML=ke();break;case"health":f.innerHTML=ne();break}}async function K(){try{let n=await o.read(),s=n.stateText===null?null:Fo(n.stateText),p=n.historyText===null?{ok:!0,value:[]}:Vo(n.historyText),T=Bo(n.archives);if(c=s?.ok?s.value:null,h=p.ok?p.value:[],I=T.deliveries,S=jo({present:n.present,state:c,stateError:s,events:h,historyError:p.ok?null:p,archiveErrors:T.errors}),d&&!Ht(c,I).some((m)=>m.id===d))d=null;j()}catch(n){S={state:"invalid",title:"Read failed",detail:n instanceof Error?n.message:String(n)},c=null,h=[],I=[],j()}}e.addEventListener("keydown",(n)=>{let p=n.target.closest("[data-view]");if(!p||n.key!=="ArrowRight"&&n.key!=="ArrowLeft")return;let m=(te.findIndex((Y)=>Y.id===p.dataset.view)+(n.key==="ArrowRight"?1:-1)+te.length)%te.length,M=e.querySelector(`[data-view="${te[m].id}"]`);if(M)n.preventDefault(),a=te[m].id,j(),M.focus()}),e.addEventListener("click",(n)=>{let s=n.target,p=s.closest("[data-view]");if(p?.dataset.view){a=p.dataset.view,j();return}let T=s.closest("[data-delivery]");if(T?.dataset.delivery){d=T.dataset.delivery,a="deliveries",j();return}let m=s.closest("[data-copy]");if(m?.dataset.copy){navigator.clipboard.writeText(m.dataset.copy).then(()=>{m.textContent="Copied",window.setTimeout(()=>{m.textContent="Copy"},1200)}).catch(()=>{m.textContent="Select and copy"});return}if(s.closest("#refresh"))K()}),K();let B=window.setInterval(()=>{if(document.visibilityState==="visible")K()},Ir);return window.addEventListener("beforeunload",()=>window.clearInterval(B)),{refresh:K,destroy:()=>{window.clearInterval(B)}}}var Zo=be(),Oe=null;Zo.onReady((e)=>{if(yt(e,document.documentElement),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,!Oe){let o=document.getElementById("app");if(!o)throw Error("vstack panel root is missing");let a=document.body.dataset.view,d=te.find((c)=>c.id===a)?.id;Oe=Qo(o,{read:Ho,...d?{view:d}:{}})}else Oe.refresh()});Zo.onDirectory(()=>{if(Oe)Oe.refresh()});})();
