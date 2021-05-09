app.controller('transcriberCtrl', ($scope) => {
    $scope.params = {
        "spanish_text" : "hoven aventura vender",
        "rules": rules
    };
    $scope.internol_text = "";
    $scope.applied_rules = {};

    const on_params_change = function() {
        const result = to_internol_text($scope.params.spanish_text, $scope.params.rules);
        $scope.internol_text = result[0];
        $scope.applied_rules = result[1];
    };

    $scope.$watch("params", on_params_change, true);
});