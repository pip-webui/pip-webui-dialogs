import { ConfirmationDialogParams } from './ConfirmationDialogParams';
import { IConfirmationDialogService } from './IConfirmationDialogService';

class ConfirmationDialogService implements IConfirmationDialogService {
    private _mdDialog: angular.material.IDialogService;
    
    constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }

    public show(params: ConfirmationDialogParams, successCallback?: () => void, cancelCallback?: () => void) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'confirmation/ConfirmationDialog.html',
            controller: 'pipConfirmationDialogController',
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
    .module('pipConfirmationDialog')
    .service('pipConfirmationDialog', ConfirmationDialogService);