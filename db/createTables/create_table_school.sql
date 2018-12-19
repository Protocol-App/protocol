create table school (
    school_id serial primary key,
    school_name text,
    school_city text,
    school_state text,
    emergency_id int,

    foreign key (emergency_id) references emergency (emergency_id)
);

