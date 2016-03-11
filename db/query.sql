create database if not exists hireOrbit;

GRANT ALL PRIVILEGES ON hireOrbit.* TO 'hireOrbit'@'localhost';

/*Before running this part you need to login as the gitBegin user (or some user w/ permission on the db)*/
use hireOrbit;

/* DROP TABLE IF EXISTS indeed_jobs;*/

create table indeed_jobs (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  jobtitle nvarchar(200),
  company nvarchar(50),
  city nvarchar(50),
  state nvarchar(30),
  country nvarchar(30),
  formattedLocation nvarchar(50),
  source nvarchar(50),
  date datetime,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  snippet nvarchar(1500),
  url nvarchar(500),
  latitude nvarchar(20),
  longitude nvarchar(20),
  jobkey nvarchar(30),
  UNIQUE (jobkey),
  sponsored bool,
  expired bool,
  indeedApply bool,
  formattedLocationFull nvarchar(30),
  noUniqueUrl bool,
  formattedRelativeTime nvarchar(30),
  onmousedown nvarchar(50)
);

create table saved_searches (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id int NOT NULL,
);

create table jobs_saved_searches (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  jobkey_id nvarchar(30) NOT NULL,
  saved_search_id int NOT NULL,
);

create table workflow_state (
	internal_id int AUTO_INCREMENT PRIMARY KEY,
	state nvarchar(15) NOT NULL,
	jobkey_id nvarchar(30) NOT NULL,
	user_id int NOT NULL,
);

create table users (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  username nvarchar(50) NOT NULL,
  UNIQUE (username),
  name nvarchar(100),
  github_avatar_url nvarchar(100),
  github_html_url nvarchar(100),
  github_access_token nvarchar(60),
  github_refresh_token nvarchar(60),
);

ALTER TABLE saved_searches ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (internal_id);
ALTER TABLE jobs_saved_searches ADD CONSTRAINT fk_jobkey FOREIGN KEY (jobkey_id) REFERENCES indeed_jobs (jobkey);
ALTER TABLE jobs_saved_searches ADD CONSTRAINT fk_saved_search_id FOREIGN KEY (saved_search_id) REFERENCES saved_searches (internal_id);
ALTER TABLE workflow_state ADD CONSTRAINT fk_jobkey_id FOREIGN KEY (jobkey_id) REFERENCES indeed_jobs (jobkey);
ALTER TABLE workflow_state ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (internal_id);
