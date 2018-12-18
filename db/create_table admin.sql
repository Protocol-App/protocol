create table admin (
    admin_id serial primary key,
    admin_first text,
    admin_last text,
    admin_email text,
    admin_hash text,
    school_id int,

    foreign key (school_id) references school (school_id)
);