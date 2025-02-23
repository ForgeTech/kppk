import {
  fg_auth_local_auth_cookie_parser,
  FG_AUTH_LOCAL_CONTEXT,
  fg_auth_local_context_parser,
  fg_auth_emitted_authorized_parser,
  fg_auth_event_login_parser,
  fg_auth_emitted_unauthorized_parser,
  fg_auth_local_salt_file_content_parser,
  FG_AUTH_EMITTED_UNAUTHORIZED,
  FG_AUTH_EMITTED_AUTHORIZED,
} from './fg-auth-local.machine.types';
import { catchError, map, firstValueFrom, tap } from 'rxjs';
import { FgStorageNgxCookieService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { AnyEventObject } from 'xstate';
import { HttpClient } from '@angular/common/http';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { CookieOptions } from 'ngx-cookie-service';
import { FgTimeStringService, FgBaseService } from '@kppk/fg-lib-new';
import { boundMethod } from 'autobind-decorator';
import { HMAC } from 'crypto-es/lib/hmac';
import { SHA256Algo } from 'crypto-es/lib/sha256';
import Base64 from 'crypto-js/enc-base64';

export type FgAuthLocalV1Params = {
  context: FG_AUTH_LOCAL_CONTEXT;
  event: AnyEventObject;
};

@Injectable({
  providedIn: 'root',
})
export class FgAuthLocalMachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $cookie = inject(FgStorageNgxCookieService);
  protected $http = inject(HttpClient);
  protected $time = inject(FgTimeStringService);
  // protected $crypto = inject( FgWebcryptoService );

  // @boundMethod
  // protected async createHashValidForPathUrlWebCrypto(toHash: string, salt: string): Promise<string> {
  //   const enc = new TextEncoder();
  //   const key = await this.$crypto.crypto.subtle.importKey(
  //     "raw",
  //     enc.encode(salt),
  //     {
  //       name: "HMAC",
  //       hash: {name: "SHA-512"}
  //     },
  //     false, // export = false
  //     ["sign", "verify"] // what this key can do
  //   );
  //   const signature = await window.crypto.subtle.sign(
  //       "HMAC",
  //       key,
  //       enc.encode(toHash)
  //   );
  //   return fromByteArray(new Uint8Array(signature)).split( '+' ).join( '-' ).split( '/' ).join( '_' );
  // }
  @boundMethod
  protected async createHashValidForPathUrl(
    toHash: string,
    salt: string
  ): Promise<string> {
    const hash = HMAC.create(SHA256Algo, salt).finalize(toHash);
    return Base64.stringify(hash).split('+').join('-').split('/').join('_');
  }

  // /** Greate a base64 encoded hash that can be used as path/filename/url */
  // @boundMethod
  // public createHashValidForPathUrl( toHash: string, salt: string ): string {
  //   return Base64.stringify( hmacSHA512( toHash, salt ) ).split( '+' ).join( '-' ).split( '/' ).join( '_' );
  // }

  @boundMethod
  public assign_error({ context, event }: FgAuthLocalV1Params) {
    console.log('>>>>>>>>>>>>>assign_error>>>>>>>>>>>>');
    console.log(event);
    console.log(context);
    return context;
  }

  @boundMethod
  public log_error({ context, event }: FgAuthLocalV1Params) {
    console.log('>>>>>>>>>>>>>log_error>>>>>>>>>>>>');
    console.log(event);
    console.log(context);
  }

  @boundMethod
  public emit_error({ context, event }: FgAuthLocalV1Params) {
    console.log('>>>>>>>>>>>>>emit_error>>>>>>>>>>>>');
    console.log(event);
    console.log(context);
    return { type: 'emit_error_event' };
  }

  @boundMethod
  public emit_unauthorized_event({ context, event }: FgAuthLocalV1Params) {
    const result = fg_auth_emitted_unauthorized_parser.parse({
      type: 'fg.auth.emitted.unauthorized',
    } as FG_AUTH_EMITTED_UNAUTHORIZED);
    return result;
  }

  @boundMethod
  public emit_authorized_event({ context, event }: FgAuthLocalV1Params) {
    const result = fg_auth_emitted_authorized_parser.parse({
      type: 'fg.auth.emitted.authorized',
      data: {
        auth_cookie: context.auth_cookie,
      },
    } as FG_AUTH_EMITTED_AUTHORIZED);
    return result;
  }

  @boundMethod
  public send_authorized_event_to({ context }: FgAuthLocalV1Params) {
    const result = fg_auth_emitted_authorized_parser.parse({
      type: 'fg.auth.emitted.authorized',
      data: {
        auth_cookie: context.auth_cookie,
      },
    } as FG_AUTH_EMITTED_AUTHORIZED);
    return result;
  }

  @boundMethod
  public send_unauthorized_event_to({ context }: FgAuthLocalV1Params) {
    const result = fg_auth_emitted_unauthorized_parser.parse({
      type: 'fg.auth.emitted.unauthorized',
    } as FG_AUTH_EMITTED_UNAUTHORIZED);
    return result;
  }

  @boundMethod
  public escalate_auth_local_key_error({ context }: FgAuthLocalV1Params) {
    throw new Error('fg-auth-local-key-error');
  }

  @boundMethod
  public assign_auth_cookie({ context, event }: FgAuthLocalV1Params) {
    const auth_cookie = fg_auth_local_auth_cookie_parser.optional().parse(
      event['output']
    );
    return this.$immer.produce(context, draft => {
      draft.auth_cookie = auth_cookie;
    });
  }

  @boundMethod
  public assign_auth_key({ context, event }: FgAuthLocalV1Params) {
    const event_output = fg_auth_local_salt_file_content_parser.parse(
      event['output']
    );
    return this.$immer.produce(context, draft => {
      draft.salt = event_output.public_salt;
    });
  }

  @boundMethod
  public assign_authorization_error({
    context,
    event,
  }: {
    context: FG_AUTH_LOCAL_CONTEXT;
    event: any;
  }) {
    return this.$immer.produce(context, draft => {
      draft.error = (event.error as Error).message;
    });
  }

  @boundMethod
  public assign_clear_authorization_error({ context }: FgAuthLocalV1Params) {
    return this.$immer.produce(context, draft => {
      draft.error = undefined;
    });
  }

  @boundMethod
  public assign_clear_auth_cookie({ context }: FgAuthLocalV1Params) {
    return this.$immer.produce(context, draft => {
      draft.auth_cookie = undefined;
    });
  }

  @boundMethod
  public assign_revoke_authorization_error({
    context,
    event,
  }: FgAuthLocalV1Params) {
    return this.$immer.produce(context, draft => {
      draft.error = event['error'].message;
    });
  }

  @boundMethod
  public escalate_auth_load_cookie_error({
    context,
    event,
  }: FgAuthLocalV1Params) {
    // console.log( '<<<<<<<<<<<<ERROR>>>>>>>>>>>>' );
    // console.log( context );
    // console.log( event );
    throw new Error('error_fg_auth_load_cookie_error');
  }

  @boundMethod
  public guard_has_auth_cookie({ context }: FgAuthLocalV1Params) {
    return context.auth_cookie ? true : false;
  }

  @boundMethod
  public async actor_load_auth_local_key({
    input,
  }: {
    input: FgAuthLocalV1Params;
  }) {
    // ContextFgAuthLocalParser.parse(input.context);
    const url = input.context.path.concat(input.context.salt_filename);
    const public_salt = await firstValueFrom(
      this.$http.get(url).pipe(
        catchError((error) => {
          throw new Error('error_actor_load_auth_local_key_not_found');
        }),
        map((result) => {
          fg_auth_local_salt_file_content_parser.parse(result);
          return result;
        }),
        catchError((error) => {
          {
            throw new Error(
              'error_actor_load_auth_local_key_invalid: ' + error?.message
            );
          }
        })
      )
    );
    return public_salt;
  }

  @boundMethod
  public async actor_load_auth_cookie({
    input,
  }: {
    input: FgAuthLocalV1Params;
  }) {
    return firstValueFrom(
      this.$cookie.getItem(input.context.auth_cookie_storage_key).pipe(
        catchError((error) => {
          throw new Error('error_actor_load_auth_cookie_failed');
        }),
        map((result) => {
          let auth_cookie = result ? result : undefined;
          if( auth_cookie ) {
           auth_cookie = fg_auth_local_auth_cookie_parser.optional().parse(auth_cookie);
          }
          return auth_cookie;
        }),
        catchError((error) => {
          throw new Error('error_actor_load_auth_cookie_invalid');
        })
      )
    );
  }

  @boundMethod
  public async actor_revoke_authorization({
    input,
  }: {
    input: FgAuthLocalV1Params;
  }) {
    const result = await firstValueFrom(
      this.$cookie.removeItem(input.context.auth_cookie_storage_key).pipe(
        catchError((error) => {
          throw new Error('error_actor_revoke_authorization_failed');
        })
      )
    );
    return result;
  }

  @boundMethod
  public async actor_authorization({ input }: { input: FgAuthLocalV1Params }) {
    const context = fg_auth_local_context_parser.parse(input.context);
    const event = fg_auth_event_login_parser.parse(input.event);
    let filename: string;
    if (context.salt) {
      const hash = await this.createHashValidForPathUrl(
        event.data.user + event.data.password,
        context.salt
      );
      filename = hash.concat('.json');
    } else {
      throw new Error('error_actor_authorization_passed_salt_invalid');
    }
    const result = await firstValueFrom(
      this.$http.get(input.context.path + filename).pipe(
        catchError((error) => {
          throw new Error('error_actor_authorization_not_found');
        }),
        map((value) => {
          const result = fg_auth_local_auth_cookie_parser.parse(value);
          return result;
        }),
        tap((value) => {
          // Set auth_cookie in browser
          const options: CookieOptions = {
            expires: this.$time.getCookieExpirationDate(
              value.profile.cookie_life_time
            ),
            path: '/'
          };
          this.$cookie.setItem(context.auth_cookie_storage_key, value, options);
        }),
        catchError((error) => {
          throw new Error('error_actor_authorization_invalid');
        })
      )
    );
    return result;
  }
}
