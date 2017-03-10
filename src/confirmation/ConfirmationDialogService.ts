import { ConfirmationDialogParams } from './ConfirmationDialogParams';

export interface IConfirmationService {
    show(params: ConfirmationDialogParams, successCallback?: () => void, cancelCallback?: () => void): any;
}

class ConfirmationService implements IConfirmationService {
    private _mdDialog: angular.material.IDialogService;
    
    constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }

    public show(params: ConfirmationDialogParams, successCallback?: () => void, cancelCallback?: () => void) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'confirmation/ConfirmationDialog.html',
            controller: 'pipConfirmationDialogController',
            controllerAs: 'vm',
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
    .service('pipConfirmationDialog', ConfirmationService);