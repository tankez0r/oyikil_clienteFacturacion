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
exports.correo = exports.cliente = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let cliente = class cliente extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.CHAR),
    __metadata("design:type", String)
], cliente.prototype, "dni", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.CHAR),
    __metadata("design:type", String)
], cliente.prototype, "idcustomer", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.CHAR),
    __metadata("design:type", String)
], cliente.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => correo),
    __metadata("design:type", Object)
], cliente.prototype, "correo", void 0);
cliente = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'clientes', timestamps: false })
], cliente);
exports.cliente = cliente;
let correo = class correo extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => cliente),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.CHAR),
    __metadata("design:type", String)
], correo.prototype, "idcustomer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cliente),
    __metadata("design:type", cliente)
], correo.prototype, "cliente", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.CHAR),
    __metadata("design:type", String)
], correo.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.CHAR),
    __metadata("design:type", String)
], correo.prototype, "mail", void 0);
correo = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'correos', timestamps: false })
], correo);
exports.correo = correo;
