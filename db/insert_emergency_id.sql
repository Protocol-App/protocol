UPDATE school
SET 
emergency_id = $1
WHERE school_id = $2
returning *;