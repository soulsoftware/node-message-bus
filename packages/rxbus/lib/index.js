function e(e){return e&&e.__esModule?e.default:e}var s=e(require("@soulsoftware/rxmq")),t=e(require("assert"));class a{channel(e){return s.channel(e)}requestChannel(e){return s.channel(e)}get names(){return s.channelNames()}}class n{_modules=new Map;registerModule(e){t.ok(!this._modules.has(e.name),`Module ${e.name} already exists!`);let s={module:e,status:{started:!1,paused:!1}};this._modules.set(e.name,s),e.onRegister&&e.onRegister()}get names(){return this._modules.keys()}start(){this._modules.forEach((e=>{e.status.started||(e.module.onStart&&e.module.onStart(),e.status.started=!0)}))}}const r=new class{channels=new a;modules=new n};exports.Bus=r;