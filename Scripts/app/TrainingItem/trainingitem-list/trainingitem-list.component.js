System.register(["@angular/core", "@angular/forms", "../shared/trainingitem.service", "../shared/trainingitem.model", "../../Pagination/shared/pagination.model", "../../Pagination/shared/generalsearch.model", "@angular/router", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, trainingitem_service_1, trainingitem_model_1, pagination_model_1, generalsearch_model_1, router_1, auth_service_1, TrainingItemListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (trainingitem_service_1_1) {
                trainingitem_service_1 = trainingitem_service_1_1;
            },
            function (trainingitem_model_1_1) {
                trainingitem_model_1 = trainingitem_model_1_1;
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
            }
        ],
        execute: function () {
            TrainingItemListComponent = (function () {
                function TrainingItemListComponent(trainingitemService, authService, router, fb, acctypeService) {
                    this.trainingitemService = trainingitemService;
                    this.authService = authService;
                    this.router = router;
                    this.fb = fb;
                    this.acctypeService = acctypeService;
                    this.title = "TrainingItem";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                TrainingItemListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    this.trainingitemService.getTrainingItemList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.trainingitemAddForm = this.fb.group({
                        id: [""],
                        value: ["", [forms_1.Validators.required]],
                        isactive: [true]
                    });
                    this.data = new trainingitem_model_1.TrainingItem("", false, "", null, null);
                    this.itemid = "";
                };
                TrainingItemListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.trainingitemService.getTrainingItemList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                TrainingItemListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.trainingitemService.getTrainingItemList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                TrainingItemListComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    var trainingitem = new trainingitem_model_1.TrainingItem("", data.isactive, data.value, null, null);
                    this.trainingitemService.add(trainingitem).subscribe(function (data) {
                        if (data.error == null) {
                            _this.trainingitemService.getTrainingItemList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("added successfully");
                            _this.data = new trainingitem_model_1.TrainingItem("", false, "", null, null);
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
                TrainingItemListComponent.prototype.onAdd = function () {
                    jQuery('#txtName').val('');
                    jQuery('#ckIsActive').prop('checked', true);
                };
                TrainingItemListComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    // else, update it
                    // var trainingitem = new trainingitem(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
                    console.log(data);
                    this.trainingitemService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.trainingitemService.getTrainingItemList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
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
                TrainingItemListComponent.prototype.onEdit = function (id) {
                    var _this = this;
                    this.itemid = id;
                    if (id !== "") {
                        this.trainingitemService.get(id).subscribe(function (data) {
                            console.log(data);
                            _this.data = data;
                        });
                    }
                };
                TrainingItemListComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.trainingitemService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                TrainingItemListComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return TrainingItemListComponent;
            }());
            TrainingItemListComponent = __decorate([
                core_1.Component({
                    selector: 'trainingitem',
                    templateUrl: 'app/TrainingItem/trainingitem-list/trainingitem-list.component.html',
                    providers: [trainingitem_service_1.TrainingItemService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [trainingitem_service_1.TrainingItemService,
                    auth_service_1.AuthService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    trainingitem_service_1.TrainingItemService])
            ], TrainingItemListComponent);
            exports_1("TrainingItemListComponent", TrainingItemListComponent);
        }
    };
});
