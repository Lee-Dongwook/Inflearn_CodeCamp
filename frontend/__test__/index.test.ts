const add = (a: number, b: number) => {
    return a + b;
}

it("더하기 잘 되는지 테스트 해보기", () => {
    const result = add(3,5);
    expect(result).toBe(8);
})

