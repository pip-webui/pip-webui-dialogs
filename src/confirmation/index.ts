angular
    .module('pipConfirmationDialog', [
        'ngMaterial', 
        'pipDialogs.Translate',
        'pipDialogs.Templates']);

import './ConfirmationDialogController';
import './ConfirmationDialogService';
import './ConfirmationDialogParams';

export * from './IConfirmationDialogService';