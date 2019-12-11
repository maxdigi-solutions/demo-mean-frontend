

var app = angular.module("mean-back-end", ["ngRoute"]);
app.config(function ($routeProvider) {
    console.log("----")
    $routeProvider
        .when("/brands", {
            templateUrl: "view/brand/brand-list.html",
            controller: "brandsController"
        }).when("/brand-add-edit", {
            templateUrl: "view/brand/brand-add-edit.html",
        }).when("/products", {
            templateUrl: "view/product/product-list.html",
            controller: "productsController"
        }).when("/product-add-edit", {
            templateUrl: "view/product/product-add-edit.html",
            controller: "addproductController"
        })
        .otherwise({
            templateUrl: "view/home/home.html",
            // controller:"brandsController" 
        }
        )
});
// app.controller("londonCtrl", function ($scope) {
//     $scope.msg = "I love London";
// });
// app.controller("parisCtrl", function ($scope) {
//     $scope.msg = "I love Paris";
// });

app.controller("ViewBrandController", function ($scope, $http) {

    // $scope.pdata = pdata;
    $http({ url: "http://localhost:5000/getBrandData", method: "POST" }).then(function (res) {
        console.log(res);
        if (res.status == 200) {
            $scope.bdata = res.data;
        }
    })
    $scope.rowLimit = 3;
})
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
    
    
   
})


app.controller("addproductController", function ($scope, $http) {

        $scope.createBrand = function () {
            if ( $scope.productForm.$valid) {
                // var brandData = {
                //     brandName: $scope.brandName,
                //     brandDesc: $scope.brandDesc,
                // }
                // console.log(brandData);
                // $http({ url: "http://localhost:5000/submitData", data: brandData, method: "POST" }).then(function (res) {
                //     console.log("---");
                //     if (res.status == 200) {
                //         $scope.pdata = res.data;
                //     }
                // })
            }
            
     
    }
    $scope.rowLimit = 3;
})
app.controller("brandsController", function ($scope, $http) {
    $scope.createBrand = function () {

       
            if ( $scope.brandForm.$valid) {
                var brandData = {
                    brandName: $scope.brandName,
                    brandDesc: $scope.brandDesc,
                }
                console.log(brandData);
                $http({ url: "http://localhost:5000/submitData", data: brandData, method: "POST" }).then(function (res) {
                    console.log("---");
                    if (res.status == 200) {
                        $scope.pdata = res.data;
                    }
                })
            }
            
        
    }
    $scope.rowLimit = 3;
})
app.controller('brandNavController', function NavCtrl($location, $scope) {

});

app.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ctrl){
            ctrl.$setValidity('validFile', el.val() != '');
            //change event is fired when file is selected
            el.bind('change',function(){
                ctrl.$setValidity('validFile', el.val() != '');
                scope.$apply(function(){
                    ctrl.$setViewValue(el.val());
                    ctrl.$render();
                });
            });
        }
    }
})