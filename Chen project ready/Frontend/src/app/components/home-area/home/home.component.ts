import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BidModel } from 'src/app/models/bid-model';
import { OrderModel } from 'src/app/models/order-model';
import { ProductModel } from 'src/app/models/product-model';
import { SupplierOfferModel } from 'src/app/models/supplier-offer-model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { SupplierOffersService } from 'src/app/services/supplierOffers.service';
import { LayoutComponent } from '../../layout-area/layout/layout.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('./home.component.html') htmlData!: ElementRef;
    @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;

    public currentUserId: number;
    public products: ProductModel[];
    public orders: OrderModel[];
    public selectedTeam = '';
    public formStatus = 'close'
    public tableCss = 'none'
    public selectOptionPage = "null";
    public displayNone = "none";
    public tableOrders: BidModel[] = [];
    public isDisabled = false;
    public quoteId: number;
    public allSupplierOffers: SupplierOfferModel[];
    public currentPrice = 0;
    public totalPrice = 0;
    public currentItemName1 = "TX-83";
    public currentItemName2 = "Ma365";
    public currentItemName3 = "EL20M8";
    public currentItemName4 = "RZ864";
    public currentItemName5 = "BW123";
    public currentItemName6 = "123";
    public countItemStock1 = 0;
    public countItemStock2 = 0;
    public countItemStock3 = 0;
    public countItemStock4 = 0;
    public countItemStock5 = 0;
    public openForm = "none";
    public buttonSent = false;
    public unpredictable = 0;
    public pureProfit = 0;
    public management = 0;
    public countryName = '';
    public customerName = '';
    public marketingMan = '';
    public tableDisplay = true;

    constructor(private authService: AuthService, private supplierOffersService: SupplierOffersService, private layoutComponent: LayoutComponent, private productsService: ProductsService, private router: Router) { }

    async ngOnInit() {
        try {
            this.tableOrders = [];
            if (!this.products) {
                this.products = await this.productsService.getAllProducts();
            }
            this.currentUserId = +localStorage.getItem("userId");

            this.allSupplierOffers = await this.supplierOffersService.getAllSupplierOffers()

            if (this.allSupplierOffers.length >= 1) {
                this.displayNone = "center"
                for (let index = 0; index < this.allSupplierOffers.length; index++) {
                    let newItem = new BidModel;
                    newItem.orderId = this.allSupplierOffers[index].supplierOfferId;
                    let newItemsNames = [];
                    if (this.allSupplierOffers[index].firstItemName != null) {
                        newItemsNames.push(this.allSupplierOffers[index].firstItemName)
                    }
                    if (this.allSupplierOffers[index].secondItemName != null) {
                        newItemsNames.push(this.allSupplierOffers[index].secondItemName)
                    }
                    if (this.allSupplierOffers[index].thirdItemName != null) {
                        newItemsNames.push(this.allSupplierOffers[index].thirdItemName)
                    }
                    if (this.allSupplierOffers[index].fourItemName != null) {
                        newItemsNames.push(this.allSupplierOffers[index].fourItemName)
                    }
                    if (this.allSupplierOffers[index].fiveItemName != null) {
                        newItemsNames.push(this.allSupplierOffers[index].fiveItemName)
                    }
                    let currentNameOffer;
                    if (newItemsNames.length > 1) {
                        for (let i = 0; i < newItemsNames.length; i++) {
                            currentNameOffer = newItemsNames.slice(0, newItemsNames.length - 1).join(', ') + ", " + newItemsNames.slice(-1);
                        }
                    }
                    else {
                        currentNameOffer = newItemsNames[0]
                    }
                    newItem.itemName = currentNameOffer;
                    newItem.stockTotalPrice = this.allSupplierOffers[index].offerPrice;
                    this.tableOrders.push(newItem)
                }
            }
            else {
                this.tableDisplay = false
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async onSelected(value: string) {
        this.selectedTeam = value;
        this.tableCss = "center"
        this.formStatus = "close"
    }

    public async logout() {
        try {
            this.layoutComponent.userFullName = null;
            await this.authService.logout();
            this.router.navigateByUrl("/auth");
            alert("Successful to logged-out.");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async openBid() {
        try {
            if (this.tableCss == "none") {
                this.tableCss = "center"
                this.formStatus = "close"
            }
            else {
                this.tableCss = "none"
                this.formStatus = "open"
            }

        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async addNewOffer() {
        let supplierOffer = new SupplierOfferModel;

        if (this.countItemStock1 >= 1) {
            supplierOffer.firstItemStock = this.countItemStock1;
            supplierOffer.firstItemName = this.currentItemName1;
        }
        else {
            supplierOffer.firstItemStock = 0;
            supplierOffer.firstItemName = undefined;
        }
        if (this.countItemStock2 >= 1) {
            supplierOffer.secondItemStock = this.countItemStock2;
            supplierOffer.secondItemName = this.currentItemName2;
        }
        else {
            supplierOffer.secondItemStock = 0;
            supplierOffer.secondItemName = undefined;
        }
        if (this.countItemStock3 >= 1) {
            supplierOffer.thirdItemStock = this.countItemStock3;
            supplierOffer.thirdItemName = this.currentItemName3;
        }
        else {
            supplierOffer.thirdItemStock = 0;
            supplierOffer.thirdItemName = undefined;
        }
        if (this.countItemStock4 >= 1) {
            supplierOffer.fourItemStock = this.countItemStock4;
            supplierOffer.fourItemName = this.currentItemName4;
        }
        else {
            supplierOffer.fourItemStock = 0;
            supplierOffer.fourItemName = undefined;
        }
        if (this.countItemStock5 >= 1) {
            supplierOffer.fiveItemStock = this.countItemStock5;
            supplierOffer.fiveItemName = this.currentItemName5;
        }
        else {
            supplierOffer.fiveItemStock = 0;
            supplierOffer.fiveItemName = undefined;
        }
        supplierOffer.countryName = this.countryName
        supplierOffer.customerName = this.customerName
        supplierOffer.marketingMan = this.marketingMan
        supplierOffer.offerPrice = this.totalPrice

        if (supplierOffer.firstItemName == undefined && supplierOffer.secondItemName == undefined && supplierOffer.thirdItemName == undefined &&
            supplierOffer.fourItemName == undefined && supplierOffer.fiveItemName == undefined) {
            alert("Please add a product to the offer.")
        }
        else {
            await this.supplierOffersService.addSupplierOffer(supplierOffer);
            this.allSupplierOffers = await this.supplierOffersService.getAllSupplierOffers()
            let newOfferNumberToDisplay = this.allSupplierOffers[this.allSupplierOffers.length - 1].supplierOfferId;

            alert("Offer number " + newOfferNumberToDisplay + " was successfully created.")

            this.ngOnInit()
            this.showAllOffers();

            this.countryName = '';
            this.customerName = '';
            this.marketingMan = '';
            this.countItemStock1 = 0;
            this.countItemStock2 = 0;
            this.countItemStock3 = 0;
            this.countItemStock4 = 0;
            this.countItemStock5 = 0;
            this.unpredictable = 0;
            this.pureProfit = 0;
            this.management = 0;
            this.currentPrice = 0;
            this.totalPrice = 0;
        }

    }

    public openOffers() {
        if (this.selectOptionPage == "newOffer") {
            this.selectOptionPage = "null";
        }
        else {
            this.selectOptionPage = "newOffer";
        }
    }

    public openProductsDetails() {
        if (this.selectOptionPage == "productDetails") {
            this.selectOptionPage = "null";
        }
        else {
            this.selectOptionPage = "productDetails";
        }
    }

    public async download(orderId: number) {
        this.allSupplierOffers = await this.supplierOffersService.getAllSupplierOffers();
        let currentOffer = this.allSupplierOffers.filter(i => i.supplierOfferId == orderId);

        const date = new Date();
        let currentDay = String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        let currentYear = date.getFullYear();
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

        const pdf = new jsPDF();
        pdf.setFontSize(26);
        pdf.setTextColor('#2585fe');
        pdf.text('Bid number ' + orderId + ''.toUpperCase(), 15, 40);
        pdf.setFontSize(10);
        pdf.setTextColor('#131523');
        pdf.text('Report date: ' + currentDate, 15, 47);

        let newItem = new BidModel;
        newItem.orderId = currentOffer[0].supplierOfferId;
        let newItemsNames = [];
        if (currentOffer[0].firstItemName != null) {
            newItemsNames.push([currentOffer[0].firstItemName, currentOffer[0].firstItemStock])
        }
        if (currentOffer[0].secondItemName != null) {
            newItemsNames.push([currentOffer[0].secondItemName, currentOffer[0].secondItemStock])
        }
        if (currentOffer[0].thirdItemName != null) {
            newItemsNames.push([currentOffer[0].thirdItemName, currentOffer[0].thirdItemStock])
        }
        if (currentOffer[0].fourItemName != null) {
            newItemsNames.push([currentOffer[0].fourItemName, currentOffer[0].fourItemStock])
        }
        if (currentOffer[0].fiveItemName != null) {
            newItemsNames.push([currentOffer[0].fiveItemName, currentOffer[0].fiveItemStock])
        }

        if (newItemsNames.length == 1) {
            autoTable(pdf, {
                margin: { top: 93 },
                head: [['Items', 'Quantity']],
                body: newItemsNames.map((newItemsNames) => [
                    newItemsNames[0],
                    newItemsNames[1]
                ]),
                theme: 'striped',
                headStyles: {
                    fillColor: '#343a40'
                }
            });
            pdf.setFontSize(10);
            pdf.setTextColor('#131523');
            pdf.text("Total price: " + currentOffer[0].offerPrice, 15, 113);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Regards,", 15, 130);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Hen Yaccov", 15, 135);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Company Manager", 15, 140);
        }
        else if (newItemsNames.length == 2) {
            autoTable(pdf, {
                margin: { top: 93 },
                head: [['Items', 'Quantity']],
                body: newItemsNames.map((newItemsNames) => [
                    newItemsNames[0],
                    newItemsNames[1],
                    newItemsNames[2],
                    newItemsNames[3]
                ]),
                theme: 'striped',
                headStyles: {
                    fillColor: '#343a40'
                }
            });
            pdf.setFontSize(10);
            pdf.setTextColor('#131523');
            pdf.text("Total price: " + currentOffer[0].offerPrice, 15, 118);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Regards,", 15, 135);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Hen Yaccov", 15, 140);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Company Manager", 15, 145);
        }
        else if (newItemsNames.length == 3) {
            autoTable(pdf, {
                margin: { top: 93 },
                head: [['Items', 'Quantity']],
                body: newItemsNames.map((newItemsNames) => [
                    newItemsNames[0],
                    newItemsNames[1],
                    newItemsNames[2],
                    newItemsNames[3],
                    newItemsNames[4],
                    newItemsNames[5]
                ]),
                theme: 'striped',
                headStyles: {
                    fillColor: '#343a40'
                }
            });
            pdf.setFontSize(10);
            pdf.setTextColor('#131523');
            pdf.text("Total price: " + currentOffer[0].offerPrice, 15, 128);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Regards,", 15, 140);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Hen Yaccov", 15, 145);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Company Manager", 15, 150);
        }
        else if (newItemsNames.length == 4) {
            autoTable(pdf, {
                margin: { top: 93 },
                head: [['Items', 'Quantity']],
                body: newItemsNames.map((newItemsNames) => [
                    newItemsNames[0],
                    newItemsNames[1],
                    newItemsNames[2],
                    newItemsNames[3],
                    newItemsNames[4],
                    newItemsNames[5],
                    newItemsNames[6],
                    newItemsNames[7]
                ]),
                theme: 'striped',
                headStyles: {
                    fillColor: '#343a40'
                }
            });
            pdf.setFontSize(10);
            pdf.setTextColor('#131523');
            pdf.text("Total price: " + currentOffer[0].offerPrice, 15, 135);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Regards,", 15, 145);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Hen Yaccov", 15, 150);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Company Manager", 15, 155);
        }
        else if (newItemsNames.length == 5) {
            autoTable(pdf, {
                margin: { top: 93 },
                head: [['Items', 'Quantity']],
                body: newItemsNames.map((newItemsNames) => [
                    newItemsNames[0],
                    newItemsNames[1],
                    newItemsNames[2],
                    newItemsNames[3],
                    newItemsNames[4],
                    newItemsNames[5],
                    newItemsNames[6],
                    newItemsNames[7],
                    newItemsNames[8],
                    newItemsNames[9]
                ]),
                theme: 'striped',
                headStyles: {
                    fillColor: '#343a40'
                }
            });
            pdf.setFontSize(10);
            pdf.setTextColor('#131523');
            pdf.text("Total price: " + currentOffer[0].offerPrice, 15, 143);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Regards,", 15, 155);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Hen Yaccov", 15, 160);
            pdf.setFontSize(12);
            pdf.setTextColor('#131523');
            pdf.text("Company Manager", 15, 165);
        }


        pdf.setFontSize(12);
        pdf.setTextColor('#131523');
        pdf.text("We are honored to give this offer to:", 15, 65);
        pdf.setFontSize(10);
        pdf.setTextColor('#131523');
        pdf.text("Customer Name: " + currentOffer[0].customerName.toUpperCase(), 15, 72);
        pdf.setFontSize(10);
        pdf.setTextColor('#131523');
        pdf.text("Country Name: " + currentOffer[0].countryName.toUpperCase(), 15, 77);
        pdf.setFontSize(10);
        pdf.setTextColor('#131523');
        pdf.text("Marketing Man Name: " + currentOffer[0].marketingMan.toUpperCase(), 15, 82);

        var img = new Image()
        img.src = '../../../assets/logo.jpg'
        pdf.addImage(img, 'png', 165, 33, 30, 15)

        pdf.save('file_name' + '.pdf');

    }

    public openNewOffer() {
        if (this.openForm == "show") {
            this.openForm = "none";
            this.displayNone = "center";
            if (this.allSupplierOffers.length >= 1) {
                this.tableDisplay = true;
            }
            else {
                this.tableDisplay = false;
            }
        }
        else {
            this.displayNone = "none";
            this.openForm = "show";
            this.tableDisplay = null;

        }
    }

    public showAllOffers() {
        this.openForm = "none";
        this.displayNone = "center";
        if (this.allSupplierOffers.length >= 1) {
            this.tableDisplay = true;
        }
        else {
            this.tableDisplay = false;
        }
    }

    checkChanges() {
        this.currentPrice = 0;
        if (this.countItemStock1 >= 1) {
            this.currentPrice += ((this.products[0].productPrice * 3) +
                (this.products[3].productPrice * 5) +
                (this.products[5].productPrice * 2) +
                (this.products[6].productPrice)) * this.countItemStock1;
        }
        if (this.countItemStock2 >= 1) {
            this.currentPrice += ((this.products[1].productPrice * 5) +
                (this.products[2].productPrice * 2) +
                (this.products[9].productPrice * 4)) * this.countItemStock2;
        }
        if (this.countItemStock3 >= 1) {
            this.currentPrice += ((this.products[4].productPrice * 2) +
                (this.products[8].productPrice * 7) +
                (this.products[7].productPrice * 5)) * this.countItemStock3;
        }
        if (this.countItemStock4 >= 1) {
            this.currentPrice += ((this.products[0].productPrice * 2) +
                (this.products[4].productPrice * 3) +
                (this.products[5].productPrice * 5)) * this.countItemStock4;
        }
        if (this.countItemStock5 >= 1) {
            this.currentPrice += ((this.products[1].productPrice * 2) +
                (this.products[7].productPrice * 5) +
                (this.products[2].productPrice)) * this.countItemStock5;
        }
        let newPrice = this.currentPrice;
        let newPriceStep2 = Math.round(newPrice * 100) / 100
        this.currentPrice = newPriceStep2


        let price = this.currentPrice
        let pureProfit;
        let unpredictable;
        let management;
        let firstDiscount;
        let secondDiscount;
        let thirdDiscount;
        let totalProfit = 0
        if (this.pureProfit == 0) {
            pureProfit = 1
        }
        else {
            pureProfit = this.pureProfit / 100;
            firstDiscount = price * pureProfit;
            totalProfit += firstDiscount;
        }
        if (this.unpredictable == 0) {
            unpredictable = 1
        }
        else {
            unpredictable = this.unpredictable / 100;
            secondDiscount = price * unpredictable;
            totalProfit += secondDiscount;

        }
        if (this.management == 0) {
            management = 1
        }
        else {
            management = this.management / 100;
            thirdDiscount = price * management;
            totalProfit += thirdDiscount;
        }

        let newTotalPrice = (this.currentPrice + totalProfit);
        let newTotalPriceStep2 = Math.round(newTotalPrice * 100) / 100;
        this.totalPrice = newTotalPriceStep2
    }

}
