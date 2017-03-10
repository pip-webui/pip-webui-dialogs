import { InformationDialogParams } from './InformationDialogParams';
import { IInformationDialogService } from './IInformationDialogService';

class InformationDialogService implements IInformationDialogService {
    private _mdDialog: angular.material.IDialogService;
    
    constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }

    public show(params, successCallback?: () => void, cancelCallback?: () => void) {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'information/InformationDialog.html',
            controller: 'pipInformationDialogController',
            controllerAs: '$ctrl',
            locals: params,
            bindToController: true,
            clickOutsideToClose: true
         })
        .then(function () {
            if (successCallback) {
                successCallback();
            }
        });
                
    }
    
}

angular
    .module('pipInformationDialog')
    .service('pipInformationDialog', InformationDialogService);