CREATE TABLE `audits` (
	`id` varchar(64) NOT NULL,
	`reportId` varchar(64) NOT NULL,
	`tenantId` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`auditType` enum('full','partial') NOT NULL DEFAULT 'full',
	`score` float NOT NULL,
	`totalRules` int NOT NULL,
	`passedRules` int NOT NULL,
	`failedRules` int NOT NULL,
	`krcisJson` json,
	`recommendationsJson` json,
	`pdfUrl` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `audits_id` PRIMARY KEY(`id`)
);
