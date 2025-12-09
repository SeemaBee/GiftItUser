export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
) {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

export const formatDate = (date: Date) => {
  if (!date) return "";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = (date: Date) => {
  if (!date) return "";

  const d = new Date(date);

  let hours = d.getHours();
  let minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const discountedPrice = (price: string, discount: string): number => {
  const priceNum = parseFloat(price) || 0;
  const discountNum = parseFloat(discount) || 0;

  const discountAmount = (priceNum * discountNum) / 100;
  const finalPrice = priceNum - discountAmount;

  return Math.round(finalPrice * 100) / 100;
};
