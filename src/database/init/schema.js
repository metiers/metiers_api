function schema() {
	return (`
		CREATE DATABASE IF NOT EXISTS Metiers;
		USE Metiers;
		
		CREATE TABLE IF NOT EXISTS User (
			id INT NOT NULL AUTO_INCREMENT,
			email VARCHAR(255) NOT NULL,
			firstName VARCHAR(255) NOT NULL,
			lastName VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			PRIMARY KEY (id)
		);
		
		CREATE TABLE IF NOT EXISTS Company (
			id INT NOT NULL AUTO_INCREMENT,
			userId INT NOT NULL,
			name VARCHAR(255) NOT NULL,
			description TEXT,
			phone VARCHAR(255),
			address1 VARCHAR(255),
			address2 VARCHAR(255),
			city VARCHAR(255),
			state VARCHAR(255),
			zip VARCHAR(255),
			PRIMARY KEY (id)
		);
		
		CREATE TABLE IF NOT EXISTS Job (
			id INT NOT NULL AUTO_INCREMENT,
			userId INT NOT NULL,
			companyId INT NOT NULL,
			title VARCHAR(255) NOT NULL,
			description TEXT,
			notes TEXT,
			source VARCHAR(255),
			status VARCHAR(255) NOT NULL,
			ranking INT,
			deadline VARCHAR(255),
			link VARCHAR(255),
			resource TEXT,
			createdAt DATETIME,
			PRIMARY KEY (id),
			KEY userId (userId),
			CONSTRAINT job_fk0 FOREIGN KEY (userId) REFERENCES User (id),
			KEY companyId (companyId),
			CONSTRAINT job_fk1 FOREIGN KEY (companyId) REFERENCES Company (id)
		);

		CREATE TABLE IF NOT EXISTS Notification (
			id INT NOT NULL AUTO_INCREMENT,
			jobId INT NOT NULL,
			userId INT NOT NULL,
			name VARCHAR(255),
			notes TEXT,
			type VARCHAR(255) NOT NULL,
			timeStamp DATETIME,
			notifyOn DATETIME,
			notificationType VARCHAR(255),
			PRIMARY KEY (id),
			KEY jobId (jobId),
			CONSTRAINT notification_fk0 FOREIGN KEY (jobId) REFERENCES Job (id),
			CONSTRAINT notification_fk1 FOREIGN KEY (userId) REFERENCES User (id)
		);
		
		CREATE TABLE IF NOT EXISTS History (
			id INT NOT NULL AUTO_INCREMENT,
			jobId INT NOT NULL,
			notificationId INT,
			name VARCHAR(255),
			timeStamp DATETIME,
			PRIMARY KEY (id),
			KEY jobId (jobId),
			CONSTRAINT history_fk0 FOREIGN KEY (jobId) REFERENCES Job (id),
			KEY notificationId (notificationId),
			CONSTRAINT history_fk1 FOREIGN KEY (notificationId) REFERENCES Notification (id)
		);
	`);
}

export default schema;