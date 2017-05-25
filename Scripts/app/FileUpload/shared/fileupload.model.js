System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FileUpLoadModel;
    return {
        setters: [],
        execute: function () {
            FileUpLoadModel = (function () {
                function FileUpLoadModel(FileName, Size, Type, UploadPath) {
                    this.FileName = FileName;
                    this.Size = Size;
                    this.Type = Type;
                    this.UploadPath = UploadPath;
                }
                return FileUpLoadModel;
            }());
            exports_1("FileUpLoadModel", FileUpLoadModel);
        }
    };
});
