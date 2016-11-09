
class ConfirmationService {
    public _mdDialog;
    public constructor($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    public show(params, successCallback, cancelCallback) {
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