update users
set emergency_steps_done = true
where user_id = $1
returning *;