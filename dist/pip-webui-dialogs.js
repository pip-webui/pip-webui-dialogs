/**
 * @file Registration of dialogs
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function (angular) {
    'use strict';

    angular.module('pipDialogs', [
        'pipInformationDialog',
        'pipConfirmationDialog',
        'pipOptionsDialog',
        'pipOptionsBigDialog',
        'pipErrorDetailsDialog'
    ]);

})(window.angular);


(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('confirmation/confirmation.html',
    '<!--\n' +
    '@file Confirmation dialog template\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-confirmation-dialog layout-column" width="400" md-theme="{{::theme}}">\n' +
    '    <div class="pip-header">\n' +
    '        <h3>{{:: title}}</h3>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button ng-click="onCancel()">{{:: cancel}}</md-button>\n' +
    '            <md-button class="md-accent" ng-click="onOk()">{{:: ok}}</md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('error_details/error_details.html',
    '<!--\n' +
    '@file Confirmation dialog template\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-error-details-dialog layout-column" width="400" md-theme="{{theme}}">\n' +
    '    <div class="pip-body">\n' +
    '        <div class="pip-header">\n' +
    '            <h3>{{::errorDetails | translate}}</h3>\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text"\n' +
    '             ng-if="error.code || (error.data && error.data.code)">\n' +
    '            {{::errorCode | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="error.code || (error.data && error.data.code)">\n' +
    '            {{error.code || error.data.code}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text"\n' +
    '             ng-if="error.path || (error.data && error.data.path)">\n' +
    '            {{::errorPath | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="error.path || (error.data && error.data.path)">\n' +
    '            {{error.path || error.data.path}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="error.error || (error.data && error.data.error)">\n' +
    '            {{::errorText | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="error.error || (error.data && error.data.error)">\n' +
    '            {{error.error || error.data.error}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="error.method || (error.data && error.data.method)">\n' +
    '            {{::errorMethod | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="error.method || (error.data && error.data.method)">\n' +
    '            {{error.method || error.data.method}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="error.message || (error.data && error.data.message)">\n' +
    '            {{::errorMessage | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1"\n' +
    '             ng-if="error.message || (error.data && error.data.message)">\n' +
    '            {{error.message || error.data.message}}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="md-accent m0" ng-click="onOk()">{{::dismissButton | translate}}</md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('information/information.html',
    '<!--\n' +
    '@file Information dialog content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-information-dialog layout-column"\n' +
    '           width="400" md-theme="{{theme}}">\n' +
    '    <div class="pip-header">\n' +
    '        <h3 >{{ title | translate }}</h3>\n' +
    '    </div>\n' +
    '    <div class="pip-body">\n' +
    '        <div class="pip-content">\n' +
    '            {{ content }}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="md-accent" ng-click="onOk()">{{ ok | translate }}</md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('options/options.html',
    '<!--\n' +
    '@file Options dialog content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-options-dialog layout-column"\n' +
    '           min-width="400" md-theme="{{theme}}">\n' +
    '    <md-dialog-content class="pip-body lp0 tp0 rp0 bp24 pip-scroll">\n' +
    '        <div class="pip-header" >\n' +
    '            <h3>{{::title | translate}}</h3>\n' +
    '            <div ng-show="deletedTitle" class="header-option text-subhead1 divider-bottom">\n' +
    '                <md-checkbox ng-model="deleted" aria-label="CHECKBOX">{{::deletedTitle | translate}}</md-checkbox>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="pip-content">\n' +
    '            <md-radio-group ng-model="selectedOptionName" class="pip-list md-primary" md-no-ink="true"\n' +
    '                            ng-keypress="onKeyPress($event)" tabindex="0">\n' +
    '                <div ng-repeat="option in options" class="pip-list-item" md-ink-ripple\n' +
    '                     ui-event="{ click: \'onOptionSelect($event, option)\' }"\n' +
    '                     ng-class="{ selected: option.name == selectedOptionName }">\n' +
    '                    <div class="pip-list-item item-padding">\n' +
    '                        <md-icon class="pip-option-icon" md-svg-icon="icons:{{option.icon}}" ng-if="option.icon">\n' +
    '                        </md-icon>\n' +
    '                        <div class="pip-option-title">\n' +
    '                            {{::option.title | translate}}\n' +
    '                        </div>\n' +
    '                        <md-radio-button ng-value="option.name" tabindex="-1"\n' +
    '                                         aria-label="{{::option.title | translate}}">\n' +
    '                        </md-radio-button>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '            </md-radio-group>\n' +
    '        </div>\n' +
    '    </md-dialog-content>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="pip-cancel" ng-click="onCancel()">{{::\'CANCEL\' | translate}}</md-button>\n' +
    '            <md-button class="pip-submit md-accent" ng-click="onSelect()">{{::applyButtonTitle | translate}}</md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('options/options_big.html',
    '<!--\n' +
    '@file Options dialog content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-options-dialog-big layout-column"\n' +
    '           min-width="400" md-theme="{{theme}}">\n' +
    '    <md-dialog-content class="pip-body pip-scroll" ng-class="{\'bp24\': !noActions}">\n' +
    '        <div class="pip-header" ng-class="{\'header-hint\': noTitle && hint}">\n' +
    '            <h3 class="m0" ng-if="!noTitle">\n' +
    '                {{::title | translate}}\n' +
    '            </h3>\n' +
    '            <div ng-show="noTitle && hint" class="dialog-hint layout-row layout-align-start-center">\n' +
    '                <div class="hint-icon-container flex-fixed" >\n' +
    '                    <md-icon md-svg-icon="icons:info-circle-outline"></md-icon>\n' +
    '                </div>\n' +
    '                <div>{{::hint | translate}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="content-divider" ng-if="!noTitle"></div>\n' +
    '        <div class="pip-content">\n' +
    '            <div class="spacer8" ng-if="noTitle && hint"></div>\n' +
    '            <md-list class="pip-menu  pip-ref-list"\n' +
    '                     pip-selected="optionIndex" index="{{optionIndex }}"\n' +
    '                     pip-select="onSelected($event)">\n' +
    '\n' +
    '                <md-list-item class="pip-ref-list-item pip-selectable layout-row layout-align-start-center"\n' +
    '                              ng-class="{\'selected md-focused\' : option.name == selectedOptionName,\n' +
    '                              \'divider-bottom\': $index != options.length - 1}"\n' +
    '                              md-ink-ripple\n' +
    '                              ng-keyup="onKeyUp($event, $index)"\n' +
    '                              ng-repeat="option in options" >\n' +
    '\n' +
    '                    <div class="pip-content  content-stretch" ng-click="onOptionSelect($event, option)">\n' +
    '                        <p class="pip-title spacer-right" ng-if="option.title" style="margin-bottom: 4px !important;">\n' +
    '                            {{::option.title | translate}}\n' +
    '                        </p>\n' +
    '                        <div class="pip-subtitle spacer-right"\n' +
    '                             style="height: inherit"\n' +
    '                             ng-if="option.subtitle">\n' +
    '                            {{::option.subtitle | translate}}\n' +
    '                        </div>\n' +
    '                        <div class="pip-subtitle spacer-right"\n' +
    '                             style="height: inherit" ng-if="option.text"\n' +
    '                             pip-translate-html="{{::option.text | translate}}">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </md-list-item>\n' +
    '\n' +
    '            </md-list>\n' +
    '        </div>\n' +
    '        <div class="spacer8" ng-if="noActions"></div>\n' +
    '    </md-dialog-content>\n' +
    '\n' +
    '    <div class="pip-footer" ng-if="!noActions">\n' +
    '        <div>\n' +
    '            <md-button class="pip-cancel" ng-click="onCancel()">{{::\'CANCEL\' | translate}}</md-button>\n' +
    '            <md-button class="pip-submit md-accent" ng-click="onSelect()" style="margin-right: -6px">\n' +
    '                {{::applyButtonTitle | translate}}\n' +
    '            </md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();

/**
 * @file Confirmation dialog
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipConfirmationDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipConfirmationDialog',
        ['$mdDialog', function ($mdDialog) {
            return {
                show: function (params, successCallback, cancelCallback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'confirmation/confirmation.html',
                        controller: 'pipConfirmationDialogController',
                        locals: { params: params },
                        clickOutsideToClose: true
                    })
                    .then(function () {
                        if (successCallback) {
                            successCallback();
                        }
                    }, function () {
                        if (cancelCallback) {
                            cancelCallback();
                        }
                    });
                }
            };
        }]
    );

    thisModule.controller('pipConfirmationDialogController',
        ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'CONFIRM_TITLE': 'Confirm'
                });
                pipTranslate.translations('ru', {
                    'CONFIRM_TITLE': 'Подтвердите'
                });

                $scope.title = params.title || 'CONFIRM_TITLE';
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'CANCEL';
            } else {
                $scope.title = params.title || 'Confirm';
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'Cancel';
            }

            $scope.theme = $rootScope.$theme;

            $scope.onCancel = function () {
                $mdDialog.cancel();
            };

            $scope.onOk = function () {
                $mdDialog.hide();
            };
        }]
    );

})(window.angular);

/**
 * @file Optional filter to translate string resources
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipDialogs.Translate', []);

    thisModule.filter('translate', ['$injector', function ($injector) {
        var pipTranslate = $injector.has('pipTranslate') 
            ? $injector.get('pipTranslate') : null;

        return function (key) {
            return pipTranslate  ? pipTranslate.translate(key) || key : key;
        }
    }]);

})();

/**
 * @file Information dialog
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve sample in sampler app
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipInformationDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipInformationDialog',
        ['$mdDialog', function ($mdDialog) {
            return {
                show: function (params, callback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'information/information.html',
                        controller: 'pipInformationDialogController',
                        locals: {params: params},
                        clickOutsideToClose: true
                    })
                        .then(function () {
                            if (callback) {
                                callback();
                            }
                        });
                }
            };
        }]
    );

    thisModule.controller('pipInformationDialogController',
        ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
            var content = params.message, item;

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'INFORMATION_TITLE': 'Information'
                });
                pipTranslate.translations('ru', {
                    'INFORMATION_TITLE': 'Информация'
                });

                $scope.title = params.title || 'INFORMATION_TITLE';
                $scope.ok = params.ok || 'OK';
                content = pipTranslate.translate(content);
            } else {
                $scope.title = params.title || 'Information';
                $scope.ok = params.ok || 'OK';
            }

            var pipFormat = $injector.has('pipFormat') ? $injector.get('pipFormat') : null;

            $scope.theme = $rootScope.$theme;
            if (params.item && pipFormat) {
                item = _.truncate(params.item, 25);
                content = pipFormat.sprintf(content, item);
                console.log('content2', content);
            }
            $scope.content = content;

            $scope.onOk = function () {
                $mdDialog.hide();
            };
        }]
    );

})(window.angular, window._);

/**
 * @file Error details dialog
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve sample in sampler app
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipErrorDetailsDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipErrorDetailsDialog',
        ['$mdDialog', function ($mdDialog) {
            return {
                show: function (params, successCallback, cancelCallback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'error_details/error_details.html',
                        controller: 'pipErrorDetailsDialogController',
                        locals: {params: params},
                        clickOutsideToClose: true
                    })
                        .then(function () {
                            if (successCallback) {
                                successCallback();
                            }
                        }, function () {
                            if (cancelCallback) {
                                cancelCallback();
                            }
                        });
                }
            };
        }]
    );

    thisModule.controller('pipErrorDetailsDialogController',
        ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
            
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'ERROR_DETAILS': 'Error details',
                    'CODE': 'Error code',
                    'PATH': 'Path',
                    'ERROR': 'Error',
                    'METHOD': 'Method',
                    'MESSAGE': 'Message',
                    'DISMISS': 'Dismiss'
                });
                pipTranslate.translations('ru', {
                    'ERROR_DETAILS': 'Детали ошибки',
                    'CODE': 'Код ошибки',
                    'PATH': 'Путь',
                    'ERROR': 'Ошибка',
                    'METHOD': 'Метод',
                    'MESSAGE': 'Сообщение'
                });
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'CANCEL';
                $scope.errorDetails = 'ERROR_DETAILS';
                $scope.dismissButton = 'DISMISS';
                $scope.errorMessage = 'MESSAGE';
                $scope.errorCode = 'CODE';
                $scope.errorMethod = 'METHOD';
                $scope.errorPath = 'PATH';
                $scope.errorText = 'ERROR';                
            } else {
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'Cancel';
                $scope.errorDetails = 'Error details';
                $scope.dismissButton = 'Dismiss';
                $scope.errorMessage = 'Message';
                $scope.errorCode = 'Code';
                $scope.errorMethod = 'Method';
                $scope.errorPath = 'Path';
                $scope.error = 'Error';
            }

            $scope.theme = $rootScope.$theme
            $scope.error = params.error;

            $scope.onCancel = function () {
                $mdDialog.cancel();
            };

            $scope.onOk = function () {
                $mdDialog.hide();
            };
        }]
    );

})(window.angular);

/**
 * @file Options dialog
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve sample in sampler app
 * - Remove deleted hack in the controller
 */

(function (angular, $, _) {
    'use strict';

    var thisModule = angular.module('pipOptionsDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipOptionsDialog',
        ['$mdDialog', function ($mdDialog) {
            return {
                show: function (params, successCallback, cancelCallback) {
                    if (params.event) {
                        params.event.stopPropagation();
                        params.event.preventDefault();
                    }

                    function focusToggleControl() {
                        if (params.event && params.event.currentTarget) {
                            params.event.currentTarget.focus();
                        }
                    }

                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'options/options.html',
                        controller: 'pipOptionsDialogController',
                        locals: {params: params},
                        clickOutsideToClose: true
                    })
                    .then(function (option) {
                        focusToggleControl();

                        if (successCallback) {
                            successCallback(option);
                        }
                    }, function () {
                        focusToggleControl();
                        if (cancelCallback) {
                            cancelCallback();
                        }
                    });
                }
            };
        }]
    );
    thisModule.controller('pipOptionsDialogController',
        ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'OPTIONS_TITLE': 'Choose Option'
                });
                pipTranslate.translations('ru', {
                    'OPTIONS_TITLE': 'Выберите опцию'
                });

                $scope.title = params.title || 'OPTIONS_TITLE';
                $scope.applyButtonTitle = params.appleButtonTitle || 'SELECT';
            } else {
                $scope.title = params.title || 'Choose Option';
                $scope.applyButtonTitle = params.appleButtonTitle || 'Select';
            }

            $scope.theme = $rootScope.$theme;
            $scope.options = params.options;
            $scope.selectedOption = _.find(params.options, {active: true}) || {};
            $scope.selectedOptionName = $scope.selectedOption.name;
            $scope.deleted = params.deleted;
            $scope.deletedTitle = params.deletedTitle;
            $scope.onOptionSelect = function (event, option) {
                event.stopPropagation();
                $scope.selectedOptionName = option.name;
            };
            
            $scope.onKeyPress = function (event) {
                if (event.keyCode === 32 || event.keyCode === 13) {
                    event.stopPropagation();
                    event.preventDefault();
                    $scope.onSelect();
                }
            };

            $scope.onCancel = function () {
                $mdDialog.cancel();
            };

            $scope.onSelect = function () {
                var option;

                option = _.find(params.options, {name: $scope.selectedOptionName});
                $mdDialog.hide({option: option, deleted: $scope.deleted});
            };

            // Setting focus to input control
            function focusInput() {
                var list;

                list = $('.pip-options-dialog .pip-list');
                list.focus();
            }

            setTimeout(focusInput, 500);
        }]
    );

})(window.angular, window.jQuery, window._);

/**
 * @file Options dialog
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve sample in sampler app
 * - Remove deleted hack in the controller
 */

(function (angular, $, _) {
    'use strict';

    var thisModule = angular.module('pipOptionsBigDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipOptionsBigDialog',
        ['$mdDialog', function ($mdDialog) {
            return {
                show: function (params, successCallback, cancelCallback) {
                    if (params.event) {
                        params.event.stopPropagation();
                        params.event.preventDefault();
                    }

                    function focusToggleControl() {
                        if (params.event && params.event.currentTarget) {
                            params.event.currentTarget.focus();
                        }
                    }

                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'options/options_big.html',
                        controller: 'pipOptionsDialogBigController',
                        locals: {params: params},
                        clickOutsideToClose: true
                    })
                    .then(function (option) {
                        focusToggleControl();

                        if (successCallback) {
                            successCallback(option);
                        }
                    }, function () {
                        focusToggleControl();
                        if (cancelCallback) {
                            cancelCallback();
                        }
                    });
                }
            };
        }]
    );

    thisModule.controller('pipOptionsDialogBigController',
        ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'OPTIONS_TITLE': 'Choose Option'
                });
                pipTranslate.translations('ru', {
                    'OPTIONS_TITLE': 'Выберите опцию'
                });

                $scope.title = params.title || 'OPTIONS_TITLE';
                $scope.applyButtonTitle = params.applyButtonTitle || 'SELECT';
            } else {
                $scope.title = params.title || 'Choose Option';
                $scope.applyButtonTitle = params.applyButtonTitle || 'Select';
            }

            $scope.theme = $rootScope.$theme;
            $scope.options = params.options;
            $scope.noActions = params.noActions || false;
            $scope.noTitle = params.noTitle || false;
            $scope.hint = params.hint || '';
            $scope.selectedOption = _.find(params.options, {active: true}) || {};
            $scope.selectedOptionName = $scope.selectedOption.name;
            $scope.optionIndex = _.findIndex(params.options, $scope.selectedOption);

            $scope.deleted = params.deleted;
            $scope.deletedTitle = params.deletedTitle;

            $scope.onOptionSelect = function (event, option) {
                event.stopPropagation();
                $scope.selectedOptionName = option.name;

                if ($scope.noActions) {
                    $scope.onSelect();
                }
            };

            $scope.onSelected = function () {
                $scope.selectedOptionName = $scope.options[$scope.optionIndex].name;

                if ($scope.noActions) {
                    // $scope.onSelect();
                }
            };

            $scope.onKeyUp = function (event, index) {
                if (event.keyCode === 32 || event.keyCode === 13) {
                    event.stopPropagation();
                    event.preventDefault();
                    if (index !== undefined && index > -1 && index < $scope.options.length) {
                        $scope.selectedOptionName = $scope.options[index].name;
                        $scope.onSelect();
                    }
                }
            };
            $scope.onCancel = function () {
                $mdDialog.cancel();
            };
            $scope.onSelect = function () {
                var option;

                option = _.find($scope.options, {name: $scope.selectedOptionName});
                $mdDialog.hide({option: option, deleted: $scope.deleted});
            };
            // Setting focus to input control
            function focusInput() {
                var list;

                list = $('.pip-options-dialog .pip-list');
                list.focus();
            }

            setTimeout(focusInput, 500);
        }]
    );

})(window.angular, window.jQuery, window._);

//# sourceMappingURL=pip-webui-dialogs.js.map
