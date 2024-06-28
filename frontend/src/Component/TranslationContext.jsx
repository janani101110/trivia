// // import React, { useEffect, useState } from 'react';

// // const GoogleTranslate = () => {
// //   const [language, setLanguage] = useState('en');

// //   const scriptId = 'google-translate-script';

// //   useEffect(() => {
// //     const addGoogleTranslateScript = () => {
// //       return new Promise((resolve, reject) => {
// //         if (!document.getElementById(scriptId)) {
// //           const script = document.createElement('script');
// //           script.id = scriptId;
// //           script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
// //           script.async = true;
// //           script.onload = resolve;
// //           script.onerror = reject;
// //           document.body.appendChild(script);
// //         } else {
// //           resolve();
// //         }
// //       });
// //     };

// //     const googleTranslateElementInit = () => {
// //       if (window.google && window.google.translate && !document.getElementById('google_translate_element').hasChildNodes()) {
// //         new window.google.translate.TranslateElement(
// //           {
// //             pageLanguage: 'en',
// //             includedLanguages: 'en,si,ta',
// //             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
// //           },
// //           'google_translate_element'
// //         );
// //       } else {
// //         console.error('Google Translate script failed to load.');
// //       }
// //     };

// //     // Assign init function to window object
// //     window.googleTranslateElementInit = googleTranslateElementInit;

// //     // Add script to the document and initialize
// //     addGoogleTranslateScript()
// //       .then(() => {
// //         if (window.googleTranslateElementInit) {
// //           window.googleTranslateElementInit();
// //         }
// //       })
// //       .catch(error => {
// //         console.error('Error loading Google Translate script:', error);
// //       });

// //     // Clean up when component is unmounted
// //     return () => {
// //       const script = document.getElementById(scriptId);
// //       if (script) {
// //         document.body.removeChild(script);
// //       }
// //       delete window.googleTranslateElementInit;
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       <div id="google_translate_element"></div>
// //       {/* <select onChange={(e) => setLanguage(e.target.value)} value={language}>
// //         <option value="en">English</option>
// //         <option value="si">Sinhala</option>
// //         <option value="ta">Tamil</option>
// //       </select> */}
// //     </div>
// //   );
// // };

// // export default GoogleTranslate;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TranslationContext = React.createContext();

// const TranslationProvider = ({ children }) => {
//     const [translatedText, setTranslatedText] = useState({});
//     const targetLanguage = 'es'; // Default to Spanish

//     useEffect(() => {
//         // Fetch translated content when component mounts
//         const fetchTranslatedContent = async () => {
//             try {
//                 // Replace with your backend endpoint
//                 const response = await axios.post('/api/translate', { text: 'Your original text', targetLanguage });
//                 setTranslatedText(response.data.translatedText);
//             } catch (error) {
//                 console.error('Translation error:', error);
//             }
//         };

//         fetchTranslatedContent();
//     }, []);

//     return (
//         <TranslationContext.Provider value={{ translatedText }}>
//             {children}
//         </TranslationContext.Provider>
//     );
// };

// export { TranslationContext, TranslationProvider };
