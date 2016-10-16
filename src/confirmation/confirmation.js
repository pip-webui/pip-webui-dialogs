/**
 * @file Confirmation dialog
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipConfirmationDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipConfirmationDialog',
        function ($mdDialog) {
            return {
                show: function (params, successCallback, cancelCallback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'confirmation/confirmation.html',
                        controller: 'pipConfirmationDialogController',
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
                }
            };
        }
    );

    thisModule.controller('pipConfirmationDialogController',
        function ($scope, $rootScope, $mdDialog, $injector, params) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'CONFIRM_TITLE': 'Confirm'
                });
                pipTranslate.translations('ru', {
                    'CONFIRM_TITLE': 'Подтвердите'
                });

                $scope.title = params.title || 'CONFIRM_TITLE';
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'CANCEL';
            } else {
                $scope.title = params.title || 'Confirm';
                $scope.ok = params.ok || 'OK';
                $scope.cancel = params.cancel || 'Cancel';
            }

            $scope.theme = $rootScope.$theme;

            $scope.onCancel = function () {
                $mdDialog.cancel();
            };

            $scope.onOk = function () {
                $mdDialog.hide();
            };
        }
    );

})(window.angular);
