import { ConfirmationParams } from './ConfirmationParams';

export class ConfirmationDialogController {
    private _injector: ng.auto.IInjectorService;

    public $mdDialog: angular.material.IDialogService;
    public theme: string;
    public config: ConfirmationParams;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector: ng.auto.IInjectorService,
        $rootScope: ng.IRootScopeService,
        params: ConfirmationParams) 
    {
        "ngInject";
        this.config = new ConfirmationParams();
        this._injector = $injector;

        this.initTranslate(params);

        this.$mdDialog = $mdDialog;
        this.theme = $rootScope['$theme'];
    }

    private initTranslate(params: ConfirmationParams): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', { 'CONFIRM_TITLE': 'Confirm' });
            pipTranslate.translations('ru', { 'CONFIRM_TITLE': 'Подтвердите'});

            this.config.title = pipTranslate.translate(params.title) || pipTranslate.translate('CONFIRM_TITLE');
            this.config.ok = pipTranslate.translate(params.ok) || pipTranslate.translate('OK');
            this.config.cancel = pipTranslate.translate(params.cancel) || ('CANCEL');
        } else {
            this.config.title = params.title || 'Confirm';
            this.config.ok = params.ok || 'OK';
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
    .module('pipConfirmationDialog', [
        'ngMaterial', 
        'pipDialogs.Translate',
        'pipDialogs.Templates'
    ])
    .controller('pipConfirmationDialogController', ConfirmationDialogController);