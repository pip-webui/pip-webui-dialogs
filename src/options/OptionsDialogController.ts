import { OptionsDialogData } from './OptionsDialogData';
import { OptionsDialogParams } from './OptionsDialogParams';
import { OptionsDialogResult } from './OptionsDialogResult';

class OptionsDialogController extends OptionsDialogParams {
    private _injector: ng.auto.IInjectorService;
    public $mdDialog: angular.material.IDialogService;
    public theme: string;
    public optionIndex: number;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector: ng.auto.IInjectorService, 
        $rootScope: ng.IRootScopeService) 
    {
        "ngInject";

        super();
        this.$mdDialog = $mdDialog;
        this._injector = $injector;
        this.theme = $rootScope[pip.themes.ThemeRootVar];
        this.options = this.options || [];

        this.initTranslate();
        
        this.selectedOption = _.find(this.options, {active: true}) || null;
        let name: string = this.selectedOption ? this.selectedOption.name : this.selectedOptionName;
        let index: number = _.findIndex(this.options, (opt: OptionsDialogData) => {
            return opt.name == name;
        });
        this.optionIndex = index == -1 ? 0 : index;
        this.selectedOption = this.options[this.optionIndex];
        this.selectedOptionName = this.selectedOption.name;

        setTimeout(this.focusInput, 500);
    }

    private initTranslate(): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option' });
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию' });

            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('OPTIONS_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('SELECT');
        } else {
            this.title = this.title || 'Choose Option';
            this.ok = this.ok || 'Select';
        }
              
    }

    public onOk(): void {
        this.$mdDialog.hide();
    }

    public onCancel(): void {
        this.$mdDialog.cancel();
    }

    public onOptionSelect(event: ng.IAngularEvent, option: OptionsDialogData) {
        event.stopPropagation();
        this.selectedOptionName = option.name;
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
        option = _.find(this.options, { name: this.selectedOptionName });

        this.$mdDialog.hide({ option: option, isCheckboxOption: this.isCheckboxOption });
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