System.register(["@angular/core", "@angular/forms", "../shared/reltrainingtrainingitem.service", "@angular/router", "../../auth.service", "../../TrainingItem/shared/trainingitem.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, reltrainingtrainingitem_service_1, router_1, auth_service_1, trainingitem_service_1, RelTrainingTrainingItemComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (reltrainingtrainingitem_service_1_1) {
                reltrainingtrainingitem_service_1 = reltrainingtrainingitem_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (trainingitem_service_1_1) {
                trainingitem_service_1 = trainingitem_service_1_1;
            }
        ],
        execute: function () {
            RelTrainingTrainingItemComponent = (function () {
                function RelTrainingTrainingItemComponent(reltrainingtrainingitemService, authService, router, fb, acctypeService, trainingItemService) {
                    this.reltrainingtrainingitemService = reltrainingtrainingitemService;
                    this.authService = authService;
                    this.router = router;
                    this.fb = fb;
                    this.acctypeService = acctypeService;
                    this.trainingItemService = trainingItemService;
                    this.title = "RelTrainingTrainingItem";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                RelTrainingTrainingItemComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.trainingItemService.getTrainingItemList(this.searchModel).subscribe(function (items) { return _this.trainingitems = items.Data; }, function (error) { return _this.errorMessage = error; });
                };
                return RelTrainingTrainingItemComponent;
            }());
            RelTrainingTrainingItemComponent = __decorate([
                core_1.Component({
                    selector: 'reltrainingtrainingitem',
                    templateUrl: 'app/RelTrainingTrainingItem/reltrainingtrainingitem/reltrainingtrainingitem.component.html',
                    providers: [reltrainingtrainingitem_service_1.RelTrainingTrainingItemService, reltrainingtrainingitem_service_1.RelTrainingTrainingItemService, forms_1.FormBuilder, trainingitem_service_1.TrainingItemService]
                }),
                __metadata("design:paramtypes", [reltrainingtrainingitem_service_1.RelTrainingTrainingItemService,
                    auth_service_1.AuthService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    reltrainingtrainingitem_service_1.RelTrainingTrainingItemService,
                    trainingitem_service_1.TrainingItemService])
            ], RelTrainingTrainingItemComponent);
            exports_1("RelTrainingTrainingItemComponent", RelTrainingTrainingItemComponent);
        }
    };
});
