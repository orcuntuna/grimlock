"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = void 0;
const isPromise = x => Object(x).constructor === Promise;
exports.isPromise = isPromise;