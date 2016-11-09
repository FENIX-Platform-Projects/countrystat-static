define([
    "jquery",
    "underscore",
    "loglevel",
    "../config/config",
    "../config/filter",
    "fenix-ui-filter",
    "../config/data_management_dsdEditor",
    "../config/data_management_metadataEditor",
    "../config/data_management",
    "fenix-ui-data-management",
    "../js/parser"
], function ($, _, log, Config, FilterConfig, Filter, DMConfigDsdEditor, DMConfigMetadataEditor, DMConfig, FenixDataManagement, Parser) {

    var s = {
        DATA_MNG: Config.DATA_MNG_CONTENT,
        cache : Config.CACHE,
        default_lang : Config.LANG,
        default_countryCode : Config.COUNTRY_ISO3_CODE,
        environment : Config.ENVIROMENT_PROD,
        //url : ''
        url : 'http://example.com:3000/pathname/?country=cog',
        //url : 'http://example.com:3000/pathname/?country=MDG'

        FILTER_COUNTRY_DROPDOWN: '#country_dropdown',
        FILTER_CONTAINER_DROPDOWN: '#filter-container-dropdown',
        FILTER_SUBMIT: '#filter-submit',
        FILTER_VALUES :{
            YEAR : "CountryList"
        },
        error : {
            NO_FILTER_VALUES: 'No filter values'
        }
    };

    function Countrystat(){
        this._importThirdPartyCss();
        //s.url = window.location.href;
        console.log(s.url)
        console.log($("html").attr("lang"))

        if((s.lang!=null)&&(typeof s.lang!="undefined")){
            s.lang = $("html").attr("lang");
            s.lang = s.lang.toUpperCase();
        }
        else{
            s.lang = s.default_lang;
        }

        var obj = {url : s.url};
        var parsedUrl = new Parser(obj).parseURL();
        var COUNTRY_CODE = parsedUrl.searchObject.country;

        this._filterInit()

    }

    Countrystat.prototype._filterInit = function () {

        this.$filterSubmit = $(s.FILTER_SUBMIT);
        this._bindFilterEventListeners();
        this._renderFilter(FilterConfig);
    }

    Countrystat.prototype._onFilterClick = function () {

        var values = this.filter.getValues();
        console.log(values);
        var COUNTRY_CODE = s.default_countryCode;
        if((values!=null)&&(typeof values!='undefined')&&(values.values!=null)&&(typeof values.values!='undefined')&&(values.values.countryList!=null)&&(typeof values.values.countryList!='undefined')&&(values.values.countryList[0]!=null)&&(typeof values.values.countryList[0]!='undefined'))
        {
            COUNTRY_CODE =values.values.countryList[0];
        }

        console.log(COUNTRY_CODE)
        this._dataManagementInit(COUNTRY_CODE);
    },

    Countrystat.prototype._bindFilterEventListeners = function () {

        this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
    }

    Countrystat.prototype._renderFilter = function (config) {

    if (this.filter && $.isFunction(this.filter.dispose)) {
        this.filter.dispose();
    }

    var filter_dropdown_container = s.FILTER_COUNTRY_DROPDOWN;

        this.filter = new Filter({
            el: filter_dropdown_container,
            selectors: config,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });
    },

    Countrystat.prototype._dataManagementInit = function (COUNTRY_CODE) {
        console.log("In data Management Init")

        var country_code = COUNTRY_CODE;
        var country_lowerCase = '';
        var dsdConfig = '';
        var config = '';
        var default_country = false;
        if((country_code!=null)&&(typeof country_code!= 'undefined')&&(typeof country_code === 'string')&&(isNaN(country_code))&&(country_code.length== 3)) {

            //Config Current Country
            country_lowerCase = country_code.toLocaleLowerCase();
            dsdConfig = $.extend(true, DMConfigDsdEditor, {"contextSystem":"cstat_"+country_lowerCase});
            config = DMConfig[country_code.toUpperCase()];
            if((dsdConfig!=null)&&(typeof dsdConfig != 'undefined')&&(config!=null)&&(typeof config != 'undefined')) {
            }
            else{
                dsdConfig = '';
                config = '';
                country_code = s.default_countryCode;
                default_country = true;
                log.error(Config.ERROR.NO_CURRENT_COUNTRY_CONFIG);
            }
        }
        else{
            country_code = s.default_countryCode;
            default_country = true;
            log.error(Config.ERROR.INVALID_COUNTRY_PARAM);
        }

        if(default_country){
            //Config Default Country
            country_lowerCase = country_code.toLocaleLowerCase();
            dsdConfig = $.extend(true, DMConfigDsdEditor, {"contextSystem":"cstat_"+country_lowerCase});
            config = DMConfig[country_code.toUpperCase()];
        }

        //Country and configuration found (Or Current Or Default)
        if((dsdConfig!=null)&&(typeof dsdConfig != 'undefined')&&(config!=null)&&(typeof config != 'undefined')) {
            this._dataManagementCreation(dsdConfig, config);
        }
        else{
            log.error(Config.ERROR.NO_COUNTRY_CONFIG);
            this._dataManagementCreation();
        }
    };

    //This function is not used
    //No config as argument
    Countrystat.prototype._dataManagementCreation = function (dsdConfig, config) {

        console.log("maario",config);

        var metadataConfig = DMConfigMetadataEditor;
        if((dsdConfig!=null)&&(typeof dsdConfig != 'undefined')&&(config!=null)&&(typeof config != 'undefined')) {
            var dataMng = new FenixDataManagement($.extend(true, {
                environment: s.environment,
                el: s.DATA_MNG,
                cache: s.cache,
                lang: s.lang,
                metadataEditor: metadataConfig,
                catalog: config.catalog,
                dsdEditor: dsdConfig
            }));
        }
        else{
            var dataMng = new FenixDataManagement($.extend(true, {
                environment: s.environment,
                el: s.DATA_MNG,
                cache: s.cache,
                lang: s.lang,
                metadataEditor: metadataConfig
            }));
        }
    };

    //style
    Countrystat.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require("bootstrap-loader");

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");

        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");
        // fenix-ui-dropdown
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");

        // fenix-ui-table-creator
        require("../../node_modules/fenix-ui-table-creator/dist/fenix-ui-table-creator.min.css");

        // jquery-grid for fenix-ui-metadata-viewer
        require("../../node_modules/jquery-treegrid-webpack/css/jquery.treegrid.css");

        // iDangerous swiper
        require("../../node_modules/swiper/dist/css/swiper.min.css");

        // fenix-ui-visualization-box
        require("../../node_modules/fenix-ui-visualization-box/dist/fenix-ui-visualization-box.min.css");

        // fenix-ui-catalog
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

        //fenix-ui-analisys
        require("../../node_modules/fenix-ui-analysis/dist/fenix-ui-analysis.min.css");

        //dropdown selector
        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix filter

        require("../../node_modules/fenix-ui-metadata-editor/dist/fenix-ui-metadata-editor.min.css");
        require("../../node_modules/fenix-ui-DataEditor/dist/fenix-ui-DataEditor.min.css");
        require("../../node_modules/fenix-ui-DSDEditor/dist/fenix-ui-DSDEditor.min.css");

        require("../../node_modules/fenix-ui-data-management/dist/fenix-ui-data-management.min.css");
        require("../../node_modules/toastr/build/toastr.min.css");
    };

    return new Countrystat();
});