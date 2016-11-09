import { ErrorDetailsData } from  "./ErrorDetailsController2";

class ErrorDetailsService2 {
    public _mdDialog;
    public constructor($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    public show(params: ErrorDetailsData, successCallback, cancelCallback) {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'error_details2/ErrorDetails2.html',
            controller: 'pipErrorDetails2DialogController',
            controllerAs: 'vm',
            locals: {params: params},
            clickOutsideToClose: true
         })
        .then(() => {
            if (successCallback) {
                successCallback();
            }
        }, () => {
            if (cancelCallback) {
                cancelCallback();
            }
        });
                
    }
    
}

angular
    .module('pipErrorDetails2Dialog')
    .service('pipErrorDetails2Dialog', ErrorDetailsService2);