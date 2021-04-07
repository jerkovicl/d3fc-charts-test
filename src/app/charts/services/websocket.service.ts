/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
import { catchError, delayWhen, retryWhen, switchAll, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

export const WS_ENDPOINT: string = environment.wsEndpoint;
export const RECONNECT_INTERVAL = environment.reconnectInterval;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: any;
  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.pipe(
    switchAll(),
    catchError((e) => {
      throw e;
    })
  );

  constructor() {}

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      console.log('connect', this.socket$);
      const messages = this.socket$.pipe(
        cfg.reconnect ? this.reconnect : (o: any) => o,
        tap({
          error: (error) => console.log(error),
        }),
        catchError((_) => EMPTY)
      );
      //TODO only next an observable if a new subscription was made double-check this
      this.messagesSubject$.next(messages);
    }
  }

  /**
   * Retry a given observable by a time span
   * @param observable the observable to be retried
   */
  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap((val) => console.log('[WebsocketService] Try to reconnect', val)),
          delayWhen((_) => timer(RECONNECT_INTERVAL))
        )
      )
    );
  }

  close() {
    this.socket$.complete();
    this.socket$ = undefined;
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewWebSocket() {
    return webSocket({
      url: WS_ENDPOINT,
      // serializer: (msg: any) => JSON.stringify({ data: 'x,y', msg: { ...msg } }),
      //  deserializer: ({data}) => data  }
      openObserver: {
        next: () => {
          console.log('[WebsocketService]: connection ok');
        },
      },
      closeObserver: {
        next: () => {
          console.log('[WebsocketService]: connection closed');
          this.socket$ = undefined;
          this.connect({ reconnect: true });
        },
      },
    });
  }
}
