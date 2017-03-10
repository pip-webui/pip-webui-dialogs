declare module pip.dialogs {


export class ConfirmationDialogParams {
    ok: string;
    title?: string;
    cancel: string;
    event?: MouseEvent;
}

export interface IConfirmationService {
    show(params: ConfirmationDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}




export interface IConfirmationService {
    show(params: ErrorDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}

export class ErrorDialogParams {
    event: MouseEvent;
    ok: string;
    cancel: string;
    error: string;
}

export class ErrorDialogStrings {
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




export class InformationDialogParams {
    ok: string;
    title?: string;
    message?: string;
    error?: string;
    item: any;
}

export interface IInformationService {
    show(params: InformationDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}

export class InformationDialogStrings {
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
