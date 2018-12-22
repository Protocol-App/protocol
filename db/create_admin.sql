insert into admin
(admin_first, admin_last, admin_phone_number, admin_email, admin_hash, school_id)
values
($1, $2, $3, $4, $5, $6)
returning *;