import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Fabrics } from "../../Fabrics/shared/fabric.model";
import { FabricsService } from "../../Fabrics/shared/fabric.service";
import { FabricsCategoryService } from "../../FabricsCategory/shared/fabricscategory.service";
import { FabricsCategory } from "../../FabricsCategory/shared/fabricscategory.model";
import { FabricsProductName} from "../../FabricsProductName/shared/fabricsproductname.model";
import { FabricProductType } from "../../FabricProductType/shared/fabricproducttype.model";
import { FabricsProductNameService} from "../../FabricsProductName/shared/fabricsproductname.service";
import { FabricProductTypeService } from "../../FabricProductType/shared/fabricproducttype.service";
import { FabricsYarnCountService } from "../../FabricsYarnCount/shared/fabricsyarncount.service";
import { FabricsYarnCount} from "../../FabricsYarnCount/shared/fabricsyarncount.model";
import { FabricsFinishing } from "../../FabricsFinishing/shared/fabricsfinishing.model";
import { FabricsFinishingService } from "../../FabricsFinishing/shared/fabricsfinishing.service";
import { FabricWeight } from "../../FabricWeight/shared/fabricweight.model";
import { FabricWeightService } from "../../FabricWeight/shared/fabricweight.service";
import { FabricsFibreContentService } from "../../FabricsFibreContent/shared/fabricsfibrecontent.service";
import { FabricsFibreContent } from "../../FabricsFibreContent/shared/fabricsfibrecontent.model";
import { FabricsType } from "../../FabricsType/shared/fabricstype.model";
import { FabricsTypeService } from "../../FabricsType/shared/fabricstype.service";
import { Department } from "../../Department/shared/department.model";
import { DepartmentService } from "../../Department/shared/department.service";
import { Division } from "../../Division/shared/division.model";
import { DivisionService } from "../../Division/shared/division.service";
import { Brand } from "../../Brand/shared/brand.model";
import { BrandService } from "../../Brand/shared/brand.service";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { Color } from "../../Color/shared/color.model";
import { ColorService } from "../../Color/shared/color.service";
import { ColorSearchModel } from "../../Color/shared/color-search.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model"; 
declare var jQuery: any;

@Component({
    selector: "fabrics-add",
    templateUrl: "app/Fabrics/fabrics/fabrics-add.component.html",
    providers: [FabricWeightService,FabricProductTypeService, FabricsTypeService,ColorService,FabricsService, FormBuilder, FabricsCategoryService, FabricsProductNameService, FabricsYarnCountService, FabricsFinishingService, FabricsFibreContentService, Validators, DepartmentService, BrandService, DivisionService,FabricsTypeService]
})

export class FabricsAddComponent {
    data: Fabrics;
    title: string;
    fabricsForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    categories: FabricsCategory[];
    productnames: FabricsProductName[];
    yarncounts: FabricsYarnCount[];
    finishings: FabricsFinishing[];
    fibrecontents: FabricsFibreContent[];
    fabtypes: FabricsType[];
    brands: Brand[];
    divisions: Division[];
    departments: Department[];
    colors: Color[];
    producttypes:FabricProductType[];
    weights:FabricWeight[];
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    disableProductName: boolean;
    disableCategory: boolean;
    listimages: string[];
    mainimage: string;
    constructor(
        private fb: FormBuilder,
        private categoryService: FabricsCategoryService,
        private productnameService: FabricsProductNameService,
        private yarncountService: FabricsYarnCountService,
        private fabtypeService: FabricsTypeService,
        private deptService: DepartmentService,
        private divService: DivisionService,
        private brandService: BrandService,
        private finishingService: FabricsFinishingService,
        private fabricsService: FabricsService,
        private fibrecontentService:FabricsFibreContentService,
        private weightService:FabricWeightService,
        private producttypeService:FabricProductTypeService,
        private router: Router,
        private colorService: ColorService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute  ) {
    }
  
    fileChangeEvent() {

        var fileUpload = jQuery("#files").get(0);
        var files = fileUpload.files;
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }
        jQuery.ajax({
            type: "POST",
            url: "api/fabric/UploadImage",
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                jQuery('#imgPreview').prop("src", data[0].UploadPath);
                this.mainimage = data[0].UploadPath;
                var imagepath = "";
                var appendstring = "";
                for (var i = 0; i < data.length; i++) {

                    imagepath += data[i].UploadPath + "|";
                    appendstring += "<li><a href=\"javascript:void(0);\" [(click)]=\"changeImage(" + data[i].UploadPath + ")\"><img src=\"" + data[i].UploadPath + "\" alt=\"accessory image\"></a></li>"
                    // this.listimages.push(data[i].UploadPath);
                }
                jQuery('#hdImage').val(imagepath);
                jQuery('#imagecontainer').html('');
                jQuery('#imagecontainer').html(appendstring);
                this.data.Image = imagepath;
            },
            error: function () {
                alert("There was error uploading files!");
            }
        });

    }
    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.disableCategory = true;
        this.disableProductName = true;

        this.fabricsForm = this.fb.group(
            {                          
                buyercode: [""],
                fabtype:[""],
                category: [null, [Validators.required]],
                productname: [""],
                yarncount: [""],
                fibrecontent: [""],
                finishing: [""],
                weight: [""],
                supplier: [""],
                suppliercode: [""],
                isactive: [true],
                fabricstype: [""],
                brand: [""],
                department: [""],
                division: [""],
                remark: [""],
                color:[""],
                producttype: [""],
                description:[""]

            }
        );
        var searchGeneralFilter = new SearchGeneralFilter("", "", "", "");
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);

        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);


        this.categoryService.getFabricsCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.fabtypeService.getFabricsTypeList(getAll).subscribe(items => this.fabtypes = items.Data, error => this.errorMessage = <any>error);
        this.productnameService.getFabricsProductNameList(getAll).subscribe(items => this.productnames = items.Data, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(getAll).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.deptService.getDepartmentList(getAll).subscribe(items => this.departments = items.Data, error => this.errorMessage = <any>error);
        this.divService.getDivisionList(getAll).subscribe(items => this.divisions = items.Data, error => this.errorMessage = <any>error);
        this.colorService.getColorList(getAll).subscribe(items => this.colors = items.Data, error => this.errorMessage = <any>error);
        this.yarncountService.getFabricsYarnCountList(getAll).subscribe(items => this.yarncounts = items.Data, error => this.errorMessage = <any>error);
        this.finishingService.getFabricsFinishingList(getAll).subscribe(items => this.finishings = items.Data, error => this.errorMessage = <any>error);
        this.producttypeService.getFabricProductTypeList(getAll).subscribe(items => this.producttypes = items.Data, error => this.errorMessage = <any>error);
        this.weightService.getFabricWeightList(getAll).subscribe(items => this.weights = items.Data, error => this.errorMessage = <any>error);
        this.fibrecontentService.getFabricsFibreContentList(getAll).subscribe(items => this.fibrecontents = items.Data, error => this.errorMessage = <any>error);
        this.data = new Fabrics("",false,"","","","","","","","","","","","","","","","","","","",[],"");
        this.title = "New Fabrics";
    }

  

    onSubmit(data: any) {
        var newData = new Fabrics("", data.isactive, "", data.buyercode, data.category, jQuery('#hdImage').val(), data.yarncount, data.fibrecontent, data.finishing,
            data.weight,data.supplier,data.suppliercode,data.fabtype,data.brand,data.department,data.division,data.remark,data.color,data.producttype,data.productname,data.description,[],"" );
        this.fabricsService.add(newData).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                alert('Fabric added successfully');
               // this.data = new Fabrics("", false, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", [], "");
                this.router.navigate(["/fabrics"]);
            }
            else {
                this.errorMessage = data.error;
                alert(this.errorMessage);
            }
        },
            (error) => {
                this.errorMessage = error;
              
            }
        );

    }

    changeType(id: string) {
        if (id === "") {

            this.disableCategory = true;
            this.disableProductName = true;
        } else {

            this.disableCategory = false;
            this.categoryService.getFabCateogryListByType(id).subscribe(items => this.categories = items, error => this.errorMessage = <any>error);
        }


    }
    changeCategory(id: string) {
        if (id === "") {

            this.disableProductName = true;
        } else {
            this.disableProductName = false;
            this.productnameService.getFabProductNameByCategory(id).subscribe(items => this.productnames = items, error => this.errorMessage = <any>error);
        }

    }
    doUpload() {
        jQuery("#files").trigger("click");
    }
}