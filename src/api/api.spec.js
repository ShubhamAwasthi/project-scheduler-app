import * as Lockr from 'lockr';
import { setProjects, getProjects } from './index';
import { PROJECTS_KEY } from '../constants';

// Mock Lockr
jest.mock('lockr');

describe('setProjects', () => {
  let mockProjects;

  beforeEach(() => {
    // Clear any mock implementations or calls before each test
    jest.clearAllMocks();
    // Initialize mockProjects to an empty array
    mockProjects = [];
    // Mock Lockr.get to return the mockProjects array
    Lockr.get.mockImplementation(() => mockProjects);
    // Mock Lockr.set to update the mockProjects array
    Lockr.set.mockImplementation((key, value) => {
      if (key === PROJECTS_KEY) {
        mockProjects = value;
      }
    });
  });

  test('should save a simple project list', () => {
    const projects = [
      { id: 1, name: 'Project A' },
      { id: 2, name: 'Project B' }
    ];
    setProjects(projects);
    expect(Lockr.set).toHaveBeenCalledWith(PROJECTS_KEY, projects);
    expect(getProjects()).toEqual(projects);
  });

  test('should save a project list with empty array', () => {
    const projects = [];
    setProjects(projects);
    expect(Lockr.set).toHaveBeenCalledWith(PROJECTS_KEY, projects);
    expect(getProjects()).toEqual(projects);
  });
});
