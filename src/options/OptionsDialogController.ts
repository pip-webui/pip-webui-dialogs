import { OptionsDialogData } from './OptionsDialogData';
import { OptionsDialogParams } from './OptionsDialogParams';
import { OptionsDialogResult } from './OptionsDialogResult';

class OptionsDialogController {

    public $mdDialog: angular.material.IDialogService;
    public theme: string;
    public config: OptionsDialogParams;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector: ng.auto.IInjectorService, 
        $rootScope: ng.IRootScopeService, 
        params: OptionsDialogParams) {
        "ngInject";

        this.$mdDialog = $mdDialog;
        this.config = new OptionsDialogParams();
        var pipTranslate: pip.services.ITranslateService = $injector.has('pipTranslate') ? <pip.services.ITranslateService>$injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option'});
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию'});

            this.config.title = pipTranslate.translate(params.title) || pipTranslate.translate('OPTIONS_TITLE');
            this.config.applyButtonTitle = pipTranslate.translate(params.applyButtonTitle) || pipTranslate.translate('SELECT');
        } else {
            this.config.title = params.title || 'Choose Option';
            this.config.applyButtonTitle = params.applyButtonTitle || 'Select';
        }

        this.theme = $rootScope['$theme'];
        this.config.options = params.options;
        this.config.selectedOption = _.find(params.options, {active: true}) || new OptionsDialogData();
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

    public onOptionSelect(event: ng.IAngularEvent, option: OptionsDialogData) {
        event.stopPropagation();
        this.config.selectedOptionName = option.name;
    }
            
    public onKeyPress (event: JQueryKeyEventObject) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            this.onSelect();
        }
    }

    public onSelect() {
        let option: OptionsDialogData;
        option = _.find(this.config.options, {name: this.config.selectedOptionName});

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