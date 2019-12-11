

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

    $http({ url: "http://localhost:3000/getproducts", data: productParam, method: "POST" }).then(function (res) {
        console.log(res);
        if (res.status == 200) {
            $scope.pdata = res.data.data;
        }
    })
    // $scope.rowLimit = 3;



})


app.controller("addproductController", function ($scope, $http) {

    $scope.createBrand = function () {
        if ($scope.productForm.$valid) {
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
app.controller("brandsController", function ($scope, $http, fileUpload) {
    $scope.createBrand = function () {
        
        console.log("++++++++")
        if ($scope.brandForm.$valid) {
            var brandData = {
                brandName: $scope.brandName,
                brandDesc: $scope.brandDesc,
            }
            console.log(brandData);

            var file = $scope.myFile;
            var validFormats = ['jpg', 'jpeg', 'png'];
            console.log('file is ');
            console.log(file.name)
            console.log(file.name.substr(file.name.lastIndexOf('.') + 1))
            console.dir(file);
            var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
            if (ext == '') return;
            if (validFormats.indexOf(ext) == -1) {
                $scope.bFlag = 1
                $scope.msg = "please select valid type (for eg: 'jpg', 'jpeg', 'png')"
            } else {
                if (file.size > 5000) {
                    $scope.bFlag = 1
                    $scope.msg = "please select valid type "
                    alert("image size cannot greater than 5000")
                } else {
                    var uploadUrl = "http://localhost:5000/submitData"
                    fileUpload.uploadFileToUrl(file, uploadUrl);
                }

            }


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
app.controller('brandNavController', function NavCtrl($location, $scope) {

});

app.directive('validFile', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            ctrl.$setValidity('validFile', el.val() != '');
            //change event is fired when file is selected
            el.bind('change', function () {
                ctrl.$setValidity('validFile', el.val() != '');
                scope.$apply(function () {
                    ctrl.$setViewValue(el.val());
                    ctrl.$render();
                });
            });
        }
    }
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };

}]).service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        console.log("=====filetourl")
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
}]);
