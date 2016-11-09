
class OptionsService {
    public _mdDialog;
    public constructor($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    public show(params, successCallback, cancelCallback) {
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