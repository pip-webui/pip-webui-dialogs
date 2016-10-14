(function (angular) {
    'use strict';

    var thisModule = angular.module('appDialogs',
        [
            'pipSampleConfig',

            'pipDropdown', 'pipLayout',
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'LocalStorageModule', 'ngAnimate',
            'pipCore', 'pipDialogs', 'pipTheme.Default', 'pipTheme.Bootbarn', 'pipTheme',

            'appDialogs.Information', 'appDialogs.Confirmation', 'appDialogs.Options'
        ]
    );

    thisModule.controller('pipSampleController',
        function ($scope, $rootScope, $state, $mdSidenav, $timeout, pipTranslate, $mdTheming, pipTheme,
                  $mdMedia) {

            pipTheme.setCurrentTheme('bootbarn-warm');
            
            $scope.pages = [
                { title: 'Information dialog', state: 'information', url: '/information',
                    controller: 'InformationController', 
                    templateUrl: '../samples/information/information.html' },
                { title: 'Confirmation dialog', state: 'confirmation', url: '/confirmation',
                    controller: 'ConfirmationController', 
                    templateUrl: '../samples/confirmation/confirmation.html' },
                { title: 'Options dialogs', state: 'options', url: '/options',
                    controller: 'OptionsController', templateUrl: '../samples/options/options.html' }
            ];
            
            $scope.selected = {};

            $timeout(function () {
                $scope.selected.pageIndex = _.findIndex($scope.pages, {state: $state.current.name});
            });

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

            $scope.isEntryPage = function () {
                return $state.current.name === 'signin' || $state.current.name === 'signup' ||
                    $state.current.name === 'recover_password' || $state.current.name === 'post_signup';
            };

            $scope.isPadding = function () {
                return $rootScope.$state
                    ? !($rootScope.$state.name === 'tabs' ||
                    $rootScope.$state.name === 'dropdown' && $mdMedia('xs')) : true;
            };
        }
    );

})(window.angular);
