(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).dialogs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    .module('pipConfirmationDialog')
    .controller('pipConfirmationDialogController', ConfirmationDialogController);
},{"./ConfirmationDialogParams":2}],2:[function(require,module,exports){
"use strict";
var ConfirmationDialogParams = (function () {
    function ConfirmationDialogParams() {
    }
    return ConfirmationDialogParams;
}());
exports.ConfirmationDialogParams = ConfirmationDialogParams;
},{}],3:[function(require,module,exports){
"use strict";
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
},{}],5:[function(require,module,exports){
"use strict";
angular
    .module('pipConfirmationDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        _this.theme = $rootScope['$theme'];
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
    .module('pipErrorDetailsDialog')
    .controller('pipErrorDetailsDialogController', ErrorDetailsDialogController);
},{"./ErrorDetailsDialogParams":8}],8:[function(require,module,exports){
"use strict";
var ErrorDetailsDialogParams = (function () {
    function ErrorDetailsDialogParams() {
    }
    return ErrorDetailsDialogParams;
}());
exports.ErrorDetailsDialogParams = ErrorDetailsDialogParams;
},{}],9:[function(require,module,exports){
"use strict";
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular
    .module('pipErrorDetailsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./ErrorDetailsDialogParams");
require("./ErrorDetailsDialogService");
require("./ErrorDetailsDialogController");
__export(require("./ErrorDetailsDialogParams"));
},{"./ErrorDetailsDialogController":7,"./ErrorDetailsDialogParams":8,"./ErrorDetailsDialogService":9}],11:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require("./dependencies/TranslateFilter");
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
},{"./confirmation":5,"./dependencies/TranslateFilter":6,"./error_details":10,"./information":15,"./options":21,"./options_big":27}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    .module('pipInformationDialog')
    .controller('pipInformationDialogController', InformationDialogController);
},{"./InformationDialogParams":13}],13:[function(require,module,exports){
"use strict";
var InformationDialogParams = (function () {
    function InformationDialogParams() {
    }
    return InformationDialogParams;
}());
exports.InformationDialogParams = InformationDialogParams;
},{}],14:[function(require,module,exports){
"use strict";
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
},{}],15:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular
    .module('pipInformationDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./InformationDialogParams");
require("./InformationDialogController");
require("./InformationDialogService");
__export(require("./InformationDialogParams"));
},{"./InformationDialogController":12,"./InformationDialogParams":13,"./InformationDialogService":14}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
},{"./OptionsDialogParams":18}],17:[function(require,module,exports){
"use strict";
var OptionsDialogData = (function () {
    function OptionsDialogData() {
        this.icon = 'star';
        this.active = true;
    }
    return OptionsDialogData;
}());
exports.OptionsDialogData = OptionsDialogData;
},{}],18:[function(require,module,exports){
"use strict";
var OptionsDialogParams = (function () {
    function OptionsDialogParams() {
    }
    return OptionsDialogParams;
}());
exports.OptionsDialogParams = OptionsDialogParams;
},{}],19:[function(require,module,exports){
"use strict";
var OptionsDialogResult = (function () {
    function OptionsDialogResult() {
    }
    return OptionsDialogResult;
}());
exports.OptionsDialogResult = OptionsDialogResult;
},{}],20:[function(require,module,exports){
"use strict";
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
},{}],21:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular
    .module('pipOptionsDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./OptionsDialogData");
require("./OptionsDialogParams");
require("./OptionsDialogResult");
require("./OptionsDialogController");
require("./OptionsDialogService");
__export(require("./OptionsDialogData"));
__export(require("./OptionsDialogParams"));
__export(require("./OptionsDialogResult"));
},{"./OptionsDialogController":16,"./OptionsDialogData":17,"./OptionsDialogParams":18,"./OptionsDialogResult":19,"./OptionsDialogService":20}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    .module('pipOptionsBigDialog')
    .controller('pipOptionsBigDialogController', OptionsBigDialogController);
},{"./OptionsBigDialogData":23,"./OptionsBigDialogParams":24}],23:[function(require,module,exports){
"use strict";
var OptionsBigDialogData = (function () {
    function OptionsBigDialogData() {
    }
    return OptionsBigDialogData;
}());
exports.OptionsBigDialogData = OptionsBigDialogData;
},{}],24:[function(require,module,exports){
"use strict";
var OptionsBigDialogParams = (function () {
    function OptionsBigDialogParams() {
    }
    return OptionsBigDialogParams;
}());
exports.OptionsBigDialogParams = OptionsBigDialogParams;
},{}],25:[function(require,module,exports){
"use strict";
var OptionsBigDialogResult = (function () {
    function OptionsBigDialogResult() {
    }
    return OptionsBigDialogResult;
}());
exports.OptionsBigDialogResult = OptionsBigDialogResult;
},{}],26:[function(require,module,exports){
"use strict";
var OptionsBigDialogService = (function () {
    OptionsBigDialogService.$inject = ['$mdDialog'];
    function OptionsBigDialogService($mdDialog) {
        this._mdDialog = $mdDialog;
    }
    OptionsBigDialogService.prototype.show = function (params, successCallback, cancelCallback) {
        this._mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'options_big/OptionsBigDialog.html',
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
},{}],27:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular
    .module('pipOptionsBigDialog', [
    'ngMaterial',
    'pipDialogs.Translate',
    'pipDialogs.Templates'
]);
require("./OptionsBigDialogParams");
require("./OptionsBigDialogData");
require("./OptionsBigDialogResult");
require("./OptionsBigDialogController");
require("./OptionsBigDialogService");
__export(require("./OptionsBigDialogParams"));
__export(require("./OptionsBigDialogData"));
__export(require("./OptionsBigDialogResult"));
},{"./OptionsBigDialogController":22,"./OptionsBigDialogData":23,"./OptionsBigDialogParams":24,"./OptionsBigDialogResult":25,"./OptionsBigDialogService":26}],28:[function(require,module,exports){
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
  $templateCache.put('error_details/ErrorDetailsDialog.html',
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
  $templateCache.put('information/InformationDialog.html',
    '<md-dialog class="pip-dialog pip-information-dialog layout-column" width="400" md-theme="{{ $ctrl.theme }}"><div class="pip-header"><h3>{{:: $ctrl.title | translate }}</h3></div><div class="pip-body"><div class="pip-content">{{ $ctrl.content }}</div></div><div class="pip-footer"><div><md-button class="md-accent" ng-click="$ctrl.onOk()">{{ $ctrl.ok | translate }}</md-button></div></div></md-dialog>');
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
  $templateCache.put('options_big/OptionsBigDialog.html',
    '<md-dialog class="pip-dialog pip-options-dialog-big layout-column" min-width="400" md-theme="{{ $ctrl.theme }}"><md-dialog-content class="pip-body pip-scroll" ng-class="{\'bp24\': !$ctrl.noActions}"><div class="pip-header" ng-class="{\'header-hint\': $ctrl.noTitle && $ctrl.hint}"><h3 class="m0" ng-if="!$ctrl.noTitle">{{ ::$ctrl.title | translate }}</h3><div ng-show="$ctrl.noTitle && $ctrl.hint" class="dialog-hint layout-row layout-align-start-center"><div class="hint-icon-container flex-fixed"><md-icon md-svg-icon="icons:info-circle-outline"></md-icon></div><div>{{ ::$ctrl.hint | translate }}</div></div></div><div class="content-divider" ng-if="!noTitle"></div><div class="pip-content"><div class="spacer8" ng-if="noTitle && hint"></div><md-list class="pip-menu pip-ref-list" pip-selected="$ctrl.optionIndex" index="{{ $ctrl.optionIndex }}" pip-select="$ctrl.onSelected($event)"><md-list-item class="pip-ref-list-item pip-selectable layout-row layout-align-start-center" ng-class="{\'selected md-focused\' : option.name == $ctrl.selectedOptionName, \'divider-bottom\': $index != options.length - 1}" md-ink-ripple="" ng-keyup="$ctrl.onKeyUp($event, $index)" ng-repeat="option in $ctrl.options"><div class="pip-content content-stretch" ng-click="$ctrl.onOptionSelect($event, option)"><p class="pip-title spacer-right" ng-if="option.title" style="margin-bottom: 4px !important;">{{ ::option.title | translate }}</p><div class="pip-subtitle spacer-right" style="height: inherit" ng-if="option.subtitle">{{ ::option.subtitle | translate }}</div><div class="pip-subtitle spacer-right" style="height: inherit" ng-if="option.text" ng-bind-html="option.text | translate"></div></div></md-list-item></md-list></div><div class="spacer8" ng-if="$ctrl.noActions"></div></md-dialog-content><div class="pip-footer" ng-if="!$ctrl.noActions"><div><md-button class="pip-cancel" ng-click="$ctrl.onCancel()">{{ ::\'CANCEL\' | translate }}</md-button><md-button class="pip-submit md-accent" ng-click="$ctrl.onSelect()" style="margin-right: -6px">{{ ::$ctrl.ok | translate }}</md-button></div></div></md-dialog>');
}]);
})();



},{}]},{},[28,11])(28)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvbkRpYWxvZ0NvbnRyb2xsZXIudHMiLCJzcmMvY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvbkRpYWxvZ1BhcmFtcy50cyIsInNyYy9jb25maXJtYXRpb24vQ29uZmlybWF0aW9uRGlhbG9nU2VydmljZS50cyIsInNyYy9jb25maXJtYXRpb24vaW5kZXgudHMiLCJzcmMvZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlci50cyIsInNyYy9lcnJvcl9kZXRhaWxzL0Vycm9yRGV0YWlsc0RpYWxvZ0NvbnRyb2xsZXIudHMiLCJzcmMvZXJyb3JfZGV0YWlscy9FcnJvckRldGFpbHNEaWFsb2dQYXJhbXMudHMiLCJzcmMvZXJyb3JfZGV0YWlscy9FcnJvckRldGFpbHNEaWFsb2dTZXJ2aWNlLnRzIiwic3JjL2Vycm9yX2RldGFpbHMvaW5kZXgudHMiLCJzcmMvaW5kZXgudHMiLCJzcmMvaW5mb3JtYXRpb24vSW5mb3JtYXRpb25EaWFsb2dDb250cm9sbGVyLnRzIiwic3JjL2luZm9ybWF0aW9uL0luZm9ybWF0aW9uRGlhbG9nUGFyYW1zLnRzIiwic3JjL2luZm9ybWF0aW9uL0luZm9ybWF0aW9uRGlhbG9nU2VydmljZS50cyIsInNyYy9pbmZvcm1hdGlvbi9pbmRleC50cyIsInNyYy9vcHRpb25zL09wdGlvbnNEaWFsb2dDb250cm9sbGVyLnRzIiwic3JjL29wdGlvbnMvT3B0aW9uc0RpYWxvZ0RhdGEudHMiLCJzcmMvb3B0aW9ucy9PcHRpb25zRGlhbG9nUGFyYW1zLnRzIiwic3JjL29wdGlvbnMvT3B0aW9uc0RpYWxvZ1Jlc3VsdC50cyIsInNyYy9vcHRpb25zL09wdGlvbnNEaWFsb2dTZXJ2aWNlLnRzIiwic3JjL29wdGlvbnMvaW5kZXgudHMiLCJzcmMvb3B0aW9uc19iaWcvT3B0aW9uc0JpZ0RpYWxvZ0NvbnRyb2xsZXIudHMiLCJzcmMvb3B0aW9uc19iaWcvT3B0aW9uc0JpZ0RpYWxvZ0RhdGEudHMiLCJzcmMvb3B0aW9uc19iaWcvT3B0aW9uc0JpZ0RpYWxvZ1BhcmFtcy50cyIsInNyYy9vcHRpb25zX2JpZy9PcHRpb25zQmlnRGlhbG9nUmVzdWx0LnRzIiwic3JjL29wdGlvbnNfYmlnL09wdGlvbnNCaWdEaWFsb2dTZXJ2aWNlLnRzIiwic3JjL29wdGlvbnNfYmlnL2luZGV4LnRzIiwidGVtcC9waXAtd2VidWktZGlhbG9ncy1odG1sLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLHVFQUFzRTtBQUV0RTtJQUE0QyxnREFBd0I7SUFNaEUsc0NBQ0ksU0FBMEMsRUFDMUMsU0FBbUMsRUFDbkMsVUFBZ0M7UUFFaEMsVUFBVSxDQUFDO1FBTGYsWUFPSSxpQkFBTyxTQU9WO1FBTkcsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUN0QyxDQUFDO0lBRU8sb0RBQWEsR0FBckI7UUFDSSxJQUFJLFlBQTRDLENBQUM7UUFDakQsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztjQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVoRixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNoRSxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDO1lBRW5FLElBQUksQ0FBQyxL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O0NBQUMsQ0FBQyxDQUFDO0FBRWpDLG9DQUFrQztBQUNsQyxrQ0FBZ0M7QUFDaEMsb0NBQWtDO0FBQ2xDLHdDQUFzQztBQUN0QyxxQ0FBbUM7QUFHbkMsOENBQXlDO0FBQ3pDLDRDQUF1QztBQUN2Qyw4Q0FBeUM7O0FDZnpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nUGFyYW1zIH0gZnJvbSAnLi9Db25maXJtYXRpb25EaWFsb2dQYXJhbXMnO1xyXG5cclxuY2xhc3MgQ29uZmlybWF0aW9uRGlhbG9nQ29udHJvbGxlciBleHRlbmRzICBDb25maXJtYXRpb25EaWFsb2dQYXJhbXMge1xyXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgcHVibGljIHRoZW1lOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSBcclxuICAgIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5faW5qZWN0b3IgPSAkaW5qZWN0b3I7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFRyYW5zbGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLiRtZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgICAgICB0aGlzLnRoZW1lID0gJHJvb3RTY29wZVsnJHRoZW1lJ107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VHJhbnNsYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwaXBUcmFuc2xhdGU6IHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZTtcclxuICAgICAgICBwaXBUcmFuc2xhdGUgPSB0aGlzLl9pbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpIFxyXG4gICAgICAgICAgICA/IDxwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2U+dGhpcy5faW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChwaXBUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygnZW4nLCB7ICdDT05GSVJNX1RJVExFJzogJ0NvbmZpcm0nIH0pO1xyXG4gICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdydScsIHsgJ0NPTkZJUk1fVElUTEUnOiAn0J/QvtC00YLQstC10YDQtNC40YLQtSd9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKHRoaXMudGl0bGUpIHx8IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoJ0NPTkZJUk1fVElUTEUnKTtcclxuICAgICAgICAgICAgdGhpcy5vayA9IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUodGhpcy5vaykgfHwgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZSgnT0snKTtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwgPSBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKHRoaXMuY2FuY2VsKSB8fCAoJ0NBTkNFTCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRpdGxlIHx8ICdDb25maXJtJztcclxuICAgICAgICAgICAgdGhpcy5vayA9IHRoaXMub2sgfHwgJ09LJztcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwgPSB0aGlzLmNhbmNlbCB8fCAnQ2FuY2VsJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNhbmNlbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcENvbmZpcm1hdGlvbkRpYWxvZycpXHJcbiAgICAuY29udHJvbGxlcigncGlwQ29uZmlybWF0aW9uRGlhbG9nQ29udHJvbGxlcicsIENvbmZpcm1hdGlvbkRpYWxvZ0NvbnRyb2xsZXIpOyIsImV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25EaWFsb2dQYXJhbXMge1xyXG4gICAgLy8gTW91c2UgZXZlbnRcclxuICAgIHB1YmxpYyBldmVudD86IE1vdXNlRXZlbnQ7XHJcbiAgICAvLyBDb25maXJtIGJ1dHRvbiBjYXB0aW9uXHJcbiAgICBwdWJsaWMgb2s/OiBzdHJpbmc7XHJcbiAgICAvLyBEaWFsb2cgdGl0bGVcclxuICAgIHB1YmxpYyB0aXRsZT86IHN0cmluZzsgXHJcbiAgICAvLyBDYW5jZWwgYnV0dG9uIGNhcHRpb25cclxuICAgIHB1YmxpYyBjYW5jZWw/OiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nUGFyYW1zIH0gZnJvbSAnLi9Db25maXJtYXRpb25EaWFsb2dQYXJhbXMnO1xyXG5pbXBvcnQgeyBJQ29uZmlybWF0aW9uRGlhbG9nU2VydmljZSB9IGZyb20gJy4vSUNvbmZpcm1hdGlvbkRpYWxvZ1NlcnZpY2UnO1xyXG5cclxuY2xhc3MgQ29uZmlybWF0aW9uRGlhbG9nU2VydmljZSBpbXBsZW1lbnRzIElDb25maXJtYXRpb25EaWFsb2dTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX21kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigkbWREaWFsb2c6IGFuZ3VsYXIubWF0ZXJpYWwuSURpYWxvZ1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9tZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbXM6IENvbmZpcm1hdGlvbkRpYWxvZ1BhcmFtcywgc3VjY2Vzc0NhbGxiYWNrPzogKCkgPT4gdm9pZCwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiBwYXJhbXMuZXZlbnQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29uZmlybWF0aW9uL0NvbmZpcm1hdGlvbkRpYWxvZy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcENvbmZpcm1hdGlvbkRpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCcsXHJcbiAgICAgICAgICAgIGxvY2FsczogcGFyYW1zLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FuY2VsQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBDb25maXJtYXRpb25EaWFsb2cnKVxyXG4gICAgLnNlcnZpY2UoJ3BpcENvbmZpcm1hdGlvbkRpYWxvZycsIENvbmZpcm1hdGlvbkRpYWxvZ1NlcnZpY2UpOyIsImFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcENvbmZpcm1hdGlvbkRpYWxvZycsIFtcclxuICAgICAgICAnbmdNYXRlcmlhbCcsIFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRyYW5zbGF0ZScsXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL0NvbmZpcm1hdGlvbkRpYWxvZ1BhcmFtcyc7XHJcbmltcG9ydCAnLi9Db25maXJtYXRpb25EaWFsb2dDb250cm9sbGVyJztcclxuaW1wb3J0ICcuL0lDb25maXJtYXRpb25EaWFsb2dTZXJ2aWNlJztcclxuaW1wb3J0ICcuL0NvbmZpcm1hdGlvbkRpYWxvZ1NlcnZpY2UnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9JQ29uZmlybWF0aW9uRGlhbG9nU2VydmljZSc7XHJcbiIsIntcclxuXHJcbmZ1bmN0aW9uIHRyYW5zbGF0ZSgkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSkge1xyXG4gICAgdmFyIHBpcFRyYW5zbGF0ZTogcGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgXHJcbiAgICAgICAgPyA8cGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHBpcFRyYW5zbGF0ZSAgPyBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKGtleSkgfHwga2V5IDoga2V5O1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBEaWFsb2dzLlRyYW5zbGF0ZScsIFtdKVxyXG4gICAgLmZpbHRlcigndHJhbnNsYXRlJywgdHJhbnNsYXRlKTtcclxuXHJcbn0iLCJpbXBvcnQgeyBFcnJvckRldGFpbHNEaWFsb2dQYXJhbXMgfSBmcm9tICcuL0Vycm9yRGV0YWlsc0RpYWxvZ1BhcmFtcyc7XHJcblxyXG5jbGFzcyBFcnJvckRpYWxvZ1N0cmluZ3Mge1xyXG4gICAgcHVibGljIGVycm9yRGV0YWlsczogc3RyaW5nID0gJ0Vycm9yIGRldGFpbHMnO1xyXG4gICAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nID0gJ01lc3NhZ2UnO1xyXG4gICAgcHVibGljIGVycm9yQ29kZTogc3RyaW5nID0gJ0NvZGUnO1xyXG4gICAgcHVibGljIGVycm9yTWV0aG9kOiBzdHJpbmcgPSAnTWV0aG9kJztcclxuICAgIHB1YmxpYyBlcnJvclBhdGg6IHN0cmluZyA9ICdQYXRoJztcclxuICAgIHB1YmxpYyBlcnJvclRleHQ6IHN0cmluZyA9ICdFcnJvcic7ICAgXHJcbn1cclxuXHJcbmNsYXNzIEVycm9yRGV0YWlsc0RpYWxvZ0NvbnRyb2xsZXIgZXh0ZW5kcyBFcnJvckRldGFpbHNEaWFsb2dQYXJhbXMge1xyXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgJG1kRGlhbG9nOiBuZy5tYXRlcmlhbC5JRGlhbG9nU2VydmljZTtcclxuICAgIHB1YmxpYyB0aGVtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHN0cmluZ3M6IEVycm9yRGlhbG9nU3RyaW5ncztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkbWREaWFsb2c6IG5nLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSBcclxuICAgIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gbmV3IEVycm9yRGlhbG9nU3RyaW5ncygpO1xyXG4gICAgICAgIHRoaXMuX2luamVjdG9yID0gJGluamVjdG9yO1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nID0gJG1kRGlhbG9nO1xyXG4gICAgICAgIHRoaXMudGhlbWUgPSAkcm9vdFNjb3BlWyckdGhlbWUnXTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0VHJhbnNsYXRlKCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5lcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJzxub25lPic7ICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUcmFuc2xhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBpcFRyYW5zbGF0ZTogcGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlO1xyXG4gICAgICAgIHBpcFRyYW5zbGF0ZSA9IHRoaXMuX2luamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgXHJcbiAgICAgICAgICAgID8gPHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZT50aGlzLl9pbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHtcclxuICAgICAgICAgICAgICAgICdPSyc6ICdPaycsXHJcbiAgICAgICAgICAgICAgICAnQ0FOQ0VMJzogJ0NhbmNlbCcsXHJcbiAgICAgICAgICAgICAgICAnRVJST1JfREVUQUlMUyc6ICdFcnJvciBkZXRhaWxzJyxcclxuICAgICAgICAgICAgICAgICdDT0RFJzogJ0Vycm9yIGNvZGUnLFxyXG4gICAgICAgICAgICAgICAgJ1BBVEgnOiAnUGF0aCcsXHJcbiAgICAgICAgICAgICAgICAnRVJST1InOiAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ01FVEhPRCc6ICdNZXRob2QnLFxyXG4gICAgICAgICAgICAgICAgJ01FU1NBR0UnOiAnTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICAnRElTTUlTUyc6ICdEaXNtaXNzJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygncnUnLCB7XHJcbiAgICAgICAgICAgICAgICAnT0snOiAn0J7QuicsXHJcbiAgICAgICAgICAgICAgICAnQ0FOQ0VMJzogJ9Ce0YLQvNC10L3QsCcsXHJcbiAgICAgICAgICAgICAgICAnRVJST1JfREVUQUlMUyc6ICfQlNC10YLQsNC70Lgg0L7RiNC40LHQutC4JyxcclxuICAgICAgICAgICAgICAgICdDT0RFJzogJ9Ca0L7QtCDQvtGI0LjQsdC60LgnLFxyXG4gICAgICAgICAgICAgICAgJ1BBVEgnOiAn0J/Rg9GC0YwnLFxyXG4gICAgICAgICAgICAgICAgJ0VSUk9SJzogJ9Ce0YjQuNCx0LrQsCcsXHJcbiAgICAgICAgICAgICAgICAnTUVUSE9EJzogJ9Cc0LXRgtC+0LQnLFxyXG4gICAgICAgICAgICAgICAgJ01FU1NBR0UnOiAn0KHQvtC+0LHRidC10L3QuNC1J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kaXNtaXNzQnV0dG9uID0gcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZSh0aGlzLmRpc21pc3NCdXR0b24pIHx8IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoJ0RJU01JU1MnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RyaW5ncy5lcnJvckRldGFpbHMgPSBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKCdFUlJPUl9ERVRBSUxTJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaW5ncy5lcnJvck1lc3NhZ2UgPSBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKCdNRVNTQUdFJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaW5ncy5lcnJvckNvZGUgPSBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKCdDT0RFJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaW5ncy5lcnJvck1ldGhvZCA9IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoJ01FVEhPRCcpO1xyXG4gICAgICAgICAgICB0aGlzLnN0cmluZ3MuZXJyb3JQYXRoID0gcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZSgnUEFUSCcpO1xyXG4gICAgICAgICAgICB0aGlzLnN0cmluZ3MuZXJyb3JUZXh0ID0gcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZSgnRVJST1InKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRpc21pc3NCdXR0b24gPSB0aGlzLmRpc21pc3NCdXR0b24gfHwgJ0Rpc21pc3MnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIG9uT2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1N0cmluZyhlcnJvcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBfLmlzU3RyaW5nKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RXJyb3JUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGVycm9yOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChfLmlzU3RyaW5nKHRoaXMuZXJyb3IpKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvclxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYgKHRoaXMuZXJyb3IgJiYgdGhpcy5lcnJvci5lcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvci5lcnJvci50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5lcnJvciAmJiB0aGlzLmVycm9yLmRhdGEgJiYgdGhpcy5lcnJvci5kYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yLmRhdGEuZXJyb3IudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICc8bm9uZT4nO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwRXJyb3JEZXRhaWxzRGlhbG9nJylcclxuICAgIC5jb250cm9sbGVyKCdwaXBFcnJvckRldGFpbHNEaWFsb2dDb250cm9sbGVyJywgRXJyb3JEZXRhaWxzRGlhbG9nQ29udHJvbGxlcik7IiwiZXhwb3J0IGNsYXNzIEVycm9yRGV0YWlsc0RpYWxvZ1BhcmFtcyB7XHJcbiAgICAvLyBNb3VzZSBldmVudFxyXG4gICAgcHVibGljIGV2ZW50PzogTW91c2VFdmVudDtcclxuICAgIC8vIENsb3NlIGJ1dHRvbiBsYWJlbFxyXG4gICAgcHVibGljIGRpc21pc3NCdXR0b24/OiBzdHJpbmc7XHJcbiAgICAvLyBFcnJvciBvYmplY3Qgb3Igc3RyaW5nXHJcbiAgICBwdWJsaWMgZXJyb3I6IGFueTtcclxufSIsImltcG9ydCB7IEVycm9yRGV0YWlsc0RpYWxvZ1BhcmFtcyB9IGZyb20gJy4vRXJyb3JEZXRhaWxzRGlhbG9nUGFyYW1zJztcclxuaW1wb3J0IHsgSUVycm9yRGV0YWlsc0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL0lFcnJvckRldGFpbHNEaWFsb2dTZXJ2aWNlJztcclxuXHJcbmNsYXNzIEVycm9yRGV0YWlsc0RpYWxvZ1NlcnZpY2UgaW1wbGVtZW50cyBJRXJyb3JEZXRhaWxzRGlhbG9nU2VydmljZSB7XHJcbiAgICBwdWJsaWMgX21kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigkbWREaWFsb2c6IGFuZ3VsYXIubWF0ZXJpYWwuSURpYWxvZ1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9tZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNob3cocGFyYW1zOiBFcnJvckRldGFpbHNEaWFsb2dQYXJhbXMsIFxyXG4gICAgICAgIHN1Y2Nlc3NDYWxsYmFjaz86ICgpID0+IHZvaWQsIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgICB0aGlzLl9tZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IHBhcmFtcy5ldmVudCxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdlcnJvcl9kZXRhaWxzL0Vycm9yRGV0YWlsc0RpYWxvZy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcEVycm9yRGV0YWlsc0RpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCcsXHJcbiAgICAgICAgICAgIGxvY2FsczogcGFyYW1zLCBcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcclxuICAgICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3NDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYW5jZWxDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwRXJyb3JEZXRhaWxzRGlhbG9nJylcclxuICAgIC5zZXJ2aWNlKCdwaXBFcnJvckRldGFpbHNEaWFsb2cnLCBFcnJvckRldGFpbHNEaWFsb2dTZXJ2aWNlKTsiLCJhbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBFcnJvckRldGFpbHNEaWFsb2cnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLCBcclxuICAgICAgICAncGlwRGlhbG9ncy5UcmFuc2xhdGUnLFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9FcnJvckRldGFpbHNEaWFsb2dQYXJhbXMnO1xyXG5pbXBvcnQgJy4vRXJyb3JEZXRhaWxzRGlhbG9nU2VydmljZSc7XHJcbmltcG9ydCAnLi9FcnJvckRldGFpbHNEaWFsb2dDb250cm9sbGVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vRXJyb3JEZXRhaWxzRGlhbG9nUGFyYW1zJztcclxuZXhwb3J0ICogZnJvbSAnLi9JRXJyb3JEZXRhaWxzRGlhbG9nU2VydmljZSc7Iiwi77u/aW1wb3J0ICcuL2RlcGVuZGVuY2llcy9UcmFuc2xhdGVGaWx0ZXInO1xyXG5pbXBvcnQgJy4vZXJyb3JfZGV0YWlscyc7XHJcbmltcG9ydCAnLi9pbmZvcm1hdGlvbic7XHJcbmltcG9ydCAnLi9vcHRpb25zJztcclxuaW1wb3J0ICcuL29wdGlvbnNfYmlnJztcclxuaW1wb3J0ICcuL2NvbmZpcm1hdGlvbic7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBEaWFsb2dzJywgW1xyXG4gICAgICAgICdwaXBJbmZvcm1hdGlvbkRpYWxvZycsXHJcbiAgICAgICAgJ3BpcENvbmZpcm1hdGlvbkRpYWxvZycsXHJcbiAgICAgICAgJ3BpcE9wdGlvbnNEaWFsb2cnLFxyXG4gICAgICAgICdwaXBPcHRpb25zQmlnRGlhbG9nJyxcclxuICAgICAgICAncGlwRXJyb3JEZXRhaWxzRGlhbG9nJ1xyXG4gICAgXSk7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2Vycm9yX2RldGFpbHMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2luZm9ybWF0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb25maXJtYXRpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL29wdGlvbnMnO1xyXG5leHBvcnQgKiBmcm9tICcuL29wdGlvbnNfYmlnJztcclxuIiwiaW1wb3J0IHsgSW5mb3JtYXRpb25EaWFsb2dQYXJhbXMgfSBmcm9tICcuL0luZm9ybWF0aW9uRGlhbG9nUGFyYW1zJztcclxuXHJcbmNsYXNzIEluZm9ybWF0aW9uRGlhbG9nQ29udHJvbGxlciBleHRlbmRzIEluZm9ybWF0aW9uRGlhbG9nUGFyYW1zIHtcclxuICAgIHByaXZhdGUgX2luamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljICRtZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZTtcclxuICAgIHB1YmxpYyB0aGVtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGNvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkbWREaWFsb2c6IGFuZ3VsYXIubWF0ZXJpYWwuSURpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIFxyXG4gICAge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgc3VwZXIoKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2luamVjdG9yID0gJGluamVjdG9yO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRUcmFuc2xhdGUoKVxyXG5cclxuICAgICAgICB0aGlzLiRtZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgICAgICB0aGlzLnRoZW1lID0gJHJvb3RTY29wZVsnJHRoZW1lJ107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VHJhbnNsYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwaXBUcmFuc2xhdGU6IHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZTtcclxuICAgICAgICBwaXBUcmFuc2xhdGUgPSB0aGlzLl9pbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpIFxyXG4gICAgICAgICAgICA/IDxwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2U+dGhpcy5faW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgPSB0aGlzLm1lc3NhZ2U7XHJcbiAgICAgICAgbGV0IGl0ZW06IHN0cmluZztcclxuICAgICAgICBpZiAocGlwVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ2VuJywgeyAnSU5GT1JNQVRJT05fVElUTEUnOiAnSW5mb3JtYXRpb24nfSk7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1JywgeyAnSU5GT1JNQVRJT05fVElUTEUnOiAn0JjQvdGE0L7RgNC80LDRhtC40Y8nIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUodGhpcy50aXRsZSkgfHwgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZSgnSU5GT1JNQVRJT05fVElUTEUnKTtcclxuICAgICAgICAgICAgdGhpcy5vayA9IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUodGhpcy5vaykgfHwgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZSgnT0snKTtcclxuICAgICAgICAgICAgY29udGVudCA9IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoY29udGVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGl0bGUgfHwgJ0luZm9ybWF0aW9uJztcclxuICAgICAgICAgICAgdGhpcy5vayA9IHRoaXMub2sgfHwgJ09LJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwaXBGb3JtYXQ6IHBpcC5zZXJ2aWNlcy5JRm9ybWF0ID0gdGhpcy5faW5qZWN0b3IuaGFzKCdwaXBGb3JtYXQnKSBcclxuICAgICAgICAgICAgPyA8cGlwLnNlcnZpY2VzLklGb3JtYXQ+dGhpcy5faW5qZWN0b3IuZ2V0KCdwaXBGb3JtYXQnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLml0ZW0gJiYgcGlwRm9ybWF0KSB7XHJcbiAgICAgICAgICAgIC8vIGl0ZW0gPSBfLnRydW5jYXRlKHBhcmFtcy5pdGVtLCAyNSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBwaXBGb3JtYXQuc3ByaW50Zihjb250ZW50LCBpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2FuY2VsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwSW5mb3JtYXRpb25EaWFsb2cnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3BpcEluZm9ybWF0aW9uRGlhbG9nQ29udHJvbGxlcicsIEluZm9ybWF0aW9uRGlhbG9nQ29udHJvbGxlcik7IiwiZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uRGlhbG9nUGFyYW1zIHtcclxuICAgIC8vIE1vdXNlIGV2ZW50XHJcbiAgICBwdWJsaWMgZXZlbnQ/OiBNb3VzZUV2ZW50O1xyXG4gICAgLy8gQ29uZmlybSBidXR0b24gY2FwdGlvblxyXG4gICAgcHVibGljIG9rPzogc3RyaW5nO1xyXG4gICAgLy8gRGlhbG9nIHRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU/OiBzdHJpbmc7IFxyXG4gICAgLy8gRGlhbG9nIG1lc3NhZy4gWW91IGNhbiB1c2UgZm9ybWF0dGluZyBvcHRpb25zICglcywgJWQgZXRjLikuIFxyXG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIC8vIFBhcmFtZW50cnMgZm9yIG1lc3NhZ2Ugc3RyaW5nXHJcbiAgICBwdWJsaWMgaXRlbT86IGFueTtcclxufSIsImltcG9ydCB7IEluZm9ybWF0aW9uRGlhbG9nUGFyYW1zIH0gZnJvbSAnLi9JbmZvcm1hdGlvbkRpYWxvZ1BhcmFtcyc7XHJcbmltcG9ydCB7IElJbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL0lJbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UnO1xyXG5cclxuY2xhc3MgSW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlIGltcGxlbWVudHMgSUluZm9ybWF0aW9uRGlhbG9nU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9tZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fbWREaWFsb2cgPSAkbWREaWFsb2c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3cocGFyYW1zLCBzdWNjZXNzQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLCBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQpIHtcclxuICAgICAgICAgdGhpcy5fbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiBwYXJhbXMuZXZlbnQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaW5mb3JtYXRpb24vSW5mb3JtYXRpb25EaWFsb2cuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwaXBJbmZvcm1hdGlvbkRpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCcsXHJcbiAgICAgICAgICAgIGxvY2FsczogcGFyYW1zLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlXHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzc0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwSW5mb3JtYXRpb25EaWFsb2cnKVxyXG4gICAgLnNlcnZpY2UoJ3BpcEluZm9ybWF0aW9uRGlhbG9nJywgSW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlKTsiLCJhbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBJbmZvcm1hdGlvbkRpYWxvZycsIFtcclxuICAgICAgICAnbmdNYXRlcmlhbCcsXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVHJhbnNsYXRlJywgXHJcbiAgICAgICAgJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL0luZm9ybWF0aW9uRGlhbG9nUGFyYW1zJztcclxuaW1wb3J0ICcuL0luZm9ybWF0aW9uRGlhbG9nQ29udHJvbGxlcic7XHJcbmltcG9ydCAnLi9JbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UnO1xyXG5cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vSUluZm9ybWF0aW9uRGlhbG9nU2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vSW5mb3JtYXRpb25EaWFsb2dQYXJhbXMnO1xyXG4iLCJpbXBvcnQgeyBPcHRpb25zRGlhbG9nRGF0YSB9IGZyb20gJy4vT3B0aW9uc0RpYWxvZ0RhdGEnO1xyXG5pbXBvcnQgeyBPcHRpb25zRGlhbG9nUGFyYW1zIH0gZnJvbSAnLi9PcHRpb25zRGlhbG9nUGFyYW1zJztcclxuaW1wb3J0IHsgT3B0aW9uc0RpYWxvZ1Jlc3VsdCB9IGZyb20gJy4vT3B0aW9uc0RpYWxvZ1Jlc3VsdCc7XHJcblxyXG5jbGFzcyBPcHRpb25zRGlhbG9nQ29udHJvbGxlciBleHRlbmRzIE9wdGlvbnNEaWFsb2dQYXJhbXMge1xyXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZTtcclxuICAgIHB1YmxpYyAkbWREaWFsb2c6IGFuZ3VsYXIubWF0ZXJpYWwuSURpYWxvZ1NlcnZpY2U7XHJcbiAgICBwdWJsaWMgdGhlbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBvcHRpb25JbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRtZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZSxcclxuICAgICAgICAkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSwgXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIFxyXG4gICAge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZyA9ICRtZERpYWxvZztcclxuICAgICAgICB0aGlzLl9pbmplY3RvciA9ICRpbmplY3RvcjtcclxuICAgICAgICB0aGlzLnRoZW1lID0gJHJvb3RTY29wZVsnJHRoZW1lJ107XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRUcmFuc2xhdGUoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gXy5maW5kKHRoaXMub3B0aW9ucywge2FjdGl2ZTogdHJ1ZX0pIHx8IG51bGw7XHJcbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IHRoaXMuc2VsZWN0ZWRPcHRpb24gPyB0aGlzLnNlbGVjdGVkT3B0aW9uLm5hbWUgOiB0aGlzLnNlbGVjdGVkT3B0aW9uTmFtZTtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IF8uZmluZEluZGV4KHRoaXMub3B0aW9ucywgKG9wdDogT3B0aW9uc0RpYWxvZ0RhdGEpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdC5uYW1lID09IG5hbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25JbmRleCA9IGluZGV4ID09IC0xID8gMCA6IGluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSB0aGlzLm9wdGlvbnNbdGhpcy5vcHRpb25JbmRleF07XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbk5hbWUgPSB0aGlzLnNlbGVjdGVkT3B0aW9uLm5hbWU7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5mb2N1c0lucHV0LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFRyYW5zbGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcGlwVHJhbnNsYXRlOiBwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgICAgICAgcGlwVHJhbnNsYXRlID0gdGhpcy5faW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/IDxwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2U+dGhpcy5faW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChwaXBUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygnZW4nLCB7ICdPUFRJT05TX1RJVExFJzogJ0Nob29zZSBPcHRpb24nIH0pO1xyXG4gICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdydScsIHsgJ09QVElPTlNfVElUTEUnOiAn0JLRi9Cx0LXRgNC40YLQtSDQvtC/0YbQuNGOJyB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKHRoaXMudGl0bGUpIHx8IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoJ09QVElPTlNfVElUTEUnKTtcclxuICAgICAgICAgICAgdGhpcy5vayA9IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUodGhpcy5vaykgfHwgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZSgnU0VMRUNUJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGl0bGUgfHwgJ0Nob29zZSBPcHRpb24nO1xyXG4gICAgICAgICAgICB0aGlzLm9rID0gdGhpcy5vayB8fCAnU2VsZWN0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNhbmNlbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PcHRpb25TZWxlY3QoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIG9wdGlvbjogT3B0aW9uc0RpYWxvZ0RhdGEpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uTmFtZSA9IG9wdGlvbi5uYW1lO1xyXG4gICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIHB1YmxpYyBvbktleVByZXNzIChldmVudDogSlF1ZXJ5S2V5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0KCkge1xyXG4gICAgICAgIGxldCBvcHRpb246IE9wdGlvbnNEaWFsb2dEYXRhO1xyXG4gICAgICAgIG9wdGlvbiA9IF8uZmluZCh0aGlzLm9wdGlvbnMsIHsgbmFtZTogdGhpcy5zZWxlY3RlZE9wdGlvbk5hbWUgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmhpZGUoeyBvcHRpb246IG9wdGlvbiwgaXNDaGVja2JveE9wdGlvbjogdGhpcy5pc0NoZWNrYm94T3B0aW9uIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9jdXNJbnB1dCgpIHtcclxuICAgICAgICBsZXQgbGlzdDtcclxuICAgICAgICBsaXN0ID0gJCgnLnBpcC1vcHRpb25zLWRpYWxvZyAucGlwLWxpc3QnKTtcclxuICAgICAgICBsaXN0LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBPcHRpb25zRGlhbG9nJylcclxuICAgIC5jb250cm9sbGVyKCdwaXBPcHRpb25zRGlhbG9nQ29udHJvbGxlcicsIE9wdGlvbnNEaWFsb2dDb250cm9sbGVyKTsiLCJcclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNEaWFsb2dEYXRhIHtcclxuICAgIHB1YmxpYyBpY29uOiBzdHJpbmcgPSAnc3Rhcic7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTsgXHJcbn1cclxuIiwiaW1wb3J0IHsgT3B0aW9uc0RpYWxvZ0RhdGEgfSBmcm9tICcuL09wdGlvbnNEaWFsb2dEYXRhJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zRGlhbG9nUGFyYW1zIHtcclxuICAgIC8vIE1vdXNlIGV2ZW50XHJcbiAgICBwdWJsaWMgZXZlbnQ/OiBNb3VzZUV2ZW50O1xyXG4gICAgLy8gRGlhbG9nIHRpdGxlIFxyXG4gICAgcHVibGljIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgLy8gY29uZmlybSBidXR0b24gdGl0bGVcclxuICAgIHB1YmxpYyBvaz86IHN0cmluZztcclxuICAgIC8vIERpYWxvZyBvcHRpb25zIGFycmF5XHJcbiAgICBwdWJsaWMgb3B0aW9ucz86IE9wdGlvbnNEaWFsb2dEYXRhW107XHJcbiAgICAvLyBTZWxlY3RlZCBvcHRpb24gYnkgZGVmYXVsdFxyXG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uPzogT3B0aW9uc0RpYWxvZ0RhdGE7XHJcbiAgICAvLyBTZWxlY3RlZCBPcHRpb24gTmFtZVxyXG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uTmFtZT86IHN0cmluZztcclxuICAgIC8vIFZhbHVlIGZvciBjaGVja2JveCBvcHRpb25cclxuICAgIHB1YmxpYyBpc0NoZWNrYm94T3B0aW9uPzogYm9vbGVhbjtcclxuICAgIC8vIENoZWNrYm94IGNhcHRpb24sIENoZWNrYm94IHZpc2libGUgaWYgY2FwdGlvbiBpcyBzZXRcclxuICAgIHB1YmxpYyBjaGVja2JveE9wdGlvbkNhcHRpb24/OiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgT3B0aW9uc0RpYWxvZ0RhdGEgfSBmcm9tICcuL09wdGlvbnNEaWFsb2dEYXRhJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zRGlhbG9nUmVzdWx0IHtcclxuICAgIHB1YmxpYyBvcHRpb246IE9wdGlvbnNEaWFsb2dEYXRhO1xyXG4gICAgcHVibGljIGlzQ2hlY2tib3hPcHRpb246IGJvb2xlYW47XHJcbn1cclxuIiwiaW1wb3J0IHsgT3B0aW9uc0RpYWxvZ1BhcmFtcyB9IGZyb20gJy4vT3B0aW9uc0RpYWxvZ1BhcmFtcyc7XHJcbmltcG9ydCB7IE9wdGlvbnNEaWFsb2dSZXN1bHQgfSBmcm9tICcuL09wdGlvbnNEaWFsb2dSZXN1bHQnO1xyXG5pbXBvcnQgeyBJT3B0aW9uc0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL0lPcHRpb25zRGlhbG9nU2VydmljZSc7XHJcblxyXG5jbGFzcyBPcHRpb25zRGlhbG9nU2VydmljZSBpbXBsZW1lbnRzIElPcHRpb25zRGlhbG9nU2VydmljZSB7XHJcbiAgICBwdWJsaWMgX21kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCRtZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX21kRGlhbG9nID0gJG1kRGlhbG9nO1xyXG4gICAgfVxyXG4gICAgcHVibGljICBzaG93KHBhcmFtczogT3B0aW9uc0RpYWxvZ1BhcmFtcywgXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrPzogKHJlc3VsdDogT3B0aW9uc0RpYWxvZ1Jlc3VsdCkgPT4gdm9pZCwgXHJcbiAgICAgICAgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogYW55IHtcclxuICAgICAgICBcclxuICAgICAgICAgdGhpcy5fbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiBwYXJhbXMuZXZlbnQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnb3B0aW9ucy9PcHRpb25zRGlhbG9nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncGlwT3B0aW9uc0RpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCcsXHJcbiAgICAgICAgICAgIGxvY2FsczogcGFyYW1zLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlXHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogT3B0aW9uc0RpYWxvZ1Jlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzc0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbmNlbENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBPcHRpb25zRGlhbG9nJylcclxuICAgIC5zZXJ2aWNlKCdwaXBPcHRpb25zRGlhbG9nJywgT3B0aW9uc0RpYWxvZ1NlcnZpY2UpOyIsImFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE9wdGlvbnNEaWFsb2cnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLCBcclxuICAgICAgICAncGlwRGlhbG9ncy5UcmFuc2xhdGUnLFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9PcHRpb25zRGlhbG9nRGF0YSc7XHJcbmltcG9ydCAnLi9PcHRpb25zRGlhbG9nUGFyYW1zJztcclxuaW1wb3J0ICcuL09wdGlvbnNEaWFsb2dSZXN1bHQnO1xyXG5pbXBvcnQgJy4vT3B0aW9uc0RpYWxvZ0NvbnRyb2xsZXInO1xyXG5pbXBvcnQgJy4vT3B0aW9uc0RpYWxvZ1NlcnZpY2UnO1xyXG5cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vT3B0aW9uc0RpYWxvZ0RhdGEnO1xyXG5leHBvcnQgKiBmcm9tICcuL09wdGlvbnNEaWFsb2dQYXJhbXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL09wdGlvbnNEaWFsb2dSZXN1bHQnO1xyXG5leHBvcnQgKiBmcm9tICcuL09wdGlvbnNEaWFsb2dTZXJ2aWNlJztcclxuIiwiaW1wb3J0IHsgT3B0aW9uc0JpZ0RpYWxvZ1BhcmFtcyB9IGZyb20gJy4vT3B0aW9uc0JpZ0RpYWxvZ1BhcmFtcyc7XHJcbmltcG9ydCB7IE9wdGlvbnNCaWdEaWFsb2dEYXRhIH0gZnJvbSAnLi9PcHRpb25zQmlnRGlhbG9nRGF0YSc7XHJcblxyXG5jbGFzcyBPcHRpb25zQmlnRGlhbG9nQ29udHJvbGxlciBleHRlbmRzIE9wdGlvbnNCaWdEaWFsb2dQYXJhbXMge1xyXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZTtcclxuICAgIHByaXZhdGUgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyB0aGVtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIG9wdGlvbkluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJG1kRGlhbG9nOiBhbmd1bGFyLm1hdGVyaWFsLklEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLCBcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkgXHJcbiAgICB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nID0gJG1kRGlhbG9nO1xyXG4gICAgICAgIHRoaXMuX2luamVjdG9yID0gJGluamVjdG9yO1xyXG4gICAgICAgIHRoaXMudGhlbWUgPSAkcm9vdFNjb3BlWyckdGhlbWUnXTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0VHJhbnNsYXRlKClcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9IF8uZmluZCh0aGlzLm9wdGlvbnMsIHthY3RpdmU6IHRydWV9KSB8fCBudWxsO1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSB0aGlzLnNlbGVjdGVkT3B0aW9uID8gdGhpcy5zZWxlY3RlZE9wdGlvbi5uYW1lIDogdGhpcy5zZWxlY3RlZE9wdGlvbk5hbWU7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBfLmZpbmRJbmRleCh0aGlzLm9wdGlvbnMsIChvcHQ6IE9wdGlvbnNCaWdEaWFsb2dEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHQubmFtZSA9PSBuYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3B0aW9uSW5kZXggPSBpbmRleCA9PSAtMSA/IDAgOiBpbmRleDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdGhpcy5vcHRpb25zW3RoaXMub3B0aW9uSW5kZXhdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25OYW1lID0gdGhpcy5zZWxlY3RlZE9wdGlvbi5uYW1lO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZm9jdXNJbnB1dCwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUcmFuc2xhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBpcFRyYW5zbGF0ZTogcGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlO1xyXG4gICAgICAgIHBpcFRyYW5zbGF0ZSA9IHRoaXMuX2luamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgXHJcbiAgICAgICAgICAgID8gPHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZT50aGlzLl9pbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHsgJ09QVElPTlNfVElUTEUnOiAnQ2hvb3NlIE9wdGlvbicgfSk7XHJcbiAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1JywgeyAnT1BUSU9OU19USVRMRSc6ICfQktGL0LHQtdGA0LjRgtC1INC+0L/RhtC40Y4nIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9ICBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKHRoaXMudGl0bGUpIHx8IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoJ09QVElPTlNfVElUTEUnKTtcclxuICAgICAgICAgICAgdGhpcy5vayA9IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUodGhpcy5vaykgfHwgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZSgnU0VMRUNUJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGl0bGUgfHwgJ0Nob29zZSBPcHRpb24nO1xyXG4gICAgICAgICAgICB0aGlzLm9rID0gdGhpcy5vayB8fCAnU2VsZWN0JztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2FuY2VsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk9wdGlvblNlbGVjdChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgb3B0aW9uOiBPcHRpb25zQmlnRGlhbG9nRGF0YSkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25OYW1lID0gb3B0aW9uLm5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5vQWN0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblNlbGVjdGVkKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25OYW1lID0gdGhpcy5vcHRpb25zW3RoaXMub3B0aW9uSW5kZXhdLm5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5vQWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbktleVVwKGV2ZW50OiBKUXVlcnlLZXlFdmVudE9iamVjdCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggPiAtMSAmJiBpbmRleCA8IHRoaXMub3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25OYW1lID0gdGhpcy5vcHRpb25zW2luZGV4XS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgb25TZWxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbjogT3B0aW9uc0JpZ0RpYWxvZ0RhdGE7XHJcbiAgICAgICAgb3B0aW9uID0gPE9wdGlvbnNCaWdEaWFsb2dEYXRhPl8uZmluZCh0aGlzLm9wdGlvbnMsIHsgbmFtZTogdGhpcy5zZWxlY3RlZE9wdGlvbk5hbWUgfSkgfHwgbmV3IE9wdGlvbnNCaWdEaWFsb2dEYXRhKCk7XHJcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSh7IG9wdGlvbjogb3B0aW9uIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGZvY3VzSW5wdXQoKSB7XHJcbiAgICAgICAgbGV0IGxpc3Q7XHJcbiAgICAgICAgbGlzdCA9ICQoJy5waXAtb3B0aW9ucy1kaWFsb2cgLnBpcC1saXN0Jyk7XHJcbiAgICAgICAgbGlzdC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwT3B0aW9uc0JpZ0RpYWxvZycpXHJcbiAgICAuY29udHJvbGxlcigncGlwT3B0aW9uc0JpZ0RpYWxvZ0NvbnRyb2xsZXInLCBPcHRpb25zQmlnRGlhbG9nQ29udHJvbGxlcik7XHJcbiIsImV4cG9ydCBjbGFzcyBPcHRpb25zQmlnRGlhbG9nRGF0YSB7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3VidGl0bGU6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBPcHRpb25zQmlnRGlhbG9nRGF0YSB9IGZyb20gJy4vT3B0aW9uc0JpZ0RpYWxvZ0RhdGEnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNCaWdEaWFsb2dQYXJhbXMge1xyXG4gICAgLy8gTW91c2UgZXZlbnRcclxuICAgIHB1YmxpYyBldmVudD86IE1vdXNlRXZlbnQ7ICAgXHJcbiAgICAvLyBEaWFsb2cgdGl0bGUgXHJcbiAgICBwdWJsaWMgdGl0bGU/OiBzdHJpbmc7ICBcclxuICAgIC8vIGNvbmZpcm0gYnV0dG9uIHRpdGxlXHJcbiAgICBwdWJsaWMgb2s/OiBzdHJpbmc7XHJcbiAgICAvLyBEaWFsb2cgb3B0aW9ucyBhcnJheVxyXG4gICAgcHVibGljIG9wdGlvbnM/OiBPcHRpb25zQmlnRGlhbG9nRGF0YVtdO1xyXG4gICAgLy8gU2VsZWN0ZWQgb3B0aW9uIGJ5IGRlZmF1bHRcclxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbj86IE9wdGlvbnNCaWdEaWFsb2dEYXRhO1xyXG4gICAgLy8gU2VsZWN0ZWQgT3B0aW9uIE5hbWVcclxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbk5hbWU/OiBzdHJpbmc7ICAgIFxyXG4gICAgLy8gRGlhbG9nIGhpbnQgdGl0bGVcclxuICAgIHB1YmxpYyBoaW50Pzogc3RyaW5nO1xyXG4gICAgLy8gU2hvdyB0aXRsZVxyXG4gICAgcHVibGljIG5vVGl0bGU7XHJcbiAgICAvLyBTaG93IGFjdGlvbiBidXR0b25cclxuICAgIHB1YmxpYyBub0FjdGlvbnM7XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IE9wdGlvbnNCaWdEaWFsb2dEYXRhIH0gZnJvbSAnLi9PcHRpb25zQmlnRGlhbG9nRGF0YSc7XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9uc0JpZ0RpYWxvZ1Jlc3VsdCB7XHJcbiAgICBwdWJsaWMgb3B0aW9uOiBPcHRpb25zQmlnRGlhbG9nRGF0YTtcclxuICAgIHB1YmxpYyBpc0NoZWNrYm94T3B0aW9uOiBib29sZWFuO1xyXG59XHJcbiIsImltcG9ydCB7IE9wdGlvbnNCaWdEaWFsb2dQYXJhbXMgfSBmcm9tICcuL09wdGlvbnNCaWdEaWFsb2dQYXJhbXMnO1xyXG5pbXBvcnQgeyBPcHRpb25zQmlnRGlhbG9nUmVzdWx0IH0gZnJvbSAnLi9PcHRpb25zQmlnRGlhbG9nUmVzdWx0JztcclxuaW1wb3J0IHsgSU9wdGlvbnNCaWdEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9JT3B0aW9uc0JpZ0RpYWxvZ1NlcnZpY2UnO1xyXG5cclxuY2xhc3MgT3B0aW9uc0JpZ0RpYWxvZ1NlcnZpY2UgaW1wbGVtZW50cyBJT3B0aW9uc0JpZ0RpYWxvZ1NlcnZpY2Uge1xyXG4gICAgcHVibGljIF9tZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZTtcclxuICAgIGNvbnN0cnVjdG9yKCRtZERpYWxvZzogYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX21kRGlhbG9nID0gJG1kRGlhbG9nO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3cocGFyYW1zLCBzdWNjZXNzQ2FsbGJhY2s/OiAocmVzdWx0OiBPcHRpb25zQmlnRGlhbG9nUmVzdWx0KSA9PiB2b2lkLCBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQpOiBhbnkge1xyXG4gICAgICAgICB0aGlzLl9tZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IHBhcmFtcy5ldmVudCxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdvcHRpb25zX2JpZy9PcHRpb25zQmlnRGlhbG9nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncGlwT3B0aW9uc0JpZ0RpYWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCcsXHJcbiAgICAgICAgICAgIGxvY2FsczogcGFyYW1zLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLCAgICAgICAgXHJcbiAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWVcclxuICAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzdWx0OiBPcHRpb25zQmlnRGlhbG9nUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FuY2VsQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBPcHRpb25zQmlnRGlhbG9nJylcclxuICAgIC5zZXJ2aWNlKCdwaXBPcHRpb25zQmlnRGlhbG9nJywgT3B0aW9uc0JpZ0RpYWxvZ1NlcnZpY2UpOyIsImFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE9wdGlvbnNCaWdEaWFsb2cnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLCBcclxuICAgICAgICAncGlwRGlhbG9ncy5UcmFuc2xhdGUnLFxyXG4gICAgICAgICdwaXBEaWFsb2dzLlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9PcHRpb25zQmlnRGlhbG9nUGFyYW1zJztcclxuaW1wb3J0ICcuL09wdGlvbnNCaWdEaWFsb2dEYXRhJztcclxuaW1wb3J0ICcuL09wdGlvbnNCaWdEaWFsb2dSZXN1bHQnO1xyXG5pbXBvcnQgJy4vT3B0aW9uc0JpZ0RpYWxvZ0NvbnRyb2xsZXInO1xyXG5pbXBvcnQgJy4vT3B0aW9uc0JpZ0RpYWxvZ1NlcnZpY2UnO1xyXG5cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vT3B0aW9uc0JpZ0RpYWxvZ1BhcmFtcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vT3B0aW9uc0JpZ0RpYWxvZ0RhdGEnO1xyXG5leHBvcnQgKiBmcm9tICcuL09wdGlvbnNCaWdEaWFsb2dSZXN1bHQnO1xyXG5leHBvcnQgKiBmcm9tICcuL0lPcHRpb25zQmlnRGlhbG9nU2VydmljZSc7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2NvbmZpcm1hdGlvbi9Db25maXJtYXRpb25EaWFsb2cuaHRtbCcsXG4gICAgJzxtZC1kaWFsb2cgY2xhc3M9XCJwaXAtZGlhbG9nIHBpcC1jb25maXJtYXRpb24tZGlhbG9nIGxheW91dC1jb2x1bW5cIiB3aWR0aD1cIjQwMFwiIG1kLXRoZW1lPVwie3sgOjokY3RybC50aGVtZSB9fVwiPjxkaXYgY2xhc3M9XCJwaXAtaGVhZGVyXCI+PGgzPnt7IDo6ICRjdHJsLnRpdGxlIH19PC9oMz48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWZvb3RlclwiPjxkaXY+PG1kLWJ1dHRvbiBuZy1jbGljaz1cIiRjdHJsLm9uQ2FuY2VsKClcIj57eyA6OiAkY3RybC5jYW5jZWwgfX08L21kLWJ1dHRvbj48bWQtYnV0dG9uIGNsYXNzPVwibWQtYWNjZW50XCIgbmctY2xpY2s9XCIkY3RybC5vbk9rKClcIj57eyA6OiAkY3RybC5vayB9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjwvbWQtZGlhbG9nPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZXJyb3JfZGV0YWlscy9FcnJvckRldGFpbHNEaWFsb2cuaHRtbCcsXG4gICAgJzxtZC1kaWFsb2cgY2xhc3M9XCJwaXAtZGlhbG9nIHBpcC1lcnJvci1kZXRhaWxzLWRpYWxvZyBsYXlvdXQtY29sdW1uXCIgd2lkdGg9XCI0MDBcIiBtZC10aGVtZT1cInt7ICRjdHJsLnRoZW1lIH19XCI+PGRpdiBjbGFzcz1cInBpcC1ib2R5XCI+PGRpdiBjbGFzcz1cInBpcC1oZWFkZXJcIj48aDM+e3sgOjokY3RybC5zdHJpbmdzLmVycm9yRGV0YWlscyB8IHRyYW5zbGF0ZSB9fTwvaDM+PC9kaXY+PGRpdiBjbGFzcz1cImxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlciBlcnJvci1zZWN0aW9uIHRleHQtYm9keTIgY29sb3Itc2Vjb25kYXJ5LXRleHRcIiBuZy1pZj1cIiRjdHJsLmVycm9yLmNvZGUgfHwgKCRjdHJsLmVycm9yLmRhdGEgJiYgJGN0cmwuZXJyb3IuZGF0YS5jb2RlKVwiPnt7IDo6JGN0cmwuc3RyaW5ncy5lcnJvckNvZGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cIiRjdHJsLmVycm9yLmNvZGUgfHwgKCRjdHJsLmVycm9yLmRhdGEgJiYgJGN0cmwuZXJyb3IuZGF0YS5jb2RlKVwiPnt7ICRjdHJsLmVycm9yLmNvZGUgfHwgJGN0cmwuZXJyb3IuZGF0YS5jb2RlIH19PC9kaXY+PGRpdiBjbGFzcz1cImxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlciBlcnJvci1zZWN0aW9uIHRleHQtYm9keTIgY29sb3Itc2Vjb25kYXJ5LXRleHRcIiBuZy1pZj1cIiRjdHJsLmVycm9yLnBhdGggfHwgKCRjdHJsLmVycm9yLmRhdGEgJiYgJGN0cmwuZXJyb3IuZGF0YS5wYXRoKVwiPnt7IDo6JGN0cmwuc3RyaW5ncy5lcnJvclBhdGggfCB0cmFuc2xhdGUgfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cIiRjdHJsLmVycm9yLnBhdGggfHwgKCRjdHJsLmVycm9yLmRhdGEgJiYgJGN0cmwuZXJyb3IuZGF0YS5wYXRoKVwiPnt7ICRjdHJsLmVycm9yLnBhdGggfHwgJGN0cmwuZXJyb3IuZGF0YS5wYXRoIH19PC9kaXY+PGRpdiBjbGFzcz1cImVycm9yLXNlY3Rpb24gdGV4dC1ib2R5MiBjb2xvci1zZWNvbmRhcnktdGV4dCBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIiBuZy1pZj1cIiRjdHJsLmlzU3RyaW5nKCRjdHJsLmVycm9yKSB8fCAkY3RybC5lcnJvci5lcnJvciB8fCAoJGN0cmwuZXJyb3IuZGF0YSAmJiAkY3RybC5lcnJvci5kYXRhLmVycm9yKVwiPnt7IDo6JGN0cmwuc3RyaW5ncy5lcnJvclRleHQgfCB0cmFuc2xhdGUgfX08L2Rpdj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHRleHQtc3ViaGVhZDFcIiBuZy1pZj1cIiRjdHJsLmVycm9yLmVycm9yIHx8ICgkY3RybC5lcnJvci5kYXRhICYmICRjdHJsLmVycm9yLmRhdGEuZXJyb3IpXCI+e3sgJGN0cmwuZ2V0RXJyb3JUZXh0KCkgfX08L2Rpdj48ZGl2IGNsYXNzPVwiZXJyb3Itc2VjdGlvbiB0ZXh0LWJvZHkyIGNvbG9yLXNlY29uZGFyeS10ZXh0IGxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlclwiIG5nLWlmPVwiJGN0cmwuZXJyb3IubWV0aG9kIHx8ICgkY3RybC5lcnJvci5kYXRhICYmICRjdHJsLmVycm9yLmRhdGEubWV0aG9kKVwiPnt7IDo6JGN0cmwuc3RyaW5ncy5lcnJvck1ldGhvZCB8IHRyYW5zbGF0ZSB9fTwvZGl2PjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgdGV4dC1zdWJoZWFkMVwiIG5nLWlmPVwiJGN0cmwuZXJyb3IubWV0aG9kIHx8ICgkY3RybC5lcnJvci5kYXRhICYmICRjdHJsLmVycm9yLmRhdGEubWV0aG9kKVwiPnt7ICRjdHJsLmVycm9yLm1ldGhvZCB8fCAkY3RybC5lcnJvci5kYXRhLm1ldGhvZCB9fTwvZGl2PjxkaXYgY2xhc3M9XCJlcnJvci1zZWN0aW9uIHRleHQtYm9keTIgY29sb3Itc2Vjb25kYXJ5LXRleHQgbGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyXCIgbmctaWY9XCIkY3RybC5lcnJvci5tZXNzYWdlIHx8ICgkY3RybC5lcnJvci5kYXRhICYmICRjdHJsLmVycm9yLmRhdGEubWVzc2FnZSlcIj57eyA6OiRjdHJsLnN0cmluZ3MuZXJyb3JNZXNzYWdlIHwgdHJhbnNsYXRlIH19PC9kaXY+PGRpdiBjbGFzcz1cImxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlciB0ZXh0LXN1YmhlYWQxXCIgbmctaWY9XCIkY3RybC5lcnJvci5tZXNzYWdlIHx8ICgkY3RybC5lcnJvci5kYXRhICYmICRjdHJsLmVycm9yLmRhdGEubWVzc2FnZSlcIj57eyAkY3RybC5lcnJvci5tZXNzYWdlIHx8ICRjdHJsLmVycm9yLmRhdGEubWVzc2FnZSB9fTwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZm9vdGVyXCI+PGRpdj48bWQtYnV0dG9uIGNsYXNzPVwibWQtYWNjZW50IG0wXCIgbmctY2xpY2s9XCIkY3RybC5vbk9rKClcIj57eyA6OiRjdHJsLmRpc21pc3NCdXR0b24gfCB0cmFuc2xhdGUgfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48L21kLWRpYWxvZz4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2luZm9ybWF0aW9uL0luZm9ybWF0aW9uRGlhbG9nLmh0bWwnLFxuICAgICc8bWQtZGlhbG9nIGNsYXNzPVwicGlwLWRpYWxvZyBwaXAtaW5mb3JtYXRpb24tZGlhbG9nIGxheW91dC1jb2x1bW5cIiB3aWR0aD1cIjQwMFwiIG1kLXRoZW1lPVwie3sgJGN0cmwudGhlbWUgfX1cIj48ZGl2IGNsYXNzPVwicGlwLWhlYWRlclwiPjxoMz57ezo6ICRjdHJsLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9oMz48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWJvZHlcIj48ZGl2IGNsYXNzPVwicGlwLWNvbnRlbnRcIj57eyAkY3RybC5jb250ZW50IH19PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1mb290ZXJcIj48ZGl2PjxtZC1idXR0b24gY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cIiRjdHJsLm9uT2soKVwiPnt7ICRjdHJsLm9rIHwgdHJhbnNsYXRlIH19PC9tZC1idXR0b24+PC9kaXY+PC9kaXY+PC9tZC1kaWFsb2c+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcERpYWxvZ3MuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdvcHRpb25zL09wdGlvbnNEaWFsb2cuaHRtbCcsXG4gICAgJzxtZC1kaWFsb2cgY2xhc3M9XCJwaXAtZGlhbG9nIHBpcC1vcHRpb25zLWRpYWxvZyBsYXlvdXQtY29sdW1uXCIgbWluLXdpZHRoPVwiNDAwXCIgbWQtdGhlbWU9XCJ7eyAkY3RybC50aGVtZSB9fVwiPjxtZC1kaWFsb2ctY29udGVudCBjbGFzcz1cInBpcC1ib2R5IGxwMCB0cDAgcnAwIGJwMjQgcGlwLXNjcm9sbFwiPjxkaXYgY2xhc3M9XCJwaXAtaGVhZGVyXCI+PGgzPnt7IDo6JGN0cmwudGl0bGUgfCB0cmFuc2xhdGUgfX08L2gzPjxkaXYgbmctc2hvdz1cIiRjdHJsLmNoZWNrYm94T3B0aW9uQ2FwdGlvblwiIGNsYXNzPVwiaGVhZGVyLW9wdGlvbiB0ZXh0LXN1YmhlYWQxIGRpdmlkZXItYm90dG9tXCI+PG1kLWNoZWNrYm94IG5nLW1vZGVsPVwiJGN0cmwuaXNDaGVja2JveE9wdGlvblwiIGFyaWEtbGFiZWw9XCJDSEVDS0JPWFwiPnt7IDo6JGN0cmwuY2hlY2tib3hPcHRpb25DYXB0aW9uIHwgdHJhbnNsYXRlIH19PC9tZC1jaGVja2JveD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWNvbnRlbnRcIj48bWQtcmFkaW8tZ3JvdXAgbmctbW9kZWw9XCIkY3RybC5zZWxlY3RlZE9wdGlvbk5hbWVcIiBjbGFzcz1cInBpcC1saXN0IG1kLXByaW1hcnlcIiBtZC1uby1pbms9XCJ0cnVlXCIgbmcta2V5cHJlc3M9XCIkY3RybC5vbktleVByZXNzKCRldmVudClcIiB0YWJpbmRleD1cIjBcIj48ZGl2IG5nLXJlcGVhdD1cIm9wdGlvbiBpbiAkY3RybC5vcHRpb25zXCIgY2xhc3M9XCJwaXAtbGlzdC1pdGVtXCIgbWQtaW5rLXJpcHBsZT1cIlwiIHVpLWV2ZW50PVwieyBjbGljazogXFwnJGN0cmwub25PcHRpb25TZWxlY3QoJGV2ZW50LCBvcHRpb24pXFwnIH1cIiBuZy1jbGFzcz1cInsgc2VsZWN0ZWQ6IG9wdGlvbi5uYW1lID09ICRjdHJsLnNlbGVjdGVkT3B0aW9uTmFtZSB9XCI+PGRpdiBjbGFzcz1cInBpcC1saXN0LWl0ZW0gaXRlbS1wYWRkaW5nXCI+PG1kLWljb24gY2xhc3M9XCJwaXAtb3B0aW9uLWljb25cIiBtZC1zdmctaWNvbj1cImljb25zOnt7IG9wdGlvbi5pY29uIH19XCIgbmctaWY9XCJvcHRpb24uaWNvblwiPjwvbWQtaWNvbj48ZGl2IGNsYXNzPVwicGlwLW9wdGlvbi10aXRsZVwiPnt7IDo6b3B0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9kaXY+PG1kLXJhZGlvLWJ1dHRvbiBuZy12YWx1ZT1cIm9wdGlvbi5uYW1lXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtbGFiZWw9XCJ7eyA6Om9wdGlvbi50aXRsZSB8IHRyYW5zbGF0ZSB9fVwiPjwvbWQtcmFkaW8tYnV0dG9uPjwvZGl2PjwvZGl2PjwvbWQtcmFkaW8tZ3JvdXA+PC9kaXY+PC9tZC1kaWFsb2ctY29udGVudD48ZGl2IGNsYXNzPVwicGlwLWZvb3RlclwiPjxkaXY+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1jYW5jZWxcIiBuZy1jbGljaz1cIiRjdHJsLm9uQ2FuY2VsKClcIj57eyA6OlxcJ0NBTkNFTFxcJyB8IHRyYW5zbGF0ZSB9fTwvbWQtYnV0dG9uPjxtZC1idXR0b24gY2xhc3M9XCJwaXAtc3VibWl0IG1kLWFjY2VudFwiIG5nLWNsaWNrPVwiJGN0cmwub25TZWxlY3QoKVwiPnt7IDo6JGN0cmwub2sgfCB0cmFuc2xhdGUgfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48L21kLWRpYWxvZz4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBEaWFsb2dzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRGlhbG9ncy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ29wdGlvbnNfYmlnL09wdGlvbnNCaWdEaWFsb2cuaHRtbCcsXG4gICAgJzxtZC1kaWFsb2cgY2xhc3M9XCJwaXAtZGlhbG9nIHBpcC1vcHRpb25zLWRpYWxvZy1iaWcgbGF5b3V0LWNvbHVtblwiIG1pbi13aWR0aD1cIjQwMFwiIG1kLXRoZW1lPVwie3sgJGN0cmwudGhlbWUgfX1cIj48bWQtZGlhbG9nLWNvbnRlbnQgY2xhc3M9XCJwaXAtYm9keSBwaXAtc2Nyb2xsXCIgbmctY2xhc3M9XCJ7XFwnYnAyNFxcJzogISRjdHJsLm5vQWN0aW9uc31cIj48ZGl2IGNsYXNzPVwicGlwLWhlYWRlclwiIG5nLWNsYXNzPVwie1xcJ2hlYWRlci1oaW50XFwnOiAkY3RybC5ub1RpdGxlICYmICRjdHJsLmhpbnR9XCI+PGgzIGNsYXNzPVwibTBcIiBuZy1pZj1cIiEkY3RybC5ub1RpdGxlXCI+e3sgOjokY3RybC50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvaDM+PGRpdiBuZy1zaG93PVwiJGN0cmwubm9UaXRsZSAmJiAkY3RybC5oaW50XCIgY2xhc3M9XCJkaWFsb2ctaGludCBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIj48ZGl2IGNsYXNzPVwiaGludC1pY29uLWNvbnRhaW5lciBmbGV4LWZpeGVkXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczppbmZvLWNpcmNsZS1vdXRsaW5lXCI+PC9tZC1pY29uPjwvZGl2PjxkaXY+e3sgOjokY3RybC5oaW50IHwgdHJhbnNsYXRlIH19PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImNvbnRlbnQtZGl2aWRlclwiIG5nLWlmPVwiIW5vVGl0bGVcIj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWNvbnRlbnRcIj48ZGl2IGNsYXNzPVwic3BhY2VyOFwiIG5nLWlmPVwibm9UaXRsZSAmJiBoaW50XCI+PC9kaXY+PG1kLWxpc3QgY2xhc3M9XCJwaXAtbWVudSBwaXAtcmVmLWxpc3RcIiBwaXAtc2VsZWN0ZWQ9XCIkY3RybC5vcHRpb25JbmRleFwiIGluZGV4PVwie3sgJGN0cmwub3B0aW9uSW5kZXggfX1cIiBwaXAtc2VsZWN0PVwiJGN0cmwub25TZWxlY3RlZCgkZXZlbnQpXCI+PG1kLWxpc3QtaXRlbSBjbGFzcz1cInBpcC1yZWYtbGlzdC1pdGVtIHBpcC1zZWxlY3RhYmxlIGxheW91dC1yb3cgbGF5b3V0LWFsaWduLXN0YXJ0LWNlbnRlclwiIG5nLWNsYXNzPVwie1xcJ3NlbGVjdGVkIG1kLWZvY3VzZWRcXCcgOiBvcHRpb24ubmFtZSA9PSAkY3RybC5zZWxlY3RlZE9wdGlvbk5hbWUsIFxcJ2RpdmlkZXItYm90dG9tXFwnOiAkaW5kZXggIT0gb3B0aW9ucy5sZW5ndGggLSAxfVwiIG1kLWluay1yaXBwbGU9XCJcIiBuZy1rZXl1cD1cIiRjdHJsLm9uS2V5VXAoJGV2ZW50LCAkaW5kZXgpXCIgbmctcmVwZWF0PVwib3B0aW9uIGluICRjdHJsLm9wdGlvbnNcIj48ZGl2IGNsYXNzPVwicGlwLWNvbnRlbnQgY29udGVudC1zdHJldGNoXCIgbmctY2xpY2s9XCIkY3RybC5vbk9wdGlvblNlbGVjdCgkZXZlbnQsIG9wdGlvbilcIj48cCBjbGFzcz1cInBpcC10aXRsZSBzcGFjZXItcmlnaHRcIiBuZy1pZj1cIm9wdGlvbi50aXRsZVwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogNHB4ICFpbXBvcnRhbnQ7XCI+e3sgOjpvcHRpb24udGl0bGUgfCB0cmFuc2xhdGUgfX08L3A+PGRpdiBjbGFzcz1cInBpcC1zdWJ0aXRsZSBzcGFjZXItcmlnaHRcIiBzdHlsZT1cImhlaWdodDogaW5oZXJpdFwiIG5nLWlmPVwib3B0aW9uLnN1YnRpdGxlXCI+e3sgOjpvcHRpb24uc3VidGl0bGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN1YnRpdGxlIHNwYWNlci1yaWdodFwiIHN0eWxlPVwiaGVpZ2h0OiBpbmhlcml0XCIgbmctaWY9XCJvcHRpb24udGV4dFwiIG5nLWJpbmQtaHRtbD1cIm9wdGlvbi50ZXh0IHwgdHJhbnNsYXRlXCI+PC9kaXY+PC9kaXY+PC9tZC1saXN0LWl0ZW0+PC9tZC1saXN0PjwvZGl2PjxkaXYgY2xhc3M9XCJzcGFjZXI4XCIgbmctaWY9XCIkY3RybC5ub0FjdGlvbnNcIj48L2Rpdj48L21kLWRpYWxvZy1jb250ZW50PjxkaXYgY2xhc3M9XCJwaXAtZm9vdGVyXCIgbmctaWY9XCIhJGN0cmwubm9BY3Rpb25zXCI+PGRpdj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLWNhbmNlbFwiIG5nLWNsaWNrPVwiJGN0cmwub25DYW5jZWwoKVwiPnt7IDo6XFwnQ0FOQ0VMXFwnIHwgdHJhbnNsYXRlIH19PC9tZC1idXR0b24+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1zdWJtaXQgbWQtYWNjZW50XCIgbmctY2xpY2s9XCIkY3RybC5vblNlbGVjdCgpXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IC02cHhcIj57eyA6OiRjdHJsLm9rIHwgdHJhbnNsYXRlIH19PC9tZC1idXR0b24+PC9kaXY+PC9kaXY+PC9tZC1kaWFsb2c+Jyk7XG59XSk7XG59KSgpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXAtd2VidWktZGlhbG9ncy1odG1sLm1pbi5qcy5tYXBcbiJdfQ==