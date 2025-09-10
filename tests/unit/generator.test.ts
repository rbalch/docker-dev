import { generateProject } from '../../src/generator';
import * as fs from 'fs/promises';
import * as fsExtra from 'fs-extra';
import { ScaffoldingConfig } from '../../src/config';

// Mock the fs/promises module
jest.mock('fs/promises');
jest.mock('fs-extra');
jest.mock('fs');

// Mock the entire path module, defining the constant inside the factory
jest.mock('path', () => {
    const MOCK_TEMPLATE_DIR = '/mock/template'; // Define constant inside the mock
    const originalPath = jest.requireActual('path');
    return {
        ...originalPath, 
        resolve: (...paths: string[]) => {
            if (paths.length === 2 && paths[1] === '../template') {
                return MOCK_TEMPLATE_DIR;
            }
            return originalPath.resolve(...paths);
        },
    };
});

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedFsExtra = fsExtra as jest.Mocked<typeof fsExtra>;
const mockedFsSync = require('fs');
const path = require('path'); // require path after mocking

describe('generateProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFsSync.existsSync.mockReturnValue(false);
  });

  it('should correctly generate a greenfield project', async () => {
    const config: ScaffoldingConfig = {
      installPath: 'my-test-project',
      projectType: 'greenfield',
    };

    const dockerComposeTemplateContent = `services:\n  dev:\n    build:\n      context: ./dev\nvolumes:\n  root-history:`;

    mockedFs.readFile.mockResolvedValue(dockerComposeTemplateContent);

    await generateProject(config);

    const expectedProjectPath = path.resolve(process.cwd(), config.installPath);

    expect(mockedFs.mkdir).toHaveBeenCalledWith(expectedProjectPath, { recursive: true });

    expect(mockedFs.cp).toHaveBeenCalledWith(
      path.join('/mock/template', 'dev'),
      path.join(expectedProjectPath, 'dev'),
      { recursive: true }
    );

    expect(mockedFs.copyFile).toHaveBeenCalledWith(
      path.join('/mock/template', 'Makefile.template'),
      path.join(expectedProjectPath, 'Makefile')
    );

    expect(mockedFs.readFile).toHaveBeenCalledWith(
      path.join('/mock/template', 'docker-compose.template.yaml'),
      'utf8'
    );

    // Docker compose template is copied as-is for greenfield
    const writtenContent = (mockedFs.writeFile.mock.calls[0][1] as string);
    expect(writtenContent).toBe(dockerComposeTemplateContent);
    
    // Check .env and .bmad-flattenignore files were created
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(expectedProjectPath, '.env'),
      '',
      'utf8'
    );
    expect(mockedFs.copyFile).toHaveBeenCalledWith(
      path.join('/mock/template', '.bmad-flattenignore'),
      path.join(expectedProjectPath, '.bmad-flattenignore')
    );
  });

  it('should correctly generate a brownfield project', async () => {
    const config: ScaffoldingConfig = {
      installPath: 'my-brownfield-project',
      projectType: 'brownfield',
      appPath: '/path/to/my/app',
    };

    const dockerComposeTemplateContent = `services:\n  dev:\n    build:\n      context: ./dev\nvolumes:\n  root-history:`;

    mockedFs.readFile.mockResolvedValue(dockerComposeTemplateContent);

    await generateProject(config);

    const expectedProjectPath = path.resolve(process.cwd(), config.installPath);

    // Check that brownfield setup functions were called
    expect(mockedFs.mkdir).toHaveBeenCalledWith(
      path.join(expectedProjectPath, 'app'),
      { recursive: true }
    );
    expect(mockedFsExtra.copy).toHaveBeenCalledWith(
      config.appPath,
      path.join(expectedProjectPath, 'app'),
      expect.any(Object)
    );
    
    // Docker compose template is copied as-is (no app service modification)
    const writtenContent = (mockedFs.writeFile.mock.calls[0][1] as string);
    expect(writtenContent).toBe(dockerComposeTemplateContent);
    
    // Check .env and .bmad-flattenignore files were created
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(expectedProjectPath, '.env'),
      '',
      'utf8'
    );
    expect(mockedFs.copyFile).toHaveBeenCalledWith(
      path.join('/mock/template', '.bmad-flattenignore'),
      path.join(expectedProjectPath, '.bmad-flattenignore')
    );
  });

  it('should correctly generate a brownfield project with Vercel', async () => {
    const config: ScaffoldingConfig = {
      installPath: 'my-vercel-project',
      projectType: 'brownfield',
      appPath: '/path/to/my/vercel-app',
      useVercel: true,
    };

    const dockerComposeTemplateContent = `
services:
  dev:
    build:
      context: ./dev

  # app:
  #   build:
  #     context: ./app

volumes:
  root-history:
`;

    mockedFs.readFile.mockResolvedValue(dockerComposeTemplateContent);
    mockedFsSync.existsSync.mockReturnValue(false); // No existing Dockerfile

    await generateProject(config);

    const expectedProjectPath = path.resolve(process.cwd(), config.installPath);
    const expectedAppPath = path.join(expectedProjectPath, 'app');

    // Check brownfield setup
    expect(mockedFsExtra.copy).toHaveBeenCalledWith(
      config.appPath,
      expectedAppPath,
      expect.any(Object)
    );

    // Check Vercel-specific files were copied
    expect(mockedFs.copyFile).toHaveBeenCalledWith(
      path.join('/mock/template', 'vercel/Dockerfile'),
      path.join(expectedAppPath, 'Dockerfile')
    );
    expect(mockedFs.copyFile).toHaveBeenCalledWith(
      path.join('/mock/template', 'vercel/docker-entrypoint.sh'),
      path.join(expectedAppPath, 'docker-entrypoint.sh')
    );
    expect(mockedFs.copyFile).toHaveBeenCalledWith(
      path.join('/mock/template', 'vercel/docker-compose.vercel.template.yaml'),
      path.join(expectedProjectPath, 'docker-compose.vercel.yaml')
    );
  });

  it('should throw error when Dockerfile exists in Vercel setup', async () => {
    const config: ScaffoldingConfig = {
      installPath: 'my-vercel-project-conflict',
      projectType: 'brownfield',
      appPath: '/path/to/my/vercel-app',
      useVercel: true,
    };

    const dockerComposeTemplateContent = `services:\n  dev:\n    build:\n      context: ./dev`;
    mockedFs.readFile.mockResolvedValue(dockerComposeTemplateContent);
    mockedFsSync.existsSync.mockReturnValue(true); // Dockerfile exists

    await expect(generateProject(config)).rejects.toThrow(
      'Dockerfile already exists in app directory'
    );
  });

  it('should create .env and .bmad-flattenignore for all projects', async () => {
    const config: ScaffoldingConfig = {
      installPath: 'my-test-project',
      projectType: 'greenfield',
    };

    const dockerComposeTemplateContent = `services:\n  dev:\n    build:\n      context: ./dev`;
    mockedFs.readFile.mockResolvedValue(dockerComposeTemplateContent);

    await generateProject(config);

    const expectedProjectPath = path.resolve(process.cwd(), config.installPath);

    // Check .env file creation
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      path.join(expectedProjectPath, '.env'),
      '',
      'utf8'
    );

    // Check .bmad-flattenignore file copy
    expect(mockedFs.copyFile).toHaveBeenCalledWith(
      path.join('/mock/template', '.bmad-flattenignore'),
      path.join(expectedProjectPath, '.bmad-flattenignore')
    );
  });
});