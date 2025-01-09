import { ActorSystem, fromPromise } from "xstate";
import { ReactFileImporterService } from "./react-file-importer.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class BauteilflaechenFileImporterService extends ReactFileImporterService {
    // CONSTRUCTOR
    constructor() {
      super();
      this.machine = this.machine.provide({
        actors: {
            actor_parse_file: fromPromise( this.actor_parse_bauteilflaeche_file ),
        },
      });
    }

    protected actor_parse_bauteilflaeche_file = async ({ input }: { input: any, system: ActorSystem<any>}) => {
        return 'test';
    };
}