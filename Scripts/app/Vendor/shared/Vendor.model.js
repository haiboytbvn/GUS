System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Vendor;
    return {
        setters: [],
        execute: function () {
            Vendor = (function () {
                function Vendor(Id, LastAccess, DateCreated, DateModified, IsActive, UserName, Email, SearchName, Address, PostalCode, City, Country, Tel, Fax, Homepage, PaymentTerm, DeliveryTerm, Type, ProductType, checked) {
                    this.Id = Id;
                    this.LastAccess = LastAccess;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                    this.IsActive = IsActive;
                    this.UserName = UserName;
                    this.Email = Email;
                    this.SearchName = SearchName;
                    this.Address = Address;
                    this.PostalCode = PostalCode;
                    this.City = City;
                    this.Country = Country;
                    this.Tel = Tel;
                    this.Fax = Fax;
                    this.Homepage = Homepage;
                    this.PaymentTerm = PaymentTerm;
                    this.DeliveryTerm = DeliveryTerm;
                    this.Type = Type;
                    this.ProductType = ProductType;
                    this.checked = checked;
                }
                return Vendor;
            }());
            exports_1("Vendor", Vendor);
        }
    };
});
