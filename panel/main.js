(()=>{var m="openchamber.sdk",A=1;var Ye=`
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
`;function Qt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(d)=>{let a=d.target===e?r:d.target;if(!(a instanceof Element))return;if(!a.hasAttribute("data-oc-scrolling"))a.setAttribute("data-oc-scrolling","");let T=n.get(a);if(T!==void 0)clearTimeout(T);n.set(a,setTimeout(()=>{n.delete(a),a.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Yo=`(${Qt.toString()})(document);`;var Qe=128,Ze=65536;var ve=128;var ye=65536;var to=/^[a-z][a-z0-9-]{0,39}$/;var Zt=(e)=>Object(e)===e&&!Array.isArray(e),qe=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),qt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,eo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,oo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!Zt(n)||!to.test(n.id)||!qt(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!qe(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!qe(n,["kind","id","label","value","options","disabled"]))return!1;if(!eo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let d=new Set;for(let a of n.options){if(!Zt(a)||!qe(a,["value","label"])||!eo(a.value)||!qt(a.label)||d.has(a.value))return!1;d.add(a.value)}if(!d.has(n.value))return!1}return!0};var Re=20000000,Ue=256;var et=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,ro=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var no=/^[A-Za-z0-9_-]{1,80}$/;var so=["left","right","top","bottom"];var io=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let d=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let a of d)if(!io(a,r+1,n))return!1;return!0},tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(tt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(tt)}return String(e)===e||Number.isFinite(e)},ot=(e)=>{try{if(String(e.id)!==e.id||!no.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!so.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!io(e.data)||!tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var co=["file","directory","other","missing"],nt=(e)=>Boolean(e&&"sessionId"in e),st=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var lo=/^[0-9a-f]{7,64}$/i,it=(e)=>lo.test(e),Ce=500,we=32000,po=16000,uo=128,Eo=200,_o=2000,fo=16000,So=80,To=200,ho=16000;var mo=2000;var at=20000,Ie=1024,Le=2000000;var Me=64000,Ne=8000,ct=4000;var dt=960000;var Ao=999,go=1e4,Ae=500,xo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Oo=["stopped","starting","ready","failed"],Zo=new Set(xo),ko=(e)=>Zo.has(e),bo=(e)=>e&&ko(e)?e:"HOST_REJECTED",ue=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ue);if(Object(e)===e)return Object.values(e).every(ue);return!1},vo=(e)=>ue(e)&&JSON.stringify(e).length<=ho,ao=(e)=>e?.trim().slice(0,To)??"",Ee=(e)=>{let r=e.id.trim().slice(0,uo),n=e.title.trim().slice(0,Eo),d=e.url.trim().slice(0,_o),a=e.text?.trim().slice(0,fo),T=e.author?.trim().slice(0,So),C=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:r,title:n||r,url:d,kind:C};if(a)E.text=a;if(T)E.author=T;if(C==="pull"){let I=ao(e.branches?.head),F=ao(e.branches?.base);if(I&&F)E.branches={head:I,base:F}}if(vo(e.data))E.data=e.data;return E},lt=(e)=>{let r=Ee(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},pt=(e)=>{let r={text:e.text.trim().slice(0,po)};if(e.send)r.send=!0;return r},ut=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Ao,Math.max(0,Math.round(e)))},Et=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(go,Math.max(0,Math.ceil(e)))};var _e=(e)=>e.length>0&&e.length<=Ie&&!e.includes("\x00")&&!e.includes("\\");var Pe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>mo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},qo=new Set(Oo),_t=(e)=>Boolean(e&&"status"in e&&qo.has(String(e.status))&&!("body"in e)),Ge=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),ft=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),St=(e)=>Boolean(e&&"written"in e&&e.written===!0),Tt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),er=new Set(co),ht=(e)=>Boolean(e&&"kind"in e&&"size"in e&&er.has(String(e.kind))&&Number.isFinite(e.size)),mt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),tr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),or=(e)=>Object(e)===e?e:null,rt=(e)=>String(e)===e&&e.length>0,rr=(e)=>{if(!rt(e.id))return null;if(e.ok===!0){let r={channel:m,v:A,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&rt(e.error))return{channel:m,v:A,type:"result",id:e.id,ok:!1,error:e.error,code:bo(rt(e.code)?e.code:void 0)};return null},At=(e)=>{let r=or(e);if(!r||r.channel!==m||r.v!==A)return null;if(r.type==="result")return rr(r);if(!tr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var yo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),nr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class _ extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Ro=()=>Promise.reject(new _("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),De=()=>Promise.reject(new _("BAD_PATH",`File path must be 1 to ${Ie} characters without NUL or backslash.`)),$e=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new _("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},S=(e)=>(e.value+=1,`oc-${e.value}`),ge=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new _("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),d=e.requestTimeoutMs??at,a=new Set,T=new Set,C=new Set,E=new Set,I=new Set,F=new Set,re=new Set,ce=new Set,de=new Set,Z=new Set,Te=[],ne=null,se=null,le=new Set,pe=new Set,ie=null,B=null,q=!1,j=new Map,i=new Map,f=new Map,h=!1,p={value:0},l=null,z=null,he=!1,me=!1,$t=null,Ht=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},D=(t)=>{r.parent.postMessage(t,"*")},Xt=()=>{if(h||r.parent===r||Z.size===0||l?.features?.lateGenerateResults!==!0)return;D({channel:m,v:A,type:"generate-late-listen"})},b=(t,o)=>{for(let c of t)try{c(o)}catch(u){console.error(u)}},Ft=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=At(t.data);if(!o)return;if(o.type==="workspace"){let u=i.get(o.payload.subscriptionId);if(u)b([u],o.payload.snapshot);return}if(o.type==="shells"){let u=f.get(o.payload.subscriptionId);if(u)b([u],o.payload.snapshot);return}if(o.type==="ready"){if(l=o.payload,z=Ht(o.payload.session),b(a,o.payload),b(T,o.payload.directory),b(C,o.payload.session),z)b(E,z);b(I,o.payload.connection),b(F,o.payload.settings),b(re,o.payload.item),Xt();return}if(o.type==="generate-late"){if(Z.size===0)Te.push(o.payload);else b(Z,o.payload);return}if(o.type==="directory"){if(l)l={...l,directory:o.payload.directory};b(T,o.payload.directory);return}if(o.type==="session"){if(l)l={...l,session:o.payload.session};if(!o.payload.session)z=null;else if(z?.sessionId!==o.payload.session.id)z=Ht(o.payload.session);b(C,o.payload.session);return}if(o.type==="session-lifecycle"){z=o.payload,b(E,o.payload);return}if(o.type==="connection"){if(l)l={...l,connection:o.payload.connection};b(I,o.payload.connection);return}if(o.type==="settings"){if(l)l={...l,settings:o.payload.settings};b(F,o.payload.settings);return}if(o.type==="item"){if(l)l={...l,item:o.payload.item};b(re,o.payload.item);return}if(o.type==="status-control-event"){b(ce,o.payload);return}if(o.type==="popover-closed"){b(de,o.payload);return}if(o.type==="action"){let u=(g)=>{if(!h)D({channel:m,v:A,type:"action-result",id:o.id,payload:g})},x=se;if(!x){u({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>x(o.payload)).then(()=>u({ok:!0}),(g)=>{let U=(g instanceof Error?g.message:String(g)).trim();u({ok:!1,error:(U||"Action failed.").slice(0,Ae)})});return}if(o.type==="file-open"){let u=o.payload;if(B&&ro(B,u))return;B=u,b(le,o.payload);return}if(o.type==="file-saved"){b(pe,o.payload.version);return}if(o.type==="file-snapshot"){let u=(U)=>{if(!h)D({channel:m,v:A,type:"file-snapshot-result",id:o.id,payload:U})},x=(U)=>u({error:(U.trim()||"Could not read the edited file.").slice(0,Ae)}),g=ie;if(!g){x("This extension does not edit files.");return}Promise.resolve().then(()=>g(o.payload.purpose)).then((U)=>{if(et(U)>Re){x(`The file is over ${Re} ${"bytes"in U?"bytes":"characters"}.`);return}if(U.version.length>Ue){x(`The snapshot version is over ${Ue} characters.`);return}u({snapshot:"bytes"in U?{bytes:U.bytes,version:U.version}:{content:U.content,version:U.version}})},(U)=>x(U instanceof Error?U.message:String(U)));return}if(o.type==="resolve"){let u=(g)=>{D({channel:m,v:A,type:"resolve-result",id:o.id,payload:g})},x=ne;if(!x){u({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>x(o.payload)).then((g)=>u({item:g?Ee(g):null}),(g)=>{let U=(g instanceof Error?g.message:String(g)).trim();u({error:(U||"Command failed.").slice(0,Ae)})});return}let c=j.get(o.id);if(!c)return;if(clearTimeout(c.timer),j.delete(o.id),o.ok){c.resolve(o.payload);return}c.reject(new _(o.code,o.error))};r.addEventListener("message",Ft),D({channel:m,v:A,type:"hello"});let L=(t,o=d)=>{if(h||r.parent===r)return Promise.reject(new _("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((c,u)=>{let x=setTimeout(()=>{j.delete(t.id),u(new _("HOST_TIMEOUT","Host did not answer in time."))},o);j.set(t.id,{resolve:c,reject:u,timer:x}),D(t)})},y=(t)=>L(t).then(()=>{return}),R={channel:m,v:A},We=(t)=>{if(!h&&r.parent!==r)D(t)},Vt=()=>We({...R,type:"file-save"}),Bt=(t)=>{if(!yo(t)||!nr(t))return;t.preventDefault(),Vt()},jt=(t)=>{if(!yo(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),Jt(l.popover.id,"escape").catch(()=>{return})},Oe=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let o=he||me;if($t===o)return;$t=o,Yt(t.id,o).catch(()=>{return})},ke=()=>{if(l?.surface!=="popover"||he)return;he=!0,Oe()},zt=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!he)return;he=!1,Oe()},Wt=()=>{if(l?.surface!=="popover"||me)return;me=!0,Oe()},Kt=()=>{if(l?.surface!=="popover"||!me)return;me=!1,Oe()},V=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new _("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Ke=async(t)=>{if(t.kind!=="projects")V(t.projectId);let o=await L({...R,type:"workspace-read",id:S(p),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new _("HOST_REJECTED","Host did not return workspace data.");return o},Je=async(t,o)=>{if(t.kind!=="projects")V(t.projectId);let c=S(p);i.set(c,o);try{await y({...R,type:"workspace-subscribe",id:S(p),payload:{subscriptionId:c,query:t}})}catch(u){if(i.delete(c),!h)D({...R,type:"workspace-unsubscribe",id:S(p),payload:{subscriptionId:c}});throw u}return()=>{if(!i.delete(c)||h)return;D({...R,type:"workspace-unsubscribe",id:S(p),payload:{subscriptionId:c}})}},Jo=async(t,o)=>{if(t.kind==="session")V(t.sessionId);if(t.kind==="project")V(t.projectId);let c=S(p);f.set(c,o);try{await y({...R,type:"shells-subscribe",id:S(p),payload:{subscriptionId:c,scope:t}})}catch(u){if(f.delete(c),!h)D({...R,type:"shells-unsubscribe",id:S(p),payload:{subscriptionId:c}});throw u}return()=>{if(!f.delete(c)||h)return;D({...R,type:"shells-unsubscribe",id:S(p),payload:{subscriptionId:c}})}},be=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Qe))throw new _("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ue(t.value))throw new _("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Ze)throw new _("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new _("UNSUPPORTED","This host does not support device storage.");let o=await L({...R,type:"storage",id:S(p),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new _("HOST_REJECTED","Host did not return storage data.");return o},Jt=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new _("UNSUPPORTED","This host does not support popovers.")):y({...R,type:"popover-close",id:S(p),payload:o?{id:t,reason:o}:{id:t}}),Yt=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new _("UNSUPPORTED","This host does not support popovers.")):y({...R,type:"popover-anchor",id:S(p),payload:{id:t,active:o}});return r.addEventListener("keydown",jt,!0),r.addEventListener("pointerover",ke),r.addEventListener("pointermove",ke),r.addEventListener("pointerout",zt),r.addEventListener("focus",Wt),r.addEventListener("blur",Kt),{onAction:(t)=>(se=t,()=>{if(se===t)se=null}),listProjects:async()=>{let t=await Ke({kind:"projects"});if(t.kind!=="projects")throw new _("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await Ke({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new _("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await Ke({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new _("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Je({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Je({kind:"worktrees",projectId:t},(c)=>{if(c.kind==="worktrees")o(c)}),onSessions:(t,o)=>Je({kind:"sessions",projectId:t},(c)=>{if(c.kind==="sessions")o(c)}),onRunningShells:(t,o)=>Jo(t,o),readShellOutput:async(t,o)=>{V(t,ve);let c=o?.cursor;if(c!==void 0&&(!Number.isInteger(c)||c<0))throw new _("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let u=o?.tailBytes;if(u!==void 0&&(!Number.isInteger(u)||u<1||u>ye))throw new _("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ye}.`);let g=await L({...R,type:"shell-output",id:S(p),payload:{shellId:t,cursor:c,tailBytes:u}});if(!g||typeof g.output!=="string"||!Number.isFinite(g.cursor))throw new _("HOST_REJECTED","Host did not return shell output.");return g},stopShell:async(t)=>{if(V(t,ve),(await L({...R,type:"shell-stop",id:S(p),payload:{shellId:t}}))?.stopped!==!0)throw new _("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{V(t),await y({...R,type:"open-session",id:S(p),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let c=$e(o),u={op:"get",key:t};if(c)u.scope=c;let x=await be(u);return x.op==="get"&&x.found?x.value:void 0},set:async(t,o,c)=>{let u=$e(c),x={op:"set",key:t,value:o};if(u)x.scope=u;await be(x)},delete:async(t,o)=>{let c=$e(o),u={op:"delete",key:t};if(c)u.scope=c;await be(u)},keys:async(t)=>{let o=$e(t),c={op:"keys"};if(o)c.scope=o;let u=await be(c);if(u.op!=="keys")throw new _("HOST_REJECTED","Expected storage keys.");return u.keys}},onReady:(t)=>{if(a.add(t),l)t(l);return()=>{a.delete(t)}},onDirectory:(t)=>{if(T.add(t),l)t(l.directory);return()=>{T.delete(t)}},onSession:(t)=>{if(C.add(t),l)t(l.session);return()=>{C.delete(t)}},onSessionLifecycle:(t)=>{if(E.add(t),z)t(z);return()=>{E.delete(t)}},onConnection:(t)=>{if(I.add(t),l)t(l.connection);return()=>{I.delete(t)}},onSettings:(t)=>{if(F.add(t),l)t(l.settings);return()=>{F.delete(t)}},onItem:(t)=>{if(re.add(t),l)t(l.item);return()=>{re.delete(t)}},onStatusControl:(t)=>(ce.add(t),()=>{ce.delete(t)}),onPopoverClosed:(t)=>(de.add(t),()=>{de.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new _("UNSUPPORTED","This host does not support status controls."));if(!oo(t))return Promise.reject(new _("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return y({...R,type:"status-controls",id:S(p),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new _("UNSUPPORTED","This host does not support popovers."));if(!ot(t))return Promise.reject(new _("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return y({...R,type:"popover-open",id:S(p),payload:t})},closePopover:Jt,setPopoverAnchorActive:Yt,onResolve:(t)=>(ne=t,()=>{if(ne===t)ne=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Ce)return Promise.reject(new _("HOST_REJECTED",`Toast message must contain 1 to ${Ce} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>we))return Promise.reject(new _("HOST_REJECTED",`Toast copy text must contain 1 to ${we} characters.`));return y({channel:m,v:A,type:"toast",id:S(p),payload:{...t,message:o}})},openUrl:(t)=>y({channel:m,v:A,type:"open-url",id:S(p),payload:{url:t}}),openCommit:(t)=>it(t)?y({channel:m,v:A,type:"open-commit",id:S(p),payload:{sha:t}}):Promise.reject(new _("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>y({channel:m,v:A,type:"open-surface",id:S(p),payload:{surfaceId:t}}),writeClipboard:(t)=>y({channel:m,v:A,type:"clipboard-write",id:S(p),payload:{text:t}}),compose:(t)=>y({channel:m,v:A,type:"compose",id:S(p),payload:t}),attach:(t)=>y({channel:m,v:A,type:"attach",id:S(p),payload:Ee(t)}),startSession:async(t)=>{if(t.projectId!==void 0)V(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")V(o.directory);else{if(o.name!==void 0)V(o.name,200);if(o.baseBranch!==void 0)V(o.baseBranch,200)}let c=await L({channel:m,v:A,type:"start-session",id:S(p),payload:lt(t)},e.requestTimeoutMs??180000);if(!nt(c))throw new _("HOST_REJECTED","Host did not return a session.");return c},prompt:(t)=>L({channel:m,v:A,type:"prompt",id:S(p),payload:pt(t)}).then((o)=>{if(!st(o))throw new _("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>y({channel:m,v:A,type:"session-link",id:S(p),payload:Ee(t)}),close:()=>y({channel:m,v:A,type:"close",id:S(p)}),oauthStart:()=>y({channel:m,v:A,type:"oauth-start",id:S(p)}),oauthDisconnect:()=>y({channel:m,v:A,type:"oauth-disconnect",id:S(p)}),request:(t)=>(Pe(t.path)?L({channel:m,v:A,type:"request",id:S(p),payload:t}):Ro()).then((o)=>{if(!Ge(o))throw new _("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Pe(t.path)?L({channel:m,v:A,type:"service-request",id:S(p),payload:t}):Ro()).then((o)=>{if(!Ge(o))throw new _("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>L({channel:m,v:A,type:"service-status",id:S(p)}).then((t)=>{if(!_t(t))throw new _("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(_e(t)?L({channel:m,v:A,type:"file-read",id:S(p),payload:{path:t}}):De()).then((o)=>{if(!ft(o))throw new _("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!_e(t))return De();if(o.length>Le)return Promise.reject(new _("FILE_TOO_LARGE",`Content is over ${Le} characters.`));return L({channel:m,v:A,type:"file-write",id:S(p),payload:{path:t,content:o}}).then((c)=>{if(!St(c))throw new _("HOST_REJECTED","Host did not confirm the write.");return c})},listDir:(t)=>(_e(t)?L({channel:m,v:A,type:"file-list",id:S(p),payload:{path:t}}):De()).then((o)=>{if(!Tt(o))throw new _("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(_e(t)?L({channel:m,v:A,type:"file-stat",id:S(p),payload:{path:t}}):De()).then((o)=>{if(!ht(o))throw new _("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),c=t.system?.trim();if(o.length===0||o.length>Me)return Promise.reject(new _("HOST_REJECTED",`Prompt must be 1 to ${Me} characters.`));if(c!==void 0&&(c.length===0||c.length>Ne))return Promise.reject(new _("HOST_REJECTED",`System prompt must be 1 to ${Ne} characters.`));let u=t.maxOutputTokens===void 0?void 0:Math.min(ct,Math.max(1,Math.floor(t.maxOutputTokens)));if(u!==void 0&&!Number.isFinite(u))return Promise.reject(new _("HOST_REJECTED","maxOutputTokens must be a number."));let x={prompt:o};if(c!==void 0)x.system=c;if(u!==void 0)x.maxOutputTokens=u;return L({channel:m,v:A,type:"generate",id:S(p),payload:x},e.requestTimeoutMs??dt).then((g)=>{if(!mt(g))throw new _("HOST_REJECTED","Host did not return generated text.");return g})},onLateGenerateResult:(t)=>{Z.add(t);for(let o of Te.splice(0))b([t],o);return Xt(),()=>{Z.delete(t)}},setBadge:(t)=>y({channel:m,v:A,type:"badge",id:S(p),payload:{count:ut(t)}}),setHeight:(t)=>y({channel:m,v:A,type:"resize",id:S(p),payload:{height:Et(t)}}),onFileOpen:(t)=>{if(le.add(t),!q)q=!0,r.addEventListener("keydown",Bt,!0);if(B)t(B);return()=>{le.delete(t)}},onFileSnapshot:(t)=>(ie=t,()=>{if(ie===t)ie=null}),onFileSaved:(t)=>(pe.add(t),()=>{pe.delete(t)}),reportFileChange:(t)=>We({...R,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Vt,reportFileUnsupported:()=>We({...R,type:"file-unsupported"}),dispose:()=>{for(let t of i.keys())D({...R,type:"workspace-unsubscribe",id:S(p),payload:{subscriptionId:t}});i.clear();for(let t of f.keys())D({...R,type:"shells-unsubscribe",id:S(p),payload:{subscriptionId:t}});if(f.clear(),h=!0,ne=null,se=null,ie=null,le.clear(),pe.clear(),q)r.removeEventListener("keydown",Bt,!0);r.removeEventListener("message",Ft),r.removeEventListener("keydown",jt,!0),r.removeEventListener("pointerover",ke),r.removeEventListener("pointermove",ke),r.removeEventListener("pointerout",zt),r.removeEventListener("focus",Wt),r.removeEventListener("blur",Kt);for(let t of j.values())clearTimeout(t.timer),t.reject(new _("HOST_UNAVAILABLE","Host client was disposed."));j.clear(),a.clear(),T.clear(),C.clear(),E.clear(),I.clear(),F.clear(),re.clear(),ce.clear(),de.clear(),Z.clear(),Te.length=0}}};var Uo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var jr=new Set(Uo);var Co=["none","agent","user"];var Wr=new Set(Co);var sr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],ir=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],wo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,d]of sr)r.style.setProperty(n,e.tokens[d]);for(let[n,d,a]of ir){let T=e.tokens[a]??"";r.style.setProperty(n,T),r.style.setProperty(d,T)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},gt=(e,r)=>{if(wo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var ar={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},k=(e,r)=>`var(--${e}, var(--oc-${ar[e]}, ${r}))`,K=k("surface-background","transparent"),Xe=k("surface-elevated","transparent"),fe=k("surface-elevated-foreground","inherit"),X=k("surface-foreground","inherit"),O=k("surface-muted-foreground","gray"),cr=k("surface-muted","transparent"),ee=k("interactive-border","currentColor"),M=k("interactive-hover","transparent"),ae=k("interactive-active","transparent"),xt=k("interactive-selection","transparent"),Ot=k("interactive-selection-foreground","inherit"),W=k("primary","currentColor"),kt=k("primary-text","inherit"),bt=k("error-text","inherit"),dr=k("font-sans","inherit"),vt=k("font-mono","monospace"),Po=k("radius","9px"),yt=`calc(${Po} - 2px)`,Io=`calc(${Po} - 4px)`,v=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Lo=`background-image: linear-gradient(${M}, ${M});`,Rt=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,Ut="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Mo="box-shadow: var(--oc-sdk-lit);",No=`inset 0 1px 0 0 ${v(X,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,lr=`
:root {
  --oc-sdk-edge: ${v(X,10)};
  --oc-sdk-field-bg: ${Xe};
  --oc-sdk-raised-bg: ${K};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.1);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${v(X,6)};
  --oc-sdk-field-bg: ${v(K,50,Xe)};
  --oc-sdk-raised-bg: ${Xe};
  --oc-sdk-field-lift: ${No};
  --oc-sdk-raised-lift: ${No};
  --oc-sdk-lit: inset 0 1px 0 0 ${v(X,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.36);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,He=(e)=>{let r=k(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${k(`${e}-text`,"inherit")}; }`},pr=`
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
`,Go=`${lr}
.oc-sdk { color: ${X}; font-family: ${dr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Lo} }
.oc-sdk-mono { font-family: ${vt}; }
.oc-sdk-muted { color: ${O}; }
${He("success")}${He("warning")}${He("error")}${He("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${W}; --oc-sdk-tone-text: ${kt}; }

.oc-sdk-btn { border-radius: ${yt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Io}; }
.oc-sdk-btn[data-variant="default"] { color: ${kt}; background: ${v(W,10,K)}; border-color: ${v(W,12)}; ${Mo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${v(W,16,K)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${v(W,22,K)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${cr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${fe}; ${Ut} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ae}, ${ae}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ae}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${k("status-error","red")}; color: ${bt}; background: ${v("var(--oc-sdk-tone)",7,K)}; border-color: ${v("var(--oc-sdk-tone)",12)}; ${Mo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${v("var(--oc-sdk-tone)",9,K)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${v("var(--oc-sdk-tone)",11,K)}; box-shadow: none; }

.oc-sdk-field-note { color: ${O}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${bt}; }
.oc-sdk-input { border-radius: ${yt}; background: var(--oc-sdk-field-bg); color: ${fe}; ${Rt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${O}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Rt(v(X,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Rt(k("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${vt}; }

.oc-sdk-search-icon { color: ${O}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${W}; }
.oc-sdk-search-clear { border-radius: ${Io}; color: ${O}; }
.oc-sdk-search-clear:hover { background: ${M}; color: ${X}; }

.oc-sdk-trigger { border-radius: ${yt}; background: var(--oc-sdk-raised-bg); color: ${fe}; ${Ut} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${O}; }
.oc-sdk-trigger-chevron { color: ${O}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${fe}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Xe}; background-clip: padding-box; color: ${fe}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${M}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${xt}; color: ${Ot}; }
.oc-sdk-option-check { color: ${X}; }
.oc-sdk-option[data-destructive="true"] { color: ${bt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${v(k("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${O}; }
.oc-sdk-popup-empty { color: ${O}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ee}; border-radius: 4px; color: ${X}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${v(X,60,ee)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ee}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${K}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${W}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Lo} }
.oc-sdk-check-desc { color: ${O}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${v(X,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${O}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${X}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ot}; background: ${xt}; border-color: ${ee}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${fe}; background: var(--oc-sdk-raised-bg); ${Ut} }
.oc-sdk-tab-count { color: ${O}; }

.oc-sdk-badge { border-radius: 9999px; background: ${M}; color: ${O}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${v("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${M}; }
.oc-sdk-row[aria-selected="true"] { background: ${xt}; color: ${Ot}; }
.oc-sdk-row-lead { font-family: ${vt}; color: ${O}; }
.oc-sdk-row-sub { color: ${O}; }
.oc-sdk-row-meta { color: ${O}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${O}; }

.oc-sdk-empty-body { color: ${O}; }

.oc-sdk-spinner { color: ${O}; }
.oc-sdk-spinner-ring { border-color: ${ee}; border-top-color: ${W}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${v("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${O}; }

.oc-sdk-separator { color: ${O}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${v(ee,40)}; }

.oc-sdk-progress-label { color: ${O}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${ee}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${W}); }

.oc-sdk-text a { color: ${kt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${v(ee,60)}; }
`,N=`
${Ye}
${pr}
${Go}`;var It=ge();async function Lt(e){return(await It.readFile(e)).content}async function Sr(){try{return await It.listDir(".vstack"),!0}catch(e){let r=e instanceof Error?e.message:String(e);if(/ENOENT|not found|no such file|does not exist/i.test(r))return!1;throw e}}async function Tr(){try{return await Lt(".vstack/state.json")}catch{return null}}async function hr(){try{return await Lt(".vstack/history.jsonl")}catch{return null}}async function mr(){try{let r=(await It.listDir(".vstack/deliveries")).entries.filter((d)=>d.kind==="file"&&d.name.endsWith(".json"));return await Promise.all(r.map(async(d)=>({name:d.name,text:await Lt(`.vstack/deliveries/${d.name}`)})))}catch(e){let r=e instanceof Error?e.message:String(e);if(/ENOENT|not found|no such file|does not exist/i.test(r))return[];throw e}}async function Do(){if(!await Sr())return{present:!1,stateText:null,historyText:null,archives:[]};let[r,n,d]=await Promise.all([Tr(),hr(),mr()]);return{present:!0,stateText:r,historyText:n,archives:d}}function Y(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}function w(e){return typeof e==="string"&&e.length>0}function Ar(e){return Y(e)&&w(e.id)&&w(e.title)&&typeof e.status==="string"&&w(e.check)&&(e.evidenceId===null||typeof e.evidenceId==="string")&&(e.artifact===null||typeof e.artifact==="string")&&w(e.createdAt)&&w(e.updatedAt)}function $o(e){if(!Y(e))return{ok:!1,kind:"invalid",message:"delivery is not an object"};if(!w(e.id))return{ok:!1,kind:"invalid",message:"delivery.id is missing"};if(!w(e.title))return{ok:!1,kind:"invalid",message:"delivery.title is missing"};if(!w(e.tier))return{ok:!1,kind:"invalid",message:"delivery.tier is missing"};if(!w(e.playbook))return{ok:!1,kind:"invalid",message:"delivery.playbook is missing"};if(!w(e.phase))return{ok:!1,kind:"invalid",message:"delivery.phase is missing"};if(!w(e.status))return{ok:!1,kind:"invalid",message:"delivery.status is missing"};if(!Array.isArray(e.tasks)||!e.tasks.every(Ar))return{ok:!1,kind:"invalid",message:"delivery.tasks is malformed"};if(!Array.isArray(e.evidence)||!e.evidence.every(Y))return{ok:!1,kind:"invalid",message:"delivery.evidence is malformed"};if(!Array.isArray(e.decisions)||!e.decisions.every(Y))return{ok:!1,kind:"invalid",message:"delivery.decisions is malformed"};if(!Array.isArray(e.handoffs)||!e.handoffs.every(Y))return{ok:!1,kind:"invalid",message:"delivery.handoffs is malformed"};if(!w(e.createdAt)||!w(e.updatedAt))return{ok:!1,kind:"invalid",message:"delivery timestamps are missing"};if(e.closedAt!==null&&!w(e.closedAt))return{ok:!1,kind:"invalid",message:"delivery.closedAt is malformed"};return{ok:!0,value:e}}function Ho(e){let r;try{r=JSON.parse(e)}catch{return{ok:!1,kind:"invalid",message:"state.json is not valid JSON"}}if(!Y(r))return{ok:!1,kind:"invalid",message:"state is not an object"};if(typeof r.schemaVersion!=="number")return{ok:!1,kind:"invalid",message:"schemaVersion is missing"};if(r.schemaVersion!==1){if(r.schemaVersion>1)return{ok:!1,kind:"incompatible",message:`state schema ${r.schemaVersion} is newer than this panel reads (1)`};return{ok:!1,kind:"invalid",message:`unknown state schema ${r.schemaVersion}`}}if(typeof r.revision!=="number")return{ok:!1,kind:"invalid",message:"revision is missing"};if(!w(r.createdAt)||!w(r.updatedAt))return{ok:!1,kind:"invalid",message:"state timestamps are missing"};if(r.delivery!==null&&!Y(r.delivery))return{ok:!1,kind:"invalid",message:"delivery is malformed"};if(r.delivery!==null){let n=$o(r.delivery);if(!n.ok)return n}return{ok:!0,value:r}}function Xo(e){let r=[],n=e.split(`
`).filter((d)=>d.trim().length>0);for(let[d,a]of n.entries()){let T;try{T=JSON.parse(a)}catch{return{ok:!1,kind:"invalid",message:`history line ${d+1} is not JSON`}}if(!Y(T)||!w(T.ts)||!w(T.type)||!w(T.deliveryId)||!Y(T.data))return{ok:!1,kind:"invalid",message:`history line ${d+1} is malformed`};r.push(T)}return{ok:!0,value:r}}function Fo(e){let r=[],n=[];for(let d of e){let a;try{a=JSON.parse(d.text)}catch{n.push(`${d.name} is not JSON`);continue}let T=$o(a);if(!T.ok){n.push(`${d.name}: ${T.message}`);continue}r.push(T.value)}return{deliveries:r,errors:n}}function Vo(e){if(!e.present)return{state:"missing",title:"Missing",detail:"No .vstack/ directory in this project. Open a delivery with vstack_route to start recording."};if(e.stateError&&!e.stateError.ok)return{state:e.stateError.kind==="incompatible"?"incompatible":"invalid",title:e.stateError.kind==="incompatible"?"Incompatible":"Invalid",detail:e.stateError.message};if(!e.state)return{state:"invalid",title:"Invalid",detail:"state.json could not be read."};if(e.historyError&&!e.historyError.ok)return{state:"invalid",title:"Invalid",detail:e.historyError.message};if(e.archiveErrors.length>0)return{state:"invalid",title:"Invalid",detail:e.archiveErrors.join("; ")};let r=e.events.at(-1);if(r&&r.ts>e.state.updatedAt)return{state:"stale",title:"Stale",detail:"The history is newer than state.json. The recorder may have stopped mid-write."};return{state:"healthy",title:"Healthy",detail:"State is present, current and readable."}}function Mt(e,r){let n=new Map;for(let a of r)n.set(a.id,a);let d=e?.delivery;if(d&&!n.has(d.id))n.set(d.id,d);return[...n.values()].sort((a,T)=>{if(a.status==="active"&&T.status!=="active")return-1;if(T.status==="active"&&a.status!=="active")return 1;return T.updatedAt.localeCompare(a.updatedAt)})}function Bo(e){return e.tasks.find((r)=>r.status==="doing")??e.tasks.find((r)=>r.status==="todo")}function Nt(e,r){if(!r.evidenceId)return"not run";let n=e.evidence.find((d)=>d.id===r.evidenceId);return n?`${n.result} (${n.id})`:"missing evidence"}function Pt(e){return e.handoffs.at(-1)}function Gt(e){return{done:e.tasks.filter((r)=>r.status==="done").length,total:e.tasks.length}}function te(e){if(!e)return"—";let r=new Date(e);if(Number.isNaN(r.getTime()))return e;return r.toLocaleString()}function jo(e){return e.length>18?`${e.slice(0,18)}…`:e}var ze=[{id:"now",label:"Now"},{id:"plan",label:"Plan"},{id:"evidence",label:"Evidence"},{id:"timeline",label:"Timeline"},{id:"decisions",label:"Decisions"},{id:"deliveries",label:"Deliveries"},{id:"health",label:"Health"}];var gr=3000;function s(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Dt(e){if(["passed","done","healthy","closed","judgement"].includes(e))return"success";if(["failed","blocked","invalid","incompatible","missing"].includes(e))return"error";if(["stale","doing","active","parked"].includes(e))return"warning";return"neutral"}function Q(e){return`<span class="badge tone-${Dt(e)}">${s(e)}</span>`}function oe(e){return`<button class="copy" data-copy="${s(e)}" title="Copy command">Copy</button>`}function H(e,r){return`<div class="empty"><strong>${s(e)}</strong><p>${s(r)}</p></div>`}function zo(e){return`${s(e.title)} <span class="muted">${s(e.id)}</span>`}function xr(e){let r=Gt(e),n=Pt(e),d=e.tasks.map((E)=>`<tr>
        <td>${s(E.id)}</td>
        <td>${s(E.title)}</td>
        <td>${Q(E.status)}</td>
        <td>${s(Nt(e,E))}</td>
        <td><code>${s(E.check)}</code></td>
      </tr>`).join(""),a=e.evidence.map((E)=>`<tr>
        <td>${s(E.id)}</td>
        <td>${s(E.claim)}</td>
        <td>${Q(E.result)}</td>
        <td><code>${s(E.check)}</code></td>
        <td>${s(E.artifact??"—")}</td>
      </tr>`).join(""),T=e.decisions.map((E)=>`<li><strong>${s(E.choice)}</strong> — ${s(E.reason)}
        <div class="muted">Alternatives: ${s(E.alternatives)}. Consequence: ${s(E.consequence)}. Owner: ${s(E.owner)}.</div></li>`).join(""),C=e.close?.waiver;return`<section class="card">
      <div class="row-between">
        <h2>${zo(e)}</h2>
        ${Q(e.status)}
      </div>
      <p>${s(e.outcome)}</p>
      <dl class="facts">
        <dt>Tier</dt><dd>${s(e.tier)}</dd>
        <dt>Playbook</dt><dd>${s(e.playbook)}</dd>
        <dt>Phase</dt><dd>${s(e.phase)}</dd>
        <dt>Done when</dt><dd>${s(e.doneWhen)}</dd>
        <dt>Tasks</dt><dd>${r.done}/${r.total} done</dd>
        <dt>Updated</dt><dd>${s(te(e.updatedAt))}</dd>
        <dt>Closed</dt><dd>${s(te(e.closedAt))}</dd>
        <dt>Record</dt><dd><code>${s(e.close?.recordPath??`.vstack/deliveries/${e.id}.md`)}</code>
          ${oe(`cat ${e.close?.recordPath??`.vstack/deliveries/${e.id}.md`}`)}</dd>
      </dl>
      ${C?`<p class="callout tone-warning"><strong>Waiver</strong> ${s(C.reason)} — accepted by ${s(C.owner)}.</p>`:""}
    </section>
    <section class="card">
      <h3>Tasks</h3>
      ${d?`<div class="scroll"><table><thead><tr><th>ID</th><th>Task</th><th>Status</th><th>Evidence</th><th>Check</th></tr></thead><tbody>${d}</tbody></table></div>`:H("No tasks recorded","Add one with vstack_task.")}
    </section>
    <section class="card">
      <h3>Evidence</h3>
      ${a?`<div class="scroll"><table><thead><tr><th>ID</th><th>Claim</th><th>Result</th><th>Check</th><th>Artifact</th></tr></thead><tbody>${a}</tbody></table></div>`:H("No evidence recorded","A task cannot complete without it.")}
    </section>
    <section class="card">
      <h3>Decisions</h3>
      ${T?`<ul>${T}</ul>`:H("No decisions recorded","Record one with vstack_decision.")}
    </section>
    <section class="card">
      <h3>Handoff</h3>
      ${n?`<p><strong>${s(n.state)}</strong> → ${s(n.nextAction)}</p>
             <p class="muted">Blockers: ${n.blockers.length?s(n.blockers.join(", ")):"none"}. Tree: ${s(n.treeStatus||"unknown")}.</p>`:H("No handoff recorded","Record one with vstack_handoff.")}
    </section>`}function Wo(e,r){let n=r.view??"now",d=null,a=null,T=[],C=[],E={state:"missing",title:"Missing",detail:"Not read yet."};e.innerHTML=`<div class="vstack">
    <header>
      <div class="brand"><span class="mark">v</span><span>vstack</span><span id="health-badge"></span></div>
      <div class="actions">
        <button id="refresh" class="secondary">Refresh</button>
      </div>
    </header>
    <div id="health-banner" class="banner"></div>
    <nav class="tabs" role="tablist">${ze.map((i)=>`<button role="tab" data-view="${i.id}" aria-selected="false">${s(i.label)}</button>`).join("")}</nav>
    <main id="view"></main>
    <footer id="footer" class="muted"></footer>
  </div>`;let I=e.querySelector("#view"),F=e.querySelector("#health-banner"),re=e.querySelector("#health-badge"),ce=e.querySelector("#footer");function de(){re.innerHTML=Q(E.state),F.className=`banner tone-${Dt(E.state)}`,F.innerHTML=`<strong>${s(E.title)}</strong> ${s(E.detail)}`,e.querySelectorAll("[data-view]").forEach((f)=>{let h=f.dataset.view===n;f.classList.toggle("active",h),f.setAttribute("aria-selected",String(h))});let i=a?`revision ${a.revision}`:"no state";ce.textContent=`${i} · ${T.length} events · ${C.length} archived deliveries`}function Z(){let i=a?.delivery;if(!i)return`<section class="card">${H("No delivery recorded","Open one with vstack_route. The panel never invents a delivery or a task.")}<p class="command"><code>vstack_route</code>${oe("vstack_route")}</p></section>`;let f=Bo(i),h=Pt(i);return`<section class="card">
        <div class="row-between"><h2>${zo(i)}</h2>${Q(i.status)}</div>
        <p>${s(i.outcome)}</p>
        <dl class="facts">
          <dt>Phase</dt><dd>${s(i.phase)}</dd>
          <dt>Tier</dt><dd>${s(i.tier)}</dd>
          <dt>Playbook</dt><dd>${s(i.playbook)}</dd>
          <dt>Done when</dt><dd>${s(i.doneWhen)}</dd>
          <dt>Next task</dt><dd>${f?`${s(f.title)} <span class="muted">${s(f.id)}</span>`:"none"}</dd>
          <dt>Blockers</dt><dd>${h?.blockers.length?s(h.blockers.join(", ")):"none recorded"}</dd>
          <dt>Last activity</dt><dd>${s(te(i.updatedAt))}</dd>
        </dl>
        <p class="muted">${i.tasks.filter((p)=>p.status==="done").length}/${i.tasks.length} tasks done · ${i.evidence.length} evidence records</p>
      </section>
      <section class="card">
        <h3>Commands</h3>
        <p class="command"><code>vstack_task {"action":"add","title":"…","check":"…"}</code>${oe('vstack_task {"action":"add","title":"…","check":"…"}')}</p>
        <p class="command"><code>vstack_evidence {"claim":"…","check":"…","result":"passed"}</code>${oe('vstack_evidence {"claim":"…","check":"…","result":"passed"}')}</p>
        <p class="command"><code>vstack_close</code>${oe("vstack_close")}</p>
      </section>`}function Te(){let i=a?.delivery;if(!i)return H("No plan recorded","Open a delivery and add tasks.");return`<section class="card">
      <h2>Plan</h2>
      <div class="scroll"><table><thead><tr><th>ID</th><th>Task</th><th>Status</th><th>Check</th><th>Evidence</th></tr></thead><tbody>
      ${i.tasks.map((f)=>`<tr><td>${s(f.id)}</td><td>${s(f.title)}</td><td>${Q(f.status)}</td><td><code>${s(f.check)}</code></td><td>${s(Nt(i,f))}</td></tr>`).join("")}
      </tbody></table></div>
      ${i.tasks.length===0?H("No tasks recorded","Add one with vstack_task."):""}
    </section>`}function ne(){let i=a?.delivery;if(!i)return H("No evidence recorded","Open a delivery first.");return`<section class="card">
      <h2>Evidence</h2>
      <div class="scroll"><table><thead><tr><th>ID</th><th>Claim</th><th>Result</th><th>Check</th><th>Artifact</th><th>Time</th></tr></thead><tbody>
      ${i.evidence.map((f)=>`<tr><td>${s(f.id)}</td><td>${s(f.claim)}</td><td>${Q(f.result)}</td><td><code>${s(f.check)}</code></td><td>${s(f.artifact??"—")}</td><td>${s(te(f.createdAt))}</td></tr>`).join("")}
      </tbody></table></div>
      ${i.evidence.length===0?H("No evidence recorded","A task without evidence shows not run."):""}
    </section>`}function se(){return`<section class="card">
      <h2>Timeline</h2>
      ${T.length?`<div class="scroll"><table><thead><tr><th>Time</th><th>Event</th><th>Delivery</th><th>Data</th></tr></thead><tbody>
            ${T.map((i)=>`<tr><td>${s(te(i.ts))}</td><td>${Q(i.type)}</td><td><code>${s(jo(i.deliveryId))}</code></td><td><code>${s(JSON.stringify(i.data))}</code></td></tr>`).join("")}
            </tbody></table></div>`:H("No events recorded","The recorder writes history.jsonl on every change.")}
    </section>`}function le(){let i=a?.delivery?.decisions??[];return`<section class="card">
      <h2>Decisions</h2>
      ${i.length?`<ul>${i.map((f)=>`<li><strong>${s(f.choice)}</strong> — ${s(f.reason)}
                  <div class="muted">Alternatives: ${s(f.alternatives)}. Consequence: ${s(f.consequence)}. Owner: ${s(f.owner)}.</div>
                  <div class="muted">${s(te(f.createdAt))}</div></li>`).join("")}</ul>`:H("No decisions recorded","Record one with vstack_decision.")}
    </section>`}function pe(){let i=Mt(a,C);if(i.length===0)return`<section class="card">${H("No deliveries recorded","Closed deliveries are kept in .vstack/deliveries/. Open one with vstack_route.")}<p class="command"><code>vstack_route</code>${oe("vstack_route")}</p></section>`;if(!d)d=i[0].id;let f=i.find((h)=>h.id===d)??i[0];return`<section class="card">
        <h2>Deliveries</h2>
        <p class="muted">Every delivery recorded in this project, newest first. Closed records stay in <code>.vstack/deliveries/</code>.</p>
        <div class="scroll"><table class="deliveries"><thead><tr><th>Delivery</th><th>Status</th><th>Tier</th><th>Tasks</th><th>Evidence</th><th>Updated</th></tr></thead><tbody>
        ${i.map((h)=>{let p=Gt(h);return`<tr data-delivery="${s(h.id)}" class="${h.id===d?"selected":""}">
              <td><strong>${s(h.title)}</strong><div class="muted">${s(h.id)}</div></td>
              <td>${Q(h.status)}</td>
              <td>${s(h.tier)}</td>
              <td>${p.done}/${p.total}</td>
              <td>${h.evidence.length}</td>
              <td>${s(te(h.updatedAt))}</td>
            </tr>`}).join("")}
        </tbody></table></div>
      </section>
      ${xr(f)}`}function ie(){return`<section class="card">
      <h2>Health</h2>
      <dl class="facts">${[["State",E.state],["Detail",E.detail],["Schema",a?String(a.schemaVersion):"—"],["Revision",a?String(a.revision):"—"],["State path",".vstack/state.json"],["History path",".vstack/history.jsonl"],["Archive path",".vstack/deliveries/"],["History events",String(T.length)],["Archived deliveries",String(C.length)]].map(([f,h])=>`<dt>${s(f)}</dt><dd>${s(h)}</dd>`).join("")}</dl>
      <h3>Next action</h3>
      ${E.state==="missing"?`<p>Install and enable the recorder, then open a delivery.</p><p class="command"><code>vstack_route</code>${oe("vstack_route")}</p>`:E.state==="incompatible"?`<p>Update the panel to a version that reads schema ${a?.schemaVersion??"newer"}.</p>`:E.state==="invalid"?'<p class="callout tone-error">A required record is malformed. Fix or move the named file; the panel will not invent values.</p>':E.state==="stale"?"<p>Run a recorder command to rewrite state, or refresh after the current command finishes.</p>":"<p>No action. Every value above comes from a recorded file.</p>"}
    </section>`}function B(){if(de(),E.state==="missing"){I.innerHTML=`<section class="card">${H("No vstack state","This project has no .vstack/ directory. The panel is read-only; the recorder creates state.")}<p class="command"><code>vstack_route</code>${oe("vstack_route")}</p></section>`;return}if(E.state==="incompatible"||E.state==="invalid"){I.innerHTML=`<section class="card"><h2>${s(E.title)}</h2><p class="callout tone-${Dt(E.state)}">${s(E.detail)}</p>
        <p class="muted">Open Health for the file and schema details.</p></section>`;return}switch(n){case"now":I.innerHTML=Z();break;case"plan":I.innerHTML=Te();break;case"evidence":I.innerHTML=ne();break;case"timeline":I.innerHTML=se();break;case"decisions":I.innerHTML=le();break;case"deliveries":I.innerHTML=pe();break;case"health":I.innerHTML=ie();break}}async function q(){try{let i=await r.read(),f=i.stateText===null?null:Ho(i.stateText),h=i.historyText===null?{ok:!0,value:[]}:Xo(i.historyText),p=Fo(i.archives);if(a=f?.ok?f.value:null,T=h.ok?h.value:[],C=p.deliveries,E=Vo({present:i.present,state:a,stateError:f,events:T,historyError:h.ok?null:h,archiveErrors:p.errors}),d&&!Mt(a,C).some((l)=>l.id===d))d=null;B()}catch(i){E={state:"invalid",title:"Read failed",detail:i instanceof Error?i.message:String(i)},a=null,T=[],C=[],B()}}e.addEventListener("click",(i)=>{let f=i.target,h=f.closest("[data-view]");if(h?.dataset.view){n=h.dataset.view,B();return}let p=f.closest("[data-delivery]");if(p?.dataset.delivery){d=p.dataset.delivery,n="deliveries",B();return}let l=f.closest("[data-copy]");if(l?.dataset.copy){navigator.clipboard.writeText(l.dataset.copy).then(()=>{l.textContent="Copied",window.setTimeout(()=>{l.textContent="Copy"},1200)}).catch(()=>{l.textContent="Select and copy"});return}if(f.closest("#refresh"))q()}),q();let j=window.setInterval(()=>{if(document.visibilityState==="visible")q()},gr);return window.addEventListener("beforeunload",()=>window.clearInterval(j)),{refresh:q,destroy:()=>{window.clearInterval(j)}}}var Ko=ge(),xe=null;Ko.onReady((e)=>{if(gt(e,document.documentElement),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,!xe){let r=document.getElementById("app");if(!r)throw Error("vstack panel root is missing");let n=document.body.dataset.view,d=ze.find((a)=>a.id===n)?.id;xe=Wo(r,{read:Do,...d?{view:d}:{}})}else xe.refresh()});Ko.onDirectory(()=>{if(xe)xe.refresh()});})();
