/**
 * @file Optional filter to translate string resources
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipDialogs.Translate', []);

    thisModule.filter('translate', function ($injector: ng.auto.IInjectorService) {
        var pipTranslate: pip.services.ITranslateService = $injector.has('pipTranslate') 
            ? <pip.services.ITranslateService>$injector.get('pipTranslate') : null;

        return function (key: string) {
            return pipTranslate  ? pipTranslate.translate(key) || key : key;
        }
    });

})();
