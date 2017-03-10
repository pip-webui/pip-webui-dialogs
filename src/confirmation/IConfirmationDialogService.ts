import { ConfirmationDialogParams } from './ConfirmationDialogParams';

export interface IConfirmationDialogService {
    show(params: ConfirmationDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}
