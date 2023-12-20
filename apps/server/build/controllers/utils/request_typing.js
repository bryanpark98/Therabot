"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCreateOrUpdateRequest = void 0;
function routeCreateOrUpdateRequest(request, create, update) {
    if ('id' in request) {
        return update(request);
    }
    else {
        return create(request);
    }
}
exports.routeCreateOrUpdateRequest = routeCreateOrUpdateRequest;
//# sourceMappingURL=request_typing.js.map