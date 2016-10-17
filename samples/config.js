/**
 * @file Global configuration for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipSampleConfig', ['pipState', 'pipSideNav', 'pipAppBar']);

    // Configure application services before start
    thisModule.config(
        function ($mdThemingProvider, $stateProvider, $urlRouterProvider, pipTranslateProvider,
                  pipSideNavProvider, pipAppBarProvider, $mdIconProvider, $compileProvider, $httpProvider) {

            $compileProvider.debugInfoEnabled(false);
            $httpProvider.useApplyAsync(true);
            
            var content = [
                    { title: 'Information', state: 'information', url: '/information', auth: false,
                        controller: 'InformationController', templateUrl: 'information_sample/information.html' },
                    { title: 'Confirmation', state: 'confirmation', url: '/confirmation', auth: false,
                        controller: 'ConfirmationController', templateUrl: 'confirmation_sample/confirmation.html' },
                    { title: 'Options', state: 'options', url: '/options', auth: false,
                        controller: 'OptionsController', templateUrl: 'options_sample/options.html' },
                ],
                contentItem, i;

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // String translations
            pipTranslateProvider.translations('en', {
                DIALOGS: 'Dialogs'
            });

            pipTranslateProvider.translations('ru', {
                DIALOGS: 'Диалоги'
            });

            for (i = 0; i < content.length; i++) {
                contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            $urlRouterProvider.otherwise('/information');

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [{title: 'DIALOGS', url: '/information'}]
                }
            ]);
        }
    );

})(window.angular);

