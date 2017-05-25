System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ImageListModel;
    return {
        setters: [],
        execute: function () {
            ImageListModel = (function () {
                function ImageListModel(MainImage, MainAlt, Images) {
                    this.MainImage = MainImage;
                    this.MainAlt = MainAlt;
                    this.Images = Images;
                }
                return ImageListModel;
            }());
            exports_1("ImageListModel", ImageListModel);
        }
    };
});
