export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export function isStrongPassword(password) {
    return password.length >= 5;
};

export function isNotEmpty(value) {
    return value.trim() !== "";
};