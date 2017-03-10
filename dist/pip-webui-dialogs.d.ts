declare module pip.dialogs {


export class ConfirmationParams {
    ok: string;
    title?: string;
    cancel: string;
    event?: MouseEvent;
}

export interface IConfirmationService {
    show(params: ConfirmationParams, successCallback?: () => void, cancelCallback?: () => void): any;
}



export class ErrorDetailsDialogController {
    private _injector;
    $mdDialog: ng.material.IDialogService;
    theme: string;
    config: ErrorStrings;
    constructor($mdDialog: ng.material.IDialogService, $injector: ng.auto.IInjectorService, $rootScope: ng.IRootScopeService, params: ErrorParams);
    private initTranslate(params);
    onOk(): void;
    onCancel(): void;
}

export interface IConfirmationService {
    show(params: ErrorParams, successCallback?: () => void, cancelCallback?: () => void): any;
}

export class ErrorParams {
    event: MouseEvent;
    ok: string;
    cancel: string;
    error: string;
}

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


export class InformationDialogController {
    private _injector;
    $mdDialog: angular.material.IDialogService;
    theme: string;
    config: InformationStrings;
    constructor($mdDialog: angular.material.IDialogService, $injector: ng.auto.IInjectorService, $rootScope: ng.IRootScopeService, params: InformationParams);
    private initTranslate(params);
    onOk(): void;
    onCancel(): void;
}

export class InformationParams {
    ok: string;
    title?: string;
    message?: string;
    error?: string;
    item: any;
}

export interface IInformationService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): any;
}

export class InformationStrings {
    ok: string;
    title: string;
    message: string;
    error: string;
    content: any;
}


export class InformationDialogController {
    private _injector;
    $mdDialog: angular.material.IDialogService;
    theme: string;
    config: InformationStrings;
    constructor($mdDialog: angular.material.IDialogService, $injector: ng.auto.IInjectorService, $rootScope: ng.IRootScopeService, params: InformationParams);
    private initTranslate(params);
    onOk(): void;
    onCancel(): void;
}

export class InformationParams {
    ok: string;
    title?: string;
    message?: string;
    error?: string;
    item: any;
}

export interface IInformationService {
    show(params: InformationParams, successCallback?: () => void, cancelCallback?: () => void): any;
}

export class InformationStrings {
    ok: string;
    title: string;
    message: string;
    error: string;
    content: any;
}



export class OptionsBigDialogData {
    name: string;
    title: string;
    subtitle: string;
}

export class OptionsBigDialogParams {
    title?: string;
    applyButtonTitle?: string;
    options?: OptionsBigDialogData[];
    selectedOption?: OptionsBigDialogData;
    deleted?: boolean;
    selectedOptionName?: string;
    deletedTitle?: string;
    hint?: string;
    noTitle: boolean;
    noActions: boolean;
    optionIndex: number;
}

export class OptionsBigDialogResult {
    option: OptionsBigDialogData;
    deleted: boolean;
}

export interface IOptionsBigDialogService {
    show(params: OptionsBigDialogParams, successCallback?: (result: OptionsBigDialogResult) => void, cancelCallback?: () => void): any;
}

export class OptionsDialogController {
    $mdDialog: angular.material.IDialogService;
    theme: string;
    config: OptionsDialogParams;
    constructor($mdDialog: angular.material.IDialogService, $injector: ng.auto.IInjectorService, $rootScope: ng.IRootScopeService, params: OptionsDialogParams);
    onOk(): void;
    onCancel(): void;
    onOptionSelect(event: ng.IAngularEvent, option: OptionsDialogData): void;
    onKeyPress(event: JQueryKeyEventObject): void;
    onSelect(): void;
    private focusInput();
}

export class OptionsDialogData {
    icon: string;
    name: string;
    title: string;
    active: boolean;
}

export class OptionsDialogParams {
    event: MouseEvent;
    title?: string;
    applyButtonTitle?: string;
    options?: OptionsDialogData[];
    selectedOption?: OptionsDialogData;
    deleted?: boolean;
    selectedOptionName?: string;
    deletedTitle?: string;
}

export class OptionsDialogResult {
    option: OptionsDialogData;
    deleted: boolean;
}

export interface IOptionsDialogService {
    show(params: OptionsDialogParams, successCallback?: (result: OptionsDialogResult) => void, cancelCallback?: () => void): any;
}


}
