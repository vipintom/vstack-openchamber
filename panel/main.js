(()=>{var m="openchamber.sdk",g=1;var tt=`
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
`;function qt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(p)=>{let d=p.target===e?r:p.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-oc-scrolling"))d.setAttribute("data-oc-scrolling","");let T=n.get(d);if(T!==void 0)clearTimeout(T);n.set(d,setTimeout(()=>{n.delete(d),d.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Zo=`(${qt.toString()})(document);`;var ot=128,rt=65536;var Re=128;var Ue=65536;var ro=/^[a-z][a-z0-9-]{0,39}$/;var eo=(e)=>Object(e)===e&&!Array.isArray(e),nt=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),to=(e)=>String(e)===e&&e.length>=1&&e.length<=60,oo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,no=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!eo(n)||!ro.test(n.id)||!to(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!nt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!nt(n,["kind","id","label","value","options","disabled"]))return!1;if(!oo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let p=new Set;for(let d of n.options){if(!eo(d)||!nt(d,["value","label"])||!oo(d.value)||!to(d.label)||p.has(d.value))return!1;p.add(d.value)}if(!p.has(n.value))return!1}return!0};var we=20000000,Ce=256;var st=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,so=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var io=/^[A-Za-z0-9_-]{1,80}$/;var ao=["left","right","top","bottom"];var co=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of p)if(!co(d,r+1,n))return!1;return!0},it=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(it);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(it)}return String(e)===e||Number.isFinite(e)},at=(e)=>{try{if(String(e.id)!==e.id||!io.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ao.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!co(e.data)||!it(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var po=["file","directory","other","missing"],dt=(e)=>Boolean(e&&"sessionId"in e),lt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var uo=/^[0-9a-f]{7,64}$/i,pt=(e)=>uo.test(e),Ie=500,Le=32000,Eo=16000,_o=128,fo=200,So=2000,To=16000,ho=80,mo=200,go=16000;var Ao=2000;var ut=20000,Me=1024,Ne=2000000;var Pe=64000,Ge=8000,Et=4000;var _t=960000;var ko=999,xo=1e4,ke=500,Oo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],bo=["stopped","starting","ready","failed"],er=new Set(Oo),vo=(e)=>er.has(e),yo=(e)=>e&&vo(e)?e:"HOST_REJECTED",fe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(fe);if(Object(e)===e)return Object.values(e).every(fe);return!1},Ro=(e)=>fe(e)&&JSON.stringify(e).length<=go,lo=(e)=>e?.trim().slice(0,mo)??"",Se=(e)=>{let r=e.id.trim().slice(0,_o),n=e.title.trim().slice(0,fo),p=e.url.trim().slice(0,So),d=e.text?.trim().slice(0,To),T=e.author?.trim().slice(0,ho),R=e.kind==="pull"?"pull":"issue",u={providerId:e.providerId.trim(),id:r,title:n||r,url:p,kind:R};if(d)u.text=d;if(T)u.author=T;if(R==="pull"){let U=lo(e.branches?.head),j=lo(e.branches?.base);if(U&&j)u.branches={head:U,base:j}}if(Ro(e.data))u.data=e.data;return u},ft=(e)=>{let r=Se(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},St=(e)=>{let r={text:e.text.trim().slice(0,Eo)};if(e.send)r.send=!0;return r},Tt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ko,Math.max(0,Math.round(e)))},ht=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(xo,Math.max(0,Math.ceil(e)))};var Te=(e)=>e.length>0&&e.length<=Me&&!e.includes("\x00")&&!e.includes("\\");var $e=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ao)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},tr=new Set(bo),mt=(e)=>Boolean(e&&"status"in e&&tr.has(String(e.status))&&!("body"in e)),De=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),gt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),At=(e)=>Boolean(e&&"written"in e&&e.written===!0),kt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),or=new Set(po),xt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&or.has(String(e.kind))&&Number.isFinite(e.size)),Ot=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),rr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),nr=(e)=>Object(e)===e?e:null,ct=(e)=>String(e)===e&&e.length>0,sr=(e)=>{if(!ct(e.id))return null;if(e.ok===!0){let r={channel:m,v:g,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&ct(e.error))return{channel:m,v:g,type:"result",id:e.id,ok:!1,error:e.error,code:yo(ct(e.code)?e.code:void 0)};return null},bt=(e)=>{let r=nr(e);if(!r||r.channel!==m||r.v!==g)return null;if(r.type==="result")return sr(r);if(!rr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Uo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ir=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class _ extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var wo=()=>Promise.reject(new _("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),He=()=>Promise.reject(new _("BAD_PATH",`File path must be 1 to ${Me} characters without NUL or backslash.`)),Xe=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new _("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},S=(e)=>(e.value+=1,`oc-${e.value}`),xe=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new _("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),p=e.requestTimeoutMs??ut,d=new Set,T=new Set,R=new Set,u=new Set,U=new Set,j=new Set,ie=new Set,pe=new Set,ue=new Set,oe=new Set,ge=[],re=null,ae=null,Ee=new Set,_e=new Set,ce=null,de=null,J=!1,z=new Map,Y=new Map,a=new Map,f=!1,s={value:0},c=null,h=null,b=!1,G=!1,Ae=null,Ft=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},F=(t)=>{r.parent.postMessage(t,"*")},Vt=()=>{if(f||r.parent===r||oe.size===0||c?.features?.lateGenerateResults!==!0)return;F({channel:m,v:g,type:"generate-late-listen"})},v=(t,o)=>{for(let l of t)try{l(o)}catch(E){console.error(E)}},Bt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=bt(t.data);if(!o)return;if(o.type==="workspace"){let E=Y.get(o.payload.subscriptionId);if(E)v([E],o.payload.snapshot);return}if(o.type==="shells"){let E=a.get(o.payload.subscriptionId);if(E)v([E],o.payload.snapshot);return}if(o.type==="ready"){if(c=o.payload,h=Ft(o.payload.session),v(d,o.payload),v(T,o.payload.directory),v(R,o.payload.session),h)v(u,h);v(U,o.payload.connection),v(j,o.payload.settings),v(ie,o.payload.item),Vt();return}if(o.type==="generate-late"){if(oe.size===0)ge.push(o.payload);else v(oe,o.payload);return}if(o.type==="directory"){if(c)c={...c,directory:o.payload.directory};v(T,o.payload.directory);return}if(o.type==="session"){if(c)c={...c,session:o.payload.session};if(!o.payload.session)h=null;else if(h?.sessionId!==o.payload.session.id)h=Ft(o.payload.session);v(R,o.payload.session);return}if(o.type==="session-lifecycle"){h=o.payload,v(u,o.payload);return}if(o.type==="connection"){if(c)c={...c,connection:o.payload.connection};v(U,o.payload.connection);return}if(o.type==="settings"){if(c)c={...c,settings:o.payload.settings};v(j,o.payload.settings);return}if(o.type==="item"){if(c)c={...c,item:o.payload.item};v(ie,o.payload.item);return}if(o.type==="status-control-event"){v(pe,o.payload);return}if(o.type==="popover-closed"){v(ue,o.payload);return}if(o.type==="action"){let E=(A)=>{if(!f)F({channel:m,v:g,type:"action-result",id:o.id,payload:A})},k=ae;if(!k){E({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>k(o.payload)).then(()=>E({ok:!0}),(A)=>{let I=(A instanceof Error?A.message:String(A)).trim();E({ok:!1,error:(I||"Action failed.").slice(0,ke)})});return}if(o.type==="file-open"){let E=o.payload;if(de&&so(de,E))return;de=E,v(Ee,o.payload);return}if(o.type==="file-saved"){v(_e,o.payload.version);return}if(o.type==="file-snapshot"){let E=(I)=>{if(!f)F({channel:m,v:g,type:"file-snapshot-result",id:o.id,payload:I})},k=(I)=>E({error:(I.trim()||"Could not read the edited file.").slice(0,ke)}),A=ce;if(!A){k("This extension does not edit files.");return}Promise.resolve().then(()=>A(o.payload.purpose)).then((I)=>{if(st(I)>we){k(`The file is over ${we} ${"bytes"in I?"bytes":"characters"}.`);return}if(I.version.length>Ce){k(`The snapshot version is over ${Ce} characters.`);return}E({snapshot:"bytes"in I?{bytes:I.bytes,version:I.version}:{content:I.content,version:I.version}})},(I)=>k(I instanceof Error?I.message:String(I)));return}if(o.type==="resolve"){let E=(A)=>{F({channel:m,v:g,type:"resolve-result",id:o.id,payload:A})},k=re;if(!k){E({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>k(o.payload)).then((A)=>E({item:A?Se(A):null}),(A)=>{let I=(A instanceof Error?A.message:String(A)).trim();E({error:(I||"Command failed.").slice(0,ke)})});return}let l=z.get(o.id);if(!l)return;if(clearTimeout(l.timer),z.delete(o.id),o.ok){l.resolve(o.payload);return}l.reject(new _(o.code,o.error))};r.addEventListener("message",Bt),F({channel:m,v:g,type:"hello"});let M=(t,o=p)=>{if(f||r.parent===r)return Promise.reject(new _("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((l,E)=>{let k=setTimeout(()=>{z.delete(t.id),E(new _("HOST_TIMEOUT","Host did not answer in time."))},o);z.set(t.id,{resolve:l,reject:E,timer:k}),F(t)})},w=(t)=>M(t).then(()=>{return}),C={channel:m,v:g},Ze=(t)=>{if(!f&&r.parent!==r)F(t)},jt=()=>Ze({...C,type:"file-save"}),zt=(t)=>{if(!Uo(t)||!ir(t))return;t.preventDefault(),jt()},Wt=(t)=>{if(!Uo(t)||t.key!=="Escape"||c?.surface!=="popover"||!c.popover)return;t.preventDefault(),Qt(c.popover.id,"escape").catch(()=>{return})},be=()=>{let t=c?.surface==="popover"?c.popover:void 0;if(!t)return;let o=b||G;if(Ae===o)return;Ae=o,Zt(t.id,o).catch(()=>{return})},ve=()=>{if(c?.surface!=="popover"||b)return;b=!0,be()},Kt=(t)=>{if(c?.surface!=="popover"||t.relatedTarget!==null||!b)return;b=!1,be()},Jt=()=>{if(c?.surface!=="popover"||G)return;G=!0,be()},Yt=()=>{if(c?.surface!=="popover"||!G)return;G=!1,be()},W=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new _("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},qe=async(t)=>{if(t.kind!=="projects")W(t.projectId);let o=await M({...C,type:"workspace-read",id:S(s),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new _("HOST_REJECTED","Host did not return workspace data.");return o},et=async(t,o)=>{if(t.kind!=="projects")W(t.projectId);let l=S(s);Y.set(l,o);try{await w({...C,type:"workspace-subscribe",id:S(s),payload:{subscriptionId:l,query:t}})}catch(E){if(Y.delete(l),!f)F({...C,type:"workspace-unsubscribe",id:S(s),payload:{subscriptionId:l}});throw E}return()=>{if(!Y.delete(l)||f)return;F({...C,type:"workspace-unsubscribe",id:S(s),payload:{subscriptionId:l}})}},Qo=async(t,o)=>{if(t.kind==="session")W(t.sessionId);if(t.kind==="project")W(t.projectId);let l=S(s);a.set(l,o);try{await w({...C,type:"shells-subscribe",id:S(s),payload:{subscriptionId:l,scope:t}})}catch(E){if(a.delete(l),!f)F({...C,type:"shells-unsubscribe",id:S(s),payload:{subscriptionId:l}});throw E}return()=>{if(!a.delete(l)||f)return;F({...C,type:"shells-unsubscribe",id:S(s),payload:{subscriptionId:l}})}},ye=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>ot))throw new _("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!fe(t.value))throw new _("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>rt)throw new _("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&c?.features?.deviceStorage!==!0)throw new _("UNSUPPORTED","This host does not support device storage.");let o=await M({...C,type:"storage",id:S(s),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new _("HOST_REJECTED","Host did not return storage data.");return o},Qt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new _("UNSUPPORTED","This host does not support popovers.")):w({...C,type:"popover-close",id:S(s),payload:o?{id:t,reason:o}:{id:t}}),Zt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new _("UNSUPPORTED","This host does not support popovers.")):w({...C,type:"popover-anchor",id:S(s),payload:{id:t,active:o}});return r.addEventListener("keydown",Wt,!0),r.addEventListener("pointerover",ve),r.addEventListener("pointermove",ve),r.addEventListener("pointerout",Kt),r.addEventListener("focus",Jt),r.addEventListener("blur",Yt),{onAction:(t)=>(ae=t,()=>{if(ae===t)ae=null}),listProjects:async()=>{let t=await qe({kind:"projects"});if(t.kind!=="projects")throw new _("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await qe({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new _("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await qe({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new _("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>et({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>et({kind:"worktrees",projectId:t},(l)=>{if(l.kind==="worktrees")o(l)}),onSessions:(t,o)=>et({kind:"sessions",projectId:t},(l)=>{if(l.kind==="sessions")o(l)}),onRunningShells:(t,o)=>Qo(t,o),readShellOutput:async(t,o)=>{W(t,Re);let l=o?.cursor;if(l!==void 0&&(!Number.isInteger(l)||l<0))throw new _("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let E=o?.tailBytes;if(E!==void 0&&(!Number.isInteger(E)||E<1||E>Ue))throw new _("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ue}.`);let A=await M({...C,type:"shell-output",id:S(s),payload:{shellId:t,cursor:l,tailBytes:E}});if(!A||typeof A.output!=="string"||!Number.isFinite(A.cursor))throw new _("HOST_REJECTED","Host did not return shell output.");return A},stopShell:async(t)=>{if(W(t,Re),(await M({...C,type:"shell-stop",id:S(s),payload:{shellId:t}}))?.stopped!==!0)throw new _("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{W(t),await w({...C,type:"open-session",id:S(s),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let l=Xe(o),E={op:"get",key:t};if(l)E.scope=l;let k=await ye(E);return k.op==="get"&&k.found?k.value:void 0},set:async(t,o,l)=>{let E=Xe(l),k={op:"set",key:t,value:o};if(E)k.scope=E;await ye(k)},delete:async(t,o)=>{let l=Xe(o),E={op:"delete",key:t};if(l)E.scope=l;await ye(E)},keys:async(t)=>{let o=Xe(t),l={op:"keys"};if(o)l.scope=o;let E=await ye(l);if(E.op!=="keys")throw new _("HOST_REJECTED","Expected storage keys.");return E.keys}},onReady:(t)=>{if(d.add(t),c)t(c);return()=>{d.delete(t)}},onDirectory:(t)=>{if(T.add(t),c)t(c.directory);return()=>{T.delete(t)}},onSession:(t)=>{if(R.add(t),c)t(c.session);return()=>{R.delete(t)}},onSessionLifecycle:(t)=>{if(u.add(t),h)t(h);return()=>{u.delete(t)}},onConnection:(t)=>{if(U.add(t),c)t(c.connection);return()=>{U.delete(t)}},onSettings:(t)=>{if(j.add(t),c)t(c.settings);return()=>{j.delete(t)}},onItem:(t)=>{if(ie.add(t),c)t(c.item);return()=>{ie.delete(t)}},onStatusControl:(t)=>(pe.add(t),()=>{pe.delete(t)}),onPopoverClosed:(t)=>(ue.add(t),()=>{ue.delete(t)}),setStatusControls:(t)=>{if(c?.features?.statusControls!==!0)return Promise.reject(new _("UNSUPPORTED","This host does not support status controls."));if(!no(t))return Promise.reject(new _("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...C,type:"status-controls",id:S(s),payload:{controls:t}})},openPopover:(t)=>{if(c?.features?.popovers!==!0)return Promise.reject(new _("UNSUPPORTED","This host does not support popovers."));if(!at(t))return Promise.reject(new _("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...C,type:"popover-open",id:S(s),payload:t})},closePopover:Qt,setPopoverAnchorActive:Zt,onResolve:(t)=>(re=t,()=>{if(re===t)re=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Ie)return Promise.reject(new _("HOST_REJECTED",`Toast message must contain 1 to ${Ie} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Le))return Promise.reject(new _("HOST_REJECTED",`Toast copy text must contain 1 to ${Le} characters.`));return w({channel:m,v:g,type:"toast",id:S(s),payload:{...t,message:o}})},openUrl:(t)=>w({channel:m,v:g,type:"open-url",id:S(s),payload:{url:t}}),openCommit:(t)=>pt(t)?w({channel:m,v:g,type:"open-commit",id:S(s),payload:{sha:t}}):Promise.reject(new _("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>w({channel:m,v:g,type:"open-surface",id:S(s),payload:{surfaceId:t}}),writeClipboard:(t)=>w({channel:m,v:g,type:"clipboard-write",id:S(s),payload:{text:t}}),compose:(t)=>w({channel:m,v:g,type:"compose",id:S(s),payload:t}),attach:(t)=>w({channel:m,v:g,type:"attach",id:S(s),payload:Se(t)}),startSession:async(t)=>{if(t.projectId!==void 0)W(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")W(o.directory);else{if(o.name!==void 0)W(o.name,200);if(o.baseBranch!==void 0)W(o.baseBranch,200)}let l=await M({channel:m,v:g,type:"start-session",id:S(s),payload:ft(t)},e.requestTimeoutMs??180000);if(!dt(l))throw new _("HOST_REJECTED","Host did not return a session.");return l},prompt:(t)=>M({channel:m,v:g,type:"prompt",id:S(s),payload:St(t)}).then((o)=>{if(!lt(o))throw new _("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>w({channel:m,v:g,type:"session-link",id:S(s),payload:Se(t)}),close:()=>w({channel:m,v:g,type:"close",id:S(s)}),oauthStart:()=>w({channel:m,v:g,type:"oauth-start",id:S(s)}),oauthDisconnect:()=>w({channel:m,v:g,type:"oauth-disconnect",id:S(s)}),request:(t)=>($e(t.path)?M({channel:m,v:g,type:"request",id:S(s),payload:t}):wo()).then((o)=>{if(!De(o))throw new _("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>($e(t.path)?M({channel:m,v:g,type:"service-request",id:S(s),payload:t}):wo()).then((o)=>{if(!De(o))throw new _("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>M({channel:m,v:g,type:"service-status",id:S(s)}).then((t)=>{if(!mt(t))throw new _("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Te(t)?M({channel:m,v:g,type:"file-read",id:S(s),payload:{path:t}}):He()).then((o)=>{if(!gt(o))throw new _("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!Te(t))return He();if(o.length>Ne)return Promise.reject(new _("FILE_TOO_LARGE",`Content is over ${Ne} characters.`));return M({channel:m,v:g,type:"file-write",id:S(s),payload:{path:t,content:o}}).then((l)=>{if(!At(l))throw new _("HOST_REJECTED","Host did not confirm the write.");return l})},listDir:(t)=>(Te(t)?M({channel:m,v:g,type:"file-list",id:S(s),payload:{path:t}}):He()).then((o)=>{if(!kt(o))throw new _("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(Te(t)?M({channel:m,v:g,type:"file-stat",id:S(s),payload:{path:t}}):He()).then((o)=>{if(!xt(o))throw new _("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),l=t.system?.trim();if(o.length===0||o.length>Pe)return Promise.reject(new _("HOST_REJECTED",`Prompt must be 1 to ${Pe} characters.`));if(l!==void 0&&(l.length===0||l.length>Ge))return Promise.reject(new _("HOST_REJECTED",`System prompt must be 1 to ${Ge} characters.`));let E=t.maxOutputTokens===void 0?void 0:Math.min(Et,Math.max(1,Math.floor(t.maxOutputTokens)));if(E!==void 0&&!Number.isFinite(E))return Promise.reject(new _("HOST_REJECTED","maxOutputTokens must be a number."));let k={prompt:o};if(l!==void 0)k.system=l;if(E!==void 0)k.maxOutputTokens=E;return M({channel:m,v:g,type:"generate",id:S(s),payload:k},e.requestTimeoutMs??_t).then((A)=>{if(!Ot(A))throw new _("HOST_REJECTED","Host did not return generated text.");return A})},onLateGenerateResult:(t)=>{oe.add(t);for(let o of ge.splice(0))v([t],o);return Vt(),()=>{oe.delete(t)}},setBadge:(t)=>w({channel:m,v:g,type:"badge",id:S(s),payload:{count:Tt(t)}}),setHeight:(t)=>w({channel:m,v:g,type:"resize",id:S(s),payload:{height:ht(t)}}),onFileOpen:(t)=>{if(Ee.add(t),!J)J=!0,r.addEventListener("keydown",zt,!0);if(de)t(de);return()=>{Ee.delete(t)}},onFileSnapshot:(t)=>(ce=t,()=>{if(ce===t)ce=null}),onFileSaved:(t)=>(_e.add(t),()=>{_e.delete(t)}),reportFileChange:(t)=>Ze({...C,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:jt,reportFileUnsupported:()=>Ze({...C,type:"file-unsupported"}),dispose:()=>{for(let t of Y.keys())F({...C,type:"workspace-unsubscribe",id:S(s),payload:{subscriptionId:t}});Y.clear();for(let t of a.keys())F({...C,type:"shells-unsubscribe",id:S(s),payload:{subscriptionId:t}});if(a.clear(),f=!0,re=null,ae=null,ce=null,Ee.clear(),_e.clear(),J)r.removeEventListener("keydown",zt,!0);r.removeEventListener("message",Bt),r.removeEventListener("keydown",Wt,!0),r.removeEventListener("pointerover",ve),r.removeEventListener("pointermove",ve),r.removeEventListener("pointerout",Kt),r.removeEventListener("focus",Jt),r.removeEventListener("blur",Yt);for(let t of z.values())clearTimeout(t.timer),t.reject(new _("HOST_UNAVAILABLE","Host client was disposed."));z.clear(),d.clear(),T.clear(),R.clear(),u.clear(),U.clear(),j.clear(),ie.clear(),pe.clear(),ue.clear(),oe.clear(),ge.length=0}}};var Co=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Wr=new Set(Co);var Io=["none","agent","user"];var Jr=new Set(Io);var ar=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],cr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Lo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,p]of ar)r.style.setProperty(n,e.tokens[p]);for(let[n,p,d]of cr){let T=e.tokens[d]??"";r.style.setProperty(n,T),r.style.setProperty(p,T)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},vt=(e,r)=>{if(Lo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var dr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},O=(e,r)=>`var(--${e}, var(--oc-${dr[e]}, ${r}))`,Z=O("surface-background","transparent"),Ve=O("surface-elevated","transparent"),he=O("surface-elevated-foreground","inherit"),V=O("surface-foreground","inherit"),x=O("surface-muted-foreground","gray"),lr=O("surface-muted","transparent"),ne=O("interactive-border","currentColor"),N=O("interactive-hover","transparent"),le=O("interactive-active","transparent"),yt=O("interactive-selection","transparent"),Rt=O("interactive-selection-foreground","inherit"),Q=O("primary","currentColor"),Ut=O("primary-text","inherit"),wt=O("error-text","inherit"),pr=O("font-sans","inherit"),Ct=O("font-mono","monospace"),$o=O("radius","9px"),It=`calc(${$o} - 2px)`,Mo=`calc(${$o} - 4px)`,y=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,No=`background-image: linear-gradient(${N}, ${N});`,Lt=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,Mt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Po="box-shadow: var(--oc-sdk-lit);",Go=`inset 0 1px 0 0 ${y(V,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,ur=`
:root {
  --oc-sdk-edge: ${y(V,10)};
  --oc-sdk-field-bg: ${Ve};
  --oc-sdk-raised-bg: ${Z};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.1);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${y(V,6)};
  --oc-sdk-field-bg: ${y(Z,50,Ve)};
  --oc-sdk-raised-bg: ${Ve};
  --oc-sdk-field-lift: ${Go};
  --oc-sdk-raised-lift: ${Go};
  --oc-sdk-lit: inset 0 1px 0 0 ${y(V,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.36);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Fe=(e)=>{let r=O(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${O(`${e}-text`,"inherit")}; }`},Er=`
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
`,Do=`${ur}
.oc-sdk { color: ${V}; font-family: ${pr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${No} }
.oc-sdk-mono { font-family: ${Ct}; }
.oc-sdk-muted { color: ${x}; }
${Fe("success")}${Fe("warning")}${Fe("error")}${Fe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Q}; --oc-sdk-tone-text: ${Ut}; }

.oc-sdk-btn { border-radius: ${It}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Mo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ut}; background: ${y(Q,10,Z)}; border-color: ${y(Q,12)}; ${Po} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${y(Q,16,Z)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${y(Q,22,Z)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${lr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${he}; ${Mt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${le}, ${le}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${N}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${le}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${O("status-error","red")}; color: ${wt}; background: ${y("var(--oc-sdk-tone)",7,Z)}; border-color: ${y("var(--oc-sdk-tone)",12)}; ${Po} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${y("var(--oc-sdk-tone)",9,Z)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${y("var(--oc-sdk-tone)",11,Z)}; box-shadow: none; }

.oc-sdk-field-note { color: ${x}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${wt}; }
.oc-sdk-input { border-radius: ${It}; background: var(--oc-sdk-field-bg); color: ${he}; ${Lt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${x}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Lt(y(V,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Lt(O("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${Ct}; }

.oc-sdk-search-icon { color: ${x}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Q}; }
.oc-sdk-search-clear { border-radius: ${Mo}; color: ${x}; }
.oc-sdk-search-clear:hover { background: ${N}; color: ${V}; }

.oc-sdk-trigger { border-radius: ${It}; background: var(--oc-sdk-raised-bg); color: ${he}; ${Mt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.oc-sdk-trigger-chevron { color: ${x}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${he}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ve}; background-clip: padding-box; color: ${he}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${N}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${yt}; color: ${Rt}; }
.oc-sdk-option-check { color: ${V}; }
.oc-sdk-option[data-destructive="true"] { color: ${wt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${y(O("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${x}; }
.oc-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ne}; border-radius: 4px; color: ${V}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${y(V,60,ne)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ne}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Z}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Q}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${No} }
.oc-sdk-check-desc { color: ${x}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${y(V,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${V}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Rt}; background: ${yt}; border-color: ${ne}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${he}; background: var(--oc-sdk-raised-bg); ${Mt} }
.oc-sdk-tab-count { color: ${x}; }

.oc-sdk-badge { border-radius: 9999px; background: ${N}; color: ${x}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${N}; }
.oc-sdk-row[aria-selected="true"] { background: ${yt}; color: ${Rt}; }
.oc-sdk-row-lead { font-family: ${Ct}; color: ${x}; }
.oc-sdk-row-sub { color: ${x}; }
.oc-sdk-row-meta { color: ${x}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${x}; }

.oc-sdk-empty-body { color: ${x}; }

.oc-sdk-spinner { color: ${x}; }
.oc-sdk-spinner-ring { border-color: ${ne}; border-top-color: ${Q}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${x}; }

.oc-sdk-separator { color: ${x}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${y(ne,40)}; }

.oc-sdk-progress-label { color: ${x}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${ne}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Q}); }

.oc-sdk-text a { color: ${Ut}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${y(ne,60)}; }
`,P=`
${tt}
${Er}
${Do}`;var Gt=xe();function Je(e){let r=e instanceof Error?e.message:String(e);return/ENOENT|NOT_FOUND|not found|no such file|does not exist/i.test(r)}async function $t(e){return(await Gt.readFile(e)).content}async function hr(){try{return await Gt.listDir(".vstack"),!0}catch(e){if(Je(e))return!1;throw e}}async function mr(){try{return await $t(".vstack/state.json")}catch(e){if(Je(e))return null;throw e}}async function gr(){try{return await $t(".vstack/history.jsonl")}catch(e){if(Je(e))return null;throw e}}async function Ar(){try{let r=(await Gt.listDir(".vstack/deliveries")).entries.filter((p)=>p.kind==="file"&&p.name.endsWith(".json"));return await Promise.all(r.map(async(p)=>({name:p.name,text:await $t(`.vstack/deliveries/${p.name}`)})))}catch(e){if(Je(e))return[];throw e}}var Ke=null;async function Ho(){if(!await hr())return Ke=null,{present:!1,stateText:null,historyText:null,archives:[]};let[r,n]=await Promise.all([mr(),gr()]),p=`${r??""}\x00${n??""}`;if(Ke?.key!==p)Ke={key:p,archives:await Ar()};return{present:!0,stateText:r,historyText:n,archives:Ke.archives}}function ee(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}function L(e){return typeof e==="string"&&e.length>0}function kr(e){return ee(e)&&L(e.id)&&L(e.title)&&typeof e.status==="string"&&L(e.check)&&(e.evidenceId===null||typeof e.evidenceId==="string")&&(e.artifact===null||typeof e.artifact==="string")&&L(e.createdAt)&&L(e.updatedAt)}function Xo(e){if(!ee(e))return{ok:!1,kind:"invalid",message:"delivery is not an object"};if(!L(e.id))return{ok:!1,kind:"invalid",message:"delivery.id is missing"};if(!L(e.title))return{ok:!1,kind:"invalid",message:"delivery.title is missing"};if(!L(e.tier))return{ok:!1,kind:"invalid",message:"delivery.tier is missing"};if(!L(e.playbook))return{ok:!1,kind:"invalid",message:"delivery.playbook is missing"};if(!L(e.phase))return{ok:!1,kind:"invalid",message:"delivery.phase is missing"};if(!L(e.status))return{ok:!1,kind:"invalid",message:"delivery.status is missing"};if(!Array.isArray(e.tasks)||!e.tasks.every(kr))return{ok:!1,kind:"invalid",message:"delivery.tasks is malformed"};if(!Array.isArray(e.evidence)||!e.evidence.every(ee))return{ok:!1,kind:"invalid",message:"delivery.evidence is malformed"};if(!Array.isArray(e.decisions)||!e.decisions.every(ee))return{ok:!1,kind:"invalid",message:"delivery.decisions is malformed"};if(!Array.isArray(e.handoffs)||!e.handoffs.every(ee))return{ok:!1,kind:"invalid",message:"delivery.handoffs is malformed"};if(!L(e.createdAt)||!L(e.updatedAt))return{ok:!1,kind:"invalid",message:"delivery timestamps are missing"};if(e.closedAt!==null&&!L(e.closedAt))return{ok:!1,kind:"invalid",message:"delivery.closedAt is malformed"};return{ok:!0,value:e}}function Fo(e){let r;try{r=JSON.parse(e)}catch{return{ok:!1,kind:"invalid",message:"state.json is not valid JSON"}}if(!ee(r))return{ok:!1,kind:"invalid",message:"state is not an object"};if(typeof r.schemaVersion!=="number")return{ok:!1,kind:"invalid",message:"schemaVersion is missing"};if(r.schemaVersion!==1){if(r.schemaVersion>1)return{ok:!1,kind:"incompatible",message:`state schema ${r.schemaVersion} is newer than this panel reads (1)`};return{ok:!1,kind:"invalid",message:`unknown state schema ${r.schemaVersion}`}}if(typeof r.revision!=="number")return{ok:!1,kind:"invalid",message:"revision is missing"};if(!L(r.createdAt)||!L(r.updatedAt))return{ok:!1,kind:"invalid",message:"state timestamps are missing"};if(r.delivery!==null&&!ee(r.delivery))return{ok:!1,kind:"invalid",message:"delivery is malformed"};if(r.delivery!==null){let n=Xo(r.delivery);if(!n.ok)return n}return{ok:!0,value:r}}function Vo(e){let r=[],n=e.split(`
`).filter((p)=>p.trim().length>0);for(let[p,d]of n.entries()){let T;try{T=JSON.parse(d)}catch{return{ok:!1,kind:"invalid",message:`history line ${p+1} is not JSON`}}if(!ee(T)||!L(T.ts)||!L(T.type)||!L(T.deliveryId)||!ee(T.data))return{ok:!1,kind:"invalid",message:`history line ${p+1} is malformed`};r.push(T)}return{ok:!0,value:r}}function Bo(e){let r=[],n=[];for(let p of e){let d;try{d=JSON.parse(p.text)}catch{n.push(`${p.name} is not JSON`);continue}let T=Xo(d);if(!T.ok){n.push(`${p.name}: ${T.message}`);continue}r.push(T.value)}return{deliveries:r,errors:n}}function jo(e){if(!e.present)return{state:"missing",title:"Missing",detail:"No .vstack/ directory in this project. Open a delivery with vstack_route to start recording."};if(e.stateError&&!e.stateError.ok)return{state:e.stateError.kind==="incompatible"?"incompatible":"invalid",title:e.stateError.kind==="incompatible"?"Incompatible":"Invalid",detail:e.stateError.message};if(!e.state)return{state:"invalid",title:"Invalid",detail:"state.json could not be read."};if(e.historyError&&!e.historyError.ok)return{state:"invalid",title:"Invalid",detail:e.historyError.message};if(e.archiveErrors.length>0)return{state:"invalid",title:"Invalid",detail:e.archiveErrors.join("; ")};let r=e.events.at(-1);if(r&&typeof r.revision==="number"){if(r.revision!==e.state.revision)return{state:"stale",title:"Stale",detail:`The last event is revision ${r.revision}; state.json is revision ${e.state.revision}. The recorder may have stopped mid-write.`}}else if(r&&r.ts>e.state.updatedAt)return{state:"stale",title:"Stale",detail:"The history is newer than state.json. The recorder may have stopped mid-write."};return{state:"healthy",title:"Healthy",detail:"State is present, current and readable."}}function Dt(e,r){let n=new Map;for(let d of r)n.set(d.id,d);let p=e?.delivery;if(p)n.set(p.id,p);return[...n.values()].sort((d,T)=>{if(d.status==="active"&&T.status!=="active")return-1;if(T.status==="active"&&d.status!=="active")return 1;return T.updatedAt.localeCompare(d.updatedAt)})}function zo(e){return e.tasks.find((r)=>r.status==="doing")??e.tasks.find((r)=>r.status==="todo")}function Ye(e,r){if(!r.evidenceId)return"not run";let n=e.evidence.find((p)=>p.id===r.evidenceId);return n?`${n.result} (${n.id})`:"missing evidence"}function Ht(e){return e.handoffs.at(-1)}function Xt(e){return{done:e.tasks.filter((r)=>r.status==="done").length,total:e.tasks.length}}function se(e){if(!e)return"—";let r=new Date(e);if(Number.isNaN(r.getTime()))return e;return r.toLocaleString()}function Wo(e){return e.length>18?`${e.slice(0,18)}…`:e}var te=[{id:"now",label:"Now"},{id:"plan",label:"Plan"},{id:"evidence",label:"Evidence"},{id:"timeline",label:"Timeline"},{id:"decisions",label:"Decisions"},{id:"deliveries",label:"Deliveries"},{id:"health",label:"Health"}];var xr=3000;function i(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Qe(e){if(["passed","done","healthy","closed","judgement"].includes(e))return"success";if(["failed","blocked","invalid","incompatible","missing"].includes(e))return"error";if(["stale","doing","active","parked"].includes(e))return"warning";return"neutral"}function K(e){return`<span class="badge tone-${Qe(e)}">${i(e)}</span>`}function B(e){return`<button class="copy" data-copy="${i(e)}" title="Copy command">Copy</button>`}function X(e,r){return`<div class="empty"><strong>${i(e)}</strong><p>${i(r)}</p></div>`}function Ko(e){return`${i(e.title)} <span class="muted">${i(e.id)}</span>`}function Or(e){let r=Xt(e),n=Ht(e),p=e.tasks.map((u)=>`<tr>
        <td>${i(u.id)}</td>
        <td>${i(u.title)}</td>
        <td>${K(u.status)}</td>
        <td>${i(Ye(e,u))}</td>
        <td><code>${i(u.check)}</code></td>
      </tr>`).join(""),d=e.evidence.map((u)=>`<tr>
        <td>${i(u.id)}</td>
        <td>${i(u.claim)}</td>
        <td>${K(u.result)}</td>
        <td><code>${i(u.check)}</code></td>
        <td>${i(u.artifact??"—")}</td>
      </tr>`).join(""),T=e.decisions.map((u)=>`<li><strong>${i(u.choice)}</strong> — ${i(u.reason)}
        <div class="muted">Alternatives: ${i(u.alternatives)}. Consequence: ${i(u.consequence)}. Owner: ${i(u.owner)}.</div></li>`).join(""),R=e.close?.waiver;return`<section class="card">
      <div class="row-between">
        <h2>${Ko(e)}</h2>
        ${K(e.status)}
      </div>
      <p>${i(e.outcome)}</p>
      <dl class="facts">
        <dt>Tier</dt><dd>${i(e.tier)}</dd>
        <dt>Playbook</dt><dd>${i(e.playbook)}</dd>
        <dt>Phase</dt><dd>${i(e.phase)}</dd>
        <dt>Done when</dt><dd>${i(e.doneWhen)}</dd>
        <dt>Tasks</dt><dd>${r.done}/${r.total} done</dd>
        <dt>Updated</dt><dd>${i(se(e.updatedAt))}</dd>
        <dt>Closed</dt><dd>${i(se(e.closedAt))}</dd>
        <dt>Record</dt><dd><code>${i(e.close?.recordPath??`.vstack/deliveries/${e.id}.md`)}</code>
          ${B(`cat ${e.close?.recordPath??`.vstack/deliveries/${e.id}.md`}`)}</dd>
      </dl>
      ${R?`<p class="callout tone-warning"><strong>Waiver</strong> ${i(R.reason)} — accepted by ${i(R.owner)}.</p>`:""}
    </section>
    <section class="card">
      <h3>Tasks</h3>
      ${p?`<div class="scroll"><table><thead><tr><th>ID</th><th>Task</th><th>Status</th><th>Evidence</th><th>Check</th></tr></thead><tbody>${p}</tbody></table></div>`:X("No tasks recorded","Add one with vstack_task.")}
    </section>
    <section class="card">
      <h3>Evidence</h3>
      ${d?`<div class="scroll"><table><thead><tr><th>ID</th><th>Claim</th><th>Result</th><th>Check</th><th>Artifact</th></tr></thead><tbody>${d}</tbody></table></div>`:X("No evidence recorded","A task cannot complete without it.")}
    </section>
    <section class="card">
      <h3>Decisions</h3>
      ${T?`<ul>${T}</ul>`:X("No decisions recorded","Record one with vstack_decision.")}
    </section>
    <section class="card">
      <h3>Handoff</h3>
      ${n?`<p><strong>${i(n.state)}</strong> → ${i(n.nextAction)}</p>
             <p class="muted">Blockers: ${n.blockers.length?i(n.blockers.join(", ")):"none"}. Tree: ${i(n.treeStatus||"unknown")}.</p>`:X("No handoff recorded","Record one with vstack_handoff.")}
    </section>`}function Jo(e,r){let n=r.view??"now",p=null,d=null,T=[],R=[],u={state:"missing",title:"Missing",detail:"Not read yet."};e.innerHTML=`<div class="vstack">
    <header>
      <div class="brand"><span class="mark">v</span><span>vstack</span><span id="health-badge"></span></div>
      <div class="actions">
        <button id="refresh" class="secondary">Refresh</button>
      </div>
    </header>
    <div id="health-banner" class="banner" aria-live="polite"></div>
    <nav class="tabs" role="tablist">${te.map((a)=>`<button role="tab" id="tab-${a.id}" data-view="${a.id}" aria-controls="view" aria-selected="false">${i(a.label)}</button>`).join("")}</nav>
    <main id="view" role="tabpanel"></main>
    <footer id="footer" class="muted"></footer>
  </div>`;let U=e.querySelector("#view"),j=e.querySelector("#health-banner"),ie=e.querySelector("#health-badge"),pe=e.querySelector("#footer");function ue(){ie.innerHTML=K(u.state),j.className=`banner tone-${Qe(u.state)}`,j.innerHTML=`<strong>${i(u.title)}</strong> ${i(u.detail)}`,e.querySelectorAll("[data-view]").forEach((f)=>{let s=f.dataset.view===n;f.classList.toggle("active",s),f.setAttribute("aria-selected",String(s)),f.tabIndex=s?0:-1}),U.setAttribute("aria-labelledby",`tab-${n}`);let a=d?`revision ${d.revision}`:"no state";pe.textContent=`${a} · ${T.length} events · ${R.length} archived deliveries`}function oe(){let a=d?.delivery;if(!a)return`<section class="card">${X("No delivery recorded","Open one with vstack_route. The panel never invents a delivery or a task.")}<p class="command"><code>vstack_route</code>${B("vstack_route")}</p></section>`;let f=zo(a),s=Ht(a);return`<section class="card">
        <div class="row-between"><h2>${Ko(a)}</h2>${K(a.status)}</div>
        <p>${i(a.outcome)}</p>
        <dl class="facts">
          <dt>Phase</dt><dd>${i(a.phase)}</dd>
          <dt>Tier</dt><dd>${i(a.tier)}</dd>
          <dt>Playbook</dt><dd>${i(a.playbook)}</dd>
          <dt>Done when</dt><dd>${i(a.doneWhen)}</dd>
          <dt>Next task</dt><dd>${f?`${i(f.title)} <span class="muted">${i(f.id)}</span>`:"none"}</dd>
          <dt>Next action</dt><dd>${s?.nextAction?i(s.nextAction):"none recorded"}</dd>
          <dt>Blockers</dt><dd>${s?.blockers.length?i(s.blockers.join(", ")):"none recorded"}</dd>
          <dt>Last activity</dt><dd>${i(se(a.updatedAt))}</dd>
        </dl>
        <p class="muted">${a.tasks.filter((c)=>c.status==="done").length}/${a.tasks.length} tasks done · ${a.evidence.length} evidence records</p>
      </section>
      <section class="card">
        <h3>Commands</h3>
        <p class="command"><code>vstack_task {"action":"add","title":"…","check":"…"}</code>${B('vstack_task {"action":"add","title":"…","check":"…"}')}</p>
        <p class="command"><code>vstack_evidence {"claim":"…","check":"…","result":"passed"}</code>${B('vstack_evidence {"claim":"…","check":"…","result":"passed"}')}</p>
        <p class="command"><code>vstack_close</code>${B("vstack_close")}</p>
      </section>`}function ge(){let a=d?.delivery;if(!a)return X("No plan recorded","Open a delivery and add tasks.");return`<section class="card">
      <h2>Plan</h2>
      ${[{status:"doing",label:"Doing"},{status:"todo",label:"Todo"},{status:"blocked",label:"Blocked"},{status:"done",label:"Done"}].map((c)=>{let h=a.tasks.filter((b)=>b.status===c.status);if(h.length===0)return"";return`<h3>${c.label} (${h.length})</h3>
          <div class="scroll"><table><thead><tr><th>ID</th><th>Task</th><th>Check</th><th>Evidence</th><th>Command</th></tr></thead><tbody>
          ${h.map((b)=>{let G=b.status==="done"?`vstack_task {"action":"complete","taskId":"${b.id}"}`:`vstack_task {"action":"start","taskId":"${b.id}"}`;return`<tr><td>${i(b.id)}</td><td>${i(b.title)}</td><td><code>${i(b.check)}</code></td><td>${i(Ye(a,b))}</td><td class="command"><code>${i(G)}</code>${B(G)}</td></tr>`}).join("")}
          </tbody></table></div>`}).join("")||X("No tasks recorded","Add one with vstack_task.")}
    </section>`}function re(a){return`<div class="scroll"><table><thead><tr><th>ID</th><th>Claim</th><th>Result</th><th>Check</th><th>Artifact</th><th>Time</th></tr></thead><tbody>
      ${a.map((f)=>`<tr><td>${i(f.id)}</td><td>${i(f.claim)}</td><td>${K(f.result)}</td><td><code>${i(f.check)}</code></td><td>${i(f.artifact??"—")}</td><td>${i(se(f.createdAt))}</td></tr>`).join("")}
      </tbody></table></div>`}function ae(){let a=d?.delivery;if(!a)return X("No evidence recorded","Open a delivery first.");let f=new Set,s=a.tasks.map((h)=>{let b=a.evidence.filter((G)=>{let Ae=G.taskId===h.id||h.evidenceId===G.id;if(Ae)f.add(G.id);return Ae});return`<h3>${i(h.title)} <span class="muted">${i(h.id)}</span> ${K(Ye(a,h))}</h3>
          ${b.length?re(b):'<p class="callout tone-warning">not run — no evidence recorded for this task.</p>'}`}).join(""),c=a.evidence.filter((h)=>!f.has(h.id));return`<section class="card">
      <h2>Evidence</h2>
      ${s||X("No tasks recorded","Evidence is grouped by task; a task with no evidence shows not run.")}
      ${c.length?`<h3>Unlinked evidence</h3>${re(c)}`:""}
      ${a.evidence.length===0?X("No evidence recorded","A task without evidence shows not run."):""}
    </section>`}function Ee(){return`<section class="card">
      <h2>Timeline</h2>
      ${T.length?`<div class="scroll"><table><thead><tr><th>Time</th><th>Event</th><th>Delivery</th><th>Data</th></tr></thead><tbody>
            ${T.map((a)=>`<tr><td>${i(se(a.ts))}</td><td>${K(a.type)}</td><td><code>${i(Wo(a.deliveryId))}</code></td><td><code>${i(JSON.stringify(a.data))}</code></td></tr>`).join("")}
            </tbody></table></div>`:X("No events recorded","The recorder writes history.jsonl on every change.")}
    </section>`}function _e(){let a=d?.delivery,f=a?.decisions??[],s=a?.close?.waiver,c=a?.close?.review;return`<section class="card">
      <h2>Decisions</h2>
      ${f.length?`<ul>${f.map((h)=>`<li><strong>${i(h.choice)}</strong> — ${i(h.reason)}
                  <div class="muted">Alternatives: ${i(h.alternatives)}. Consequence: ${i(h.consequence)}. Owner: ${i(h.owner)}.</div>
                  <div class="muted">${i(se(h.createdAt))}</div></li>`).join("")}</ul>`:X("No decisions recorded","Record one with vstack_decision.")}
      ${c?`<h3>Review</h3><p>${K(c.outcome)} ${i(c.notes||"no notes")} — ${i(c.owner)}</p>`:""}
      ${s?`<h3>Waiver</h3><p class="callout tone-warning">${i(s.reason)} — accepted by ${i(s.owner)}.</p>`:""}
    </section>`}function ce(){let a=Dt(d,R);if(a.length===0)return`<section class="card">${X("No deliveries recorded","Closed deliveries are kept in .vstack/deliveries/. Open one with vstack_route.")}<p class="command"><code>vstack_route</code>${B("vstack_route")}</p></section>`;if(!p)p=a[0].id;let f=a.find((s)=>s.id===p)??a[0];return`<section class="card">
        <h2>Deliveries</h2>
        <p class="muted">Every delivery recorded in this project, newest first. Closed records stay in <code>.vstack/deliveries/</code>.</p>
        <div class="scroll"><table class="deliveries"><thead><tr><th>Delivery</th><th>Status</th><th>Tier</th><th>Tasks</th><th>Evidence</th><th>Updated</th></tr></thead><tbody>
        ${a.map((s)=>{let c=Xt(s);return`<tr data-delivery="${i(s.id)}" class="${s.id===p?"selected":""}">
              <td><strong>${i(s.title)}</strong><div class="muted">${i(s.id)}</div></td>
              <td>${K(s.status)}</td>
              <td>${i(s.tier)}</td>
              <td>${c.done}/${c.total}</td>
              <td>${s.evidence.length}</td>
              <td>${i(se(s.updatedAt))}</td>
            </tr>`}).join("")}
        </tbody></table></div>
      </section>
      ${Or(f)}`}function de(){return`<section class="card">
      <h2>Health</h2>
      <dl class="facts">${[["State",u.state],["Detail",u.detail],["Schema",d?String(d.schemaVersion):"—"],["Revision",d?String(d.revision):"—"],["State path",".vstack/state.json"],["History path",".vstack/history.jsonl"],["Archive path",".vstack/deliveries/"],["History events",String(T.length)],["Archived deliveries",String(R.length)]].map(([f,s])=>`<dt>${i(f)}</dt><dd>${i(s)}</dd>`).join("")}</dl>
      <h3>Next action</h3>
      ${u.state==="missing"?`<p>Install and enable the recorder, then open a delivery.</p><p class="command"><code>vstack_route</code>${B("vstack_route")}</p>`:u.state==="incompatible"?`<p>Update the panel to a version that reads schema ${d?.schemaVersion??"newer"}.</p><p class="command"><code>cat .vstack/state.json</code>${B("cat .vstack/state.json")}</p>`:u.state==="invalid"?`<p class="callout tone-error">A required record is malformed. Fix or move the named file; the panel will not invent values.</p><p class="command"><code>cat .vstack/state.json</code>${B("cat .vstack/state.json")}</p>`:u.state==="stale"?`<p>Run a recorder command to rewrite state, or refresh after the current command finishes.</p><p class="command"><code>cat .vstack/history.jsonl</code>${B("cat .vstack/history.jsonl")}</p>`:"<p>No action. Every value above comes from a recorded file.</p>"}
    </section>`}function J(){if(ue(),u.state==="missing"){U.innerHTML=`<section class="card">${X("No vstack state","This project has no .vstack/ directory. The panel is read-only; the recorder creates state.")}<p class="command"><code>vstack_route</code>${B("vstack_route")}</p></section>`;return}if(u.state==="incompatible"){U.innerHTML=`<section class="card"><h2>${i(u.title)}</h2><p class="callout tone-${Qe(u.state)}">${i(u.detail)}</p>
        <p class="muted">Open Health for the file and schema details.</p></section>`;return}if(u.state==="invalid"&&!(n==="deliveries"&&R.length>0)){U.innerHTML=`<section class="card"><h2>${i(u.title)}</h2><p class="callout tone-${Qe(u.state)}">${i(u.detail)}</p>
        <p class="muted">Open Health for the file and schema details.</p></section>`;return}switch(n){case"now":U.innerHTML=oe();break;case"plan":U.innerHTML=ge();break;case"evidence":U.innerHTML=ae();break;case"timeline":U.innerHTML=Ee();break;case"decisions":U.innerHTML=_e();break;case"deliveries":U.innerHTML=ce();break;case"health":U.innerHTML=de();break}}async function z(){try{let a=await r.read(),f=a.stateText===null?null:Fo(a.stateText),s=a.historyText===null?{ok:!0,value:[]}:Vo(a.historyText),c=Bo(a.archives);if(d=f?.ok?f.value:null,T=s.ok?s.value:[],R=c.deliveries,u=jo({present:a.present,state:d,stateError:f,events:T,historyError:s.ok?null:s,archiveErrors:c.errors}),p&&!Dt(d,R).some((h)=>h.id===p))p=null;J()}catch(a){u={state:"invalid",title:"Read failed",detail:a instanceof Error?a.message:String(a)},d=null,T=[],R=[],J()}}e.addEventListener("keydown",(a)=>{let s=a.target.closest("[data-view]");if(!s||a.key!=="ArrowRight"&&a.key!=="ArrowLeft")return;let h=(te.findIndex((G)=>G.id===s.dataset.view)+(a.key==="ArrowRight"?1:-1)+te.length)%te.length,b=e.querySelector(`[data-view="${te[h].id}"]`);if(b)a.preventDefault(),n=te[h].id,J(),b.focus()}),e.addEventListener("click",(a)=>{let f=a.target,s=f.closest("[data-view]");if(s?.dataset.view){n=s.dataset.view,J();return}let c=f.closest("[data-delivery]");if(c?.dataset.delivery){p=c.dataset.delivery,n="deliveries",J();return}let h=f.closest("[data-copy]");if(h?.dataset.copy){navigator.clipboard.writeText(h.dataset.copy).then(()=>{h.textContent="Copied",window.setTimeout(()=>{h.textContent="Copy"},1200)}).catch(()=>{h.textContent="Select and copy"});return}if(f.closest("#refresh"))z()}),z();let Y=window.setInterval(()=>{if(document.visibilityState==="visible")z()},xr);return window.addEventListener("beforeunload",()=>window.clearInterval(Y)),{refresh:z,destroy:()=>{window.clearInterval(Y)}}}var Yo=xe(),Oe=null;Yo.onReady((e)=>{if(vt(e,document.documentElement),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,!Oe){let r=document.getElementById("app");if(!r)throw Error("vstack panel root is missing");let n=document.body.dataset.view,p=te.find((d)=>d.id===n)?.id;Oe=Jo(r,{read:Ho,...p?{view:p}:{}})}else Oe.refresh()});Yo.onDirectory(()=>{if(Oe)Oe.refresh()});})();
