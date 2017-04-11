import { InformationDialogParams } from './InformationDialogParams';

class InformationDialogController extends InformationDialogParams {
    private _injector: ng.auto.IInjectorService;

    public $mdDialog: angular.material.IDialogService;
    public theme: string;
    public content: string;

    constructor(
        $mdDialog: angular.material.IDialogService,
        $injector: ng.auto.IInjectorService,
        $rootScope: ng.IRootScopeService) 
    {
        "ngInject";

        super();        
        this._injector = $injector;

        this.initTranslate()

        this.$mdDialog = $mdDialog;
        this.theme = $rootScope[pip.themes.ThemeRootVar];
    }

    private initTranslate(): void {
        let pipTranslate: pip.services.ITranslateService;
        pipTranslate = this._injector.has('pipTranslate') 
            ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        let content: string = this.message;
        let item: string;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'INFORMATION_TITLE': 'Information'});
            pipTranslate.translations('ru', { 'INFORMATION_TITLE': 'Информация' });

            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('INFORMATION_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('OK');
            content = pipTranslate.translate(content);
        } else {
            this.title = this.title || 'Information';
            this.ok = this.ok || 'OK';
        }

        let pipFormat: pip.services.IFormat = this._injector.has('pipFormat') 
            ? <pip.services.IFormat>this._injector.get('pipFormat') : null;

        if (this.item && pipFormat) {
            // item = _.truncate(params.item, 25);
            content = pipFormat.sprintf(content, item);
        }

        this.content = content;        
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