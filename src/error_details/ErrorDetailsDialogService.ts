import { ErrorDialogParams } from './ErrorDialogParams';

export interface IConfirmationService {
    show(params: ErrorDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}

class ErrorDetailsService {
    public _mdDialog: angular.material.IDialogService;

    public constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }
    
    public show(params: ErrorDialogParams, successCallback?: () => void, cancelCallback?: () => void) {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'error_details/ErrorDetails.html',
            controller: 'pipErrorDetailsDialogController',
            controllerAs: '$ctrl',
            locals: params, 
            bindToController: true,
            clickOutsideToClose: true
         })
        .then(() => {
            if (successCallback) {
                successCallback();
            }
        }, 
        () => {
            if (cancelCallback) {
                cancelCallback();
            }
        });
                
    }
    
}

angular
    .module('pipErrorDetailsDialog')
    .service('pipErrorDetailsDialog', ErrorDetailsService);