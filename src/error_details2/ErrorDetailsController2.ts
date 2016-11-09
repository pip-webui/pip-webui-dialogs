'use strict';

export class ErrorDetailsData {

}

export class ErrorDetailsStrings {
    public time: string = 'Time';
    public type: string = 'Type';
    public correlationId: string = 'CorrelationId';
    public source: string = 'Source';
    public message: string = 'Message';
    public trace: string = 'Trace'; 
}

export class ErrorDetailsDialogController2 {

    public $mdDialog;
    public theme;
    public localStrings: ErrorDetailsStrings;

    constructor(
        $mdDialog,
        $injector,
        $rootScope, 
        params: ErrorDetailsData) {
        "ngInject";

        this.localStrings = new ErrorDetailsStrings();
        let pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', {
                'TIME': 'Time',
                'TYPE': 'Type',
                'CORRELATION_ID': 'CorrelationId',
                'SOURCE': 'Source',
                'MESSAGE': 'Message',
                'TRACE': 'Trace'
            });
            pipTranslate.translations('ru', {
                'TIME': 'Время',
                'TYPE': 'Тип',
                'CORRELATION_ID': 'Id',
                'SOURCE': 'Source',
                'MESSAGE': 'Сообщение',
                'TRACE': 'Trace'
            });   
            this.localStrings.time = 'TIME';
            this.localStrings.type = 'TYPE';
            this.localStrings.correlationId = 'CORRELATION_ID';
            this.localStrings.source = 'SOURCE';   
            this.localStrings.message = 'MESSAGE';
            this.localStrings.trace = 'TRACE';      
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
    .module('pipErrorDetails2Dialog')
    .controller('pipErrorDetails2DialogController', ErrorDetailsDialogController2);