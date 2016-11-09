(function (angular) {
    'use strict';

    var thisModule = angular.module('appDialogs.ErrorDetails', []);

    thisModule.controller('ErrorDetailsController',
        function ($scope, pipErrorDetailsDialog, pipErrorDetails2Dialog, $injector, $timeout) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

            if (pipTranslate) {
                pipTranslate.translations('en', {
                    OPEN_ERROR_DETAILS: 'Open error details dialog',
                    ERROR_DETAILS_DIALOG: 'Error details dialog',
                    SAMPLE: 'Sample',
                    CODE: 'Code'
                });
                pipTranslate.translations('ru', {
                    OPEN_ERROR_DETAILS: 'Открыть диалог детализации ошибки',
                    ERROR_DETAILS_DIALOG: 'Диалог детализации ошибки',
                    SAMPLE: 'Пример',
                    CODE: 'Пример кода'                    
                });
                $scope.openErrorDetails = pipTranslate.translate('OPEN_ERROR_DETAILS');
                $scope.title = pipTranslate.translate('ERROR_DETAILS_DIALOG');
                $scope.sample = pipTranslate.translate('SAMPLE');
                $scope.code = pipTranslate.translate('CODE');
            } else {
                $scope.openErrorDetails = 'Open error details dialog';
                $scope.title = 'Error details dialog';                
                $scope.sample = 'Sample';
                $scope.code = 'Code';
            }

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    if (Prism) {
                        Prism.highlightElement(block);
                    }
                });
            });

            $scope.errorData = {
                code: 'Error Code 155',
                path: 'Error parh',
                error: 'Show Error',
                message: 'This is error message: Show Error'
            }
            
            $scope.onErrorDialogOpen = function (event) {
                pipErrorDetailsDialog.show(
                    {
                        error: $scope.errorData,
                        ok: 'Ok'
                    },
                    function () {
                        console.log('Error show callback');  // eslint-disable-line
                    },
                    function () {
                        console.log('Error show cancel callback');   // eslint-disable-line
                    }
                );        
            };
            $scope.onErrorDialogOpen2 = function (event) {
                pipErrorDetails2Dialog.show(
                    {
                        error: $scope.errorData,
                        ok: 'Ok'
                    },
                    function () {
                        console.log('Error show callback');  // eslint-disable-line
                    },
                    function () {
                        console.log('Error show cancel callback');   // eslint-disable-line
                    }
                );        
            };
        }
    );

})(window.angular);
