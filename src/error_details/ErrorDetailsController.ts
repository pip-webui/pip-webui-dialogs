import { ErrorStrings } from './ErrorStrings';
import { ErrorParams } from './ErrorParams';

export class ErrorDetailsDialogController {
    private _injector: ng.auto.IInjectorService;

    public $mdDialog: ng.material.IDialogService;
    public theme: string;
    public config: ErrorStrings;

    constructor(
        $mdDialog: ng.material.IDialogService,
        $injector: ng.auto.IInjectorService,
        $rootScope: ng.IRootScopeService,
        params: ErrorParams) {
        "ngInject";
        this.config = new ErrorStrings();
        this._injector = $injector;

        this.initTranslate(params);

        this.$mdDialog = $mdDialog;
        this.theme = $rootScope.$theme;
        this.config.error = params.error;
    }

    private initTranslate(params: ErrorParams): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

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