import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserRoleService } from "../shared/userRole.service";
import { UserRoleMatrix } from "../shared/UserRoleMatrix.model";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "userRole-edit",
    template: `
    <div class="error-message" #errorDiv></div>
    <div>
        <h2>
            <a href="javascript:void(0)" (click)="onBack()">
                &laquo; Back to User List
            </a>
        </h2>
        <div class="user-container">
            <form class="form-user" #userForm="ngForm" *ngIf="data">
                <h2 class="form-user-heading">{{title}}</h2>



                <div class="form-group">
                    <input name="input-name" type="text" class="form-control" placeholder="Enter user name" [(ngModel)]="data.Name" #username="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                    <span class="validator-label valid" *ngIf="username.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!username.valid && !username.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    Is Active? <input name="input-isActive" type="checkbox" [(ngModel)]="data.IsActive" #isActive="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                </div>

                <div class="form-group">
                    <table id="tbUserMatrix">
                        <tr>
                            <td><b>Front End</b></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>View</td>
                            <td>Allow</td>
                            <td>Deny</td>
                            <td>Approve</td>
                            <td>Chat</td>
                        </tr>
                        <tr>
                            <td>Project Setup</td>
                            <td><input name="level1" type="checkbox" [(ngModel)]="cbLevel1" autofocus /></td>
                            <td><input name="level2" type="checkbox" [(ngModel)]="cbLevel2" autofocus /></td>
                            <td><input name="level3" type="checkbox" [(ngModel)]="cbLevel3" autofocus /></td>
                            <td><input name="level4" type="checkbox" [(ngModel)]="cbLevel4" autofocus /></td>
                            <td><input name="level5" type="checkbox" [(ngModel)]="cbLevel5" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Colorway</td>
                            <td><input name="level6" type="checkbox" [(ngModel)]="cbLevel6" autofocus /></td>
                            <td><input name="level7" type="checkbox" [(ngModel)]="cbLevel7" autofocus /></td>
                            <td><input name="level8" type="checkbox" [(ngModel)]="cbLevel8" autofocus /></td>
                            <td><input name="level9" type="checkbox" [(ngModel)]="cbLevel9" autofocus /></td>
                            <td><input name="level10" type="checkbox" [(ngModel)]="cbLevel0" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Fabrics</td>
                            <td><input name="level11" type="checkbox" [(ngModel)]="cbLevel11" autofocus /></td>
                            <td><input name="level12" type="checkbox" [(ngModel)]="cbLevel12" autofocus /></td>
                            <td><input name="level13" type="checkbox" [(ngModel)]="cbLevel13" autofocus /></td>
                            <td><input name="level14" type="checkbox" [(ngModel)]="cbLevel14" autofocus /></td>
                            <td><input name="level15" type="checkbox" [(ngModel)]="cbLevel15" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Accessories</td>
                            <td><input name="level16" type="checkbox" [(ngModel)]="cbLevel16" autofocus /></td>
                            <td><input name="level17" type="checkbox" [(ngModel)]="cbLevel17" autofocus /></td>
                            <td><input name="level18" type="checkbox" [(ngModel)]="cbLevel18" autofocus /></td>
                            <td><input name="level19" type="checkbox" [(ngModel)]="cbLevel19" autofocus /></td>
                            <td><input name="level20" type="checkbox" [(ngModel)]="cbLevel20" autofocus /></td>
                        </tr>
                        <tr>
                            <td>PEW</td>
                            <td><input name="level21" type="checkbox" [(ngModel)]="cbLevel21" autofocus /></td>
                            <td><input name="level22" type="checkbox" [(ngModel)]="cbLevel22" autofocus /></td>
                            <td><input name="level23" type="checkbox" [(ngModel)]="cbLevel23" autofocus /></td>
                            <td><input name="level24" type="checkbox" [(ngModel)]="cbLevel24" autofocus /></td>
                            <td><input name="level25" type="checkbox" [(ngModel)]="cbLevel25" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Guided Spec</td>
                            <td><input name="level26" type="checkbox" [(ngModel)]="cbLevel26" autofocus /></td>
                            <td><input name="level27" type="checkbox" [(ngModel)]="cbLevel27" autofocus /></td>
                            <td><input name="level28" type="checkbox" [(ngModel)]="cbLevel28" autofocus /></td>
                            <td><input name="level29" type="checkbox" [(ngModel)]="cbLevel29" autofocus /></td>
                            <td><input name="level30" type="checkbox" [(ngModel)]="cbLevel30" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Color Details</td>
                            <td><input name="level31" type="checkbox" [(ngModel)]="cbLevel31" autofocus /></td>
                            <td><input name="level32" type="checkbox" [(ngModel)]="cbLevel32" autofocus /></td>
                            <td><input name="level33" type="checkbox" [(ngModel)]="cbLevel33" autofocus /></td>
                            <td><input name="level34" type="checkbox" [(ngModel)]="cbLevel34" autofocus /></td>
                            <td><input name="level35" type="checkbox" [(ngModel)]="cbLevel35" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Techpack</td>
                            <td><input name="level36" type="checkbox" [(ngModel)]="cbLevel36" autofocus /></td>
                            <td><input name="level37" type="checkbox" [(ngModel)]="cbLevel37" autofocus /></td>
                            <td><input name="level38" type="checkbox" [(ngModel)]="cbLevel38" autofocus /></td>
                            <td><input name="level39" type="checkbox" [(ngModel)]="cbLevel39" autofocus /></td>
                            <td><input name="level40" type="checkbox" [(ngModel)]="cbLevel40" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Sample Vendor</td>
                            <td><input name="level41" type="checkbox" [(ngModel)]="cbLevel41" autofocus /></td>
                            <td><input name="level42" type="checkbox" [(ngModel)]="cbLevel42" autofocus /></td>
                            <td><input name="level43" type="checkbox" [(ngModel)]="cbLevel43" autofocus /></td>
                            <td><input name="level44" type="checkbox" [(ngModel)]="cbLevel44" autofocus /></td>
                            <td><input name="level45" type="checkbox" [(ngModel)]="cbLevel45" autofocus /></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><b>Back End</b></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>View</td>
                            <td>Allow</td>
                            <td>Deny</td>
                            <td>Approve</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>General Library</td>
                            <td><input name="level46" type="checkbox" [(ngModel)]="cbLevel46" autofocus /></td>
                            <td><input name="level47" type="checkbox" [(ngModel)]="cbLevel47" autofocus /></td>
                            <td><input name="level48" type="checkbox" [(ngModel)]="cbLevel48" autofocus /></td>
                            <td><input name="level49" type="checkbox" [(ngModel)]="cbLevel49" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Color Library</td>
                            <td><input name="level50" type="checkbox" [(ngModel)]="cbLevel50" autofocus /></td>
                            <td><input name="level51" type="checkbox" [(ngModel)]="cbLevel51" autofocus /></td>
                            <td><input name="level52" type="checkbox" [(ngModel)]="cbLevel52" autofocus /></td>
                            <td><input name="level53" type="checkbox" [(ngModel)]="cbLevel53" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Fabric Library</td>
                            <td><input name="level54" type="checkbox" [(ngModel)]="cbLevel54" autofocus /></td>
                            <td><input name="level55" type="checkbox" [(ngModel)]="cbLevel55" autofocus /></td>
                            <td><input name="level56" type="checkbox" [(ngModel)]="cbLevel56" autofocus /></td>
                            <td><input name="level57" type="checkbox" [(ngModel)]="cbLevel57" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Accessory Library</td>
                            <td><input name="level58" type="checkbox" [(ngModel)]="cbLevel58" autofocus /></td>
                            <td><input name="level59" type="checkbox" [(ngModel)]="cbLevel59" autofocus /></td>
                            <td><input name="level60" type="checkbox" [(ngModel)]="cbLevel60" autofocus /></td>
                            <td><input name="level61" type="checkbox" [(ngModel)]="cbLevel61" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Graphic Library</td>
                            <td><input name="level62" type="checkbox" [(ngModel)]="cbLevel62" autofocus /></td>
                            <td><input name="level63" type="checkbox" [(ngModel)]="cbLevel63" autofocus /></td>
                            <td><input name="level64" type="checkbox" [(ngModel)]="cbLevel64" autofocus /></td>
                            <td><input name="level65" type="checkbox" [(ngModel)]="cbLevel65" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Wash Library</td>
                            <td><input name="level66" type="checkbox" [(ngModel)]="cbLevel66" autofocus /></td>
                            <td><input name="level67" type="checkbox" [(ngModel)]="cbLevel67" autofocus /></td>
                            <td><input name="level68" type="checkbox" [(ngModel)]="cbLevel68" autofocus /></td>
                            <td><input name="level69" type="checkbox" [(ngModel)]="cbLevel69" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Shipping Library</td>
                            <td><input name="level70" type="checkbox" [(ngModel)]="cbLevel70" autofocus /></td>
                            <td><input name="level71" type="checkbox" [(ngModel)]="cbLevel71" autofocus /></td>
                            <td><input name="level72" type="checkbox" [(ngModel)]="cbLevel72" autofocus /></td>
                            <td><input name="level73" type="checkbox" [(ngModel)]="cbLevel73" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Spec Library</td>
                            <td><input name="level74" type="checkbox" [(ngModel)]="cbLevel74" autofocus /></td>
                            <td><input name="level75" type="checkbox" [(ngModel)]="cbLevel75" autofocus /></td>
                            <td><input name="level76" type="checkbox" [(ngModel)]="cbLevel76" autofocus /></td>
                            <td><input name="level77" type="checkbox" [(ngModel)]="cbLevel77" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Techpack Library</td>
                            <td><input name="level78" type="checkbox" [(ngModel)]="cbLevel78" autofocus /></td>
                            <td><input name="level79" type="checkbox" [(ngModel)]="cbLevel79" autofocus /></td>
                            <td><input name="level80" type="checkbox" [(ngModel)]="cbLevel80" autofocus /></td>
                            <td><input name="level81" type="checkbox" [(ngModel)]="cbLevel81" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><b>User Access</b></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>Allow</td>
                            <td>Deny</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Create User</td>
                            <td><input name="level82" type="checkbox" [(ngModel)]="cbLevel82" autofocus /></td>
                            <td><input name="level83" type="checkbox" [(ngModel)]="cbLevel83" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Edit User</td>
                            <td><input name="level84" type="checkbox" [(ngModel)]="cbLevel84" autofocus /></td>
                            <td><input name="level85" type="checkbox" [(ngModel)]="cbLevel85" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Delete User</td>
                            <td><input name="level86" type="checkbox" [(ngModel)]="cbLevel86" autofocus /></td>
                            <td><input name="level87" type="checkbox" [(ngModel)]="cbLevel87" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Assign User to Role</td>
                            <td><input name="level88" type="checkbox" [(ngModel)]="cbLevel88" autofocus /></td>
                            <td><input name="level89" type="checkbox" [(ngModel)]="cbLevel89" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Vendor/Supplier Management</td>
                            <td><input name="level90" type="checkbox" [(ngModel)]="cbLevel90" autofocus /></td>
                            <td><input name="level91" type="checkbox" [(ngModel)]="cbLevel91" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>

                </div>


                <div class="form-group">
                    <input type="button" class="btn btn-primary btn-block" [disabled]="!username.valid || !isFormValuesChanged" value="Update" (click)="onUpdate(data)" /><br />
                    <input type="button" class="btn btn-danger btn-block" [disabled]="!username.valid" value="Delete" (click)="deleteConfirm()" />
                </div>
                <div class="dialog" *ngIf="isDelete">
                    <h3>Are you sure to delete ?</h3>
                    <input type="button" class="btn btn-danger btn-block" value="Yes" (click)="onDelete(data)" />   <br />
                    <input type="button" class="btn btn-primary btn-block" value="No" (click)="close()" />
                </div>
                <div *ngIf="isDelete" class="overlay" (click)="Close()"></div>
            </form>
        </div>
    </div>
`,
    providers: [UserRoleService, FormBuilder]
})

export class UserRoleEditComponent {
    data: UserRoleMatrix;
    title = "Edit User Role Matrix";
    userMatrixForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    isDelete = false;
    //isFormValuesChanged = false;
    isFormValuesChanged = true;
    oldData: UserRoleMatrix;

    cbLevel1: boolean;
    cbLevel2: boolean;
    cbLevel3: boolean;
    cbLevel4: boolean;
    cbLevel5: boolean;
    cbLevel6: boolean;
    cbLevel7: boolean;
    cbLevel8: boolean;
    cbLevel9: boolean;
    cbLevel10: boolean;
    cbLevel11: boolean;
    cbLevel12: boolean;
    cbLevel13: boolean;
    cbLevel14: boolean;
    cbLevel15: boolean;
    cbLevel16: boolean;
    cbLevel17: boolean;
    cbLevel18: boolean;
    cbLevel19: boolean;
    cbLevel20: boolean;
    cbLevel21: boolean;
    cbLevel22: boolean;
    cbLevel23: boolean;
    cbLevel24: boolean;
    cbLevel25: boolean;
    cbLevel26: boolean;
    cbLevel27: boolean;
    cbLevel28: boolean;
    cbLevel29: boolean;
    cbLevel30: boolean;
    cbLevel31: boolean;
    cbLevel32: boolean;
    cbLevel33: boolean;
    cbLevel34: boolean;
    cbLevel35: boolean;
    cbLevel36: boolean;
    cbLevel37: boolean;
    cbLevel38: boolean;
    cbLevel39: boolean;
    cbLevel40: boolean;
    cbLevel41: boolean;
    cbLevel42: boolean;
    cbLevel43: boolean;
    cbLevel44: boolean;
    cbLevel45: boolean;
    cbLevel46: boolean;
    cbLevel47: boolean;
    cbLevel48: boolean;
    cbLevel49: boolean;
    cbLevel50: boolean;
    cbLevel51: boolean;
    cbLevel52: boolean;
    cbLevel53: boolean;
    cbLevel54: boolean;
    cbLevel55: boolean;
    cbLevel56: boolean;
    cbLevel57: boolean;
    cbLevel58: boolean;
    cbLevel59: boolean;
    cbLevel60: boolean;
    cbLevel61: boolean;
    cbLevel62: boolean;
    cbLevel63: boolean;
    cbLevel64: boolean;
    cbLevel65: boolean;
    cbLevel66: boolean;
    cbLevel67: boolean;
    cbLevel68: boolean;
    cbLevel69: boolean;
    cbLevel70: boolean;
    cbLevel71: boolean;
    cbLevel72: boolean;
    cbLevel73: boolean;
    cbLevel74: boolean;
    cbLevel75: boolean;
    cbLevel76: boolean;
    cbLevel77: boolean;
    cbLevel78: boolean;
    cbLevel79: boolean;
    cbLevel80: boolean;
    cbLevel81: boolean;
    cbLevel82: boolean;
    cbLevel83: boolean;
    cbLevel84: boolean;
    cbLevel85: boolean;
    cbLevel86: boolean;
    cbLevel87: boolean;
    cbLevel88: boolean;
    cbLevel89: boolean;
    cbLevel90: boolean;
    cbLevel91: boolean;

    constructor(
        private fb: FormBuilder,
        private userRoleService: UserRoleService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }


    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        var id = this.activatedRoute.snapshot.params["id"];
        if (id !== "") {
            this.userRoleService.get(id).subscribe((data) => {
                this.data = data;

                this.PopulatePremissionData(this.data.PremissionLevel)
            });

            
        }
        else {
            this.router.navigate(["userrolelist/add"]);
        }
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    onUpdate(data: UserRoleMatrix) {
        this.data.PremissionLevel = this.GetPremissionLevel();
        this.data.Id = this.activatedRoute.snapshot.params["id"];
        console.log("test:" + this.data.PremissionLevel);

        this.userRoleService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'User role details updated successfully';
                this.displayMessage(this.errorMessage, true);
            }
            else {
                // update failure
                this.errorMessage = data.error;
                this.displayMessage(this.errorMessage, false);
            }
        },
            (error) => {
                this.errorMessage = error;
                this.displayMessage(this.errorMessage, false);
            }
        );
    }

    onDelete(data: UserRoleMatrix) {
        this.userRoleService.delete(data.Id).subscribe((data) => {
            if (data.error == null) {
                this.router.navigate(["userlist"]);
            }
            else {
                // update failure
                this.errorMessage = data.error;
                this.displayMessage(this.errorMessage, false);
            }
        },
            (error) => {
                this.errorMessage = error;
                this.displayMessage(this.errorMessage, false);
            }
        );

        this.isDelete = false;
    }

    onBack() {
        this.router.navigate(["userrolelist"]);
    }

    deleteConfirm() {
        this.isDelete = true;
    }

    close() {
        this.isDelete = false;
    }

    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }

    isFormChanged(value) {
        this.userRoleService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: UserRoleMatrix) {
        console.log(this.data);
        console.log(oldData);
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            //this.isFormValuesChanged = false;
            this.isFormValuesChanged = true;
        else
            this.isFormValuesChanged = true;
    }

    // Helper
    PopulatePremissionData(premissionLevelStr: string) {
        var preArr = premissionLevelStr.split('|');
        console.log(preArr);

        this.cbLevel1 = this.GetCheckboxValueHelper(preArr[0][0]);
        this.cbLevel2 = this.GetCheckboxValueHelper(preArr[0][1]);
        this.cbLevel3 = this.GetCheckboxValueHelper(preArr[0][2]);
        this.cbLevel4 = this.GetCheckboxValueHelper(preArr[0][3]);
        this.cbLevel5 = this.GetCheckboxValueHelper(preArr[0][4]);

        this.cbLevel6 = this.GetCheckboxValueHelper(preArr[1][0]);
        this.cbLevel7 = this.GetCheckboxValueHelper(preArr[1][1]);
        this.cbLevel8 = this.GetCheckboxValueHelper(preArr[1][2]);
        this.cbLevel9 = this.GetCheckboxValueHelper(preArr[1][3]);
        this.cbLevel10 = this.GetCheckboxValueHelper(preArr[1][4]);

        this.cbLevel11 = this.GetCheckboxValueHelper(preArr[2][0]);
        this.cbLevel12 = this.GetCheckboxValueHelper(preArr[2][1]);
        this.cbLevel13 = this.GetCheckboxValueHelper(preArr[2][2]);
        this.cbLevel14 = this.GetCheckboxValueHelper(preArr[2][3]);
        this.cbLevel15 = this.GetCheckboxValueHelper(preArr[2][4]);

        this.cbLevel16 = this.GetCheckboxValueHelper(preArr[3][0]);
        this.cbLevel17 = this.GetCheckboxValueHelper(preArr[3][1]);
        this.cbLevel18 = this.GetCheckboxValueHelper(preArr[3][2]);
        this.cbLevel19 = this.GetCheckboxValueHelper(preArr[3][3]);
        this.cbLevel20 = this.GetCheckboxValueHelper(preArr[3][4]);

        this.cbLevel21 = this.GetCheckboxValueHelper(preArr[4][0]);
        this.cbLevel22 = this.GetCheckboxValueHelper(preArr[4][1]);
        this.cbLevel23 = this.GetCheckboxValueHelper(preArr[4][2]);
        this.cbLevel24 = this.GetCheckboxValueHelper(preArr[4][3]);
        this.cbLevel25 = this.GetCheckboxValueHelper(preArr[4][4]);

        this.cbLevel26 = this.GetCheckboxValueHelper(preArr[5][0]);
        this.cbLevel27 = this.GetCheckboxValueHelper(preArr[5][1]);
        this.cbLevel28 = this.GetCheckboxValueHelper(preArr[5][2]);
        this.cbLevel29 = this.GetCheckboxValueHelper(preArr[5][3]);
        this.cbLevel30 = this.GetCheckboxValueHelper(preArr[5][4]);

        this.cbLevel31 = this.GetCheckboxValueHelper(preArr[6][0]);
        this.cbLevel32 = this.GetCheckboxValueHelper(preArr[6][1]);
        this.cbLevel33 = this.GetCheckboxValueHelper(preArr[6][2]);
        this.cbLevel34 = this.GetCheckboxValueHelper(preArr[6][3]);
        this.cbLevel35 = this.GetCheckboxValueHelper(preArr[6][4]);

        this.cbLevel36 = this.GetCheckboxValueHelper(preArr[7][0]);
        this.cbLevel37 = this.GetCheckboxValueHelper(preArr[7][1]);
        this.cbLevel38 = this.GetCheckboxValueHelper(preArr[7][2]);
        this.cbLevel39 = this.GetCheckboxValueHelper(preArr[7][3]);
        this.cbLevel40 = this.GetCheckboxValueHelper(preArr[7][4]);

        this.cbLevel41 = this.GetCheckboxValueHelper(preArr[8][0]);
        this.cbLevel42 = this.GetCheckboxValueHelper(preArr[8][1]);
        this.cbLevel43 = this.GetCheckboxValueHelper(preArr[8][2]);
        this.cbLevel44 = this.GetCheckboxValueHelper(preArr[8][3]);
        this.cbLevel45 = this.GetCheckboxValueHelper(preArr[8][4]);

        this.cbLevel46 = this.GetCheckboxValueHelper(preArr[9][0]);
        this.cbLevel47 = this.GetCheckboxValueHelper(preArr[9][1]);
        this.cbLevel48 = this.GetCheckboxValueHelper(preArr[9][2]);
        this.cbLevel49 = this.GetCheckboxValueHelper(preArr[9][3]);

        this.cbLevel50 = this.GetCheckboxValueHelper(preArr[10][0]);
        this.cbLevel51 = this.GetCheckboxValueHelper(preArr[10][1]);
        this.cbLevel52 = this.GetCheckboxValueHelper(preArr[10][2]);
        this.cbLevel53 = this.GetCheckboxValueHelper(preArr[10][3]);

        this.cbLevel54 = this.GetCheckboxValueHelper(preArr[11][0]);
        this.cbLevel55 = this.GetCheckboxValueHelper(preArr[11][1]);
        this.cbLevel56 = this.GetCheckboxValueHelper(preArr[11][2]);
        this.cbLevel57 = this.GetCheckboxValueHelper(preArr[11][3]);

        this.cbLevel58 = this.GetCheckboxValueHelper(preArr[12][0]);
        this.cbLevel59 = this.GetCheckboxValueHelper(preArr[12][1]);
        this.cbLevel60 = this.GetCheckboxValueHelper(preArr[12][2]);
        this.cbLevel61 = this.GetCheckboxValueHelper(preArr[12][3]);

        this.cbLevel62 = this.GetCheckboxValueHelper(preArr[13][0]);
        this.cbLevel63 = this.GetCheckboxValueHelper(preArr[13][1]);
        this.cbLevel64 = this.GetCheckboxValueHelper(preArr[13][2]);
        this.cbLevel65 = this.GetCheckboxValueHelper(preArr[13][3]);

        this.cbLevel66 = this.GetCheckboxValueHelper(preArr[14][0]);
        this.cbLevel67 = this.GetCheckboxValueHelper(preArr[14][1]);
        this.cbLevel68 = this.GetCheckboxValueHelper(preArr[14][2]);
        this.cbLevel69 = this.GetCheckboxValueHelper(preArr[14][3]);

        this.cbLevel70 = this.GetCheckboxValueHelper(preArr[15][0]);
        this.cbLevel71 = this.GetCheckboxValueHelper(preArr[15][1]);
        this.cbLevel72 = this.GetCheckboxValueHelper(preArr[15][2]);
        this.cbLevel73 = this.GetCheckboxValueHelper(preArr[15][3]);

        this.cbLevel74 = this.GetCheckboxValueHelper(preArr[16][0]);
        this.cbLevel75 = this.GetCheckboxValueHelper(preArr[16][1]);
        this.cbLevel76 = this.GetCheckboxValueHelper(preArr[16][2]);
        this.cbLevel77 = this.GetCheckboxValueHelper(preArr[16][3]);

        this.cbLevel78 = this.GetCheckboxValueHelper(preArr[17][0]);
        this.cbLevel79 = this.GetCheckboxValueHelper(preArr[17][1]);
        this.cbLevel80 = this.GetCheckboxValueHelper(preArr[17][2]);
        this.cbLevel81 = this.GetCheckboxValueHelper(preArr[17][3]);

        this.cbLevel82 = this.GetCheckboxValueHelper(preArr[18][0]);
        this.cbLevel83 = this.GetCheckboxValueHelper(preArr[18][1]);

        this.cbLevel84 = this.GetCheckboxValueHelper(preArr[19][0]);
        this.cbLevel85 = this.GetCheckboxValueHelper(preArr[19][1]);

        this.cbLevel86 = this.GetCheckboxValueHelper(preArr[20][0]);
        this.cbLevel87 = this.GetCheckboxValueHelper(preArr[20][1]);

        this.cbLevel88 = this.GetCheckboxValueHelper(preArr[21][0]);
        this.cbLevel89 = this.GetCheckboxValueHelper(preArr[21][1]);

        this.cbLevel90 = this.GetCheckboxValueHelper(preArr[22][0]);
        this.cbLevel91 = this.GetCheckboxValueHelper(preArr[22][1]);
    }
    GetCheckboxValueHelper(value: string) {
        if (value == "0")
            return false;
        else
            return true;
    }
    GetPremissionLevel() {
        var result = "";

        result += this.GetPremissionValueHelper(this.cbLevel1);
        result += this.GetPremissionValueHelper(this.cbLevel2);
        result += this.GetPremissionValueHelper(this.cbLevel3);
        result += this.GetPremissionValueHelper(this.cbLevel4);
        result += this.GetPremissionValueHelper(this.cbLevel5);
        
        result += this.GetPremissionValueHelper(this.cbLevel6);
        result += this.GetPremissionValueHelper(this.cbLevel7);
        result += this.GetPremissionValueHelper(this.cbLevel8);
        result += this.GetPremissionValueHelper(this.cbLevel9);
        result += this.GetPremissionValueHelper(this.cbLevel10);
       
        result += this.GetPremissionValueHelper(this.cbLevel11);
        result += this.GetPremissionValueHelper(this.cbLevel12);
        result += this.GetPremissionValueHelper(this.cbLevel13);
        result += this.GetPremissionValueHelper(this.cbLevel14);
        result += this.GetPremissionValueHelper(this.cbLevel15);
       
        result += this.GetPremissionValueHelper(this.cbLevel16);
        result += this.GetPremissionValueHelper(this.cbLevel17);
        result += this.GetPremissionValueHelper(this.cbLevel18);
        result += this.GetPremissionValueHelper(this.cbLevel19);
        result += this.GetPremissionValueHelper(this.cbLevel20);
       
        result += this.GetPremissionValueHelper(this.cbLevel21);
        result += this.GetPremissionValueHelper(this.cbLevel22);
        result += this.GetPremissionValueHelper(this.cbLevel23);
        result += this.GetPremissionValueHelper(this.cbLevel24);
        result += this.GetPremissionValueHelper(this.cbLevel25);
       
        result += this.GetPremissionValueHelper(this.cbLevel26);
        result += this.GetPremissionValueHelper(this.cbLevel27);
        result += this.GetPremissionValueHelper(this.cbLevel28);
        result += this.GetPremissionValueHelper(this.cbLevel29);
        result += this.GetPremissionValueHelper(this.cbLevel30);
       
        result += this.GetPremissionValueHelper(this.cbLevel31);
        result += this.GetPremissionValueHelper(this.cbLevel32);
        result += this.GetPremissionValueHelper(this.cbLevel33);
        result += this.GetPremissionValueHelper(this.cbLevel34);
        result += this.GetPremissionValueHelper(this.cbLevel35);
       
        result += this.GetPremissionValueHelper(this.cbLevel36);
        result += this.GetPremissionValueHelper(this.cbLevel37);
        result += this.GetPremissionValueHelper(this.cbLevel38);
        result += this.GetPremissionValueHelper(this.cbLevel39);
        result += this.GetPremissionValueHelper(this.cbLevel40);
       
        result += this.GetPremissionValueHelper(this.cbLevel41);
        result += this.GetPremissionValueHelper(this.cbLevel42);
        result += this.GetPremissionValueHelper(this.cbLevel43);
        result += this.GetPremissionValueHelper(this.cbLevel44);
        result += this.GetPremissionValueHelper(this.cbLevel45);
       

        result += this.GetPremissionValueHelper(this.cbLevel46);
        result += this.GetPremissionValueHelper(this.cbLevel47);
        result += this.GetPremissionValueHelper(this.cbLevel48);
        result += this.GetPremissionValueHelper(this.cbLevel49);
       
        result += this.GetPremissionValueHelper(this.cbLevel50);
        result += this.GetPremissionValueHelper(this.cbLevel51);
        result += this.GetPremissionValueHelper(this.cbLevel52);
        result += this.GetPremissionValueHelper(this.cbLevel53);
       
        result += this.GetPremissionValueHelper(this.cbLevel54);
        result += this.GetPremissionValueHelper(this.cbLevel55);
        result += this.GetPremissionValueHelper(this.cbLevel56);
        result += this.GetPremissionValueHelper(this.cbLevel57);
       
        result += this.GetPremissionValueHelper(this.cbLevel58);
        result += this.GetPremissionValueHelper(this.cbLevel59);
        result += this.GetPremissionValueHelper(this.cbLevel60);
        result += this.GetPremissionValueHelper(this.cbLevel61);
       
        result += this.GetPremissionValueHelper(this.cbLevel62);
        result += this.GetPremissionValueHelper(this.cbLevel63);
        result += this.GetPremissionValueHelper(this.cbLevel64);
        result += this.GetPremissionValueHelper(this.cbLevel65);
       
        result += this.GetPremissionValueHelper(this.cbLevel66);
        result += this.GetPremissionValueHelper(this.cbLevel67);
        result += this.GetPremissionValueHelper(this.cbLevel68);
        result += this.GetPremissionValueHelper(this.cbLevel69);
       
        result += this.GetPremissionValueHelper(this.cbLevel70);
        result += this.GetPremissionValueHelper(this.cbLevel71);
        result += this.GetPremissionValueHelper(this.cbLevel72);
        result += this.GetPremissionValueHelper(this.cbLevel73);
       
        result += this.GetPremissionValueHelper(this.cbLevel74);
        result += this.GetPremissionValueHelper(this.cbLevel75);
        result += this.GetPremissionValueHelper(this.cbLevel76);
        result += this.GetPremissionValueHelper(this.cbLevel77);
       
        result += this.GetPremissionValueHelper(this.cbLevel78);
        result += this.GetPremissionValueHelper(this.cbLevel79);
        result += this.GetPremissionValueHelper(this.cbLevel80);
        result += this.GetPremissionValueHelper(this.cbLevel81);
       

        result += this.GetPremissionValueHelper(this.cbLevel82);
        result += this.GetPremissionValueHelper(this.cbLevel83);
       
        result += this.GetPremissionValueHelper(this.cbLevel84);
        result += this.GetPremissionValueHelper(this.cbLevel85);
       
        result += this.GetPremissionValueHelper(this.cbLevel86);
        result += this.GetPremissionValueHelper(this.cbLevel87);
       
        result += this.GetPremissionValueHelper(this.cbLevel88);
        result += this.GetPremissionValueHelper(this.cbLevel89);
       
        result += this.GetPremissionValueHelper(this.cbLevel90);
        result += this.GetPremissionValueHelper(this.cbLevel91);
       

        return result;
    }
    GetPremissionValueHelper(value: boolean) {
        if (value == true)
            return "1";
        else
            return "0";
    }
}