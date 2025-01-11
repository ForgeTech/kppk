import { 
  AuthCookieFgAuthLocalParser,
  ContextFgAuthLocal,
  ContextFgAuthLocalParser,
  EventFgAuthLocalAuthorizedParser,
  EventFgAuthLocalLoginParser,
  EventFgAuthLocalUnauthorizedParser,
  SaltFileContentFgAuthLocalParser 
} from './fg-auth-local.machine.types';
import { catchError, map, firstValueFrom, tap } from 'rxjs';
import { FgStorageNgxCookieService } from '@kppk/fg-lib';
import { Injectable, inject } from '@angular/core';
import { 
  AnyEventObject,
} from 'xstate';
import { HttpClient } from '@angular/common/http';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { CookieOptions } from 'ngx-cookie';
import { FgTimeStringService, FgBaseService, FgWebcryptoService } from '@kppk/fg-lib-new';
import { boundMethod } from 'autobind-decorator';
import { fromByteArray } from 'base64-js'

export type FgAuthLocalV1Params = { context: ContextFgAuthLocal, event: AnyEventObject};

@Injectable({
  providedIn: 'root',
})
export class FgAuthLocalMethodeService extends FgBaseService {
  
  protected $immer = inject( FgImmutableService );
  protected $cookie = inject( FgStorageNgxCookieService );
  protected $http = inject( HttpClient );
  protected $time = inject( FgTimeStringService );
  protected $crypto = inject( FgWebcryptoService );
  
  // protected $crypto = CryptoJS;
  @boundMethod
  protected async createHashValidForPathUrl(toHash: string, salt: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await this.$crypto.crypto.subtle.importKey(
      "raw",
      enc.encode(salt),
      {
        name: "HMAC",
        hash: {name: "SHA-512"}
      },
      false, // export = false
      ["sign", "verify"] // what this key can do
    );
    const signature = await window.crypto.subtle.sign(
        "HMAC",
        key,
        enc.encode(toHash)
    );
    return fromByteArray(new Uint8Array(signature)).split( '+' ).join( '-' ).split( '/' ).join( '_' );
  }

  // /** Greate a base64 encoded hash that can be used as path/filename/url */
  // @boundMethod
  // public createHashValidForPathUrl( toHash: string, salt: string ): string {
  //   return Base64.stringify( hmacSHA512( toHash, salt ) ).split( '+' ).join( '-' ).split( '/' ).join( '_' );
  // }

  @boundMethod
  public send_authorized_event_to({
    context,
  }: FgAuthLocalV1Params ) {
    const result = EventFgAuthLocalAuthorizedParser.parse({
      type: 'fg.auth.local.event.authorized',
      payload: {
        auth_cookie: context.auth_cookie
      }
    });
    return result;
  };

  @boundMethod
  public send_unauthorized_event_to({
    context,
  }: FgAuthLocalV1Params ) {
    return EventFgAuthLocalUnauthorizedParser.parse({
      type: 'fg.auth.local.event.unauthorized'
    });

  };

  @boundMethod
  public escalate_auth_local_key_error({
    context,
  }: FgAuthLocalV1Params ) {
    throw new Error('fg-auth-local-key-error');
  };

  @boundMethod
  public assign_auth_cookie({
    context,
    event,
  }: FgAuthLocalV1Params ) {
    const auth_cookie = AuthCookieFgAuthLocalParser.optional().parse(event['output']);
    return this.$immer.produce<ContextFgAuthLocal>( context, draft => {
      draft.auth_cookie = auth_cookie;
      return draft;
    })
  };

  @boundMethod
  public assign_auth_key({
    context,
    event,
  }: FgAuthLocalV1Params ) {
    const event_output = SaltFileContentFgAuthLocalParser.parse(event['output']);
    return this.$immer.produce<ContextFgAuthLocal>( context, draft => {
      draft.salt = event_output.publicSalt;
    })
  };

  @boundMethod
  public assign_authorization_error({
    context,
    event
  }: {
    context: ContextFgAuthLocal;
    event: any;
  }) {
    return this.$immer.produce<ContextFgAuthLocal>( context, draft => {
      draft.error = (event.error as Error).message;
    });
  };

  @boundMethod
  public assign_clear_authorization_error({
    context,
  }: FgAuthLocalV1Params ) {
    return this.$immer.produce<ContextFgAuthLocal>( context, draft => {
      draft.error = undefined;
    });
  };

  @boundMethod
  public assign_clear_auth_cookie({
    context,
  }: FgAuthLocalV1Params ) {
    return this.$immer.produce<ContextFgAuthLocal>( context, draft => {
      draft.auth_cookie = undefined;
    });
  };

  @boundMethod
  public assign_revoke_authorization_error ({
    context,
    event
  }: FgAuthLocalV1Params ) {
    return this.$immer.produce<ContextFgAuthLocal>( context, draft => {
      draft.error = (event['error']).message;
    });
  }; 

  @boundMethod
  public escalate_auth_load_cookie_error ({
    context,
    event,
  }: FgAuthLocalV1Params ) {
    // console.log( '<<<<<<<<<<<<ERROR>>>>>>>>>>>>' );
    // console.log( context );
    // console.log( event );
    throw new Error('error_fg_auth_load_cookie_error');
  };

  @boundMethod
  public guard_has_auth_cookie ({
    context,
  }: FgAuthLocalV1Params ) {
    return context.auth_cookie ? true : false;
  };

  @boundMethod
  public async actor_load_auth_local_key({
    input,
  }: {
    input: FgAuthLocalV1Params;
  }) {
    // ContextFgAuthLocalParser.parse(input.context);
    const url = input.context.path.concat(input.context.salt_filename);
    const public_salt = await firstValueFrom(this.$http.get(url).pipe( 
      catchError( error => { throw new Error('error_actor_load_auth_local_key_not_found')}),
      map( result => { 
        SaltFileContentFgAuthLocalParser.parse(result) 
        return result;
      }),
      catchError( error => { { throw new Error('error_actor_load_auth_local_key_invalid: ' + error?.message,)}}),
    ));
    return public_salt;
  };

  @boundMethod
  public async actor_load_auth_cookie ({
    input,
  }: {
    input: FgAuthLocalV1Params;
  }) {
    return firstValueFrom(this.$cookie.getItem(input.context.auth_cookie_storage_key).pipe( 
      catchError( error => { throw new Error('error_actor_load_auth_cookie_failed')}),
      map(result => {
        const auth_cookie = result ? result : undefined;
        AuthCookieFgAuthLocalParser.optional().parse(auth_cookie);
        return auth_cookie;
      }),
      catchError( error => { throw new Error('error_actor_load_auth_cookie_invalid')}),
    ));
  };

  @boundMethod
  public async actor_revoke_authorization({
    input,
  }: {
    input: FgAuthLocalV1Params;
  }) {
    const result = await firstValueFrom(this.$cookie.removeItem(input.context.auth_cookie_storage_key).pipe(
      catchError( error => { throw new Error('error_actor_revoke_authorization_failed')}),
    ));
    return result;
  };

  @boundMethod
  public async actor_authorization({
    input,
  }: {
    input: FgAuthLocalV1Params;
  }) {
    const context = ContextFgAuthLocalParser.parse(input.context);
    const event = EventFgAuthLocalLoginParser.parse(input.event);
    let filename: string;
    if(context.salt) {
      const hash = await this.createHashValidForPathUrl( event.payload.user + event.payload.password, context.salt );
      filename = hash.concat('.json');
    } else {
      throw new Error('error_actor_authorization_passed_salt_invalid');
    }
    const result = await firstValueFrom( this.$http.get(input.context.path + filename).pipe( 
      catchError( error => { throw new Error('error_actor_authorization_not_found')}),
      map( value => {
        const result = AuthCookieFgAuthLocalParser.parse(value);
        return result;
      }),
      tap( value => {
        // Set auth_cookie in browser
        const options: CookieOptions = {
          expires: this.$time.getCookieExpirationDate(
            value.profile.cookieLifeTime
          ),
        };
        this.$cookie.setItem(
          context.auth_cookie_storage_key,
          value,
          options
        );
      }),
      catchError( error => { 
         throw new Error('error_actor_authorization_invalid')
      }),
    ));
    return result;
  };

}
