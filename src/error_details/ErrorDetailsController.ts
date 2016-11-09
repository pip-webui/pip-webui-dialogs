'use strict';

import IWindowService = angular.IWindowService;

export class ErrorStrings {
    public ok: string = 'OK';
    public cancel: string = 'Cancel';
    public errorDetails: string = 'Error details';
    public dismissButton: string = 'Dismiss';
    public errorMessage: string = 'Message';
    public errorCode: string = 'Code';
    public errorMethod: string = 'Method';
    public errorPath: string = 'Path';
    public error: string = 'Error';
    public errorText: string = 'Error';   
}

export class ErrorParams {
    public ok: string = 'OK';
    public cancel: string = 'CANCEL';
    public error: string = 'ERROR';
}

export class ErrorDetailsDialogController {

    public $mdDialog;
    public theme;
    public config: ErrorStrings;

    constructor(
        $mdDialog,
        $injector,
        pipTranslate, 
        $rootScope, 
        params: ErrorParams) {
        "ngInject";
        this.config = new ErrorStrings();
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'ERROR_DETAILS': 'Error details',
                    'CODE': 'Error code',
                    'PATH': 'Path',
                    'ERROR': 'Error',
                    'METHOD': 'Method',
                    'MESSAGE': 'Message',
                    'DISMISS': 'Dismiss'
                });
                pipTranslate.translations('ru', {
                    'ERROR_DETAILS': 'Детали ошибки',
                    'CODE': 'Код ошибки',
                    'PATH': 'Путь',
                    'ERROR': 'Ошибка',
                    'METHOD': 'Метод',
                    'MESSAGE': 'Сообщение'
                });
                this.config.ok = params.ok;
                this.config.cancel = params.cancel;
                this.config.errorDetails = 'ERROR_DETAILS';
                this.config.dismissButton = 'DISMISS';
                this.config.errorMessage = 'MESSAGE';
                this.config.errorCode = 'CODE';
                this.config.errorMethod = 'METHOD';
                this.config.errorPath = 'PATH';
                this.config.errorText = 'ERROR';                
            } else {
                this.config.ok = params.ok;
                this.config.cancel = params.cancel;
            }
            this.$mdDialog = $mdDialog;
            this.theme = $rootScope.$theme;
            this.config.error = params.error;
    }

    public onOk(): void {
        this.$mdDialog.hide();
    }

    public onCancel(): void {
        this.$mdDialog.cancel();
    }

}

angular
    .module('pipErrorDetailsDialog')
    .controller('pipErrorDetailsDialogController', ErrorDetailsDialogController);