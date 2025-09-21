import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      navigate('/signin');
      setUserData(null);
    } catch (err) {
      setUserData(null);
      console.log(err);
    }
  };

  const speak = (text) => {
    if (!text) return;
    
    // Split long text into chunks of ~200 characters to avoid truncation
    const chunkSize = 200;
    const chunks = text.match(new RegExp(`.{1,${chunkSize}}`, 'g'));

    chunks.forEach((chunk, index) => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        // Chain the chunks so each starts after the previous one
        utterance.onend = () => {
        if (index + 1 < chunks.length) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(chunks[index + 1]));
        }
        };
        if (index === 0) window.speechSynthesis.speak(utterance);
    });
 };


  useEffect(() => {
    const startAssistant = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.lang = 'en-US';

      recognition.onresult = async (e) => {
        const transcript = e.results[e.results.length - 1][0].transcript.trim();
        console.log("Transcript:", transcript);

        if (!userData?.assistantName) return;

        if (transcript) {
          const data = await getGeminiResponse(transcript);
          console.log("Gemini response:", data);
          if (data?.response) speak(data.response);
        }
      };

      recognition.onend = () => {
        // Automatically restart recognition
        recognition.start();
      };

      recognition.start();
      console.log("Assistant activated!");
    };

    // Only start after a click anywhere
    const clickHandler = () => {
      startAssistant();
      // Remove listener after first click
      window.removeEventListener("click", clickHandler);
    };

    window.addEventListener("click", clickHandler);

    return () => window.removeEventListener("click", clickHandler);
  }, [userData, getGeminiResponse]);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[15px]">
      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <button
          className="min-w-[150px] mt-[30px] h-[60px] cursor-pointer rounded-full text-black bg-white font-semibold text-[19px] absolute top-[20px] right-[20px]"
          onClick={handleLogout}
        >
          Log Out
        </button>
        <button
          className="min-w-[150px] mt-[30px] h-[60px] cursor-pointer rounded-full text-black bg-white font-semibold text-[19px] absolute top-[100px] right-[20px] py-[10px] px-[20px] cursor-pointer"
          onClick={() => navigate('/customize')}
        >
          Customize Your Assistant
        </button>
        <img src={userData?.assistantImage} alt="" className="h-full object-cover" />
      </div>
      {userData != null && (
        <h1 className="text-white text-[18px] font-semibold">
          I'm {userData?.assistantName}
        </h1>
      )}
      <p className="text-white mt-5 text-[14px]">Click anywhere to activate your assistant</p>
    </div>
  );
}

export default Home;
