import React, { useState} from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import '../css/userpage.css';
import '../css/settings.css';
import HomeButtonHeader from '../components/HomeButtonHeader';
import { Container } from 'react-bootstrap';

function Userpage(props) {
  const [selectedSeed, setSelectedSeed] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');

  const seedValues = [
    'Snickers',
    'Dusty',
    'Jasmine',
    'Cleo',
    'Max',
    'Bubba',
    'Gracie',
    'Baby',
    'Leo',
    'Midnight',
    'Zoe',
    'Peanut',
    'Lucy',
    'Muffin',
    'Mittens',
    'Rocky',
    'Snuggles',
    'Annie',
    'Sam',
    'Chloe',
  ];
  

  const flagEmojis = ['🇪🇸', '🇮🇹', '🇵🇹', '🇩🇪', '🇫🇷', '🇬🇧'];
  const otherEmojis = ['😃', '❤️', '🌟', '🎓', '🔥', '😎', '🤔', '🤪'];

  const handleSeedChange = (event) => {
    setSelectedSeed(event.target.value);
  };

  const handleGenerateAvatar = () => {
    const selectedSeedValue = selectedSeed || seedValues[0];
    const avatarUrl = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${selectedSeedValue}&size=80`;
    setAvatarUrl(avatarUrl);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleBadgeChange = (event) => {
    setSelectedBadge(event.target.value);
  };

  return (
    <>
    <HomeButtonHeader navigateToPage={props.navigateToPage} />
    <Container fluid>
    <div className="userpage-container" style={{ backgroundColor: '#ffffff', color: '#7950f2' }}>
      <div className="flex-container" style={{ display: 'flex', flexDirection: 'column', height: '60vh', width: '40vw', alignItems: 'center', border: '2px solid #7950f2',borderRadius: '10px', padding: '20px' }}>
        <h1 className="userpage-heading">Userpage</h1>
        {/* Dropdown to select seed value */}
        <select value={selectedSeed} onChange={handleSeedChange} style={{ color: '#7950f2', marginBottom: '10px' }}>
          <option value="">Select an Avatar</option>
          {seedValues.map((seed) => (
            <option key={seed} value={seed}>
              {seed}
            </option>
          ))}
        </select>
        {/* Button to generate avatar */}
        <button onClick={handleGenerateAvatar} style={{ backgroundColor: '#7950f2', color: 'white', border: '2px solid #7950f2', marginBottom: '10px' }}>
          Generate Avatar
        </button>
        {/* Display the generated avatar */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          {avatarUrl && <img src={avatarUrl} alt="Avatar" />}
          {/* Display the badge */}
          {selectedBadge && (
            <div style={{ marginLeft: '10px', fontSize: '16px' }}>
              {selectedBadge}
            </div>
          )}
        </div>
        {/* Badge selection */}
        <select value={selectedBadge} onChange={handleBadgeChange} style={{ color: '#7950f2', marginBottom: '10px' }}>
          <option value="">Select a Badge</option>
          {flagEmojis.map((emoji, index) => (
            <option key={index} value={emoji}>
              {emoji}
            </option>
          ))}
          {otherEmojis.map((emoji, index) => (
            <option key={index} value={emoji}>
              {emoji}
            </option>
          ))}
        </select>
        {/* Textbox to write bio */}
        <textarea
          value={bio}
          onChange={handleBioChange}
          placeholder="Introduce Yourself"
          rows={4}
          cols={50}
          style={{
            border: '2px solid #7950f2',
            borderRadius: '10px',
            backgroundColor: 'white',
            color: '#7950f2',
            fontSize: '20px',
            padding: '10px',
            marginTop: '10px',
            outline: 'none',
          }}
        />
        {/* Add other custom content here */}
      </div>
    </div>
    </Container>
    </>
  );
}

export default Userpage;