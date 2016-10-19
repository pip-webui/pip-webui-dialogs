(function (angular) {
    'use strict';

    var thisModule = angular.module('appDialogs.Confirmation', []);

    thisModule.controller('ConfirmationController',
        function ($scope, pipConfirmationDialog, $injector, $timeout) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

            if (pipTranslate) {
                pipTranslate.translations('en', {
                    OPEN_CONFIRM: 'Open confirmation dialog',
                    CONFIRM_DIALOG: 'Confirmation dialog',
                    SAMPLE: 'Sample',
                    CODE: 'Code'
                });
                pipTranslate.translations('ru', {
                    OPEN_CONFIRM: 'Открыть диалог родтверждения',
                    CONFIRM_DIALOG: 'Диалог подтверждения',
                    SAMPLE: 'Пример',
                    CODE: 'Пример кода'                    
                });
                $scope.openConfirm = pipTranslate.translate('OPEN_CONFIRM');
                $scope.title = pipTranslate.translate('CONFIRM_DIALOG');
                $scope.sample = pipTranslate.translate('SAMPLE');
                $scope.code = pipTranslate.translate('CODE');
            } else {
                $scope.openConfirm = 'Open confirmation dialog';
                $scope.title = 'Confirmation dialog';                
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
            
            $scope.onConfirmDialogOpen = function (event) {
                pipConfirmationDialog.show(
                    {
                        event: event,
                        title: 'Agree?',
                        ok: 'Agree',
                        cancel: 'Disagree'
                    },
                    function () {
                        console.log('You agreed');  // eslint-disable-line
                    },
                    function () {
                        console.log('You disagreed');   // eslint-disable-line
                    }
                );
            };
        }
    );

})(window.angular);
