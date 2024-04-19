module.exports = (a, b) => {
    if (
        typeof a !== "number" ||
        typeof b !== "number" ||
        Number.isNaN(a) ||
        Number.isNaN(b)
    ) {
        throw new Error("NOT_A_NUMBER");
    }

    return b === 0 ? 0 : a / b;
};