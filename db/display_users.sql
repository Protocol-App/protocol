select * from users
WHERE school_id = $1
ORDER BY user_last_name;
