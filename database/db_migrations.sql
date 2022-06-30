DROP TABLE IF EXISTS work;
DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS workout;

CREATE TABLE exercise(
   id INT PRIMARY KEY     NOT NULL,
   name           TEXT    NOT NULL,
   description    CHAR(150) NOT NULL
);

CREATE TABLE workout(
   id INT PRIMARY KEY     NOT NULL,
   name           TEXT    NOT NULL,
   date           DATE     NOT NULL
);

CREATE TABLE work(
   id INT PRIMARY KEY     NOT NULL,
   weight         INT     NOT NULL,
   unit           CHAR(50) NOT NULL,
   sets           INT     NOT NULL,
   reps           INT     NOT NULL,
   exercise_id INT NOT NULL REFERENCES exercise(id),
   workout_id INT NOT NULL REFERENCES workout(id)-- ,
);