# Pip.WebUI.Dialogs User's Guide

## <a name="contents"></a> Contents
- [Installing](#install)
- [pipInformationDialog](#information_dialog)
- [pipConfirmationDialog](#confirmation_dialog)
- [pipErrorDialog](#error_dialog)
- [pipOptionsDialog](#error_dialog)
- [Questions and bugs](#issues)


## <a name="install"></a> Installing

Add dependency to **pip-webui** into your **bower.json** or **package.json** file depending what you use.
```javascript
"dependencies": {
  ...
  "pip-webui": "*"
  ...
}
```

Alternatively you can install **pip-webui** manually using **bower**:
```bash
bower install pip-webui
```

or install it using **npm**:
```bash
npm install pip-webui
```

Include **pip-webui** files into your web application.
```html
<link rel="stylesheet" href=".../pip-webui-lib.min.css"/>
<link rel="stylesheet" href=".../pip-webui.min.css"/>
...
<script src=".../pip-webui-lib.min.js"></script>
<script src=".../pip-webui.min.js"></script>
```

Register **pipDialogs** module in angular module dependencies.
```javascript
angular.module('myApp',[..., 'pipDialogs']);
```

## <a name="information_dialog"></a> pipInformationDialog

**pipInformationDialog** show dialog with information message and OK button.

### Usage
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

<img src="images/img-info-dialog.png"/>

### Methods
* **show** - open information dialog

## <a name="confirmation_dialog"></a> pipConfirmationDialog

**pipConfirmationDialog** shows message with question and YES and NO buttons.

### Usage
```javascript
 pipConfirmationDialog.show(
        {
            event: event,
            title: 'Agree?',
            ok: 'Agree',
            cancel: 'Disagree'
        },
        function () {
            console.log('You agreed');
        },
        function () {
            console.log('You disagreed');
        }
    );
```

### Methods
* **show** - open confirmation dialog

## <a name="error_dialog"></a> pipErrorDialog

**pipErrorDialog** shows error message with collapsible details.

### Usage
```javascript
 pipErrorDetailsDialog.show(
     {
         error: $scope.error,
         ok: 'Ok'
     },
     function () {},
     function () {}
 );
```

<img src="images/img-errors-dialog.png"/>

### Methods
* **show** - open errors details dialog

## <a name="options_dialog"></a> pipOptionsDialog

**pipOptionsDialog** allows to pick one from several available options.

### Usage
```javascript
 pipOptionsDialog.show(
        {
            event: event,
            title: 'Choose Option',
            options: [
                { icon: 'star', name: 'option_1', title: 'Option 1', active: true },
                { icon: 'star', name: 'option_2', title: 'Option 2' },
                { icon: 'star', name: 'option_3', title: 'Option 3' },
                { name: 'option_4', title: 'Option 4' },
                { name: 'option_5', title: 'Option 5' }
            ]
        },
        function(option) {
            var optionName = option ? option.name : null;
            console.log('Selected option: ' + optionName);
        }
    );
```

<img src="images/img-options-dialog.png"/>

### Methods
* **show** - open options dialog

## <a name="issues"></a> Questions and bugs

If you have any questions regarding the module, you can ask them using our 
[discussion forum](https://groups.google.com/forum/#!forum/pip-webui).

Bugs related to this module can be reported using [github issues](https://github.com/pip-webui/pip-webui-dialogs/issues).
