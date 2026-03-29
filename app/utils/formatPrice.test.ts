import { test, describe, expect } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice",()=>{
    test ("formatuje liczbę całkowitą do dwóch miejsc po przecinku",()=>{
        expect (formatPrice(10)).toBe('10.00 zł');
    });


test ("formatuje liczbę dziesiętną do dwóch miejsc po przecinku",()=>{
    expect (formatPrice(10.5)).toBe('10.50 zł');
})

test ("formatuje liczbę z więcej niż dwoma miejscami po przecinku do dwóch miejsc po przecinku",()=>{
    expect (formatPrice(10.567)).toBe('10.57 zł');
})

test ("formatuje liczbę ujemną do dwóch miejsc po przecinku",()=>{
    expect (formatPrice(-10.5)).toBe('-10.50 zł');
})

test ("formatuje liczbę zero do dwóch miejsc po przecinku",()=>{
    expect (formatPrice(0)).toBe('0.00 zł');
})  
})

