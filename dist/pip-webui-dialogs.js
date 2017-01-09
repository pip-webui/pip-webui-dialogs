(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).dialogs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var ConfirmationParams = (function () {
    function ConfirmationParams() {
        this.ok = 'OK';
        this.cancel = 'Cancel';
    }
    return ConfirmationParams;
}());
exports.ConfirmationParams = ConfirmationParams;
var ConfirmationDialogController = (function () {
    ConfirmationDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function ConfirmationDialogController($mdDialog, $injector, $rootScope, params) {
        "ngInject";
        this.config = new ConfirmationParams();
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'CONFIRM_TITLE': 'Confirm' });
            pipTranslate.translations('ru', { 'CONFIRM_TITLE': 'Подтвердите' });
            this.config.title = params.title || 'CONFIRM_TITLE';
            this.config.ok = params.ok || 'OK';
            this.config.cancel = params.cancel || 'CANCEL';
        }
        else {
            this.config.title = params.title || 'Confirm';
            this.config.ok = params.ok || 'OK';
            this.config.cancel = params.cancel || 'Cancel';
        }
        this.$mdDialog = $mdDialog;
        this.theme = $rootScope.$theme;
    }
    ConfirmationDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    ConfirmationDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    return ConfirmationDialogController;
}());
exports.ConfirmationDialogController = ConfirmationDialogController;
angular
    .module('pipConfirmationDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
])
    .controller('pipConfirmationDialogController', ConfirmationDialogController);
},{}],2:[function(require,module,exports){
var ConfirmationService = (function () {
    ConfirmationService.$inject = ['$mdDialog'];
    function ConfirmationService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    ConfirmationService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'confirmation/ConfirmationDialog.html',
            controller: 'pipConfirmationDialogController',
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
    return ConfirmationService;
}());
angular
    .module('pipConfirmationDialog')
    .service('pipConfirmationDialog', ConfirmationService);
},{}],3:[function(require,module,exports){
'use strict';
require("./ConfirmationController");
require("./ConfirmationService");
},{"./ConfirmationController":1,"./ConfirmationService":2}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
'use strict';
require("./error_details");
require("./information");
require("./options");
require("./confirmation");
angular
    .module('pipDialogs', [
    'pipInformationDialog',
    'pipConfirmationDialog',
    'pipOptionsDialog',
    'pipOptionsBigDialog',
    'pipErrorDetailsDialog',
]);
},{"./confirmation":3,"./error_details":8,"./information":11,"./options":16}],6:[function(require,module,exports){
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
var ErrorParams = (function () {
    function ErrorParams() {
        this.ok = 'OK';
        this.cancel = 'CANCEL';
        this.error = 'ERROR';
    }
    return ErrorParams;
}());
exports.ErrorParams = ErrorParams;
var ErrorDetailsDialogController = (function () {
    ErrorDetailsDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function ErrorDetailsDialogController($mdDialog, $injector, $rootScope, params) {
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
            this.config.ok = params.ok;
            this.config.cancel = params.cancel;
            this.config.errorDetails = 'ERROR_DETAILS';
            this.config.dismissButton = 'DISMISS';
            this.config.errorMessage = 'MESSAGE';
            this.config.errorCode = 'CODE';
            this.config.errorMethod = 'METHOD';
            this.config.errorPath = 'PATH';
            this.config.errorText = 'ERROR';
        }
        else {
            this.config.ok = params.ok;
            this.config.cancel = params.cancel;
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
'use strict';
angular
    .module('pipErrorDetailsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./ErrorDetailsService");
require("./ErrorDetailsController");
},{"./ErrorDetailsController":6,"./ErrorDetailsService":7}],9:[function(require,module,exports){
'use strict';
var InformationStrings = (function () {
    function InformationStrings() {
        this.ok = 'OK';
    }
    return InformationStrings;
}());
exports.InformationStrings = InformationStrings;
var InformationParams = (function () {
    function InformationParams() {
        this.ok = 'OK';
    }
    return InformationParams;
}());
exports.InformationParams = InformationParams;
var InformationDialogController = (function () {
    InformationDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function InformationDialogController($mdDialog, $injector, $rootScope, params) {
        "ngInject";
        this.config = new InformationStrings();
        var content = params.message, item;
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'INFORMATION_TITLE': 'Information' });
            pipTranslate.translations('ru', { 'INFORMATION_TITLE': 'Информация' });
            this.config.title = params.title || 'INFORMATION_TITLE';
            this.config.ok = params.ok || 'OK';
            content = pipTranslate.translate(content);
        }
        else {
            this.config.title = params.title || 'Information';
            this.config.ok = params.ok || 'OK';
        }
        var pipFormat = $injector.has('pipFormat') ? $injector.get('pipFormat') : null;
        if (params.item && pipFormat) {
            item = _.truncate(params.item, 25);
            content = pipFormat.sprintf(content, item);
            console.log('content2', content);
        }
        this.config.content = content;
        this.$mdDialog = $mdDialog;
        this.theme = $rootScope.$theme;
        this.config.error = params.error;
    }
    InformationDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    InformationDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    return InformationDialogController;
}());
exports.InformationDialogController = InformationDialogController;
angular
    .module('pipInformationDialog')
    .controller('pipInformationDialogController', InformationDialogController);
},{}],10:[function(require,module,exports){
var InformationService = (function () {
    InformationService.$inject = ['$mdDialog'];
    function InformationService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    InformationService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'information/InformationDialog.html',
            controller: 'pipInformationDialogController',
            controllerAs: 'vm',
            locals: { params: params },
            clickOutsideToClose: true
        })
            .then(function () {
            if (successCallback) {
                successCallback();
            }
        });
    };
    return InformationService;
}());
angular
    .module('pipInformationDialog')
    .service('pipInformationDialog', InformationService);
},{}],11:[function(require,module,exports){
'use strict';
angular
    .module('pipInformationDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./InformationService");
require("./InformationController");
},{"./InformationController":9,"./InformationService":10}],12:[function(require,module,exports){
'use strict';
var OptionsBigData = (function () {
    function OptionsBigData() {
    }
    return OptionsBigData;
}());
exports.OptionsBigData = OptionsBigData;
var OptionsBigParams = (function () {
    function OptionsBigParams() {
        this.noTitle = false;
        this.noActions = false;
        this.optionIndex = 0;
    }
    return OptionsBigParams;
}());
exports.OptionsBigParams = OptionsBigParams;
var OptionsBigDialogController = (function () {
    OptionsBigDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function OptionsBigDialogController($mdDialog, $injector, $rootScope, params) {
        "ngInject";
        this.onSelect = function () {
            var option;
            option = _.find(this.config.options, { name: this.config.selectedOptionName }) || new OptionsBigData();
            this.$mdDialog.hide({ option: option, deleted: this.config.deleted });
        };
        this.$mdDialog = $mdDialog;
        this.config = new OptionsBigParams();
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option' });
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию' });
            this.config.title = params.title || 'OPTIONS_TITLE';
            this.config.applyButtonTitle = params.applyButtonTitle || 'SELECT';
        }
        else {
            this.config.title = params.title || 'Choose Option';
            this.config.applyButtonTitle = params.applyButtonTitle || 'Select';
        }
        this.theme = $rootScope.$theme;
        this.config.options = params.options;
        this.config.selectedOption = _.find(params.options, { active: true }) || new OptionsBigData();
        this.config.selectedOptionName = this.config.selectedOption.name;
        this.config.deleted = params.deleted;
        this.config.deletedTitle = params.deletedTitle;
        this.config.noActions = params.noActions || false;
        this.config.noTitle = params.noTitle || false;
        this.config.hint = params.hint || '';
        setTimeout(this.focusInput, 500);
    }
    OptionsBigDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    OptionsBigDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    OptionsBigDialogController.prototype.onOptionSelect = function (event, option) {
        event.stopPropagation();
        this.config.selectedOptionName = option.name;
        if (this.config.noActions) {
            this.onSelect();
        }
    };
    OptionsBigDialogController.prototype.onSelected = function () {
        this.config.selectedOptionName = this.config.options[this.config.optionIndex].name;
        if (this.config.noActions) {
            this.onSelect();
        }
    };
    OptionsBigDialogController.prototype.onKeyUp = function (event, index) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            if (index !== undefined && index > -1 && index < this.config.options.length) {
                this.config.selectedOptionName = this.config.options[index].name;
                this.onSelect();
            }
        }
    };
    OptionsBigDialogController.prototype.focusInput = function () {
        var list;
        list = $('.pip-options-dialog .pip-list');
        list.focus();
    };
    return OptionsBigDialogController;
}());
exports.OptionsBigDialogController = OptionsBigDialogController;
angular
    .module('pipOptionsBigDialog')
    .controller('pipOptionsBigDialogController', OptionsBigDialogController);
},{}],13:[function(require,module,exports){
var OptionsBigService = (function () {
    OptionsBigService.$inject = ['$mdDialog'];
    function OptionsBigService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    OptionsBigService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options/OptionsBigDialog.html',
            controller: 'pipOptionsBigDialogController',
            controllerAs: 'vm',
            locals: { params: params },
            clickOutsideToClose: true
        })
            .then(function (option) {
            if (successCallback) {
                successCallback(option);
            }
        }, function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    };
    return OptionsBigService;
}());
angular
    .module('pipOptionsBigDialog')
    .service('pipOptionsBigDialog', OptionsBigService);
},{}],14:[function(require,module,exports){
'use strict';
var OptionsData = (function () {
    function OptionsData() {
        this.icon = 'star';
        this.active = true;
    }
    return OptionsData;
}());
exports.OptionsData = OptionsData;
var OptionsParams = (function () {
    function OptionsParams() {
    }
    return OptionsParams;
}());
exports.OptionsParams = OptionsParams;
var OptionsDialogController = (function () {
    OptionsDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function OptionsDialogController($mdDialog, $injector, $rootScope, params) {
        "ngInject";
        this.$mdDialog = $mdDialog;
        this.config = new OptionsParams();
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option' });
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию' });
            this.config.title = params.title || 'OPTIONS_TITLE';
            this.config.applyButtonTitle = params.applyButtonTitle || 'SELECT';
        }
        else {
            this.config.title = params.title || 'Choose Option';
            this.config.applyButtonTitle = params.applyButtonTitle || 'Select';
        }
        this.theme = $rootScope.$theme;
        this.config.options = params.options;
        this.config.selectedOption = _.find(params.options, { active: true }) || new OptionsData();
        this.config.selectedOptionName = this.config.selectedOption.name;
        this.config.deleted = params.deleted;
        this.config.deletedTitle = params.deletedTitle;
        setTimeout(this.focusInput, 500);
    }
    OptionsDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    OptionsDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    OptionsDialogController.prototype.onOptionSelect = function (event, option) {
        event.stopPropagation();
        this.config.selectedOptionName = option.name;
    };
    OptionsDialogController.prototype.onKeyPress = function (event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            this.onSelect();
        }
    };
    OptionsDialogController.prototype.onSelect = function () {
        var option;
        option = _.find(this.config.options, { name: this.config.selectedOptionName });
        console.log(option);
        this.$mdDialog.hide({ option: option, deleted: this.config.deleted });
    };
    OptionsDialogController.prototype.focusInput = function () {
        var list;
        list = $('.pip-options-dialog .pip-list');
        list.focus();
    };
    return OptionsDialogController;
}());
exports.OptionsDialogController = OptionsDialogController;
angular
    .module('pipOptionsDialog')
    .controller('pipOptionsDialogController', OptionsDialogController);
},{}],15:[function(require,module,exports){
var OptionsService = (function () {
    OptionsService.$inject = ['$mdDialog'];
    function OptionsService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    OptionsService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options/OptionsDialog.html',
            controller: 'pipOptionsDialogController',
            controllerAs: 'vm',
            locals: { params: params },
            clickOutsideToClose: true
        })
            .then(function (option) {
            if (successCallback) {
                successCallback(option.option);
            }
        }, function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    };
    return OptionsService;
}());
angular
    .module('pipOptionsDialog')
    .service('pipOptionsDialog', OptionsService);
},{}],16:[function(require,module,exports){
'use strict';
angular
    .module('pipOptionsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./OptionsService");
require("./OptionsController");
angular
    .module('pipOptionsBigDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./OptionsBigService");
require("./OptionsBigController");
},{"./OptionsBigController":12,"./OptionsBigService":13,"./OptionsController":14,"./OptionsService":15}],17:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('confirmation/ConfirmationDialog.html',
    '<md-dialog class="pip-dialog pip-confirmation-dialog layout-column" width="400" md-theme="{{::vm.theme}}"><div class="pip-header"><h3>{{:: vm.config.title}}</h3></div><div class="pip-footer"><div><md-button ng-click="vm.onCancel()">{{:: vm.config.cancel}}</md-button><md-button class="md-accent" ng-click="vm.onOk()">{{:: vm.config.ok}}</md-button></div></div></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('options/OptionsBigDialog.html',
    '<md-dialog class="pip-dialog pip-options-dialog-big layout-column" min-width="400" md-theme="{{vm.theme}}"><md-dialog-content class="pip-body pip-scroll" ng-class="{\'bp24\': !vm.config.noActions}"><div class="pip-header" ng-class="{\'header-hint\': vm.config.noTitle && vm.config.hint}"><h3 class="m0" ng-if="!vm.config.noTitle">{{::vm.config.title | translate}}</h3><div ng-show="vm.config.noTitle && vm.config.hint" class="dialog-hint layout-row layout-align-start-center"><div class="hint-icon-container flex-fixed"><md-icon md-svg-icon="icons:info-circle-outline"></md-icon></div><div>{{::vm.config.hint | translate}}</div></div></div><div class="content-divider" ng-if="!noTitle"></div><div class="pip-content"><div class="spacer8" ng-if="noTitle && hint"></div><md-list class="pip-menu pip-ref-list" pip-selected="vm.config.optionIndex" index="{{vm.config.optionIndex }}" pip-select="vm.onSelected($event)"><md-list-item class="pip-ref-list-item pip-selectable layout-row layout-align-start-center" ng-class="{\'selected md-focused\' : option.name == selectedOptionName, \'divider-bottom\': $index != options.length - 1}" md-ink-ripple="" ng-keyup="vm.onKeyUp($event, $index)" ng-repeat="option in vm.config.options"><div class="pip-content content-stretch" ng-click="vm.onOptionSelect($event, option)"><p class="pip-title spacer-right" ng-if="option.title" style="margin-bottom: 4px !important;">{{::option.title | translate}}</p><div class="pip-subtitle spacer-right" style="height: inherit" ng-if="option.subtitle">{{::option.subtitle | translate}}</div><div class="pip-subtitle spacer-right" style="height: inherit" ng-if="option.text" ng-bind-html="option.text | translate"></div></div></md-list-item></md-list></div><div class="spacer8" ng-if="vm.config.noActions"></div></md-dialog-content><div class="pip-footer" ng-if="!vm.config.noActions"><div><md-button class="pip-cancel" ng-click="vm.onCancel()">{{::\'CANCEL\' | translate}}</md-button><md-button class="pip-submit md-accent" ng-click="vm.onSelect()" style="margin-right: -6px">{{::vm.config.applyButtonTitle | translate}}</md-button></div></div></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('options/OptionsDialog.html',
    '<md-dialog class="pip-dialog pip-options-dialog layout-column" min-width="400" md-theme="{{vm.theme}}"><md-dialog-content class="pip-body lp0 tp0 rp0 bp24 pip-scroll"><div class="pip-header"><h3>{{::vm.config.title | translate}}</h3><div ng-show="vm.config.deletedTitle" class="header-option text-subhead1 divider-bottom"><md-checkbox ng-model="deleted" aria-label="CHECKBOX">{{::vm.config.deletedTitle | translate}}</md-checkbox></div></div><div class="pip-content"><md-radio-group ng-model="vm.selectedOptionName" class="pip-list md-primary" md-no-ink="true" ng-keypress="vm.onKeyPress($event)" tabindex="0"><div ng-repeat="option in vm.config.options" class="pip-list-item" md-ink-ripple="" ui-event="{ click: \'vm.onOptionSelect($event, option)\' }" ng-class="{ selected: option.name == vm.config.selectedOptionName }"><div class="pip-list-item item-padding"><md-icon class="pip-option-icon" md-svg-icon="icons:{{option.icon}}" ng-if="option.icon"></md-icon><div class="pip-option-title">{{::option.title | translate}}</div><md-radio-button ng-value="option.name" tabindex="-1" aria-label="{{::option.title | translate}}"></md-radio-button></div></div></md-radio-group></div></md-dialog-content><div class="pip-footer"><div><md-button class="pip-cancel" ng-click="vm.onCancel()">{{::\'CANCEL\' | translate}}</md-button><md-button class="pip-submit md-accent" ng-click="vm.onSelect()">{{::vm.config.applyButtonTitle | translate}}</md-button></div></div></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('error_details/ErrorDetails.html',
    '<md-dialog class="pip-dialog pip-error-details-dialog layout-column" width="400" md-theme="{{vm.theme}}"><div class="pip-body"><div class="pip-header"><h3>{{::vm.config.errorDetails | translate}}</h3></div><div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text" ng-if="vm.config.error.code || (vm.config.error.data && error.data.code)">{{::vm.config.errorCode | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.code || (vm.config.error.data && vm.config.error.data.code)">{{vm.config.error.code || vm.config.error.data.code}}</div><div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text" ng-if="vm.config.error.path || (vm.config.error.data && vm.config.error.data.path)">{{::vm.config.errorPath | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.path || (vm.config.error.data && vm.config.error.data.path)">{{vm.config.error.path || vm.config.error.data.path}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="vm.config.error.error || (vm.config.error.data && vm.config.error.data.error)">{{::vm.config.errorText | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.error || (vm.config.error.data && vm.config.error.data.error)">{{vm.config.error.error || vm.config.error.data.error}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="vm.config.error.method || (vm.config.error.data && vm.config.error.data.method)">{{::vm.config.errorMethod | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.method || (vm.config.error.data && vm.config.error.data.method)">{{vm.config.error.method || vm.config.error.data.method}}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="vm.config.error.message || (vm.config.error.data && vm.config.error.data.message)">{{::vm.config.errorMessage | translate}}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.message || (vm.config.error.data && vm.config.error.data.message)">{{vm.config.error.message || vm.config.error.data.message}}</div></div><div class="pip-footer"><div><md-button class="md-accent m0" ng-click="vm.onOk()">{{::vm.config.dismissButton | translate}}</md-button></div></div></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('information/InformationDialog.html',
    '<md-dialog class="pip-dialog pip-information-dialog layout-column" width="400" md-theme="{{vm.theme}}"><div class="pip-header"><h3>{{:: vm.config.title | translate }}</h3></div><div class="pip-body"><div class="pip-content">{{ vm.config.content }}</div></div><div class="pip-footer"><div><md-button class="md-accent" ng-click="vm.onOk()">{{ vm.config.ok | translate }}</md-button></div></div></md-dialog>');
}]);
})();



},{}]},{},[17,1,2,3,4,5,6,7,8,11,9,10,16,12,13,14,15])(17)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvbkNvbnRyb2xsZXIudHMiLCJzcmMvY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvblNlcnZpY2UudHMiLCJzcmMvY29uZmlybWF0aW9uL2luZGV4LnRzIiwic3JjL2RlcGVuZGVuY2llcy90cmFuc2xhdGUudHMiLCJzcmMvZGlhbG9ncy50cyIsInNyYy9lcnJvcl9kZXRhaWxzL0Vycm9yRGV0YWlsc0NvbnRyb2xsZXIudHMiLCJzcmMvZXJyb3JfZGV0YWlscy9FcnJvckRldGFpbHNTZXJ2aWNlLnRzIiwic3JjL2Vycm9yX2RldGFpbHMvaW5kZXgudHMiLCJzcmMvaW5mb3JtYXRpb24vSW5mb3JtYXRpb25Db250cm9sbGVyLnRzIiwic3JjL2luZm9ybWF0aW9uL0luZm9ybWF0aW9uU2VydmljZS50cyIsInNyYy9pbmZvcm1hdGlvbi9pbmRleC50cyIsInNyYy9vcHRpb25zL09wdGlvbnNCaWdDb250cm9sbGVyLnRzIiwic3JjL29wdGlvbnMvT3B0aW9uc0JpZ1NlcnZpY2UudHMiLCJzcmMvb3B0aW9ucy9PcHRpb25zQ29udHJvbGxlci50cyIsInNyYy9vcHRpb25zL09wdGlvbnNTZXJ2aWNlLnRzIiwic3JjL29wdGlvbnMvaW5kZXgudHMiLCJ0ZW1wL3BpcC13ZWJ1aS1kaWFsb2dzLWh0bWwubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDO0FBRWI7SUFBQTtRQUNXLE9BQUUsR0FBVyxJQUFJLENBQUM7UUFFbEIsV0FBTSxHQUFXLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLGdEQUFrQjtBQU0vQjtJQU1JLHNDQUNJLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQTBCO1FBQzFCLFVBQVUsQ0FBQztRQUNYLElBQUksQ0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25QYXJhbXMge1xyXG4gICAgcHVibGljIG9rOiBzdHJpbmcgPSAnT0snO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7IFxyXG4gICAgcHVibGljIGNhbmNlbDogc3RyaW5nID0gJ0NhbmNlbCc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25EaWFsb2dDb250cm9sbGVyIHtcclxuXHJcbiAgICBwdWJsaWMgJG1kRGlhbG9nO1xyXG4gICAgcHVibGljIHRoZW1lO1xyXG4gICAgcHVibGljIGNvbmZpZzogQ29uZmlybWF0aW9uUGFyYW1zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRtZERpYWxvZyxcclxuICAgICAgICAkaW5qZWN0b3IsXHJcbiAgICAgICAgJHJvb3RTY29wZSwgXHJcbiAgICAgICAgcGFyYW1zOiBDb25maXJtYXRpb25QYXJhbXMpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlybWF0aW9uUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIGxldCBwaXBUcmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHsgJ0NPTkZJUk1fVElUTEUnOiAnQ29uZmlybScgfSk7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1JywgeyAnQ09ORklSTV9USVRMRSc6ICfQn9C+0LTRgtCy0LXRgNC00LjRgtC1J30pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25maWcudGl0bGUgPSBwYXJhbXMudGl0bGUgfHwgJ0NPTkZJUk1fVElUTEUnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vayA9IHBhcmFtcy5vayB8fCAnT0snO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jYW5jZWwgPSBwYXJhbXMuY2FuY2VsIHx8ICdDQU5DRUwnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRpdGxlID0gcGFyYW1zLnRpdGxlIHx8ICdDb25maXJtJztcclxuICAgICAgICAgICAgdGhpcy5jb25maWcub2sgPSBwYXJhbXMub2sgfHwgJ09LJztcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuY2FuY2VsID0gcGFyYW1zLmNhbmNlbCB8fCAnQ2FuY2VsJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nID0gJG1kRGlhbG9nO1xyXG4gICAgICAgIHRoaXMudGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2FuY2VsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQ29uZmlybWF0aW9uRGlhbG9nJywgW1xyXG4gICAgICAgICduZ01hdGVyaWFsJywgXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVHJhbnNsYXRlJyxcclxuICAgICAgICAncGlwRGlhbG9ncy5UZW1wbGF0ZXMnXSlcclxuICAgIC5jb250cm9sbGVyKCdwaXBDb25maXJtYXRpb25EaWFsb2dDb250cm9sbGVyJywgQ29uZmlybWF0aW9uRGlhbG9nQ29udHJvbGxlcik7IiwiXHJcbmNsYXNzIENvbmZpcm1hdGlvblNlcnZpY2Uge1xyXG4gICAgcHVibGljIF9tZERpYWxvZztcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigkbWREaWFsb2cpIHtcclxuICAgICAgICB0aGlzLl9tZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93KHBhcmFtcywgc3VjY2Vzc0NhbGxiYWNrLCBjYW5jZWxDYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX21kRGlhbG9nLnNob3coe1xyXG4gICAgICAgICAgICB0YXJnZXRFdmVudDogcGFyYW1zLmV2ZW50LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbmZpcm1hdGlvbi9Db25maXJtYXRpb25EaWFsb2cuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwaXBDb25maXJtYXRpb25EaWFsb2dDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBsb2NhbHM6IHsgcGFyYW1zOiBwYXJhbXMgfSxcclxuICAgICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzc0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbmNlbENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQ29uZmlybWF0aW9uRGlhbG9nJylcclxuICAgIC5zZXJ2aWNlKCdwaXBDb25maXJtYXRpb25EaWFsb2cnLCBDb25maXJtYXRpb25TZXJ2aWNlKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJy4vQ29uZmlybWF0aW9uQ29udHJvbGxlcic7XHJcbmltcG9ydCAnLi9Db25maXJtYXRpb25TZXJ2aWNlJztcclxuIiwiLyoqXHJcbiAqIEBmaWxlIE9wdGlvbmFsIGZpbHRlciB0byB0cmFuc2xhdGUgc3RyaW5nIHJlc291cmNlc1xyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuIFxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRyYW5zbGF0ZScsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmZpbHRlcigndHJhbnNsYXRlJywgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xyXG4gICAgICAgIHZhciBwaXBUcmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSBcclxuICAgICAgICAgICAgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwaXBUcmFuc2xhdGUgID8gcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZShrZXkpIHx8IGtleSA6IGtleTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIu+7vy8qKlxyXG4gKiBAZmlsZSBSZWdpc3RyYXRpb24gb2YgZGlhbG9nc1xyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJy4vZXJyb3JfZGV0YWlscyc7XHJcbmltcG9ydCAnLi9pbmZvcm1hdGlvbic7XHJcbmltcG9ydCAnLi9vcHRpb25zJztcclxuaW1wb3J0ICcuL2NvbmZpcm1hdGlvbic7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBEaWFsb2dzJywgW1xyXG4gICAgICAgICdwaXBJbmZvcm1hdGlvbkRpYWxvZycsXHJcbiAgICAgICAgJ3BpcENvbmZpcm1hdGlvbkRpYWxvZycsXHJcbiAgICAgICAgJ3BpcE9wdGlvbnNEaWFsb2cnLFxyXG4gICAgICAgICdwaXBPcHRpb25zQmlnRGlhbG9nJyxcclxuICAgICAgICAncGlwRXJyb3JEZXRhaWxzRGlhbG9nJyxcclxuICAgICAgICAvLydwaXBFcnJvckRldGFpbHMyRGlhbG9nJ1xyXG4gICAgXSk7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2Vycm9yX2RldGFpbHMnO1xyXG4vL2V4cG9ydCAqIGZyb20gJy4vZXJyb3JfZGV0YWlsczInO1xyXG5leHBvcnQgKiBmcm9tICcuL2luZm9ybWF0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9vcHRpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb25maXJtYXRpb24nO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgSVdpbmRvd1NlcnZpY2UgPSBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yU3RyaW5ncyB7XHJcbiAgICBwdWJsaWMgb2s6IHN0cmluZyA9ICdPSyc7XHJcbiAgICBwdWJsaWMgY2FuY2VsOiBzdHJpbmcgPSAnQ2FuY2VsJztcclxuICAgIHB1YmxpYyBlcnJvckRldGFpbHM6IHN0cmluZyA9ICdFcnJvciBkZXRhaWxzJztcclxuICAgIHB1YmxpYyBkaXNtaXNzQnV0dG9uOiBzdHJpbmcgPSAnRGlzbWlzcyc7XHJcbiAgICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAnTWVzc2FnZSc7XHJcbiAgICBwdWJsaWMgZXJyb3JDb2RlOiBzdHJpbmcgPSAnQ29kZSc7XHJcbiAgICBwdWJsaWMgZXJyb3JNZXRob2Q6IHN0cmluZyA9ICdNZXRob2QnO1xyXG4gICAgcHVibGljIGVycm9yUGF0aDogc3RyaW5nID0gJ1BhdGgnO1xyXG4gICAgcHVibGljIGVycm9yOiBzdHJpbmcgPSAnRXJyb3InO1xyXG4gICAgcHVibGljIGVycm9yVGV4dDogc3RyaW5nID0gJ0Vycm9yJzsgICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yUGFyYW1zIHtcclxuICAgIHB1YmxpYyBvazogc3RyaW5nID0gJ09LJztcclxuICAgIHB1YmxpYyBjYW5jZWw6IHN0cmluZyA9ICdDQU5DRUwnO1xyXG4gICAgcHVibGljIGVycm9yOiBzdHJpbmcgPSAnRVJST1InO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JEZXRhaWxzRGlhbG9nQ29udHJvbGxlciB7XHJcblxyXG4gICAgcHVibGljICRtZERpYWxvZztcclxuICAgIHB1YmxpYyB0aGVtZTtcclxuICAgIHB1YmxpYyBjb25maWc6IEVycm9yU3RyaW5ncztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkbWREaWFsb2csXHJcbiAgICAgICAgJGluamVjdG9yLFxyXG4gICAgICAgICRyb290U2NvcGUsIFxyXG4gICAgICAgIHBhcmFtczogRXJyb3JQYXJhbXMpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgRXJyb3JTdHJpbmdzKCk7XHJcbiAgICAgICAgdmFyIHBpcFRyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAocGlwVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHtcclxuICAgICAgICAgICAgICAgICAgICAnRVJST1JfREVUQUlMUyc6ICdFcnJvciBkZXRhaWxzJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ09ERSc6ICdFcnJvciBjb2RlJyxcclxuICAgICAgICAgICAgICAgICAgICAnUEFUSCc6ICdQYXRoJyxcclxuICAgICAgICAgICAgICAgICAgICAnRVJST1InOiAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAgICdNRVRIT0QnOiAnTWV0aG9kJyxcclxuICAgICAgICAgICAgICAgICAgICAnTUVTU0FHRSc6ICdNZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICAgICAnRElTTUlTUyc6ICdEaXNtaXNzJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdydScsIHtcclxuICAgICAgICAgICAgICAgICAgICAnRVJST1JfREVUQUlMUyc6ICfQlNC10YLQsNC70Lgg0L7RiNC40LHQutC4JyxcclxuICAgICAgICAgICAgICAgICAgICAnQ09ERSc6ICfQmtC+0LQg0L7RiNC40LHQutC4JyxcclxuICAgICAgICAgICAgICAgICAgICAnUEFUSCc6ICfQn9GD0YLRjCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0VSUk9SJzogJ9Ce0YjQuNCx0LrQsCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ01FVEhPRCc6ICfQnNC10YLQvtC0JyxcclxuICAgICAgICAgICAgICAgICAgICAnTUVTU0FHRSc6ICfQodC+0L7QsdGJ0LXQvdC40LUnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm9rID0gcGFyYW1zLm9rO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuY2FuY2VsID0gcGFyYW1zLmNhbmNlbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmVycm9yRGV0YWlscyA9ICdFUlJPUl9ERVRBSUxTJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmRpc21pc3NCdXR0b24gPSAnRElTTUlTUyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5lcnJvck1lc3NhZ2UgPSAnTUVTU0FHRSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5lcnJvckNvZGUgPSAnQ09ERSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5lcnJvck1ldGhvZCA9ICdNRVRIT0QnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuZXJyb3JQYXRoID0gJ1BBVEgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuZXJyb3JUZXh0ID0gJ0VSUk9SJzsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5vayA9IHBhcmFtcy5vaztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmNhbmNlbCA9IHBhcmFtcy5jYW5jZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICAgICAgICAgIHRoaXMudGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuZXJyb3IgPSBwYXJhbXMuZXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNhbmNlbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEVycm9yRGV0YWlsc0RpYWxvZycpXHJcbiAgICAuY29udHJvbGxlcigncGlwRXJyb3JEZXRhaWxzRGlhbG9nQ29udHJvbGxlcicsIEVycm9yRGV0YWlsc0RpYWxvZ0NvbnRyb2xsZXIpOyIsIlxyXG5jbGFzcyBFcnJvckRldGFpbHNTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBfbWREaWFsb2c7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoJG1kRGlhbG9nKSB7XHJcbiAgICAgICAgdGhpcy5fbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbXMsIHN1Y2Nlc3NDYWxsYmFjaywgY2FuY2VsQ2FsbGJhY2spIHtcclxuICAgICAgICAgdGhpcy5fbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiBwYXJhbXMuZXZlbnQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZXJyb3JfZGV0YWlscy9FcnJvckRldGFpbHMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwaXBFcnJvckRldGFpbHNEaWFsb2dDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBsb2NhbHM6IHtwYXJhbXM6IHBhcmFtc30sXHJcbiAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWVcclxuICAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FuY2VsQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEVycm9yRGV0YWlsc0RpYWxvZycpXHJcbiAgICAuc2VydmljZSgncGlwRXJyb3JEZXRhaWxzRGlhbG9nJywgRXJyb3JEZXRhaWxzU2VydmljZSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwRXJyb3JEZXRhaWxzRGlhbG9nJywgW1xyXG4gICAgICAgICduZ01hdGVyaWFsJywgXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVHJhbnNsYXRlJyxcclxuICAgICAgICAncGlwRGlhbG9ncy5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vRXJyb3JEZXRhaWxzU2VydmljZSc7XHJcbmltcG9ydCAnLi9FcnJvckRldGFpbHNDb250cm9sbGVyJztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IElXaW5kb3dTZXJ2aWNlID0gYW5ndWxhci5JV2luZG93U2VydmljZTtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvblN0cmluZ3Mge1xyXG4gICAgcHVibGljIG9rOiBzdHJpbmcgPSAnT0snO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7IFxyXG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIHB1YmxpYyBlcnJvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGNvbnRlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvblBhcmFtcyB7XHJcbiAgICBwdWJsaWMgb2s6IHN0cmluZyA9ICdPSyc7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZzsgXHJcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGVycm9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXRlbTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uRGlhbG9nQ29udHJvbGxlciB7XHJcblxyXG4gICAgcHVibGljICRtZERpYWxvZztcclxuICAgIHB1YmxpYyB0aGVtZTtcclxuICAgIHB1YmxpYyBjb25maWc6IEluZm9ybWF0aW9uU3RyaW5ncztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkbWREaWFsb2csXHJcbiAgICAgICAgJGluamVjdG9yLFxyXG4gICAgICAgICRyb290U2NvcGUsIFxyXG4gICAgICAgIHBhcmFtczogSW5mb3JtYXRpb25QYXJhbXMpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgSW5mb3JtYXRpb25TdHJpbmdzKCk7XHJcblxyXG4gICAgICAgIHZhciBjb250ZW50ID0gcGFyYW1zLm1lc3NhZ2UsIGl0ZW07XHJcblxyXG4gICAgICAgIHZhciBwaXBUcmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuICAgICAgICBpZiAocGlwVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ2VuJywgeyAnSU5GT1JNQVRJT05fVElUTEUnOiAnSW5mb3JtYXRpb24nfSk7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1JywgeyAnSU5GT1JNQVRJT05fVElUTEUnOiAn0JjQvdGE0L7RgNC80LDRhtC40Y8nIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25maWcudGl0bGUgPSBwYXJhbXMudGl0bGUgfHwgJ0lORk9STUFUSU9OX1RJVExFJztcclxuICAgICAgICAgICAgdGhpcy5jb25maWcub2sgPSBwYXJhbXMub2sgfHwgJ09LJztcclxuICAgICAgICAgICAgY29udGVudCA9IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoY29udGVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcudGl0bGUgPSBwYXJhbXMudGl0bGUgfHwgJ0luZm9ybWF0aW9uJztcclxuICAgICAgICAgICAgdGhpcy5jb25maWcub2sgPSBwYXJhbXMub2sgfHwgJ09LJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwaXBGb3JtYXQgPSAkaW5qZWN0b3IuaGFzKCdwaXBGb3JtYXQnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcEZvcm1hdCcpIDogbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5pdGVtICYmIHBpcEZvcm1hdCkge1xyXG4gICAgICAgICAgICBpdGVtID0gXy50cnVuY2F0ZShwYXJhbXMuaXRlbSwgMjUpO1xyXG4gICAgICAgICAgICBjb250ZW50ID0gcGlwRm9ybWF0LnNwcmludGYoY29udGVudCwgaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250ZW50MicsIGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpZy5jb250ZW50ID0gY29udGVudDtcclxuXHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICAgICAgdGhpcy50aGVtZSA9ICRyb290U2NvcGUuJHRoZW1lO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmVycm9yID0gcGFyYW1zLmVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk9rKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DYW5jZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBJbmZvcm1hdGlvbkRpYWxvZycpXHJcbiAgICAuY29udHJvbGxlcigncGlwSW5mb3JtYXRpb25EaWFsb2dDb250cm9sbGVyJywgSW5mb3JtYXRpb25EaWFsb2dDb250cm9sbGVyKTsiLCJcclxuY2xhc3MgSW5mb3JtYXRpb25TZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBfbWREaWFsb2c7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoJG1kRGlhbG9nKSB7XHJcbiAgICAgICAgdGhpcy5fbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3cocGFyYW1zLCBzdWNjZXNzQ2FsbGJhY2ssIGNhbmNlbENhbGxiYWNrKSB7XHJcbiAgICAgICAgIHRoaXMuX21kRGlhbG9nLnNob3coe1xyXG4gICAgICAgICAgICB0YXJnZXRFdmVudDogcGFyYW1zLmV2ZW50LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2luZm9ybWF0aW9uL0luZm9ybWF0aW9uRGlhbG9nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncGlwSW5mb3JtYXRpb25EaWFsb2dDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBsb2NhbHM6IHsgcGFyYW1zOiBwYXJhbXN9LFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlXHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzc0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwSW5mb3JtYXRpb25EaWFsb2cnKVxyXG4gICAgLnNlcnZpY2UoJ3BpcEluZm9ybWF0aW9uRGlhbG9nJywgSW5mb3JtYXRpb25TZXJ2aWNlKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBJbmZvcm1hdGlvbkRpYWxvZycsIFtcclxuICAgICAgICAnbmdNYXRlcmlhbCcsXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVHJhbnNsYXRlJywgXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL0luZm9ybWF0aW9uU2VydmljZSc7XHJcbmltcG9ydCAnLi9JbmZvcm1hdGlvbkNvbnRyb2xsZXInO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgSVdpbmRvd1NlcnZpY2UgPSBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNCaWdEYXRhIHtcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzdWJ0aXRsZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9uc0JpZ1BhcmFtcyB7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZzsgIFxyXG4gICAgcHVibGljIGFwcGx5QnV0dG9uVGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBvcHRpb25zOiBPcHRpb25zQmlnRGF0YVtdO1xyXG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uOiBPcHRpb25zQmlnRGF0YTtcclxuICAgIHB1YmxpYyBkZWxldGVkO1xyXG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGRlbGV0ZWRUaXRsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGhpbnQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBub1RpdGxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbm9BY3Rpb25zOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgb3B0aW9uSW5kZXg6IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zQmlnRGlhbG9nQ29udHJvbGxlciB7XHJcblxyXG4gICAgcHVibGljICRtZERpYWxvZztcclxuICAgIHB1YmxpYyB0aGVtZTtcclxuICAgIHB1YmxpYyBjb25maWc6IE9wdGlvbnNCaWdQYXJhbXM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJG1kRGlhbG9nLFxyXG4gICAgICAgICRpbmplY3RvciwgXHJcbiAgICAgICAgJHJvb3RTY29wZSwgXHJcbiAgICAgICAgcGFyYW1zOiBPcHRpb25zQmlnUGFyYW1zKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLiRtZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBPcHRpb25zQmlnUGFyYW1zKCk7XHJcbiAgICAgICAgdmFyIHBpcFRyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgICAgIGlmIChwaXBUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygnZW4nLCB7ICdPUFRJT05TX1RJVExFJzogJ0Nob29zZSBPcHRpb24nfSk7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1JywgeyAnT1BUSU9OU19USVRMRSc6ICfQktGL0LHQtdGA0LjRgtC1INC+0L/RhtC40Y4nfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCAnT1BUSU9OU19USVRMRSc7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFwcGx5QnV0dG9uVGl0bGUgPSBwYXJhbXMuYXBwbHlCdXR0b25UaXRsZSB8fCAnU0VMRUNUJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCAnQ2hvb3NlIE9wdGlvbic7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFwcGx5QnV0dG9uVGl0bGUgPSBwYXJhbXMuYXBwbHlCdXR0b25UaXRsZSB8fCAnU2VsZWN0JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5vcHRpb25zID0gcGFyYW1zLm9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0ZWRPcHRpb24gPSBfLmZpbmQocGFyYW1zLm9wdGlvbnMsIHthY3RpdmU6IHRydWV9KSB8fCBuZXcgT3B0aW9uc0JpZ0RhdGEoKTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbk5hbWUgPSB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbi5uYW1lO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmRlbGV0ZWQgPSBwYXJhbXMuZGVsZXRlZDtcclxuICAgICAgICB0aGlzLmNvbmZpZy5kZWxldGVkVGl0bGUgPSBwYXJhbXMuZGVsZXRlZFRpdGxlO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLm5vQWN0aW9ucyA9IHBhcmFtcy5ub0FjdGlvbnMgfHwgZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25maWcubm9UaXRsZSA9IHBhcmFtcy5ub1RpdGxlIHx8IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmhpbnQgPSBwYXJhbXMuaGludCB8fCAnJztcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLmZvY3VzSW5wdXQsIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNhbmNlbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PcHRpb25TZWxlY3QoZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdGVkT3B0aW9uTmFtZSA9IG9wdGlvbi5uYW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcubm9BY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0ZWRPcHRpb25OYW1lID0gdGhpcy5jb25maWcub3B0aW9uc1t0aGlzLmNvbmZpZy5vcHRpb25JbmRleF0ubmFtZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5vQWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbktleVVwKGV2ZW50LCBpbmRleCkge1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggPiAtMSAmJiBpbmRleCA8IHRoaXMuY29uZmlnLm9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbk5hbWUgPSB0aGlzLmNvbmZpZy5vcHRpb25zW2luZGV4XS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgb25TZWxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbjtcclxuICAgICAgICBvcHRpb24gPSBfLmZpbmQodGhpcy5jb25maWcub3B0aW9ucywge25hbWU6IHRoaXMuY29uZmlnLnNlbGVjdGVkT3B0aW9uTmFtZX0pIHx8IG5ldyBPcHRpb25zQmlnRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmhpZGUoe29wdGlvbjogb3B0aW9uLCBkZWxldGVkOiB0aGlzLmNvbmZpZy5kZWxldGVkfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBwcml2YXRlIGZvY3VzSW5wdXQoKSB7XHJcbiAgICAgICAgbGV0IGxpc3Q7XHJcbiAgICAgICAgbGlzdCA9ICQoJy5waXAtb3B0aW9ucy1kaWFsb2cgLnBpcC1saXN0Jyk7XHJcbiAgICAgICAgbGlzdC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwT3B0aW9uc0JpZ0RpYWxvZycpXHJcbiAgICAuY29udHJvbGxlcigncGlwT3B0aW9uc0JpZ0RpYWxvZ0NvbnRyb2xsZXInLCBPcHRpb25zQmlnRGlhbG9nQ29udHJvbGxlcik7IiwiXHJcbmNsYXNzIE9wdGlvbnNCaWdTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBfbWREaWFsb2c7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoJG1kRGlhbG9nKSB7XHJcbiAgICAgICAgdGhpcy5fbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbXMsIHN1Y2Nlc3NDYWxsYmFjaywgY2FuY2VsQ2FsbGJhY2spIHtcclxuICAgICAgICAgdGhpcy5fbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiBwYXJhbXMuZXZlbnQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnb3B0aW9ucy9PcHRpb25zQmlnRGlhbG9nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncGlwT3B0aW9uc0JpZ0RpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGxvY2Fsczoge3BhcmFtczogcGFyYW1zfSxcclxuICAgICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3NDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKG9wdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYW5jZWxDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwT3B0aW9uc0JpZ0RpYWxvZycpXHJcbiAgICAuc2VydmljZSgncGlwT3B0aW9uc0JpZ0RpYWxvZycsIE9wdGlvbnNCaWdTZXJ2aWNlKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgSVdpbmRvd1NlcnZpY2UgPSBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNEYXRhIHtcclxuICAgIHB1YmxpYyBpY29uOiBzdHJpbmcgPSAnc3Rhcic7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTsgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zUGFyYW1zIHtcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nOyAgXHJcbiAgICBwdWJsaWMgYXBwbHlCdXR0b25UaXRsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIG9wdGlvbnM6IE9wdGlvbnNEYXRhW107XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRPcHRpb246IE9wdGlvbnNEYXRhO1xyXG4gICAgcHVibGljIGRlbGV0ZWQ7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRPcHRpb25OYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGVsZXRlZFRpdGxlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zRGlhbG9nQ29udHJvbGxlciB7XHJcblxyXG4gICAgcHVibGljICRtZERpYWxvZztcclxuICAgIHB1YmxpYyB0aGVtZTtcclxuICAgIHB1YmxpYyBjb25maWc6IE9wdGlvbnNQYXJhbXM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJG1kRGlhbG9nLFxyXG4gICAgICAgICRpbmplY3RvciwgXHJcbiAgICAgICAgJHJvb3RTY29wZSwgXHJcbiAgICAgICAgcGFyYW1zOiBPcHRpb25zUGFyYW1zKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLiRtZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBPcHRpb25zUGFyYW1zKCk7XHJcbiAgICAgICAgdmFyIHBpcFRyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgICAgIGlmIChwaXBUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygnZW4nLCB7ICdPUFRJT05TX1RJVExFJzogJ0Nob29zZSBPcHRpb24nfSk7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1JywgeyAnT1BUSU9OU19USVRMRSc6ICfQktGL0LHQtdGA0LjRgtC1INC+0L/RhtC40Y4nfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCAnT1BUSU9OU19USVRMRSc7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFwcGx5QnV0dG9uVGl0bGUgPSBwYXJhbXMuYXBwbHlCdXR0b25UaXRsZSB8fCAnU0VMRUNUJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCAnQ2hvb3NlIE9wdGlvbic7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFwcGx5QnV0dG9uVGl0bGUgPSBwYXJhbXMuYXBwbHlCdXR0b25UaXRsZSB8fCAnU2VsZWN0JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5vcHRpb25zID0gcGFyYW1zLm9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0ZWRPcHRpb24gPSBfLmZpbmQocGFyYW1zLm9wdGlvbnMsIHthY3RpdmU6IHRydWV9KSB8fCBuZXcgT3B0aW9uc0RhdGEoKTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbk5hbWUgPSB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbi5uYW1lO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmRlbGV0ZWQgPSBwYXJhbXMuZGVsZXRlZDtcclxuICAgICAgICB0aGlzLmNvbmZpZy5kZWxldGVkVGl0bGUgPSBwYXJhbXMuZGVsZXRlZFRpdGxlO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZm9jdXNJbnB1dCwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2FuY2VsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk9wdGlvblNlbGVjdChldmVudCwgb3B0aW9uOiBPcHRpb25zRGF0YSkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdGVkT3B0aW9uTmFtZSA9IG9wdGlvbi5uYW1lO1xyXG5cclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICBwdWJsaWMgb25LZXlQcmVzcyAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0KCkge1xyXG4gICAgICAgIGxldCBvcHRpb246IE9wdGlvbnNEYXRhO1xyXG4gICAgICAgIG9wdGlvbiA9IF8uZmluZCh0aGlzLmNvbmZpZy5vcHRpb25zLCB7bmFtZTogdGhpcy5jb25maWcuc2VsZWN0ZWRPcHRpb25OYW1lfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cob3B0aW9uKTtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5oaWRlKHtvcHRpb246IG9wdGlvbiwgZGVsZXRlZDogdGhpcy5jb25maWcuZGVsZXRlZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9jdXNJbnB1dCgpIHtcclxuICAgICAgICBsZXQgbGlzdDtcclxuICAgICAgICBsaXN0ID0gJCgnLnBpcC1vcHRpb25zLWRpYWxvZyAucGlwLWxpc3QnKTtcclxuICAgICAgICBsaXN0LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBPcHRpb25zRGlhbG9nJylcclxuICAgIC5jb250cm9sbGVyKCdwaXBPcHRpb25zRGlhbG9nQ29udHJvbGxlcicsIE9wdGlvbnNEaWFsb2dDb250cm9sbGVyKTsiLCJcclxuY2xhc3MgT3B0aW9uc1NlcnZpY2Uge1xyXG4gICAgcHVibGljIF9tZERpYWxvZztcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigkbWREaWFsb2cpIHtcclxuICAgICAgICB0aGlzLl9tZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93KHBhcmFtcywgc3VjY2Vzc0NhbGxiYWNrLCBjYW5jZWxDYWxsYmFjaykge1xyXG4gICAgICAgICB0aGlzLl9tZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IHBhcmFtcy5ldmVudCxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdvcHRpb25zL09wdGlvbnNEaWFsb2cuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwaXBPcHRpb25zRGlhbG9nQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgbG9jYWxzOiB7cGFyYW1zOiBwYXJhbXN9LFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlXHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzc0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sob3B0aW9uLm9wdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYW5jZWxDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwT3B0aW9uc0RpYWxvZycpXHJcbiAgICAuc2VydmljZSgncGlwT3B0aW9uc0RpYWxvZycsIE9wdGlvbnNTZXJ2aWNlKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBPcHRpb25zRGlhbG9nJywgW1xyXG4gICAgICAgICduZ01hdGVyaWFsJywgXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVHJhbnNsYXRlJyxcclxuICAgICAgICAncGlwRGlhbG9ncy5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vT3B0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgJy4vT3B0aW9uc0NvbnRyb2xsZXInO1xyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE9wdGlvbnNCaWdEaWFsb2cnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLCBcclxuICAgICAgICAncGlwRGlhbG9ncy5UcmFuc2xhdGUnLFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRlbXBsYXRlcyddKTtcclxuICAgICAgICBcclxuaW1wb3J0ICcuL09wdGlvbnNCaWdTZXJ2aWNlJztcclxuaW1wb3J0ICcuL09wdGlvbnNCaWdDb250cm9sbGVyJzsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdjb25maXJtYXRpb24vQ29uZmlybWF0aW9uRGlhbG9nLmh0bWwnLFxuICAgICc8bWQtZGlhbG9nIGNsYXNzPVwicGlwLWRpYWxvZyBwaXAtY29uZmlybWF0aW9uLWRpYWxvZyBsYXlvdXQtY29sdW1uXCIgd2lkdGg9XCI0MDBcIiBtZC10aGVtZT1cInt7Ojp2bS50aGVtZX19XCI+PGRpdiBjbGFzcz1cInBpcC1oZWFkZXJcIj48aDM+e3s6OiB2bS5jb25maWcudGl0bGV9fTwvaDM+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1mb290ZXJcIj48ZGl2PjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vbkNhbmNlbCgpXCI+e3s6OiB2bS5jb25maWcuY2FuY2VsfX08L21kLWJ1dHRvbj48bWQtYnV0dG9uIGNsYXNzPVwibWQtYWNjZW50XCIgbmctY2xpY2s9XCJ2bS5vbk9rKClcIj57ezo6IHZtLmNvbmZpZy5va319PC9tZC1idXR0b24+PC9kaXY+PC9kaXY+PC9tZC1kaWFsb2c+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdvcHRpb25zL09wdGlvbnNCaWdEaWFsb2cuaHRtbCcsXG4gICAgJzxtZC1kaWFsb2cgY2xhc3M9XCJwaXAtZGlhbG9nIHBpcC1vcHRpb25zLWRpYWxvZy1iaWcgbGF5b3V0LWNvbHVtblwiIG1pbi13aWR0aD1cIjQwMFwiIG1kLXRoZW1lPVwie3t2bS50aGVtZX19XCI+PG1kLWRpYWxvZy1jb250ZW50IGNsYXNzPVwicGlwLWJvZHkgcGlwLXNjcm9sbFwiIG5nLWNsYXNzPVwie1xcJ2JwMjRcXCc6ICF2bS5jb25maWcubm9BY3Rpb25zfVwiPjxkaXYgY2xhc3M9XCJwaXAtaGVhZGVyXCIgbmctY2xhc3M9XCJ7XFwnaGVhZGVyLWhpbnRcXCc6IHZtLmNvbmZpZy5ub1RpdGxlICYmIHZtLmNvbmZpZy5oaW50fVwiPjxoMyBjbGFzcz1cIm0wXCIgbmctaWY9XCIhdm0uY29uZmlnLm5vVGl0bGVcIj57ezo6dm0uY29uZmlnLnRpdGxlIHwgdHJhbnNsYXRlfX08L2gzPjxkaXYgbmctc2hvdz1cInZtLmNvbmZpZy5ub1RpdGxlICYmIHZtLmNvbmZpZy5oaW50XCIgY2xhc3M9XCJkaWFsb2ctaGludCBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIj48ZGl2IGNsYXNzPVwiaGludC1pY29uLWNvbnRhaW5lciBmbGV4LWZpeGVkXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczppbmZvLWNpcmNsZS1vdXRsaW5lXCI+PC9tZC1pY29uPjwvZGl2PjxkaXY+e3s6OnZtLmNvbmZpZy5oaW50IHwgdHJhbnNsYXRlfX08L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY29udGVudC1kaXZpZGVyXCIgbmctaWY9XCIhbm9UaXRsZVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtY29udGVudFwiPjxkaXYgY2xhc3M9XCJzcGFjZXI4XCIgbmctaWY9XCJub1RpdGxlICYmIGhpbnRcIj48L2Rpdj48bWQtbGlzdCBjbGFzcz1cInBpcC1tZW51IHBpcC1yZWYtbGlzdFwiIHBpcC1zZWxlY3RlZD1cInZtLmNvbmZpZy5vcHRpb25JbmRleFwiIGluZGV4PVwie3t2bS5jb25maWcub3B0aW9uSW5kZXggfX1cIiBwaXAtc2VsZWN0PVwidm0ub25TZWxlY3RlZCgkZXZlbnQpXCI+PG1kLWxpc3QtaXRlbSBjbGFzcz1cInBpcC1yZWYtbGlzdC1pdGVtIHBpcC1zZWxlY3RhYmxlIGxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlclwiIG5nLWNsYXNzPVwie1xcJ3NlbGVjdGVkIG1kLWZvY3VzZWRcXCcgOiBvcHRpb24ubmFtZSA9PSBzZWxlY3RlZE9wdGlvbk5hbWUsIFxcJ2RpdmlkZXItYm90dG9tXFwnOiAkaW5kZXggIT0gb3B0aW9ucy5sZW5ndGggLSAxfVwiIG1kLWluay1yaXBwbGU9XCJcIiBuZy1rZXl1cD1cInZtLm9uS2V5VXAoJGV2ZW50LCAkaW5kZXgpXCIgbmctcmVwZWF0PVwib3B0aW9uIGluIHZtLmNvbmZpZy5vcHRpb25zXCI+PGRpdiBjbGFzcz1cInBpcC1jb250ZW50IGNvbnRlbnQtc3RyZXRjaFwiIG5nLWNsaWNrPVwidm0ub25PcHRpb25TZWxlY3QoJGV2ZW50LCBvcHRpb24pXCI+PHAgY2xhc3M9XCJwaXAtdGl0bGUgc3BhY2VyLXJpZ2h0XCIgbmctaWY9XCJvcHRpb24udGl0bGVcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDRweCAhaW1wb3J0YW50O1wiPnt7OjpvcHRpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvcD48ZGl2IGNsYXNzPVwicGlwLXN1YnRpdGxlIHNwYWNlci1yaWdodFwiIHN0eWxlPVwiaGVpZ2h0OiBpbmhlcml0XCIgbmctaWY9XCJvcHRpb24uc3VidGl0bGVcIj57ezo6b3B0aW9uLnN1YnRpdGxlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN1YnRpdGxlIHNwYWNlci1yaWdodFwiIHN0eWxlPVwiaGVpZ2h0OiBpbmhlcml0XCIgbmctaWY9XCJvcHRpb24udGV4dFwiIG5nLWJpbmQtaHRtbD1cIm9wdGlvbi50ZXh0IHwgdHJhbnNsYXRlXCI+PC9kaXY+PC9kaXY+PC9tZC1saXN0LWl0ZW0+PC9tZC1saXN0PjwvZGl2PjxkaXYgY2xhc3M9XCJzcGFjZXI4XCIgbmctaWY9XCJ2bS5jb25maWcubm9BY3Rpb25zXCI+PC9kaXY+PC9tZC1kaWFsb2ctY29udGVudD48ZGl2IGNsYXNzPVwicGlwLWZvb3RlclwiIG5nLWlmPVwiIXZtLmNvbmZpZy5ub0FjdGlvbnNcIj48ZGl2PjxtZC1idXR0b24gY2xhc3M9XCJwaXAtY2FuY2VsXCIgbmctY2xpY2s9XCJ2bS5vbkNhbmNlbCgpXCI+e3s6OlxcJ0NBTkNFTFxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1zdWJtaXQgbWQtYWNjZW50XCIgbmctY2xpY2s9XCJ2bS5vblNlbGVjdCgpXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IC02cHhcIj57ezo6dm0uY29uZmlnLmFwcGx5QnV0dG9uVGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjwvbWQtZGlhbG9nPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnb3B0aW9ucy9PcHRpb25zRGlhbG9nLmh0bWwnLFxuICAgICc8bWQtZGlhbG9nIGNsYXNzPVwicGlwLWRpYWxvZyBwaXAtb3B0aW9ucy1kaWFsb2cgbGF5b3V0LWNvbHVtblwiIG1pbi13aWR0aD1cIjQwMFwiIG1kLXRoZW1lPVwie3t2bS50aGVtZX19XCI+PG1kLWRpYWxvZy1jb250ZW50IGNsYXNzPVwicGlwLWJvZHkgbHAwIHRwMCBycDAgYnAyNCBwaXAtc2Nyb2xsXCI+PGRpdiBjbGFzcz1cInBpcC1oZWFkZXJcIj48aDM+e3s6OnZtLmNvbmZpZy50aXRsZSB8IHRyYW5zbGF0ZX19PC9oMz48ZGl2IG5nLXNob3c9XCJ2bS5jb25maWcuZGVsZXRlZFRpdGxlXCIgY2xhc3M9XCJoZWFkZXItb3B0aW9uIHRleHQtc3ViaGVhZDEgZGl2aWRlci1ib3R0b21cIj48bWQtY2hlY2tib3ggbmctbW9kZWw9XCJkZWxldGVkXCIgYXJpYS1sYWJlbD1cIkNIRUNLQk9YXCI+e3s6OnZtLmNvbmZpZy5kZWxldGVkVGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtY2hlY2tib3g+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1jb250ZW50XCI+PG1kLXJhZGlvLWdyb3VwIG5nLW1vZGVsPVwidm0uc2VsZWN0ZWRPcHRpb25OYW1lXCIgY2xhc3M9XCJwaXAtbGlzdCBtZC1wcmltYXJ5XCIgbWQtbm8taW5rPVwidHJ1ZVwiIG5nLWtleXByZXNzPVwidm0ub25LZXlQcmVzcygkZXZlbnQpXCIgdGFiaW5kZXg9XCIwXCI+PGRpdiBuZy1yZXBlYXQ9XCJvcHRpb24gaW4gdm0uY29uZmlnLm9wdGlvbnNcIiBjbGFzcz1cInBpcC1saXN0LWl0ZW1cIiBtZC1pbmstcmlwcGxlPVwiXCIgdWktZXZlbnQ9XCJ7IGNsaWNrOiBcXCd2bS5vbk9wdGlvblNlbGVjdCgkZXZlbnQsIG9wdGlvbilcXCcgfVwiIG5nLWNsYXNzPVwieyBzZWxlY3RlZDogb3B0aW9uLm5hbWUgPT0gdm0uY29uZmlnLnNlbGVjdGVkT3B0aW9uTmFtZSB9XCI+PGRpdiBjbGFzcz1cInBpcC1saXN0LWl0ZW0gaXRlbS1wYWRkaW5nXCI+PG1kLWljb24gY2xhc3M9XCJwaXAtb3B0aW9uLWljb25cIiBtZC1zdmctaWNvbj1cImljb25zOnt7b3B0aW9uLmljb259fVwiIG5nLWlmPVwib3B0aW9uLmljb25cIj48L21kLWljb24+PGRpdiBjbGFzcz1cInBpcC1vcHRpb24tdGl0bGVcIj57ezo6b3B0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L2Rpdj48bWQtcmFkaW8tYnV0dG9uIG5nLXZhbHVlPVwib3B0aW9uLm5hbWVcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1sYWJlbD1cInt7OjpvcHRpb24udGl0bGUgfCB0cmFuc2xhdGV9fVwiPjwvbWQtcmFkaW8tYnV0dG9uPjwvZGl2PjwvZGl2PjwvbWQtcmFkaW8tZ3JvdXA+PC9kaXY+PC9tZC1kaWFsb2ctY29udGVudD48ZGl2IGNsYXNzPVwicGlwLWZvb3RlclwiPjxkaXY+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1jYW5jZWxcIiBuZy1jbGljaz1cInZtLm9uQ2FuY2VsKClcIj57ezo6XFwnQ0FOQ0VMXFwnIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLXN1Ym1pdCBtZC1hY2NlbnRcIiBuZy1jbGljaz1cInZtLm9uU2VsZWN0KClcIj57ezo6dm0uY29uZmlnLmFwcGx5QnV0dG9uVGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjwvbWQtZGlhbG9nPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZXJyb3JfZGV0YWlscy9FcnJvckRldGFpbHMuaHRtbCcsXG4gICAgJzxtZC1kaWFsb2cgY2xhc3M9XCJwaXAtZGlhbG9nIHBpcC1lcnJvci1kZXRhaWxzLWRpYWxvZyBsYXlvdXQtY29sdW1uXCIgd2lkdGg9XCI0MDBcIiBtZC10aGVtZT1cInt7dm0udGhlbWV9fVwiPjxkaXYgY2xhc3M9XCJwaXAtYm9keVwiPjxkaXYgY2xhc3M9XCJwaXAtaGVhZGVyXCI+PGgzPnt7Ojp2bS5jb25maWcuZXJyb3JEZXRhaWxzIHwgdHJhbnNsYXRlfX08L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgZXJyb3Itc2VjdGlvbiB0ZXh0LWJvZHkyIGNvbG9yLXNlY29uZGFyeS10ZXh0XCIgbmctaWY9XCJ2bS5jb25maWcuZXJyb3IuY29kZSB8fCAodm0uY29uZmlnLmVycm9yLmRhdGEgJiYgZXJyb3IuZGF0YS5jb2RlKVwiPnt7Ojp2bS5jb25maWcuZXJyb3JDb2RlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5jb2RlIHx8ICh2bS5jb25maWcuZXJyb3IuZGF0YSAmJiB2bS5jb25maWcuZXJyb3IuZGF0YS5jb2RlKVwiPnt7dm0uY29uZmlnLmVycm9yLmNvZGUgfHwgdm0uY29uZmlnLmVycm9yLmRhdGEuY29kZX19PC9kaXY+PGRpdiBjbGFzcz1cImxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlciBlcnJvci1zZWN0aW9uIHRleHQtYm9keTIgY29sb3Itc2Vjb25kYXJ5LXRleHRcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5wYXRoIHx8ICh2bS5jb25maWcuZXJyb3IuZGF0YSAmJiB2bS5jb25maWcuZXJyb3IuZGF0YS5wYXRoKVwiPnt7Ojp2bS5jb25maWcuZXJyb3JQYXRoIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5wYXRoIHx8ICh2bS5jb25maWcuZXJyb3IuZGF0YSAmJiB2bS5jb25maWcuZXJyb3IuZGF0YS5wYXRoKVwiPnt7dm0uY29uZmlnLmVycm9yLnBhdGggfHwgdm0uY29uZmlnLmVycm9yLmRhdGEucGF0aH19PC9kaXY+PGRpdiBjbGFzcz1cImVycm9yLXNlY3Rpb24gdGV4dC1ib2R5MiBjb2xvci1zZWNvbmRhcnktdGV4dCBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5lcnJvciB8fCAodm0uY29uZmlnLmVycm9yLmRhdGEgJiYgdm0uY29uZmlnLmVycm9yLmRhdGEuZXJyb3IpXCI+e3s6OnZtLmNvbmZpZy5lcnJvclRleHQgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgdGV4dC1zdWJoZWFkMVwiIG5nLWlmPVwidm0uY29uZmlnLmVycm9yLmVycm9yIHx8ICh2bS5jb25maWcuZXJyb3IuZGF0YSAmJiB2bS5jb25maWcuZXJyb3IuZGF0YS5lcnJvcilcIj57e3ZtLmNvbmZpZy5lcnJvci5lcnJvciB8fCB2bS5jb25maWcuZXJyb3IuZGF0YS5lcnJvcn19PC9kaXY+PGRpdiBjbGFzcz1cImVycm9yLXNlY3Rpb24gdGV4dC1ib2R5MiBjb2xvci1zZWNvbmRhcnktdGV4dCBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5tZXRob2QgfHwgKHZtLmNvbmZpZy5lcnJvci5kYXRhICYmIHZtLmNvbmZpZy5lcnJvci5kYXRhLm1ldGhvZClcIj57ezo6dm0uY29uZmlnLmVycm9yTWV0aG9kIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5tZXRob2QgfHwgKHZtLmNvbmZpZy5lcnJvci5kYXRhICYmIHZtLmNvbmZpZy5lcnJvci5kYXRhLm1ldGhvZClcIj57e3ZtLmNvbmZpZy5lcnJvci5tZXRob2QgfHwgdm0uY29uZmlnLmVycm9yLmRhdGEubWV0aG9kfX08L2Rpdj48ZGl2IGNsYXNzPVwiZXJyb3Itc2VjdGlvbiB0ZXh0LWJvZHkyIGNvbG9yLXNlY29uZGFyeS10ZXh0IGxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlclwiIG5nLWlmPVwidm0uY29uZmlnLmVycm9yLm1lc3NhZ2UgfHwgKHZtLmNvbmZpZy5lcnJvci5kYXRhICYmIHZtLmNvbmZpZy5lcnJvci5kYXRhLm1lc3NhZ2UpXCI+e3s6OnZtLmNvbmZpZy5lcnJvck1lc3NhZ2UgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgdGV4dC1zdWJoZWFkMVwiIG5nLWlmPVwidm0uY29uZmlnLmVycm9yLm1lc3NhZ2UgfHwgKHZtLmNvbmZpZy5lcnJvci5kYXRhICYmIHZtLmNvbmZpZy5lcnJvci5kYXRhLm1lc3NhZ2UpXCI+e3t2bS5jb25maWcuZXJyb3IubWVzc2FnZSB8fCB2bS5jb25maWcuZXJyb3IuZGF0YS5tZXNzYWdlfX08L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWZvb3RlclwiPjxkaXY+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWFjY2VudCBtMFwiIG5nLWNsaWNrPVwidm0ub25PaygpXCI+e3s6OnZtLmNvbmZpZy5kaXNtaXNzQnV0dG9uIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48L21kLWRpYWxvZz4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2luZm9ybWF0aW9uL0luZm9ybWF0aW9uRGlhbG9nLmh0bWwnLFxuICAgICc8bWQtZGlhbG9nIGNsYXNzPVwicGlwLWRpYWxvZyBwaXAtaW5mb3JtYXRpb24tZGlhbG9nIGxheW91dC1jb2x1bW5cIiB3aWR0aD1cIjQwMFwiIG1kLXRoZW1lPVwie3t2bS50aGVtZX19XCI+PGRpdiBjbGFzcz1cInBpcC1oZWFkZXJcIj48aDM+e3s6OiB2bS5jb25maWcudGl0bGUgfCB0cmFuc2xhdGUgfX08L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtYm9keVwiPjxkaXYgY2xhc3M9XCJwaXAtY29udGVudFwiPnt7IHZtLmNvbmZpZy5jb250ZW50IH19PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1mb290ZXJcIj48ZGl2PjxtZC1idXR0b24gY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cInZtLm9uT2soKVwiPnt7IHZtLmNvbmZpZy5vayB8IHRyYW5zbGF0ZSB9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjwvbWQtZGlhbG9nPicpO1xufV0pO1xufSkoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwLXdlYnVpLWRpYWxvZ3MtaHRtbC5taW4uanMubWFwXG4iXX0=