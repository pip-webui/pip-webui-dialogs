
angular
    .module('pipOptionsDialog', [
        'ngMaterial', 
        'pipDialogs.Translate',
        'pipDialogs.Templates']);

import './OptionsService';
import './OptionsController';


angular
    .module('pipOptionsBigDialog', [
        'ngMaterial', 
        'pipDialogs.Translate',
        'pipDialogs.Templates']);

import './OptionsBigParams';
import './OptionsBigData';
import './OptionsData';
import './OptionsParams';
import './IOptionsBigDialogController';        
import './OptionsBigService';
import './OptionsBigController';