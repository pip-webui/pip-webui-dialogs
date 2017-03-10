import { OptionsBigDialogParams } from './OptionsBigDialogParams';
import { OptionsBigDialogData } from './OptionsBigDialogData';

class OptionsBigDialogController {
    private _injector: ng.auto.IInjectorService;

    private $mdDialog: angular.material.IDialogService;
    public theme: string;
    public config: OptionsBigDialogParams;

    public optionIndex: number;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector: ng.auto.IInjectorService, 
        $rootScope: ng.IRootScopeService, 
        params: OptionsBigDialogParams) 
    {
        "ngInject";

        this.$mdDialog = $mdDialog;
        this.config = new OptionsBigDialogParams();
        this._injector = $injector;

        this.initTranslate(params)

        this.theme = $rootScope['$theme'];
        
        this.config.options = params.options;
        this.config.selectedOption = _.find(params.options, {active: true}) || null;
        this.config.selectedOptionName = params.selectedOptionName;
        this.config.noActions = params.noActions || false;
        this.config.noTitle = params.noTitle || false;
        this.config.hint = params.hint || '';
        let name: string = this.config.selectedOption ? this.config.selectedOption.name : this.config.selectedOptionName;
        let index: number = _.findIndex(this.config.options, (opt: OptionsBigDialogData) => {
            return opt.name == name;
        });
        this.optionIndex = index == -1 ? 0 : index;
        this.config.selectedOption = this.config.options[this.optionIndex];
        this.config.selectedOptionName = this.config.selectedOption.name;

        setTimeout(this.focusInput, 500);
    }

    private initTranslate(params: OptionsBigDialogParams): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option' });
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию' });

            this.config.title =  pipTranslate.translate(params.title) || pipTranslate.translate('OPTIONS_TITLE');
            this.config.ok = pipTranslate.translate(params.ok) || pipTranslate.translate('SELECT');
        } else {
            this.config.title = params.title || 'Choose Option';
            this.config.ok = params.ok || 'Select';
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
        this.config.selectedOptionName = option.name;

        if (this.config.noActions) {
            this.onSelect();
        }
    }

    public onSelected() {
        this.config.selectedOptionName = this.config.options[this.optionIndex].name;

        if (this.config.noActions) {
               this.onSelect();
        }
    }

    public onKeyUp(event: JQueryKeyEventObject, index: number) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            if (index !== undefined && index > -1 && index < this.config.options.length) {
                this.config.selectedOptionName = this.config.options[index].name;
                this.onSelect();
            }
        }
    }
    
    public onSelect = function () {
        let option: OptionsBigDialogData;
        option = <OptionsBigDialogData>_.find(this.config.options, { name: this.config.selectedOptionName }) || new OptionsBigDialogData();
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
