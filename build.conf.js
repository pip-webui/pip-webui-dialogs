module.exports = {
    module: {
        name: 'pipDialogs',
        styles: 'dialogs'
    },
    build: {
        js: true,
        ts: true,
        html: true,
        css: true,
        lib: true,
        images: true,
        dist: false
    },
    file: {
        lib: [
            '../pip-webui-test/dist/**/*',
            '../pip-webui-lib/dist/**/*',
            '../pip-webui-cssframework/dist/**/*',
            '../pip-webui-csscomponents/dist/**/*',
            '../pip-webui-core/dist/**/*',
             '../pip-webui-data/dist/**/*',
             '../pip-webui-rest/dist/**/*',
            '../pip-webui-controls/dist/**/*',
             '../pip-webui-nav/dist/**/*',
             '../pip-webui-layouts/dist/**/*',
             '../pip-webui-themes/dist/**/*',             
        ]
    },
    samples: {
        port: 8130
    },
    api: {
        port: 8131
    }
};
