var app = angular.module("mean-front-end", ["ngRoute"]);
app.config(function ($routeProvider) {
    console.log("---- front")
    $routeProvider
        .when("/brands", {
            templateUrl: "view/brand/brand-list.html",
            controller: "brandsController"
        }).when("/products", {
            templateUrl: "view/product/product-list.html",
            controller: "productsController"
        })
        .otherwise({
            templateUrl: "view/home/home.html",
        }
        )
});

app.controller("productsController", function ($scope, $http) {
    var productParam = {
        isFeatured: 1
    }

    $http({ url: "http://localhost:3000/getproducts", data:productParam, method: "POST" }).then(function (res) {
        console.log(res);
        if (res.status == 200) {
            $scope.pdata = res.data.data;
        }
    })
    // $scope.rowLimit = 3;
    
    
    $scope.setSelectedProduct = function (product) {
        if ($scope.pdata.filter(x => x.selected).length > 1) {
            $scope.selectedEmployee = null;
            $scope.singleEmployeeSelected = false;
        } else {
            $scope.selectedEmployee = angular.copy($scope.pdata.find(x => x.selected));
            $scope.singleEmployeeSelected = !!$scope.selectedEmployee;
        }
    }
})
app.controller("brandsController", function ($scope, $http) {
    $scope.brandName = "levis";
    // $scope.pdata = pdata;

    $scope.createBrand = function () {

        console.warn("--hi")
        // $scope.lastName = "Doe";
        // $scope.brandName = "Mahesh";
        console.log($scope.brandName);
        console.log($scope.brandDesc);
        var brandData = {
            brandName: $scope.brandName,
            brandDesc: $scope.brandDesc,
        }
        // console.log(brandData);
        $http({ url: "http://localhost:5000/submitData", data: brandData, method: "POST" }).then(function (res) {
            console.log("---");
            if (res.status == 200) {
                $scope.pdata = res.data;
            }
        })
        // $http({
        //     url: 'http://localhost:5000/submitData',
        //     method: 'GET',
        //     data: brandData
        // }).then(function (httpResponse) {
        //     console.log('response:', httpResponse);
        // })
    }
    $scope.rowLimit = 3;
})