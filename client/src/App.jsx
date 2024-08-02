import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    status: '',
    userId: '',
    collegeEmailId: '',
    collegeRollNumber: '',
    numbers: '',
    alphabets: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert numbers and alphabets to arrays
    const numbersArray = formData.numbers.split(',').map(Number);
    const alphabetsArray = formData.alphabets.split(',');

    const postData = {
      ...formData,
      numbers: numbersArray,
      alphabets: alphabetsArray
    };

    try {
      const res = await fetch('https://bfhl-2-tmhk.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Submit User Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Status:</label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} required />
        </div>
        <div>
          <label>User ID:</label>
          <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />
        </div>
        <div>
          <label>College Email ID:</label>
          <input type="email" name="collegeEmailId" value={formData.collegeEmailId} onChange={handleChange} required />
        </div>
        <div>
          <label>College Roll Number:</label>
          <input type="text" name="collegeRollNumber" value={formData.collegeRollNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Numbers (comma-separated):</label>
          <input type="text" name="numbers" value={formData.numbers} onChange={handleChange} required />
        </div>
        <div>
          <label>Alphabets (comma-separated):</label>
          <input type="text" name="alphabets" value={formData.alphabets} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
