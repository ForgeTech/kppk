import { catchError, map, switchMap, } from 'rxjs/operators';
import { combineLatest, from, Observable, of } from 'rxjs';
import { FgAuthLocalPayloadInterface } from './fg-auth-local-payload.interface';
import { FgAuthLocalUserInterface } from './fg-auth-local-user.interface';
import { join } from 'path';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { readFile, writeFile } from 'fs';
import * as CryptoJS from 'crypto-js';
import { mkdirp } from 'mkdirp';

// Wrap callback based async methodes into promises
const readFilePromise = promisify( readFile );
const writeFilePromise = promisify( writeFile );
// const mkdirp = promisify( mkdirp );

// Get command-line arguments ( First should be path to user *.json source-file )
const args = process.argv.slice(2);
const userJsonPath = args[ 0 ];
const outputPath = args[ 1 ] || join( __dirname, 'dist' );
const saltFileName = 'salt.json';


/** Greate a base64 encoded hash that can be used as path/filename/url */
function createHashValidForPathUrl( toHash: string, salt: string ): string {
  return CryptoJS.enc.Base64.stringify( CryptoJS.HmacSHA256( toHash, salt ) ).split( '+' ).join( '-' ).split( '/' ).join( '_' );
}

/** Read user-file and write the authentification-files */
const writeAuthLocalFiles$: Observable<any> = from( readFilePromise( userJsonPath, 'utf-8' ) ).pipe(
  catchError( error => { throw new Error( 'ERROR: Reading File: ' + userJsonPath + 'failed!' ); } ),
  map( data => {
    let users: FgAuthLocalUserInterface[] = [];
    try {
      users = JSON.parse( data ).users;
    } catch ( error ) {
      throw new Error( 'ERROR: Parsing JSON-File: ' + userJsonPath + 'failed!' );
    }
    //  Check if user objects are valid
    users.forEach( ( user, index ) => {
      if ( !user.email ) {
        throw new Error( 'ERROR: User at Position: ' + index + ' of File: ' + userJsonPath + 'has no email-property' );
      }
      if ( !user.password ) {
        throw new Error( 'ERROR: User at Position: ' + index + ' of File: ' + userJsonPath + 'has no password-property' );
      }
    } );
    return users;
  }),
  switchMap( users => {
    // Add all observables from file-writting calls so they can be combined
    // and returned
    let filesToWrite: Observable<any>[] = [];
    // Get random public salt-value to be used to be exchanged every-time
    // users are created for the application - so user-login file-path differ
    // between every build and/or envirement
    const publicSalt: string = randomBytes( 32 ).toString( 'base64' );
    // Create a random-salt value that can be used to encrypt application-data that
    // should be accessable by every user
    const sharedSalt: string = randomBytes( 32 ).toString( 'base64' );
    // Construct path where to create public-salt file
    // const keyPath = join( __dirname, keyOutputPath );
    const path = join( __dirname, outputPath );
    // Make sure path to salt-file exists ( otherwise create it ) and write file
    const writePublicSaltFile$ = from( mkdirp( path ) ).pipe(
      switchMap( () => from( writeFilePromise( join( path, saltFileName ), JSON.stringify( { publicSalt } ) ) ) )
    );
    filesToWrite.push( writePublicSaltFile$ );

    // Path were user-files should be written
    // const userFilePath = join( __dirname, outputPath );
    // Generate salt-value shared between all users
    const userSalt: string = randomBytes( 32 ).toString( 'base64' );
    // Write user/email
    users.forEach( (user: FgAuthLocalUserInterface ) => {
      // Create profile and overwrite passwort with undefined
      const profile: FgAuthLocalUserInterface = Object.assign( {}, user );
      // profile.password = undefined;
      const payload: FgAuthLocalPayloadInterface = {
        token: createHashValidForPathUrl( user.email + user.password, publicSalt ),
        userSalt,
        sharedSalt,
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
        payload.token = createHashValidForPathUrl( user.username + user.password, publicSalt );
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
