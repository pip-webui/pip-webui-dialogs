import { ErrorDetailsDialogParams } from './ErrorDetailsDialogParams';

export interface IErrorDetailsDialogService {
    show(params: ErrorDetailsDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}
