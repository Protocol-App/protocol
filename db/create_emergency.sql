insert into emergency
(protocol_id, initialized_by_user_id, swiped)
values
($1, $2, $3)
returning *;