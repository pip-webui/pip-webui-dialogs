(function (angular) {
    'use strict';

    var thisModule = angular.module('appDialogs.Information', []);

    thisModule.controller('InformationController',
        function ($scope, pipInformationDialog, $timeout, $injector) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

            if (pipTranslate) {
                pipTranslate.translations('en', {
                    OPEN_INFORM: 'Open information dialog',
                    INFORM_DIALOG: 'Information dialog',
                    SAMPLE: 'Sample',
                    CODE: 'Code'
                });
                pipTranslate.translations('ru', {
                    OPEN_INFORM: 'Открыть информационный диалог',
                    INFORM_DIALOG: 'Информационный диалог',
                    SAMPLE: 'Пример',
                    CODE: 'Пример кода'                    
                });
                $scope.openInform = pipTranslate.translate('OPEN_INFORM');
                $scope.title = pipTranslate.translate('INFORM_DIALOG');
                $scope.sample = pipTranslate.translate('SAMPLE');
                $scope.code = pipTranslate.translate('CODE');
            } else {
                $scope.openInform = 'Open information dialog';
                $scope.title = 'Information dialog';                
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
            
            $scope.onInfoDialogOpen = function (event) {
                pipInformationDialog.show(
                    {
                        event: event,
                        title: 'Good!',
                        message: 'Stuff %s is really good',
                        item: 'Play CDG T-shirt',
                        ok: 'Take It'
                    },
                    function () {
                        console.log('Taken');   // eslint-disable-line
                    }
                );
            };
        }
    );

})(window.angular);
