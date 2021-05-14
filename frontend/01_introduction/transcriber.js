app.controller('transcriberCtrl', ($scope) => {
    $scope.params = getObjectFromLocalStorage('internol_params') || {
        "spanish_text" : spanish_text_example,
        "rules_filter": "",
        "highlight_transformed_words": true
    };
    $scope.params.rules = rules; // because rules cannot be recovered from local storage
    $scope.internol_text = "";
    $scope.applied_rules = {};
    $scope.filter_rules = (rules, filter) => {
        return rules.filter((rule) => JSON.stringify(rule).indexOf(filter) >=0);
    };
    $scope.num_active_rules = (rules) => {
        return rules.filter((rule) => rule.active).length;
    };

    const on_params_change = function() {
        const result = to_internol_objects($scope.params.spanish_text, $scope.params.rules);
        $scope.internol_objects = result[0];
        $scope.internol_html = to_internol_html(result[0], $scope.params.highlight_transformed_words);
        $scope.applied_rules = result[1];
        setObjectInLocalStorage('internol_params', $scope.params);
    };

    $scope.$watch("params", on_params_change, true);

    setModelVersionInLocalStorage();
});