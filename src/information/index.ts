angular
    .module('pipInformationDialog', [
        'ngMaterial',
        'pipDialogs.Translate', 
        'pipDialogs.Templates']);

import './InformationDialogParams';
import './InformationDialogService';
import './InformationDialogController';

export * from './IInformationDialogService';
export * from './InformationDialogParams';
