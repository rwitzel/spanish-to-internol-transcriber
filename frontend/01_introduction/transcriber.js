app.controller('transcriberCtrl', ($scope) => {
    $scope.params = {
        "spanish_text" : spanish_text_example,
        "rules": rules,
        "rules_filter": "",
        "highlight_transformed_words": true
    };
    $scope.internol_text = "";
    $scope.applied_rules = {};
    $scope.filter_rules = (rules, filter) => {
        return rules.filter((rule) => {
            return JSON.stringify(rule).indexOf(filter) >=0;
        });
    };

    const on_params_change = function() {
        const result = to_internol_objects($scope.params.spanish_text, $scope.params.rules);
        $scope.internol_objects = result[0];
        $scope.internol_html = to_internol_html(result[0], $scope.params.highlight_transformed_words);
        $scope.applied_rules = result[1];
    };

    $scope.$watch("params", on_params_change, true);
});