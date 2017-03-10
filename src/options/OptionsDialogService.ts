import { OptionsDialogParams } from './OptionsDialogParams';
import { OptionsDialogResult } from './OptionsDialogResult';
import { IOptionsDialogService } from './IOptionsDialogService';

class OptionsDialogService implements IOptionsDialogService {
    public _mdDialog: angular.material.IDialogService;
    public constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }
    public  show(params: OptionsDialogParams, 
        successCallback?: (result: OptionsDialogResult) => void, 
        cancelCallback?: () => void): any {
        
         this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options/OptionsDialog.html',
            controller: 'pipOptionsDialogController',
            controllerAs: '$ctrl',
            locals: params,
            bindToController: true,
            clickOutsideToClose: true
         })
        .then((result: OptionsDialogResult) => {
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
    .module('pipOptionsDialog')
    .service('pipOptionsDialog', OptionsDialogService);