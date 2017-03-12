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
        pipTranslate = this._injector.has('pipTranslate')
            ? this._injector.get('pipTranslate') : null;
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
    }
    return ConfirmationDialogParams;
}());
exports.ConfirmationDialogParams = ConfirmationDialogParams;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmationDialogService = (function () {
    ConfirmationDialogService.$inject = ['$mdDialog'];
    function ConfirmationDialogService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    ConfirmationDialogService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'confirmation/ConfirmationDialog.html',
            controller: 'pipConfirmationDialogController',
            controllerAs: '$ctrl',
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
    return ConfirmationDialogService;
}());
angular
    .module('pipConfirmationDialog')
    .service('pipConfirmationDialog', ConfirmationDialogService);
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
angular;
require("./ConfirmationDialogParams");
require("./ConfirmationDialogController");
require("./IConfirmationDialogService");
require("./ConfirmationDialogService");
},{"./ConfirmationDialogController":1,"./ConfirmationDialogParams":2,"./ConfirmationDialogService":3,"./IConfirmationDialogService":4}],6:[function(require,module,exports){
{
    translate.$inject = ['$injector'];
    function translate($injector) {
        var pipTranslate = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;
        return function (key) {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        };
    }
    angular
        .module('pipDialogs.Translate', [])
        .filter('translate', translate);
}
},{}],7:[function(require,module,exports){
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
var ErrorDetailsDialogParams_1 = require("./ErrorDetailsDialogParams");
var ErrorDialogStrings = (function () {
    function ErrorDialogStrings() {
        this.errorDetails = 'Error details';
        this.errorMessage = 'Message';
        this.errorCode = 'Code';
        this.errorMethod = 'Method';
        this.errorPath = 'Path';
        this.errorText = 'Error';
    }
    return ErrorDialogStrings;
}());
var ErrorDetailsDialogController = (function (_super) {
    __extends(ErrorDetailsDialogController, _super);
    ErrorDetailsDialogController.$inject = ['$mdDialog', '$injector', '$rootScope'];
    function ErrorDetailsDialogController($mdDialog, $injector, $rootScope) {
        "ngInject";
        var _this = _super.call(this) || this;
        _this.strings = new ErrorDialogStrings();
        _this._injector = $injector;
        _this.$mdDialog = $mdDialog;
        _this.theme = $rootScope.$theme;
        _this.initTranslate();
        if (!_this.error) {
            _this.error = '<none>';
        }
        return _this;
    }
    ErrorDetailsDialogController.prototype.initTranslate = function () {
        var pipTranslate;
        pipTranslate = this._injector.has('pipTranslate')
            ? this._injector.get('pipTranslate') : null;
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
            this.dismissButton = pipTranslate.translate(this.dismissButton) || pipTranslate.translate('DISMISS');
            this.strings.errorDetails = pipTranslate.translate('ERROR_DETAILS');
            this.strings.errorMessage = pipTranslate.translate('MESSAGE');
            this.strings.errorCode = pipTranslate.translate('CODE');
            this.strings.errorMethod = pipTranslate.translate('METHOD');
            this.strings.errorPath = pipTranslate.translate('PATH');
            this.strings.errorText = pipTranslate.translate('ERROR');
        }
        else {
            this.dismissButton = this.dismissButton || 'Dismiss';
        }
    };
    ErrorDetailsDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    ErrorDetailsDialogController.prototype.isString = function (error) {
        return _.isString(error);
    };
    ErrorDetailsDialogController.prototype.getErrorText = function () {
        var error;
        if (_.isString(this.error)) {
            return this.error;
        }
        if (this.error && this.error.error) {
            return this.error.error.toString();
        }
        if (this.error && this.error.data && this.error.data.error) {
            return this.error.data.error.toString();
        }
        return '<none>';
    };
    return ErrorDetailsDialogController;
}(ErrorDetailsDialogParams_1.ErrorDetailsDialogParams));
angular
    .module('pipErrorDetailsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
])
    .controller('pipErrorDetailsDialogController', ErrorDetailsDialogController);
},{"./ErrorDetailsDialogParams":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorDetailsDialogParams = (function () {
    function ErrorDetailsDialogParams() {
    }
    return ErrorDetailsDialogParams;
}());
exports.ErrorDetailsDialogParams = ErrorDetailsDialogParams;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorDetailsDialogService = (function () {
    ErrorDetailsDialogService.$inject = ['$mdDialog'];
    function ErrorDetailsDialogService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    ErrorDetailsDialogService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'error_details/ErrorDetailsDialog.html',
            controller: 'pipErrorDetailsDialogController',
            controllerAs: '$ctrl',
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
    return ErrorDetailsDialogService;
}());
angular
    .module('pipErrorDetailsDialog')
    .service('pipErrorDetailsDialog', ErrorDetailsDialogService);
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],11:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./ErrorDetailsDialogParams");
require("./ErrorDetailsDialogService");
require("./ErrorDetailsDialogController");
__export(require("./ErrorDetailsDialogParams"));
},{"./ErrorDetailsDialogController":7,"./ErrorDetailsDialogParams":8,"./ErrorDetailsDialogService":9}],12:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./error_details");
require("./information");
require("./options");
require("./options_big");
require("./confirmation");
angular
    .module('pipDialogs', [
    'pipInformationDialog',
    'pipConfirmationDialog',
    'pipOptionsDialog',
    'pipOptionsBigDialog',
    'pipErrorDetailsDialog'
]);
__export(require("./error_details"));
__export(require("./information"));
__export(require("./options"));
__export(require("./options_big"));
},{"./confirmation":5,"./error_details":11,"./information":17,"./options":24,"./options_big":31}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],14:[function(require,module,exports){
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
var InformationDialogParams_1 = require("./InformationDialogParams");
var InformationDialogController = (function (_super) {
    __extends(InformationDialogController, _super);
    InformationDialogController.$inject = ['$mdDialog', '$injector', '$rootScope'];
    function InformationDialogController($mdDialog, $injector, $rootScope) {
        "ngInject";
        var _this = _super.call(this) || this;
        _this._injector = $injector;
        _this.initTranslate();
        _this.$mdDialog = $mdDialog;
        _this.theme = $rootScope['$theme'];
        return _this;
    }
    InformationDialogController.prototype.initTranslate = function () {
        var pipTranslate;
        pipTranslate = this._injector.has('pipTranslate')
            ? this._injector.get('pipTranslate') : null;
        var content = this.message;
        var item;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'INFORMATION_TITLE': 'Information' });
            pipTranslate.translations('ru', { 'INFORMATION_TITLE': 'Информация' });
            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('INFORMATION_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('OK');
            content = pipTranslate.translate(content);
        }
        else {
            this.title = this.title || 'Information';
            this.ok = this.ok || 'OK';
        }
        var pipFormat = this._injector.has('pipFormat')
            ? this._injector.get('pipFormat') : null;
        if (this.item && pipFormat) {
            content = pipFormat.sprintf(content, item);
        }
        this.content = content;
    };
    InformationDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    InformationDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    return InformationDialogController;
}(InformationDialogParams_1.InformationDialogParams));
angular
    .module('pipInformationDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
])
    .controller('pipInformationDialogController', InformationDialogController);
},{"./InformationDialogParams":15}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InformationDialogParams = (function () {
    function InformationDialogParams() {
    }
    return InformationDialogParams;
}());
exports.InformationDialogParams = InformationDialogParams;
},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InformationDialogService = (function () {
    InformationDialogService.$inject = ['$mdDialog'];
    function InformationDialogService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    InformationDialogService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'information/InformationDialog.html',
            controller: 'pipInformationDialogController',
            controllerAs: '$ctrl',
            locals: params,
            bindToController: true,
            clickOutsideToClose: true
        })
            .then(function () {
            if (successCallback) {
                successCallback();
            }
        });
    };
    return InformationDialogService;
}());
angular
    .module('pipInformationDialog')
    .service('pipInformationDialog', InformationDialogService);
},{}],17:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./InformationDialogParams");
require("./InformationDialogController");
require("./InformationDialogService");
__export(require("./InformationDialogParams"));
},{"./InformationDialogController":14,"./InformationDialogParams":15,"./InformationDialogService":16}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],19:[function(require,module,exports){
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
var OptionsDialogParams_1 = require("./OptionsDialogParams");
var OptionsDialogController = (function (_super) {
    __extends(OptionsDialogController, _super);
    OptionsDialogController.$inject = ['$mdDialog', '$injector', '$rootScope'];
    function OptionsDialogController($mdDialog, $injector, $rootScope) {
        "ngInject";
        var _this = _super.call(this) || this;
        _this.$mdDialog = $mdDialog;
        _this._injector = $injector;
        _this.theme = $rootScope['$theme'];
        _this.options = _this.options || [];
        _this.initTranslate();
        _this.selectedOption = _.find(_this.options, { active: true }) || null;
        var name = _this.selectedOption ? _this.selectedOption.name : _this.selectedOptionName;
        var index = _.findIndex(_this.options, function (opt) {
            return opt.name == name;
        });
        _this.optionIndex = index == -1 ? 0 : index;
        _this.selectedOption = _this.options[_this.optionIndex];
        _this.selectedOptionName = _this.selectedOption.name;
        setTimeout(_this.focusInput, 500);
        return _this;
    }
    OptionsDialogController.prototype.initTranslate = function () {
        var pipTranslate;
        pipTranslate = this._injector.has('pipTranslate') ? this._injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option' });
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию' });
            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('OPTIONS_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('SELECT');
        }
        else {
            this.title = this.title || 'Choose Option';
            this.ok = this.ok || 'Select';
        }
    };
    OptionsDialogController.prototype.onOk = function () {
        this.$mdDialog.hide();
    };
    OptionsDialogController.prototype.onCancel = function () {
        this.$mdDialog.cancel();
    };
    OptionsDialogController.prototype.onOptionSelect = function (event, option) {
        event.stopPropagation();
        this.selectedOptionName = option.name;
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
        option = _.find(this.options, { name: this.selectedOptionName });
        this.$mdDialog.hide({ option: option, isCheckboxOption: this.isCheckboxOption });
    };
    OptionsDialogController.prototype.focusInput = function () {
        var list;
        list = $('.pip-options-dialog .pip-list');
        list.focus();
    };
    return OptionsDialogController;
}(OptionsDialogParams_1.OptionsDialogParams));
angular
    .module('pipOptionsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
])
    .controller('pipOptionsDialogController', OptionsDialogController);
},{"./OptionsDialogParams":21}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsDialogParams = (function () {
    function OptionsDialogParams() {
    }
    return OptionsDialogParams;
}());
exports.OptionsDialogParams = OptionsDialogParams;
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsDialogResult = (function () {
    function OptionsDialogResult() {
    }
    return OptionsDialogResult;
}());
exports.OptionsDialogResult = OptionsDialogResult;
},{}],23:[function(require,module,exports){
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
            controllerAs: '$ctrl',
            locals: params,
            bindToController: true,
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
},{}],24:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./OptionsDialogData");
require("./OptionsDialogParams");
require("./OptionsDialogResult");
require("./OptionsDialogController");
require("./OptionsDialogService");
__export(require("./OptionsDialogData"));
__export(require("./OptionsDialogParams"));
__export(require("./OptionsDialogResult"));
},{"./OptionsDialogController":19,"./OptionsDialogData":20,"./OptionsDialogParams":21,"./OptionsDialogResult":22,"./OptionsDialogService":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],26:[function(require,module,exports){
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
var OptionsBigDialogParams_1 = require("./OptionsBigDialogParams");
var OptionsBigDialogData_1 = require("./OptionsBigDialogData");
var OptionsBigDialogController = (function (_super) {
    __extends(OptionsBigDialogController, _super);
    OptionsBigDialogController.$inject = ['$mdDialog', '$injector', '$rootScope'];
    function OptionsBigDialogController($mdDialog, $injector, $rootScope) {
        "ngInject";
        var _this = _super.call(this) || this;
        _this.onSelect = function () {
            var option;
            option = _.find(this.options, { name: this.selectedOptionName }) || new OptionsBigDialogData_1.OptionsBigDialogData();
            this.$mdDialog.hide({ option: option });
        };
        _this.$mdDialog = $mdDialog;
        _this._injector = $injector;
        _this.theme = $rootScope['$theme'];
        _this.initTranslate();
        _this.selectedOption = _.find(_this.options, { active: true }) || null;
        var name = _this.selectedOption ? _this.selectedOption.name : _this.selectedOptionName;
        var index = _.findIndex(_this.options, function (opt) {
            return opt.name == name;
        });
        _this.optionIndex = index == -1 ? 0 : index;
        _this.selectedOption = _this.options[_this.optionIndex];
        _this.selectedOptionName = _this.selectedOption.name;
        setTimeout(_this.focusInput, 500);
        return _this;
    }
    OptionsBigDialogController.prototype.initTranslate = function () {
        var pipTranslate;
        pipTranslate = this._injector.has('pipTranslate')
            ? this._injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', { 'OPTIONS_TITLE': 'Choose Option' });
            pipTranslate.translations('ru', { 'OPTIONS_TITLE': 'Выберите опцию' });
            this.title = pipTranslate.translate(this.title) || pipTranslate.translate('OPTIONS_TITLE');
            this.ok = pipTranslate.translate(this.ok) || pipTranslate.translate('SELECT');
        }
        else {
            this.title = this.title || 'Choose Option';
            this.ok = this.ok || 'Select';
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
        this.selectedOptionName = option.name;
        if (this.noActions) {
            this.onSelect();
        }
    };
    OptionsBigDialogController.prototype.onSelected = function () {
        this.selectedOptionName = this.options[this.optionIndex].name;
        if (this.noActions) {
            this.onSelect();
        }
    };
    OptionsBigDialogController.prototype.onKeyUp = function (event, index) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            if (index !== undefined && index > -1 && index < this.options.length) {
                this.selectedOptionName = this.options[index].name;
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
}(OptionsBigDialogParams_1.OptionsBigDialogParams));
angular
    .module('pipOptionsBigDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
])
    .controller('pipOptionsBigDialogController', OptionsBigDialogController);
},{"./OptionsBigDialogData":27,"./OptionsBigDialogParams":28}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsBigDialogData = (function () {
    function OptionsBigDialogData() {
    }
    return OptionsBigDialogData;
}());
exports.OptionsBigDialogData = OptionsBigDialogData;
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsBigDialogParams = (function () {
    function OptionsBigDialogParams() {
    }
    return OptionsBigDialogParams;
}());
exports.OptionsBigDialogParams = OptionsBigDialogParams;
},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionsBigDialogResult = (function () {
    function OptionsBigDialogResult() {
    }
    return OptionsBigDialogResult;
}());
exports.OptionsBigDialogResult = OptionsBigDialogResult;
},{}],30:[function(require,module,exports){
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
            controllerAs: '$ctrl',
            locals: params,
            bindToController: true,
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
},{}],31:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./OptionsBigDialogParams");
require("./OptionsBigDialogData");
require("./OptionsBigDialogResult");
require("./OptionsBigDialogController");
require("./OptionsBigDialogService");
__export(require("./OptionsBigDialogParams"));
__export(require("./OptionsBigDialogData"));
__export(require("./OptionsBigDialogResult"));
},{"./OptionsBigDialogController":26,"./OptionsBigDialogData":27,"./OptionsBigDialogParams":28,"./OptionsBigDialogResult":29,"./OptionsBigDialogService":30}],32:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipDialogs.Templates');
} catch (e) {
  module = angular.module('pipDialogs.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('confirmation/ConfirmationDialog.html',
    '<md-dialog class="pip-dialog pip-confirmation-dialog layout-column" width="400" md-theme="{{ ::$ctrl.theme }}">\n' +
    '    <div class="pip-header">\n' +
    '        <h3>{{ :: $ctrl.title }}</h3>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button ng-click="$ctrl.onCancel()">{{ :: $ctrl.cancel }}</md-button>\n' +
    '            <md-button class="md-accent" ng-click="$ctrl.onOk()">{{ :: $ctrl.ok }}</md-button>\n' +
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
  $templateCache.put('error_details/ErrorDetailsDialog.html',
    '<md-dialog class="pip-dialog pip-error-details-dialog layout-column" width="400" md-theme="{{ $ctrl.theme }}">\n' +
    '    <div class="pip-body">\n' +
    '        <div class="pip-header">\n' +
    '            <h3>{{ ::$ctrl.strings.errorDetails | translate }}</h3>\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text"\n' +
    '             ng-if="$ctrl.error.code || ($ctrl.error.data && $ctrl.error.data.code)">\n' +
    '            {{ ::$ctrl.strings.errorCode | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.code || ($ctrl.error.data && $ctrl.error.data.code)">\n' +
    '            {{ $ctrl.error.code || $ctrl.error.data.code }}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text"\n' +
    '             ng-if="$ctrl.error.path || ($ctrl.error.data && $ctrl.error.data.path)">\n' +
    '            {{ ::$ctrl.strings.errorPath | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.path || ($ctrl.error.data && $ctrl.error.data.path)">\n' +
    '            {{ $ctrl.error.path || $ctrl.error.data.path }}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="$ctrl.isString($ctrl.error) || $ctrl.error.error || ($ctrl.error.data && $ctrl.error.data.error)">\n' +
    '            {{ ::$ctrl.strings.errorText | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.error || ($ctrl.error.data && $ctrl.error.data.error)">\n' +
    '            {{ $ctrl.getErrorText() }}\n' +
    '            <!--{{ $ctrl.error.error || $ctrl.error.data.error }}-->\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="$ctrl.error.method || ($ctrl.error.data && $ctrl.error.data.method)">\n' +
    '            {{ ::$ctrl.strings.errorMethod | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.method || ($ctrl.error.data && $ctrl.error.data.method)">\n' +
    '            {{ $ctrl.error.method || $ctrl.error.data.method }}\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center"\n' +
    '             ng-if="$ctrl.error.message || ($ctrl.error.data && $ctrl.error.data.message)">\n' +
    '            {{ ::$ctrl.strings.errorMessage | translate }}\n' +
    '        </div>\n' +
    '        <div class="layout-row layout-align-start-center text-subhead1"\n' +
    '             ng-if="$ctrl.error.message || ($ctrl.error.data && $ctrl.error.data.message)">\n' +
    '            {{ $ctrl.error.message || $ctrl.error.data.message }}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="md-accent m0" ng-click="$ctrl.onOk()">{{ ::$ctrl.dismissButton | translate }}</md-button>\n' +
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
    '<md-dialog class="pip-dialog pip-information-dialog layout-column"\n' +
    '           width="400" md-theme="{{ $ctrl.theme }}">\n' +
    '    <div class="pip-header">\n' +
    '        <h3 >{{:: $ctrl.title | translate }}</h3>\n' +
    '    </div>\n' +
    '    <div class="pip-body">\n' +
    '        <div class="pip-content">\n' +
    '            {{ $ctrl.content }}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="md-accent" ng-click="$ctrl.onOk()">{{ $ctrl.ok | translate }}</md-button>\n' +
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
    '<md-dialog class="pip-dialog pip-options-dialog layout-column"\n' +
    '           min-width="400" md-theme="{{ $ctrl.theme }}">\n' +
    '    <md-dialog-content class="pip-body lp0 tp0 rp0 bp24 pip-scroll">\n' +
    '        <div class="pip-header" >\n' +
    '            <h3>{{ ::$ctrl.title | translate }}</h3>\n' +
    '            <div ng-show="$ctrl.checkboxOptionCaption" class="header-option text-subhead1 divider-bottom">\n' +
    '                <md-checkbox ng-model="$ctrl.isCheckboxOption" aria-label="CHECKBOX">{{ ::$ctrl.checkboxOptionCaption | translate }}</md-checkbox>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="pip-content">\n' +
    '            <md-radio-group ng-model="$ctrl.selectedOptionName" class="pip-list md-primary" md-no-ink="true"\n' +
    '                            ng-keypress="$ctrl.onKeyPress($event)" tabindex="0">\n' +
    '                <div ng-repeat="option in $ctrl.options" class="pip-list-item" md-ink-ripple\n' +
    '                     ui-event="{ click: \'$ctrl.onOptionSelect($event, option)\' }"\n' +
    '                     ng-class="{ selected: option.name == $ctrl.selectedOptionName }">\n' +
    '                    <div class="pip-list-item item-padding">\n' +
    '                        <md-icon class="pip-option-icon" md-svg-icon="icons:{{ option.icon }}" ng-if="option.icon">\n' +
    '                        </md-icon>\n' +
    '                        <div class="pip-option-title">\n' +
    '                            {{ ::option.title | translate }}\n' +
    '                        </div>\n' +
    '                        <md-radio-button ng-value="option.name" tabindex="-1"\n' +
    '                                        \n' +
    '                                         aria-label="{{ ::option.title | translate }}">\n' +
    '                        </md-radio-button>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '            </md-radio-group>\n' +
    '        </div>\n' +
    '    </md-dialog-content>\n' +
    '    <div class="pip-footer">\n' +
    '        <div>\n' +
    '            <md-button class="pip-cancel" ng-click="$ctrl.onCancel()">{{ ::\'CANCEL\' | translate }}</md-button>\n' +
    '            <md-button class="pip-submit md-accent" ng-click="$ctrl.onSelect()">{{ ::$ctrl.ok | translate }}</md-button>\n' +
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
  $templateCache.put('options_big/OptionsBigDialog.html',
    '<md-dialog class="pip-dialog pip-options-dialog-big layout-column"\n' +
    '           min-width="400" md-theme="{{ $ctrl.theme }}">\n' +
    '    <md-dialog-content class="pip-body pip-scroll" ng-class="{\'bp24\': !$ctrl.noActions}">\n' +
    '        <div class="pip-header" ng-class="{\'header-hint\': $ctrl.noTitle && $ctrl.hint}">\n' +
    '            <h3 class="m0" ng-if="!$ctrl.noTitle">\n' +
    '                {{ ::$ctrl.title | translate }}\n' +
    '            </h3>\n' +
    '            <div ng-show="$ctrl.noTitle && $ctrl.hint" \n' +
    '                 class="dialog-hint layout-row layout-align-start-center">\n' +
    '                <div class="hint-icon-container flex-fixed" >\n' +
    '                    <md-icon md-svg-icon="icons:info-circle-outline"></md-icon>\n' +
    '                </div>\n' +
    '                <div>{{ ::$ctrl.hint | translate }}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="content-divider" ng-if="!noTitle"></div>\n' +
    '        <div class="pip-content">\n' +
    '            <div class="spacer8" ng-if="noTitle && hint"></div>\n' +
    '            <md-list class="pip-menu  pip-ref-list"\n' +
    '                     pip-selected="$ctrl.optionIndex" index="{{ $ctrl.optionIndex }}"\n' +
    '                     pip-select="$ctrl.onSelected($event)">\n' +
    '\n' +
    '                <md-list-item class="pip-ref-list-item pip-selectable layout-row layout-align-start-center"\n' +
    '                              ng-class="{\'selected md-focused\' : option.name == $ctrl.selectedOptionName,\n' +
    '                              \'divider-bottom\': $index != options.length - 1}"\n' +
    '                              md-ink-ripple\n' +
    '                              ng-keyup="$ctrl.onKeyUp($event, $index)"\n' +
    '                              ng-repeat="option in $ctrl.options" >\n' +
    '\n' +
    '                    <div class="pip-content  content-stretch" ng-click="$ctrl.onOptionSelect($event, option)">\n' +
    '                        <p class="pip-title spacer-right" ng-if="option.title" style="margin-bottom: 4px !important;">\n' +
    '                            {{ ::option.title | translate }}\n' +
    '                        </p>\n' +
    '                        <div class="pip-subtitle spacer-right"\n' +
    '                             style="height: inherit"\n' +
    '                             ng-if="option.subtitle">\n' +
    '                            {{ ::option.subtitle | translate }}\n' +
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
    '        <div class="spacer8" ng-if="$ctrl.noActions"></div>\n' +
    '    </md-dialog-content>\n' +
    '\n' +
    '    <div class="pip-footer" ng-if="!$ctrl.noActions">\n' +
    '        <div>\n' +
    '            <md-button class="pip-cancel" ng-click="$ctrl.onCancel()">\n' +
    '                {{ ::\'CANCEL\' | translate }}\n' +
    '            </md-button>\n' +
    '            <md-button class="pip-submit md-accent" ng-click="$ctrl.onSelect()" style="margin-right: -6px">\n' +
    '                {{ ::$ctrl.ok | translate }}\n' +
    '            </md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();



},{}]},{},[32,1,2,3,4,5,6,7,8,9,10,11,12,13,17,14,15,16,31,25,26,27,28,29,30,24,18,19,20,21,22,23])(32)
});

//# sourceMappingURL=pip-webui-dialogs.js.map
