var e,{timeout:s}=require("rxjs/operators"),t=(e=require("fastify"))&&e.__esModule?e.default:e;require("@soulsoftware/rxmq");var r=require("fastify-websocket"),{Bus:n}=require("@soulsoftware/rxbus");function o(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}const a={WSSend:"WS_SEND",WSMessage:"WS_MESSAGE_OUT",WSMessageIn:"WS_MESSAGE_IN",WSAdd:"WS_ADD",ServerStart:"SERVER_START",ServerClose:"SERVER_CLOSE"};exports.Subjects=a;const c=new class{constructor(){o(this,"server",t({})),o(this,"name","FASTIFY"),o(this,"config",{port:3e3,requestTimeout:5e3})}setupWebSocketChannel(e){const s=e,t=n.channel(s),r=t.subject(a.WSMessageIn),o=t.observe(a.WSMessage);this.server.get(`/${this.name}/channel/${s}/*`,{websocket:!0},((e,s)=>{e.socket.on("message",(e=>r.next(e))),o.subscribe((s=>{console.log("ws send",s),e.socket.send(s)}))}))}onRegister(e){e&&(this.config=e);const t=n.replyChannel(this.name),o=new RegExp(`/${this.name}/channel/([\\w]+)([?].+)?`);this.server.get(`/${this.name}/channel/*`,(async(e,r)=>{const n=o.exec(e.url);n?t.request({topic:n[1],data:e}).pipe(s(this.config.requestTimeout||5e3)).subscribe({next:e=>r.send(e),error:e=>r.code(500).send(e),complete:()=>{}}):r.status(404).send("command not found!"),await r})),this.server.register(r,{}),n.replyChannel(this.name).observe(a.WSAdd).subscribe((({data:e,replySubject:s})=>{console.log("request add channel ",e),this.setupWebSocketChannel(e),s.next(!0),s.complete()}))}onStart(){this.server.listen(this.config.port||3e3,((e,s)=>{e?(console.error(e),n.channel(this.name).subject(a.ServerStart).error(e)):(console.log(`Server listening at ${s}`),n.channel(this.name).subject(a.ServerStart).next({address:s}))}))}onStop(){this.server.close().then((e=>{console.log("server closed!"),n.channel(this.name).subject(a.ServerClose).complete()}))}};exports.Module=c;