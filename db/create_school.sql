insert into school
(school_name, school_city, school_state)
values
($1, $2, $3)
returning *;