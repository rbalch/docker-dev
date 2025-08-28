import { generateProject } from '../../src/generator';
import * as fs from 'fs/promises';
import { ScaffoldingConfig } from '../../src/config';

// Mock the fs/promises module
jest.mock('fs/promises');

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
const path = require('path'); // require path after mocking

describe('generateProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly generate a greenfield project', async () => {
    const config: ScaffoldingConfig = {
      installPath: 'my-test-project',
      projectType: 'greenfield',
    };

    const dockerComposeTemplateContent = `
services:
  dev:
    build:
      context: ./dev

  # The 'app' service is for brownfield projects.
  # app:
  #   build:
  #     context: ./app
`;

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

    const writtenContent = (mockedFs.writeFile.mock.calls[0][1] as string);
    expect(writtenContent).not.toContain('# The \'app\' service');
  });
});
