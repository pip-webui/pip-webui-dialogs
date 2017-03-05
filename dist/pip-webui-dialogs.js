(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).dialogs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
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
        var pipTranslate;
        pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'CONFIRM_TITLE': 'Confirm' });
            pipTranslate.translations('ru', { 'CONFIRM_TITLE': 'Подтвердите' });
            this.config.title = pipTranslate.translate(params.title) || pipTranslate.translate('CONFIRM_TITLE');
            this.config.ok = pipTranslate.translate(params.ok) || pipTranslate.translate('OK');
            this.config.cancel = pipTranslate.translate(params.cancel) || ('CANCEL');
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
                'OK': 'Ok',
                'CANCEL': 'Cancel',
                'ERROR_DETAILS': 'Error details',
                'CODE': 'Error code',
                'PATH': 'Path',
                'ERROR': 'Error',
                'METHOD': 'Method',
                'MESSAGE': 'Message',
                'DISMISS': 'Dismiss'
            });
            pipTranslate.translations('ru', {
                'OK': 'Ок',
                'CANCEL': 'Отмена',
                'ERROR_DETAILS': 'Детали ошибки',
                'CODE': 'Код ошибки',
                'PATH': 'Путь',
                'ERROR': 'Ошибка',
                'METHOD': 'Метод',
                'MESSAGE': 'Сообщение'
            });
            this.config.ok = pipTranslate.translate(params.ok) || pipTranslate.translate('OK');
            this.config.cancel = pipTranslate.translate(params.cancel) || pipTranslate.translate('CANCEL');
            this.config.errorDetails = pipTranslate.translate('ERROR_DETAILS');
            this.config.dismissButton = pipTranslate.translate('DISMISS');
            this.config.errorMessage = pipTranslate.translate('MESSAGE');
            this.config.errorCode = pipTranslate.translate('CODE');
            this.config.errorMethod = pipTranslate.translate('METHOD');
            this.config.errorPath = pipTranslate.translate('PATH');
            this.config.errorText = pipTranslate.translate('ERROR');
        }
        else {
            this.config.ok = params.ok || 'Ok';
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
            this.config.title = pipTranslate.translate(params.title) || pipTranslate.translate('INFORMATION_TITLE');
            this.config.ok = pipTranslate.translate(params.ok) || pipTranslate.translate('OK');
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
            this.config.title = pipTranslate.translate(params.title) || pipTranslate.translate('OPTIONS_TITLE');
            this.config.applyButtonTitle = pipTranslate.translate(params.applyButtonTitle) || pipTranslate.translate('SELECT');
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
        console.log('params', params);
        this.$mdDialog = $mdDialog;
        this.config = new OptionsParams();
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option' });
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию' });
            this.config.title = pipTranslate.translate(params.title) || pipTranslate.translate('OPTIONS_TITLE');
            this.config.applyButtonTitle = pipTranslate.translate(params.applyButtonTitle) || pipTranslate.translate('SELECT');
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
        console.log('onOptionSelect', event, option);
    };
    OptionsDialogController.prototype.onKeyPress = function (event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            this.onSelect();
        }
    };
    OptionsDialogController.prototype.onSelect = function () {
        console.log('onSelect');
        var option;
        option = _.find(this.config.options, { name: this.config.selectedOptionName });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
    '<!--\n' +
    '@file Confirmation dialog template\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-confirmation-dialog layout-column" width="400" md-theme="{{::vm.theme}}">\n' +
    '    <div class="pip-header">\n' +
    '        <h3>{{:: vm.config.title}}</h3>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button ng-click="vm.onCancel()">{{:: vm.config.cancel}}</md-button>\n' +
    '            <md-button class="md-accent" ng-click="vm.onOk()">{{:: vm.config.ok}}</md-button>\n' +
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
  $templateCache.put('error_details/ErrorDetails.html',
    '<!--\n' +
    '@file Confirmation dialog template\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-error-details-dialog layout-column" width="400" md-theme="{{vm.theme}}">\n' +
    '    <div class="pip-body">\n' +
    '        <div class="pip-header">\n' +
    '            <h3>{{::vm.config.errorDetails | translate}}</h3>\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text"\n' +
    '             ng-if="vm.config.error.code || (vm.config.error.data && error.data.code)">\n' +
    '            {{::vm.config.errorCode | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.code || (vm.config.error.data && vm.config.error.data.code)">\n' +
    '            {{vm.config.error.code || vm.config.error.data.code}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text"\n' +
    '             ng-if="vm.config.error.path || (vm.config.error.data && vm.config.error.data.path)">\n' +
    '            {{::vm.config.errorPath | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.path || (vm.config.error.data && vm.config.error.data.path)">\n' +
    '            {{vm.config.error.path || vm.config.error.data.path}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="vm.config.error.error || (vm.config.error.data && vm.config.error.data.error)">\n' +
    '            {{::vm.config.errorText | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.error || (vm.config.error.data && vm.config.error.data.error)">\n' +
    '            {{vm.config.error.error || vm.config.error.data.error}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="vm.config.error.method || (vm.config.error.data && vm.config.error.data.method)">\n' +
    '            {{::vm.config.errorMethod | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.method || (vm.config.error.data && vm.config.error.data.method)">\n' +
    '            {{vm.config.error.method || vm.config.error.data.method}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="vm.config.error.message || (vm.config.error.data && vm.config.error.data.message)">\n' +
    '            {{::vm.config.errorMessage | translate}}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1"\n' +
    '             ng-if="vm.config.error.message || (vm.config.error.data && vm.config.error.data.message)">\n' +
    '            {{vm.config.error.message || vm.config.error.data.message}}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="md-accent m0" ng-click="vm.onOk()">{{::vm.config.dismissButton | translate}}</md-button>\n' +
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
  $templateCache.put('options/OptionsBigDialog.html',
    '<!--\n' +
    '@file Options dialog content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-options-dialog-big layout-column"\n' +
    '           min-width="400" md-theme="{{vm.theme}}">\n' +
    '    <md-dialog-content class="pip-body pip-scroll" ng-class="{\'bp24\': !vm.config.noActions}">\n' +
    '        <div class="pip-header" ng-class="{\'header-hint\': vm.config.noTitle && vm.config.hint}">\n' +
    '            <h3 class="m0" ng-if="!vm.config.noTitle">\n' +
    '                {{::vm.config.title | translate}}\n' +
    '            </h3>\n' +
    '            <div ng-show="vm.config.noTitle && vm.config.hint" \n' +
    '                 class="dialog-hint layout-row layout-align-start-center">\n' +
    '                <div class="hint-icon-container flex-fixed" >\n' +
    '                    <md-icon md-svg-icon="icons:info-circle-outline"></md-icon>\n' +
    '                </div>\n' +
    '                <div>{{::vm.config.hint | translate}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="content-divider" ng-if="!noTitle"></div>\n' +
    '        <div class="pip-content">\n' +
    '            <div class="spacer8" ng-if="noTitle && hint"></div>\n' +
    '            <md-list class="pip-menu  pip-ref-list"\n' +
    '                     pip-selected="vm.config.optionIndex" index="{{vm.config.optionIndex }}"\n' +
    '                     pip-select="vm.onSelected($event)">\n' +
    '\n' +
    '                <md-list-item class="pip-ref-list-item pip-selectable layout-row layout-align-start-center"\n' +
    '                              ng-class="{\'selected md-focused\' : option.name == selectedOptionName,\n' +
    '                              \'divider-bottom\': $index != options.length - 1}"\n' +
    '                              md-ink-ripple\n' +
    '                              ng-keyup="vm.onKeyUp($event, $index)"\n' +
    '                              ng-repeat="option in vm.config.options" >\n' +
    '\n' +
    '                    <div class="pip-content  content-stretch" ng-click="vm.onOptionSelect($event, option)">\n' +
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
    '                             ng-bind-html="option.text | translate">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </md-list-item>\n' +
    '\n' +
    '            </md-list>\n' +
    '        </div>\n' +
    '        <div class="spacer8" ng-if="vm.config.noActions"></div>\n' +
    '    </md-dialog-content>\n' +
    '\n' +
    '    <div class="pip-footer" ng-if="!vm.config.noActions">\n' +
    '        <div>\n' +
    '            <md-button class="pip-cancel" ng-click="vm.onCancel()">{{::\'CANCEL\' | translate}}</md-button>\n' +
    '            <md-button class="pip-submit md-accent" ng-click="vm.onSelect()" style="margin-right: -6px">\n' +
    '                {{::vm.config.applyButtonTitle | translate}}\n' +
    '            </md-button>\n' +
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
  $templateCache.put('options/OptionsDialog.html',
    '<!--\n' +
    '@file Options dialog content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-options-dialog layout-column"\n' +
    '           min-width="400" md-theme="{{vm.theme}}">\n' +
    '    <md-dialog-content class="pip-body lp0 tp0 rp0 bp24 pip-scroll">\n' +
    '        <div class="pip-header" >\n' +
    '            <h3>{{::vm.config.title | translate}}</h3>\n' +
    '            <div ng-show="vm.config.deletedTitle" class="header-option text-subhead1 divider-bottom">\n' +
    '                <md-checkbox ng-model="deleted" aria-label="CHECKBOX">{{::vm.config.deletedTitle | translate}}</md-checkbox>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="pip-content">\n' +
    '            <md-radio-group ng-model="vm.config.selectedOptionName" class="pip-list md-primary" md-no-ink="true"\n' +
    '                            ng-keypress="vm.onKeyPress($event)" tabindex="0">\n' +
    '                <div ng-repeat="option in vm.config.options" class="pip-list-item" md-ink-ripple\n' +
    '                     ui-event="{ click: \'vm.onOptionSelect($event, option)\' }"\n' +
    '                     ng-class="{ selected: option.name == vm.config.selectedOptionName }">\n' +
    '                    <div class="pip-list-item item-padding">\n' +
    '                        <md-icon class="pip-option-icon" md-svg-icon="icons:{{option.icon}}" ng-if="option.icon">\n' +
    '                        </md-icon>\n' +
    '                        <div class="pip-option-title">\n' +
    '                            {{::option.title | translate}}\n' +
    '                        </div>\n' +
    '                        <md-radio-button ng-value="option.name" tabindex="-1"\n' +
    '                                        \n' +
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
    '            <md-button class="pip-cancel" ng-click="vm.onCancel()">{{::\'CANCEL\' | translate}}</md-button>\n' +
    '            <md-button class="pip-submit md-accent" ng-click="vm.onSelect()">{{::vm.config.applyButtonTitle | translate}}</md-button>\n' +
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
  $templateCache.put('information/InformationDialog.html',
    '<!--\n' +
    '@file Information dialog content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-information-dialog layout-column"\n' +
    '           width="400" md-theme="{{vm.theme}}">\n' +
    '    <div class="pip-header">\n' +
    '        <h3 >{{:: vm.config.title | translate }}</h3>\n' +
    '    </div>\n' +
    '    <div class="pip-body">\n' +
    '        <div class="pip-content">\n' +
    '            {{ vm.config.content }}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="md-accent" ng-click="vm.onOk()">{{ vm.config.ok | translate }}</md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();



},{}]},{},[17,1,2,3,4,5,6,7,8,11,9,10,16,12,13,14,15])(17)
});

//# sourceMappingURL=pip-webui-dialogs.js.map
