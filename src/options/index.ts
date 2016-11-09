'use strict';

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
        
import './OptionsBigService';
import './OptionsBigController';