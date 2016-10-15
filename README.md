# <img src="https://github.com/pip-webui/pip-webui/raw/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Generic Dialogs

![](https://img.shields.io/badge/license-MIT-blue.svg)

Pip.WebUI.Dialogs modules contains general purpose dialogs.

- Information message dialog
- Confirmation message dialog
- Error message dialog
- Option selection dialog

<a href="https://github.com/pip-webui/pip-webui-controls/raw/master/doc/images/img-info-dialog.png" style="border: 3px ridge #c8d2df; display: inline-block">
    <img src="https://github.com/pip-webui/pip-webui-controls/raw/master/doc/images/img-info-dialog.png"/>
</a>

Standard dialogs require only few lines of code from developers:
```javascript
 pipInformationDialog.show(
        {
            event: event,
            title: 'Good!',
            message: 'Stuff %s was really good',
            item: 'Loooooong naaaaaaaaaaaaaame',
            ok: 'Take It'
        },
        function () {
            console.log('Taken');
        }
    );
```

See online samples [here...](http://webui.pipdevs.com/pip-webui-dialogs/index.html)

## Learn more about the module

- [User's guide](https://github.com/pip-webui/pip-webui-dialogs/blob/master/doc/UsersGuide.md)
- [Online samples](http://webui.pipdevs.com/pip-webui-dialogs/index.html)
- [API reference](http://webui-api.pipdevs.com/pip-webui-dialogs/index.html)
- [Developer's guide](https://github.com/pip-webui/pip-webui-dialogs/blob/master/doc/DevelopersGuide.md)
- [Changelog](https://github.com/pip-webui/pip-webui-dialogs/blob/master/CHANGELOG.md)
- [Pip.WebUI project website](http://www.pipwebui.org)
- [Pip.WebUI project wiki](https://github.com/pip-webui/pip-webui/wiki)
- [Pip.WebUI discussion forum](https://groups.google.com/forum/#!forum/pip-webui)
- [Pip.WebUI team blog](https://pip-webui.blogspot.com/)

## <a name="dependencies"></a>Module dependencies

* [pip-webui-lib](https://github.com/pip-webui/pip-webui-lib): angular, angular material and other 3rd party libraries
* [pip-webui-css](https://github.com/pip-webui/pip-webui-css): CSS styles
* [pip-webui-core](https://github.com/pip-webui/pip-webui-core): localization and other core services

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
