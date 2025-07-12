import { message } from "antd";

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
window.isEmail = (email) => emailRegex.test(email)
window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
window.getOrderId = () => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(now.getFullYear()).slice(2); // Get last two digits

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const randomSuffix = Math.floor(100 + Math.random() * 900); // Random 3-digit

  const orderId = `209${day}${month}${year}${hours}${minutes}${randomSuffix}`;
  return orderId;
}

window.notify = (text, type) => {
    switch (type) {
        case "success":
            message.success(text)
            break;
        case "error":
            message.error(text)
            break;
        case "info":
            message.info(text)
            break;
        case "warning":
            message.warning(text)
            break;
        default:
            message.info(text)
    }
}