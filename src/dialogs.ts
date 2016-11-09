﻿/**
 * @file Registration of dialogs
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

'use strict';

import './error_details';
import './information';
import './options';

angular
    .module('pipDialogs', [
        'pipInformationDialog',
        //'pipConfirmationDialog',
        'pipOptionsDialog',
        //'pipOptionsBigDialog',
        'pipErrorDetailsDialog'
    ]);

export * from './error_details';
export * from './information';
export * from './options';
