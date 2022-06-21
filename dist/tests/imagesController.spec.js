"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./../app"));
const request = (0, supertest_1.default)(app_1.default);
xdescribe("Testing the images endpont", () => {
    it("checking for normal behavior 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get("/images?filename=fjord.jpg&width=200&height=300");
        expect(res.statusCode).toEqual(200);
        expect(res.headers["content-type"]).toMatch("image/jpeg");
    }));
    it("checking for worng image name bad request 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get("/images?filename=asdaw.jpg&width=200&height=300");
        expect(res.statusCode).toEqual(400);
        expect(res.headers["content-type"]).toMatch("application/json");
        expect(res.body.message).toMatch("Image not found");
    }));
    it("checking for worng endpoint name returning not found 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get("/imasdages?filename=asdaw.jpg&width=200&height=300");
        expect(res.statusCode).toEqual(404);
        expect(res.headers["content-type"]).toMatch("application/json");
        expect(res.body.message).toMatch("Not found");
    }));
});
