import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { getFirestore, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth

const QRScanner = () => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // State to track verification status
  const [redirecting, setRedirecting] = useState(false); // State to track redirection
  const [verificationComplete, setVerificationComplete] = useState(false); // Track if verification is complete

  const onScanSuccess = async (result) => {
    console.log(result);

    // Database part
    if (result && result.data && !verificationComplete) {
      try {
        const dataParts = result.data.split(','); // Split the data string by comma
        const eventId = dataParts[0].split(': ')[1]; // Extract event ID from the first part
        const userId = dataParts[1].split(': ')[1]; // Extract user ID from the second part
        const db = getFirestore(app);
        const registrationsCollection = collection(db, 'registrations');

        // Query the registrations collection for the specific event and user ID
        const q = query(
          registrationsCollection,
          where('eventId', '==', eventId),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        
        console.log(querySnapshot.size);
        if (!querySnapshot.empty) {
          // Entry found, QR code verified
          setVerificationStatus(true); // Set verification status to true
          setVerificationComplete(true); // Set verification complete to true
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref); // Delete the entry to prevent multiple uses
          });
          setTimeout(() => {
            setRedirecting(true); // Set redirection flag to true
            window.location.href = '/Home'; // Redirect to home page after 5 seconds
          }, 5000); // 5000 milliseconds = 5 seconds
        } else {
          // Entry not found, QR code invalid
          if (!verificationComplete) {
            setVerificationStatus(false); // Set verification status to false
          }
        }
      } catch (error) {
        console.error('Error scanning QR code:', error.message);
        if (!verificationComplete) {
          setVerificationStatus(false); // Set verification status to false in case of error
        }
      }
    }
  };

  const onScanFail = (err) => {
    console.log(err);
    setCameraError(true);
  };

  const handleCloseCamera = () => {
    setCameraError(false);
    scanner.current?.stop();
  };

  const handleRestartCamera = () => {
    setCameraError(false);
    scanner.current?.start();
  };

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      scanner.current
        .start()
        .then(() => {})
        .catch((err) => {
          console.log(err);
          setCameraError(true);
        });
    }

    return () => {
      const currentVideoEl = videoEl.current;
      if (currentVideoEl) {
        scanner.current?.stop();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: 'black' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <video
          ref={videoEl}
          style={{ width: '100%' }}
          autoPlay
          playsInline
          muted
          controls={false}
        ></video>
        <div ref={qrBoxEl}></div>
      </div>
      <div style={{ position: 'absolute', bottom: '190px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
        <button
          style={{ backgroundColor: '#2196F3', color: '#fff', padding: '8px 16px', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
          onClick={handleRestartCamera}
        >
          Restart Camera
        </button>
        <button
          style={{ backgroundColor: '#FF5722', color: '#fff', padding: '8px 16px', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
          onClick={handleCloseCamera}
        >
          Close Camera
        </button>
      </div>
      {verificationStatus !== null && !redirecting && (
        <div style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
          {verificationStatus ? (
            <span style={{ color: 'green', fontSize: '24px', marginRight: '5px', fontWeight: 'bold' }}>✓</span>
          ) : (
            <span style={{ color: 'red', fontSize: '24px', marginRight: '5px', fontWeight: 'bold' }}>✗</span>
          )}
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: verificationStatus ? 'green' : 'red' }}>{verificationStatus ? 'Verified' : 'Not Verified'}</span>
        </div>
      )}
      {cameraError && (
        <p style={{ position: 'fixed', display: 'none', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '0px', textAlign: 'center', zIndex: 999 }}>
          
        </p>
      )}
    </div>
  );
};

export default QRScanner;
