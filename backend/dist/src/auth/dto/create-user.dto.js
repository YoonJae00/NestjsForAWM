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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '아이디를 입력해주세요.' }),
    (0, class_validator_1.IsString)({ message: '아이디는 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '비밀번호를 입력해주세요.' }),
    (0, class_validator_1.IsString)({ message: '비밀번호는 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '이름을 입력해주세요.' }),
    (0, class_validator_1.IsString)({ message: '이름은 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '이메일을 입력해주세요.' }),
    (0, class_validator_1.IsEmail)({}, { message: '올바른 이메일 형식이 아닙니다.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '전화번호는 문자열이어야 합니다.' }),
    (0, class_validator_1.IsPhoneNumber)('KR', { message: '올바른 전화번호 형식이 아닙니다.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '주소는 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userAddress", void 0);
//# sourceMappingURL=create-user.dto.js.map