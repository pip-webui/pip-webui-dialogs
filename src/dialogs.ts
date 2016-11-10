/**
 * @file Registration of dialogs
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

'use strict';

import './error_details';
import './information';
import './options';
import './confirmation';

angular
    .module('pipDialogs', [
        'pipInformationDialog',
        'pipConfirmationDialog',
        'pipOptionsDialog',
        'pipOptionsBigDialog',
        'pipErrorDetailsDialog',
        //'pipErrorDetails2Dialog'
    ]);

export * from './error_details';
//export * from './error_details2';
export * from './information';
export * from './options';
export * from './confirmation';
