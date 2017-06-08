/*
 * This config is only used during development and build phase only
 * It will not be available on production
 *
 */

(function(global) {
    // ENV
    global.ENV = global.ENV || 'development';

    // map tells the System loader where to look for things
    var map = {
        'app': 'src/tmp/app',
        'test': 'src/tmp/test',
           //Aliases for more convinient import usage (less relative ../../....)
        'common': 'src/tmp/app/common',
        'shared': 'src/tmp/app/shared'

    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {
            defaultExtension: 'js'
        },
        'test': {
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        }
    };

    // List npm packages here
    var npmPackages = [
        '@angular',
        'rxjs',
        'lodash',
        'mydatepicker'
    ];

    // Add package entries for packages that expose barrels using index.js
    var packageNames = [
        // App barrels
        'app/shared',

        // 3rd party barrels
        'lodash',
        'mydatepicker',
        'angular2-moment'
        
    ];

    // Add package entries for angular packages
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router'
    ];

    npmPackages.forEach(function (pkgName) {
        map[pkgName] = 'node_modules/' + pkgName;
    });

    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    ngPackageNames.forEach(function(pkgName) {
        map['@angular/' + pkgName] = 'node_modules/@angular/' + pkgName +
            '/bundles/' + pkgName + '.umd.js';
        map['@angular/' + pkgName+'/testing'] = 'node_modules/@angular/' + pkgName +
        '/bundles/' + pkgName + '-testing.umd.js';
    });

    // map['ng2-datepicker'] = 'node_modules/ng2-datepicker/lib-dist';
    // packages['ng2-datepicker'] = { main: 'ng2-datepicker.module.js', defaultExtension: 'js' };

     map['mydatepicker'] = 'node_modules/mydatepicker/bundles';
    packages['mydatepicker'] = { main: 'mydatepicker.umd.js', defaultExtension: 'js' };

    map['ngx-accordion'] = 'node_modules/ngx-accordion';
    packages['ngx-accordion'] = { main: 'index.js', defaultExtension: 'js' };
  
    map['angular2-mdl'] = 'node_modules/angular2-mdl';
    packages['angular2-mdl'] = { main: 'bundle/angular2-mdl.js', defaultExtension: 'js' };

    map['ng2-pdf-viewer'] = 'node_modules/ng2-pdf-viewer';
    packages['ng2-pdf-viewer'] = { main: 'dist/index.js', defaultExtension: 'js' };

    map['pdfjs-dist'] = 'node_modules/pdfjs-dist';
    packages['pdfjs-dist'] = {  defaultExtension: 'js' };

    map['ag-grid-angular'] = 'node_modules/ag-grid-angular';
    packages['ag-grid-angular'] = {  defaultExtension: 'js' };

    map['ag-grid'] = 'node_modules/ag-grid';
    packages['ag-grid'] = {  defaultExtension: 'js' };

    map['ag-grid-enterprise'] = 'node_modules/ag-grid-enterprise';
    packages['ag-grid-enterprise'] = {  defaultExtension: 'js' };

/*
    map['moment'] = 'node_modules/src/moment.js';
    packages['moment'] = {  defaultExtension: 'js' };

    map['angular2-moment'] = 'node_modules/index.js';
    packages['angular2-moment'] = {  defaultExtension: 'js' };*/

    var config = {
        map: map,
        packages: packages
    };


    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);
