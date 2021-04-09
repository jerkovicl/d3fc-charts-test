/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
import { catchError, delayWhen, retryWhen, switchAll, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

export const WS_ENDPOINT: string = environment.wsEndpoint;
export const RECONNECT_INTERVAL = environment.reconnectInterval;

@UntilDestroy({ checkProperties: true })
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
  public connect(cfg: { reconnect: boolean } = { reconnect: false }, deviceId: string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(deviceId);
      console.log('connect', this.socket$);
      const messages = this.socket$.pipe(
        cfg.reconnect ? this.reconnect : (o: any) => o,
        tap({
          error: (error) => console.log(error),
        }),
        catchError((_) => EMPTY)
      );
      // only next an observable if a new subscription was made double-check this
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

  close(): void {
    this.socket$?.complete();
    this.socket$ = undefined;
  }

  sendMessage(msg: any): void {
    this.socket$.next(msg);
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewWebSocket(deviceId: string) {
    return webSocket({
      url: `${WS_ENDPOINT}${deviceId}`,
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
          // enable reconnect on closed connection
          // this.connect({ reconnect: true }, deviceId);
        },
      },
    });
  }
}
