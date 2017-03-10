
angular
    .module('pipOptionsDialog', [
        'ngMaterial', 
        'pipDialogs.Translate',
        'pipDialogs.Templates']);

import './OptionsDialogData';
import './OptionsDialogParams';
import './OptionsDialogResult';
import './OptionsDialogService';
import './OptionsDialogController';


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