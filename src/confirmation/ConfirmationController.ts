'use strict';

export class ConfirmationParams {
    public ok: string = 'OK';
    public title: string; 
    public cancel: string = 'Cancel';
}

export class ConfirmationDialogController {

    public $mdDialog;
    public theme;
    public config: ConfirmationParams;

    constructor(
        $mdDialog,
        $injector,
        $rootScope, 
        params: ConfirmationParams) {
        "ngInject";
        this.config = new ConfirmationParams();

        let pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', { 'CONFIRM_TITLE': 'Confirm' });
            pipTranslate.translations('ru', { 'CONFIRM_TITLE': 'Подтвердите'});

            this.config.title = params.title || 'CONFIRM_TITLE';
            this.config.ok = params.ok || 'OK';
            this.config.cancel = params.cancel || 'CANCEL';
        } else {
            this.config.title = params.title || 'Confirm';
            this.config.ok = params.ok || 'OK';
            this.config.cancel = params.cancel || 'Cancel';
        }

        this.$mdDialog = $mdDialog;
        this.theme = $rootScope.$theme;
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