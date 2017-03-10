angular
    .module('pipErrorDetailsDialog', [
        'ngMaterial', 
        'pipDialogs.Translate',
        'pipDialogs.Templates']);

import './ErrorDetailsDialogParams';
import './ErrorDetailsDialogService';
import './ErrorDetailsDialogController';

export * from './ErrorDetailsDialogParams';
export * from './IErrorDetailsDialogService';