
class InformationService {
    public _mdDialog;
    public constructor($mdDialog) {
        this._mdDialog = $mdDialog;
    }

    public show(params, successCallback, cancelCallback) {
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