app.controller('transcriberCtrl', ($scope) => {
    $scope.params = {
        "spanish_text" : ""
    }
    $scope.internol_text = ""

    const on_params_change = function() {
        $scope.internol_text = $scope.params.spanish_text;
    };

    $scope.$watch("params", on_params_change, true);
});