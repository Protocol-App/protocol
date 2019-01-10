UPDATE users
SET
   user_first_name = $1,
        user_last_name=$2,
        user_phone_number = $3,
        user_email = $4,
        default_location = $5,
        user_title = $6
where user_id = $7
returning * 