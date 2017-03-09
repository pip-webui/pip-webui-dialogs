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
    public $mdDialog: ng.material.IDialogService;
    public theme: string;
    public config: ErrorStrings;

    constructor(
        $mdDialog: ng.material.IDialogService,
        $injector: ng.auto.IInjectorService,
        $rootScope: ng.IRootScopeService, 
        params: ErrorParams) 
    {
        "ngInject";
        this.config = new ErrorStrings();
        let pipTranslate: pip.services.ITranslateService = $injector.has('pipTranslate') 
            ? <pip.services.ITranslateService>$injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', {
                'OK': 'Ok',
                'CANCEL': 'Cancel',
                'ERROR_DETAILS': 'Error details',
                'CODE': 'Error code',
                'PATH': 'Path',
                'ERROR': 'Error',
                'METHOD': 'Method',
                'MESSAGE': 'Message',
                'DISMISS': 'Dismiss'
            });
            pipTranslate.translations('ru', {
                'OK': 'Ок',
                'CANCEL': 'Отмена',                    
                'ERROR_DETAILS': 'Детали ошибки',
                'CODE': 'Код ошибки',
                'PATH': 'Путь',
                'ERROR': 'Ошибка',
                'METHOD': 'Метод',
                'MESSAGE': 'Сообщение'
            });
            this.config.ok = pipTranslate.translate(params.ok) || pipTranslate.translate('OK');
            this.config.cancel = pipTranslate.translate(params.cancel) || pipTranslate.translate('CANCEL');
            this.config.errorDetails = pipTranslate.translate('ERROR_DETAILS');
            this.config.dismissButton = pipTranslate.translate('DISMISS');
            this.config.errorMessage = pipTranslate.translate('MESSAGE');
            this.config.errorCode = pipTranslate.translate('CODE');
            this.config.errorMethod = pipTranslate.translate('METHOD');
            this.config.errorPath = pipTranslate.translate('PATH');
            this.config.errorText = pipTranslate.translate('ERROR');                
        } else {
            this.config.ok = params.ok || 'Ok';
            this.config.cancel = params.cancel || 'Cancel';
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