var s=require("rxjs").interval,i=require("@soulsoftware/rxbus").Bus;const t={Tick:"tick"};exports.Subjects=t;const e=new class{name="timer";config={period:1e3};onRegister(s){s&&(this.config=s)}onStart(){const e=i.channels.channel(this.name).subject(t.Tick);this._subscription=s(this.config.period).subscribe(e)}onStop(){this._subscription&&(this._subscription.unsubscribe(),this._subscription=void 0)}};exports.Module=e;