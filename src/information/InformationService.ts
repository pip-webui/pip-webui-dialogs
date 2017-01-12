export interface IInformationService {
    show(params, successCallback?: () => void, cancelCallback?: () => void): any;
}

class InformationService implements IInformationService {
    private _mdDialog: angular.material.IDialogService;
    
    constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }

    public show(params, successCallback?: () => void, cancelCallback?: () => void) {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'information/InformationDialog.html',
            controller: 'pipInformationDialogController',
            controllerAs: 'vm',
            locals: { params: params},
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
    .service('pipInformationDialog', InformationService);