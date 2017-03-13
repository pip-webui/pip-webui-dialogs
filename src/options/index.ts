angular
    .module('pipOptionsDialog', [
        'ngMaterial', 
        'pipDialogs.Translate',
        'pipDialogs.Templates']);

import './OptionsDialogData';
import './OptionsDialogParams';
import './OptionsDialogResult';
import './OptionsDialogController';
import './OptionsDialogService';


export * from './OptionsDialogData';
export * from './OptionsDialogParams';
export * from './OptionsDialogResult';
export * from './OptionsDialogService';
