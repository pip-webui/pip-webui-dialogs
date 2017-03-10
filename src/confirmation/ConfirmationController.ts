import { ConfirmationParams } from './ConfirmationParams';

class ConfirmationDialogController extends  ConfirmationParams {
    private _injector: ng.auto.IInjectorService;

    public $mdDialog: angular.material.IDialogService;
    public theme: string;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector: ng.auto.IInjectorService,
        $rootScope: ng.IRootScopeService) 
    {
        "ngInject";

        super();
        this._injector = $injector;

        this.initTranslate();

        this.$mdDialog = $mdDialog;
        this.theme = $rootScope['$theme'];
    }

    private initTranslate(): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', { 'CONFIRM_TITLE': 'Confirm' });
            pipTranslate.translations('ru', { 'CONFIRM_TITLE': 'Подтвердите'});

            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('CONFIRM_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('OK');
            this.cancel = pipTranslate.translate(this.cancel) || ('CANCEL');
        } else {
            this.title = this.title || 'Confirm';
            this.ok = this.ok || 'OK';
            this.cancel = this.cancel || 'Cancel';
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