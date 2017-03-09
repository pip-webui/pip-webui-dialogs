declare module pip.dialogs {

export class ConfirmationDialogController {
    private _injector;
    $mdDialog: angular.material.IDialogService;
    theme: string;
    config: ConfirmationParams;
    constructor($mdDialog: angular.material.IDialogService, $injector: ng.auto.IInjectorService, $rootScope: ng.IRootScopeService, params: ConfirmationParams);
    private initTranslate(params);
    onOk(): void;
    onCancel(): void;
}

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

class ErrorDetailsService {
    _mdDialog: angular.material.IDialogService;
    constructor($mdDialog: angular.material.IDialogService);
    show(params: any, successCallback: any, cancelCallback: any): void;
}

export class ErrorParams {
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


export interface IOptionsBigDialogController {
    onOk(): void;
    onCancel(): void;
    onKeyUp(event: JQueryKeyEventObject, index: number): void;
    onOptionSelect(event: ng.IAngularEvent, option: OptionsBigData): any;
    onSelected(): void;
    onSelect: Function;
    config: OptionsBigParams;
    theme: string;
}

export class OptionsBigDialogController implements IOptionsBigDialogController {
    private _injector;
    private $mdDialog;
    theme: string;
    config: OptionsBigParams;
    constructor($mdDialog: angular.material.IDialogService, $injector: ng.auto.IInjectorService, $rootScope: ng.IRootScopeService, params: OptionsBigParams);
    private initTranslate(params);
    onOk(): void;
    onCancel(): void;
    onOptionSelect(event: ng.IAngularEvent, option: OptionsBigData): void;
    onSelected(): void;
    onKeyUp(event: JQueryKeyEventObject, index: number): void;
    onSelect: () => void;
    private focusInput();
}

export class OptionsBigData {
    name: string;
    title: string;
    subtitle: string;
}

export class OptionsBigParams {
    title?: string;
    applyButtonTitle?: string;
    options?: OptionsBigData[];
    selectedOption?: OptionsBigData;
    deleted?: boolean;
    selectedOptionName?: string;
    deletedTitle?: string;
    hint?: string;
    noTitle: boolean;
    noActions: boolean;
    optionIndex: number;
}

export interface IOptionsBigService {
    show(params: any, successCallback?: (option) => void, cancelCallback?: () => void): any;
}

export class OptionsDialogController {
    $mdDialog: angular.material.IDialogService;
    theme: string;
    config: OptionsParams;
    constructor($mdDialog: angular.material.IDialogService, $injector: ng.auto.IInjectorService, $rootScope: ng.IRootScopeService, params: OptionsParams);
    onOk(): void;
    onCancel(): void;
    onOptionSelect(event: ng.IAngularEvent, option: OptionsData): void;
    onKeyPress(event: JQueryKeyEventObject): void;
    onSelect(): void;
    private focusInput();
}

export class OptionsData {
    icon: string;
    name: string;
    title: string;
    active: boolean;
}

export class OptionsParams {
    title?: string;
    applyButtonTitle?: string;
    options?: OptionsData[];
    selectedOption?: OptionsData;
    deleted?: boolean;
    selectedOptionName?: string;
    deletedTitle?: string;
}

export interface IOptionsService {
    show(params: any, successCallback?: (option) => void, cancelCallback?: () => void): any;
}


}
