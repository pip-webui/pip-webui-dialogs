import { OptionsBigDialogParams } from './OptionsBigDialogParams';
import { OptionsBigDialogData } from './OptionsBigDialogData';

class OptionsBigDialogController extends OptionsBigDialogParams {
    private _injector: ng.auto.IInjectorService;
    private $mdDialog: angular.material.IDialogService;

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

        this.initTranslate()

        this.selectedOption = _.find(this.options, {active: true}) || null;
        let name: string = this.selectedOption ? this.selectedOption.name : this.selectedOptionName;
        let index: number = _.findIndex(this.options, (opt: OptionsBigDialogData) => {
            return opt.name == name;
        });
        this.optionIndex = index == -1 ? 0 : index;
        this.selectedOption = this.options[this.optionIndex];
        this.selectedOptionName = this.selectedOption.name;

        setTimeout(this.focusInput, 500);
    }

    private initTranslate(): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') 
            ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', { 'DIALOG_OPTIONS_TITLE': 'Choose Option' });
            pipTranslate.translations('ru', { 'DIALOG_OPTIONS_TITLE': 'Выберите опцию' });
            pipTranslate.translations('en', { 'DIALOG_OPTIONS_SELECT': 'Select' });
            pipTranslate.translations('ru', { 'DIALOG_OPTIONS_SELECT': 'Выбрать' });
            pipTranslate.translations('en', { 'DIALOG_OPTIONS_CANCEL': 'Cancel' });
            pipTranslate.translations('ru', { 'DIALOG_OPTIONS_CANCEL': 'Отменить' });

            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('DIALOG_OPTIONS_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('DIALOG_OPTIONS_SELECT');
            this.cancel = pipTranslate.translate(this.cancel) || ('DIALOG_OPTIONS_CANCEL');
        } else {
            this.title = this.title || 'Choose Option';
            this.ok = this.ok || 'Select';
            this.cancel = this.cancel || 'Cancel';
        }      
    }

    public onOk(): void {
        this.$mdDialog.hide();
    }

    public onCancel(): void {
        this.$mdDialog.cancel();
    }

    public onOptionSelect(event: ng.IAngularEvent, option: OptionsBigDialogData) {
        event.stopPropagation();
        this.selectedOptionName = option.name;

        if (this.noActions) {
            this.onSelect();
        }
    }

    public onSelected() {
        this.selectedOptionName = this.options[this.optionIndex].name;

        if (this.noActions) {
               this.onSelect();
        }
    }

    public onKeyUp(event: JQueryKeyEventObject, index: number) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            if (index !== undefined && index > -1 && index < this.options.length) {
                this.selectedOptionName = this.options[index].name;
                this.onSelect();
            }
        }
    }
    
    public onSelect = function () {
        let option: OptionsBigDialogData;
        option = <OptionsBigDialogData>_.find(this.options, { name: this.selectedOptionName }) || new OptionsBigDialogData();
        this.$mdDialog.hide({ option: option });
    };

    private focusInput() {
        let list;
        list = $('.pip-options-dialog .pip-list');
        list.focus();
    }

}

angular
    .module('pipOptionsBigDialog')
    .controller('pipOptionsBigDialogController', OptionsBigDialogController);
