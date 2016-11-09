(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).dialogs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipConfirmationDialog', ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);
    thisModule.factory('pipConfirmationDialog', ['$mdDialog', function ($mdDialog) {
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
    }]);
    thisModule.controller('pipConfirmationDialogController', ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
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
        }
        else {
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
    }]);
})();
},{}],2:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipDialogs.Translate', []);
    thisModule.filter('translate', ['$injector', function ($injector) {
        var pipTranslate = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;
        return function (key) {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        };
    }]);
})();
},{}],3:[function(require,module,exports){
'use strict';
require('./error_details');
angular
    .module('pipDialogs', [
    'pipErrorDetailsDialog'
]);
},{"./error_details":7}],4:[function(require,module,exports){
'use strict';
var ErrorStrings = (function () {
    function ErrorStrings() {
        this.ok = 'OK';
        this.cancel = 'Cancel';
        this.errorDetails = 'Error details';
        this.dismissButton = 'Dismiss';
        this.errorMessage = 'Message';
        this.errorCode = 'Code';
        this.errorMethod = 'Method';
        this.errorPath = 'Path';
        this.error = 'Error';
        this.errorText = 'Error';
    }
    return ErrorStrings;
}());
exports.ErrorStrings = ErrorStrings;
var ErrorDetailsDialogController = (function () {
    ErrorDetailsDialogController.$inject = ['$mdDialog', 'pipTranslate', '$injector', '$rootScope', 'params'];
    function ErrorDetailsDialogController($mdDialog, pipTranslate, $injector, $rootScope, params) {
        "ngInject";
        this.config = new ErrorStrings();
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
            this.config.ok = params.ok || 'OK';
            this.config.cancel = params.cancel || 'CANCEL';
            this.config.errorDetails = 'ERROR_DETAILS';
            this.config.dismissButton = 'DISMISS';
            this.config.errorMessage = 'MESSAGE';
            this.config.errorCode = 'CODE';
            this.config.errorMethod = 'METHOD';
            this.config.errorPath = 'PATH';
            this.config.errorText = 'ERROR';
        }
        else {
            this.config.ok = params.ok || 'OK';
            this.config.cancel = params.cancel || 'Cancel';
        }
        this.$mdDialog = $mdDialog;
        this.theme = $rootScope.$theme;
        this.config.error = params.error;
    }
    ErrorDetailsDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    ErrorDetailsDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    return ErrorDetailsDialogController;
}());
exports.ErrorDetailsDialogController = ErrorDetailsDialogController;
angular
    .module('pipErrorDetailsDialog')
    .controller('pipErrorDetailsDialogController', ErrorDetailsDialogController);
},{}],5:[function(require,module,exports){
var ErrorDetailsService = (function () {
    ErrorDetailsService.$inject = ['$mdDialog'];
    function ErrorDetailsService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    ErrorDetailsService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'error_details/ErrorDetails.html',
            controller: 'pipErrorDetailsDialogController',
            controllerAs: 'vm',
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
    };
    return ErrorDetailsService;
}());
angular
    .module('pipErrorDetailsDialog')
    .service('pipErrorDetailsDialog', ErrorDetailsService);
},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
'use strict';
angular
    .module('pipErrorDetailsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates']);
require('./ErrorDetailsService');
require('./ErrorDetailsController');
},{"./ErrorDetailsController":4,"./ErrorDetailsService":5}],8:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipInformationDialog', ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);
    thisModule.factory('pipInformationDialog', ['$mdDialog', function ($mdDialog) {
        return {
            show: function (params, callback) {
                $mdDialog.show({
                    targetEvent: params.event,
                    templateUrl: 'information/information.html',
                    controller: 'pipInformationDialogController',
                    locals: { params: params },
                    clickOutsideToClose: true
                })
                    .then(function () {
                    if (callback) {
                        callback();
                    }
                });
            }
        };
    }]);
    thisModule.controller('pipInformationDialogController', ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
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
        }
        else {
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
    }]);
})();
},{}],9:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipOptionsDialog', ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);
    thisModule.factory('pipOptionsDialog', ['$mdDialog', function ($mdDialog) {
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
                    locals: { params: params },
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
    }]);
    thisModule.controller('pipOptionsDialogController', ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
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
        }
        else {
            $scope.title = params.title || 'Choose Option';
            $scope.applyButtonTitle = params.appleButtonTitle || 'Select';
        }
        $scope.theme = $rootScope.$theme;
        $scope.options = params.options;
        $scope.selectedOption = _.find(params.options, { active: true }) || {};
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
            option = _.find(params.options, { name: $scope.selectedOptionName });
            $mdDialog.hide({ option: option, deleted: $scope.deleted });
        };
        function focusInput() {
            var list;
            list = $('.pip-options-dialog .pip-list');
            list.focus();
        }
        setTimeout(focusInput, 500);
    }]);
})();
},{}],10:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipOptionsBigDialog', ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);
    thisModule.factory('pipOptionsBigDialog', ['$mdDialog', function ($mdDialog) {
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
                    locals: { params: params },
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
    }]);
    thisModule.controller('pipOptionsDialogBigController', ['$scope', '$rootScope', '$mdDialog', '$injector', 'params', function ($scope, $rootScope, $mdDialog, $injector, params) {
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
        }
        else {
            $scope.title = params.title || 'Choose Option';
            $scope.applyButtonTitle = params.applyButtonTitle || 'Select';
        }
        $scope.theme = $rootScope.$theme;
        $scope.options = params.options;
        $scope.noActions = params.noActions || false;
        $scope.noTitle = params.noTitle || false;
        $scope.hint = params.hint || '';
        $scope.selectedOption = _.find(params.options, { active: true }) || {};
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
            option = _.find($scope.options, { name: $scope.selectedOptionName });
            $mdDialog.hide({ option: option, deleted: $scope.deleted });
        };
        function focusInput() {
            var list;
            list = $('.pip-options-dialog .pip-list');
            list.focus();
        }
        setTimeout(focusInput, 500);
    }]);
})();
},{}],11:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('confirmation/confirmation.html',
    '<md-dialog class="pip-dialog pip-confirmation-dialog layout-column" width="400" md-theme="{{::theme}}"><div class="pip-header"><h3>{{:: title}}</h3></div><div class="pip-footer"><div><md-button ng-click="onCancel()">{{:: cancel}}</md-button><md-button class="md-accent" ng-click="onOk()">{{:: ok}}</md-button></div></div></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
<<<<<<< HEAD
  $templateCache.put('error_details/ErrorDetails.html',
    '<md-dialog class="pip-dialog pip-error-details-dialog layout-column" width="400" md-theme="{{vm.theme}}"><div class="pip-body"><div class="pip-header"><h3>{{::vm.config.errorDetails | translate}}</h3></div><div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text" ng-if="vm.config.error.code || (vm.config.error.data && error.data.code)">{{::vm.config.errorCode | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.code || (vm.config.error.data && vm.config.error.data.code)">{{vm.config.error.code || vm.config.error.data.code}}</div><div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text" ng-if="vm.config.error.path || (vm.config.error.data && vm.config.error.data.path)">{{::vm.config.errorPath | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.path || (vm.config.error.data && vm.config.error.data.path)">{{vm.config.error.path || vm.config.error.data.path}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="vm.config.error.error || (vm.config.error.data && vm.config.error.data.error)">{{::vm.config.errorText | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.error || (vm.config.error.data && vm.config.error.data.error)">{{vm.config.error.error || vm.config.error.data.error}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="vm.config.error.method || (vm.config.error.data && vm.config.error.data.method)">{{::vm.config.errorMethod | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.method || (vm.config.error.data && vm.config.error.data.method)">{{vm.config.error.method || vm.config.error.data.method}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="vm.config.error.message || (vm.config.error.data && vm.config.error.data.message)">{{::vm.config.errorMessage | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.message || (vm.config.error.data && vm.config.error.data.message)">{{vm.config.error.message || vm.config.error.data.message}}</div></div><div class="pip-footer"><div><md-button class="md-accent m0" ng-click="vm.onOk()">{{::vm.config.dismissButton | translate}}</md-button></div></div></md-dialog>');
=======
  $templateCache.put('options/options.html',
    '<md-dialog class="pip-dialog pip-options-dialog layout-column" min-width="400" md-theme="{{theme}}"><md-dialog-content class="pip-body lp0 tp0 rp0 bp24 pip-scroll"><div class="pip-header"><h3>{{::title | translate}}</h3><div ng-show="deletedTitle" class="header-option text-subhead1 divider-bottom"><md-checkbox ng-model="deleted" aria-label="CHECKBOX">{{::deletedTitle | translate}}</md-checkbox></div></div><div class="pip-content"><md-radio-group ng-model="selectedOptionName" class="pip-list md-primary" md-no-ink="true" ng-keypress="onKeyPress($event)" tabindex="0"><div ng-repeat="option in options" class="pip-list-item" md-ink-ripple="" ui-event="{ click: \'onOptionSelect($event, option)\' }" ng-class="{ selected: option.name == selectedOptionName }"><div class="pip-list-item item-padding"><md-icon class="pip-option-icon" md-svg-icon="icons:{{option.icon}}" ng-if="option.icon"></md-icon><div class="pip-option-title">{{::option.title | translate}}</div><md-radio-button ng-value="option.name" tabindex="-1" aria-label="{{::option.title | translate}}"></md-radio-button></div></div></md-radio-group></div></md-dialog-content><div class="pip-footer"><div><md-button class="pip-cancel" ng-click="onCancel()">{{::\'CANCEL\' | translate}}</md-button><md-button class="pip-submit md-accent" ng-click="onSelect()">{{::applyButtonTitle | translate}}</md-button></div></div></md-dialog>');
>>>>>>> 2378bc06acf0a36457b80d9322439e7c85d6455b
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
    '<md-dialog class="pip-dialog pip-options-dialog-big layout-column" min-width="400" md-theme="{{theme}}"><md-dialog-content class="pip-body pip-scroll" ng-class="{\'bp24\': !noActions}"><div class="pip-header" ng-class="{\'header-hint\': noTitle && hint}"><h3 class="m0" ng-if="!noTitle">{{::title | translate}}</h3><div ng-show="noTitle && hint" class="dialog-hint layout-row layout-align-start-center"><div class="hint-icon-container flex-fixed"><md-icon md-svg-icon="icons:info-circle-outline"></md-icon></div><div>{{::hint | translate}}</div></div></div><div class="content-divider" ng-if="!noTitle"></div><div class="pip-content"><div class="spacer8" ng-if="noTitle && hint"></div><md-list class="pip-menu pip-ref-list" pip-selected="optionIndex" index="{{optionIndex }}" pip-select="onSelected($event)"><md-list-item class="pip-ref-list-item pip-selectable layout-row layout-align-start-center" ng-class="{\'selected md-focused\' : option.name == selectedOptionName, \'divider-bottom\': $index != options.length - 1}" md-ink-ripple="" ng-keyup="onKeyUp($event, $index)" ng-repeat="option in options"><div class="pip-content content-stretch" ng-click="onOptionSelect($event, option)"><p class="pip-title spacer-right" ng-if="option.title" style="margin-bottom: 4px !important;">{{::option.title | translate}}</p><div class="pip-subtitle spacer-right" style="height: inherit" ng-if="option.subtitle">{{::option.subtitle | translate}}</div><div class="pip-subtitle spacer-right" style="height: inherit" ng-if="option.text" ng-bind-html="option.text | translate"></div></div></md-list-item></md-list></div><div class="spacer8" ng-if="noActions"></div></md-dialog-content><div class="pip-footer" ng-if="!noActions"><div><md-button class="pip-cancel" ng-click="onCancel()">{{::\'CANCEL\' | translate}}</md-button><md-button class="pip-submit md-accent" ng-click="onSelect()" style="margin-right: -6px">{{::applyButtonTitle | translate}}</md-button></div></div></md-dialog>');
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
    '<md-dialog class="pip-dialog pip-error-details-dialog layout-column" width="400" md-theme="{{theme}}"><div class="pip-body"><div class="pip-header"><h3>{{::errorDetails | translate}}</h3></div><div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text" ng-if="error.code || (error.data && error.data.code)">{{::errorCode | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="error.code || (error.data && error.data.code)">{{error.code || error.data.code}}</div><div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text" ng-if="error.path || (error.data && error.data.path)">{{::errorPath | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="error.path || (error.data && error.data.path)">{{error.path || error.data.path}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="error.error || (error.data && error.data.error)">{{::errorText | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="error.error || (error.data && error.data.error)">{{error.error || error.data.error}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="error.method || (error.data && error.data.method)">{{::errorMethod | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="error.method || (error.data && error.data.method)">{{error.method || error.data.method}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="error.message || (error.data && error.data.message)">{{::errorMessage | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="error.message || (error.data && error.data.message)">{{error.message || error.data.message}}</div></div><div class="pip-footer"><div><md-button class="md-accent m0" ng-click="onOk()">{{::dismissButton | translate}}</md-button></div></div></md-dialog>');
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
    '<md-dialog class="pip-dialog pip-information-dialog layout-column" width="400" md-theme="{{theme}}"><div class="pip-header"><h3>{{ title | translate }}</h3></div><div class="pip-body"><div class="pip-content">{{ content }}</div></div><div class="pip-footer"><div><md-button class="md-accent" ng-click="onOk()">{{ ok | translate }}</md-button></div></div></md-dialog>');
}]);
})();



},{}]},{},[1,2,3,6,4,5,7,8,10,9,11])(11)
});


//# sourceMappingURL=pip-webui-dialogs.js.map
