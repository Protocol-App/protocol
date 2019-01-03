select * from school
inner join emergency on school.emergency_id = emergency.emergency_id
inner join protocol on emergency.protocol_id = protocol.protocol_id