declare module pip.dialogs {



export class ErrorStrings {
    ok: string;
    cancel: string;
    errorDetails: string;
    dismissButton: string;
    errorMessage: string;
    errorCode: string;
    errorMethod: string;
    errorPath: string;
    error: string;
    errorText: string;
}
export class ErrorDetailsDialogController {
    $mdDialog: any;
    theme: any;
    config: ErrorStrings;
    constructor($mdDialog: any, pipTranslate: any, $injector: any, $rootScope: any, params: any);
    onOk(): void;
    onCancel(): void;
}

class ErrorDetailsService {
    _mdDialog: any;
    constructor($mdDialog: any);
    show(params: any, successCallback: any, cancelCallback: any): void;
}






}
