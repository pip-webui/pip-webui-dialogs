
class ErrorDetailsService2 {
    public _mdDialog;
    public constructor($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    public show(params, successCallback, cancelCallback) {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'error_details/ErrorDetails.html',
            controller: 'pipErrorDetailsDialogController',
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