CREATE TABLE `reports` (
	`id` varchar(64) NOT NULL,
	`tenantId` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`standard` varchar(32) NOT NULL,
	`title` text NOT NULL,
	`status` enum('draft','processing','completed','failed') NOT NULL DEFAULT 'draft',
	`s3Key` text,
	`s3Url` text,
	`metadata` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` varchar(64) NOT NULL,
	`name` text NOT NULL,
	`logoUrl` text,
	`s3Prefix` varchar(128) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `tenants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','parceiro','backoffice') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `tenantId` varchar(64) NOT NULL;