class ErrorDetailsService {
    public _mdDialog: angular.material.IDialogService;

    public constructor($mdDialog: angular.material.IDialogService) {
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
    .module('pipErrorDetailsDialog')
    .service('pipErrorDetailsDialog', ErrorDetailsService);