var e,n=(e=require("fastify"))&&e.__esModule?e.default:e,{Bus:s}=require("@soulsoftware/rxbus");function r(e,n,s){return n in e?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s,e}const t=new class{constructor(){r(this,"server",n({})),r(this,"name","fastify")}onRegister(){const e=`${this.name}/channel`;this._myChannel=s.channels.newChannel(e);const n=new RegExp(`/${e}/([\\w]+)([?].+)?`);this.server.get(`/${e}/*`,((e,s)=>{const r=n.exec(e.url);var t;r&&(null===(t=this._myChannel)||void 0===t||t.next({command:r[1],data:e.query}));s.status(200).send(JSON.stringify(e.query))}))}onStart(){this.server.listen(8080,((e,n)=>{e?console.error(e):console.log(`Server listening at ${n}`)}))}onStop(){this.server.close().then((e=>console.log("server closed!")))}};exports.Module=t;
//# sourceMappingURL=index.js.map
