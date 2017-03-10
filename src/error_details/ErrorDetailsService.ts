import { ErrorParams } from './ErrorParams';

export interface IConfirmationService {
    show(params: ErrorParams, successCallback?: () => void, cancelCallback?: () => void): any;
}

class ErrorDetailsService {
    public _mdDialog: angular.material.IDialogService;

    public constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }
    
    public show(params: ErrorParams, successCallback?: () => void, cancelCallback?: () => void) {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'error_details/ErrorDetails.html',
            controller: 'pipErrorDetailsDialogController',
            controllerAs: 'vm',
            locals: {params: params}, // todo bindToController: true,
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