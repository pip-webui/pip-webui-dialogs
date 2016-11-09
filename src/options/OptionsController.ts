'use strict';

import IWindowService = angular.IWindowService;

export class OptionsData {
    public icon: string = 'star';
    public name: string;
    public title: string;
    public active: boolean = true; 
}

export class OptionsParams {
    public title: string;  
    public applyButtonTitle: string;
    public options: OptionsData[];
    public selectedOption: OptionsData;
    public deleted;
    public selectedOptionName: string;
    public deletedTitle: string;
}

export class OptionsDialogController {

    public $mdDialog;
    public theme;
    public config: OptionsParams;

    constructor(
        $mdDialog,
        $injector, 
        $rootScope, 
        params: OptionsParams) {
        "ngInject";

        this.$mdDialog = $mdDialog;
        this.config = new OptionsParams();
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option'});
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию'});

            this.config.title = params.title || 'OPTIONS_TITLE';
            this.config.applyButtonTitle = params.applyButtonTitle || 'SELECT';
        } else {
            this.config.title = params.title || 'Choose Option';
            this.config.applyButtonTitle = params.applyButtonTitle || 'Select';
        }

        this.theme = $rootScope.$theme;
        this.config.options = params.options;
        this.config.selectedOption = _.find(params.options, {active: true}) || new OptionsData();
        this.config.selectedOptionName = this.config.selectedOption.name;
        this.config.deleted = params.deleted;
        this.config.deletedTitle = params.deletedTitle;

        setTimeout(this.focusInput, 500);
    }

    public onOk(): void {
        this.$mdDialog.hide();
    }

    public onCancel(): void {
        this.$mdDialog.cancel();
    }

    public onOptionSelect(event, option: OptionsData) {
        event.stopPropagation();
        this.config.selectedOptionName = option.name;

    }
            
    public onKeyPress (event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            this.onSelect();
        }
    }

    public onSelect() {
        let option: OptionsData;
        option = _.find(this.config.options, {name: this.config.selectedOptionName});
        console.log(option);
        this.$mdDialog.hide({option: option, deleted: this.config.deleted});
    }

    private focusInput() {
        let list;
        list = $('.pip-options-dialog .pip-list');
        list.focus();
    }

}

angular
    .module('pipOptionsDialog')
    .controller('pipOptionsDialogController', OptionsDialogController);