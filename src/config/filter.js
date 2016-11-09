define(function () {

    'use strict';

    return {

        countryList: {

            selector: {
                id: "dropdown",
                source: [
                    {value: "AFG", label: "Afghanistan"},
                    {value: "AGO", label: "Angola"},
                    {value: "BEN", label: "Benin"},
                    {value: "BFA", label: "Burkina Faso"},
                    {value: "CMR", label: "Cameroon"},
                    {value: "CIV", label: "Cote d’Ivoire"},
                    {value: "COG", label: "Congo"},
                    {value: "ETH", label: "Ethiopia"},
                    {value: "GHA", label: "Ghana"},
                    {value: "GNB", label: "Guinea-Bissau"},
                    {value: "HTI", label: "Haiti"},
                    {value: "KEN", label: "Kenya"},
                    {value: "MDG", label: "Madagascar"},
                    {value: "MWI", label: "Malawi"},
                    {value: "MLI", label: "Mali"},
                    {value: "MOZ", label: "Mozambique"},
                    {value: "NER", label: "Niger"},
                    {value: "NGA", label: "Nigeria"},
                    {value: "RWA", label: "Rwanda"},
                    {value: "SEN", label: "Senegal"},
                    {value: "TZA", label: "Tanzania"},
                    {value: "TGO", label: "Togo"},
                    {value: "UGA", label: "Uganda"},
                    {value: "ZMB", label: "Zambia"}
                ],
                hideSelectAllButton: true,
                hideClearAllButton : true,
                config: {
                    placeholder: "Please select a Country",
                      maxItems: 1
                }
            },

            template: {
                hideHeader: true
                //title: "Please, select a country"
            }
        }
    }
});