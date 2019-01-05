update school
set emergency_id = null
where emergency_id = $1;

delete from emergency
where emergency_id = $1;


