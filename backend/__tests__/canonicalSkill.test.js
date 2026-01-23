import { canonicalizeSkill } from '../utils/canonicalSkill.util.js';

describe('canonicalizeSkill', () => {
  test('should lowercase skills', () => {
    expect(canonicalizeSkill('React')).toBe('react');
    expect(canonicalizeSkill('NODE.js')).toBe('node'); // logic removes .js
  });

  test('should handle C++ and C# correctly', () => {
    expect(canonicalizeSkill('C++')).toBe('c++');
    expect(canonicalizeSkill('C#')).toBe('c#');
    expect(canonicalizeSkill('c++')).toBe('c++');
  });

  test('should handle .NET correctly', () => {
    expect(canonicalizeSkill('.NET')).toBe('.net');
    expect(canonicalizeSkill('.net')).toBe('.net');
  });

  test('should normalization versions', () => {
    expect(canonicalizeSkill('HTML5')).toBe('html');
    expect(canonicalizeSkill('CSS3')).toBe('css');
    expect(canonicalizeSkill('ES6')).toBe('es');
    expect(canonicalizeSkill('Python 3.9')).toBe('python');
  });

  test('should normalize common variations', () => {
    expect(canonicalizeSkill('React.js')).toBe('react');
    expect(canonicalizeSkill('ReactJS')).toBe('reactjs'); // Note: The util doesn't explicitly handle "ReactJS" -> "react" rewrite in the provided code unless regex catches it, but let's see current behavior. 
    // Wait, regex: .replace(/\.js$/g, "") handles .js. 
    // "ReactJS" isn't handled by the provided code explicitly to strip JS suffix unless it was .js
    // Let's test what the code actually does.
    // Code has: .replace(/\.js$/g, "")
    // Code has: .replace(/[^a-z0-9\s+#.]/g, " ")
    
    // Testing known replacements
    expect(canonicalizeSkill('apis')).toBe('api');
    expect(canonicalizeSkill('gitgithub')).toBe('git github');
    expect(canonicalizeSkill('socketio')).toBe('socket io');
  });

  test('should clean filler words', () => {
    expect(canonicalizeSkill('React Framework')).toBe('react');
    expect(canonicalizeSkill('Redux Tool')).toBe('redux');
  });

  test('should handle special characters to be removed', () => {
      expect(canonicalizeSkill('Node_JS')).toBe('node js'); // _ becomes space
      expect(canonicalizeSkill('Node-JS')).toBe('node js'); // - becomes space
  });
});
