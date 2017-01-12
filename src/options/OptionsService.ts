
export interface IOptionsService {
    show(params, successCallback?: (option) => void, cancelCallback?: () => void): any;
}

class OptionsService implements IOptionsService {
    public _mdDialog: angular.material.IDialogService;
    public constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }
    public  show(params, successCallback?: (option) => void, cancelCallback?: () => void): any {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options/OptionsDialog.html',
            controller: 'pipOptionsDialogController',
            controllerAs: 'vm',
            locals: {params: params},
            clickOutsideToClose: true
         })
        .then((option) => {
            if (successCallback) {
                successCallback(option.option);
            }
        }, () => {
            if (cancelCallback) {
                cancelCallback();
            }
        });
                
    }
    
}

angular
    .module('pipOptionsDialog')
    .service('pipOptionsDialog', OptionsService);