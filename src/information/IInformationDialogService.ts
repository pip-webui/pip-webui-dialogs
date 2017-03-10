import { InformationDialogParams } from './InformationDialogParams';

export interface IInformationDialogService {
    show(params: InformationDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}