import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import * as feathers from '@feathersjs/feathers';
import feathersSocketIOClient from '@feathersjs/socketio-client';
import { AuthenticationRequest } from '@feathersjs/authentication/lib';
import feathersAuthClient from '@feathersjs/authentication-client';
import { AuthenticationClient } from '@feathersjs/authentication-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  private _feathers: feathers.Application<any>|AuthenticationClient = feathers(); // init feathers
  private _socket = io(environment.serverUrl); // init socket.io

  constructor() {
    (this._feathers as feathers.Application<any>)
      .configure(feathersSocketIOClient(this._socket))  // add socket.io plugin
      .configure(feathersAuthClient({              // add authentication plugin
        storage: window.localStorage
      }));
  }

  // expose services
  public service(name: string) {
    return (this._feathers as feathers.Application<any>).service(name);
  }

  // expose authentication as login
  public login(credentials?: AuthenticationRequest) {
    return (this._feathers as AuthenticationClient).authenticate(credentials);
  }

  // expose logout
  public logout() {
    return (this._feathers as AuthenticationClient).logout();
  }
}