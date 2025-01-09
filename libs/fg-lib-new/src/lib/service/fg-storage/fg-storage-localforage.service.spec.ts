// import { TestBed } from '@angular/core/testing';
// import * as LocalForage from 'localforage';
// import { NGXLogger } from 'ngx-logger';
// import { FgStorageLocalforageService, FG_LOCALFORAGE_STORAGE_SERVICE_OPTIONS,  } from './fg-storage-localforage.service';
// import { createSpyFromClass } from 'jest-auto-spies';
// import { combineLatest } from 'rxjs';

// xdescribe('FgStorageLocalforageService', () => {
//   let service: FgStorageLocalforageService;
//   let $log: NGXLogger;
//   let options: LocalForageOptions;

//   const OPTIONS_CUSTOM: LocalForageOptions =  {
//     name: 'Fg-Localforage-Storage',
//     description: 'A storage service implemeted using localforage package',
//     // driver: LocalForage.LOCALSTORAGE,
//     storeName: 'Localforage',
//   };

//   describe('without optional injection values', () => {

//     beforeEach(() => {
//       TestBed.configureTestingModule({
//         providers: [
//           { provide: NGXLogger, useValue: null },
//           { provide: FG_LOCALFORAGE_STORAGE_SERVICE_OPTIONS, useValue: null },
//         ]
//       });
//       service = TestBed.inject( FgStorageLocalforageService );
//       $log = TestBed.inject( NGXLogger );
//       options = TestBed.inject( FG_LOCALFORAGE_STORAGE_SERVICE_OPTIONS );
//     });

//     afterEach(() => {
//       jest.clearAllMocks();
//     });

//     it('instance is created!', () => {
//       expect(service).toBeTruthy();
//     });

//     // describe('CONSTRUCTOR', () => {
//     //   it('options are default-values!', () => {
//     //     expect( service.options ).toEqual( OPTIONS_DEFAULT )
//     //   })
//     //   it('init storageMap by calling this.getItem', () => {
//     //     const spyGetItem = jest.spyOn( FgStorageNgxCookieService.prototype, 'getItem' );
//     //     const service = new FgStorageNgxCookieService($, $log, options);
//     //     expect( spyGetItem ).toHaveBeenCalledWith( FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY );
//     //   })
//     // });

//     // describe('METHODE: setItem', () => {
//     //   describe('with string value', () => {

//     //     it('calls $cookie.put with default-options', done => {
//     //       const key = 'testKey';
//     //       const value = 'testValue';
//     //       service.setItem( key, value ).subscribe( result => {
//     //         expect( result ).toEqual( value );
//     //         expect( $cookie.put ).toHaveBeenCalledWith(key, value, OPTIONS_DEFAULT  );
//     //         done();
//     //       });
//     //     }, 1000 );

//     //     it('call to $cookie.put throws Error', done => {
//     //       const key = 'testKey';
//     //       const value = 'testValue';
//     //       const spy = jest.spyOn( $cookie, 'put').mockImplementation(
//     //         () => {
//     //           throw new Error();
//     //         }
//     //       );
//     //       service.setItem( key, value ).subscribe( result => {
//     //         expect( result ).toEqual( false );
//     //         done();
//     //       });
//     //     }, 1000 );

//     //   });

//     //   describe('with object value', () => {

//     //     it('calls $cookie.putObject with default-options', done => {
//     //       const key = 'testKey';
//     //       const value = { test: 'test' };
//     //       service.setItem( key, value ).subscribe( result => {
//     //         expect( result ).toEqual( value );
//     //         expect( $cookie.putObject ).toHaveBeenCalledWith(key, value, OPTIONS_DEFAULT  );
//     //         done();
//     //       });
//     //     }, 1000 );

//     //     it('call to $cookie.putObject throws Error', done => {
//     //       const key = 'testKey';
//     //       const value = { test: 'test' };
//     //       const spy = jest.spyOn( $cookie, 'putObject').mockImplementation(
//     //         () => {
//     //           throw new Error();
//     //         }
//     //       );
//     //       service.setItem( key, value ).subscribe( result => {
//     //         expect( result ).toEqual( false );
//     //         done();
//     //       });
//     //     }, 1000 );

//     //   });

//     //   describe('with custom options', () => {

//     //     it('custom options are merged with default options', done => {
//     //       const key = 'testKey';
//     //       const value = { test: 'test' };
//     //       const mergedOptions = Object.assign( {}, OPTIONS_DEFAULT );
//     //       Object.assign( mergedOptions, OPTIONS_CUSTOM );
//     //       service.setItem( key, value, OPTIONS_CUSTOM  ).subscribe( result => {
//     //         expect( result ).toEqual( value );
//     //         done();
//     //       });
//     //       expect( $cookie.putObject ).toHaveBeenCalledWith(key, value, mergedOptions  );
//     //     }, 1000 );

//     //   });

//     //   describe('with storageKey', () => {

//     //     it('value set with storage-prefix and storage-map created and persisted', done => {
//     //       const key = 'testKey';
//     //       const value = { test: 'test' };
//     //       const storageKey = 'testStorageKey';
//     //       const resultItemKey = storageKey.concat( '-', key);
//     //       const testStorageMap = { testStorageKey: [ 'testKey' ] };
//     //       service.setItem( key, value, null, storageKey ).subscribe( result => {
//     //         expect( result ).toEqual( value );
//     //         done();
//     //       });
//     //       // Store value to cookie
//     //       expect( $cookie.putObject ).toHaveBeenCalledWith( resultItemKey, value, OPTIONS_DEFAULT );
//     //       // Update and persist storage-map
//     //       expect( $cookie.putObject ).toHaveBeenCalledWith( FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY, testStorageMap, OPTIONS_DEFAULT );
//     //     }, 1000 );

//     //   });
//     // })

//     // describe('METHODE: getItem', () => {
//     //   const key = 'test';
//     //   const value = 'testValue';
//     //   const storageKey = 'testStorageKey';

//     //   it('get item for none-existing key!', done => {
//     //     service.getItem( key ).subscribe( result => {
//     //       expect( result ).toEqual( false );
//     //       done();
//     //     });
//     //     expect( $cookie.get ).toHaveBeenCalledWith( key )
//     //   }, 1000);

//     //   it('receive string item!', done => {
//     //     const spy = jest.spyOn( $cookie, 'get').mockImplementation( ( key: string ) => {
//     //       return value;
//     //     });
//     //     service.getItem( key )
//     //     .subscribe( result => {
//     //       expect( result ).toEqual( value );
//     //       expect( $cookie.get ).toHaveBeenCalledWith(FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY);
//     //       expect( $cookie.get ).toHaveBeenCalledWith(key);
//     //       done();
//     //     });
//     //   }, 1000);

//     //   it('receive string stringified json-item!', done => {
//     //     const obj = {
//     //       test: value
//     //     }
//     //     const json = JSON.stringify( obj );
//     //     const spy = jest.spyOn( $cookie, 'get').mockImplementation( ( key: string ) => {
//     //       return json;
//     //     });
//     //     service.getItem( key )
//     //     .subscribe( result => {
//     //       expect( result ).toEqual( obj );
//     //       expect( $cookie.get ).toHaveBeenCalledWith(FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY);
//     //       expect( $cookie.get ).toHaveBeenCalledWith(key);
//     //       done();
//     //     });
//     //   }, 1000);

//     //   it('throws Error!', done => {
//     //     const spy = jest.spyOn( $cookie, 'get').mockImplementation( ( key: string ) => {
//     //       throw new Error();
//     //     });
//     //     service.getItem( key )
//     //     .subscribe( result => {
//     //       expect( result ).toEqual( false );
//     //       expect( $cookie.get ).toHaveBeenCalledWith(FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY);
//     //       expect( $cookie.get ).toHaveBeenCalledWith(key);
//     //       done();
//     //     });
//     //   }, 1000);

//     //   it('is called with key and storageKey!', done => {
//     //     const spy = jest.spyOn( $cookie, 'get').mockImplementation( ( key: string ) => {
//     //       return value;
//     //     });
//     //     service.getItem( key, storageKey )
//     //     .subscribe( result => {
//     //       expect( result ).toEqual( value );
//     //       expect( $cookie.get ).toHaveBeenCalledWith( FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY );
//     //       expect( $cookie.get ).toHaveBeenCalledWith( storageKey.concat( '-', key ) );
//     //       done();
//     //     });
//     //   }, 1000);
//     // });

//     // describe('METHODE: removeItem', () => {
//     //   const key = 'testKey';
//     //   const value = 'testValue';
//     //   const storageKey = 'testStorageKey';
//     //   const testStorageMap = { testStorageKey: [ 'testKey' ] };

//     //   it('is called with key!', done => {
//     //     service.removeItem( key )
//     //     .subscribe( result => {
//     //       expect( result ).toEqual( true );
//     //       expect( $cookie.remove ).toHaveBeenCalledWith( key );
//     //       done();
//     //     });
//     //   }, 1000);

//     //   it('throws Error!', done => {
//     //     const spy = jest.spyOn( $cookie, 'remove').mockImplementation( ( key: string ) => {
//     //       throw new Error();
//     //     });
//     //     service.removeItem( key )
//     //     .subscribe( result => {
//     //       expect( result ).toEqual( false );
//     //       expect( $cookie.remove ).toHaveBeenCalledWith( key );
//     //       done();
//     //     });
//     //   }, 1000);

//     //   it('is called with storageKey!', done => {
//     //      service.setItem( key, value, null, storageKey )
//     //     .subscribe( result1 => {
//     //       expect( service.storageMap ).toEqual( testStorageMap )
//     //       service.removeItem( key, storageKey )
//     //       .subscribe( result => {
//     //         expect( result ).toEqual( true );
//     //         expect( $cookie.remove ).toHaveBeenCalledWith( storageKey.concat( '-', key ) );
//     //         expect( service.storageMap ).toEqual( {} )
//     //         done();
//     //       });
//     //     });
//     //   }, 1000);

//     // });

//     // describe('METHODE: clear', () => {
//     //   const key = 'testKey';
//     //   const value = 'testValue';
//     //   const storageKey = 'testStorageKey';
//     //   const testStorageMap = { testStorageKey: [ 'testKey' ] };

//     //   it('called without storageKey!', done => {
//     //     service.setItem( key, value, null, storageKey )
//     //     .subscribe( result => {
//     //       expect( service.storageMap ).toEqual( testStorageMap );
//     //       service.clear().subscribe( () => {
//     //         expect( $cookie.removeAll ).toHaveBeenCalled();
//     //         expect( service.storageMap ).toEqual( {} );
//     //         done();
//     //       })
//     //     })
//     //   }, 1000);

//     //   it('called with storageKey!', done => {
//     //     const expectedStorageMap = {
//     //       testStorageKey: [
//     //         key.concat( '1' ),
//     //         key.concat( '2' ),
//     //         key.concat( '3' )
//     //       ]
//     //     }
//     //     combineLatest([
//     //       service.setItem( key.concat( '1' ), value, null, storageKey ),
//     //       service.setItem( key.concat( '2' ), value, null, storageKey ),
//     //       service.setItem( key.concat( '3' ), value, null, storageKey ),
//     //     ])
//     //     .subscribe( result => {
//     //       expect( service.storageMap ).toEqual( expectedStorageMap );
//     //       service.clear( storageKey ).subscribe( result => {
//     //         expect( result ).toEqual( true );
//     //         expect( $cookie.remove ).toHaveBeenCalledWith( storageKey.concat( '-', key, '1') );
//     //         expect( $cookie.remove ).toHaveBeenCalledWith( storageKey.concat( '-', key, '2') );
//     //         expect( $cookie.remove ).toHaveBeenCalledWith( storageKey.concat( '-', key, '3') );
//     //         done();
//     //       });
//     //     })
//     //   });
//     // });

//   });

//   // describe('constructor', () => {
//   //   it('makes expected calls', () => {
//   //     service.getItem('test')
//   //     expect( $cookie.get ).toBeCalled();
//   //   });
//   // });
// });
