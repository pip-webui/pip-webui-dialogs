declare module pip.dialogs {



export class ErrorDetailsDialogParams {
    event?: MouseEvent;
    dismissButton?: string;
    error: any;
}


export interface IErrorDetailsDialogService {
    show(params: ErrorDetailsDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}


export interface IInformationDialogService {
    show(params: InformationDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}



export class InformationDialogParams {
    event?: MouseEvent;
    ok?: string;
    title?: string;
    message: string;
    item?: any;
}



export interface IOptionsDialogService {
    show(params: OptionsDialogParams, successCallback?: (result: OptionsDialogResult) => void, cancelCallback?: () => void): any;
}


export class OptionsDialogData {
    icon: string;
    name: string;
    title: string;
    active: boolean;
}

export class OptionsDialogParams {
    event?: MouseEvent;
    title?: string;
    ok?: string;
    cancel?: string;
    options?: OptionsDialogData[];
    selectedOption?: OptionsDialogData;
    selectedOptionName?: string;
    isCheckboxOption?: boolean;
    checkboxOptionCaption?: string;
}

export class OptionsDialogResult {
    option: OptionsDialogData;
    isCheckboxOption: boolean;
}



export class ConfirmationDialogParams {
    event?: MouseEvent;
    ok?: string;
    title?: string;
    cancel?: string;
}


export interface IConfirmationDialogService {
    show(params: ConfirmationDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}



export interface IOptionsBigDialogService {
    show(params: OptionsBigDialogParams, successCallback?: (result: OptionsBigDialogResult) => void, cancelCallback?: () => void): any;
}


export class OptionsBigDialogData {
    name: string;
    title: string;
    subtitle: string;
}

export class OptionsBigDialogParams {
    event?: MouseEvent;
    title?: string;
    ok?: string;
    cancel?: string;
    options?: OptionsBigDialogData[];
    selectedOption?: OptionsBigDialogData;
    selectedOptionName?: string;
    hint?: string;
    noTitle: any;
    noActions: any;
}

export class OptionsBigDialogResult {
    option: OptionsBigDialogData;
    isCheckboxOption: boolean;
}


}
