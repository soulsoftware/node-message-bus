function e(e){return e&&e.__esModule?e.default:e}var s=e(require("@soulsoftware/rxmq")),t=e(require("assert"));class a{channel(e){return s.channel(e)}request(e){return s.channel(e)}get names(){return s.channelNames()}}class r{_modules=new Map;register(e,s){t.ok(!this._modules.has(e.name),`Module ${e.name} already exists!`);let a={module:e,status:{started:!1,paused:!1}};this._modules.set(e.name,a),e.onRegister&&e.onRegister(s)}get names(){return this._modules.keys()}start(){this._modules.forEach((e=>{e.status.started||(e.module.onStart&&e.module.onStart(),e.status.started=!0)}))}}const n=new class{channels=new a;modules=new r};exports.Bus=n;