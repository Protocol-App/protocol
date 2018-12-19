create table protocol (
    protocol_id serial primary key,
    protocol_name text,
    protocol_1 text,
    protocol_2 text,
    protocol_3 text,
    protocol_4 text,
    protocol_5 text,
    protocol_6 text,
    protocol_7 text,
    protocol_8 text,
    protocol_9 text,
    protocol_10 text,
    school_id int,
    foreign key (school_id) references school (school_id)
);