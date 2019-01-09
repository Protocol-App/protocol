export function generatePin() {
  let randomPin = Math.floor(1000 + Math.random() * 9000);
  return randomPin.toString();
}

export function formatPhoneNumber(phoneNum) {
  var formatted = phoneNum.replace(/\D/g, "");
  if (formatted.length !== 11){
      return null
  } else {
      return `+${formatted}`;
  }
}
