import { exec } from 'child_process';
import { ensureVolumesExist } from '../../src/docker';

// Mock the exec function
jest.mock('child_process', () => ({
  exec: jest.fn(),
}));

const mockedExec = exec as unknown as jest.Mock;

describe('ensureVolumesExist', () => {
  beforeEach(() => {
    // Clear mock history before each test
    mockedExec.mockClear();
    // Suppress console.log output for cleaner test results
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create all volumes if none exist', async () => {
    // Arrange: Simulate `docker volume ls` returning an empty list
    mockedExec.mockImplementation((command, callback) => {
      if (command.startsWith('docker volume ls')) {
        callback(null, { stdout: '', stderr: '' });
      } else {
        callback(null, { stdout: 'Volume created', stderr: '' });
      }
    });

    // Act
    await ensureVolumesExist();

    // Assert
    expect(mockedExec).toHaveBeenCalledWith("docker volume ls --format '{{.Name}}'", expect.any(Function));
    expect(mockedExec).toHaveBeenCalledWith('docker volume create root-history', expect.any(Function));
    expect(mockedExec).toHaveBeenCalledWith('docker volume create vscode-server', expect.any(Function));
    expect(mockedExec).toHaveBeenCalledWith('docker volume create huggingface-cache', expect.any(Function));
    expect(mockedExec).toHaveBeenCalledWith('docker volume create google-vscode-extension-cache', expect.any(Function));
    expect(mockedExec).toHaveBeenCalledTimes(5); // 1 for ls, 4 for create
  });

  it('should create only the missing volumes', async () => {
    // Arrange: Simulate `docker volume ls` returning two existing volumes
    const existingVolumes = 'root-history\nvscode-server';
    mockedExec.mockImplementation((command, callback) => {
      if (command.startsWith('docker volume ls')) {
        callback(null, { stdout: existingVolumes, stderr: '' });
      } else {
        callback(null, { stdout: 'Volume created', stderr: '' });
      }
    });

    // Act
    await ensureVolumesExist();

    // Assert
    expect(mockedExec).toHaveBeenCalledWith("docker volume ls --format '{{.Name}}'", expect.any(Function));
    expect(mockedExec).not.toHaveBeenCalledWith('docker volume create root-history', expect.any(Function));
    expect(mockedExec).not.toHaveBeenCalledWith('docker volume create vscode-server', expect.any(Function));
    expect(mockedExec).toHaveBeenCalledWith('docker volume create huggingface-cache', expect.any(Function));
    expect(mockedExec).toHaveBeenCalledWith('docker volume create google-vscode-extension-cache', expect.any(Function));
    expect(mockedExec).toHaveBeenCalledTimes(3); // 1 for ls, 2 for create
  });

  it('should not create any volumes if all exist', async () => {
    // Arrange: Simulate `docker volume ls` returning all required volumes
    const existingVolumes = 'root-history\nvscode-server\nhuggingface-cache\ngoogle-vscode-extension-cache';
    mockedExec.mockImplementation((command, callback) => {
      if (command.startsWith('docker volume ls')) {
        callback(null, { stdout: existingVolumes, stderr: '' });
      } else {
        callback(null, { stdout: 'Volume created', stderr: '' });
      }
    });

    // Act
    await ensureVolumesExist();

    // Assert
    expect(mockedExec).toHaveBeenCalledWith("docker volume ls --format '{{.Name}}'", expect.any(Function));
    expect(mockedExec).toHaveBeenCalledTimes(1); // Only the ls command should be called
  });

  it('should re-run with sudo if permission is denied', async () => {
    // Arrange: Simulate `docker volume ls` failing with permission denied, then succeeding with sudo
    const permissionError = new Error('Got permission denied while trying to connect to the Docker daemon socket');
    (permissionError as any).stderr = 'Got permission denied while trying to connect to the Docker daemon socket';

    mockedExec.mockImplementation((command, callback) => {
      if (command.startsWith('sudo')) {
        callback(null, { stdout: 'root-history', stderr: '' });
      } else if (command.startsWith('docker volume ls')) {
        callback(permissionError, { stdout: '', stderr: 'Got permission denied while trying to connect to the Docker daemon socket' });
      } else {
        callback(null, { stdout: 'Volume created', stderr: '' });
      }
    });

    // Act
    await ensureVolumesExist();

    // Assert
    expect(mockedExec).toHaveBeenCalledWith("docker volume ls --format '{{.Name}}'", expect.any(Function));
    expect(mockedExec).toHaveBeenCalledWith("sudo docker volume ls --format '{{.Name}}'", expect.any(Function));
    // 1 for ls, 1 for sudo ls, 3 for create (huggingface, google, vscode-server)
    expect(mockedExec).toHaveBeenCalledTimes(5);
  });
});
