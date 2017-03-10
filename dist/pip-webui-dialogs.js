(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).dialogs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmationDialogParams_1 = require("./ConfirmationDialogParams");
var ConfirmationDialogController = (function (_super) {
    __extends(ConfirmationDialogController, _super);
    ConfirmationDialogController.$inject = ['$mdDialog', '$injector', '$rootScope'];
    function ConfirmationDialogController($mdDialog, $injector, $rootScope) {
        "ngInject";
        var _this = _super.call(this) || this;
        _this._injector = $injector;
        _this.initTranslate();
        _this.$mdDialog = $mdDialog;
        _this.theme = $rootScope['$theme'];
        return _this;
    }
    ConfirmationDialogController.prototype.initTranslate = function () {
        var pipTranslate;
        pipTranslate = this._injector.has('pipTranslate') ? this._injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'CONFIRM_TITLE': 'Confirm' });
            pipTranslate.translations('ru', { 'CONFIRM_TITLE': 'Подтвердите' });
            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('CONFIRM_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('OK');
            this.cancel = pipTranslate.translate(this.cancel) || ('CANCEL');
        }
        else {
            this.title = this.title || 'Confirm';
            this.ok = this.ok || 'OK';
            this.cancel = this.cancel || 'Cancel';
        }
    };
    ConfirmationDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    ConfirmationDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    return ConfirmationDialogController;
}(ConfirmationDialogParams_1.ConfirmationDialogParams));
angular
    .module('pipConfirmationDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
])
    .controller('pipConfirmationDialogController', ConfirmationDialogController);
},{"./ConfirmationDialogParams":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmationDialogParams = (function () {
    function ConfirmationDialogParams() {
        this.ok = 'OK';
        this.cancel = 'Cancel';
    }
    return ConfirmationDialogParams;
}());
exports.ConfirmationDialogParams = ConfirmationDialogParams;
},{}],3:[function(require,module,exports){
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
            locals: params,
            bindToController: true,
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
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./ConfirmationDialogController");
require("./ConfirmationDialogService");
require("./ConfirmationDialogParams");
},{"./ConfirmationDialogController":1,"./ConfirmationDialogParams":2,"./ConfirmationDialogService":3}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
"use strict";
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
    'pipErrorDetailsDialog'
]);
},{"./confirmation":4,"./error_details":11,"./information":16,"./options":27}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorDialogStrings_1 = require("./ErrorDialogStrings");
var ErrorDetailsDialogController = (function () {
    ErrorDetailsDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function ErrorDetailsDialogController($mdDialog, $injector, $rootScope, params) {
        "ngInject";
        this.config = new ErrorDialogStrings_1.ErrorDialogStrings();
        this._injector = $injector;
        this.initTranslate(params);
        this.$mdDialog = $mdDialog;
        this.theme = $rootScope.$theme;
        this.config.error = params.error;
    }
    ErrorDetailsDialogController.prototype.initTranslate = function (params) {
        var pipTranslate;
        pipTranslate = this._injector.has('pipTranslate') ? this._injector.get('pipTranslate') : null;
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
    };
    ErrorDetailsDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    ErrorDetailsDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    return ErrorDetailsDialogController;
}());
angular
    .module('pipErrorDetailsDialog')
    .controller('pipErrorDetailsDialogController', ErrorDetailsDialogController);
},{"./ErrorDialogStrings":10}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorDialogParams = (function () {
    function ErrorDialogParams() {
        this.ok = 'OK';
        this.cancel = 'CANCEL';
        this.error = 'ERROR';
    }
    return ErrorDialogParams;
}());
exports.ErrorDialogParams = ErrorDialogParams;
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorDialogStrings = (function () {
    function ErrorDialogStrings() {
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
    return ErrorDialogStrings;
}());
exports.ErrorDialogStrings = ErrorDialogStrings;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
angular
    .module('pipErrorDetailsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./ErrorDialogParams");
require("./ErrorDialogStrings");
require("./ErrorDetailsDialogService");
require("./ErrorDetailsDialogController");
},{"./ErrorDetailsDialogController":7,"./ErrorDetailsDialogService":8,"./ErrorDialogParams":9,"./ErrorDialogStrings":10}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InformationDialogStrings_1 = require("./InformationDialogStrings");
var InformationDialogController = (function () {
    InformationDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function InformationDialogController($mdDialog, $injector, $rootScope, params) {
        "ngInject";
        this.config = new InformationDialogStrings_1.InformationDialogStrings();
        this._injector = $injector;
        this.initTranslate(params);
        this.$mdDialog = $mdDialog;
        this.theme = $rootScope['$theme'];
        this.config.error = params.error;
    }
    InformationDialogController.prototype.initTranslate = function (params) {
        var pipTranslate;
        pipTranslate = this._injector.has('pipTranslate') ? this._injector.get('pipTranslate') : null;
        var content = params.message, item;
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
        var pipFormat = this._injector.has('pipFormat') ? this._injector.get('pipFormat') : null;
        if (params.item && pipFormat) {
            item = _.truncate(params.item, 25);
            content = pipFormat.sprintf(content, item);
        }
        this.config.content = content;
    };
    InformationDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    InformationDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    return InformationDialogController;
}());
angular
    .module('pipInformationDialog')
    .controller('pipInformationDialogController', InformationDialogController);
},{"./InformationDialogStrings":15}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InformationDialogParams = (function () {
    function InformationDialogParams() {
        this.ok = 'OK';
    }
    return InformationDialogParams;
}());
exports.InformationDialogParams = InformationDialogParams;
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InformationDialogStrings = (function () {
    function InformationDialogStrings() {
        this.ok = 'OK';
    }
    return InformationDialogStrings;
}());
exports.InformationDialogStrings = InformationDialogStrings;
},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
angular
    .module('pipInformationDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./InformationDialogParams");
require("./InformationDialogStrings");
require("./InformationDialogService");
require("./InformationDialogController");
},{"./InformationDialogController":12,"./InformationDialogParams":13,"./InformationDialogService":14,"./InformationDialogStrings":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsBigDialogParams_1 = require("./OptionsBigDialogParams");
var OptionsBigDialogData_1 = require("./OptionsBigDialogData");
var OptionsBigDialogController = (function () {
    OptionsBigDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function OptionsBigDialogController($mdDialog, $injector, $rootScope, params) {
        "ngInject";
        this.onSelect = function () {
            var option;
            option = _.find(this.config.options, { name: this.config.selectedOptionName }) || new OptionsBigDialogData_1.OptionsBigDialogData();
            this.$mdDialog.hide({ option: option, deleted: this.config.deleted });
        };
        this.$mdDialog = $mdDialog;
        this.config = new OptionsBigDialogParams_1.OptionsBigDialogParams();
        this._injector = $injector;
        this.initTranslate(params);
        this.theme = $rootScope['$theme'];
        this.config.options = params.options;
        this.config.selectedOption = _.find(params.options, { active: true }) || new OptionsBigDialogData_1.OptionsBigDialogData();
        this.config.selectedOptionName = this.config.selectedOption.name;
        this.config.deleted = params.deleted;
        this.config.deletedTitle = params.deletedTitle;
        this.config.noActions = params.noActions || false;
        this.config.noTitle = params.noTitle || false;
        this.config.hint = params.hint || '';
        setTimeout(this.focusInput, 500);
    }
    OptionsBigDialogController.prototype.initTranslate = function (params) {
        var pipTranslate;
        pipTranslate = this._injector.has('pipTranslate') ? this._injector.get('pipTranslate') : null;
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
    };
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
angular
    .module('pipOptionsBigDialog')
    .controller('pipOptionsBigDialogController', OptionsBigDialogController);
},{"./OptionsBigDialogData":18,"./OptionsBigDialogParams":19}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsBigDialogData = (function () {
    function OptionsBigDialogData() {
    }
    return OptionsBigDialogData;
}());
exports.OptionsBigDialogData = OptionsBigDialogData;
},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsBigDialogParams = (function () {
    function OptionsBigDialogParams() {
        this.noTitle = false;
        this.noActions = false;
        this.optionIndex = 0;
    }
    return OptionsBigDialogParams;
}());
exports.OptionsBigDialogParams = OptionsBigDialogParams;
},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsBigDialogResult = (function () {
    function OptionsBigDialogResult() {
    }
    return OptionsBigDialogResult;
}());
exports.OptionsBigDialogResult = OptionsBigDialogResult;
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsBigDialogService = (function () {
    OptionsBigDialogService.$inject = ['$mdDialog'];
    function OptionsBigDialogService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    OptionsBigDialogService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options/OptionsBigDialog.html',
            controller: 'pipOptionsBigDialogController',
            controllerAs: 'vm',
            locals: { params: params },
            clickOutsideToClose: true
        })
            .then(function (result) {
            if (successCallback) {
                successCallback(result);
            }
        }, function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    };
    return OptionsBigDialogService;
}());
angular
    .module('pipOptionsBigDialog')
    .service('pipOptionsBigDialog', OptionsBigDialogService);
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsDialogData_1 = require("./OptionsDialogData");
var OptionsDialogParams_1 = require("./OptionsDialogParams");
var OptionsDialogController = (function () {
    OptionsDialogController.$inject = ['$mdDialog', '$injector', '$rootScope', 'params'];
    function OptionsDialogController($mdDialog, $injector, $rootScope, params) {
        "ngInject";
        this.$mdDialog = $mdDialog;
        this.config = new OptionsDialogParams_1.OptionsDialogParams();
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
        this.config.selectedOption = _.find(params.options, { active: true }) || new OptionsDialogData_1.OptionsDialogData();
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
        this.$mdDialog.hide({ option: option, deleted: this.config.deleted });
    };
    OptionsDialogController.prototype.focusInput = function () {
        var list;
        list = $('.pip-options-dialog .pip-list');
        list.focus();
    };
    return OptionsDialogController;
}());
angular
    .module('pipOptionsDialog')
    .controller('pipOptionsDialogController', OptionsDialogController);
},{"./OptionsDialogData":23,"./OptionsDialogParams":24}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsDialogData = (function () {
    function OptionsDialogData() {
        this.icon = 'star';
        this.active = true;
    }
    return OptionsDialogData;
}());
exports.OptionsDialogData = OptionsDialogData;
},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsDialogParams = (function () {
    function OptionsDialogParams() {
    }
    return OptionsDialogParams;
}());
exports.OptionsDialogParams = OptionsDialogParams;
},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsDialogResult = (function () {
    function OptionsDialogResult() {
    }
    return OptionsDialogResult;
}());
exports.OptionsDialogResult = OptionsDialogResult;
},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsDialogService = (function () {
    OptionsDialogService.$inject = ['$mdDialog'];
    function OptionsDialogService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    OptionsDialogService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options/OptionsDialog.html',
            controller: 'pipOptionsDialogController',
            controllerAs: 'vm',
            locals: { params: params },
            clickOutsideToClose: true
        })
            .then(function (result) {
            if (successCallback) {
                successCallback(result);
            }
        }, function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    };
    return OptionsDialogService;
}());
angular
    .module('pipOptionsDialog')
    .service('pipOptionsDialog', OptionsDialogService);
},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
angular
    .module('pipOptionsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./OptionsDialogData");
require("./OptionsDialogParams");
require("./OptionsDialogResult");
require("./OptionsDialogService");
require("./OptionsDialogController");
angular
    .module('pipOptionsBigDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./OptionsBigDialogParams");
require("./OptionsBigDialogData");
require("./OptionsBigDialogResult");
require("./OptionsBigDialogService");
require("./OptionsBigDialogController");
},{"./OptionsBigDialogController":17,"./OptionsBigDialogData":18,"./OptionsBigDialogParams":19,"./OptionsBigDialogResult":20,"./OptionsBigDialogService":21,"./OptionsDialogController":22,"./OptionsDialogData":23,"./OptionsDialogParams":24,"./OptionsDialogResult":25,"./OptionsDialogService":26}],28:[function(require,module,exports){
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
    '<md-dialog class="pip-dialog pip-confirmation-dialog layout-column" width="400" md-theme="{{ ::vm.theme }}">\n' +
    '    <div class="pip-header">\n' +
    '        <h3>{{ :: vm.title }}</h3>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button ng-click="vm.onCancel()">{{ :: vm.cancel }}</md-button>\n' +
    '            <md-button class="md-accent" ng-click="vm.onOk()">{{ :: vm.ok }}</md-button>\n' +
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
    '<md-dialog class="pip-dialog pip-error-details-dialog layout-column" width="400" md-theme="{{ vm.theme }}">\n' +
    '    <div class="pip-body">\n' +
    '        <div class="pip-header">\n' +
    '            <h3>{{ ::vm.config.errorDetails | translate }}</h3>\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text"\n' +
    '             ng-if="vm.config.error.code || (vm.config.error.data && error.data.code)">\n' +
    '            {{ ::vm.config.errorCode | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.code || (vm.config.error.data && vm.config.error.data.code)">\n' +
    '            {{ vm.config.error.code || vm.config.error.data.code }}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text"\n' +
    '             ng-if="vm.config.error.path || (vm.config.error.data && vm.config.error.data.path)">\n' +
    '            {{ ::vm.config.errorPath | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.path || (vm.config.error.data && vm.config.error.data.path)">\n' +
    '            {{ vm.config.error.path || vm.config.error.data.path }}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="vm.config.error.error || (vm.config.error.data && vm.config.error.data.error)">\n' +
    '            {{ ::vm.config.errorText | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.error || (vm.config.error.data && vm.config.error.data.error)">\n' +
    '            {{ vm.config.error.error || vm.config.error.data.error }}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="vm.config.error.method || (vm.config.error.data && vm.config.error.data.method)">\n' +
    '            {{ ::vm.config.errorMethod | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="vm.config.error.method || (vm.config.error.data && vm.config.error.data.method)">\n' +
    '            {{ vm.config.error.method || vm.config.error.data.method }}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="vm.config.error.message || (vm.config.error.data && vm.config.error.data.message)">\n' +
    '            {{ ::vm.config.errorMessage | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1"\n' +
    '             ng-if="vm.config.error.message || (vm.config.error.data && vm.config.error.data.message)">\n' +
    '            {{ vm.config.error.message || vm.config.error.data.message }}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="md-accent m0" ng-click="vm.onOk()">{{ ::vm.config.dismissButton | translate }}</md-button>\n' +
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
    '           width="400" md-theme="{{ vm.theme }}">\n' +
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



},{}]},{},[28,1,2,3,4,5,6,7,8,9,10,11,16,12,13,14,15,27,17,18,19,20,21,22,23,24,25,26])(28)
});

//# sourceMappingURL=pip-webui-dialogs.js.map
