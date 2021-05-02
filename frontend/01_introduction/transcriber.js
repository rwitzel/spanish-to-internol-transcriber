app.controller('transcriberCtrl', ($scope) => {
    $scope.params = {
        "spanish_text" : "",
        "rules": rules
    }
    $scope.internol_text = ""

    const on_params_change = function() {
        const spanish_words = $scope.params.spanish_text.split(" ");
        const internol_words = spanish_words; // TODO .map()
        $scope.internol_text = internol_words.join(" ");
    };

    $scope.$watch("params", on_params_change, true);
});