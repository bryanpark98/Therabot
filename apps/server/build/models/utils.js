"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVirtualId = void 0;
function setupVirtualId(schema) {
    // Set up a virtual for 'id'
    schema.virtual("id").get(function () {
        return this._id.toHexString();
    });
    // Ensure virtual fields are serialized and remove _id
    schema.set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        },
    });
}
exports.setupVirtualId = setupVirtualId;
//# sourceMappingURL=utils.js.map