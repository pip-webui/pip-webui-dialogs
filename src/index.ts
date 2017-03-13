import './dependencies/TranslateFilter';
import './error_details';
import './information';
import './options';
import './options_big';
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
export * from './confirmation';
export * from './options';
export * from './options_big';
