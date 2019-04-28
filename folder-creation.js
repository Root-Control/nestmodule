'use strict';

const fs = require('fs');

class FolderCreation {
	constructor(moduleName) {
		this.moduleName = moduleName;
	}

	createRootFolder() {
		return new Promise(resolve => {
			const rootDir = `./${this.moduleName}s`;
			fs.mkdirSync(rootDir);
			resolve();
		});
	};

	createSubFolders() {
		return new Promise(async resolve => {
			await this.createInterfaceFolder();
			await this.createJoiFolder();
			await this.createMiddlewaresFolder();
			await this.createSchemasFolder();
			resolve();
		});
	};

	createInterfaceFolder() {
		return new Promise((resolve, reject) => {
			const interfaceDir = `./${this.moduleName}s/interfaces`;

			fs.mkdir(interfaceDir, { recursive: true }, err => {
			  if (err) reject();
			  else resolve();
			});

		});
	};

	createJoiFolder() {
		return new Promise((resolve, reject) => {
			const interfaceDir = `./${this.moduleName}s/joi`;

			fs.mkdir(interfaceDir, { recursive: true }, err => {
			  if (err) reject();
			  else resolve();
			});

		});
	};

	createMiddlewaresFolder() {
		return new Promise((resolve, reject) => {
			const interfaceDir = `./${this.moduleName}s/middlewares`;

			fs.mkdir(interfaceDir, { recursive: true }, err => {
			  if (err) reject();
			  else resolve();
			});

		});
	};

	createSchemasFolder() {
		return new Promise((resolve, reject) => {
			const interfaceDir = `./${this.moduleName}s/schemas`;

			fs.mkdir(interfaceDir, { recursive: true }, err => {
			  if (err) reject();
			  else resolve();
			});

		});
	};
}

module.exports = FolderCreation;