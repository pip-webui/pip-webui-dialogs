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
export class ErrorParams {
    ok: string;
    cancel: string;
    error: string;
}
export class ErrorDetailsDialogController {
    $mdDialog: any;
    theme: any;
    config: ErrorStrings;
    constructor($mdDialog: any, $injector: any, pipTranslate: any, $rootScope: any, params: ErrorParams);
    onOk(): void;
    onCancel(): void;
}

class ErrorDetailsService {
    _mdDialog: any;
    constructor($mdDialog: any);
    show(params: any, successCallback: any, cancelCallback: any): void;
}



export class InformationStrings {
    ok: string;
    title: string;
    message: string;
    error: string;
    content: any;
}
export class InformationParams {
    ok: string;
    title: string;
    message: string;
    error: string;
    item: any;
}
export class InformationDialogController {
    $mdDialog: any;
    theme: any;
    config: InformationStrings;
    constructor($mdDialog: any, $injector: any, pipTranslate: any, $rootScope: any, params: InformationParams);
    onOk(): void;
    onCancel(): void;
}

class InformationService {
    _mdDialog: any;
    constructor($mdDialog: any);
    show(params: any, successCallback: any, cancelCallback: any): void;
}



export class OptionsParams {
    title: string;
    applyButtonTitle: string;
    options: any;
    selectedOption: any;
    deleted: any;
    selectedOptionName: string;
    deletedTitle: any;
}
export class OptionsDialogController {
    $mdDialog: any;
    theme: any;
    config: OptionsParams;
    constructor($mdDialog: any, $injector: any, pipTranslate: any, $rootScope: any, params: OptionsParams);
    onOk(): void;
    onCancel(): void;
    onOptionSelect(event: any, option: any): void;
    onKeyPress(event: any): void;
    onSelect(): void;
    private focusInput();
}

class OptionsService {
    _mdDialog: any;
    constructor($mdDialog: any);
    show(params: any, successCallback: any, cancelCallback: any): void;
}


}
