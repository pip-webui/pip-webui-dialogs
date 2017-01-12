'use strict';

import IWindowService = angular.IWindowService;

export class InformationStrings {
    public ok: string = 'OK';
    public title: string; 
    public message: string;
    public error: string;
    public content;
}

export class InformationParams {
    public ok: string = 'OK';
    public title: string; 
    public message: string;
    public error: string;
    public item;
}

export class InformationDialogController {

    public $mdDialog: angular.material.IDialogService;
    public theme: string;
    public config: InformationStrings;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector,
        $rootScope: ng.IRootScopeService, 
        params: InformationParams) {
        "ngInject";
        this.config = new InformationStrings();

        let content = params.message, item;

        let pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'INFORMATION_TITLE': 'Information'});
            pipTranslate.translations('ru', { 'INFORMATION_TITLE': 'Информация' });

            this.config.title = params.title || 'INFORMATION_TITLE';
            this.config.ok = params.ok || 'OK';
            content = pipTranslate.translate(content);
        } else {
            this.config.title = params.title || 'Information';
            this.config.ok = params.ok || 'OK';
        }

        let pipFormat = $injector.has('pipFormat') ? $injector.get('pipFormat') : null;

        if (params.item && pipFormat) {
            item = _.truncate(params.item, 25);
            content = pipFormat.sprintf(content, item);
            console.log('content2', content);
        }
        this.config.content = content;

        this.$mdDialog = $mdDialog;
        this.theme = $rootScope['$theme'];
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
    .module('pipInformationDialog')
    .controller('pipInformationDialogController', InformationDialogController);