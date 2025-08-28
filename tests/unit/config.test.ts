import { getUniqueProjectName } from '../../src/config';
import * as fs from 'fs';

// Mock the fs module
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('getUniqueProjectName', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockedFs.existsSync.mockReset();
  });

  it('should return the base name if it does not exist', () => {
    mockedFs.existsSync.mockReturnValue(false);
    const projectName = getUniqueProjectName('test-project');
    expect(projectName).toBe('test-project');
  });

  it('should return a numbered name if the base name exists', () => {
    mockedFs.existsSync.mockImplementation((path) => {
      return path.toString().endsWith('test-project');
    });
    const projectName = getUniqueProjectName('test-project');
    expect(projectName).toBe('test-project-1');
  });

  it('should return the next available numbered name', () => {
    mockedFs.existsSync.mockImplementation((path) => {
      const p = path.toString();
      return p.endsWith('test-project') || p.endsWith('test-project-1') || p.endsWith('test-project-2');
    });
    const projectName = getUniqueProjectName('test-project');
    expect(projectName).toBe('test-project-3');
  });

  it('should handle cases where the first few numbers are taken', () => {
    mockedFs.existsSync.mockImplementation((path) => {
        const p = path.toString();
        return p.endsWith('test-project') || p.endsWith('test-project-1');
    });
    const projectName = getUniqueProjectName('test-project');
    expect(projectName).toBe('test-project-2');
  });
});
