/**
 * @file Information dialog
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve sample in sampler app
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipInformationDialog',
        ['ngMaterial', 'pipDialogs.Translate', 'pipDialogs.Templates']);

    thisModule.factory('pipInformationDialog',
        function ($mdDialog) {
            return {
                show: function (params, callback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'information/information.html',
                        controller: 'pipInformationDialogController',
                        locals: {params: params},
                        clickOutsideToClose: true
                    })
                        .then(function () {
                            if (callback) {
                                callback();
                            }
                        });
                }
            };
        }
    );

    thisModule.controller('pipInformationDialogController',
        function ($scope, $rootScope, $mdDialog, $injector, params) {
            var content = params.message, item;
console.log('content', content);
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'INFORMATION_TITLE': 'Information'
                });
                pipTranslate.translations('ru', {
                    'INFORMATION_TITLE': 'Информация'
                });

                $scope.title = params.title || 'INFORMATION_TITLE';
                $scope.ok = params.ok || 'OK';
                content = pipTranslate.translate(content);
            } else {
                $scope.title = params.title || 'Information';
                $scope.ok = params.ok || 'OK';
            }
console.log('content1', content);
            var pipFormat = $injector.has('pipFormat') ? $injector.get('pipFormat') : null;

            $scope.theme = $rootScope.$theme;
            if (params.item && pipFormat) {
                item = _.truncate(params.item, 25);
                content = pipFormat.sprintf(content, item);
                console.log('content2', content);
            }
            $scope.content = content;
console.log('content1', $scope.content);
            $scope.onOk = function () {
                $mdDialog.hide();
            };
        }
    );

})(window.angular, window._);
