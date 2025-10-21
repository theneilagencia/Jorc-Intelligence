CREATE TABLE `reviewLogs` (
	`id` varchar(64) NOT NULL,
	`reportId` varchar(64) NOT NULL,
	`tenantId` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`fieldPath` text NOT NULL,
	`previousValue` text,
	`newValue` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `reviewLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` varchar(64) NOT NULL,
	`tenantId` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`reportId` varchar(64),
	`fileName` text NOT NULL,
	`fileSize` varchar(32),
	`fileType` varchar(64),
	`s3Key` text NOT NULL,
	`s3Url` text,
	`status` enum('uploading','uploaded','parsing','completed','failed') NOT NULL DEFAULT 'uploading',
	`errorMessage` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `uploads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `reports` MODIFY COLUMN `status` enum('draft','processing','parsing','needs_review','ready_for_audit','audited','certified','exported','completed','failed') NOT NULL DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE `reports` MODIFY COLUMN `metadata` json;--> statement-breakpoint
ALTER TABLE `reports` ADD `sourceType` enum('internal','external') DEFAULT 'internal' NOT NULL;--> statement-breakpoint
ALTER TABLE `reports` ADD `detectedStandard` varchar(32);--> statement-breakpoint
ALTER TABLE `reports` ADD `s3NormalizedUrl` text;--> statement-breakpoint
ALTER TABLE `reports` ADD `s3OriginalUrl` text;--> statement-breakpoint
ALTER TABLE `reports` ADD `parsingSummary` json;