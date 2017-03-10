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
var ErrorDialogStrings_1 = require("./ErrorDialogStrings");
var ErrorDialogParams_1 = require("./ErrorDialogParams");
var ErrorDetailsDialogController = (function (_super) {
    __extends(ErrorDetailsDialogController, _super);
    ErrorDetailsDialogController.$inject = ['$mdDialog', '$injector', '$rootScope'];
    function ErrorDetailsDialogController($mdDialog, $injector, $rootScope) {
        "ngInject";
        var _this = _super.call(this) || this;
        _this.strings = new ErrorDialogStrings_1.ErrorDialogStrings();
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
}(ErrorDialogParams_1.ErrorDialogParams));
angular
    .module('pipErrorDetailsDialog')
    .controller('pipErrorDetailsDialogController', ErrorDetailsDialogController);

},{"./ErrorDialogParams":9,"./ErrorDialogStrings":10}],8:[function(require,module,exports){
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
    }
    return ErrorDialogParams;
}());
exports.ErrorDialogParams = ErrorDialogParams;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        pipTranslate = this._injector.has('pipTranslate') ? this._injector.get('pipTranslate') : null;
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
        var pipFormat = this._injector.has('pipFormat') ? this._injector.get('pipFormat') : null;
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
    .module('pipInformationDialog')
    .controller('pipInformationDialogController', InformationDialogController);

},{"./InformationDialogParams":13}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InformationDialogParams = (function () {
    function InformationDialogParams() {
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

},{}],22:[function(require,module,exports){
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
    .module('pipOptionsDialog')
    .controller('pipOptionsDialogController', OptionsDialogController);

},{"./OptionsDialogParams":24}],23:[function(require,module,exports){
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
    '<md-dialog class="pip-dialog pip-confirmation-dialog layout-column" width="400" md-theme="{{ ::$ctrl.theme }}"><div class="pip-header"><h3>{{ :: $ctrl.title }}</h3></div><div class="pip-footer"><div><md-button ng-click="$ctrl.onCancel()">{{ :: $ctrl.cancel }}</md-button><md-button class="md-accent" ng-click="$ctrl.onOk()">{{ :: $ctrl.ok }}</md-button></div></div></md-dialog>');
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
    '<md-dialog class="pip-dialog pip-error-details-dialog layout-column" width="400" md-theme="{{ $ctrl.theme }}"><div class="pip-body"><div class="pip-header"><h3>{{ ::$ctrl.strings.errorDetails | translate }}</h3></div><div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text" ng-if="$ctrl.error.code || ($ctrl.error.data && $ctrl.error.data.code)">{{ ::$ctrl.strings.errorCode | translate }}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.code || ($ctrl.error.data && $ctrl.error.data.code)">{{ $ctrl.error.code || $ctrl.error.data.code }}</div><div class="layout-row layout-align-start-center error-section text-body2 color-secondary-text" ng-if="$ctrl.error.path || ($ctrl.error.data && $ctrl.error.data.path)">{{ ::$ctrl.strings.errorPath | translate }}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.path || ($ctrl.error.data && $ctrl.error.data.path)">{{ $ctrl.error.path || $ctrl.error.data.path }}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="$ctrl.isString($ctrl.error) || $ctrl.error.error || ($ctrl.error.data && $ctrl.error.data.error)">{{ ::$ctrl.strings.errorText | translate }}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.error || ($ctrl.error.data && $ctrl.error.data.error)">{{ $ctrl.getErrorText() }}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="$ctrl.error.method || ($ctrl.error.data && $ctrl.error.data.method)">{{ ::$ctrl.strings.errorMethod | translate }}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.method || ($ctrl.error.data && $ctrl.error.data.method)">{{ $ctrl.error.method || $ctrl.error.data.method }}</div><div class="error-section text-body2 color-secondary-text layout-row layout-align-start-center" ng-if="$ctrl.error.message || ($ctrl.error.data && $ctrl.error.data.message)">{{ ::$ctrl.strings.errorMessage | translate }}</div><div class="layout-row layout-align-start-center text-subhead1" ng-if="$ctrl.error.message || ($ctrl.error.data && $ctrl.error.data.message)">{{ $ctrl.error.message || $ctrl.error.data.message }}</div></div><div class="pip-footer"><div><md-button class="md-accent m0" ng-click="$ctrl.onOk()">{{ ::$ctrl.dismissButton | translate }}</md-button></div></div></md-dialog>');
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
    '<md-dialog class="pip-dialog pip-options-dialog-big layout-column" min-width="400" md-theme="{{ $ctrl.theme }}"><md-dialog-content class="pip-body pip-scroll" ng-class="{\'bp24\': !$ctrl.noActions}"><div class="pip-header" ng-class="{\'header-hint\': $ctrl.noTitle && $ctrl.hint}"><h3 class="m0" ng-if="!$ctrl.noTitle">{{ ::$ctrl.title | translate }}</h3><div ng-show="$ctrl.noTitle && $ctrl.hint" class="dialog-hint layout-row layout-align-start-center"><div class="hint-icon-container flex-fixed"><md-icon md-svg-icon="icons:info-circle-outline"></md-icon></div><div>{{ ::$ctrl.hint | translate }}</div></div></div><div class="content-divider" ng-if="!noTitle"></div><div class="pip-content"><div class="spacer8" ng-if="noTitle && hint"></div><md-list class="pip-menu pip-ref-list" pip-selected="$ctrl.optionIndex" index="{{ $ctrl.optionIndex }}" pip-select="$ctrl.onSelected($event)"><md-list-item class="pip-ref-list-item pip-selectable layout-row layout-align-start-center" ng-class="{\'selected md-focused\' : option.name == $ctrl.selectedOptionName, \'divider-bottom\': $index != options.length - 1}" md-ink-ripple="" ng-keyup="$ctrl.onKeyUp($event, $index)" ng-repeat="option in $ctrl.options"><div class="pip-content content-stretch" ng-click="$ctrl.onOptionSelect($event, option)"><p class="pip-title spacer-right" ng-if="option.title" style="margin-bottom: 4px !important;">{{ ::option.title | translate }}</p><div class="pip-subtitle spacer-right" style="height: inherit" ng-if="option.subtitle">{{ ::option.subtitle | translate }}</div><div class="pip-subtitle spacer-right" style="height: inherit" ng-if="option.text" ng-bind-html="option.text | translate"></div></div></md-list-item></md-list></div><div class="spacer8" ng-if="$ctrl.noActions"></div></md-dialog-content><div class="pip-footer" ng-if="!$ctrl.noActions"><div><md-button class="pip-cancel" ng-click="$ctrl.onCancel()">{{ ::\'CANCEL\' | translate }}</md-button><md-button class="pip-submit md-accent" ng-click="$ctrl.onSelect()" style="margin-right: -6px">{{ ::$ctrl.ok | translate }}</md-button></div></div></md-dialog>');
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
    '<md-dialog class="pip-dialog pip-options-dialog layout-column" min-width="400" md-theme="{{ $ctrl.theme }}"><md-dialog-content class="pip-body lp0 tp0 rp0 bp24 pip-scroll"><div class="pip-header"><h3>{{ ::$ctrl.title | translate }}</h3><div ng-show="$ctrl.checkboxOptionCaption" class="header-option text-subhead1 divider-bottom"><md-checkbox ng-model="$ctrl.isCheckboxOption" aria-label="CHECKBOX">{{ ::$ctrl.checkboxOptionCaption | translate }}</md-checkbox></div></div><div class="pip-content"><md-radio-group ng-model="$ctrl.selectedOptionName" class="pip-list md-primary" md-no-ink="true" ng-keypress="$ctrl.onKeyPress($event)" tabindex="0"><div ng-repeat="option in $ctrl.options" class="pip-list-item" md-ink-ripple="" ui-event="{ click: \'$ctrl.onOptionSelect($event, option)\' }" ng-class="{ selected: option.name == $ctrl.selectedOptionName }"><div class="pip-list-item item-padding"><md-icon class="pip-option-icon" md-svg-icon="icons:{{ option.icon }}" ng-if="option.icon"></md-icon><div class="pip-option-title">{{ ::option.title | translate }}</div><md-radio-button ng-value="option.name" tabindex="-1" aria-label="{{ ::option.title | translate }}"></md-radio-button></div></div></md-radio-group></div></md-dialog-content><div class="pip-footer"><div><md-button class="pip-cancel" ng-click="$ctrl.onCancel()">{{ ::\'CANCEL\' | translate }}</md-button><md-button class="pip-submit md-accent" ng-click="$ctrl.onSelect()">{{ ::$ctrl.ok | translate }}</md-button></div></div></md-dialog>');
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
    '<md-dialog class="pip-dialog pip-information-dialog layout-column" width="400" md-theme="{{ $ctrl.theme }}"><div class="pip-header"><h3>{{:: $ctrl.title | translate }}</h3></div><div class="pip-body"><div class="pip-content">{{ $ctrl.content }}</div></div><div class="pip-footer"><div><md-button class="md-accent" ng-click="$ctrl.onOk()">{{ $ctrl.ok | translate }}</md-button></div></div></md-dialog>');
}]);
})();



},{}]},{},[28,1,2,3,4,5,6,7,8,9,10,11,16,12,13,14,15,27,17,18,19,20,21,22,23,24,25,26])(28)
});

//# sourceMappingURL=pip-webui-dialogs.js.map
