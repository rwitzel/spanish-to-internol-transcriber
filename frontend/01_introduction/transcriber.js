app.controller('transcriberCtrl', ($scope) => {
    $scope.params = {
        "spanish_text" : "hoven aventura vender colegas",
        "rules": rules,
        "rules_filter": ""
    };
    $scope.internol_text = "";
    $scope.applied_rules = {};
    $scope.filter_rules = (rules, filter) => {
        return rules.filter((rule) => {
            return JSON.stringify(rule).indexOf(filter) >=0;
        });
    };

    const on_params_change = function() {
        const result = to_internol_text($scope.params.spanish_text, $scope.params.rules);
        $scope.internol_text = result[0];
        $scope.applied_rules = result[1];
    };

    $scope.$watch("params", on_params_change, true);
});