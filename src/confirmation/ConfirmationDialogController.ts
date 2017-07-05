import { ConfirmationDialogParams } from './ConfirmationDialogParams';

class ConfirmationDialogController extends  ConfirmationDialogParams {
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
        this.theme = $rootScope[pip.themes.ThemeRootVar];
    }

    private initTranslate(): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') 
            ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', { 'DIALOG_CONFIRM_TITLE': 'Confirm' });
            pipTranslate.translations('ru', { 'DIALOG_CONFIRM_TITLE': 'Подтвердите'});
            pipTranslate.translations('en', { 'DIALOG_CONFIRM_OK': 'Ok' });
            pipTranslate.translations('ru', { 'DIALOG_CONFIRM_OK': 'Принять'});
            pipTranslate.translations('en', { 'DIALOG_CONFIRM_CANCEL': 'Cancel' });
            pipTranslate.translations('ru', { 'DIALOG_CONFIRM_CANCEL': 'Отменить'});

            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('DIALOG_CONFIRM_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('DIALOG_CONFIRM_OK');
            this.cancel = pipTranslate.translate(this.cancel) || ('DIALOG_CONFIRM_CANCEL');
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
    .module('pipConfirmationDialog')
    .controller('pipConfirmationDialogController', ConfirmationDialogController);