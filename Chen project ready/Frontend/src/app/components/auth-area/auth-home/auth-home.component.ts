import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials-model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { LayoutComponent } from '../../layout-area/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';

@Component({
    selector: 'app-auth-home',
    templateUrl: './auth-home.component.html',
    styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {

    public userLogin = new CredentialsModel();
    public userId: number;
    public userFullName: string;

    public NewOrOngoingPurchase: string;
    public quantityOfProducts: number;
    public quantityOfOrders: number;
    public productionDate: string;
    public role: string;
    public newMember = false;
    public ok: string;

    constructor(private authService: AuthService, private router: Router, private productsService: ProductsService, private layoutComponent: LayoutComponent, private guard: AuthGuard) { }

    async ngOnInit() {
        const products = await this.productsService.getAllProducts();
        this.quantityOfProducts = products.length;
    }

    public async login() {
        try {
            await this.authService.login(this.userLogin);
            alert("Successful to logged-in.");
            this.role = localStorage.getItem("role");
            this.layoutComponent.userFullName = localStorage.getItem("full name");
            this.userId = await +localStorage.getItem("userId");
            setTimeout(() => { this.router.navigateByUrl("home") }, 2500)
        }
        catch (err: any) {
            alert("Incorrect email or password")
        }
    }

    public async logout() {
        try {
            this.userId = null;
            this.role = null;
            this.NewOrOngoingPurchase = null;
            this.userFullName = null;
            this.layoutComponent.userFullName = null;
            await this.authService.logout();
            alert("Successful to logged-out.");
        }
        catch (err: any) {
            alert(err.message);
        }
    }


}
