"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogBody = exports.BlogBody = exports.SignInBody = exports.SignUpBody = void 0;
const zod_1 = require("zod");
exports.SignUpBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional()
});
exports.SignInBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.BlogBody = zod_1.z.object({
    title: zod_1.z.string().max(100),
    content: zod_1.z.string()
});
exports.UpdateBlogBody = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
