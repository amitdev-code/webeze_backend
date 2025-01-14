/* eslint-disable prettier/prettier */
import * as fs from 'fs';
import * as path from 'path';

interface FileTemplate {
  path: string;
  content: string;
}

interface ModuleOptions {
  createEntity?: boolean;
}

// Template strings for different file types
const getServiceTemplate = (moduleName: string, hasEntity: boolean): string => {
  if (!hasEntity) {
    return `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${moduleName}Service {
  constructor() {}
}`;
  }

  return `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${moduleName}Entity } from '../entity/${moduleName.toLowerCase()}.entity';

@Injectable()
export class ${moduleName}Service {
  constructor(
    @InjectRepository(${moduleName}Entity)
    private readonly ${moduleName.toLowerCase()}Repository: Repository<${moduleName}Entity>,
  ) {}
}`;
};

const getControllerTemplate = (
  moduleName: string,
): string => `import { Controller } from '@nestjs/common';
import { ${moduleName}Service } from '../providers/${moduleName.toLowerCase()}.service';

@Controller('${moduleName.toLowerCase()}')
export class ${moduleName}Controller {
  constructor(private readonly ${moduleName.toLowerCase()}Service: ${moduleName}Service) {}
}
`;

const getEntityTemplate = (
  moduleName: string,
): string => `import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('${moduleName.toLowerCase()}')
export class ${moduleName}Entity extends BaseEntity {}`;

const getModuleTemplate = (moduleName: string, hasEntity: boolean): string => {
  if (!hasEntity) {
    return `import { Module } from '@nestjs/common';
import { ${moduleName}Controller } from './controller/${moduleName.toLowerCase()}.controller';
import { ${moduleName}Service } from './providers/${moduleName.toLowerCase()}.service';

@Module({
  controllers: [${moduleName}Controller],
  providers: [${moduleName}Service],
  exports: [${moduleName}Service],
})
export class ${moduleName}Module {}`;
  }

  return `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${moduleName}Controller } from './controller/${moduleName.toLowerCase()}.controller';
import { ${moduleName}Service } from './providers/${moduleName.toLowerCase()}.service';
import { ${moduleName}Entity } from './entity/${moduleName.toLowerCase()}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([${moduleName}Entity])],
  controllers: [${moduleName}Controller],
  providers: [${moduleName}Service],
  exports: [${moduleName}Service],
})
export class ${moduleName}Module {}`;
};

// Function to create directory if it doesn't exist
const createDirIfNotExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Function to update main.module.ts
const updateMainModule = (moduleName: string): void => {
  const mainModulePath = path.join(process.cwd(), 'src', 'main.module.ts');

  if (fs.existsSync(mainModulePath)) {
    let content = fs.readFileSync(mainModulePath, 'utf8');

    // Add import statement
    const importStatement = `import { ${moduleName}Module } from './modules/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.module';`;
    content = content.replace(
      /import.*?;/s,
      (match) => `${match}\n${importStatement}`,
    );

    // Add to imports array
    content = content.replace(/imports:\s*\[(.*?)\]/s, (match, imports) => {
      const newImports = imports.trim()
        ? `${imports}, ${moduleName}Module`
        : moduleName + 'Module';
      return `imports: [${newImports}]`;
    });

    fs.writeFileSync(mainModulePath, content);
  }
};

// Main function to generate module files
const generateModule = (
  moduleName: string,
  options: ModuleOptions = {},
): void => {
  // Capitalize first letter of module name
  moduleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  const createEntity = options.createEntity ?? true; // Default to true if not specified

  // Create base module directory
  const moduleDir = path.join(
    process.cwd(),
    'src',
    'modules',
    moduleName.toLowerCase(),
  );
  createDirIfNotExists(moduleDir);

  // Create subdirectories
  const directories = ['providers', 'controller'];
  if (createEntity) {
    directories.push('entity');
  }

  directories.forEach((dir) => {
    createDirIfNotExists(path.join(moduleDir, dir));
  });

  // Create files
  const files: FileTemplate[] = [
    {
      path: path.join(
        moduleDir,
        'providers',
        `${moduleName.toLowerCase()}.service.ts`,
      ),
      content: getServiceTemplate(moduleName, createEntity),
    },
    {
      path: path.join(
        moduleDir,
        'controller',
        `${moduleName.toLowerCase()}.controller.ts`,
      ),
      content: getControllerTemplate(moduleName),
    },
    {
      path: path.join(moduleDir, `${moduleName.toLowerCase()}.module.ts`),
      content: getModuleTemplate(moduleName, createEntity),
    },
  ];

  // Add entity file if createEntity is true
  if (createEntity) {
    files.push({
      path: path.join(
        moduleDir,
        'entity',
        `${moduleName.toLowerCase()}.entity.ts`,
      ),
      content: getEntityTemplate(moduleName),
    });
  }

  files.forEach((file) => {
    fs.writeFileSync(file.path, file.content);
  });

  // Update main.module.ts
  updateMainModule(moduleName);

  console.log(`Module ${moduleName} has been generated successfully!`);
  if (!createEntity) {
    console.log('Note: Entity file was not generated as per configuration.');
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const moduleName = args[0];
const options: ModuleOptions = {
  createEntity: args.includes('--no-entity') ? false : true,
};

if (!moduleName) {
  console.error('Please provide a module name');
  process.exit(1);
}

generateModule(moduleName, options);
