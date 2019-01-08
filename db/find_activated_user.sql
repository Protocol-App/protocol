select * from school
WHERE school_id = $1
inner join emergency on school.emergency_id = emergency.emergency_id
inner join users on emergency.initialized_by_user_id = users.user_id

