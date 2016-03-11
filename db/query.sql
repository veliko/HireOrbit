create database if not exists hireOrbit;

GRANT ALL PRIVILEGES ON hireOrbit.* TO 'hireOrbit'@'localhost';

/*Before running this part you need to login as the gitBegin user (or some user w/ permission on the db)*/
use hireOrbit;

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
  sponsored bool,
  expired bool,
  indeedApply bool,
  formattedLocationFull nvarchar(30),
  noUniqueUrl bool,
  formattedRelativeTime nvarchar(30),
  onmousedown nvarchar(50)
	);


