'use strict';

const fs = require('fs'),
	utils = require('./utils');

class FileCreation {
	constructor(moduleName) {
		this.moduleName = moduleName;
		this.formats = {
			capitalizedText: utils.capitalizeText(moduleName),
			upperCasedText: utils.upperCaseText(moduleName),
			lowerCasedText: utils.lowerCaseText(moduleName)
		};
	}

	createFiles() {
		const self = this;
		const folders = ['interface', 'joi', 'middleware', 'schema'];
		const types = ['controller', 'gateway', 'module', 'providers', 'service'];
		let templateFiles = [];
		return new Promise(async (resolve, reject) => {
			for (let x = 0; x < folders.length; x++) {
				if (folders[x] !== 'middleware') {
					if (folders[x] === 'joi') templateFiles.push({ type: folders[x], location: `./Templates/${folders[x]}/template.${folders[x]}.ts` });
					else templateFiles.push({ type: folders[x], location: `./Templates/${folders[x]}s/template.${folders[x]}.ts` });
				} else {
					templateFiles.push({ type: folders[x], location: `./Templates/${folders[x]}s/template-validator.${folders[x]}.ts` }, 
									   { type: folders[x], location: `./Templates/${folders[x]}s/templateById.${folders[x]}.ts` });
				}
			}

			types.forEach(type => {
				templateFiles.push({ type: 'root', location: `./Templates/template.${type}.ts` });
			});

			console.log(templateFiles);
			console.log('finished');
			for (let i =  0; i < templateFiles.length; i++) {
				fs.readFile(templateFiles[i].location, 'utf8', async (err, buf) => {
					if (err) reject(err);
					else {
						const moduleTemplate = buf.toString();

						let newLocationFile = templateFiles[i].location.replace(/Templates/g, `${self.formats.lowerCasedText}s`).replace(/template/g, `${self.formats.lowerCasedText}s`);
						

						const code = moduleTemplate
										.replace(/Template/g, self.formats.capitalizedText)
										.replace(/template/g, self.formats.lowerCasedText)
										.replace(/TEMPLATE/g, self.formats.upperCasedText);
						await self.writeCode(newLocationFile, code);
						resolve();
					}
				});
			}
			resolve();
		});
	};

	writeCode(location, code) {
		console.log(location);
		return new Promise((resolve, reject) => {
			fs.writeFile(location, code, err => {
				err ? reject(err): resolve();
			});
		});
	}
}

module.exports = FileCreation;