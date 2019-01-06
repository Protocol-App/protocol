update users
set emergency_status = $1
where user_id = $2
returning *;
