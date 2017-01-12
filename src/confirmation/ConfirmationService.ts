import { ConfirmationParams } from './ConfirmationController';

export interface IConfirmationService {
    show(params, successCallback?: () => void, cancelCallback?: () => void): any;
}

class ConfirmationService {
    private _mdDialog: angular.material.IDialogService;
    public constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }
    public show(params: ConfirmationParams, successCallback?: () => void, cancelCallback?: () => void) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'confirmation/ConfirmationDialog.html',
            controller: 'pipConfirmationDialogController',
            controllerAs: 'vm',
            locals: { params: params },
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
    .module('pipConfirmationDialog')
    .service('pipConfirmationDialog', ConfirmationService);