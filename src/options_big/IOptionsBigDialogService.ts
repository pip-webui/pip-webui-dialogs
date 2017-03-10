import { OptionsBigDialogParams } from './OptionsBigDialogParams';
import { OptionsBigDialogResult } from './OptionsBigDialogResult';

export interface IOptionsBigDialogService {
    show(params: OptionsBigDialogParams, 
        successCallback?: (result: OptionsBigDialogResult) => void, 
        cancelCallback?: () => void): any;
}