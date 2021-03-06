import { OptionsBigDialogParams } from './OptionsBigDialogParams';
import { OptionsBigDialogResult } from './OptionsBigDialogResult';
import { IOptionsBigDialogService } from './IOptionsBigDialogService';

class OptionsBigDialogService implements IOptionsBigDialogService {
    public _mdDialog: angular.material.IDialogService;
    constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }
    public show(params, successCallback?: (result: OptionsBigDialogResult) => void, cancelCallback?: () => void): any {
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options_big/OptionsBigDialog.html',
            controller: 'pipOptionsBigDialogController',
            controllerAs: '$ctrl',
            locals: params,
            bindToController: true,        
            clickOutsideToClose: true
         })
        .then((result: OptionsBigDialogResult) => {
            if (successCallback) {
                successCallback(result);
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
    .module('pipOptionsBigDialog')
    .service('pipOptionsBigDialog', OptionsBigDialogService);