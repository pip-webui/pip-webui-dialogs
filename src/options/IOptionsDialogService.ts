import { OptionsDialogParams } from './OptionsDialogParams';
import { OptionsDialogResult } from './OptionsDialogResult';

export interface IOptionsDialogService {
    show(params: OptionsDialogParams, 
        successCallback?: (result: OptionsDialogResult) => void, 
        cancelCallback?: () => void): any;
}
