{

function translate($injector: ng.auto.IInjectorService) {
    var pipTranslate: pip.services.ITranslateService = $injector.has('pipTranslate') 
        ? <pip.services.ITranslateService>$injector.get('pipTranslate') : null;

    return function (key: string) {
        return pipTranslate  ? pipTranslate.translate(key) || key : key;
    }
}

angular
    .module('pipDialogs.Translate', [])
    .filter('translate', translate);

}