/**
 * @file Error details dialog
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve sample in sampler app
 */

/*
(function () {
    'use strict';

    var thisModule = angular.module('pipErrorDetailsDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipErrorDetailsDialog',
        function ($mdDialog) {
            return {
                show: function (params, successCallback, cancelCallback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'error_details/errorDetails.html',
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
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'CANCEL';
                $scope.errorDetails = 'ERROR_DETAILS';
                $scope.dismissButton = 'DISMISS';
                $scope.errorMessage = 'MESSAGE';
                $scope.errorCode = 'CODE';
                $scope.errorMethod = 'METHOD';
                $scope.errorPath = 'PATH';
                $scope.errorText = 'ERROR';                
            } else {
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'Cancel';
                $scope.errorDetails = 'Error details';
                $scope.dismissButton = 'Dismiss';
                $scope.errorMessage = 'Message';
                $scope.errorCode = 'Code';
                $scope.errorMethod = 'Method';
                $scope.errorPath = 'Path';
                $scope.error = 'Error';
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

})();
*/