const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
// const phoneRegex = /^[6-9]\d{9}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export { emailRegex, passwordRegex, nameRegex, phoneRegex };
