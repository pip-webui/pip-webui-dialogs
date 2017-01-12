export interface IOptionsBigService {
    show(params, successCallback?: (option) => void, cancelCallback?: () => void): any;
}

class OptionsBigService implements IOptionsBigService {
    public _mdDialog: angular.material.IDialogService;
    constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }
    public show(params, successCallback?: (option) => void, cancelCallback?: () => void): any {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options/OptionsBigDialog.html',
            controller: 'pipOptionsBigDialogController',
            controllerAs: 'vm',
            locals: {params: params},
            clickOutsideToClose: true
         })
        .then((option) => {
            if (successCallback) {
                successCallback(option);
            }
        }, () => {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    }
    
}

angular
    .module('pipOptionsBigDialog')
    .service('pipOptionsBigDialog', OptionsBigService);