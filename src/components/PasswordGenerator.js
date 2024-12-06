'use client';
// /src/app/page.js
import { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState([]);

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*';

    if (charset.length === 0) {
      setPassword('Please select at least one option');
      setStrength(0);
      return;
    }

    let passwordGenerated = '';
    for (let i = 0; i < length; i++) {
      passwordGenerated += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(passwordGenerated);
    passwordHistory.push(passwordGenerated);
    if (passwordHistory.length > 5) {
      passwordHistory.shift();
    }
    setStrength(calculateStrength(passwordGenerated));
  };

  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 12) score += 40;
    if (useUppercase) score += 20;
    if (useNumbers) score += 20;
    if (useSymbols) score += 20;
    return Math.min(score, 100); // Máximo 100
  };


  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="w-full space-y-8 bg-white p-8 rounded-lg shadow-xl"> 
        <div className="space-y-4 mt-8">
          {/* Length Slider */}
          <span className='text-md font-normal items-center'>Password Length</span>
          <div className="flex items-center justify-between">
            
            <input
              type="range"
              min="1"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full mx-2"
            />
            <span>{length}</span>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <div>
              <input type="checkbox" id="uppercase" className="mr-2" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} />
              <label htmlFor="uppercase">Include uppercase letters (A-Z)</label>
            </div>
            <div>
              <input type="checkbox" id="numbers" className="mr-2" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
              <label htmlFor="numbers">Include numbers (0-9)</label>
            </div>
            <div>
              <input type="checkbox" id="symbols" className="mr-2" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
              <label htmlFor="symbols">Include symbols (!@#$%^&*)</label>
            </div>
          </div>

          {/* Password Display */}
          <div className="relative">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md text-center"
            />
            <button
              onClick={() => {navigator.clipboard.writeText(password)
                alert('Password copied to clipboard!')
              }}
              className="absolute right-3 top-3 text-blue-500"
            >
              Copy
            </button>
          </div>

          {/* Password Strength */}
          <h3 className="text-sm font-semibold text-gray-500">Password Strength</h3>
          <div className="flex justify-between mt-0">
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full`} style={{ width: `${strength}%`, backgroundColor: strength < 50 ? 'red' : strength < 80 ? 'yellow' : 'green' }}></div>
            </div>
          </div>

          {/* Button to Generate Password */}
          <button
            onClick={generatePassword}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg"
          >
            Generate New Password
          </button>
        
          {/* Generated passwords history */}
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-500">Generated passwords history</h3>
            <div className="space-y-1">
                <div className='bg-gray-100 p-2 rounded-md'>
                    {passwordHistory.map((ps, index) => (
                        <div key={index} className="bg-gray-100 p-2 rounded-md">{ps}</div>
                    ))}
                </div>
            </div>
          </div>

          {/* Tips for Secure Passwords */}
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold text-sm">Tips for secure passwords</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Use a combination of uppercase letters, lowercase letters, numbers, and symbols.</li>
              <li>Avoid using personal information like birthdates or names.</li>
              <li>Use different passwords for each account.</li>
              <li>Change your passwords regularly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;