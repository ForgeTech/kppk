import { Injectable, inject } from "@angular/core";
import { FgBaseService } from "@fg-kppk/fg-base";
import { REACT_FILE_IMPORTER_V1 } from "./react-file-importer.machine";
import { ActorSystem, assign, fromPromise } from "xstate";
import { FgImmutableService } from "../../service/fg-immutable.service";
import { REACT_FILE_IMPORTER_CONTEXT } from "./react-file-importer.types";

@Injectable({
    providedIn: 'root',
  })
  export class ReactFileImporterService extends FgBaseService {
    public machine;
    public $immer = inject(FgImmutableService)
    // CONSTRUCTOR
    constructor() {
      super();
      this.machine = REACT_FILE_IMPORTER_V1.provide({
        actions: {
            assign_reset_context: assign(this.assign_reset_context),
            assign_file_info: assign(this.assign_file_info),
            assign_parse_result: assign(this.assign_parse_result),
            assign_parse_error: assign(this.assign_parse_error)
        },
        actors: {
            actor_parse_file: fromPromise( this.actor_parse_file ),
        },
      });
    }
    protected assign_reset_context = ({ context, event }: { context: REACT_FILE_IMPORTER_CONTEXT, event: any}) => {
        return this.$immer.produce( context, draft => {
            draft = {}
        });
    };
    protected assign_file_info = ({ context, event }: { context: REACT_FILE_IMPORTER_CONTEXT, event: any}) => {
        return this.$immer.produce( context, draft => {
            draft.file_info = {
                test: 'test'
            }
        });
    };
    protected assign_parse_result = ({ context, event }: { context: REACT_FILE_IMPORTER_CONTEXT, event: any}) => {
        return this.$immer.produce( context, draft => {
            draft.result_raw = [['test']];
        });
    };
    protected assign_parse_error = ({ context, event }: { context: REACT_FILE_IMPORTER_CONTEXT, event: any}) => {
        return this.$immer.produce( context, draft => {
            draft.error = 'error'
        });
    };
    protected actor_parse_file = async ({ input }: { input: any, system: ActorSystem<any>}) => {
        return 'test';
    };
}