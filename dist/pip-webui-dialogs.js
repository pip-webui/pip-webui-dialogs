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
        this.theme = $rootScope['$theme'];
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
"use strict";
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
        this.theme = $rootScope['$theme'];
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
"use strict";
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
        this.theme = $rootScope['$theme'];
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
"use strict";
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
        this.theme = $rootScope['$theme'];
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
"use strict";
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



},{}]},{},[17,1,2,3,4,5,6,7,8,11,9,10,16,12,13,14,15])(17)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvbkNvbnRyb2xsZXIudHMiLCJzcmMvY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvblNlcnZpY2UudHMiLCJzcmMvY29uZmlybWF0aW9uL2luZGV4LnRzIiwic3JjL2RlcGVuZGVuY2llcy90cmFuc2xhdGUudHMiLCJzcmMvZGlhbG9ncy50cyIsInNyYy9lcnJvcl9kZXRhaWxzL0Vycm9yRGV0YWlsc0NvbnRyb2xsZXIudHMiLCJzcmMvZXJyb3JfZGV0YWlscy9FcnJvckRldGFpbHNTZXJ2aWNlLnRzIiwic3JjL2Vycm9yX2RldGFpbHMvaW5kZXgudHMiLCJzcmMvaW5mb3JtYXRpb24vSW5mb3JtYXRpb25Db250cm9sbGVyLnRzIiwic3JjL2luZm9ybWF0aW9uL0luZm9ybWF0aW9uU2VydmljZS50cyIsInNyYy9pbmZvcm1hdGlvbi9pbmRleC50cyIsInNyYy9vcHRpb25zL09wdGlvbnNCaWdDb250cm9sbGVyLnRzIiwic3JjL29wdGlvbnMvT3B0aW9uc0JpZ1NlcnZpY2UudHMiLCJzcmMvb3B0aW9ucy9PcHRpb25zQ29udHJvbGxlci50cyIsInNyYy9vcHRpb25zL09wdGlvbnNTZXJ2aWNlLnRzIiwic3JjL29wdGlvbnMvaW5kZXgudHMiLCJ0ZW1wL3BpcC13ZWJ1aS1kaWFsb2dzLWh0bWwubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDO0FBRWI7SUFBQTtRQUNXLE9BQUUsR0FBVyxJQUFJLENBQUM7UUFFbEIsV0FBTSxHQUFXLFFBQVEsQ0FBQztJQUVyQyxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTtBQUxZLGdEQUFrQjtBQU8vQjtJQU1JLHNDQUNJLFNBQTBDLEVBQzFDLFNBQVMsRUFDVCxVQUFnQyxFQUNoQyxNQUEwQjtRQUMxQixVQUFVLENBQUM7UUFDWCxJQUFJ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a0NBQWdDOztBQ25CaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZmlybWF0aW9uUGFyYW1zIHtcclxuICAgIHB1YmxpYyBvazogc3RyaW5nID0gJ09LJztcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nOyBcclxuICAgIHB1YmxpYyBjYW5jZWw6IHN0cmluZyA9ICdDYW5jZWwnO1xyXG4gICAgcHVibGljIGV2ZW50OiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25EaWFsb2dDb250cm9sbGVyIHtcclxuXHJcbiAgICBwdWJsaWMgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgcHVibGljIHRoZW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBDb25maXJtYXRpb25QYXJhbXM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcixcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBwYXJhbXM6IENvbmZpcm1hdGlvblBhcmFtcykge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maXJtYXRpb25QYXJhbXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHBpcFRyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAocGlwVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ2VuJywgeyAnQ09ORklSTV9USVRMRSc6ICdDb25maXJtJyB9KTtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygncnUnLCB7ICdDT05GSVJNX1RJVExFJzogJ9Cf0L7QtNGC0LLQtdGA0LTQuNGC0LUnfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCAnQ09ORklSTV9USVRMRSc7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9rID0gcGFyYW1zLm9rIHx8ICdPSyc7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNhbmNlbCA9IHBhcmFtcy5jYW5jZWwgfHwgJ0NBTkNFTCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcudGl0bGUgPSBwYXJhbXMudGl0bGUgfHwgJ0NvbmZpcm0nO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vayA9IHBhcmFtcy5vayB8fCAnT0snO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jYW5jZWwgPSBwYXJhbXMuY2FuY2VsIHx8ICdDYW5jZWwnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICAgICAgdGhpcy50aGVtZSA9ICRyb290U2NvcGVbJyR0aGVtZSddO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk9rKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DYW5jZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBDb25maXJtYXRpb25EaWFsb2cnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLCBcclxuICAgICAgICAncGlwRGlhbG9ncy5UcmFuc2xhdGUnLFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRlbXBsYXRlcyddKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3BpcENvbmZpcm1hdGlvbkRpYWxvZ0NvbnRyb2xsZXInLCBDb25maXJtYXRpb25EaWFsb2dDb250cm9sbGVyKTsiLCJpbXBvcnQgeyBDb25maXJtYXRpb25QYXJhbXMgfSBmcm9tICcuL0NvbmZpcm1hdGlvbkNvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlybWF0aW9uU2VydmljZSB7XHJcbiAgICBzaG93KHBhcmFtczogQ29uZmlybWF0aW9uUGFyYW1zLCBzdWNjZXNzQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLCBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQpOiBhbnk7XHJcbn1cclxuXHJcbmNsYXNzIENvbmZpcm1hdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJQ29uZmlybWF0aW9uU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9tZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbXM6IENvbmZpcm1hdGlvblBhcmFtcywgc3VjY2Vzc0NhbGxiYWNrPzogKCkgPT4gdm9pZCwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiBwYXJhbXMuZXZlbnQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvbkRpYWxvZy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcENvbmZpcm1hdGlvbkRpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGxvY2FsczogeyBwYXJhbXM6IHBhcmFtcyB9LFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FuY2VsQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBDb25maXJtYXRpb25EaWFsb2cnKVxyXG4gICAgLnNlcnZpY2UoJ3BpcENvbmZpcm1hdGlvbkRpYWxvZycsIENvbmZpcm1hdGlvblNlcnZpY2UpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAnLi9Db25maXJtYXRpb25Db250cm9sbGVyJztcclxuaW1wb3J0ICcuL0NvbmZpcm1hdGlvblNlcnZpY2UnO1xyXG4iLCIvKipcclxuICogQGZpbGUgT3B0aW9uYWwgZmlsdGVyIHRvIHRyYW5zbGF0ZSBzdHJpbmcgcmVzb3VyY2VzXHJcbiAqIEBjb3B5cmlnaHQgRGlnaXRhbCBMaXZpbmcgU29mdHdhcmUgQ29ycC4gMjAxNC0yMDE2XHJcbiAqL1xyXG4gXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVHJhbnNsYXRlJywgW10pO1xyXG5cclxuICAgIHRoaXNNb2R1bGUuZmlsdGVyKCd0cmFuc2xhdGUnLCBmdW5jdGlvbiAoJGluamVjdG9yKSB7XHJcbiAgICAgICAgdmFyIHBpcFRyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpIFxyXG4gICAgICAgICAgICA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBpcFRyYW5zbGF0ZSAgPyBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKGtleSkgfHwga2V5IDoga2V5O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSkoKTtcclxuIiwi77u/LyoqXHJcbiAqIEBmaWxlIFJlZ2lzdHJhdGlvbiBvZiBkaWFsb2dzXHJcbiAqIEBjb3B5cmlnaHQgRGlnaXRhbCBMaXZpbmcgU29mdHdhcmUgQ29ycC4gMjAxNC0yMDE2XHJcbiAqL1xyXG5cclxuLyogZ2xvYmFsIGFuZ3VsYXIgKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAnLi9lcnJvcl9kZXRhaWxzJztcclxuaW1wb3J0ICcuL2luZm9ybWF0aW9uJztcclxuaW1wb3J0ICcuL29wdGlvbnMnO1xyXG5pbXBvcnQgJy4vY29uZmlybWF0aW9uJztcclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcERpYWxvZ3MnLCBbXHJcbiAgICAgICAgJ3BpcEluZm9ybWF0aW9uRGlhbG9nJyxcclxuICAgICAgICAncGlwQ29uZmlybWF0aW9uRGlhbG9nJyxcclxuICAgICAgICAncGlwT3B0aW9uc0RpYWxvZycsXHJcbiAgICAgICAgJ3BpcE9wdGlvbnNCaWdEaWFsb2cnLFxyXG4gICAgICAgICdwaXBFcnJvckRldGFpbHNEaWFsb2cnLFxyXG4gICAgICAgIC8vJ3BpcEVycm9yRGV0YWlsczJEaWFsb2cnXHJcbiAgICBdKTtcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZXJyb3JfZGV0YWlscyc7XHJcbi8vZXhwb3J0ICogZnJvbSAnLi9lcnJvcl9kZXRhaWxzMic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW5mb3JtYXRpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL29wdGlvbnMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbmZpcm1hdGlvbic7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBJV2luZG93U2VydmljZSA9IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2U7XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JTdHJpbmdzIHtcclxuICAgIHB1YmxpYyBvazogc3RyaW5nID0gJ09LJztcclxuICAgIHB1YmxpYyBjYW5jZWw6IHN0cmluZyA9ICdDYW5jZWwnO1xyXG4gICAgcHVibGljIGVycm9yRGV0YWlsczogc3RyaW5nID0gJ0Vycm9yIGRldGFpbHMnO1xyXG4gICAgcHVibGljIGRpc21pc3NCdXR0b246IHN0cmluZyA9ICdEaXNtaXNzJztcclxuICAgIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZyA9ICdNZXNzYWdlJztcclxuICAgIHB1YmxpYyBlcnJvckNvZGU6IHN0cmluZyA9ICdDb2RlJztcclxuICAgIHB1YmxpYyBlcnJvck1ldGhvZDogc3RyaW5nID0gJ01ldGhvZCc7XHJcbiAgICBwdWJsaWMgZXJyb3JQYXRoOiBzdHJpbmcgPSAnUGF0aCc7XHJcbiAgICBwdWJsaWMgZXJyb3I6IHN0cmluZyA9ICdFcnJvcic7XHJcbiAgICBwdWJsaWMgZXJyb3JUZXh0OiBzdHJpbmcgPSAnRXJyb3InOyAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JQYXJhbXMge1xyXG4gICAgcHVibGljIG9rOiBzdHJpbmcgPSAnT0snO1xyXG4gICAgcHVibGljIGNhbmNlbDogc3RyaW5nID0gJ0NBTkNFTCc7XHJcbiAgICBwdWJsaWMgZXJyb3I6IHN0cmluZyA9ICdFUlJPUic7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvckRldGFpbHNEaWFsb2dDb250cm9sbGVyIHtcclxuXHJcbiAgICBwdWJsaWMgJG1kRGlhbG9nO1xyXG4gICAgcHVibGljIHRoZW1lO1xyXG4gICAgcHVibGljIGNvbmZpZzogRXJyb3JTdHJpbmdzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRtZERpYWxvZyxcclxuICAgICAgICAkaW5qZWN0b3IsXHJcbiAgICAgICAgJHJvb3RTY29wZSwgXHJcbiAgICAgICAgcGFyYW1zOiBFcnJvclBhcmFtcykge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBFcnJvclN0cmluZ3MoKTtcclxuICAgICAgICB2YXIgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChwaXBUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ2VuJywge1xyXG4gICAgICAgICAgICAgICAgICAgICdFUlJPUl9ERVRBSUxTJzogJ0Vycm9yIGRldGFpbHMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdDT0RFJzogJ0Vycm9yIGNvZGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdQQVRIJzogJ1BhdGgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdFUlJPUic6ICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ01FVEhPRCc6ICdNZXRob2QnLFxyXG4gICAgICAgICAgICAgICAgICAgICdNRVNTQUdFJzogJ01lc3NhZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICdESVNNSVNTJzogJ0Rpc21pc3MnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICdFUlJPUl9ERVRBSUxTJzogJ9CU0LXRgtCw0LvQuCDQvtGI0LjQsdC60LgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdDT0RFJzogJ9Ca0L7QtCDQvtGI0LjQsdC60LgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdQQVRIJzogJ9Cf0YPRgtGMJyxcclxuICAgICAgICAgICAgICAgICAgICAnRVJST1InOiAn0J7RiNC40LHQutCwJyxcclxuICAgICAgICAgICAgICAgICAgICAnTUVUSE9EJzogJ9Cc0LXRgtC+0LQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdNRVNTQUdFJzogJ9Ch0L7QvtCx0YnQtdC90LjQtSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcub2sgPSBwYXJhbXMub2s7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5jYW5jZWwgPSBwYXJhbXMuY2FuY2VsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuZXJyb3JEZXRhaWxzID0gJ0VSUk9SX0RFVEFJTFMnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuZGlzbWlzc0J1dHRvbiA9ICdESVNNSVNTJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmVycm9yTWVzc2FnZSA9ICdNRVNTQUdFJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmVycm9yQ29kZSA9ICdDT0RFJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmVycm9yTWV0aG9kID0gJ01FVEhPRCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5lcnJvclBhdGggPSAnUEFUSCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5lcnJvclRleHQgPSAnRVJST1InOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm9rID0gcGFyYW1zLm9rO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuY2FuY2VsID0gcGFyYW1zLmNhbmNlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRtZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgICAgICAgICAgdGhpcy50aGVtZSA9ICRyb290U2NvcGUuJHRoZW1lO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5lcnJvciA9IHBhcmFtcy5lcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2FuY2VsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwRXJyb3JEZXRhaWxzRGlhbG9nJylcclxuICAgIC5jb250cm9sbGVyKCdwaXBFcnJvckRldGFpbHNEaWFsb2dDb250cm9sbGVyJywgRXJyb3JEZXRhaWxzRGlhbG9nQ29udHJvbGxlcik7IiwiXHJcbmNsYXNzIEVycm9yRGV0YWlsc1NlcnZpY2Uge1xyXG4gICAgcHVibGljIF9tZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZTtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigkbWREaWFsb2c6IGFuZ3VsYXIubWF0ZXJpYWwuSURpYWxvZ1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9tZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93KHBhcmFtcywgc3VjY2Vzc0NhbGxiYWNrLCBjYW5jZWxDYWxsYmFjaykge1xyXG4gICAgICAgICB0aGlzLl9tZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IHBhcmFtcy5ldmVudCxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdlcnJvcl9kZXRhaWxzL0Vycm9yRGV0YWlscy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcEVycm9yRGV0YWlsc0RpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGxvY2Fsczoge3BhcmFtczogcGFyYW1zfSxcclxuICAgICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3NDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYW5jZWxDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwRXJyb3JEZXRhaWxzRGlhbG9nJylcclxuICAgIC5zZXJ2aWNlKCdwaXBFcnJvckRldGFpbHNEaWFsb2cnLCBFcnJvckRldGFpbHNTZXJ2aWNlKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBFcnJvckRldGFpbHNEaWFsb2cnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLCBcclxuICAgICAgICAncGlwRGlhbG9ncy5UcmFuc2xhdGUnLFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9FcnJvckRldGFpbHNTZXJ2aWNlJztcclxuaW1wb3J0ICcuL0Vycm9yRGV0YWlsc0NvbnRyb2xsZXInO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgSVdpbmRvd1NlcnZpY2UgPSBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uU3RyaW5ncyB7XHJcbiAgICBwdWJsaWMgb2s6IHN0cmluZyA9ICdPSyc7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZzsgXHJcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGVycm9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY29udGVudDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uUGFyYW1zIHtcclxuICAgIHB1YmxpYyBvazogc3RyaW5nID0gJ09LJztcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nOyBcclxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZXJyb3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBpdGVtO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW5mb3JtYXRpb25EaWFsb2dDb250cm9sbGVyIHtcclxuXHJcbiAgICBwdWJsaWMgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgcHVibGljIHRoZW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBJbmZvcm1hdGlvblN0cmluZ3M7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcixcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgXHJcbiAgICAgICAgcGFyYW1zOiBJbmZvcm1hdGlvblBhcmFtcykge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBJbmZvcm1hdGlvblN0cmluZ3MoKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBwYXJhbXMubWVzc2FnZSwgaXRlbTtcclxuXHJcbiAgICAgICAgbGV0IHBpcFRyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgICAgIGlmIChwaXBUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygnZW4nLCB7ICdJTkZPUk1BVElPTl9USVRMRSc6ICdJbmZvcm1hdGlvbid9KTtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygncnUnLCB7ICdJTkZPUk1BVElPTl9USVRMRSc6ICfQmNC90YTQvtGA0LzQsNGG0LjRjycgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCAnSU5GT1JNQVRJT05fVElUTEUnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vayA9IHBhcmFtcy5vayB8fCAnT0snO1xyXG4gICAgICAgICAgICBjb250ZW50ID0gcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZShjb250ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCAnSW5mb3JtYXRpb24nO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vayA9IHBhcmFtcy5vayB8fCAnT0snO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBpcEZvcm1hdCA9ICRpbmplY3Rvci5oYXMoJ3BpcEZvcm1hdCcpID8gJGluamVjdG9yLmdldCgncGlwRm9ybWF0JykgOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLml0ZW0gJiYgcGlwRm9ybWF0KSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBfLnRydW5jYXRlKHBhcmFtcy5pdGVtLCAyNSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBwaXBGb3JtYXQuc3ByaW50Zihjb250ZW50LCBpdGVtKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRlbnQyJywgY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlnLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cclxuICAgICAgICB0aGlzLiRtZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgICAgICB0aGlzLnRoZW1lID0gJHJvb3RTY29wZVsnJHRoZW1lJ107XHJcbiAgICAgICAgdGhpcy5jb25maWcuZXJyb3IgPSBwYXJhbXMuZXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNhbmNlbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEluZm9ybWF0aW9uRGlhbG9nJylcclxuICAgIC5jb250cm9sbGVyKCdwaXBJbmZvcm1hdGlvbkRpYWxvZ0NvbnRyb2xsZXInLCBJbmZvcm1hdGlvbkRpYWxvZ0NvbnRyb2xsZXIpOyIsImV4cG9ydCBpbnRlcmZhY2UgSUluZm9ybWF0aW9uU2VydmljZSB7XHJcbiAgICBzaG93KHBhcmFtcywgc3VjY2Vzc0NhbGxiYWNrPzogKCkgPT4gdm9pZCwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogYW55O1xyXG59XHJcblxyXG5jbGFzcyBJbmZvcm1hdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJSW5mb3JtYXRpb25TZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX21kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigkbWREaWFsb2c6IGFuZ3VsYXIubWF0ZXJpYWwuSURpYWxvZ1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9tZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbXMsIHN1Y2Nlc3NDYWxsYmFjaz86ICgpID0+IHZvaWQsIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgICB0aGlzLl9tZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IHBhcmFtcy5ldmVudCxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdpbmZvcm1hdGlvbi9JbmZvcm1hdGlvbkRpYWxvZy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcEluZm9ybWF0aW9uRGlhbG9nQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgbG9jYWxzOiB7IHBhcmFtczogcGFyYW1zfSxcclxuICAgICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3NDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEluZm9ybWF0aW9uRGlhbG9nJylcclxuICAgIC5zZXJ2aWNlKCdwaXBJbmZvcm1hdGlvbkRpYWxvZycsIEluZm9ybWF0aW9uU2VydmljZSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwSW5mb3JtYXRpb25EaWFsb2cnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRyYW5zbGF0ZScsIFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9JbmZvcm1hdGlvblNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vSW5mb3JtYXRpb25Db250cm9sbGVyJztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IElXaW5kb3dTZXJ2aWNlID0gYW5ndWxhci5JV2luZG93U2VydmljZTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zQmlnRGF0YSB7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3VidGl0bGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNCaWdQYXJhbXMge1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7ICBcclxuICAgIHB1YmxpYyBhcHBseUJ1dHRvblRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgb3B0aW9uczogT3B0aW9uc0JpZ0RhdGFbXTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbjogT3B0aW9uc0JpZ0RhdGE7XHJcbiAgICBwdWJsaWMgZGVsZXRlZDtcclxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbk5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBkZWxldGVkVGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBoaW50OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbm9UaXRsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG5vQWN0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG9wdGlvbkluZGV4OiBudW1iZXIgPSAwO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zQmlnRGlhbG9nQ29udHJvbGxlciB7XHJcbiAgICBvbk9rKCk6IHZvaWQ7XHJcbiAgICBvbkNhbmNlbCgpOiB2b2lkO1xyXG4gICAgb25LZXlVcChldmVudCwgaW5kZXgpOiB2b2lkO1xyXG4gICAgb25PcHRpb25TZWxlY3QoZXZlbnQsIG9wdGlvbik7XHJcbiAgICBvblNlbGVjdGVkKCk6IHZvaWQ7XHJcbiAgICBvblNlbGVjdDogRnVuY3Rpb247XHJcbiAgICBjb25maWc6IE9wdGlvbnNCaWdQYXJhbXM7XHJcbiAgICB0aGVtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9uc0JpZ0RpYWxvZ0NvbnRyb2xsZXIgaW1wbGVtZW50cyBJT3B0aW9uc0JpZ0RpYWxvZ0NvbnRyb2xsZXIge1xyXG5cclxuICAgIHByaXZhdGUgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgcHVibGljIHRoZW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBPcHRpb25zQmlnUGFyYW1zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRtZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZSxcclxuICAgICAgICAkaW5qZWN0b3IsIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBcclxuICAgICAgICBwYXJhbXM6IE9wdGlvbnNCaWdQYXJhbXMpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nID0gJG1kRGlhbG9nO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnNCaWdQYXJhbXMoKTtcclxuICAgICAgICB2YXIgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHsgJ09QVElPTlNfVElUTEUnOiAnQ2hvb3NlIE9wdGlvbid9KTtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygncnUnLCB7ICdPUFRJT05TX1RJVExFJzogJ9CS0YvQsdC10YDQuNGC0LUg0L7Qv9GG0LjRjid9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRpdGxlID0gcGFyYW1zLnRpdGxlIHx8ICdPUFRJT05TX1RJVExFJztcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBwbHlCdXR0b25UaXRsZSA9IHBhcmFtcy5hcHBseUJ1dHRvblRpdGxlIHx8ICdTRUxFQ1QnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRpdGxlID0gcGFyYW1zLnRpdGxlIHx8ICdDaG9vc2UgT3B0aW9uJztcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBwbHlCdXR0b25UaXRsZSA9IHBhcmFtcy5hcHBseUJ1dHRvblRpdGxlIHx8ICdTZWxlY3QnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aGVtZSA9ICRyb290U2NvcGVbJyR0aGVtZSddO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLm9wdGlvbnMgPSBwYXJhbXMub3B0aW9ucztcclxuICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbiA9IF8uZmluZChwYXJhbXMub3B0aW9ucywge2FjdGl2ZTogdHJ1ZX0pIHx8IG5ldyBPcHRpb25zQmlnRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdGVkT3B0aW9uTmFtZSA9IHRoaXMuY29uZmlnLnNlbGVjdGVkT3B0aW9uLm5hbWU7XHJcbiAgICAgICAgdGhpcy5jb25maWcuZGVsZXRlZCA9IHBhcmFtcy5kZWxldGVkO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmRlbGV0ZWRUaXRsZSA9IHBhcmFtcy5kZWxldGVkVGl0bGU7XHJcbiAgICAgICAgdGhpcy5jb25maWcubm9BY3Rpb25zID0gcGFyYW1zLm5vQWN0aW9ucyB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5ub1RpdGxlID0gcGFyYW1zLm5vVGl0bGUgfHwgZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25maWcuaGludCA9IHBhcmFtcy5oaW50IHx8ICcnO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZm9jdXNJbnB1dCwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2FuY2VsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk9wdGlvblNlbGVjdChldmVudCwgb3B0aW9uKSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0ZWRPcHRpb25OYW1lID0gb3B0aW9uLm5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5ub0FjdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3RlZCgpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbk5hbWUgPSB0aGlzLmNvbmZpZy5vcHRpb25zW3RoaXMuY29uZmlnLm9wdGlvbkluZGV4XS5uYW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcubm9BY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uS2V5VXAoZXZlbnQsIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyIHx8IGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCAmJiBpbmRleCA+IC0xICYmIGluZGV4IDwgdGhpcy5jb25maWcub3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdGVkT3B0aW9uTmFtZSA9IHRoaXMuY29uZmlnLm9wdGlvbnNbaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBvblNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgb3B0aW9uO1xyXG4gICAgICAgIG9wdGlvbiA9IF8uZmluZCh0aGlzLmNvbmZpZy5vcHRpb25zLCB7bmFtZTogdGhpcy5jb25maWcuc2VsZWN0ZWRPcHRpb25OYW1lfSkgfHwgbmV3IE9wdGlvbnNCaWdEYXRhKCk7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSh7b3B0aW9uOiBvcHRpb24sIGRlbGV0ZWQ6IHRoaXMuY29uZmlnLmRlbGV0ZWR9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHByaXZhdGUgZm9jdXNJbnB1dCgpIHtcclxuICAgICAgICBsZXQgbGlzdDtcclxuICAgICAgICBsaXN0ID0gJCgnLnBpcC1vcHRpb25zLWRpYWxvZyAucGlwLWxpc3QnKTtcclxuICAgICAgICBsaXN0LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBPcHRpb25zQmlnRGlhbG9nJylcclxuICAgIC5jb250cm9sbGVyKCdwaXBPcHRpb25zQmlnRGlhbG9nQ29udHJvbGxlcicsIE9wdGlvbnNCaWdEaWFsb2dDb250cm9sbGVyKTsiLCJleHBvcnQgaW50ZXJmYWNlIElPcHRpb25zQmlnU2VydmljZSB7XHJcbiAgICBzaG93KHBhcmFtcywgc3VjY2Vzc0NhbGxiYWNrPzogKG9wdGlvbikgPT4gdm9pZCwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogYW55O1xyXG59XHJcblxyXG5jbGFzcyBPcHRpb25zQmlnU2VydmljZSBpbXBsZW1lbnRzIElPcHRpb25zQmlnU2VydmljZSB7XHJcbiAgICBwdWJsaWMgX21kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgY29uc3RydWN0b3IoJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbXMsIHN1Y2Nlc3NDYWxsYmFjaz86IChvcHRpb24pID0+IHZvaWQsIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCk6IGFueSB7XHJcbiAgICAgICAgIHRoaXMuX21kRGlhbG9nLnNob3coe1xyXG4gICAgICAgICAgICB0YXJnZXRFdmVudDogcGFyYW1zLmV2ZW50LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ29wdGlvbnMvT3B0aW9uc0JpZ0RpYWxvZy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcE9wdGlvbnNCaWdEaWFsb2dDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBsb2NhbHM6IHtwYXJhbXM6IHBhcmFtc30sXHJcbiAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWVcclxuICAgICAgICAgfSlcclxuICAgICAgICAudGhlbigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayhvcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FuY2VsQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBPcHRpb25zQmlnRGlhbG9nJylcclxuICAgIC5zZXJ2aWNlKCdwaXBPcHRpb25zQmlnRGlhbG9nJywgT3B0aW9uc0JpZ1NlcnZpY2UpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBJV2luZG93U2VydmljZSA9IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2U7XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9uc0RhdGEge1xyXG4gICAgcHVibGljIGljb246IHN0cmluZyA9ICdzdGFyJztcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBhY3RpdmU6IGJvb2xlYW4gPSB0cnVlOyBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNQYXJhbXMge1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7ICBcclxuICAgIHB1YmxpYyBhcHBseUJ1dHRvblRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgb3B0aW9uczogT3B0aW9uc0RhdGFbXTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbjogT3B0aW9uc0RhdGE7XHJcbiAgICBwdWJsaWMgZGVsZXRlZDtcclxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbk5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBkZWxldGVkVGl0bGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNEaWFsb2dDb250cm9sbGVyIHtcclxuXHJcbiAgICBwdWJsaWMgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgcHVibGljIHRoZW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBPcHRpb25zUGFyYW1zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRtZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZSxcclxuICAgICAgICAkaW5qZWN0b3IsIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBcclxuICAgICAgICBwYXJhbXM6IE9wdGlvbnNQYXJhbXMpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nID0gJG1kRGlhbG9nO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnNQYXJhbXMoKTtcclxuICAgICAgICB2YXIgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHsgJ09QVElPTlNfVElUTEUnOiAnQ2hvb3NlIE9wdGlvbid9KTtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygncnUnLCB7ICdPUFRJT05TX1RJVExFJzogJ9CS0YvQsdC10YDQuNGC0LUg0L7Qv9GG0LjRjid9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRpdGxlID0gcGFyYW1zLnRpdGxlIHx8ICdPUFRJT05TX1RJVExFJztcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBwbHlCdXR0b25UaXRsZSA9IHBhcmFtcy5hcHBseUJ1dHRvblRpdGxlIHx8ICdTRUxFQ1QnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRpdGxlID0gcGFyYW1zLnRpdGxlIHx8ICdDaG9vc2UgT3B0aW9uJztcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBwbHlCdXR0b25UaXRsZSA9IHBhcmFtcy5hcHBseUJ1dHRvblRpdGxlIHx8ICdTZWxlY3QnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aGVtZSA9ICRyb290U2NvcGVbJyR0aGVtZSddO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLm9wdGlvbnMgPSBwYXJhbXMub3B0aW9ucztcclxuICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbiA9IF8uZmluZChwYXJhbXMub3B0aW9ucywge2FjdGl2ZTogdHJ1ZX0pIHx8IG5ldyBPcHRpb25zRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdGVkT3B0aW9uTmFtZSA9IHRoaXMuY29uZmlnLnNlbGVjdGVkT3B0aW9uLm5hbWU7XHJcbiAgICAgICAgdGhpcy5jb25maWcuZGVsZXRlZCA9IHBhcmFtcy5kZWxldGVkO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmRlbGV0ZWRUaXRsZSA9IHBhcmFtcy5kZWxldGVkVGl0bGU7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5mb2N1c0lucHV0LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk9rKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DYW5jZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT3B0aW9uU2VsZWN0KGV2ZW50LCBvcHRpb246IE9wdGlvbnNEYXRhKSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0ZWRPcHRpb25OYW1lID0gb3B0aW9uLm5hbWU7XHJcblxyXG4gICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIHB1YmxpYyBvbktleVByZXNzIChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3QoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbjogT3B0aW9uc0RhdGE7XHJcbiAgICAgICAgb3B0aW9uID0gXy5maW5kKHRoaXMuY29uZmlnLm9wdGlvbnMsIHtuYW1lOiB0aGlzLmNvbmZpZy5zZWxlY3RlZE9wdGlvbk5hbWV9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhvcHRpb24pO1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmhpZGUoe29wdGlvbjogb3B0aW9uLCBkZWxldGVkOiB0aGlzLmNvbmZpZy5kZWxldGVkfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb2N1c0lucHV0KCkge1xyXG4gICAgICAgIGxldCBsaXN0O1xyXG4gICAgICAgIGxpc3QgPSAkKCcucGlwLW9wdGlvbnMtZGlhbG9nIC5waXAtbGlzdCcpO1xyXG4gICAgICAgIGxpc3QuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE9wdGlvbnNEaWFsb2cnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3BpcE9wdGlvbnNEaWFsb2dDb250cm9sbGVyJywgT3B0aW9uc0RpYWxvZ0NvbnRyb2xsZXIpOyIsIlxyXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zU2VydmljZSB7XHJcbiAgICBzaG93KHBhcmFtcywgc3VjY2Vzc0NhbGxiYWNrPzogKG9wdGlvbikgPT4gdm9pZCwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogYW55O1xyXG59XHJcblxyXG5jbGFzcyBPcHRpb25zU2VydmljZSBpbXBsZW1lbnRzIElPcHRpb25zU2VydmljZSB7XHJcbiAgICBwdWJsaWMgX21kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCRtZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX21kRGlhbG9nID0gJG1kRGlhbG9nO1xyXG4gICAgfVxyXG4gICAgcHVibGljICBzaG93KHBhcmFtcywgc3VjY2Vzc0NhbGxiYWNrPzogKG9wdGlvbikgPT4gdm9pZCwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogYW55IHtcclxuICAgICAgICAgdGhpcy5fbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiBwYXJhbXMuZXZlbnQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnb3B0aW9ucy9PcHRpb25zRGlhbG9nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncGlwT3B0aW9uc0RpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGxvY2Fsczoge3BhcmFtczogcGFyYW1zfSxcclxuICAgICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3NDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKG9wdGlvbi5vcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FuY2VsQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE9wdGlvbnNEaWFsb2cnKVxyXG4gICAgLnNlcnZpY2UoJ3BpcE9wdGlvbnNEaWFsb2cnLCBPcHRpb25zU2VydmljZSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwT3B0aW9uc0RpYWxvZycsIFtcclxuICAgICAgICAnbmdNYXRlcmlhbCcsIFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRyYW5zbGF0ZScsXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL09wdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0ICcuL09wdGlvbnNDb250cm9sbGVyJztcclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBPcHRpb25zQmlnRGlhbG9nJywgW1xyXG4gICAgICAgICduZ01hdGVyaWFsJywgXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVHJhbnNsYXRlJyxcclxuICAgICAgICAncGlwRGlhbG9ncy5UZW1wbGF0ZXMnXSk7XHJcbiAgICAgICAgXHJcbmltcG9ydCAnLi9PcHRpb25zQmlnU2VydmljZSc7XHJcbmltcG9ydCAnLi9PcHRpb25zQmlnQ29udHJvbGxlcic7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvbkRpYWxvZy5odG1sJyxcbiAgICAnPG1kLWRpYWxvZyBjbGFzcz1cInBpcC1kaWFsb2cgcGlwLWNvbmZpcm1hdGlvbi1kaWFsb2cgbGF5b3V0LWNvbHVtblwiIHdpZHRoPVwiNDAwXCIgbWQtdGhlbWU9XCJ7ezo6dm0udGhlbWV9fVwiPjxkaXYgY2xhc3M9XCJwaXAtaGVhZGVyXCI+PGgzPnt7Ojogdm0uY29uZmlnLnRpdGxlfX08L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZm9vdGVyXCI+PGRpdj48bWQtYnV0dG9uIG5nLWNsaWNrPVwidm0ub25DYW5jZWwoKVwiPnt7Ojogdm0uY29uZmlnLmNhbmNlbH19PC9tZC1idXR0b24+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWFjY2VudFwiIG5nLWNsaWNrPVwidm0ub25PaygpXCI+e3s6OiB2bS5jb25maWcub2t9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjwvbWQtZGlhbG9nPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZXJyb3JfZGV0YWlscy9FcnJvckRldGFpbHMuaHRtbCcsXG4gICAgJzxtZC1kaWFsb2cgY2xhc3M9XCJwaXAtZGlhbG9nIHBpcC1lcnJvci1kZXRhaWxzLWRpYWxvZyBsYXlvdXQtY29sdW1uXCIgd2lkdGg9XCI0MDBcIiBtZC10aGVtZT1cInt7dm0udGhlbWV9fVwiPjxkaXYgY2xhc3M9XCJwaXAtYm9keVwiPjxkaXYgY2xhc3M9XCJwaXAtaGVhZGVyXCI+PGgzPnt7Ojp2bS5jb25maWcuZXJyb3JEZXRhaWxzIHwgdHJhbnNsYXRlfX08L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgZXJyb3Itc2VjdGlvbiB0ZXh0LWJvZHkyIGNvbG9yLXNlY29uZGFyeS10ZXh0XCIgbmctaWY9XCJ2bS5jb25maWcuZXJyb3IuY29kZSB8fCAodm0uY29uZmlnLmVycm9yLmRhdGEgJiYgZXJyb3IuZGF0YS5jb2RlKVwiPnt7Ojp2bS5jb25maWcuZXJyb3JDb2RlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5jb2RlIHx8ICh2bS5jb25maWcuZXJyb3IuZGF0YSAmJiB2bS5jb25maWcuZXJyb3IuZGF0YS5jb2RlKVwiPnt7dm0uY29uZmlnLmVycm9yLmNvZGUgfHwgdm0uY29uZmlnLmVycm9yLmRhdGEuY29kZX19PC9kaXY+PGRpdiBjbGFzcz1cImxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlciBlcnJvci1zZWN0aW9uIHRleHQtYm9keTIgY29sb3Itc2Vjb25kYXJ5LXRleHRcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5wYXRoIHx8ICh2bS5jb25maWcuZXJyb3IuZGF0YSAmJiB2bS5jb25maWcuZXJyb3IuZGF0YS5wYXRoKVwiPnt7Ojp2bS5jb25maWcuZXJyb3JQYXRoIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5wYXRoIHx8ICh2bS5jb25maWcuZXJyb3IuZGF0YSAmJiB2bS5jb25maWcuZXJyb3IuZGF0YS5wYXRoKVwiPnt7dm0uY29uZmlnLmVycm9yLnBhdGggfHwgdm0uY29uZmlnLmVycm9yLmRhdGEucGF0aH19PC9kaXY+PGRpdiBjbGFzcz1cImVycm9yLXNlY3Rpb24gdGV4dC1ib2R5MiBjb2xvci1zZWNvbmRhcnktdGV4dCBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5lcnJvciB8fCAodm0uY29uZmlnLmVycm9yLmRhdGEgJiYgdm0uY29uZmlnLmVycm9yLmRhdGEuZXJyb3IpXCI+e3s6OnZtLmNvbmZpZy5lcnJvclRleHQgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgdGV4dC1zdWJoZWFkMVwiIG5nLWlmPVwidm0uY29uZmlnLmVycm9yLmVycm9yIHx8ICh2bS5jb25maWcuZXJyb3IuZGF0YSAmJiB2bS5jb25maWcuZXJyb3IuZGF0YS5lcnJvcilcIj57e3ZtLmNvbmZpZy5lcnJvci5lcnJvciB8fCB2bS5jb25maWcuZXJyb3IuZGF0YS5lcnJvcn19PC9kaXY+PGRpdiBjbGFzcz1cImVycm9yLXNlY3Rpb24gdGV4dC1ib2R5MiBjb2xvci1zZWNvbmRhcnktdGV4dCBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5tZXRob2QgfHwgKHZtLmNvbmZpZy5lcnJvci5kYXRhICYmIHZtLmNvbmZpZy5lcnJvci5kYXRhLm1ldGhvZClcIj57ezo6dm0uY29uZmlnLmVycm9yTWV0aG9kIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cInZtLmNvbmZpZy5lcnJvci5tZXRob2QgfHwgKHZtLmNvbmZpZy5lcnJvci5kYXRhICYmIHZtLmNvbmZpZy5lcnJvci5kYXRhLm1ldGhvZClcIj57e3ZtLmNvbmZpZy5lcnJvci5tZXRob2QgfHwgdm0uY29uZmlnLmVycm9yLmRhdGEubWV0aG9kfX08L2Rpdj48ZGl2IGNsYXNzPVwiZXJyb3Itc2VjdGlvbiB0ZXh0LWJvZHkyIGNvbG9yLXNlY29uZGFyeS10ZXh0IGxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlclwiIG5nLWlmPVwidm0uY29uZmlnLmVycm9yLm1lc3NhZ2UgfHwgKHZtLmNvbmZpZy5lcnJvci5kYXRhICYmIHZtLmNvbmZpZy5lcnJvci5kYXRhLm1lc3NhZ2UpXCI+e3s6OnZtLmNvbmZpZy5lcnJvck1lc3NhZ2UgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgdGV4dC1zdWJoZWFkMVwiIG5nLWlmPVwidm0uY29uZmlnLmVycm9yLm1lc3NhZ2UgfHwgKHZtLmNvbmZpZy5lcnJvci5kYXRhICYmIHZtLmNvbmZpZy5lcnJvci5kYXRhLm1lc3NhZ2UpXCI+e3t2bS5jb25maWcuZXJyb3IubWVzc2FnZSB8fCB2bS5jb25maWcuZXJyb3IuZGF0YS5tZXNzYWdlfX08L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWZvb3RlclwiPjxkaXY+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWFjY2VudCBtMFwiIG5nLWNsaWNrPVwidm0ub25PaygpXCI+e3s6OnZtLmNvbmZpZy5kaXNtaXNzQnV0dG9uIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48L21kLWRpYWxvZz4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2luZm9ybWF0aW9uL0luZm9ybWF0aW9uRGlhbG9nLmh0bWwnLFxuICAgICc8bWQtZGlhbG9nIGNsYXNzPVwicGlwLWRpYWxvZyBwaXAtaW5mb3JtYXRpb24tZGlhbG9nIGxheW91dC1jb2x1bW5cIiB3aWR0aD1cIjQwMFwiIG1kLXRoZW1lPVwie3t2bS50aGVtZX19XCI+PGRpdiBjbGFzcz1cInBpcC1oZWFkZXJcIj48aDM+e3s6OiB2bS5jb25maWcudGl0bGUgfCB0cmFuc2xhdGUgfX08L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtYm9keVwiPjxkaXYgY2xhc3M9XCJwaXAtY29udGVudFwiPnt7IHZtLmNvbmZpZy5jb250ZW50IH19PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1mb290ZXJcIj48ZGl2PjxtZC1idXR0b24gY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cInZtLm9uT2soKVwiPnt7IHZtLmNvbmZpZy5vayB8IHRyYW5zbGF0ZSB9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjwvbWQtZGlhbG9nPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnb3B0aW9ucy9PcHRpb25zQmlnRGlhbG9nLmh0bWwnLFxuICAgICc8bWQtZGlhbG9nIGNsYXNzPVwicGlwLWRpYWxvZyBwaXAtb3B0aW9ucy1kaWFsb2ctYmlnIGxheW91dC1jb2x1bW5cIiBtaW4td2lkdGg9XCI0MDBcIiBtZC10aGVtZT1cInt7dm0udGhlbWV9fVwiPjxtZC1kaWFsb2ctY29udGVudCBjbGFzcz1cInBpcC1ib2R5IHBpcC1zY3JvbGxcIiBuZy1jbGFzcz1cIntcXCdicDI0XFwnOiAhdm0uY29uZmlnLm5vQWN0aW9uc31cIj48ZGl2IGNsYXNzPVwicGlwLWhlYWRlclwiIG5nLWNsYXNzPVwie1xcJ2hlYWRlci1oaW50XFwnOiB2bS5jb25maWcubm9UaXRsZSAmJiB2bS5jb25maWcuaGludH1cIj48aDMgY2xhc3M9XCJtMFwiIG5nLWlmPVwiIXZtLmNvbmZpZy5ub1RpdGxlXCI+e3s6OnZtLmNvbmZpZy50aXRsZSB8IHRyYW5zbGF0ZX19PC9oMz48ZGl2IG5nLXNob3c9XCJ2bS5jb25maWcubm9UaXRsZSAmJiB2bS5jb25maWcuaGludFwiIGNsYXNzPVwiZGlhbG9nLWhpbnQgbGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyXCI+PGRpdiBjbGFzcz1cImhpbnQtaWNvbi1jb250YWluZXIgZmxleC1maXhlZFwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6aW5mby1jaXJjbGUtb3V0bGluZVwiPjwvbWQtaWNvbj48L2Rpdj48ZGl2Pnt7Ojp2bS5jb25maWcuaGludCB8IHRyYW5zbGF0ZX19PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImNvbnRlbnQtZGl2aWRlclwiIG5nLWlmPVwiIW5vVGl0bGVcIj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWNvbnRlbnRcIj48ZGl2IGNsYXNzPVwic3BhY2VyOFwiIG5nLWlmPVwibm9UaXRsZSAmJiBoaW50XCI+PC9kaXY+PG1kLWxpc3QgY2xhc3M9XCJwaXAtbWVudSBwaXAtcmVmLWxpc3RcIiBwaXAtc2VsZWN0ZWQ9XCJ2bS5jb25maWcub3B0aW9uSW5kZXhcIiBpbmRleD1cInt7dm0uY29uZmlnLm9wdGlvbkluZGV4IH19XCIgcGlwLXNlbGVjdD1cInZtLm9uU2VsZWN0ZWQoJGV2ZW50KVwiPjxtZC1saXN0LWl0ZW0gY2xhc3M9XCJwaXAtcmVmLWxpc3QtaXRlbSBwaXAtc2VsZWN0YWJsZSBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIiBuZy1jbGFzcz1cIntcXCdzZWxlY3RlZCBtZC1mb2N1c2VkXFwnIDogb3B0aW9uLm5hbWUgPT0gc2VsZWN0ZWRPcHRpb25OYW1lLCBcXCdkaXZpZGVyLWJvdHRvbVxcJzogJGluZGV4ICE9IG9wdGlvbnMubGVuZ3RoIC0gMX1cIiBtZC1pbmstcmlwcGxlPVwiXCIgbmcta2V5dXA9XCJ2bS5vbktleVVwKCRldmVudCwgJGluZGV4KVwiIG5nLXJlcGVhdD1cIm9wdGlvbiBpbiB2bS5jb25maWcub3B0aW9uc1wiPjxkaXYgY2xhc3M9XCJwaXAtY29udGVudCBjb250ZW50LXN0cmV0Y2hcIiBuZy1jbGljaz1cInZtLm9uT3B0aW9uU2VsZWN0KCRldmVudCwgb3B0aW9uKVwiPjxwIGNsYXNzPVwicGlwLXRpdGxlIHNwYWNlci1yaWdodFwiIG5nLWlmPVwib3B0aW9uLnRpdGxlXCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiA0cHggIWltcG9ydGFudDtcIj57ezo6b3B0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L3A+PGRpdiBjbGFzcz1cInBpcC1zdWJ0aXRsZSBzcGFjZXItcmlnaHRcIiBzdHlsZT1cImhlaWdodDogaW5oZXJpdFwiIG5nLWlmPVwib3B0aW9uLnN1YnRpdGxlXCI+e3s6Om9wdGlvbi5zdWJ0aXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdWJ0aXRsZSBzcGFjZXItcmlnaHRcIiBzdHlsZT1cImhlaWdodDogaW5oZXJpdFwiIG5nLWlmPVwib3B0aW9uLnRleHRcIiBuZy1iaW5kLWh0bWw9XCJvcHRpb24udGV4dCB8IHRyYW5zbGF0ZVwiPjwvZGl2PjwvZGl2PjwvbWQtbGlzdC1pdGVtPjwvbWQtbGlzdD48L2Rpdj48ZGl2IGNsYXNzPVwic3BhY2VyOFwiIG5nLWlmPVwidm0uY29uZmlnLm5vQWN0aW9uc1wiPjwvZGl2PjwvbWQtZGlhbG9nLWNvbnRlbnQ+PGRpdiBjbGFzcz1cInBpcC1mb290ZXJcIiBuZy1pZj1cIiF2bS5jb25maWcubm9BY3Rpb25zXCI+PGRpdj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLWNhbmNlbFwiIG5nLWNsaWNrPVwidm0ub25DYW5jZWwoKVwiPnt7OjpcXCdDQU5DRUxcXCcgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjxtZC1idXR0b24gY2xhc3M9XCJwaXAtc3VibWl0IG1kLWFjY2VudFwiIG5nLWNsaWNrPVwidm0ub25TZWxlY3QoKVwiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAtNnB4XCI+e3s6OnZtLmNvbmZpZy5hcHBseUJ1dHRvblRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48L21kLWRpYWxvZz4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ29wdGlvbnMvT3B0aW9uc0RpYWxvZy5odG1sJyxcbiAgICAnPG1kLWRpYWxvZyBjbGFzcz1cInBpcC1kaWFsb2cgcGlwLW9wdGlvbnMtZGlhbG9nIGxheW91dC1jb2x1bW5cIiBtaW4td2lkdGg9XCI0MDBcIiBtZC10aGVtZT1cInt7dm0udGhlbWV9fVwiPjxtZC1kaWFsb2ctY29udGVudCBjbGFzcz1cInBpcC1ib2R5IGxwMCB0cDAgcnAwIGJwMjQgcGlwLXNjcm9sbFwiPjxkaXYgY2xhc3M9XCJwaXAtaGVhZGVyXCI+PGgzPnt7Ojp2bS5jb25maWcudGl0bGUgfCB0cmFuc2xhdGV9fTwvaDM+PGRpdiBuZy1zaG93PVwidm0uY29uZmlnLmRlbGV0ZWRUaXRsZVwiIGNsYXNzPVwiaGVhZGVyLW9wdGlvbiB0ZXh0LXN1YmhlYWQxIGRpdmlkZXItYm90dG9tXCI+PG1kLWNoZWNrYm94IG5nLW1vZGVsPVwiZGVsZXRlZFwiIGFyaWEtbGFiZWw9XCJDSEVDS0JPWFwiPnt7Ojp2bS5jb25maWcuZGVsZXRlZFRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWNoZWNrYm94PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtY29udGVudFwiPjxtZC1yYWRpby1ncm91cCBuZy1tb2RlbD1cInZtLnNlbGVjdGVkT3B0aW9uTmFtZVwiIGNsYXNzPVwicGlwLWxpc3QgbWQtcHJpbWFyeVwiIG1kLW5vLWluaz1cInRydWVcIiBuZy1rZXlwcmVzcz1cInZtLm9uS2V5UHJlc3MoJGV2ZW50KVwiIHRhYmluZGV4PVwiMFwiPjxkaXYgbmctcmVwZWF0PVwib3B0aW9uIGluIHZtLmNvbmZpZy5vcHRpb25zXCIgY2xhc3M9XCJwaXAtbGlzdC1pdGVtXCIgbWQtaW5rLXJpcHBsZT1cIlwiIHVpLWV2ZW50PVwieyBjbGljazogXFwndm0ub25PcHRpb25TZWxlY3QoJGV2ZW50LCBvcHRpb24pXFwnIH1cIiBuZy1jbGFzcz1cInsgc2VsZWN0ZWQ6IG9wdGlvbi5uYW1lID09IHZtLmNvbmZpZy5zZWxlY3RlZE9wdGlvbk5hbWUgfVwiPjxkaXYgY2xhc3M9XCJwaXAtbGlzdC1pdGVtIGl0ZW0tcGFkZGluZ1wiPjxtZC1pY29uIGNsYXNzPVwicGlwLW9wdGlvbi1pY29uXCIgbWQtc3ZnLWljb249XCJpY29uczp7e29wdGlvbi5pY29ufX1cIiBuZy1pZj1cIm9wdGlvbi5pY29uXCI+PC9tZC1pY29uPjxkaXYgY2xhc3M9XCJwaXAtb3B0aW9uLXRpdGxlXCI+e3s6Om9wdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PG1kLXJhZGlvLWJ1dHRvbiBuZy12YWx1ZT1cIm9wdGlvbi5uYW1lXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtbGFiZWw9XCJ7ezo6b3B0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX1cIj48L21kLXJhZGlvLWJ1dHRvbj48L2Rpdj48L2Rpdj48L21kLXJhZGlvLWdyb3VwPjwvZGl2PjwvbWQtZGlhbG9nLWNvbnRlbnQ+PGRpdiBjbGFzcz1cInBpcC1mb290ZXJcIj48ZGl2PjxtZC1idXR0b24gY2xhc3M9XCJwaXAtY2FuY2VsXCIgbmctY2xpY2s9XCJ2bS5vbkNhbmNlbCgpXCI+e3s6OlxcJ0NBTkNFTFxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1zdWJtaXQgbWQtYWNjZW50XCIgbmctY2xpY2s9XCJ2bS5vblNlbGVjdCgpXCI+e3s6OnZtLmNvbmZpZy5hcHBseUJ1dHRvblRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48L21kLWRpYWxvZz4nKTtcbn1dKTtcbn0pKCk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcC13ZWJ1aS1kaWFsb2dzLWh0bWwubWluLmpzLm1hcFxuIl19