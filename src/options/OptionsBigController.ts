import { OptionsBigParams } from './OptionsBigParams';
import { OptionsBigData } from './OptionsBigData';
import { IOptionsBigDialogController } from './IOptionsBigDialogController';

export class OptionsBigDialogController implements IOptionsBigDialogController {
    private _injector: ng.auto.IInjectorService;

    private $mdDialog: angular.material.IDialogService;
    public theme: string;
    public config: OptionsBigParams;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector: ng.auto.IInjectorService, 
        $rootScope: ng.IRootScopeService, 
        params: OptionsBigParams) 
    {
        "ngInject";

        this.$mdDialog = $mdDialog;
        this.config = new OptionsBigParams();
        this._injector = $injector;

        this.initTranslate(params)

        this.theme = $rootScope['$theme'];
        
        this.config.options = params.options;
        this.config.selectedOption = _.find(params.options, {active: true}) || new OptionsBigData();
        this.config.selectedOptionName = this.config.selectedOption.name;
        this.config.deleted = params.deleted;
        this.config.deletedTitle = params.deletedTitle;
        this.config.noActions = params.noActions || false;
        this.config.noTitle = params.noTitle || false;
        this.config.hint = params.hint || '';

        setTimeout(this.focusInput, 500);
    }

    private initTranslate(params: OptionsBigParams): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option'});
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию'});

            this.config.title =  pipTranslate.translate(params.title) || pipTranslate.translate('OPTIONS_TITLE');
            this.config.applyButtonTitle = pipTranslate.translate(params.applyButtonTitle) || pipTranslate.translate('SELECT');
        } else {
            this.config.title = params.title || 'Choose Option';
            this.config.applyButtonTitle = params.applyButtonTitle || 'Select';
        }        
    }

    public onOk(): void {
        this.$mdDialog.hide();
    }

    public onCancel(): void {
        this.$mdDialog.cancel();
    }

    public onOptionSelect(event: ng.IAngularEvent, option: OptionsBigData) {
        event.stopPropagation();
        this.config.selectedOptionName = option.name;

        if (this.config.noActions) {
            this.onSelect();
        }
    }

    public onSelected() {
        this.config.selectedOptionName = this.config.options[this.config.optionIndex].name;

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
        let option: OptionsBigData;
        option = <OptionsBigData>_.find(this.config.options, {name: this.config.selectedOptionName}) || new OptionsBigData();
        this.$mdDialog.hide({option: option, deleted: this.config.deleted});
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