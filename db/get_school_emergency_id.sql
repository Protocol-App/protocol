select * from school
inner join emergency on school.emergency_id = emergency.emergency_id
inner join protocol on emergency.protocol_id = protocol.protocol_id
where school.emergency_id is not null and school.school_id = $1;