System.register(["@angular/core", "@angular/forms", "../shared/training.service", "../shared/training.model", "../../Pagination/shared/pagination.model", "../../Pagination/shared/generalsearch.model", "@angular/router", "../../auth.service", "../../Brand/shared/brand.service", "../../TrainingItem/shared/trainingitem.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, forms_1, training_service_1, training_model_1, pagination_model_1, generalsearch_model_1, router_1, auth_service_1, brand_service_1, trainingitem_service_1, TrainingListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (training_service_1_1) {
                training_service_1 = training_service_1_1;
            },
            function (training_model_1_1) {
                training_model_1 = training_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            },
            function (generalsearch_model_1_1) {
                generalsearch_model_1 = generalsearch_model_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (brand_service_1_1) {
                brand_service_1 = brand_service_1_1;
            },
            function (trainingitem_service_1_1) {
                trainingitem_service_1 = trainingitem_service_1_1;
            }
        ],
        execute: function () {
            TrainingListComponent = (function () {
                function TrainingListComponent(trainingService, authService, router, fb, acctypeService, brandService, trainingItemService) {
                    this.trainingService = trainingService;
                    this.authService = authService;
                    this.router = router;
                    this.fb = fb;
                    this.acctypeService = acctypeService;
                    this.brandService = brandService;
                    this.trainingItemService = trainingItemService;
                    this.title = "Training";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                TrainingListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    this.trainingService.getTrainingList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.brandService.getBrandList(this.searchModel).subscribe(function (items) { return _this.brands = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.trainingAddForm = this.fb.group({
                        id: [""],
                        name: ["", [forms_1.Validators.required]],
                        age: ["", [forms_1.Validators.required]],
                        isactive: [true]
                    });
                    this.data = new training_model_1.Training("", false, "", "");
                    this.itemid = "";
                };
                TrainingListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.trainingService.getTrainingList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                TrainingListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.trainingService.getTrainingList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                TrainingListComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    var training = new training_model_1.Training("", data.isactive, data.name, data.age);
                    this.trainingService.add(training).subscribe(function (data) {
                        if (data.error == null) {
                            _this.trainingService.getTrainingList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("added successfully");
                            _this.data = new training_model_1.Training("", false, "", "");
                            jQuery('#txtName').val('');
                            jQuery('#ckIsActive').prop('checked', true);
                        }
                        else {
                            // update failure
                            _this.errorMessage = data.error;
                            alert(_this.errorMessage);
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        alert(_this.errorMessage);
                    });
                    jQuery('#myModalAdd').modal('hide');
                };
                TrainingListComponent.prototype.onAdd = function () {
                    var _this = this;
                    jQuery('#txtName').val('');
                    jQuery('#ckIsActive').prop('checked', true);
                    this.trainingItemService.getTrainingItemList(this.searchModel).subscribe(function (items) { return _this.trainingitems = items.Data; }, function (error) { return _this.errorMessage = error; });
                };
                TrainingListComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    // else, update it
                    // var training = new Training(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
                    console.log(data);
                    this.trainingService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.trainingService.getTrainingList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("updated successfully");
                            jQuery('#myModalEdit').modal('hide');
                            _this.itemid == "";
                        }
                        else {
                            // update failure
                            _this.errorMessage = data.error;
                            alert(_this.errorMessage);
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        alert(_this.errorMessage);
                    });
                };
                TrainingListComponent.prototype.onEdit = function (id) {
                    var _this = this;
                    this.itemid = id;
                    if (id !== "") {
                        this.trainingService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                        this.trainingItemService.getTrainingItemList(this.searchModel).subscribe(function (items) { return _this.trainingitems = items.Data; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                TrainingListComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.trainingService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                TrainingListComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return TrainingListComponent;
            }());
            TrainingListComponent = __decorate([
                core_1.Component({
                    selector: 'training',
                    templateUrl: 'app/Training/training-list/training-list.component.html',
                    providers: [training_service_1.TrainingService, forms_1.FormBuilder, brand_service_1.BrandService, trainingitem_service_1.TrainingItemService]
                }),
                __metadata("design:paramtypes", [training_service_1.TrainingService,
                    auth_service_1.AuthService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    training_service_1.TrainingService,
                    brand_service_1.BrandService,
                    trainingitem_service_1.TrainingItemService])
            ], TrainingListComponent);
            exports_1("TrainingListComponent", TrainingListComponent);
        }
    };
});
