import { Subject, ReplaySubject } from 'rxjs';
/**
 * EndlessSubject extension of Rx.Subject.
 * This is pretty hacky, but so far I'd found no better way of having
 * Subjects that do no close on multicasted stream completion and on multiple errors.
 * For documentation refer to
 * [Rx.Subject docs](@link https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/subject.md).
 * The only difference is that EndlessSubject never triggers '.complete()' and
 * does not closes observers on errors (thus allowing to continuously dispatch them).
 */
export declare class EndlessSubject<T> extends Subject<T> {
    /**
     * Dummy method override to prevent execution and Rx.Observable completion
     * @return {void}
     */
    complete(): void;
    /**
     * Override of error method that prevents stopping that Rx.Observer
     * @param  {Error} error  - Error to be dispatched
     * @return {void}
     */
    error(error: any): void;
}
/**
 * EndlessReplaySubject extension of ReplaySubject.
 * This is pretty hacky, but so far I'd found no better way of having
 * Subjects that do no close on multicasted stream completion and on multiple errors.
 * For documentation refer to
 * [ReplaySubject doc](@link https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/replaysubject.md).
 * The only difference is that EndlessReplaySubject never triggers '.complete()' and
 * does not closes observers on errors (thus allowing to continuously dispatch them).
 */
export declare class EndlessReplaySubject<T> extends ReplaySubject<T> {
    /**
     * Dummy method override to prevent execution and Observable completion
     * @return {void}
     */
    complete(): void;
    /**
     * Override of error method that prevents stopping that Observer
     * @param  {Error} error  - Error to be dispatched
     * @return {void}
     */
    error(error: any): void;
}