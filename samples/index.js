(function (angular) {
    'use strict';

    var thisModule = angular.module('appDialogs',
        [
            'pipSampleConfig',

            'pipDropdown', 'pipLayout',
            // 3rd Party Modules
            // 'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            // 'ngMaterial', 'LocalStorageModule', 'ngAnimate',
            // 'pipServices', 'pipDialogs', 'pipTheme',
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            'pipServices', 'pipNav', 'pipTheme', 'pipDialogs',


            'appDialogs.Information', 'appDialogs.Confirmation', 'appDialogs.Options'
        ]
    );

    thisModule.controller('pipSampleController',
        function ($scope, $rootScope, $state, $mdSidenav, pipTranslate, $timeout, $mdMedia, pipAppBar) {

            $scope.pages = [
                { title: 'Information dialog', state: 'information', url: '/information',
                    controller: 'InformationController', 
                    templateUrl: 'information_sample/information.html' },
                { title: 'Confirmation dialog', state: 'confirmation', url: '/confirmation',
                    controller: 'ConfirmationController', 
                    templateUrl: 'confirmation_sample/confirmation.html' },
                { title: 'Options dialogs', state: 'options', url: '/options',
                    controller: 'OptionsController', templateUrl: 'options_sample/options.html' }
            ];

            $scope.selected = {};
            $timeout(function () {
                $scope.selected.pageIndex = _.findIndex($scope.pages, {state: $state.current.name});
                $scope.selected.navId = $state.current.name;
            }, 100);

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('DIALOGS');

            $scope.onNavigationSelect = function (stateName) {
                if ($state.current.name !== stateName) {
                    $state.go(stateName);
                }
            };

            $scope.onDropdownSelect = function (obj) {
                if ($state.current.name !== obj.state) {
                    $state.go(obj.state);
                }
            };

        }
    );

})(window.angular);
