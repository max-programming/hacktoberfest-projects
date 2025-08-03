#!/usr/bin/env node

import { execSync } from 'child_process';
import 'dotenv/config';
const command = `xata init --db ${process.env.XATA_HTTP_ENDPOINT} --sdk --no-input --yes --codegen=src/xata.ts --force`;

console.log(command);
console.log('Running xata init command...');
execSync(command, { stdio: 'inherit' });
