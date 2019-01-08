update users
set 
emergency_steps_done = null,
emergency_status = null
where school_id = $1;