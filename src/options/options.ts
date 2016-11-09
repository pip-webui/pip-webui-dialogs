/**
 * @file Options dialog
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve sample in sampler app
 * - Remove deleted hack in the controller
 */
/*
(function () {
    'use strict';

    var thisModule = angular.module('pipOptionsDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipOptionsDialog',
        function ($mdDialog) {
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
        }
    );
    thisModule.controller('pipOptionsDialogController',
        function ($scope, $rootScope, $mdDialog, $injector, params) {
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
        }
    );

})();
*/