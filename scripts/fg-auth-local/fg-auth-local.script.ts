import { combineLatest, from, Observable, of, catchError, map, switchMap, } from 'rxjs';
import { join } from 'path';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { readFile, writeFile } from 'fs';
import * as CryptoJS from 'crypto-js';
import { mkdirp } from 'mkdirp';
import { z } from 'zod';

// Wrap callback based async methodes into promises
const readFilePromise = promisify( readFile );
const writeFilePromise = promisify( writeFile );
// const mkdirp = promisify( mkdirp );

// Get command-line arguments ( First should be path to user *.json source-file )
const args = process.argv.slice(2);
const userJsonPath = args[ 0 ];
const outputPath = args[ 1 ] || join( __dirname, 'dist' );
const saltFileName = 'salt.json';

export const fg_auth_local_generator_user_parser = z.object({
    id: z.number().or(z.string()).optional(),
    email: z.string(),
    username: z.string().optional(),
    password: z.string(),
    /** 
     * String representing cookie-life-time used to calculate expiration data.
     * Valid values according to https://www.npmjs.com/package/timestring
     */
    cookie_life_time: z.string(),
    active: z.boolean()
})
export type FG_AUTH_LOCAL_GENERATOR_USER = z.infer<typeof fg_auth_local_generator_user_parser>;

export const fg_auth_local_generator_payload_parser = z.object({
  /**
   * The filename used as token value, to be used
   * as token that can be revalidated
   */
  token: z.string(),
  /** A salt value specific to the user */
  user_salt: z.string(),
  /** A salt value specific to the application */
  shared_salt: z.string(),
  /** A users auth-local profile-data */
  profile: fg_auth_local_generator_user_parser
});
export type FG_AUTH_LOCAL_GENERATOR_PAYLOAD = z.infer<typeof fg_auth_local_generator_payload_parser>;

export const fg_auth_local_generator_public_key_file_parser = z.object({
  public_salt: z.string(),
});
export type FG_AUTH_LOCAL_GENERATOR_PUBLIC_KEY_FILE = z.infer<typeof fg_auth_local_generator_public_key_file_parser>;

/** Greate a base64 encoded hash that can be used as path/filename/url */
function createHashValidForPathUrl( toHash: string, salt: string ): string {
  return CryptoJS.enc.Base64.stringify( CryptoJS.HmacSHA256( toHash, salt ) ).split( '+' ).join( '-' ).split( '/' ).join( '_' );
}

/** Read user-file and write the authentification-files */
const writeAuthLocalFiles$: Observable<any> = from( readFilePromise( userJsonPath, 'utf-8' ) ).pipe(
  catchError( error => { throw new Error( 'ERROR: Reading File: ' + userJsonPath + 'failed!' ); } ),
  map( data => {
    let users: FG_AUTH_LOCAL_GENERATOR_USER[] = [];
    try {
      users = JSON.parse( data ).users;
    } catch ( error ) {
      throw new Error( 'ERROR: Parsing JSON-File: ' + userJsonPath + 'failed!' );
    }
    return z.array(fg_auth_local_generator_user_parser).parse(users);
  }),
  switchMap( users => {
    // Add all observables from file-writting calls so they can be combined
    // and returned
    const filesToWrite: Observable<any>[] = [];
    // Get random public salt-value to be used to be exchanged every-time
    // users are created for the application - so user-login file-path differ
    // between every build and/or envirement
    const public_salt: string = randomBytes( 32 ).toString( 'base64' );
    // Create a random-salt value that can be used to encrypt application-data that
    // should be accessable by every user
    const shared_salt: string = randomBytes( 32 ).toString( 'base64' );
    // Construct path where to create public-salt file
    // const keyPath = join( __dirname, keyOutputPath );
    const path = join( __dirname, outputPath );
    // Make sure path to salt-file exists ( otherwise create it ) and write file
    const writePublicSaltFile$ = from( mkdirp( path ) ).pipe(
      switchMap( () => from( writeFilePromise( join( path, saltFileName ), JSON.stringify( 
        fg_auth_local_generator_public_key_file_parser.parse({ public_salt }) 
      ))))
    );
    filesToWrite.push( writePublicSaltFile$ );

    // Path were user-files should be written
    // const userFilePath = join( __dirname, outputPath );
    // Generate salt-value shared between all users
    const user_salt: string = randomBytes( 32 ).toString( 'base64' );
    // Write user/email
    users.forEach( (user: FG_AUTH_LOCAL_GENERATOR_USER ) => {
      // Create profile and overwrite passwort with undefined
      const profile: FG_AUTH_LOCAL_GENERATOR_USER = Object.assign( {}, user );
      // profile.password = undefined;
      const payload: FG_AUTH_LOCAL_GENERATOR_PAYLOAD = {
        token: createHashValidForPathUrl( user.email + user.password, public_salt ),
        user_salt,
        shared_salt,
        profile
      };
      // Generate file-name for user-file based on email
      const userEmailFileName: string = payload.token + '.json';
      // Write file and add it to files to write path
      const writeUserEMAilFile$ = from( mkdirp( path ) ).pipe(
        switchMap( () => from( writeFilePromise(
          join( path, userEmailFileName ),
          JSON.stringify( payload )
        ) ) )
      );
      filesToWrite.push( writeUserEMAilFile$ );
      // If there is also a username - generate login-file for that too
      if ( user.username ) {
        payload.token = createHashValidForPathUrl( user.username + user.password, public_salt );
        // Generate file-name for user-file based on username
        const userUsernameName: string = payload.token + '.json';
        // Write file and add it to files to write path
        const writeUserUsernameFile$ = from( mkdirp( path ) ).pipe(
        switchMap( () => from( writeFilePromise(
          join( path, userUsernameName ),
            JSON.stringify( payload )
          ) ) )
        );
        filesToWrite.push( writeUserUsernameFile$ );
      }
    });
    return combineLatest( filesToWrite );
  }),
  // Return Observable<void>
  switchMap( finished => of() )
);

writeAuthLocalFiles$.subscribe(
  result => {
    console.log( 'FINISHED' );
    console.log( result );
  },
  error =>
  {
    console.log( 'ERROR' );
    throw error;

  }
);
