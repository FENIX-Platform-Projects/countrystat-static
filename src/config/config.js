/*global define*/
define(function () {

    'use strict';

    return {

        CACHE : false,
        LANG : "EN",
        COUNTRY_ISO3_CODE : 'COG',
        ENVIROMENT_DEVELOP : "develop",
        ENVIROMENT_PROD : "production",

        DATA_MNG_CONTENT : "#data-mng",

        ERROR :{
            NO_COUNTRY_CONFIG :'No configuration for the country',
            INVALID_COUNTRY_PARAM : "Country code in wrong format",
            NO_CURRENT_COUNTRY_CONFIG :'No configuration for the current country'
        }
    };
});
