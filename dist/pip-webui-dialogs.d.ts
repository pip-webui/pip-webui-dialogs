declare module pip.dialogs {
import './error_details';
import './information';
import './options';
import './confirmation';

export class ConfirmationParams {
    ok: string;
    title: string;
    cancel: string;
}
export class ConfirmationDialogController {
    $mdDialog: any;
    theme: any;
    config: ConfirmationParams;
    constructor($mdDialog: any, $injector: any, $rootScope: any, params: ConfirmationParams);
    onOk(): void;
    onCancel(): void;
}

class ConfirmationService {
    _mdDialog: any;
    constructor($mdDialog: any);
    show(params: any, successCallback: any, cancelCallback: any): void;
}

import './ConfirmationController';
import './ConfirmationService';


import './InformationService';
import './InformationController';

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
    constructor($mdDialog: any, $injector: any, $rootScope: any, params: InformationParams);
    onOk(): void;
    onCancel(): void;
}

class InformationService {
    _mdDialog: any;
    constructor($mdDialog: any);
    show(params: any, successCallback: any, cancelCallback: any): void;
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
export class ErrorParams {
    ok: string;
    cancel: string;
    error: string;
}
export class ErrorDetailsDialogController {
    $mdDialog: any;
    theme: any;
    config: ErrorStrings;
    constructor($mdDialog: any, $injector: any, $rootScope: any, params: ErrorParams);
    onOk(): void;
    onCancel(): void;
}

class ErrorDetailsService {
    _mdDialog: any;
    constructor($mdDialog: any);
    show(params: any, successCallback: any, cancelCallback: any): void;
}

import './ErrorDetailsService';
import './ErrorDetailsController';

import './OptionsService';
import './OptionsController';
import './OptionsBigService';
import './OptionsBigController';

export class OptionsBigData {
    name: string;
    title: string;
    subtitle: string;
}
export class OptionsBigParams {
    title: string;
    applyButtonTitle: string;
    options: OptionsBigData[];
    selectedOption: OptionsBigData;
    deleted: any;
    selectedOptionName: string;
    deletedTitle: string;
    hint: string;
    noTitle: boolean;
    noActions: boolean;
    optionIndex: number;
}
export class OptionsBigDialogController {
    $mdDialog: any;
    theme: any;
    config: OptionsBigParams;
    constructor($mdDialog: any, $injector: any, $rootScope: any, params: OptionsBigParams);
    onOk(): void;
    onCancel(): void;
    onOptionSelect(event: any, option: any): void;
    onSelected(): void;
    onKeyUp(event: any, index: any): void;
    onSelect: () => void;
    private focusInput();
}

class OptionsBigService {
    _mdDialog: any;
    constructor($mdDialog: any);
    show(params: any, successCallback: any, cancelCallback: any): void;
}

export class OptionsData {
    icon: string;
    name: string;
    title: string;
    active: boolean;
}
export class OptionsParams {
    title: string;
    applyButtonTitle: string;
    options: OptionsData[];
    selectedOption: OptionsData;
    deleted: any;
    selectedOptionName: string;
    deletedTitle: string;
}
export class OptionsDialogController {
    $mdDialog: any;
    theme: any;
    config: OptionsParams;
    constructor($mdDialog: any, $injector: any, $rootScope: any, params: OptionsParams);
    onOk(): void;
    onCancel(): void;
    onOptionSelect(event: any, option: OptionsData): void;
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
