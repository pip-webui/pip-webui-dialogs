import { InformationParams } from './InformationParams';
import { InformationStrings } from './InformationStrings';

export class InformationDialogController {
    private _injector: ng.auto.IInjectorService;

    public $mdDialog: angular.material.IDialogService;
    public theme: string;
    public config: InformationStrings;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector: ng.auto.IInjectorService,
        $rootScope: ng.IRootScopeService, 
        params: InformationParams) 
    {
        "ngInject";
        this.config = new InformationStrings();
        this._injector = $injector;

        this.initTranslate(params)

        this.$mdDialog = $mdDialog;
        this.theme = $rootScope['$theme'];
        this.config.error = params.error;
    }

    private initTranslate(params: InformationParams): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        let content = params.message, item;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'INFORMATION_TITLE': 'Information'});
            pipTranslate.translations('ru', { 'INFORMATION_TITLE': 'Информация' });

            this.config.title = pipTranslate.translate(params.title) || pipTranslate.translate('INFORMATION_TITLE');
            this.config.ok = pipTranslate.translate(params.ok) || pipTranslate.translate('OK');
            content = pipTranslate.translate(content);
        } else {
            this.config.title = params.title || 'Information';
            this.config.ok = params.ok || 'OK';
        }

        let pipFormat: pip.services.IFormat = this._injector.has('pipFormat') ? <pip.services.IFormat>this._injector.get('pipFormat') : null;

        if (params.item && pipFormat) {
            item = _.truncate(params.item, 25);
            content = pipFormat.sprintf(content, item);
        }

        this.config.content = content;        
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