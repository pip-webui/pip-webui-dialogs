angular
    .module('pipOptionsBigDialog', [
        'ngMaterial', 
        'pipDialogs.Translate',
        'pipDialogs.Templates']);

import './OptionsBigDialogParams';
import './OptionsBigDialogData';
import './OptionsBigDialogResult';
import './OptionsBigDialogService';
import './OptionsBigDialogController';

export * from './OptionsBigDialogParams';
export * from './OptionsBigDialogData';
export * from './OptionsBigDialogResult';
export * from './IOptionsBigDialogService';
