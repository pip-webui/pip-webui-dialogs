import { ErrorDetailsDialogParams } from './ErrorDetailsDialogParams';
import { IErrorDetailsDialogService } from './IErrorDetailsDialogService';

class ErrorDetailsDialogService implements IErrorDetailsDialogService {
    public _mdDialog: angular.material.IDialogService;

    public constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }
    
    public show(params: ErrorDetailsDialogParams, 
        successCallback?: () => void, cancelCallback?: () => void) {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'error_details/ErrorDetailsDialog.html',
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
    .service('pipErrorDetailsDialog', ErrorDetailsDialogService);