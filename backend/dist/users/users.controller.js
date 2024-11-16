"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
let UsersController = class UsersController {
    findAll() {
        return 'finds for users';
    }
    findOne(userId) {
        return `finds for user ${userId}`;
    }
    calc(type, a, b) {
        const realA = Number(a);
        const realB = Number(b);
        let result;
        if (type === 'plus') {
            result = realA + realB;
        }
        else if (type === 'minus') {
            result = realA - realB;
        }
        else if (type === 'multi') {
            result = realA * realB;
        }
        else if (type === 'div') {
            result = realA / realB;
        }
        return result;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':type/:a/:b'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('a')),
    __param(2, (0, common_1.Param)('b')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Number)
], UsersController.prototype, "calc", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users')
], UsersController);
//# sourceMappingURL=users.controller.js.map