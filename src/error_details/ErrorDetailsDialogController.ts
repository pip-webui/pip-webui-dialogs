import { ErrorDetailsDialogParams } from './ErrorDetailsDialogParams';

class ErrorDialogStrings {
    public errorDetails: string = 'Error details';
    public errorMessage: string = 'Message';
    public errorCode: string = 'Code';
    public errorMethod: string = 'Method';
    public errorPath: string = 'Path';
    public errorText: string = 'Error';   
}

class ErrorDetailsDialogController extends ErrorDetailsDialogParams {
    private _injector: ng.auto.IInjectorService;

    public $mdDialog: ng.material.IDialogService;
    public theme: string;
    public strings: ErrorDialogStrings;

    constructor(
        $mdDialog: ng.material.IDialogService,
        $injector: ng.auto.IInjectorService,
        $rootScope: ng.IRootScopeService) 
    {
        "ngInject";
        
        super();

        this.strings = new ErrorDialogStrings();
        this._injector = $injector;
        this.$mdDialog = $mdDialog;
        this.theme = $rootScope[pip.themes.ThemeRootVar];

        this.initTranslate();

        if (!this.error) {
            this.error = '<none>';             
        }
    }

    private initTranslate(): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') 
            ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', {
                'OK': 'Ok',
                'CANCEL': 'Cancel',
                'ERROR_DETAILS': 'Error details',
                'ERROR_CODE': 'Error code',
                'ERROR_PATH': 'Path',
                'ERROR_ERROR': 'Error',
                'ERROR_METHOD': 'Method',
                'ERROR_MESSAGE': 'Message',
                'ERROR_DISMISS': 'Dismiss'
            });
            pipTranslate.translations('ru', {
                'OK': 'Ок',
                'CANCEL': 'Отмена',
                'ERROR_DETAILS': 'Детали ошибки',
                'ERROR_CODE': 'Код ошибки',
                'ERROR_PATH': 'Путь',
                'ERROR_ERROR': 'Ошибка',
                'ERROR_METHOD': 'Метод',
                'ERROR_MESSAGE': 'Сообщение'
            });
            this.dismissButton = pipTranslate.translate(this.dismissButton) || pipTranslate.translate('ERROR_DISMISS');

            this.strings.errorDetails = pipTranslate.translate('ERROR_DETAILS');
            this.strings.errorMessage = pipTranslate.translate('ERROR_MESSAGE');
            this.strings.errorCode = pipTranslate.translate('ERROR_CODE');
            this.strings.errorMethod = pipTranslate.translate('ERROR_METHOD');
            this.strings.errorPath = pipTranslate.translate('ERROR_PATH');
            this.strings.errorText = pipTranslate.translate('ERROR_ERROR');
        } else {
            this.dismissButton = this.dismissButton || 'Dismiss';
        }
    }
    
    public onOk(): void {
        this.$mdDialog.hide();
    }

    public isString(error): boolean {
        return _.isString(error);
    }

    public getErrorText(): string {
        let error: string;

        if (_.isString(this.error)) { 
            return this.error
        } 
        if (this.error && this.error.error) {
            return this.error.error.toString();
        }
        if (this.error && this.error.data && this.error.data.error) {
            return this.error.data.error.toString();
        }
        
        return '<none>';
    }

}

angular
    .module('pipErrorDetailsDialog')
    .controller('pipErrorDetailsDialogController', ErrorDetailsDialogController);