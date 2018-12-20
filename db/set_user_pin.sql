UPDATE users 
SET user_pin = $1
WHERE user_phone_number = $2