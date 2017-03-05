'use strict';

export class ConfirmationParams {
    public ok: string = 'OK';
    public title?: string; 
    public cancel: string = 'Cancel';
    public event?: MouseEvent;
}

export class ConfirmationDialogController {

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

        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = $injector.has('pipTranslate') ? <pip.services.ITranslateService>$injector.get('pipTranslate') : null;

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

        this.$mdDialog = $mdDialog;
        this.theme = $rootScope['$theme'];
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
        'pipDialogs.Templates'])
    .controller('pipConfirmationDialogController', ConfirmationDialogController);