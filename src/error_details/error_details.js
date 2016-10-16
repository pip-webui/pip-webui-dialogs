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
        function ($mdDialog) {
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
        }
    );

    thisModule.controller('pipErrorDetailsDialogController',
        function ($scope, $rootScope, $mdDialog, $injector, params) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'ERROR_DETAILS': 'Error details',
                    'CODE': 'Code',
                    'PATH': 'Path',
                    'ERROR': 'Error code',
                    'METHOD': 'Method',
                    'MESSAGE': 'Message'

                });
                pipTranslate.translations('ru', {
                    'ERROR_DETAILS': 'Детали ошибки',
                    'CODE': 'Код',
                    'PATH': 'Путь',
                    'ERROR': 'Код ошибки',
                    'METHOD': 'Метод',
                    'MESSAGE': 'Сообщение'
                });
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'CANCEL';
            } else {
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'Cancel';
            }

            $scope.theme = $rootScope.$theme
            $scope.error = params.error;

            $scope.onCancel = function () {
                $mdDialog.cancel();
            };

            $scope.onOk = function () {
                $mdDialog.hide();
            };
        }
    );

})(window.angular);
