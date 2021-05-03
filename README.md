## Experiment on developing a message bus in nodejs

Idea is to develop a **Message Bus** as core of simple a flexible **Module Based System** to develop complex and scalable backend services.

Currently we are evaluating as **message bus back-bone** to use:
* [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview) 
* [EventEmitter](https://nodejs.org/docs/latest-v12.x/api/events.html) - **ON HOLD**


### Getting Started

1. Ensure to have **nodejs** version `>=12.20.x`
1. install base dependencies
    ```
    npm install
    ```
1. prepare lerna project
    ```
    npx lerna clean
    npx lerna bootstap
    ```
1. build packages
    ```
    npx lerna run build
    ```
1. start sample
    ```
    npx lerna run start --scope=rxbus-sample --stream
    ```

### Samples

In package `rxbus-sample` there is an example how to work, below a code snippet extract from there

```typescript

import { Bus } from '@soulsoftware/rxbus'
import { Module as FastifyModule, Subjects as FastifySubjects } from '@soulsoftware/rxbus-fastify'
import { Module as TimerModule, Subjects as TimeSubjects } from '@soulsoftware/rxbus-timer'
import { Module as TraceModule } from '@soulsoftware/rxbus-trace'

/**
 * Route message from Timer to WebSocket
 * 
 * MUST: Call it before bus start
 */
function routeTimerToWS() {
    
    const ws_route_name = 'ws.main'

    // function to listen on a WS channel  
    const ws_observe = () => 
        Bus.channels.channel<number>( TimerModule.name )
            .observe( TimeSubjects.Tick )
            .subscribe( tick => 
                Bus.channels.channel( ws_route_name  )
                    .subject( FastifySubjects.WSMessage )
                        .next( tick ))

    // Request register a new WS route                 
    Bus.channels.requestChannel( FastifyModule.name )
        .request( { topic: FastifySubjects.WSAdd, data:ws_route_name } )
        .subscribe( { 
            next: v => console.log( `next: ${FastifySubjects.WSAdd}`),
            error: e => console.error( `error: ${FastifySubjects.WSAdd}`, e),
            complete: ws_observe 
        })


}


function main() {

    console.log( 'start' )

    Bus.modules.registerModule( TraceModule )
    Bus.modules.registerModule( TimerModule )
    Bus.modules.registerModule( FastifyModule )

    for( let module of Bus.modules.names ) {
        console.log( `"${module}"`, 'registerd' )
    }

    routeTimerToWS()
    
    Bus.modules.start()
}

main()
```