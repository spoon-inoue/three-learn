var c=Object.defineProperty;var h=(n,e,t)=>e in n?c(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var s=(n,e,t)=>(h(n,typeof e!="symbol"?e+"":e,t),t);import{W as d,S as m,P as l,C as p,O as w,a as u,A as g,B as z,M as C,b as v}from"./OrbitControls.c3805648.js";import"./base.d49d4c12.js";class x{constructor(e){s(this,"renderer");s(this,"scene");s(this,"camera");s(this,"controls");s(this,"clock");s(this,"mesh");s(this,"init",()=>{const{width:e,height:t,aspect:r}=this.size,i=new d({antialias:!0,alpha:!0});i.setPixelRatio(window.devicePixelRatio),i.setSize(e,t),this.parentNode.querySelector(".three-container").appendChild(i.domElement);const a=new m,o=new l(50,r,.01,100);return{renderer:i,scene:a,camera:o}});s(this,"setScene",()=>{this.scene.background=new p("#1e1e1e"),this.camera.position.z=3,this.controls=new w(this.camera,this.renderer.domElement),this.controls.dampingFactor=.1,this.controls.enableDamping=!0,this.clock=new u;const e=new g;this.scene.add(e)});s(this,"addEvents",()=>{window.addEventListener("resize",this.handleResize)});s(this,"handleResize",()=>{const{width:e,height:t,aspect:r}=this.size;this.camera.aspect=r,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.render()});s(this,"createModel",()=>{const e=new z(.5,.5,.5),t=new C;this.mesh=new v(e,t),this.scene.add(this.mesh)});s(this,"animate",()=>{requestAnimationFrame(this.animate),this.controls.update();const e=this.clock.getDelta();this.mesh.rotation.x+=e,this.mesh.rotation.y+=e*.5,this.render()});s(this,"render",()=>{this.renderer.render(this.scene,this.camera)});this.parentNode=e;const{renderer:t,scene:r,camera:i}=this.init();this.renderer=t,this.scene=r,this.camera=i,this.setScene(),this.createModel(),this.addEvents(),this.animate()}get size(){const[e,t]=[window.innerWidth,window.innerHeight];return{width:e,height:t,aspect:e/t}}}class S{constructor(){s(this,"createCanvas",()=>{const e=document.querySelector(".step1");new x(e)});this.createCanvas()}}new S;
