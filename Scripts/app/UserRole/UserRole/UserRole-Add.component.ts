import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserRoleService } from "../shared/userRole.service";
import { UserRoleMatrix } from "../shared/UserRoleMatrix.model";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "userRole-add",
    template: `
    <div class="error-message" #errorDiv></div>
    <div *ngIf="data">
        <h2>
            <a href="javascript:void(0)" (click)="onBack()">
                &laquo; Back to User List
            </a>
        </h2>
        <div class="user-container">
            <form class="form-user" [formGroup]="userMatrixForm">
                <h2 class="form-user-heading">{{title}}</h2>



                <div class="form-group">
                    <input formControlName="userrolename" type="text" class="form-control" placeholder="Enter user matrix name" value="this.data.Name" autofocus />
                    <span class="validator-label valid" *ngIf="this.userMatrixForm.controls.userrolename.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.userMatrixForm.controls.userrolename.valid && !this.userMatrixForm.controls.userrolename.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>

                <div class="form-group">
                    Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />
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
                            <td><input formControlName="level1" type="checkbox" autofocus /></td>
                            <td><input formControlName="level2" type="checkbox" autofocus /></td>
                            <td><input formControlName="level3" type="checkbox" autofocus /></td>
                            <td><input formControlName="level4" type="checkbox" autofocus /></td>
                            <td><input formControlName="level5" type="checkbox" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Colorway</td>
                            <td><input formControlName="level6" type="checkbox" autofocus /></td>
                            <td><input formControlName="level7" type="checkbox" autofocus /></td>
                            <td><input formControlName="level8" type="checkbox" autofocus /></td>
                            <td><input formControlName="level9" type="checkbox" autofocus /></td>
                            <td><input formControlName="level10" type="checkbox" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Fabrics</td>
                            <td><input formControlName="level11" type="checkbox" autofocus /></td>
                            <td><input formControlName="level12" type="checkbox" autofocus /></td>
                            <td><input formControlName="level13" type="checkbox" autofocus /></td>
                            <td><input formControlName="level14" type="checkbox" autofocus /></td>
                            <td><input formControlName="level15" type="checkbox" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Accessories</td>
                            <td><input formControlName="level16" type="checkbox" autofocus /></td>
                            <td><input formControlName="level17" type="checkbox" autofocus /></td>
                            <td><input formControlName="level18" type="checkbox" autofocus /></td>
                            <td><input formControlName="level19" type="checkbox" autofocus /></td>
                            <td><input formControlName="level20" type="checkbox" autofocus /></td>
                        </tr>
                        <tr>
                            <td>PEW</td>
                            <td><input formControlName="level21" type="checkbox" autofocus /></td>
                            <td><input formControlName="level22" type="checkbox" autofocus /></td>
                            <td><input formControlName="level23" type="checkbox" autofocus /></td>
                            <td><input formControlName="level24" type="checkbox" autofocus /></td>
                            <td><input formControlName="level25" type="checkbox" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Guided Spec</td>
                            <td><input formControlName="level26" type="checkbox" autofocus /></td>
                            <td><input formControlName="level27" type="checkbox" autofocus /></td>
                            <td><input formControlName="level28" type="checkbox" autofocus /></td>
                            <td><input formControlName="level29" type="checkbox" autofocus /></td>
                            <td><input formControlName="level30" type="checkbox" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Color Details</td>
                            <td><input formControlName="level31" type="checkbox" autofocus /></td>
                            <td><input formControlName="level32" type="checkbox" autofocus /></td>
                            <td><input formControlName="level33" type="checkbox" autofocus /></td>
                            <td><input formControlName="level34" type="checkbox" autofocus /></td>
                            <td><input formControlName="level35" type="checkbox" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Techpack</td>
                            <td><input formControlName="level36" type="checkbox" autofocus /></td>
                            <td><input formControlName="level37" type="checkbox" autofocus /></td>
                            <td><input formControlName="level38" type="checkbox" autofocus /></td>
                            <td><input formControlName="level39" type="checkbox" autofocus /></td>
                            <td><input formControlName="level40" type="checkbox" autofocus /></td>
                        </tr>
                        <tr>
                            <td>Sample Vendor</td>
                            <td><input formControlName="level41" type="checkbox" autofocus /></td>
                            <td><input formControlName="level42" type="checkbox" autofocus /></td>
                            <td><input formControlName="level43" type="checkbox" autofocus /></td>
                            <td><input formControlName="level44" type="checkbox" autofocus /></td>
                            <td><input formControlName="level45" type="checkbox" autofocus /></td>
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
                            <td><input formControlName="level46" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level47" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level48" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level49" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Color Library</td>
                            <td><input formControlName="level50" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level51" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level52" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level53" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Fabric Library</td>
                            <td><input formControlName="level54" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level55" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level56" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level57" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Accessory Library</td>
                            <td><input formControlName="level58" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level59" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level60" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level61" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Graphic Library</td>
                            <td><input formControlName="level62" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level63" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level64" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level65" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Wash Library</td>
                            <td><input formControlName="level66" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level67" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level68" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level69" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Shipping Library</td>
                            <td><input formControlName="level70" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level71" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level72" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level73" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Spec Library</td>
                            <td><input formControlName="level74" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level75" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level76" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level77" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Techpack Library</td>
                            <td><input formControlName="level78" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level79" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level80" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level81" type="checkbox" value="this.data.IsActive" autofocus /></td>
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
                            <td><input formControlName="level82" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level83" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Edit User</td>
                            <td><input formControlName="level84" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level85" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Delete User</td>
                            <td><input formControlName="level86" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level87" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Assign User to Role</td>
                            <td><input formControlName="level88" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level89" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Vendor/Supplier Management</td>
                            <td><input formControlName="level90" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td><input formControlName="level91" type="checkbox" value="this.data.IsActive" autofocus /></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>

                </div>

                <div class="form-group">
                    <input type="button" class="btn btn-primary btn-block" [disabled]="!userMatrixForm.valid" value="Add" (click)="onSubmit(this.userMatrixForm.value)" />
                </div>
            </form>
        </div>
    </div>
`,
    providers: [UserRoleService, FormBuilder]
})

export class UserRoleAddComponent {
    data: UserRoleMatrix;
    title: string;
    userMatrixForm: FormGroup;
    errorMessage = null;
    result: string;
    userMatrixValue: string;

    
    @ViewChild('errorDiv') errorDiv: ElementRef;

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
        this.userMatrixForm = this.fb.group(
            {
                userrolename: ["", [
                    Validators.required
                ]],
                level1: [false],
                level2: [false],
                level3: [false],
                level4: [false],
                level5: [false],
                level6: [false],
                level7: [false],
                level8: [false],
                level9: [false],
                level10: [false],
                level11: [false],
                level12: [false],
                level13: [false],
                level14: [false],
                level15: [false],
                level16: [false],
                level17: [false],
                level18: [false],
                level19: [false],
                level20: [false],
                level21: [false],
                level22: [false],
                level23: [false],
                level24: [false],
                level25: [false],
                level26: [false],
                level27: [false],
                level28: [false],
                level29: [false],
                level30: [false],
                level31: [false],
                level32: [false],
                level33: [false],
                level34: [false],
                level35: [false],
                level36: [false],
                level37: [false],
                level38: [false],
                level39: [false],
                level40: [false],
                level41: [false],
                level42: [false],
                level43: [false],
                level44: [false],
                level45: [false],
                level46: [false],
                level47: [false],
                level48: [false],
                level49: [false],
                level50: [false],
                level51: [false],
                level52: [false],
                level53: [false],
                level54: [false],
                level55: [false],
                level56: [false],
                level57: [false],
                level58: [false],
                level59: [false],
                level60: [false],
                level61: [false],
                level62: [false],
                level63: [false],
                level64: [false],
                level65: [false],
                level66: [false],
                level67: [false],
                level68: [false],
                level69: [false],
                level70: [false],
                level71: [false],
                level72: [false],
                level73: [false],
                level74: [false],
                level75: [false],
                level76: [false],
                level77: [false],
                level78: [false],
                level79: [false],
                level80: [false],
                level81: [false],
                level82: [false],
                level83: [false],
                level84: [false],
                level85: [false],
                level86: [false],
                level87: [false],
                level88: [false],
                level89: [false],
                level90: [false],
                level91: [false],
                isactive: [false]
            }
        );

        this.data = new UserRoleMatrix("", null, null, false, "", "", "", false);
        this.title = "New User Role";
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.userRoleService.data = this.data;
    }

    onSubmit(data: any) {
        console.log(data);
        this.userMatrixValue = this.getUserMatrixValue();
        console.log(this.userMatrixValue);

        var userRoleMatrix = new UserRoleMatrix("", null, null, data.isactive, data.userrolename, "", this.userMatrixValue, false);
        console.log
        this.userRoleService.add(userRoleMatrix).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'User Role added successfully';
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

    onBack() {
        this.router.navigate(["userrolelist"]);
    }

    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }

    getUserMatrixValue() {
        this.result = "";
        for (var i = 1; i < 92; i++) {
            if (this.userMatrixForm.get("level" + i.toLocaleString()).value)
                this.result += "1";
            else
                this.result += "0";
        }
        return this.result;
    }
}