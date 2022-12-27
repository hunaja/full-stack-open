CREATE TABLE blogs (
    id SERIAL PRIMARY KEY UNIQUE,
    author text, 
    url text not null,
    title text not null,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Google', 'https://google.fi', 'Welcome to Google');

insert into blogs (author, url, title) values ('Facebook', 'https://facebook.fi', 'Welcome to Facebook');
