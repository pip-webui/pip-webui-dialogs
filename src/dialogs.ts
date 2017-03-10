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
        'pipErrorDetailsDialog'
    ]);

export * from './error_details';
export * from './information';
export * from './options';
export * from './confirmation';
