import inquirer from 'inquirer';
import { runPrompts } from '../../src/prompts';
import { ScaffoldingConfig } from '../../src/config';

jest.mock('inquirer');

describe('runPrompts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct config for a greenfield project', async () => {
    const mockAnswers = {
      installPath: 'test-project',
      projectType: 'greenfield',
    };
    
    const promptMock = jest.spyOn(inquirer, 'prompt');
    promptMock.mockResolvedValue(mockAnswers);

    const expectedConfig: ScaffoldingConfig = {
      installPath: 'test-project',
      projectType: 'greenfield',
    };

    const config = await runPrompts();
    expect(config).toEqual(expectedConfig);
  });

  it('should ask for appPath and return the correct config for a brownfield project', async () => {
    const mockAnswers = {
      installPath: 'test-project',
      projectType: 'brownfield',
      appPath: '/path/to/app',
    };
    
    const promptMock = jest.spyOn(inquirer, 'prompt');
    promptMock.mockResolvedValue(mockAnswers);

    const expectedConfig: ScaffoldingConfig = {
      installPath: 'test-project',
      projectType: 'brownfield',
      appPath: '/path/to/app',
    };

    const config = await runPrompts();

    const promptQuestions = promptMock.mock.calls[0][0] as unknown as any[];
    const appPathQuestion = promptQuestions.find((q: any) => q.name === 'appPath');

    expect(appPathQuestion).toBeDefined();
    expect(appPathQuestion.when(mockAnswers)).toBe(true);
    
    expect(config).toEqual(expectedConfig);
  });

  it('should not ask for appPath for a greenfield project', async () => {
    const mockAnswers = {
      installPath: 'test-project',
      projectType: 'greenfield',
    };
    
    const promptMock = jest.spyOn(inquirer, 'prompt');
    promptMock.mockResolvedValue(mockAnswers);

    const config = await runPrompts();

    const promptQuestions = promptMock.mock.calls[0][0] as unknown as any[];
    const appPathQuestion = promptQuestions.find((q: any) => q.name === 'appPath');

    expect(appPathQuestion.when(mockAnswers)).toBe(false);

    expect(config).toEqual({
      installPath: 'test-project',
      projectType: 'greenfield',
    });
  });

  it('should return adkSupport config', async () => {
    const mockAnswers = {
      installPath: 'test-project',
      projectType: 'greenfield',
      adkSupport: true,
    };
    
    const promptMock = jest.spyOn(inquirer, 'prompt');
    promptMock.mockResolvedValue(mockAnswers);

    const expectedConfig: ScaffoldingConfig = {
      installPath: 'test-project',
      projectType: 'greenfield',
      adkSupport: true,
    };

    const config = await runPrompts();
    expect(config).toEqual(expectedConfig);
  });
});
